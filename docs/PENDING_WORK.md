# 🇮🇳 CreatorBharat V3 — Pending & Future Work Items

This document catalogs future operational tasks, integrations, and optimizations required post-launch for CreatorBharat.

---

## 📋 1. Integrations & Live Verification (Post-Deploy)
- [ ] **Razorpay Live Keys Configuration**:
  - Swap testing keys (`rzp_test_...`) in the backend and frontend `.env` files with actual production Live Keys (`rzp_live_...`).
- [ ] **Configure Live Webhooks**:
  - Add `/api/payments/webhook` URL in the Razorpay developer dashboard.
  - Set `RAZORPAY_WEBHOOK_SECRET` in Render environment settings to secure events validation.
- [ ] **Resend Live Email Approval**:
  - Verify your custom domain (e.g., `creatorbharat.in`) inside the Resend console.
  - Remove the Resend account from sandbox mode to send automated transactional emails to any external email address (creators & brands) instead of just the verified admin email.

---

## 🌐 2. Domain Mapping & DNS Setup
- [ ] **Frontend (Vercel/Cloudflare)**:
  - Add domain names (e.g., `creatorbharat.in` and `www.creatorbharat.in`) to the Vercel project settings and configure `CNAME` records in your registrar's DNS panel.
- [ ] **Backend API (Render)**:
  - Configure `api.creatorbharat.in` inside Render Web Service settings, adding matching `CNAME` or `A` records to point to Render's server IPs.
- [ ] **Admin Panel (Vercel)**:
  - Map `admin.creatorbharat.in` to the separate Vite admin portal build settings.

---

## 🛡️ 3. Infrastructure, Caching & Backups
- [ ] **PostgreSQL Automatic Backups**:
  - Schedule daily cron jobs or enable point-in-time recovery (PITR) in Neon Console for the database storage.
- [ ] **Redis Caching (Scaling Upgrade)**:
  - Introduce Redis caching layer in the backend (`creatorbharat-backend`) for public creator listings and search lookups to bypass database query latency when traffic spikes.
- [ ] **Rate Limiting Refinements**:
  - Tune standard rate limiters in `src/index.js` to align with expected real-world API request thresholds.

---

## 📱 4. Mobile PWA & App Stores
- [ ] **App Store / Google Play Prep**:
  - Use Bubblewrap or PWABuilder to package the compiled progressive web app (`dist/`) into an Android App Bundle (`.aab`) and iOS package if publishing to app stores is desired.
