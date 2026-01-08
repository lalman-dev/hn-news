# 🚀 Hacker News Portal

A polished, accessible, and performance-focused Hacker News client built with Next.js, TypeScript, Tailwind CSS (v4), and Framer Motion.
The application integrates with the Hacker News Algolia API to fetch live stories, categories, search results, and threaded comments.

This project focuses on clean architecture, accessibility (WCAG-aware UI), modern theming, and real-world frontend practices.

---

## 🌐 Live Demo

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-brightgreen?style=for-the-badge&logo=vercel)](https://hn-news-two.vercel.app/)

---

## 🛠️ Tech Stack

- ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)
- ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)
- ![Hacker News API](https://img.shields.io/badge/HN_API-FF6600?logo=hacker-news&logoColor=white)

---

## ✨ Key Features

- 🏠 Home Page with **server-side rendered** trending Hacker News stories

- 📂 Dynamic Category Navigation with **SSR-backed routes** for fast initial load and SEO

- 🔎 Search Functionality powered by live API queries (client-side, user-driven)

- 📄 Item Detail Page with threaded, collapsible comment trees

- 📱 Fully Responsive Navbar with mobile menu and scroll-aware styling

- 🎨 Light & Dark Theme (system-aware, Tailwind v4 custom variants)

- ♿ Accessibility-focused UI

  - Keyboard-friendly navigation
  - Screen-reader aware loading, error, and empty states
  - ARIA attributes for dynamic and collapsible content

- 🦴 Skeleton Loaders using **Next.js App Router loading.tsx** for improved perceived performance

- ⚠️ Robust Error Handling using **App Router error boundaries (error.tsx)**

- 🎞️ Subtle Animations using Framer Motion for enhanced UX

---

## 🔗 API Integration

This project uses the Hacker News Algolia API to fetch live data:

- Trending Stories
  https://hn.algolia.com/api/v1/search?tags=front_page

- Category & Search Pages
  https://hn.algolia.com/api/v1/search?query={keyword}&tags=story

- Item Details & Comments
  https://hn.algolia.com/api/v1/items/{id}

All API logic is centralized for maintainability and consistency.

---

## ♿ Accessibility & Theme Support

This project is built with accessibility and user preferences in mind, following modern frontend best practices.

- 🌗 System-aware Light & Dark Mode

  - Automatically respects the user’s OS theme preference

  - Allows manual toggling between light and dark modes

  - Prevents hydration mismatch issues by resolving the theme on client mount

- 🧠 Hydration-Safe Theme Handling

  - Uses client-only rendering for the theme toggle to ensure correct initial UI state

  - Avoids double-toggle issues when system theme is enabled

- 🧩 Accessible UI (WCAG-aligned)

  - Semantic HTML structure

  - Keyboard-accessible interactive elements

  - Proper ARIA labels for buttons and controls

  - Screen-reader friendly loading states and navigation

These improvements ensure a consistent, accessible experience across devices, browsers, and user preferences.

---

## 🧠 Rendering Strategy

This project intentionally uses **different rendering strategies based on page behavior**, following modern Next.js App Router best practices.

- **Server-Side Rendering (SSR)**

  - Home page (trending stories)
  - Category pages
  - Improves performance, SEO, and first contentful paint
  - Implemented using Server Components with centralized data fetching

- **Client-Side Rendering (CSR)**

  - Search page
  - User-driven, frequently changing data
  - Avoids unnecessary server rendering for interactive queries

- **App Router Native States**
  - `loading.tsx` for skeleton loaders during server data fetch
  - `error.tsx` for graceful handling of server and client rendering errors

This hybrid approach keeps the application fast, scalable, and production-ready without over-engineering.

---

🔗 API Integration

All API logic is centralized for maintainability and consistency, and is consumed
by both Server Components (SSR routes) and Client Components (interactive pages).

---

## 🧭 Development Journey

- Phase 1: Initial Implementation
  Started with individual static pages to validate UI and data flow.

- Phase 2: Refactor for Scalability & SSR
  Introduced dynamic routes ([category], [id], [keyword]) and migrated
  Home and Category pages to server-side rendering using the Next.js App Router.

- Phase 3: UI & UX Enhancements
  Added a responsive navbar, animated transitions, and improved layout consistency.

- Phase 4: Accessibility, Performance & Error Handling
  Implemented App Router-native loading and error boundaries, skeleton loaders,
  keyboard navigation, and WCAG-aware ARIA patterns.

- Phase 5: Theming & Production Readiness
  Implemented system-aware theming with hydration-safe rendering using Tailwind CSS v4 custom variants and next-themes.

---

## 📂 Project Structure

```

app/
├─ page.tsx                  # SSR Home page
├─ HomeClient.tsx             # Client-side Home UI (animations, interactions)
├─ loading.tsx                # App Router loading state (skeletons)
├─ error.tsx                  # App Router error boundary
├─ layout.tsx                 # Root layout (Navbar, Providers, theming)
├─ providers.tsx              # App-wide providers (theme, query, etc.)
├─ globals.css                # Global Tailwind CSS styles
│
├─ [category]/                # Dynamic category routes (SSR)
│  ├─ page.tsx                # Server Component (fetch category data)
│  ├─ CategoryClient.tsx      # Client UI with animations
│  ├─ loading.tsx             # Category loading skeleton
│  └─ error.tsx               # Category error boundary
│
├─ item/
│  └─ [id]/
│     └─ page.tsx             # Item detail page with threaded comments
│
├─ search/
│  └─ [keyword]/
│     └─ page.tsx             # Search results page (client-side)
│
├─ components/                # Reusable UI components
│  ├─ Navbar.tsx
│  ├─ Newsletter.tsx
│  ├─ SkeletonCard.tsx
│  ├─ Spinner.tsx
│  └─ ThemeToggle.tsx
│
└─ lib/
   └─ hnApi.ts                # Centralized Hacker News API logic

This structure follows a clear separation of concerns:
Server Components handle data fetching and routing, while Client Components
manage animations, interactivity, and user-driven behavior.

```

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/lalman-dev/hn-news.git

# Navigate into the project
cd hn-news

# Install dependencies
npm install

# Run the development server
npm run dev

```

Open http://localhost:3000 to view it in your browser.

🚧 Upcoming Enhancements:

- ⭐ Bookmark / Favorites system

- 📊 Search filters (points, comments, date)

- 🔄 Infinite scroll or "Load more" button

- 📈 Mocked analytics for category and search usage

## 🤝 Contributing

- Pull requests are welcome.
- For major changes, please open an issue first to discuss.
