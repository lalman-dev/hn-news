# 🚀 Hacker News Portal

A polished, user‑friendly Hacker News client built with **Next.js**,**TypeScript**, **TailwindCSS**, and **Framer Motion**.  
It integrates with the **Hacker News Algolia API** to fetch live stories, categories, search results, and comments.
It features category navigation, trending stories, search, and animated item detail pages with collapsible comment trees.

---

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)
![Hacker News API](https://img.shields.io/badge/HN_API-FF6600?logo=hacker-news&logoColor=white)

---

## ✨ Features

- 🏠 **Home Page** with logo + navbar
- 📂 **Category Navigation** (Tech, Science, Games, Business, AI, Programming, Startups, Cybersecurity, Design)
- 🔥 **Trending Section** for popular stories
- 🔎 **Search** with keyword‑based results powered by Hacker News API queries
- 📄 **Item Detail Page** with animated entry + collapsible comment trees
- 📱 **Responsive Navbar** with scroll shadow, hover animations, and mobile menu

---

## 🔗 API Integration This project uses the [Hacker News Algolia API](https://hn.algolia.com/api) to fetch live data: - **Category Pages** → `https://hn.algolia.com/api/v1/search?query={category}&tags=story` - **Search Results** → `https://hn.algolia.com/api/v1/search?query={keyword}&tags=story` - **Item Detail** → `https://hn.algolia.com/api/v1/items/{id}` (includes nested comments) The API integration ensures stories, comments, and search results are always up‑to‑date. ---

## 🧭 Development Journey

- **Phase 1: Static Pages**  
  Initially, each category (Tech, Science, Games, Business, etc.) had its own static page. This proved the concept but quickly became repetitive.

- **Phase 2: Realization & Refactor**  
  I realized the need for a smarter solution: a single dynamic `[category]` route. This eliminated duplication and made the app scalable.

- **Phase 3: Elegant Navbar**  
  Introduced a `newsCategories` array. Each category name maps automatically to a lowercase path (e.g., `"AI"` → `/ai`).  
  The Navbar `.map()` renders links dynamically, so adding new categories is as simple as updating the array.

- **Phase 4: User‑Friendly Polish**  
  Added animations, scroll‑aware shadow, responsive mobile menu, and trending section.

- **Phase 5: Recruiter‑Friendly Polish** Added animations, scroll‑aware shadow, responsive mobile menu, and trending section.

---

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

🎨 Skeleton loaders for smoother UX

⭐ Bookmark / Favorites system

📊 Search filters (points, comments, date)

🔄 Infinite scroll or "Load more" button

📈 Analytics (mocked) to track category clicks
