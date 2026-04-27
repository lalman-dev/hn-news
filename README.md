# Hacker News Portal

A Hacker News client built with Next.js App Router, TypeScript, and Tailwind CSS.

This isn't a feature-maximized clone. I built it to get a real understanding of when SSR actually helps versus when it just adds complexity — and to practice the kind of frontend decision-making that matters in production: rendering strategy, API reliability, accessibility, and performance.

**Live:** https://hn-news-two.vercel.app · **Lighthouse (mobile):** 97 Performance · 93 Accessibility · 100 Best Practices · 100 SEO

---

## What I actually figured out while building this

The SSR/CSR split wasn't planned upfront — I figured it out as I went.

I started with SSR everywhere because it felt like the "correct" thing to do. But when I got to search, it became obvious fast: users are typing in real time, queries change every keystroke, and SEO provides zero value for search results. Running a server round-trip for every keystroke made no sense. So search stayed on the client, and the home and category pages stayed server-rendered where fast first paint and shareability actually matter.

That decision-making process — starting with an assumption, hitting a real constraint, and changing the approach — is what I wanted to document here more than the final architecture itself.

The hardest part was handling nested comment threads. Hacker News comments can be arbitrarily deep. Getting recursive rendering to work without layout breaking, and making collapsed threads feel natural with keyboard navigation, took the most iteration.

---

## Tech stack

- **Next.js (App Router)** — SSR, Server Components, dynamic routing, error/loading boundaries
- **TypeScript** — typed API layer, component props, and data models
- **Tailwind CSS v4** — utility-first styling with custom theme variants
- **Framer Motion** — subtle animations, kept performance-safe
- **Hacker News Algolia API** — live production data

---

## Rendering strategy

| Route | Strategy | Why |
|---|---|---|
| Home page | SSR | Fast first paint, SEO, content doesn't change per-user |
| Category pages | SSR | Same reasoning as home — shareable URLs, no user-specific data |
| Search | CSR | Real-time queries, no SEO value, server round-trips would hurt responsiveness |
| Item / comments | SSR | Deep content, benefits from pre-rendering |

---

## Performance and accessibility

Lighthouse scores improved gradually across multiple sessions — not in one pass.

Early versions had a heavy background image that hurt performance on mobile. Removing it and switching to a CSS background color was the single biggest performance gain. After that, fixing semantic HTML (replacing divs with proper `nav`, `main`, `article`, `section` elements) pushed the accessibility score up. Adding `og:` metadata and `<title>` tags on every route got SEO to 100.

Current scores (mobile / desktop):
- Performance: **97 / 95**
- Accessibility: **93 / 98**
- Best Practices: **100 / 100**
- SEO: **100 / 100**

Accessibility was also validated manually — keyboard-only navigation through the full app, and screen reader checks on loading and error states.

---

## API design

All fetch logic lives in `lib/hnApi.ts`. Both Server Components and Client Components consume the same layer.

The app assumes APIs can be slow, fail intermittently, or return incomplete data. Partial comment trees and empty responses are rendered as valid states — the UI never dead-ends on a missing field.

```
/search?tags=front_page           → trending stories
/search?query={keyword}&tags=story → category + search results  
/items/{id}                        → item details and comments
```

---

## Project structure

```
app/
├── page.tsx                  # SSR home page
├── HomeClient.tsx            # client-side UI and animations
├── loading.tsx               # global skeleton loaders
├── error.tsx                 # global error boundary
├── layout.tsx                # root layout and providers
├── [category]/               # dynamic category routes (SSR)
│   ├── page.tsx
│   ├── CategoryClient.tsx
│   ├── loading.tsx
│   └── error.tsx
├── item/[id]/page.tsx        # item details and nested comments
├── search/[keyword]/page.tsx # client-side search
├── components/               # reusable UI components
└── lib/hnApi.ts              # centralized API logic
```

---

## Running locally

```bash
git clone https://github.com/lalman-dev/hn-news.git
cd hn-news
npm install
npm run dev
```

Open `http://localhost:3000`.

---

## What I'd improve next

- List virtualization for long story feeds
- Request-level caching or incremental revalidation
- Infinite scroll (currently paginated)
- Better search deduplication when results overlap across categories
