# 🇮🇳 CreatorBharat V3 — External Services & Credentials Integration Guide

Yeh document CreatorBharat platform par use hone wale saare external APIs, services, databases, aur authentication keys ke setup ko detail karta hai.

> [!WARNING]
> **Security Reminder**: Is file ko GitHub par push karte waat actual production passwords ya secret API keys ko hide (mask) karke rakhein. Real values ko humesha `.env` file me local server par store karein. `.env` file `.gitignore` ke through protected hai.

---

## 🗺️ Connected Services Architecture

```mermaid
graph TD
    A[CreatorBharat Backend] -->|Core Database| B[(Neon PostgreSQL)]
    A -->|Image & Document Uploads| C[Cloudinary SDK]
    A -->|Transactional Emails| D[Resend API]
    A -->|Payment Gateway & Escrow| E[Razorpay Node SDK]
    A -->|AI Bio / Pitch Generator| F[Anthropic Claude API]
    A -->|Session Tokens| G[JWT Authentication]
```

---

## 🔑 1. Environment Variables Blueprint (.env)

Aapke system ki `.env` file me following configurations defined hain. Yahan inki details aur direct links diye gaye hain:

### 🗄️ Database (Neon PostgreSQL)
* **Variable**: `DATABASE_URL`
* **Purpose**: Core application database jahan users, profiles, campaigns, chats, aur payments store hote hain.
* **Console URL**: [https://console.neon.tech/](https://console.neon.tech/)
* **How to configure**: Neon panel par login karein, connection string (PostgreSQL URI) copy karke database URL enter karein.

### 🛡️ Authentication (JWT)
* **Variables**: `JWT_SECRET`, `JWT_EXPIRES_IN`
* **Purpose**: API calls ko verify karne aur user sessions handle karne ke liye tokens encrypt karta hai.
* **How to configure**: `JWT_SECRET` me koi bhi strong custom string set karein (e.g., `cb_super_secret_jwt_key_2026`).

### 💳 Payments Gateway (Razorpay)
* **Variables**: `RAZORPAY_KEY_ID`, `RAZORPAY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`
* **Purpose**: User subscriptions aur Campaign Escrows process karne ke liye.
* **Console URL**: [https://dashboard.razorpay.com/](https://dashboard.razorpay.com/)
* **How to configure**: 
  1. Razorpay Dashboard > Settings > API Keys par jaakar Test or Live key generate karein.
  2. Webhook Section me jaakar `/api/payments/verify` URL register karein.

### 📁 Cloud Storage (Cloudinary)
* **Variables**: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
* **Purpose**: Creators ke profile pictures, banners, portfolio items, aur KYC Aadhaar/PAN cards save karne ke liye.
* **Console URL**: [https://console.cloudinary.com/](https://console.cloudinary.com/)
* **How to configure**: Dashboard ke dashboard settings par **Cloud Name**, **API Key**, aur **API Secret** copy karein.

### 📨 Outbound Emails (Resend)
* **Variables**: `RESEND_API_KEY`, `EMAIL_FROM`
* **Purpose**: Transactional welcome mails, pitch alerts, and payment invoices send karne ke liye.
* **Console URL**: [https://resend.com/](https://resend.com/)
* **How to configure**: Resend Dashboard > API Keys par jaakar new key generate karein.

### 🤖 Artificial Intelligence (Claude AI)
* **Variable**: `ANTHROPIC_API_KEY`
* **Purpose**: AI Co-Writer aur pitch generator engines ko request send karne ke liye.
* **Console URL**: [https://console.anthropic.com/](https://console.anthropic.com/)
* **How to configure**: Anthropic Developer Console par login karke standard API Key select karein.

### 👔 Admin Portal Access
* **Variables**: `ADMIN_EMAIL`, `ADMIN_PASSWORD`
* **Purpose**: Admin login session start karne ke liye credentials.
* **How to configure**: Apni pasand ka support email aur strong admin login password yahan set karein.

---

## 📝 2. Reference `.env.production` Template

Naye production environment setup ke liye is template ka use karein:

```env
# Database Configuration
DATABASE_URL="postgresql://<username>:<password>@<neon-host>/neondb?sslmode=require"

# JWT Config
JWT_SECRET="<use-a-strong-random-generated-32-character-secret>"
JWT_EXPIRES_IN="30d"
PORT=4000
NODE_ENV=production
FRONTEND_URL="https://creatorbharat.com"

# Razorpay Keys
RAZORPAY_KEY_ID="rzp_live_xxxxxxxxxxxxxx"
RAZORPAY_SECRET="xxxxxxxxxxxxxxxxxxxxxxxx"
RAZORPAY_WEBHOOK_SECRET="xxxxxxxxxxxxxxxx"

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME="xxxxxxxx"
CLOUDINARY_API_KEY="xxxxxxxxxxxxxxx"
CLOUDINARY_API_SECRET="xxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Resend Mail Configuration
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
EMAIL_FROM="hello@creatorbharat.com"

# Claude AI Key
ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Portal Administrator
ADMIN_EMAIL="admin@creatorbharat.com"
ADMIN_PASSWORD="<enter-a-highly-secure-production-password>"
```
