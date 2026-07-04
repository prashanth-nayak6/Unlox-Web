# Outpro.India — Corporate Digital Presence Platform

A Next.js 14 (App Router) corporate website built against the Corporate Profile
Website Development brief. Placeholder brand, copy, and imagery are used
throughout — see **"Before you launch"** below for what to swap out.

## Stack

| Layer | Choice |
|---|---|
| Front-end | Next.js 14 (App Router) + React 18, fully responsive |
| Styling | Tailwind CSS with a custom design-token theme (`tailwind.config.js`) |
| Back-end | Next.js Route Handlers (Node.js runtime) |
| Database | MongoDB via Mongoose (`lib/db.js`, `lib/models/Lead.js`) |
| Validation | Zod (server-side form validation) |
| Email | Nodemailer over SMTP (`lib/mailer.js`) |
| Icons | lucide-react |
| Fonts | Space Grotesk (display), Inter (body), JetBrains Mono (data/metrics) — via `next/font/google`, self-hosted at build time |

## Local development

```bash
npm install
cp .env.example .env.local   # fill in MongoDB URI, SMTP creds, GA4 ID
npm run dev
```

Visit `http://localhost:3000`.

## Project structure

```
app/
  layout.js              Root layout: fonts, metadata, GA4, Header/Footer
  page.js                Home
  about/page.js           About Us
  services/page.js        Services index
  services/[slug]/page.js Service detail (statically generated per service)
  portfolio/page.js       Case studies + testimonials
  contact/page.js         Contact form
  blog/ careers/ partners/  Scaffolded "coming soon" routes (see Scalability)
  api/contact/route.js    Contact form submission handler
  sitemap.js robots.js    SEO
components/               Reusable UI (Header, Footer, Hero, ServicesGrid, …)
lib/data/                 Placeholder content (services, portfolio, testimonials)
lib/db.js lib/models/     MongoDB connection + Lead schema
lib/mailer.js             SMTP notification on new lead
```

## Performance approach

- **Images**: use `next/image` everywhere real photography is added — it
  handles responsive sizes, AVIF/WebP, and lazy loading by default. Placeholder
  blocks (`bg-ink-100`) currently stand in for photography.
- **Fonts**: loaded through `next/font/google`, which self-hosts and inlines
  font files at build time — no runtime request to Google, no layout shift.
- **JS payload**: shared JS is ~87KB gzipped across the whole app (verified via
  `npm run build`); route-level bundles add 0.1–2KB each because pages are
  server components by default — only `Header` and `ContactForm` ship client JS.
- **Caching**: static assets get a 1-year immutable `Cache-Control` header
  (`next.config.js`). Pair with a CDN (Cloudflare/Akamai) at the DNS layer per
  the brief.
- To actually confirm the 90+/95+ PageSpeed targets and <2.5s load time from
  the brief, run Lighthouse/PageSpeed Insights against the **deployed**
  production URL — these numbers depend on real hosting, CDN, and image
  weight, which can't be measured against localhost or a sandbox.

## Deployment guide

### Option A — Vercel (recommended for Next.js)

1. Push this repository to GitHub/GitLab/Bitbucket.
2. In Vercel: **New Project → Import** the repo.
3. Add environment variables from `.env.example` under **Settings → Environment Variables**.
4. Deploy. Vercel builds and serves via its global CDN automatically (satisfies the CDN requirement without a separate Cloudflare/Akamai setup).
5. **Domain mapping**: Settings → Domains → add `outpro.india` (or the real
   domain) → follow the CNAME/A-record instructions shown → SSL certificates
   are issued and renewed automatically.

### Option B — AWS / Google Cloud / Azure (containerized)

1. `npm run build` produces a standalone-capable app (add
   `output: "standalone"` to `next.config.js` if deploying via Docker).
2. Build a container image (`node:18-slim` base), copy `.next/standalone`,
   `.next/static`, and `public/`, run `node server.js`.
3. Put the container behind a load balancer + CDN (CloudFront / Cloud CDN /
   Azure Front Door).
4. **DNS & SSL**: point the domain's A/ALIAS record at the load balancer;
   issue a certificate via ACM / Google-managed certs / Azure-managed certs.

### Environment variables required in production

See `.env.example` — `MONGODB_URI`, `NEXT_PUBLIC_GA4_ID`, and the `SMTP_*`
variables. Never commit real secrets; set them in the hosting provider's
dashboard.

## Before you launch (placeholder content to replace)

- [ ] Real logo (currently a text mark) and favicon
- [ ] Brand color palette — currently a placeholder navy/amber/teal system in `tailwind.config.js`
- [ ] Real copy on Home, About, Services, Portfolio (currently written sample content)
- [ ] Real team photos on `/about`
- [ ] Real client case studies and testimonials (with permission to publish)
- [ ] Real office address / phone / email on `/contact` and in `Footer.js`
- [ ] `NEXT_PUBLIC_GA4_ID` and Search Console verification
- [ ] Optional integrations (CRM, live chat, newsletter) — see "Optional integrations" below

## Optional integrations (not wired in — brief marks these "to be confirmed")

- **CRM (HubSpot/Zoho)**: forward each `Lead` document from MongoDB via a
  webhook, or swap the `Lead.create()` call in `app/api/contact/route.js` for
  a direct API call to the CRM.
- **Live chat (Tawk.to/Crisp)**: add the provider's script via `next/script`
  in `app/layout.js`, same pattern used for GA4.
- **Newsletter (Mailchimp)**: add a signup form component following the same
  pattern as `ContactForm.js`, posting to a new `/api/newsletter` route.

## Scalability

`/blog`, `/careers`, and `/partners` are scaffolded as routes so the
architecture visibly supports the brief's future-addition requirement without
restructuring. Wire them to a CMS (headless WordPress, Sanity, Contentful) or
MDX files when content is ready.
