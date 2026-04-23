# CreatorBharat — Complete Build Instructions for Antigravity

## PROJECT OVERVIEW
Build CreatorBharat — India's #1 Creator Discovery Platform as a 
production-ready SaaS. Jaipur, Rajasthan based startup.

Website: creatorbharat.in
Email: hello@creatorbharat.in
Instagram: @creatorbharat

---

## EXISTING FILES IN THIS WORKSPACE

1. `creatorBharat-v2.jsx` — COMPLETE FRONTEND (22 pages, 245KB)
   - DO NOT rewrite this file
   - Read it to understand all pages, components, data structures
   - Connect it to real backend API (replace localStorage with API calls)

2. `creatorBharat-admin.jsx` — ADMIN PANEL (complete, 41KB)
   - Dark theme admin panel with 9 sections
   - Connect to real backend API

3. `creatorBharat-backend-guide.js` — BACKEND REFERENCE
   - Complete Node.js/Express/Prisma code
   - Use this as the starting point for backend

---

## TECH STACK

### Frontend
- React 18 (CDN — no build step)
- Babel standalone (CDN)
- Single JSX file architecture
- No webpack, no Vite, no CRA
- Fonts: Fraunces + Plus Jakarta Sans (Google Fonts CDN)

### Backend
- Node.js v18+
- Express.js REST API
- Prisma ORM
- PostgreSQL database (Supabase free tier)
- JWT authentication (30 day expiry)
- bcryptjs password hashing

### Third Party
- Razorpay — payments (Rs.49 Pro listing)
- Cloudinary — image uploads
- Resend — transactional emails
- Anthropic Claude API — AI chatbot

### Hosting
- Frontend: Vercel (creatorbharat.in)
- Backend: Railway (api.creatorbharat.in)
- Database: Supabase PostgreSQL

---

## COMPLETE FOLDER STRUCTURE TO CREATE

```
creatorbharat/
├── creatorbharat-frontend/
│   ├── index.html
│   ├── creatorBharat-v2.jsx        (copy from root)
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── og-image.png
│   │   ├── manifest.json
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── assets/
│   │   ├── logo.svg
│   │   └── logo.png
│   └── vercel.json
│
├── creatorbharat-backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── upload.js
│   │   │   ├── rateLimit.js
│   │   │   └── validate.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── creators.js
│   │   │   ├── brands.js
│   │   │   ├── campaigns.js
│   │   │   ├── applications.js
│   │   │   ├── reviews.js
│   │   │   ├── messages.js
│   │   │   ├── blog.js
│   │   │   ├── payments.js
│   │   │   ├── newsletter.js
│   │   │   ├── contact.js
│   │   │   └── admin.js
│   │   └── services/
│   │       ├── email.js
│   │       ├── score.js
│   │       ├── cloudinary.js
│   │       └── razorpay.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
└── creatorbharat-admin/
    ├── index.html
    ├── creatorBharat-admin.jsx     (copy from root)
    └── vercel.json
```

---

## MISSION 1 — BACKEND SETUP

Read `creatorBharat-backend-guide.js` first.

Create `creatorbharat-backend/` with:

### package.json dependencies:
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "express-rate-limit": "^7.0.0",
    "dotenv": "^16.0.0",
    "@prisma/client": "^5.0.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "razorpay": "^2.9.0",
    "cloudinary": "^2.0.0",
    "multer": "^1.4.5",
    "resend": "^2.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0",
    "prisma": "^5.0.0"
  },
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "db:migrate": "prisma migrate dev",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:seed": "node prisma/seed.js"
  }
}
```

### Prisma Schema — 14 Models:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  role      Role     @default(CREATOR)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  creator   Creator?
  brand     Brand?
}

enum Role { CREATOR BRAND ADMIN }

model Creator {
  id             String        @id @default(cuid())
  userId         String        @unique
  handle         String        @unique
  name           String
  bio            String?
  city           String?
  state          String?
  district       String?
  niche          String[]
  platform       String[]
  followers      Int           @default(0)
  engagementRate Float         @default(0)
  monthlyViews   Int           @default(0)
  instagram      String?
  youtube        String?
  twitter        String?
  rateMin        Int           @default(0)
  rateMax        Int           @default(0)
  services       String[]
  languages      String[]
  responseTime   String?
  photo          String?
  coverPhoto     String?
  portfolio      String[]
  verified       Boolean       @default(false)
  featured       Boolean       @default(false)
  trending       Boolean       @default(false)
  pro            Boolean       @default(false)
  score          Int           @default(0)
  avgRating      Float         @default(0)
  completedDeals Int           @default(0)
  status         CreatorStatus @default(PENDING)
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt
  user           User          @relation(fields:[userId], references:[id], onDelete:Cascade)
  reviews        Review[]
  applications   Application[]
  payments       Payment[]
  podcasts       Podcast[]
}

enum CreatorStatus { PENDING ACTIVE SUSPENDED }

model Brand {
  id          String   @id @default(cuid())
  userId      String   @unique
  companyName String
  contactName String
  website     String?
  industry    String?
  logo        String?
  verified    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  user        User     @relation(fields:[userId], references:[id], onDelete:Cascade)
  campaigns   Campaign[]
  reviews     Review[]
  payments    Payment[]
}

model Campaign {
  id           String         @id @default(cuid())
  brandId      String
  title        String
  description  String
  niche        String[]
  platform     String[]
  budgetMin    Int
  budgetMax    Int
  slots        Int
  filled       Int            @default(0)
  deadline     DateTime?
  minFollowers Int            @default(0)
  deliverables String[]
  urgent       Boolean        @default(false)
  bidding      Boolean        @default(false)
  status       CampaignStatus @default(LIVE)
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
  brand        Brand          @relation(fields:[brandId], references:[id], onDelete:Cascade)
  applications Application[]
}

enum CampaignStatus { DRAFT LIVE PAUSED COMPLETED CANCELLED }

model Application {
  id           String    @id @default(cuid())
  campaignId   String
  creatorId    String
  message      String?
  proposedRate Int?
  status       AppStatus @default(PENDING)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  campaign     Campaign  @relation(fields:[campaignId], references:[id], onDelete:Cascade)
  creator      Creator   @relation(fields:[creatorId], references:[id], onDelete:Cascade)
  @@unique([campaignId, creatorId])
}

enum AppStatus { PENDING SHORTLISTED ACCEPTED REJECTED }

model Review {
  id           String   @id @default(cuid())
  creatorId    String
  brandId      String?
  reviewerName String
  text         String
  rating       Int
  verified     Boolean  @default(false)
  createdAt    DateTime @default(now())
  creator      Creator  @relation(fields:[creatorId], references:[id], onDelete:Cascade)
  brand        Brand?   @relation(fields:[brandId], references:[id])
}

model Message {
  id        String   @id @default(cuid())
  brandId   String
  creatorId String
  text      String
  fromBrand Boolean  @default(true)
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}

model Blog {
  id            String    @id @default(cuid())
  slug          String    @unique
  title         String
  excerpt       String?
  body          String
  category      String
  author        String
  image         String?
  tags          String[]
  featured      Boolean   @default(false)
  published     Boolean   @default(false)
  views         Int       @default(0)
  likes         Int       @default(0)
  creatorHandle String?
  readTime      String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  comments      Comment[]
}

model Comment {
  id        String    @id @default(cuid())
  blogId    String
  name      String
  email     String?
  text      String
  likes     Int       @default(0)
  verified  Boolean   @default(false)
  parentId  String?
  createdAt DateTime  @default(now())
  blog      Blog      @relation(fields:[blogId], references:[id], onDelete:Cascade)
  parent    Comment?  @relation("Replies", fields:[parentId], references:[id])
  replies   Comment[] @relation("Replies")
}

model Payment {
  id              String    @id @default(cuid())
  creatorId       String?
  brandId         String?
  amount          Int
  currency        String    @default("INR")
  type            PayType
  status          PayStatus @default(PENDING)
  razorpayOrderId String?
  razorpayId      String?   @unique
  createdAt       DateTime  @default(now())
  creator         Creator?  @relation(fields:[creatorId], references:[id])
  brand           Brand?    @relation(fields:[brandId], references:[id])
}

enum PayType   { PRO_LISTING CAMPAIGN_BOOST FEATURED_SLOT }
enum PayStatus { PENDING PAID FAILED REFUNDED }

model Podcast {
  id        String   @id @default(cuid())
  creatorId String
  title     String
  duration  String
  thumbnail String?
  views     Int      @default(0)
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  creator   Creator  @relation(fields:[creatorId], references:[id], onDelete:Cascade)
}

model Newsletter {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
}

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String?
  message   String
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

---

## MISSION 2 — ALL API ROUTES

Create every route file with full CRUD. Key routes:

### GET /api/creators (with filters)
```javascript
// Filters: q, state, district, niche, platform, 
//          verified, minFollowers, minER, sort, page, limit
// Sort options: score, followers, er, rating
// Return: { creators[], total, page, pages }
```

### POST /api/auth/login
```javascript
// Body: { email, password }
// Return: { token, user: { id, email, role, creator/brand } }
```

### POST /api/payments/create-order
```javascript
// Body: { type: 'PRO_LISTING' }
// Amounts: PRO_LISTING=4900, CAMPAIGN_BOOST=9900
// Return: { orderId, amount, currency, key }
```

### POST /api/payments/verify
```javascript
// Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
// Verify HMAC signature
// On success: activate Pro for creator
// Return: { success: true }
```

---

## MISSION 3 — FRONTEND API CONNECTION

In `creatorBharat-v2.jsx`, find all `LS.get()` and `LS.set()` calls.
Replace with real API calls:

```javascript
// Add at top of file:
const API_BASE = process.env.API_URL || 'https://api.creatorbharat.in/api';

// Helper function:
async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem('cb_token');
  const res = await fetch(API_BASE + endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'API Error');
  return data;
}
```

Replace in these key functions:
- `LS.get('cb_creators')` → `await apiCall('/creators?...')`
- `LS.get('cb_campaigns')` → `await apiCall('/campaigns')`
- Login → `await apiCall('/auth/login', { method:'POST', body:{email,password} })`
- Register → `await apiCall('/auth/register/creator', { method:'POST', body:{...} })`

---

## MISSION 4 — FRONTEND SETUP

Create `creatorbharat-frontend/index.html`:

```html
<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>CreatorBharat — India Ka Creator Platform</title>
  <meta name="description" content="India ka creator discovery platform. Professional portfolio banao, 340+ brands se connect karo. Bilkul free."/>
  <meta property="og:title" content="CreatorBharat — Bharat ke Creators, Duniya ki Nazar Mein"/>
  <meta property="og:image" content="https://creatorbharat.in/og-image.png"/>
  <meta property="og:url" content="https://creatorbharat.in"/>
  <link rel="icon" href="/favicon.ico"/>
  <link rel="manifest" href="/manifest.json"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; -webkit-font-smoothing: antialiased; }
    @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes scaleIn { from { opacity: 0; transform: scale(.95); } to { opacity: 1; transform: scale(1); } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .6; } }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
    ::-webkit-scrollbar { width: 4px; } 
    ::-webkit-scrollbar-thumb { background: #FF9933; border-radius: 4px; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" src="./creatorBharat-v2.jsx" data-presets="react"></script>
  <script>
    window.addEventListener('load', function() {
      ReactDOM.createRoot(document.getElementById('root')).render(
        React.createElement(App)
      );
    });
  </script>
</body>
</html>
```

Create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ]
}
```

Create `public/manifest.json`:
```json
{
  "name": "CreatorBharat",
  "short_name": "CreatorBharat",
  "description": "India Ka Creator Platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0d0d0d",
  "theme_color": "#FF9933",
  "icons": [
    { "src": "/favicon.ico", "sizes": "64x64", "type": "image/x-icon" }
  ]
}
```

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://creatorbharat.in/sitemap.xml
```

---

## MISSION 5 — ENVIRONMENT VARIABLES

Create `creatorbharat-backend/.env.example`:
```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"

# JWT
JWT_SECRET="minimum-32-character-random-secret-key-here"
JWT_EXPIRES_IN="30d"

# App
PORT=4000
NODE_ENV=development
FRONTEND_URL="http://localhost:3000"

# Razorpay
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxx"
RAZORPAY_SECRET="your_razorpay_secret"
RAZORPAY_WEBHOOK_SECRET="your_webhook_secret"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Email (Resend)
RESEND_API_KEY="re_xxxxxxxxxx"
EMAIL_FROM="hello@creatorbharat.in"

# Claude AI
ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxx"

# Admin
ADMIN_EMAIL="admin@creatorbharat.in"
ADMIN_PASSWORD="change-this-strong-password"
```

---

## MISSION 6 — SEED DATA

Create `prisma/seed.js` with this exact data:

4 Creators:
1. Rahul Sharma — handle: rahul-sharma, Jaipur/Rajasthan, Travel+Lifestyle, 248K followers, 4.8% ER, verified=true, featured=true, score=88
2. Priya Mehta — handle: priya-mehta, Mumbai/Maharashtra, Fashion+Beauty, 512K followers, 6.2% ER, verified=true, score=94
3. Arjun Kapoor — handle: arjun-kapoor, Bengaluru/Karnataka, Tech+Gaming, 890K followers, 8.1% ER, verified=true, featured=true, score=97
4. Sneha Iyer — handle: sneha-iyer, Chennai/Tamil Nadu, Food+Lifestyle, 156K followers, 5.4% ER, verified=true, score=82

3 Campaigns:
1. MakeMyTrip — Travel Campaign, budget Rs.50K-2L, 10 slots, URGENT
2. Nykaa — Beauty Campaign, budget Rs.30K-1.5L, 15 slots
3. boAt — Tech Campaign, budget Rs.25K-1L, 8 slots

5 Blog Posts (with full body content):
1. "How Small-Town Creators Are Taking Over Instagram" — Creator Stories
2. "Your First Brand Deal: Complete 2026 Guide" — Creator Tips
3. "Why Engagement Rate Beats Follower Count" — Brand Guides
4. "Top 10 Creator Cities Beyond Mumbai and Delhi" — Top Lists
5. "How to Set Your Creator Rates in 2026" — Creator Tips

Admin User:
- email: admin@creatorbharat.in
- password: admin123 (hashed with bcrypt)
- role: ADMIN

---

## MISSION 7 — DEPLOYMENT

### Vercel (Frontend)
1. Connect GitHub repo
2. Framework: Other
3. Root: creatorbharat-frontend/
4. No build command needed
5. Add env var: VITE_API_URL = https://api.creatorbharat.in

### Railway (Backend)
1. Connect GitHub repo
2. Root: creatorbharat-backend/
3. Start command: npm start
4. Add all .env variables in Railway dashboard

### Supabase (Database)
1. New project: creatorbharat
2. Region: ap-south-1 (Mumbai)
3. Copy Connection String to DATABASE_URL
4. Run: npx prisma migrate deploy

### Custom Domain
- creatorbharat.in → Vercel
- api.creatorbharat.in → Railway
- admin.creatorbharat.in → Vercel (admin folder)

---

## DESIGN SYSTEM REFERENCE

Colors:
- Saffron: #FF9933 (primary)
- Green: #138808 (secondary)  
- Dark: #0D0D0D (background dark)
- White: #FFFFFF

Indian tricolor stripe: Always on top of every page header
`background: linear-gradient(90deg, #FF9933 33%, #fff 33%, #fff 66%, #138808 66%)`

Fonts:
- Headings: 'Fraunces' serif, weight 700/900
- Body: 'Plus Jakarta Sans' sans-serif

---

## WHAT SUCCESS LOOKS LIKE

After completing all missions:
1. creatorbharat.in loads the 22-page React app
2. api.creatorbharat.in/health returns { status: "ok" }
3. Creator can register, create profile, get profile URL
4. Brand can post campaign, receive applications
5. Razorpay payment works (test mode)
6. Admin panel shows real data from database
7. AI chatbot responds in Hinglish
8. Mobile responsive on all screen sizes

---

## START WITH MISSION 1
Read creatorBharat-backend-guide.js first, then begin.
