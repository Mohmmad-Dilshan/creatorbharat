# V3 Future Feature Roadmap & Implementation Logic

This document details the specifications and exact technical implementation plans for upcoming features in the **CreatorBharat V3** platform.

---

## 1. Instagram-Style Creator Portfolio Gallery
Allows creators to showcase screenshots, campaigns, and photos of their past work in a grid.
* **Component Target:** `src/pages/creator/ProfileBuilderPage.jsx` (editor) and `src/pages/public/OfficialProfilePage.jsx` (render).
* **Implementation Plan:**
  * Build a CSS Grid Masonry component displaying images in a square 1:1 aspect ratio.
  * Clicking an image opens a modal lightbox showing the full image, title/description, campaign details, and likes count.
  * Uploads must be stored in Cloudinary with automated optimization (`q_auto,f_auto`) and resized to max `800px` width.
  * Backend API endpoints: `POST /creators/me/gallery` (upload) and `DELETE /creators/me/gallery/:id` (delete).

---

## 2. Milestone & Task Gig System
A structured workflow tracker to ensure campaign execution is completed and verified before payouts are released.
* **Component Target:** `/creator/opportunities` (opportunity panel) & `/brand/brand-dashboard` (brand panel).
* **Implementation Plan:**
  * Render a progress timeline of milestone steps (e.g. *Draft Submitted* -> *Approved* -> *Link Live* -> *Escrow Disbursed*).
  * Creators can upload proof (screenshots or URLs) for each milestone.
  * Brands receive notifications and can click "Approve Milestone".
  * The backend triggers database mutation updating the escrow status and releases payment upon approval of the final milestone.

---

## 3. Subscription-Based Unlimited Social Links
Monetize creator profiles by limiting basic links on the free tier.
* **Component Target:** `/creator/profile` (Social Link Tree Section).
* **Pricing Rules:**
  * **Free Account:** Maximum of **3 social links** allowed.
  * **Pro/Elite Account:** **Unlimited** social links.
* **Frontend Logic:**
  * Read `st.isPro` from global app state.
  * If `isPro` is `false` and links array length >= 3, disable the "Add Link" input and display a premium modal prompting the user to upgrade to Pro.

---

## 4. Follow & Message Official CreatorBharat Page
Build a direct line of communication between users and the support/admin team.
* **Component Target:** `src/pages/creator/MessagesPage.jsx` (Inbox).
* **Implementation Plan:**
  * Add a default verified chat thread with "CreatorBharat Official Support" in every creator's inbox.
  * Enable creators to follow/unfollow the official page to receive platform announcements.
  * Connect support threads to a dedicated Slack/Discord webhook or a simple Admin dashboard panel for the support team.

---

## 5. Creator Achievements & Awards System
Gamify creator growth to increase platform retention.
* **Tiers & Ranks:**
  * *Bronze Badge:* Account completed, first verification.
  * *Silver Badge:* 50k+ Reach, 2+ campaigns completed.
  * *Gold Badge:* 250k+ Reach, 4.8+ rating score.
  * *Elite/Platinum Badge:* Top 1% in Leaderboard.
* **Frontend Logic:**
  * Render these badges as high-fidelity animated SVG icons on the creator's public profile and dashboard.
  * Fetch badges list dynamically from backend user profile payload.
