# CreatorBharat Frontend Architecture & Guidelines

This document outlines the modernized directory structure and coding standards for the CreatorBharat frontend. Follow these rules for all future updates to ensure scalability and maintainability.

---

## 📂 Directory Structure

```text
src/
├── components/
│   ├── layout/         # Global layout parts (Header, Footer, Chatbot, Sidebar)
│   ├── ui/             # Atomic UI components (Button, Input, Modal, etc.)
│   │   ├── index.js    # Central export (Barrel file)
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Modal.jsx
│   ├── Primitives.jsx  # Backward-compatibility layer (Exports everything from /ui)
│   └── Cards.jsx       # Reusable business cards (CreatorCard, CampCard)
├── pages/              # Categorized application pages
│   ├── public/         # Homepage, About, Creators Marketplace
│   ├── auth/           # Login, Signup, OTP, Forgot Password
│   ├── creator/        # Creator Dashboard, Score, Applications
│   ├── brand/          # Brand Dashboard, Campaigns, Talent Discovery
│   ├── legal/          # Privacy, Terms, Guidelines
│   └── blog/           # Blog Listing and Article details
├── context.jsx         # Global state management (AppProvider)
├── theme.js            # Design tokens, colors, and global styles
└── utils/              # Helper functions and API logic
```

---

## 🛠️ Coding Guidelines

### 1. Adding New Pages
*   **DO NOT** add pages directly to `src/pages/`.
*   Place them in the appropriate subdirectory (e.g., a new dashboard tool goes into `src/pages/creator/`).
*   Update `App.jsx` with the new import path.

### 2. Using UI Components
*   Always check `src/components/ui/` first before creating a new button or input.
*   **Import Pattern**: 
    ```javascript
    // Preferred (Modular)
    import { Button, Input } from '@/components/ui'; 
    
    // Legacy support (still works)
    import { Btn, Fld } from '../components/Primitives';
    ```

### 3. Component Standards
*   **PropTypes**: Every component **MUST** have prop validation using `PropTypes`.
*   **Styling**: Use the `T` (Theme) object from `src/theme.js` for colors and spacing to ensure consistency.
*   **Responsiveness**: Use the `mob` (mobile) state derived from `window.innerWidth` for viewport-specific rendering.

### 4. Code Quality
*   **No Unused Imports**: Always remove unused variables and imports (e.g., `lucide-react` icons).
*   **Cognitive Complexity**: Avoid deep nested ternary operations. Use helper functions or early returns.
*   **List Keys**: Always use a unique ID (like `item.id`) for `.map()` keys, never just the array index.

---

## 🚀 Next Steps (Pending)
*   [ ] Move more specialized components from `Primitives.jsx` to `src/components/ui/`.
*   [ ] Implement Code Splitting (`React.lazy`) for categorized page folders.
*   [ ] Standardize all dashboard pages to use `DashboardLayout.jsx`.

---

**Built with ❤️ for Bharat's Creator Economy.**
