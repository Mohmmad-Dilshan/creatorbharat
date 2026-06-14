# 🇮🇳 CreatorBharat — Creator Economy Trust Infrastructure

> [!CAUTION]
> ### 🛑 PROPRIETARY & CONFIDENTIAL
> **Copyright © 2026 Mohmmad Dilshan. All Rights Reserved.**
> 
> This repository and all its source code (including frontend client modules, backend Express api services, database schemas, and admin assets) are strictly **proprietary** and **confidential**. 
> 
> **Any unauthorized copying, cloning, modification, reproduction, public hosting, or commercial redistribution of this software is strictly prohibited under international copyright laws.**

---

Welcome to the **CreatorBharat** monorepo. CreatorBharat is the infrastructure of trust for India's digital creator economy, powering secure connections, campaigns, and payments between verified creators and brand partners.

This repository is structured as a **Monorepo** to keep the frontend client, backend api server, and administrative management platforms synchronized under a single version-controlled tree.

---

## 📂 Repository Architecture

```text
creatorbharat/
├── .github/
│   └── workflows/
│       └── ci.yml             # Automated CI Build & Lint pipeline
├── .prettierrc                # Global code formatting standards
├── .editorconfig              # Code editor style syncing
├── LICENSE                    # Proprietary License certificate
├── package.json               # Root monorepo dev orchestrator
├── vercel.json                # Vercel monorepo deployment config
│
├── creator-bharat-v3/         # FRONTEND: React + Vite + PWA SaaS Web Application
│   ├── src/                   # React components, pages, context managers
│   ├── public/                # Static assets, branding graphics
│   └── vite.config.js         # Build and PWA bundler configurations
│
├── creatorbharat-backend/     # BACKEND: Express.js REST API Server
│   ├── src/                   # API endpoints, middleware, services
│   └── prisma/                # Prisma ORM schema and seed scripts
│
└── creatorbharat-admin/       # ADMIN: Internal management console
```

---

## ⚡ Quick Start Dev Setup

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v20+ recommended)
- [npm](https://www.npmjs.com/) (v10+ recommended)
- [PostgreSQL](https://www.postgresql.org/) (for backend database)

### 1. Installation
Run the dependency installation script from the **root** folder. This installs orchestrators in the root and generates schema models inside the subdirectories:

```bash
# Install root dependencies (concurrently, etc.)
npm install

# Install Frontend dependencies
cd creator-bharat-v3 && npm install

# Install Backend dependencies & generate prisma client models
cd ../creatorbharat-backend && npm install
```

### 2. Configure Environment Variables
You need to create `.env` files in both the frontend and backend directories. Use the provided examples to configure your local keys:

- **Frontend:** Copy `creator-bharat-v3/.env.example` to `creator-bharat-v3/.env`
- **Backend:** Copy `creatorbharat-backend/.env.example` to `creatorbharat-backend/.env`

---

## 🚀 Development Scripts

You can run both servers concurrently or run them individually from the **root directory** using these commands:

| Command | Action | Description |
| :--- | :--- | :--- |
| `npm run dev:all` | **Frontend + Backend** | Starts Vite server and Express backend in parallel |
| `npm run dev` | **Frontend Only** | Starts the client dev server on [http://localhost:5173](http://localhost:5173) |
| `npm run dev:backend` | **Backend Only** | Starts the Express server using Nodemon on [http://localhost:5000](http://localhost:5000) |
| `npm run build` | **Build Frontend** | Compiles Vite client into optimized static assets in `/dist` |
| `npm run preview` | **Preview Build** | Launches local web server to test the compiled client |

---

## 🛡️ Repository Standards

To maintain an elite production-grade repository, all code changes must comply with these quality gates:

### 1. Automated CI Pipeline
We have integrated a **GitHub Actions CI Pipeline** ([ci.yml](file:///.github/workflows/ci.yml)). On every `push` and `pull_request` to `main`, GitHub automatically checks out the code, verifies frontend compilation (`npm run build`), and verifies backend Prisma generation (`npx prisma generate`).

### 2. Formatting Standards
The workspace uses **Prettier** to enforce formatting rules. Please ensure your editor has the Prettier extension enabled, or run:
```bash
npx prettier --write .
```
Rules are defined in the global [.prettierrc](file:///.prettierrc) file.

---

## 📄 License

This project is licensed under a proprietary and confidential license. See the [LICENSE](file:///LICENSE) file for details. Unauthorized reproduction is strictly prohibited.
