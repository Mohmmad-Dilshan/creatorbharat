# CreatorBharat V3 — Modular Setup

## Quick Start

Run these commands in order:

```bash
cd D:\creatorbharat-1\creator-bharat-v3
npm install
npm run dev
```

Then open: **http://localhost:5173/**

## Project Structure

```
creator-bharat-v3/
├── index.html                    # Entry HTML with SEO meta tags
├── vite.config.js                # Vite + React plugin config
├── package.json                  # Dependencies
└── src/
    ├── main.jsx                  # App entry point
    ├── App.jsx                   # Root component + routing
    ├── context.jsx               # Global state (useReducer)
    ├── theme.js                  # Design tokens + API utils
    ├── index.css                 # Global styles + animations
    ├── components/
    │   ├── Primitives.jsx        # Btn, Bdg, Fld, Ring, Card, Bar, Modal, Logo
    │   ├── Layout.jsx            # Navbar, Footer, AuthModal, ToastBar
    │   └── Cards.jsx             # CreatorCard, CampCard
    └── pages/
        ├── HomePage.jsx          # Landing page with hero, creators, campaigns
        ├── CreatorsPage.jsx      # Creator search & discovery
        └── CreatorProfilePage.jsx# Creator detail view
```

## Architecture

- **State**: Global `useReducer` in `context.jsx` — no Redux needed
- **Routing**: Client-side `st.page` switch in `App.jsx`
- **API**: All calls go to `https://creatorbharat.onrender.com/api`
- **Styling**: 100% inline styles using design tokens from `theme.js`
- **Fonts**: Inter + Fraunces + Plus Jakarta Sans via Google Fonts

## Deploy to Vercel

1. Push `creator-bharat-v3/` to a new GitHub repo
2. Import in Vercel
3. Set Root Directory to `creator-bharat-v3`
4. Build Command: `npm run build`
5. Output: `dist`
