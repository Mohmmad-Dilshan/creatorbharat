# CreatorBharat AI Assistant Guidelines

Welcome! This directory contains context, constraints, and the roadmap for **CreatorBharat V3** to help AI agents understand the repository structure, code standards, and future features.

## 📌 Context Files

To understand the project fully, read the following files in this directory:
1. **[CONSTRAINTS.md](file:///d:/creatorbharat-1/.ai/CONSTRAINTS.md):** Critical rules, codebase constraints, and what **NOT** to do.
2. **[V3_ARCHITECTURE.md](file:///d:/creatorbharat-1/.ai/V3_ARCHITECTURE.md):** Tech stack details, folder structures, styling, and path resolving rules.
3. **[V3_FUTURE_ROADMAP.md](file:///d:/creatorbharat-1/.ai/V3_FUTURE_ROADMAP.md):** Planned features, subscription limits, and backend integrations.

---

## 🛠️ Main Projects in the Repository

At the root directory, there are three active projects:
* **`/creator-bharat-v3` (V3 Frontend):** The main creator/brand SaaS frontend application built with React + Vite.
* **`/creatorbharat-backend` (API Server):** Express.js API backend using Prisma ORM.
* **`/creatorbharat-admin` (Admin Panel):** React-based admin control panel.

---

## 🧠 Core Behavior Guidelines for AI

When writing code or refactoring files in this codebase, you must:
* **Preserve Aesthetics:** Keep the dynamic conic animated borders, glassmorphism panels, harmonious HSL colors, and custom Outfit/Inter typography.
* **No Placeholders:** If you need mock avatars or portfolio imagery, do not use dead gray boxes. Use SVGs, custom mock data, or Cloudinary URL assets.
* **Verify Builds:** Always run `npm run build` inside `creator-bharat-v3/` after editing files to ensure there are no imports or syntax errors.
* **Keep Root Clean:** All local backup folders and references must go to the ignored `local_backups/` directory at the root, NOT inside project folders.
