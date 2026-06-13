# CreatorBharat V3 — Public-Side Improvements Implementation Guide

This document contains a complete list of required public-side improvements, target files, and code logic to avoid repeated planning and research.

---

## 🎨 1. Dynamic Rotating Cities in Hero Section
*   **Target File:** `creator-bharat-v3/src/components/home/Hero.jsx`
*   **Description:** Animate a list of cities in the hero headline to highlight Tier-2/3 coverage.
*   **Logic:**
    *   Define `const CITIES = ['Jaipur', 'Mumbai', 'Lucknow', 'Indore', 'Bhopal', 'Surat'];`
    *   Manage current city index with `useState`.
    *   Rotate indices inside a `setInterval` (e.g., every 3000ms).
    *   Wrap the changing text in Framer Motion `<AnimatePresence mode="wait">` using vertical slide transitions:
        ```jsx
        <motion.span
          key={currentCity}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
        >
          {currentCity}
        </motion.span>
        ```

---

## 📈 2. Soft Lock for Rate Calculator
*   **Target Files:** 
    *   `creator-bharat-v3/src/AppRoutes.jsx` (Remove `<AuthLock>` wrapper from `/rate-calc`)
    *   `creator-bharat-v3/src/pages/public/RateCalcPage.jsx` (Integrate stateful calculator lock)
*   **Logic:**
    *   Check if `st.user` is logged in.
    *   If NOT logged in, set up a local storage counter: `const [count, setCount] = useState(() => Number(localStorage.getItem('cb_calc_uses') || 0));`
    *   When the user clicks "Calculate", increment the count and save it to `localStorage`.
    *   If `count >= 1` and there is no logged-in user, display a gorgeous, blurred glassmorphic container over the details panel with a signup CTA button:
        ```jsx
        <div style={{ filter: 'blur(8px)', pointerEvents: 'none' }}>{/* Metrics Panel */}</div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md">
          {/* Join Premium Banner & CTA to /join */}
        </div>
        ```

---

## ⚡ 3. Mobile Performance Fallback for IndiaMap3D
*   **Target Files:**
    *   `creator-bharat-v3/src/components/IndiaMap3D/IndiaMap3D.jsx`
    *   `creator-bharat-v3/src/components/IndiaMap3D/IndiaMap3D.module.css`
*   **Logic:**
    *   In `IndiaMap3D.jsx`, check the `mob` prop.
    *   If `mob === true`, completely skip dynamic D3 GeoJSON loading and drawing in the `useEffect` to save memory and CPU cycles.
    *   Instead, render a list of major states in a clean, horizontal-scrolling chip bar:
        ```jsx
        const MAJOR_STATES = ['Maharashtra', 'Rajasthan', 'Delhi', 'Uttar Pradesh', 'Karnataka'];
        // Render horizontal scroll of chips:
        MAJOR_STATES.map(state => (
          <button key={state} onClick={() => onSelectState(state)}>
            {state} ({stateCounts[state] || 0})
          </button>
        ))
        ```

---

## 🔍 4. Dynamic OpenGraph / SEO Previews on Creator Profiles
*   **Target File:** `creator-bharat-v3/src/pages/creator/CreatorProfilePage.jsx`
*   **Description:** Inject specific meta tags dynamically when public creator pages are loaded or shared.
*   **Logic:**
    *   Use `<Helmet>` from `react-helmet-async` (already in dependencies).
    *   Extract creator metadata from the profile API response.
    *   Inject dynamic values:
        ```jsx
        <Helmet>
          <title>{`${creator.name} (@${creator.handle}) | CreatorBharat`}</title>
          <meta name="description" content={`Collaborate with ${creator.name}, a verified ${creator.niche.join(', ')} influencer from ${creator.city} on CreatorBharat.`} />
          <meta property="og:title" content={`${creator.name} (${creator.followers} Followers)`} />
          <meta property="og:description" content={creator.bio} />
          <meta property="og:image" content={creator.profile_pic || creator.avatarUrl} />
          <meta property="og:type" content="profile" />
        </Helmet>
        ```

---

## 🏜️ 5. Custom Empty State Illustrations & "Clear Filters" actions
*   **Target File:** `creator-bharat-v3/src/pages/brand/CreatorsPage.jsx` (specifically inside `<CreatorGrid>`)
*   **Logic:**
    *   When filtered creator list length is 0, display a beautiful empty state container.
    *   Avoid plain text. Include:
        *   A stylized Lucide icon (e.g. `<Search size={48} color="var(--cb-orange)" />`).
        *   A title: *"No creators match your active filters"*
        *   A button to reset filters: `<Btn onClick={resetFilters}>Clear All Filters</Btn>`
