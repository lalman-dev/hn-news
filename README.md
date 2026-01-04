# 🚀 Hacker News Portal

A polished, accessible, and performance-focused Hacker News client built with Next.js, TypeScript, Tailwind CSS (v4), and Framer Motion.
The application integrates with the Hacker News Algolia API to fetch live stories, categories, search results, and threaded comments.

This project focuses on clean architecture, accessibility (WCAG-aware UI), modern theming, and real-world frontend practices.

---

## 🌐 Live Demo

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-brightgreen?style=for-the-badge&logo=vercel)](https://hn-news-two.vercel.app/)

---

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)
![Hacker News API](https://img.shields.io/badge/HN_API-FF6600?logo=hacker-news&logoColor=white)

---

## ✨ Key Features

- 🏠 Home Page with trending Hacker News stories

- 📂 Dynamic Category Navigation using a single scalable route

- 🔎 Search Functionality powered by live API queries

- 📄 Item Detail Page with threaded, collapsible comment trees

- 📱 Fully Responsive Navbar with mobile menu and scroll-aware styling

- 🎨 Light & Dark Theme (system-aware, Tailwind v4 custom variants)

- ♿ Accessibility-focused UI

  - Keyboard-friendly navigation

  - Screen-reader aware loading, error, and empty states

  - ARIA attributes for dynamic and collapsible content

- 🦴 Skeleton Loaders for improved perceived performance

- 🎞️ Subtle Animations using Framer Motion for enhanced UX

---

## 🔗 API Integration 
This project uses the Hacker News Algolia API to fetch live data:

  -Trending Stories
    https://hn.algolia.com/api/v1/search?tags=front_page

  - Category & Search Pages
    https://hn.algolia.com/api/v1/search?query={keyword}&tags=story

  - Item Details & Comments
    https://hn.algolia.com/api/v1/items/{id}

All API logic is centralized for maintainability and consistency.

---

## 🧭 Development Journey
- Phase 1: Initial Implementation
 Started with individual static pages to validate UI and data flow.

- Phase 2: Refactor for Scalability
 Introduced dynamic routes ([category], [id], [keyword]) to eliminate duplication and improve maintainability.

- Phase 3: UI & UX Enhancements
 Added a responsive navbar, animated transitions, and improved layout consistency.

- Phase 4: Accessibility & Performance Polish
 Implemented skeleton loaders, accessible loading/error states, keyboard navigation, and WCAG-aware ARIA patterns.

- Phase 5: Theming & Production Readiness
 Added system-aware light/dark theme using Tailwind CSS v4 custom variants and next-themes.
 
---

## 📂 Project Structure

```
app/
├─ [category]/page.tsx      # Dynamic category route
├─ item/[id]/page.tsx       # Item detail with comments
├─ search/[keyword]/page.tsx # Search results
├─ components/              # Reusable UI components
├─ lib/                     # Centralized API logic
└─ globals.css              # Tailwind v4 global styles

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

⭐ Bookmark / Favorites system

📊 Search filters (points, comments, date)

🔄 Infinite scroll or "Load more" button

📈 Mocked analytics for category and search usage

## 🤝 Contributing 
Pull requests are welcome. 
For major changes, please open an issue first to discuss.
