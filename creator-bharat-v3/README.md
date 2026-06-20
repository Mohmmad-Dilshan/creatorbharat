# 🇮🇳 CreatorBharat V3 — Elite Creator SaaS Ecosystem

CreatorBharat V3 is a premium, high-performance web platform designed to connect brands and digital creators across India. Built as a Progressive Web App (PWA) with React 18 and Vite 6, it features rich aesthetics (glassmorphism, micro-interactions) and a modular, route-based layout system.

---

## ⚡ Quick Start

### Prerequisites
Make sure you have Node.js (v18+) installed.

### Installation & Run
Run these commands in the project root folder:

```bash
# 1. Install dependencies
npm install

# 2. Run the local development server
npm run dev
```

The application will launch on: **http://localhost:5173/**

---

## ⚙️ Environment Variables (`.env`)

To enable external integrations and define API routes, create a `.env` file in the project root:

```env
# API Base Endpoint (defaults to Render backend)
VITE_API_URL=https://creatorbharat.onrender.com/api

# Authentication mode: 'demo' (for mock fallbacks) or 'api' (for real database authorization)
VITE_AUTH_MODE=demo

# Web3Forms API Key (for Contact Page forms)
VITE_WEB3FORMS_KEY=your_web3forms_access_key
```

---

## 📂 Project Structure

```
creator-bharat-v3/
├── public/                       # Static public assets (icons, manifest icons)
├── docs/                         # Developer documentation & workflow guides
│   ├── DEVELOPER_GUIDE.md        # Deep-dive coding instructions
│   ├── FIXES.md                  # History of bug fixes
│   └── CREATOR_SIDE_PLAN.md      # Roadmap of the creator dashboard
├── src/
│   ├── main.jsx                  # Entry point, mounts StrictMode & providers
│   ├── App.jsx                   # Root layout manager & PWA prompt mounts
│   ├── AppRoutes.jsx             # React Router v7 route paths & layout isolations
│   ├── index.css                 # Saffron/indigo design system styles (92kB)
│   ├── assets/                   # Local images and vectors
│   ├── core/                     # Global state, theme configs, route guards
│   │   ├── context.jsx           # React Context + useReducer (AppProvider)
│   │   ├── theme.js              # Theme customization tokens
│   │   └── ProtectedRoute.jsx    # Role-based route access guard
│   ├── utils/                    # Shared API client and helper functions
│   │   ├── api.js                # Custom fetch wrapper with retries & error handling
│   │   ├── platformService.js    # Profile updates with offline LocalStorage fallback
│   │   └── authService.js        # Authentication & registration actions
│   ├── data/                     # Seed data & blog posts for demo fallbacks
│   ├── components/               # Shared & module-specific UI components
│   │   ├── common/               # Primitives (buttons, inputs, cards)
│   │   ├── layout/               # Navbars, Sidebars, Footers for Public/Creator/Brand
│   │   └── auth/                 # Sign-in gates and OTP forms
│   └── pages/                    # Route-level views (isolated namespaces)
│       ├── public/               # Public visitors: Home, Pricing, FAQ, About
│       ├── auth/                 # Entry: Login, Registration, OTP Verification
│       ├── creator/              # Private: Creator Dashboard, Wallet, Onboarding, AI Co-Writer
│       └── brand/                # Private: Brand Dashboard, Campaign Builder, Analytics
```

---

## 🛠️ Main Build Commands

- **Development Server:** `npm run dev` (Runs Vite with HMR enabled)
- **Production Build:** `npm run build` (Compiles, tree-shakes, and builds assets into `/dist` including the PWA Service Worker)
- **Production Preview:** `npm run preview` (Launches a local static server to test the production build output locally)

---

## 💎 Key Architecture Features

1. **Role-Based Protected Routes:**
   Routes in `AppRoutes.jsx` are wrapped in `<ProtectedRoute allowedRole="creator | brand">`. Guests are redirected to `/login` if trying to access dashboards, and users with a different role are routed safely away.

2. **Progressive Web App (PWA) Offline Support:**
   Configured with `vite-plugin-pwa` in `vite.config.js`. Assets are precached via Workbox, allowing fast reloads and offline load capabilities. A custom install prompt (`PWAInstallPrompt`) and update banner (`PWAUpdatePrompt`) are mounted in `App.jsx`.

3. **Offline Local Database Fallbacks:**
   When database servers are sleeping, offline, or experiencing network errors, `platformService.js` and `authService.js` intercept failures and fall back to local `localStorage` modifications. The UI updates seamlessly, allowing a fully functional prototype without crashes.

---

## 👨‍💻 Collaboration & Handover

If you are a developer newly working on this repository, please review:
* **[DEVELOPER_GUIDE.md](file:///d:/creatorbharat-1/creator-bharat-v3/docs/DEVELOPER_GUIDE.md)** for a deep dive on state management, adding new routes, and styling rules.
* **[FIXES.md](file:///d:/creatorbharat-1/creator-bharat-v3/docs/FIXES.md)** for a checklist of previously resolved issues.
