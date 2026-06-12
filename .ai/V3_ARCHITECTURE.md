# CreatorBharat V3 — Architecture & Stack Blueprint

This document details the frontend architecture, file paths, configurations, and core systems of **CreatorBharat V3**.

---

## 1. Technical Stack

* **Core Library:** React 18.3.1 (using functional components and Hooks)
* **Build Tool:** Vite 6.3.5 (configured with CSS modules and path aliases)
* **Routing:** React Router DOM 7.15.0 (centralized lazy routing in `src/AppRoutes.jsx`)
* **State Management:** React Context API + `useReducer` in `src/core/context.jsx`
* **Animations:** Framer Motion 12.38.0
* **Typography:** Outfit (headings) and Inter (body copy) loaded from Google Fonts.
* **Scrolling:** Lenis scroll library for kinetic smooth scrolling.

---

## 2. Directory Layout & Key File Targets

```
creator-bharat-v3/
├── vite.config.js       # Vite bundler options & "@" alias configuration
├── jsconfig.json        # VS Code path Intellisense mapping
├── vercel.json          # Rewrites / SPA routing configuration for Vercel
├── index.html           # Root HTML, sets up Google Font links
├── public/              # Static assets, logos, and llms.txt context
└── src/
    ├── App.jsx          # Entry wrapper, mounts Context Provider & Router
    ├── AppRoutes.jsx    # Central routing router with lazy loading
    ├── core/
    │   ├── context.jsx  # Global reducer, state actions, and auth sync
    │   └── theme.js     # Color palettes, gradients, and styling tokens
    ├── components/
    │   ├── common/      # Shared core primitives (Btn, Fld, Bdg, Modal, SEO)
    │   └── layout/      # Navbar, Sidebar, Dock, and AIChatbot
    └── pages/           # Pages organized strictly by access role
```

---

## 3. Path Aliasing Configuration
Path alias `@` is mapped to the `src/` directory. 
* **Configured in:** `vite.config.js` & `jsconfig.json`
* **Example Usage:**
  ```javascript
  // Always import like this:
  import Seo from '@/components/common/SEO';
  import { useApp } from '@/core/context';
  ```

---

## 4. UI styling & Design System
* **Harmony HSL Palettes:** Primary brand colors utilize HSL tailored colors (e.g., `#FF9431` saffron/orange accent, `#128807` green brand accent, `#0f172a` dark gray text).
* **Glassmorphism:** Visual card panels utilize translucent background backdrops with thin borders and subtle blurs:
  ```css
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(30px);
  ```
* **Conic Animations:** Premium elements feature gradient flow animations on borders and cards using custom `@keyframes`.
