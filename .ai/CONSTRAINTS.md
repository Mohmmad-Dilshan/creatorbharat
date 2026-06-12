# Codebase Constraints & Avoidance Rules (What NOT to do)

To maintain codebase health, safety, and stability, all AI models must strictly adhere to the following rules:

---

## 🚫 1. Do NOT Track Temporary/Output Directories
* **Ignored Folders:** Never stage or commit `node_modules/`, `dist/`, `dev-dist/`, `backups/`, or `docs/` inside the `creator-bharat-v3` folder.
* **Root Cleanup:** Never allow untracked backup folders (`backups/`, `v3-backup-stable/`, etc.) at the root level. All backups must reside in `local_backups/` and remain ignored.
* **Specs Folder:** The auto-generated specs directory `.kiro/` must remain ignored and untracked.

---

## 🚫 2. Do NOT Use Deprecated Lucide Icons
* Lucide-react updates deprecate/remove specific branding social icons (like `Instagram`, `Youtube`, `Twitter`).
* **Rule:** NEVER import social brand icons from `lucide-react`.
* **Correct Usage:** Import the custom branding icons from `@/components/icons/SocialIcons.jsx`.

---

## 🚫 3. Do NOT Use Fragile Relative Paths for Deep Imports
* When importing core context or primitives from deeply nested components (e.g. `src/components/auth/views/BrandRegisterView.jsx`), do not use multiple layers of relative parents like `../../../../components/common/Primitives`.
* **Correct Usage:** Use the `@` path alias mapped to `src/`. For example:
  ```javascript
  import { useApp } from '@/core/context';
  import { Btn } from '@/components/common/Primitives';
  ```

---

## 🚫 4. Do NOT Bypass Auth Guards & Session Logic
* Access to `/creator/*` and `/brand/*` must strictly go through `AppRoutes.jsx` context check routing guards.
* Never mock authentication states inside individual pages. Use `dsp({ t: 'LOGIN', u: userData, role: 'creator' })` to initialize user sessions securely.

---

## 🚫 5. Do NOT Compromise Mobile Responsiveness
* CreatorBharat is a mobile-first SaaS product.
* Do not add hardcoded pixel widths (`width: "1200px"`) without media queries.
* Renders must automatically swap layouts or drop column grids on viewport width <= 768px.
* For creator side page dashboards, make sure navigation falls back to the native-app-like mobile bottom dock bar (`EliteMobileNav.jsx`).
