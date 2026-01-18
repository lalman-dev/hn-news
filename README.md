# 🚀 Hacker News Portal

A production‑grade Hacker News client focused on **real‑world frontend architecture**, **performance trade‑offs**, and **accessibility‑first design**.

Rather than maximizing features, this project intentionally focuses on **frontend decision-making** — how modern React applications are **designed, rendered, and evolved** when ownership, performance, and reliability matter.

The application consumes the Hacker News Algolia API to deliver trending stories, categories, search results, and deeply nested comment threads using a **hybrid rendering strategy** built on the Next.js App Router.

---

## 🌐 Live Demo

🔗 **Live Application:** [https://hn-news-two.vercel.app/](https://hn-news-two.vercel.app/)

> ⚠️ This project uses **live Hacker News data**. Network latency, empty states, and API failures are intentionally handled to reflect real‑world production conditions.

---

> **TL;DR**
> - Production-grade Next.js App Router application using intentional SSR + CSR
> - Designed around real API constraints (latency, failures, large datasets)
> - Accessibility-first UI with keyboard and screen-reader support
> - Clear server/client separation and predictable data flow
> - Built to simulate real frontend ownership and decision-making

---

## 🎯 Project Goals

This project was built with the following goals:

- Understand **server vs client rendering trade‑offs** in modern React
- Design a **scalable App Router architecture** with clear separation of concerns
- Handle **real API constraints** (latency, failures, large datasets)
- Build an **accessible, keyboard‑friendly UI** for text‑heavy content
- Treat loading, error, and empty states as **first‑class UX scenarios**
- Make frontend trade-offs explicit and debuggable rather than implicit


The focus is not on novelty, but on **depth, correctness, and maintainability**.

---

## 🛠️ Tech Stack

- **Next.js (App Router)** – Routing, SSR, Server Components, error/loading boundaries
- **TypeScript** – Type safety across API, components, and data models
- **Tailwind CSS v4** – Utility‑first styling with custom theme variants
- **Framer Motion** – Subtle, performance‑safe UI animations
- **Hacker News Algolia API** – Live production data source

---

## ✨ Core Features

- **Server‑Rendered Home Page**

  - Trending Hacker News stories
  - Optimized for SEO and fast first contentful paint.

- **Dynamic Category Pages (SSR)**

  - Category‑based story exploration.
  - Pre‑rendered on request for performance and shareability
  - This avoids shipping unnecessary JavaScript to the client for content-heavy routes while keeping initial interaction costs low.

- **Client‑Side Search**

  - User‑driven, real‑time queries.
  - Optimized for responsiveness without server round‑trips.
  - Rendering search results on the client avoids server churn for rapid, exploratory user behavior where SEO provides no value.

- **Item Detail Pages**

  - Threaded, deeply nested comment trees
  - Collapsible discussions for improved readability

- **Accessibility‑Focused UI**

  - Keyboard navigation across interactive elements
  - Screen‑reader friendly loading, error, and empty states
  - Semantic HTML and ARIA attributes for dynamic content

- **Robust Loading & Error Handling**

  - Skeleton loaders via `loading.tsx`
  - Graceful runtime error recovery via `error.tsx`

- **System‑Aware Theming**

  - Light & Dark mode with OS preference detection
  - Hydration‑safe theme resolution

- **Responsive Layout**

  - Mobile‑first navigation
  - Scroll‑aware UI behavior

---

## 🧠 Rendering Strategy & Architecture

This project intentionally uses **different rendering strategies based on user behavior and content requirements**.

### Server‑Side Rendering (SSR)

Used for:

- Home page
- Category pages

**Why:**

- Improves SEO and shareability
- Faster perceived performance for content‑heavy pages
- Reduces client‑side JavaScript for initial loads

Implemented using **Server Components** with centralized data fetching.
The goal is not to showcase every rendering mode, but to apply each one intentionally based on user behavior and content value.


---

### Client‑Side Rendering (CSR)

Used for:

- Search functionality

**Why:**

- Highly interactive and user‑driven
- Avoids unnecessary server rendering
- Enables fast, responsive query updates

---

### App Router Native States

- `loading.tsx` – Skeleton UI during server fetches
- `error.tsx` – Route‑level error isolation and recovery

This approach ensures failures never crash the entire application.

---

## 🔗 API Integration

All data is fetched from the **Hacker News Algolia API**:

- **Trending Stories**
  `/search?tags=front_page`

- **Category & Search Results**
  `/search?query={keyword}&tags=story`

- **Item Details & Comments**
  `/items/{id}`

### Centralized API Layer

All API logic is centralized to:

- Avoid duplicated fetch logic
- Ensure consistent error handling
- Make future caching or retries easy to introduce

The same API layer is consumed by both **Server Components** and **Client Components**.

---

### Failure-Aware UI Design

The application assumes that:
- API responses can be slow
- Requests can fail intermittently
- Data may be incomplete or empty
  
For example, partial comment trees or empty responses are rendered as valid states rather than treated as errors.
UI states are designed so that these conditions never result in broken layouts or dead ends for the user.

---

## ♿ Accessibility & UX Philosophy

Accessibility is treated as a **design constraint**, not an afterthought.

- Semantic HTML structure
- Keyboard‑accessible navigation and controls
- ARIA labels for interactive and collapsible elements
- Screen‑reader friendly announcements for loading and errors

Accessibility was validated manually using keyboard-only navigation and screen-reader checks during development.
This improves usability for all users, not just assistive technologies.

---

## 🧭 Development Journey

**Phase 1 – Foundation**
Built static layouts and validated API data flow.

**Phase 2 – Architecture & SSR**
Introduced dynamic routes and migrated key pages to server rendering using the App Router.

**Phase 3 – UI & Interaction**
Added responsive navigation, motion‑based feedback, and layout consistency.

**Phase 4 – Reliability & Accessibility**
Implemented loading states, error boundaries, keyboard navigation, and WCAG‑aligned patterns.

**Phase 5 – Theming & Production Readiness**
Added hydration‑safe theming and prepared the app for real deployment conditions.

Each phase intentionally mirrors how frontend systems evolve in real teams — starting simple, then hardening architecture, UX, and reliability over time.

---

## 📂 Project Structure

```
app/
├─ page.tsx                  # SSR Home page
├─ HomeClient.tsx             # Client‑side UI & animations
├─ loading.tsx                # Global loading skeletons
├─ error.tsx                  # Global error boundary
├─ layout.tsx                 # Root layout & providers
├─ providers.tsx              # Theme and app‑level providers
│
├─ [category]/                # Dynamic category routes (SSR)
│  ├─ page.tsx
│  ├─ CategoryClient.tsx
│  ├─ loading.tsx
│  └─ error.tsx
│
├─ item/[id]/page.tsx         # Item details & comments
├─ search/[keyword]/page.tsx  # Client‑side search
│
├─ components/                # Reusable UI components
└─ lib/hnApi.ts               # Centralized API logic
```

Server Components focus on **data and routing**, while Client Components handle **interactivity and animation**.

---

## 🚀 Installation & Local Development

```bash
git clone https://github.com/lalman-dev/hn-news.git
cd hn-news
npm install
npm run dev
```

Open `http://localhost:3000` to view the application.

---

## 📈 Scaling & Future Improvements

If user traffic increased significantly, the next steps would include:

- List virtualization for large datasets
- Edge or request‑level caching
- Search result deduplication
- Incremental revalidation strategies

Planned feature ideas:

- Bookmarking / Favorites
- Advanced search filters
- Infinite scrolling or pagination
- Lightweight analytics for usage insights

---

## 🤝 Contributing

Contributions are welcome.
For major changes, please open an issue to discuss the proposal first.

---

## 👀 Who This Project Is For

- Frontend engineers evaluating real-world Next.js architecture
- Hiring managers looking for frontend ownership beyond UI implementation
- Developers interested in SSR/CSR trade-offs in modern React

---

## 🧠 Key Takeaway

This project is about demonstrating the ability to design, build, debug, and **own end-to-end** a real frontend system using modern React and Next.js best practices.
