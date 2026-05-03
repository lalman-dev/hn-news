# DESIGN.md

> Design decisions, rationale, and tradeoffs for the HN Portal UI overhaul.
> Written by Lalman — May 2026

---

## Context

This project had good bones for a long time. Strong Lighthouse scores, intentional SSR/CSR split, solid accessibility semantics, clean API layer. The architecture was never the problem.

The problem was it looked like every other Next.js project built. Same gray cards, same Inter font, same muted palette. Nothing wrong with any of those choices individually — but together they signal "I followed the docs" rather than "I made decisions."

The goal of this overhaul was simple: same code, different story. No logic changes. No performance regressions. Just a UI that matches the quality of what's underneath it.

---

## Why Terminal / Editorial?

Hacker News is read by engineers, founders, and researchers. People who are comfortable with density. People who actually prefer information over decoration. The original HN itself is famously, almost aggressively plain — and yet it has one of the most loyal readerships on the internet. That's not a coincidence.

So the question I asked myself was: what does a _designed_ version of that sensibility look like? Not a prettier clone. Not a modern SaaS dashboard with rounded cards and purple gradients. Something that respects the content and the reader.

The answer was terminal-editorial. Think Bloomberg terminal. Think a well-typeset technical journal. Think the kind of interface that assumes you're there to read, not to be impressed by the UI.

Concretely, that means:

- **Monospaced metadata** — points, comments, authors, labels. Everything that is data looks like data. `Space Mono` for all of it.
- **Structured density** — no wasted whitespace, but nothing cramped either. Every element earns its space.
- **Restrained motion** — staggered card reveals on load, accent stripe on hover. That's it. Animation should be felt, not watched.
- **The scanline** — one pixel, barely visible, repeating across the body. It shouldn't be noticed consciously. But it adds texture and makes the dark mode feel like a screen you're working on, not a marketing page you're looking at.

The aesthetic is a deliberate signal: this is a reading tool built by someone who thinks about craft.

---

## Why Cyan?

Cyan — `#0891b2` light, `#22d3ee` dark — creates separation while staying within the technical/terminal register. Orange reads warm, energetic, startup-y. Cyan reads precise, cool, technical. For a news portal aimed at an engineering audience, that's actually the more honest choice.

There's also a practical reason: cyan has better contrast against the warm cream background (`#f5efe4`) of the light theme than orange does. The warmth of the paper and the coolness of the accent create a natural tension that makes the accent pop without needing to be loud.

In dark mode, `#22d3ee` against near-black `#0d0c09` is crisp and readable at small sizes — which matters because the accent is used on badge text as small as `0.6rem`.

---

## Why These Fonts?

Three fonts. Hard roles. No overlap.

### Bebas Neue — Display / Headings

Used exclusively for page titles (`FRONT PAGE`, `TECH`, `DISCUSSION`). Bebas is condensed, all-caps, zero-ambiguity display type. It takes up vertical rhythm without taking up horizontal space, which matters on a dense layout.

The reason it works here: Hacker News categories are short words. `TECH`. `AI`. `DESIGN`. In Bebas at `2.8rem` they become architectural elements, not just labels. They anchor the page.

I chose it over something like Playfair or Cormorant because this isn't a lifestyle magazine. It's a terminal. Bebas has no warmth. That's correct.

### Fraunces — Story Titles

This is the most considered choice. Fraunces is an optical size serif — meaning it was designed to look good at small sizes, which is exactly where story titles live. At `0.9rem` most display fonts fall apart. Fraunces holds.

It also has character. The italic cuts are expressive. The `g` descender, the `a` construction — there's personality in it without being decorative. It reads seriously, which is appropriate for content that is serious.

The contrast between Bebas (loud, condensed, display) and Fraunces (quiet, optical, editorial) is intentional. The hierarchy is immediately clear without needing size alone to carry it.

### Space Mono — Metadata / UI

Everything that is not content uses Space Mono. Nav links. Badge text. Comment authors. Timestamps. Section labels. The search input.

Mono type in UI metadata is a deliberate choice, not a stylistic one. It signals: this is data, not prose. It creates a visual layer below the story titles that the eye learns to read differently. You scan the badges. You read the titles. The distinction is typographic.

Space Mono specifically over other monospaced options (IBM Plex Mono, Fira Code) because it's slightly wider and more editorial. It doesn't look like a code editor. It looks like a terminal that someone designed.

---

## Tradeoffs: Readability vs Density

The design leans dense. That was a deliberate call but it comes with real costs.

**What density gives you:**

More stories above the fold. Faster scanning. The feeling of a professional tool rather than a consumer app. Users who are comfortable with information-rich interfaces will feel at home immediately.

**What density costs you:**

Casual readers — people who don't live on HN — may find it slightly cold on first contact. The monospaced metadata is efficient but not warm. The cream/ink palette is refined but not inviting in the way that, say, a rounded card on a white background is inviting.

Story titles at `0.92rem` in Fraunces are readable — Fraunces was chosen specifically because it holds at that size — but they are smaller than what most news apps default to (`1rem`–`1.1rem`). I made that tradeoff consciously. The grid fits more cards without scrolling, and Fraunces earns it.

**The line I tried not to cross:**

Density should never compromise the primary job, which is reading story titles and deciding whether to click. Every decision — font choice, line height (`1.48`), card padding (`16px 18px`), badge sizing — was made with that in mind. The metadata is dense. The titles are not.

If I were building this for a general audience I'd increase the base font size by `1–2px` and add slightly more card padding. For the HN audience specifically, the current density feels right.

---

## What I'd Do Next

- **Syntax-highlighted timestamps** — relative time (`2h ago`) in mono, styled differently from author names
- **Reading progress indicator** on item detail pages — a thin signal-colored bar at the top
- **Category color coding** — subtle left-border tint variation per category, so `/ai` feels slightly different from `/design` without breaking the system
- **Reduced motion support** — `@media (prefers-reduced-motion)` pass to cut all animations for users who need it. The architecture supports it, I just haven't written the overrides yet.

---

_The best UI is one that gets out of the way of the content. This one tries to do that while still having a point of view._

— Lalman
