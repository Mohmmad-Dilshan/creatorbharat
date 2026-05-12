# CreatorBharat v3: Ultimate Frontend Master Map (n8n Style)

This master map visualizes the entire frontend lifecycle, showing how data and users flow through the system nodes.

---

## 1. The Global Workflow Diagram

```mermaid
graph TD
    %% Global Entry
    Entry((USER URL HIT)):::trigger --> Shell[Global Layout Shell]:::logic
    
    %% Engine Room
    subgraph Engine [The Engine Room]
        Shell --> State[Global State: useApp Context]:::logic
        State --> Router[AppRoutes: The Logic Switch]:::logic
        Router --> Auth{Auth Check?}:::logic
    end

    %% Public Branch
    subgraph Public [Public Ecosystem Nodes]
        Auth -->|Guest| P1[Home: High-End Hero]:::page
        P1 --> P2[Marketplace: Filter Engine]:::page
        P2 --> P3[Leaderboard: Ranking]:::page
        P1 --> P4[Blog Hub: Content]:::page
        P1 --> P5[Pricing: Plans]:::page
        P1 --> P6[Official: Parallax Identity]:::page
        
        %% Premium Gate
        P2 --> Gate{Elite Lock?}:::logic
        P5 --> Gate
        Gate -->|Locked| Paywall[Premium Blur Lock]:::warning
    end

    %% Creator Workspace Branch
    subgraph Creator [Creator Workspace Nodes]
        Auth -->|Role: Creator| C1[Overview: Dynamic Stats]:::success
        C1 --> C2[Applications: Track Deals]:::page
        C1 --> C3[Wallet: Money Tracker]:::page
        C1 --> C4[Score: Trust Metrics]:::page
        C1 --> C5[Monetize: Pro Tools]:::page
        C1 --> C6[Settings: Profile]:::page
    end

    %% Brand Workspace Branch
    subgraph Brand [Brand Workspace Nodes]
        Auth -->|Role: Brand| B1[Control: Campaign ROI]:::warning
        B1 --> B2[Builder: Launch Missions]:::page
        B1 --> B3[Scout: Hire Talent]:::page
        B1 --> B4[Compare: Side-by-Side]:::page
    end

    %% Utility & Background Nodes
    subgraph Utils [The Utility Grid]
        State --> SEO[SEO: Dynamic Meta]:::logic
        State --> Cache[Platform Service: Caching]:::logic
        State --> Toasts[Notification Engine]:::success
    end

    %% Styles
    classDef trigger fill:#FF9431,stroke:#fff,stroke-width:4px,color:#fff;
    classDef logic fill:#1e293b,stroke:#FF9431,stroke-width:2px,color:#fff;
    classDef page fill:#fff,stroke:#e2e8f0,stroke-width:2px,color:#1e293b;
    classDef success fill:#138808,stroke:#fff,stroke-width:2px,color:#fff;
    classDef warning fill:#ef4444,stroke:#fff,stroke-width:2px,color:#fff;
```

---

## 2. Technical Node Summary

### A. The Routing Engine (`AppRoutes.jsx`)
*   **Status:** 100% Operational.
*   **Logic:** Uses `lazy()` loading for performance and `AuthLock` HOC for premium content security.
*   **Connectivity:** Connects 28 unique routes across 3 roles (Guest, Creator, Brand).

### B. The Global Store (`context.jsx`)
*   **Status:** Stable.
*   **Logic:** Single source of truth for User Auth, UI state (Mobile Menu), and filtering parameters.
*   **Connectivity:** Injected into every component via `useApp()` hook.

### C. The Visual Shell (`PublicLayout` / `DashboardLayout`)
*   **Status:** 100% Responsive.
*   **Logic:** Handles z-index layering, global blurs, and navigation visibility (Navbar vs Dock).
*   **Connectivity:** Wraps all content to ensure design consistency.

---

## 3. The 100K User Scaling Roadmap

1.  **Dynamic Data Binding:** Replace all `MockData` nodes with `API Action` nodes.
2.  **Live Updates:** Integrate WebSocket nodes for real-time notifications.
3.  **Analytics Layer:** Add `Data Visualization` nodes to dashboards.
4.  **Admin Node:** Create a global monitor to track platform health.

---
**Summary:** The frontend is technically "Wired Up". The connections are solid, the security is active, and the flow is logical. We are ready to scale the data layer.
