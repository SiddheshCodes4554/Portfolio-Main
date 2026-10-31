// Imported only by the server route and isolated tests. Never import into client components.
import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { contactLimits, validatePayload, type ContactPayload } from "./schema.ts";
import { postcardEmail } from "./email.ts";

type Environment = Record<string, string | undefined>;
type Config = { apiKey:string; from:string; to:string; origin:string; redisUrl:string; redisToken:string; secret:string; ipHeader:string };
type Fetch = typeof fetch;
export function contactConfig(env: Environment): Config | null {
  const { RESEND_API_KEY:apiKey, CONTACT_FROM_EMAIL:from, CONTACT_TO_EMAIL:to, CONTACT_ORIGIN:origin, UPSTASH_REDIS_REST_URL:redisUrl, UPSTASH_REDIS_REST_TOKEN:redisToken, CONTACT_RATE_LIMIT_SECRET:secret } = env;
  // Local development shares a rate bucket; it has no trusted reverse proxy.
  let local = false;
  try { local = ["localhost", "127.0.0.1"].includes(new URL(origin ?? "").hostname); } catch { /* Invalid origin is rejected below. */ }
  const ipHeader = env.VERCEL === "1" ? "x-vercel-forwarded-for" : local ? "local-loopback" : env.CONTACT_TRUSTED_IP_HEADER?.toLowerCase();
  if (!apiKey || !from || !to || !origin || !redisUrl || !redisToken || !secret || secret.length < 32 || !ipHeader || !/^[a-z0-9-]+$/.test(ipHeader)) return null;
  try {
    const site = new URL(origin), redis = new URL(redisUrl);
    if ((site.protocol !== "https:" && !["localhost","127.0.0.1"].includes(site.hostname)) || site.origin !== origin || redis.protocol !== "https:" || redis.username || redis.password) return null;
    if (/\r|\n/.test(from+to) || !from.includes("@") || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(to)) return null;
    return {apiKey,from,to,origin,redisUrl:redis.origin,redisToken,secret,ipHeader};
  } catch { return null; }
}
function json(status: number, message: string, extra: Record<string,unknown> = {}, headers: Record<string,string> = {}) {
  return Response.json({message,...extra},{status,headers:{"Cache-Control":"no-store",...headers}});
}
async function readLimited(request: Request): Promise<unknown> {
  if (!request.body) throw new Error("body");
  const reader = request.body.getReader(); const chunks: Uint8Array[] = []; let length=0;
  let expired=false;
  const timeout=setTimeout(()=>{expired=true;void reader.cancel().catch(()=>{});},5000);
  try { for (;;) { const {done,value}=await reader.read(); if(expired)throw new Error("body timeout"); if(done) break; length+=value.byteLength; if(length>contactLimits.bodyBytes) { await reader.cancel(); throw new Error("large"); } chunks.push(value); } }
  finally { clearTimeout(timeout);reader.releaseLock(); }
  const bytes = new Uint8Array(length); let offset=0; for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  return JSON.parse(new TextDecoder().decode(bytes));
}
const rateScript = "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]) end; return {n,redis.call('TTL',KEYS[1])}";
async function rateLimit(ip: string, config: Config, fetcher: Fetch) {
  const hash = createHmac("sha256",config.secret).update(ip).digest("hex");
  const response = await fetcher(config.redisUrl,{method:"POST",headers:{Authorization:`Bearer ${config.redisToken}`,"Content-Type":"application/json"},body:JSON.stringify(["EVAL",rateScript,"1",`scrapbook:contact:${hash}`,"600"]),signal:AbortSignal.timeout(3000),cache:"no-store"});
  if(!response.ok) throw new Error("rate store");
  const body = await response.json() as {result?:unknown};
  if(!Array.isArray(body.result) || body.result.length!==2 || !body.result.every(n=>typeof n==="number") || body.result[0]<1 || body.result[1]<0) throw new Error("rate store");
  return {allowed:body.result[0]<=5, retryAfter:Math.max(1,body.result[1])};
}
export async function sendPostcard(data: ContactPayload, config: Config, fetcher: Fetch) {
  // HTML escapes all visitor content; text remains a fallback. Headers stay server-controlled.
  const key = createHmac("sha256",config.secret).update(JSON.stringify([data.requestId,data.name,data.email,data.message,data.stamp])).digest("hex");
  const response = await fetcher("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${config.apiKey}`,"Content-Type":"application/json","Idempotency-Key":`postcard/${key}`},body:JSON.stringify({from:config.from,to:[config.to],reply_to:data.email,subject:"A postcard from The Internet Scrapbook",...postcardEmail(data)}),signal:AbortSignal.timeout(8000)});
  const result = await response.json() as {id?:unknown};
  if(!response.ok || typeof result.id!=="string" || !result.id) throw new Error("provider");
  return result.id;
}
export async function handleContact(request: Request, env: Environment, fetcher: Fetch = fetch): Promise<Response> {
  const config=contactConfig(env);
  if(!config) return json(503,"The postbox isn’t connected yet. Please use the email link below.",{code:"unconfigured"});
  if(request.headers.get("origin")!==config.origin) return json(403,"Please send your postcard from this website.");
  if(request.headers.get("content-type")?.split(";")[0].trim()!=="application/json") return json(415,"Send your postcard as JSON.");
  if(Number(request.headers.get("content-length"))>contactLimits.bodyBytes) return json(413,"That postcard is too large.");
  const localRequest = ["localhost", "127.0.0.1"].includes(new URL(request.url).hostname);
  const ip=config.ipHeader === "local-loopback" ? (localRequest ? "127.0.0.1" : undefined) : request.headers.get(config.ipHeader)?.trim();
  // Never trust a caller-supplied X-Forwarded-For chain. The proxy must overwrite this header.
  if(!ip || !isIP(ip)) return json(503,"The postbox is temporarily unavailable. Please try email.");
  try {
    const limit=await rateLimit(ip,config,fetcher);
    if(!limit.allowed) return json(429,"A few too many postcards. Please try again in a little while.",{}, {"Retry-After":String(limit.retryAfter)});
  } catch { return json(503,"The postbox is temporarily unavailable. Your message hasn’t been sent."); }
  let raw: unknown;
  try { raw=await readLimited(request); } catch(error) { return json(error instanceof Error&&error.message==="large"?413:400,"We couldn’t read that postcard. Please check the form."); }
  const validated=validatePayload(raw);
  if(!validated.data) return json(422,"Please check your postcard and try again.",{errors:validated.errors??{}});
  try { await sendPostcard(validated.data,config,fetcher); return json(200,"Postcard accepted by the mail service.",{ok:true}); }
  catch { return json(502,"The mail service couldn’t confirm your postcard. Your draft is safe here; please retry."); }
}
