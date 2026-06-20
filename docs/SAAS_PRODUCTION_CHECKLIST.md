# 🇮🇳 CreatorBharat V3 — Commercial SaaS Production Checklist

This document details the exact requirements, technical stacks, and implementation steps needed to turn the current **CreatorBharat V3** codebase into a 100% complete, commercially launchable, real-world SaaS product.

---

## 📋 Full-Stack Requirements Matrix

| Module | What is Built Now | What is Needed for Production | Technical Stack |
| :--- | :--- | :--- | :--- |
| **Authentication** | JWT signup, login, session guards | Email confirmation, OTP checks, Google OAuth, Password Reset flows | JWT, Resend API, Google OAuth2 |
| **Media Storage** | Local fallbacks & static seed URLs | Live file/image uploads for profiles, portfolios, brand logos, PAN/Aadhaar verification documents | Cloudinary SDK, Multer |
| **Escrow & Payments** | Razorpay order generation & signature verify | Split payments (commission sharing), automated subscriptions (monthly billing), invoice generator | Razorpay Route API, Razorpay Subscriptions |
| **Messaging** | Polling REST endpoints (retrieve history) | Real-time chat, typing indicators, read receipts, instant push notifications | Socket.io / WebSockets, Push API |
| **Admin Console** | Simple database counts, verifications approval table | Visual charts (revenue, growth), user bans, dispute resolution panel, audit logs | Recharts, Admin routers |
| **Email Services** | Stubbed functions | Transactional emails (signup welcome, deal alerts, pitch receipt, payment success invoices) | Resend API, HTML templates |

---

## 🛠️ Deep-Dive Implementation Roadmap

### Phase 1: Cloud Media Storage (Image/File Uploads)
To allow creators to upload avatars, portfolio works, and verifications dynamically:
- **Prerequisites**: A Cloudinary developer account.
- **Backend Setup**:
  - Configure `Multer` on Express to process multipart file uploads in memory.
  - Set up a secure uploads controller that sends files directly to Cloudinary.
  - Save the secure URL returned by Cloudinary to the corresponding `photo` or `portfolio` field in PostgreSQL.
- **Frontend Setup**:
  - Add file input fields in the Profile Builder (`ProfileBuilderPage.jsx`) with image croppers.
  - Send files using `FormData` instead of JSON payload.

### Phase 2: Live Chat & Real-Time Messaging (WebSockets)
To enable instant discussion between brands and creators:
- **Backend Setup**:
  - Integrate `socket.io` with the Express server.
  - Create socket event listeners (`join_room`, `send_message`, `typing`).
  - Store incoming messages in the database and broadcast them instantly to the target socket ID.
- **Frontend Setup**:
  - Hook the chat window in `MessagesPage.jsx` to a socket client.
  - Update chat logs instantly on receiving incoming socket events without polling the API.

### Phase 3: Split Payments & Razorpay Escrows
To run the automated creator marketplace with commission splits (e.g. 10% platform commission):
- **Backend Setup**:
  - Use **Razorpay Routes (Marketplace)** to create separate virtual accounts for creators.
  - When a brand creates a campaign deal, they pay the budget into a secure Escrow account.
  - Upon campaign completion, the backend calls Razorpay to split the escrow: 90% is routed to the creator's bank account and 10% is captured as the platform fee.
- **Billing**: Configure Razorpay Subscriptions for monthly/yearly plans.

### Phase 4: Transactional Email Automations
To notify users of critical system events:
- **Backend Setup**:
  - Implement a mailing helper using the `resend` library.
  - Code HTML email templates for:
    - *Creators*: "New Campaign Matches Your Niche!", "Your Application was Accepted!"
    - *Brands*: "New Pitch Submitted by [Creator]!"
    - *Transactions*: PDF invoice on successful payment checkout.

### Phase 5: Production Infrastructure & CDNs
To support 100k+ daily visitors safely:
- **Frontend & Admin**: Deploy on **Vercel** or **Cloudflare Pages** (edge servers cache HTML/JS globally).
- **Backend API**: Host on **Render (Web Service Tier)** or **AWS ECS/Fargate** with auto-scaling rules.
- **Database**: Scale up **Neon Tech** serverless PostgreSQL compute limits.
- **SSL & Domains**: Bind custom domain endpoints (`creatorbharat.in` & `admin.creatorbharat.in`) locked with SSL/TLS.
