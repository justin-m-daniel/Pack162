# Cub Scouts Modern Front End (Cloudflare-first)

## Recommended architecture (with comparison)

### Quick legacy-site observations (Austin Pack 162)
- Direct non-browser fetches to `https://www.austinpack162.com/home` return `403 Forbidden`, which suggests the origin expects browser-like headers or applies bot protection. A Worker reverse proxy will forward proper `Host`/`Origin` headers and preserve browser requests to avoid these blocks.
- Legacy site is hosted on a site builder with event registration at `/paypal/pay` and calendar content at `/event`. These are marked as legacy passthrough routes in Phase 1.

### 1) Worker reverse proxy + HTML rewriting (edge “skin”) — **Recommended MVP**
**What it is:** A Cloudflare Worker acts as a reverse proxy to the legacy site, injects a modern header/nav/footer + CSS at the edge, and selectively caches content. The legacy origin stays untouched and reachable.

**Pros**
- Fastest way to modernize without touching legacy hosting.
- Minimal risk: only wrap selected pages; bypass for forms/auth.
- Can keep old site fully reachable (direct origin or legacy subdomain).
- Works fully on free Cloudflare Workers/Pages tiers for MVP.

**Cons**
- HTML rewriting can be brittle if legacy markup is inconsistent.
- Complex forms or inline scripts may need bypasses.

**Best for:** Phase 1 and 2 rollout; “skin” the site while preserving legacy behavior.

### 2) New UI app + content integration (API/scraping/mirror)
**What it is:** A modern Cloudflare Pages app fetches data from the legacy site via a Worker (API or HTML parsing). Content can be cached in KV/R2.

**Pros**
- Clean modern UI/UX without legacy markup constraints.
- Can progressively migrate content to modern structure.

**Cons**
- Requires content parsing or manual content management.
- Risk of stale data or scraping changes.

**Best for:** Phase 2/3 for high-traffic pages (home, calendar, announcements).

### 3) Hybrid approach — **Recommended long-term**
**What it is:** Use Worker reverse proxy for most legacy pages, while the new Pages app owns a few modern routes (home, news, joining, events). The Worker routes traffic to either the new app or legacy origin.

**Pros**
- Safe incremental modernization.
- Best user experience for key pages while preserving legacy.

**Cons**
- Requires routing logic and careful cache strategy.

**Best for:** Phase 3 and beyond.

## Phased rollout plan

### Phase 1: Shell UI + limited routes (lowest risk)
- Deploy Worker reverse proxy on `new.packxyz.org` (subdomain) while keeping `www.packxyz.org` as legacy.
- Route only `/home` and `/node/2` to the new shell UI.
- Legacy content remains accessible via `/legacy/*` and critical passthrough routes (`/paypal/pay`, `/event`).
- Add minimal caching (edge TTL) and safe headers.

### Phase 2: Navigation, theming, caching
- Add shared header/nav/footer via HTML rewriting.
- Improve asset caching (Cache-Control + Cloudflare cache rules).
- Use Workers KV for small JSON content (announcement snippets).
- Build Pages app for a modern homepage and join page.

### Phase 3: Forms, documents, calendar integration
- Forms: route to legacy form endpoints or rebuild with Workers + Turnstile + email provider.
- Documents: store public PDFs on R2 and proxy with signed URLs if needed.
- Calendar: read from ICS/Google Calendar with caching; render in new UI.

## Proposed repo structure
```
/workspace/Pack162
├── apps/
│   └── web/                 # Cloudflare Pages (Vite + React)
│       ├── package.json
│       ├── vite.config.ts
│       ├── tsconfig.json
│       └── src/
│           ├── App.tsx
│           ├── main.tsx
│           └── index.css
├── worker/
│   ├── wrangler.toml
│   └── src/
│       ├── index.ts          # Worker entry (routing/proxy)
│       └── rewriter.ts       # HTMLRewriter to inject UI
└── docs/
    └── architecture.md       # This document
```

## Starter code stubs

### Worker proxy with cache + safe headers
See `worker/src/index.ts` and `worker/src/rewriter.ts`.

### HTML rewriting to inject modern UI
The Worker uses `HTMLRewriter` to inject header/nav/footer and CSS links.

### Assets/documents pattern
- Public documents go to R2 bucket `pack-docs`.
- Use a Worker to serve `/docs/*` from R2 with `Cache-Control: public, max-age=86400`.
- For sensitive documents, use short-lived signed URLs with `R2` and avoid storing PII.

## Security & privacy checklist (youth org)
- **PII minimization:** avoid storing names/ages on edge; use contact forms routed to secure email provider.
- **Logging:** disable full request body logging; avoid query logs for forms.
- **Turnstile:** protect forms and reduce spam.
- **Rate limiting:** Cloudflare WAF/Rules for form endpoints.
- **Headers:** `Content-Security-Policy`, `X-Frame-Options`, `Referrer-Policy`.
- **No public rosters:** store rosters offline or protected; never publish youth info.
- **Cache safety:** do not cache form responses or pages with personal data.

## Unknowns / to confirm
- Legacy hosting platform (static HTML? CMS? WordPress? custom?)
- Legacy form endpoints and email routing
- Calendar source (Google Calendar/ICS?)
- Authentication needs (member portal?)
- DNS control (ability to add `new.` or `legacy.` subdomains)
- Any paid dependencies already in use

## Free tier notes
- Workers free tier should handle MVP traffic; if heavy HTML rewriting >100k requests/day, consider Unbound or keep cache hits high.
- Pages is free for static hosting.
- R2 free tier covers limited storage; document heavy use may require paid tier.
