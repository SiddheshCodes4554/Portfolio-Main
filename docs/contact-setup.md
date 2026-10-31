# Connecting the postcard postbox

The deployed endpoint is deliberately **unconfigured** until all required server values are supplied. The browser can write, choose stamps, and flip the postcard, but cannot claim delivery. Email/social/resume links remain available. No live test email or deployment was performed during implementation.

## Environment

Copy `.env.example` to `.env.local` for local setup; configure the same variables in your hosting environment. Never prefix these values with `NEXT_PUBLIC_`, commit `.env.local`, or put keys in client components.

- `RESEND_API_KEY`: a send-scoped Resend key.
- `CONTACT_FROM_EMAIL`: a sender on a domain you have verified in Resend. A display name is allowed. Do not use the visitor as the sender.
- `CONTACT_TO_EMAIL`: your receiving email. The verified public contact link lives in `src/content/contact.ts`; this variable is still an explicit deployment decision.
- `CONTACT_ORIGIN`: exact website origin, with no path or trailing slash. HTTPS in production; localhost HTTP is allowed for local setup.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`: a durable Redis REST store shared by every server instance, with permission to run EVAL, INCR, EXPIRE and TTL.
- `CONTACT_RATE_LIMIT_SECRET`: a random value of at least 32 characters; generate locally with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`. Do not reuse another application's secret.
- Vercel sets `VERCEL=1`, selecting its platform-provided `x-vercel-forwarded-for` header. On other hosts, set `CONTACT_TRUSTED_IP_HEADER` only to a header your reverse proxy strips and overwrites with a **single** validated client IP. Prevent direct access to the app around that proxy. An arbitrary caller-controlled `X-Forwarded-For` value is not trusted. Missing/invalid client identity fails closed.

The chosen design follows the [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email), its [24-hour idempotency-key support](https://resend.com/docs/dashboard/emails/idempotency-keys), the [Upstash REST API](https://upstash.com/docs/redis/features/restapi), and [Vercel's request-header documentation](https://vercel.com/docs/headers/request-headers). No SDK dependency is necessary.

## Request handling

`GET /api/contact` returns only `{configured: boolean}`, with no caching or secrets. `POST` accepts same-origin JSON with a name (2-80 characters), email (up to 254), message (10-4,000), one of three stamp IDs, an empty `website` honeypot, a draft timestamp, and a request UUID. A 1.5-second minimum interaction time is a supplemental spam signal, not a trusted security boundary. Draft timestamps expire after 24 hours.

The server enforces an 18 KB body cap while streaming, a five-second read deadline, a five-attempt/ten-minute per-IP durable limiter, and bounded provider timeouts. The limiter uses atomic Redis EVAL and expires keys; only an HMAC of the client IP is stored, never the raw address. If the limiter is unavailable, no email is sent. The endpoint does not log form contents or provider credentials. Retention within Resend is governed by your provider account; the app maintains no message database.

Mail uses a constant subject, configured sender/recipient, validated reply-to, and **plain text** for visitor content. Resend idempotency keys derive from a keyed hash of request UUID and content; retries of the same draft reuse that identity. Changed content creates a distinct provider request. Client busy guards and disabled controls prevent duplicate clicks. Provider acceptance must include an email ID before the UI enters its success state. The requested “Message delivered!” heading is qualified by “accepted by the mail service”; it does **not** assert final inbox delivery or a delivery webhook result.

Errors return 400/413/415/422 for invalid payloads, 403 for wrong origin, 429 with Retry-After for excess attempts, 503 for missing configuration or protective infrastructure failure, and 502 for an unconfirmed mail-provider result. Drafts remain in the page on failure. There is no deployed mock mode or fallback that pretends to deliver.

## Safe verification

Run `npm run test:contact`, `npm run typecheck`, `npm run lint`, and `npm run build`. The six contact tests pass explicit dummy configuration and inject fake network responses; they never read real credentials or call a provider. They cover limits, header injection, honeypot, origin/proxy validation, rate limiting, rate-store failure, provider errors/missing confirmation, plain-text rendering, and stable idempotency.

Browser QA intercepts `/api/contact` locally to exercise failed and confirmed-success UI paths. Those responses exist only in the temporary test script, not the repository's application code. Live Resend delivery, domain configuration, deployed proxy headers, and provider account settings still need deployment verification. **Do not send a real test email without the owner's approval.**

The public download at `public/downloads/siddhesh-gawade-resume.pdf` is a reflowed derivative of the supplied resume, with telephone omitted and verified contact links. Its two rendered pages were inspected. The private original remains ignored at `reference/resume.pdf` and is never served.
