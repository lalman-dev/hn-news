<div align="center">

# 📰 Hacker News Portal

**A Hacker News client focused on knowing exactly when SSR helps — and when it doesn't.**

Not a feature-maximized clone. Built to practice the frontend decision-making that actually matters in production: rendering strategy, API reliability, accessibility, and performance — and to document that decision-making, not just the finished architecture.

[![Live Demo](https://img.shields.io/badge/demo-hn--news--two.vercel.app-0891B2?style=for-the-badge&logo=vercel&logoColor=white)](https://hn-news-two.vercel.app)
[![GitHub](https://img.shields.io/badge/source-lalman--dev%2Fhn--news-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/lalman-dev/hn-news)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## 📊 Lighthouse / PageSpeed Insights

| Metric | Mobile | Desktop |
| --- | :---: | :---: |
| ⚡ Performance | **97** | **95** |
| ♿ Accessibility | **93** | **98** |
| ✅ Best Practices | **100** | **100** |
| 🔍 SEO | **100** | **100** |

> Scores climbed gradually across sessions, not in one pass — see [Performance & Accessibility](#-performance--accessibility) for what actually moved them.

---

## 🧠 What I Actually Figured Out Building This

The SSR/CSR split wasn't planned upfront — it came from hitting a real constraint.

I started with SSR everywhere, because it felt like the "correct" default. Then I got to search, and it fell apart fast: users type in real time, the query changes every keystroke, and SEO provides zero value for search results. Running a server round-trip on every keystroke made no sense. So search stayed client-side, while the home and category pages stayed server-rendered, where a fast first paint and shareable URLs actually matter.

That process — start with an assumption, hit a constraint, change the approach — is the part of this project worth documenting, more than the final architecture itself.

The hardest technical problem was nested comment threads. HN comments can be arbitrarily deep. Getting recursive rendering to hold up without breaking layout, and making collapsed threads feel natural under keyboard navigation, took the most iteration of anything in the build.

---

## ✨ Features

- 🧭 **Deliberate SSR/CSR Split** — Server-rendered where SEO and first paint matter, client-rendered where real-time responsiveness matters
- 💬 **Recursive Comment Threads** — Arbitrarily deep nesting with collapse/expand and correct ARIA at every level
- ⌨️ **Keyboard Navigation** — Validated manually across the full app, not just automated checks
- 🛡️ **Resilient API Layer** — Assumes upstream data can be slow, partial, or missing — the UI never dead-ends
- 💀 **Loading & Error Boundaries** — Global skeletons and error states at every route level
- 🎬 **Performance-Safe Animation** — Framer Motion used sparingly enough not to cost the Performance score

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| 🧩 Framework | Next.js (App Router) — SSR, Server Components, dynamic routing, error/loading boundaries |
| 📘 Language | TypeScript — typed API layer, component props, data models |
| 🎨 Styling | Tailwind CSS v4 — utility-first with custom theme variants |
| 🎬 Animation | Framer Motion |
| 📡 Data Source | Hacker News Algolia API — live production data |

---

## 🧭 Rendering Strategy

| Route | Strategy | Why |
| --- | --- | --- |
| Home page | SSR | Fast first paint, SEO, content doesn't change per-user |
| Category pages | SSR | Same reasoning as home — shareable URLs, no user-specific data |
| Search | CSR | Real-time queries, no SEO value, a server round-trip per keystroke would hurt responsiveness |
| Item / comments | SSR | Deep content that benefits from pre-rendering |

---

## ⚡ Performance & Accessibility

Scores improved gradually across multiple sessions:

- A heavy background image was the biggest early performance cost on mobile — replacing it with a CSS background color was the single largest gain
- Swapping generic `div`s for semantic `nav`, `main`, `article`, and `section` elements pushed Accessibility up
- Adding `og:` metadata and a `<title>` on every route got SEO to 100 across the board
- Accessibility was also validated manually: full keyboard-only navigation, plus screen-reader checks on loading and error states

---

## 🔌 API Design

All fetch logic lives in `lib/hnApi.ts`, consumed by both Server Components and Client Components — one source of truth for how data is shaped and fetched.

```
/search?tags=front_page            → trending stories
/search?query={keyword}&tags=story → category + search results
/items/{id}                        → item details and comments
```

---

## 📁 Project Structure

```
app/
├── page.tsx                    # SSR home page
├── HomeClient.tsx               # client-side UI and animations
├── loading.tsx                  # global skeleton loaders
├── error.tsx                    # global error boundary
├── layout.tsx                   # root layout and providers
├── [category]/                  # dynamic category routes (SSR)
│   ├── page.tsx
│   ├── CategoryClient.tsx
│   ├── loading.tsx
│   └── error.tsx
├── item/[id]/page.tsx           # item details and nested comments
├── search/[keyword]/page.tsx    # client-side search
├── components/                  # reusable UI components
└── lib/hnApi.ts                 # centralized API logic
```

---

## 🚀 Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/lalman-dev/hn-news.git
cd hn-news
```

**2. Install dependencies**

```bash
npm install
```

**3. Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🗺️ What I'd Improve Next

- [ ] List virtualization for long story feeds
- [ ] Request-level caching or incremental revalidation
- [ ] Infinite scroll (currently paginated)
- [ ] Better search deduplication when results overlap across categories

---

## 👤 Author

**Lalman** — Full-Stack Engineer, Frontend-Focused
[🌐 lalman.dev](https://lalman.dev) · [💻 github.com/lalman-dev](https://github.com/lalman-dev) · [🔗 linkedin.com/in/lalman-dev](https://linkedin.com/in/lalman-dev)
