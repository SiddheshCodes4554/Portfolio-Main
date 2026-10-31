import test from 'node:test';
import assert from 'node:assert/strict';
import { handleContact, contactConfig } from '../src/lib/contact/server.ts';
import { validatePayload } from '../src/lib/contact/schema.ts';
import { postcardEmail } from '../src/lib/contact/email.ts';

// Entirely local fakes. Never read process.env and never use global fetch in these tests.
const env={RESEND_API_KEY:'test-only-not-a-real-key',CONTACT_FROM_EMAIL:'Test <post@example.com>',CONTACT_TO_EMAIL:'owner@example.com',CONTACT_ORIGIN:'https://scrapbook.example',UPSTASH_REDIS_REST_URL:'https://redis.example',UPSTASH_REDIS_REST_TOKEN:'test-only',CONTACT_RATE_LIMIT_SECRET:'a-test-secret-with-at-least-32-characters',VERCEL:'1'};
const payload=(extra={})=>({name:'Test Visitor',email:'visitor@example.com',message:'A local test postcard, never sent.',stamp:'star',website:'',startedAt:Date.now()-10000,requestId:'12345678-1234-1234-1234-123456789abc',...extra});
const request=(data=payload(),headers={})=>new Request('https://scrapbook.example/api/contact',{method:'POST',headers:{origin:env.CONTACT_ORIGIN,'content-type':'application/json','x-vercel-forwarded-for':'203.0.113.10',...headers},body:JSON.stringify(data)});
const json=(body,status=200)=>Response.json(body,{status});
const mock=(emailResponse=()=>json({id:'mock-email-id'}),rate=[1,600])=>async(url,init)=>url===env.UPSTASH_REDIS_REST_URL?json({result:rate}):emailResponse(url,init);
test('unconfigured and untrusted proxy/origin fail closed without network calls',async()=>{
  const noFetch=async()=>{throw Error('Unexpected network call');};
  assert.equal((await handleContact(request(),{},noFetch)).status,503);
  assert.equal((await handleContact(request(),env,noFetch)).status,503); // No fetch means the rate store fails safely.
  assert.equal((await handleContact(request(payload(),{origin:'https://other.example'}),env,noFetch)).status,403);
  assert.equal((await handleContact(request(payload(),{'x-vercel-forwarded-for':'203.0.113.10, 1.2.3.4'}),env,noFetch)).status,503);
  assert.equal(contactConfig({...env,CONTACT_RATE_LIMIT_SECRET:''}),null);
  assert.equal(contactConfig({...env,CONTACT_ORIGIN:'http://public.example'}),null);
});
test('localhost works without proxy headers while production still requires them',async()=>{
  const localEnv={...env,VERCEL:undefined,CONTACT_ORIGIN:'http://localhost:3000'};
  const localRequest=()=>new Request('http://localhost:3000/api/contact',{method:'POST',headers:{origin:localEnv.CONTACT_ORIGIN,'content-type':'application/json'},body:JSON.stringify(payload())});
  assert.ok(contactConfig(localEnv));
  assert.equal((await handleContact(localRequest(),localEnv,mock())).status,200);
  assert.equal(contactConfig({...env,VERCEL:undefined}),null);
  const remote=new Request('https://public.example/api/contact',{method:'POST',headers:{origin:localEnv.CONTACT_ORIGIN,'content-type':'application/json'},body:JSON.stringify(payload())});
  assert.equal((await handleContact(remote,localEnv,async()=>{throw Error('Must not fetch');})).status,503);
});
test('server validation rejects header injection, invalid stamp, bots and length violations',async()=>{
  for(const extra of [{email:'evil@example.com\r\nBcc: victim@example.com'},{name:'a'},{name:'x'.repeat(81)},{message:'short'},{message:'x'.repeat(4001)},{stamp:'unknown'},{website:'spam.example'},{startedAt:Date.now()+10000}]) {
    assert.equal((await handleContact(request(payload(extra)),env,mock(()=>{throw Error('Must not send');}))).status,422);
  }
  assert.equal(validatePayload(null).data,undefined);
});
test('durable limiter blocks excess requests and provider outages fail closed',async()=>{
  const response=await handleContact(request(),env,mock(()=>{throw Error('Must not send');},[6,450]));
  assert.equal(response.status,429);assert.equal(response.headers.get('retry-after'),'450');
  assert.equal((await handleContact(request(),env,async()=>json({error:'unavailable'},503))).status,503);
});
test('oversized and wrong-content requests are rejected',async()=>{
  assert.equal((await handleContact(request(payload(),{'content-length':'99999'}),env,mock())).status,413);
  assert.equal((await handleContact(request(payload(),{'content-type':'text/plain'}),env,mock())).status,415);
  assert.equal((await handleContact(request(payload({message:'x'.repeat(19000)})),env,mock())).status,413);
});
test('provider failure or missing confirmation never claims success',async()=>{
  for(const response of [()=>json({error:'rejected'},500),()=>json({}),()=>{throw Error('timeout');}]) {
    const result=await handleContact(request(),env,mock(response));assert.equal(result.status,502);assert.notEqual((await result.json()).ok,true);
  }
});
test('confirmed success uses safe plain text and stable retry idempotency',async()=>{
  const calls=[],keys=[];const data=payload({message:'<script>alert("test")</script> Hello from a mock!'});
  const fetcher=async(url,init)=>{calls.push({url,init});if(url===env.UPSTASH_REDIS_REST_URL)return json({result:[1,600]});keys.push(init.headers['Idempotency-Key']);return json({id:'mock-confirmed'});};
  for(let i=0;i<2;i++){const result=await handleContact(request(data),env,fetcher);assert.equal(result.status,200);assert.equal((await result.json()).ok,true);}
  assert.equal(keys[0],keys[1]);const email=JSON.parse(calls.find(c=>c.url.includes('resend')).init.body);
  assert.ok(email.html.includes('&lt;script&gt;'));assert.ok(!email.html.includes('<script>'));assert.ok(email.text.includes('<script>'));assert.deepEqual(email.to,[env.CONTACT_TO_EMAIL]);assert.equal(email.reply_to,data.email);
  assert.ok(!calls[0].init.body.includes('203.0.113.10')); // Only a keyed hash is stored.
});
test('postcard email escapes visitor markup, preserves lines and renders each stamp',()=>{
  for(const [stamp,label] of [['star','STAR'],['heart','HEART'],['bolt','LIGHTNING']]) {
    const email=postcardEmail(payload({stamp,name:'<img src=x onerror="oops"> & friends',message:'First line\r\nSecond line\n<a href="https://evil.example">text</a>'}));
    assert.ok(email.html.includes(label));assert.ok(email.html.includes('First line<br />Second line<br />'));
    assert.ok(!email.html.includes('<img'));assert.ok(!email.html.includes('<a href="https://evil.example">'));
    assert.ok(email.html.includes('&lt;img src=x onerror=&quot;oops&quot;&gt; &amp; friends'));
    assert.ok(email.html.includes('mailto:visitor%40example.com'));assert.ok(email.text.includes('First line\r\nSecond line'));
    assert.ok(!/src=|@import|<script/i.test(email.html.replaceAll('src=x','')));
  }
});
