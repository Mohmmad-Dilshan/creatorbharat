// ============================================================
// CREATORBHARAT — COMPLETE BACKEND
// Node.js + Express + Prisma + PostgreSQL
// creatorbharat.in | Jaipur, Rajasthan
// ============================================================

// ── FOLDER STRUCTURE ────────────────────────────────────────
/*
creatorbharat-backend/
├── prisma/
│   └── schema.prisma          ← Database schema
├── src/
│   ├── index.js               ← Express server entry
│   ├── middleware/
│   │   ├── auth.js            ← JWT auth middleware
│   │   └── upload.js          ← Cloudinary upload
│   └── routes/
│       ├── auth.js            ← Login/Register
│       ├── creators.js        ← Creator CRUD
│       ├── brands.js          ← Brand CRUD
│       ├── campaigns.js       ← Campaign CRUD
│       ├── applications.js    ← Campaign applications
│       ├── reviews.js         ← Creator reviews
│       ├── messages.js        ← Direct messages
│       ├── blog.js            ← Blog posts
│       ├── payments.js        ← Razorpay payments
│       └── admin.js           ← Admin panel API
├── .env                       ← Environment variables
├── package.json
└── README.md
*/

// ════════════════════════════════════════════════════════════
// FILE: prisma/schema.prisma
// ════════════════════════════════════════════════════════════
/*
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String
  role          Role      @default(CREATOR)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  creator       Creator?
  brand         Brand?
  sessions      Session[]
}

enum Role {
  CREATOR
  BRAND
  ADMIN
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())

  user      User     @relation(fields:[userId], references:[id], onDelete:Cascade)
}

model Creator {
  id              String    @id @default(cuid())
  userId          String    @unique
  handle          String    @unique
  name            String
  bio             String?
  city            String?
  state           String?
  district        String?
  niche           String[]
  platform        String[]
  followers       Int       @default(0)
  engagementRate  Float     @default(0)
  monthlyViews    Int       @default(0)
  avgLikes        Int       @default(0)
  instagram       String?
  youtube         String?
  twitter         String?
  rateMin         Int       @default(0)
  rateMax         Int       @default(0)
  services        String[]
  languages       String[]
  responseTime    String?
  photo           String?
  coverPhoto      String?
  portfolio       String[]
  verified        Boolean   @default(false)
  featured        Boolean   @default(false)
  trending        Boolean   @default(false)
  pro             Boolean   @default(false)
  score           Int       @default(0)
  completedDeals  Int       @default(0)
  avgRating       Float     @default(0)
  status          CreatorStatus @default(PENDING)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  user            User      @relation(fields:[userId], references:[id], onDelete:Cascade)
  reviews         Review[]
  applications    Application[]
  messages        Message[] @relation("CreatorMessages")
  payments        Payment[]
  podcast         Podcast[]
}

enum CreatorStatus {
  PENDING
  ACTIVE
  SUSPENDED
}

model Brand {
  id              String    @id @default(cuid())
  userId          String    @unique
  companyName     String
  contactName     String
  website         String?
  industry        String?
  logo            String?
  description     String?
  verified        Boolean   @default(false)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  user            User      @relation(fields:[userId], references:[id], onDelete:Cascade)
  campaigns       Campaign[]
  messages        Message[] @relation("BrandMessages")
  reviews         Review[]
  payments        Payment[]
}

model Campaign {
  id              String    @id @default(cuid())
  brandId         String
  title           String
  description     String
  niche           String[]
  platform        String[]
  budgetMin       Int
  budgetMax       Int
  slots           Int
  filled          Int       @default(0)
  deadline        DateTime?
  minFollowers    Int       @default(0)
  minER           Float     @default(0)
  deliverables    String[]
  urgent          Boolean   @default(false)
  bidding         Boolean   @default(false)
  status          CampaignStatus @default(DRAFT)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  brand           Brand     @relation(fields:[brandId], references:[id], onDelete:Cascade)
  applications    Application[]
}

enum CampaignStatus {
  DRAFT
  LIVE
  PAUSED
  COMPLETED
  CANCELLED
}

model Application {
  id          String    @id @default(cuid())
  campaignId  String
  creatorId   String
  message     String?
  proposedRate Int?
  status      AppStatus @default(PENDING)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  campaign    Campaign  @relation(fields:[campaignId], references:[id], onDelete:Cascade)
  creator     Creator   @relation(fields:[creatorId], references:[id], onDelete:Cascade)

  @@unique([campaignId, creatorId])
}

enum AppStatus {
  PENDING
  SHORTLISTED
  ACCEPTED
  REJECTED
}

model Review {
  id          String    @id @default(cuid())
  creatorId   String
  brandId     String?
  reviewerName String
  text        String
  rating      Int
  verified    Boolean   @default(false)
  createdAt   DateTime  @default(now())

  creator     Creator   @relation(fields:[creatorId], references:[id], onDelete:Cascade)
  brand       Brand?    @relation(fields:[brandId], references:[id])
}

model Message {
  id          String    @id @default(cuid())
  brandId     String
  creatorId   String
  text        String
  fromBrand   Boolean   @default(true)
  read        Boolean   @default(false)
  createdAt   DateTime  @default(now())

  brand       Brand     @relation("BrandMessages", fields:[brandId], references:[id])
  creator     Creator   @relation("CreatorMessages", fields:[creatorId], references:[id])
}

model Blog {
  id          String    @id @default(cuid())
  slug        String    @unique
  title       String
  excerpt     String?
  body        String
  category    String
  author      String
  image       String?
  tags        String[]
  featured    Boolean   @default(false)
  published   Boolean   @default(false)
  views       Int       @default(0)
  likes       Int       @default(0)
  creatorHandle String?
  readTime    String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  comments    Comment[]
}

model Comment {
  id          String    @id @default(cuid())
  blogId      String
  name        String
  email       String?
  text        String
  likes       Int       @default(0)
  verified    Boolean   @default(false)
  parentId    String?
  createdAt   DateTime  @default(now())

  blog        Blog      @relation(fields:[blogId], references:[id], onDelete:Cascade)
  parent      Comment?  @relation("Replies", fields:[parentId], references:[id])
  replies     Comment[] @relation("Replies")
}

model Payment {
  id          String    @id @default(cuid())
  creatorId   String?
  brandId     String?
  amount      Int
  currency    String    @default("INR")
  type        PayType
  status      PayStatus @default(PENDING)
  razorpayId  String?   @unique
  razorpayOrderId String?
  createdAt   DateTime  @default(now())

  creator     Creator?  @relation(fields:[creatorId], references:[id])
  brand       Brand?    @relation(fields:[brandId], references:[id])
}

enum PayType {
  PRO_LISTING
  CAMPAIGN_BOOST
  FEATURED_SLOT
}

enum PayStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

model Podcast {
  id          String    @id @default(cuid())
  creatorId   String
  title       String
  duration    String
  thumbnail   String?
  videoUrl    String?
  views       Int       @default(0)
  published   Boolean   @default(false)
  createdAt   DateTime  @default(now())

  creator     Creator   @relation(fields:[creatorId], references:[id], onDelete:Cascade)
}

model Newsletter {
  id          String    @id @default(cuid())
  email       String    @unique
  createdAt   DateTime  @default(now())
}

model ContactMessage {
  id          String    @id @default(cuid())
  name        String
  email       String
  subject     String?
  message     String
  read        Boolean   @default(false)
  createdAt   DateTime  @default(now())
}
*/

// ════════════════════════════════════════════════════════════
// FILE: src/index.js
// ════════════════════════════════════════════════════════════
/*
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// ── Middleware ──────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(rateLimit({ windowMs: 15*60*1000, max: 200 }));

// ── Routes ──────────────────────────────────────────────────
app.use('/api/auth',         require('./routes/auth'));
app.use('/api/creators',     require('./routes/creators'));
app.use('/api/brands',       require('./routes/brands'));
app.use('/api/campaigns',    require('./routes/campaigns'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/reviews',      require('./routes/reviews'));
app.use('/api/messages',     require('./routes/messages'));
app.use('/api/blog',         require('./routes/blog'));
app.use('/api/payments',     require('./routes/payments'));
app.use('/api/admin',        require('./routes/admin'));

// ── Health check ────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', platform: 'CreatorBharat' }));

// ── Error handler ───────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => console.log(`CreatorBharat API running on port ${PORT}`));
*/

// ════════════════════════════════════════════════════════════
// FILE: src/middleware/auth.js
// ════════════════════════════════════════════════════════════
/*
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { creator: true, brand: true }
    });

    if (!user) return res.status(401).json({ error: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'ADMIN')
    return res.status(403).json({ error: 'Admin access required' });
  next();
};

module.exports = { auth, adminOnly };
*/

// ════════════════════════════════════════════════════════════
// FILE: src/routes/auth.js
// ════════════════════════════════════════════════════════════
/*
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/auth/register/creator
router.post('/register/creator', async (req, res) => {
  try {
    const { email, password, name, handle, city, state } = req.body;
    if (!email || !password || !name || !handle)
      return res.status(400).json({ error: 'Required fields missing' });

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ error: 'Email already registered' });

    const handleExists = await prisma.creator.findUnique({ where: { handle } });
    if (handleExists) return res.status(400).json({ error: 'Handle already taken' });

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email, password: hash, role: 'CREATOR',
        creator: {
          create: { handle, name, city, state, userId: undefined }
        }
      },
      include: { creator: true }
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role, creator: user.creator } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/register/brand
router.post('/register/brand', async (req, res) => {
  try {
    const { email, password, companyName, contactName, industry } = req.body;
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ error: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email, password: hash, role: 'BRAND',
        brand: { create: { companyName, contactName, industry } }
      },
      include: { brand: true }
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role, brand: user.brand } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { creator: true, brand: true }
    });

    if (!user || !await bcrypt.compare(password, user.password))
      return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    const { password: _, ...safeUser } = user;
    res.json({ token, user: safeUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/me
router.get('/me', require('../middleware/auth').auth, async (req, res) => {
  const { password, ...safeUser } = req.user;
  res.json(safeUser);
});

module.exports = router;
*/

// ════════════════════════════════════════════════════════════
// FILE: src/routes/creators.js
// ════════════════════════════════════════════════════════════
/*
const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { auth } = require('../middleware/auth');
const prisma = new PrismaClient();

// GET /api/creators — list with filters
router.get('/', async (req, res) => {
  try {
    const { q, state, district, niche, platform, verified, minFollowers, minER, sort, page=1, limit=20 } = req.query;

    const where = { status: 'ACTIVE' };
    if (q) where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { city: { contains: q, mode: 'insensitive' } },
      { bio: { contains: q, mode: 'insensitive' } },
    ];
    if (state) where.state = state;
    if (district) where.city = district;
    if (niche) where.niche = { has: niche };
    if (platform) where.platform = { has: platform };
    if (verified === 'true') where.verified = true;
    if (minFollowers) where.followers = { gte: parseInt(minFollowers) };
    if (minER) where.engagementRate = { gte: parseFloat(minER) };

    const orderBy = sort === 'followers' ? { followers: 'desc' }
      : sort === 'er' ? { engagementRate: 'desc' }
      : { score: 'desc' };

    const [creators, total] = await Promise.all([
      prisma.creator.findMany({
        where, orderBy,
        skip: (page-1) * limit,
        take: parseInt(limit),
        include: { reviews: { select: { rating: true } } }
      }),
      prisma.creator.count({ where })
    ]);

    res.json({ creators, total, page: parseInt(page), pages: Math.ceil(total/limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/creators/:handle — single creator profile
router.get('/:handle', async (req, res) => {
  try {
    const creator = await prisma.creator.findUnique({
      where: { handle: req.params.handle },
      include: {
        reviews: { orderBy: { createdAt: 'desc' } },
        podcast: { where: { published: true } },
        _count: { select: { reviews: true, applications: true } }
      }
    });
    if (!creator) return res.status(404).json({ error: 'Creator not found' });
    res.json(creator);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/creators/me — update own profile
router.put('/me', auth, async (req, res) => {
  try {
    if (req.user.role !== 'CREATOR')
      return res.status(403).json({ error: 'Only creators can update creator profile' });

    const {
      name, bio, city, state, district, niche, platform,
      followers, engagementRate, instagram, youtube, twitter,
      rateMin, rateMax, services, languages, responseTime,
      photo, coverPhoto, portfolio
    } = req.body;

    const updated = await prisma.creator.update({
      where: { userId: req.user.id },
      data: {
        name, bio, city, state, district, niche, platform,
        followers: parseInt(followers)||0,
        engagementRate: parseFloat(engagementRate)||0,
        instagram, youtube, twitter,
        rateMin: parseInt(rateMin)||0,
        rateMax: parseInt(rateMax)||0,
        services, languages, responseTime,
        photo, coverPhoto, portfolio
      }
    });

    // Recalculate score
    await updateCreatorScore(updated.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Score calculation helper
async function updateCreatorScore(creatorId) {
  const c = await prisma.creator.findUnique({ where: { id: creatorId } });
  let score = 0;
  if (c.photo) score += 10;
  if (c.bio && c.bio.length > 50) score += 15;
  if (c.city) score += 5;
  if (c.niche?.length) score += 5;
  if (c.platform?.length) score += 5;
  if (c.instagram) score += 5;
  if (c.rateMin) score += 8;
  if (c.services?.length >= 3) score += 7;
  const f = c.followers;
  if (f >= 1000000) score += 30;
  else if (f >= 500000) score += 24;
  else if (f >= 100000) score += 18;
  else if (f >= 50000) score += 12;
  else if (f >= 10000) score += 6;
  score += Math.min(30, Math.round(c.engagementRate * 3));
  await prisma.creator.update({ where: { id: creatorId }, data: { score: Math.min(100, score) } });
}

module.exports = router;
*/

// ════════════════════════════════════════════════════════════
// FILE: src/routes/campaigns.js
// ════════════════════════════════════════════════════════════
/*
const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { auth } = require('../middleware/auth');
const prisma = new PrismaClient();

// GET /api/campaigns
router.get('/', async (req, res) => {
  try {
    const { niche, platform, urgent, page=1, limit=20 } = req.query;
    const where = { status: 'LIVE' };
    if (niche) where.niche = { has: niche };
    if (platform) where.platform = { has: platform };
    if (urgent === 'true') where.urgent = true;

    const [campaigns, total] = await Promise.all([
      prisma.campaign.findMany({
        where, orderBy: { createdAt: 'desc' },
        skip: (page-1)*limit, take: parseInt(limit),
        include: { brand: { select: { companyName: true, logo: true, verified: true } } }
      }),
      prisma.campaign.count({ where })
    ]);

    res.json({ campaigns, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/campaigns — brand creates campaign
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'BRAND')
      return res.status(403).json({ error: 'Only brands can create campaigns' });

    const campaign = await prisma.campaign.create({
      data: { ...req.body, brandId: req.user.brand.id, status: 'LIVE' }
    });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
*/

// ════════════════════════════════════════════════════════════
// FILE: src/routes/payments.js  (Razorpay integration)
// ════════════════════════════════════════════════════════════
/*
const router = require('express').Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const { auth } = require('../middleware/auth');
const prisma = new PrismaClient();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// POST /api/payments/create-order
router.post('/create-order', auth, async (req, res) => {
  try {
    const { type } = req.body; // PRO_LISTING, CAMPAIGN_BOOST, FEATURED_SLOT
    const amounts = { PRO_LISTING: 4900, CAMPAIGN_BOOST: 9900, FEATURED_SLOT: 19900 };
    const amount = amounts[type];
    if (!amount) return res.status(400).json({ error: 'Invalid payment type' });

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `cb_${Date.now()}`,
      notes: { type, userId: req.user.id }
    });

    await prisma.payment.create({
      data: {
        amount,
        type,
        status: 'PENDING',
        razorpayOrderId: order.id,
        creatorId: req.user.role === 'CREATOR' ? req.user.creator?.id : null,
        brandId: req.user.role === 'BRAND' ? req.user.brand?.id : null,
      }
    });

    res.json({ orderId: order.id, amount, currency: 'INR', key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/payments/verify
router.post('/verify', auth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(sign).digest('hex');

    if (expected !== razorpay_signature)
      return res.status(400).json({ error: 'Invalid signature' });

    const payment = await prisma.payment.update({
      where: { razorpayOrderId: razorpay_order_id },
      data: { status: 'PAID', razorpayId: razorpay_payment_id }
    });

    // Activate Pro if PRO_LISTING
    if (payment.type === 'PRO_LISTING' && payment.creatorId) {
      await prisma.creator.update({
        where: { id: payment.creatorId },
        data: { pro: true }
      });
    }

    res.json({ success: true, payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
*/

// ════════════════════════════════════════════════════════════
// FILE: src/routes/admin.js
// ════════════════════════════════════════════════════════════
/*
const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { auth, adminOnly } = require('../middleware/auth');
const prisma = new PrismaClient();

// All admin routes require auth + admin role
router.use(auth, adminOnly);

// GET /api/admin/stats — dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const [creators, brands, campaigns, applications, payments, blogs] = await Promise.all([
      prisma.creator.count(),
      prisma.brand.count(),
      prisma.campaign.count({ where: { status: 'LIVE' } }),
      prisma.application.count(),
      prisma.payment.aggregate({ where: { status: 'PAID' }, _sum: { amount: true } }),
      prisma.blog.count({ where: { published: true } }),
    ]);

    const pending = await prisma.creator.count({ where: { status: 'PENDING' } });
    const revenue = (payments._sum.amount || 0) / 100;

    res.json({ creators, brands, campaigns, applications, pending, revenue, blogs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/creators — all creators with filters
router.get('/creators', async (req, res) => {
  try {
    const { status, page=1, limit=25 } = req.query;
    const where = status ? { status } : {};
    const creators = await prisma.creator.findMany({
      where, orderBy: { createdAt: 'desc' },
      skip: (page-1)*limit, take: parseInt(limit),
      include: { user: { select: { email: true } }, _count: { select: { reviews: true } } }
    });
    const total = await prisma.creator.count({ where });
    res.json({ creators, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/admin/creators/:id — verify, feature, suspend
router.patch('/creators/:id', async (req, res) => {
  try {
    const { verified, featured, trending, pro, status } = req.body;
    const creator = await prisma.creator.update({
      where: { id: req.params.id },
      data: { verified, featured, trending, pro, status }
    });
    res.json(creator);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/blog — create blog post
router.post('/blog', async (req, res) => {
  try {
    const blog = await prisma.blog.create({ data: { ...req.body, published: true } });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/payments — revenue report
router.get('/payments', async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { status: 'PAID' },
      orderBy: { createdAt: 'desc' },
      include: {
        creator: { select: { name: true, handle: true } },
        brand: { select: { companyName: true } }
      }
    });
    const total = payments.reduce((s, p) => s + p.amount, 0);
    res.json({ payments, totalRevenue: total / 100 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/contacts — contact form submissions
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
*/

// ════════════════════════════════════════════════════════════
// FILE: .env  (environment variables)
// ════════════════════════════════════════════════════════════
/*
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/creatorbharat"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Razorpay
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxx"
RAZORPAY_SECRET="your-razorpay-secret"

# Cloudinary (image uploads)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# App
PORT=4000
FRONTEND_URL="https://creatorbharat.in"
NODE_ENV="production"
*/

// ════════════════════════════════════════════════════════════
// FILE: package.json
// ════════════════════════════════════════════════════════════
/*
{
  "name": "creatorbharat-backend",
  "version": "1.0.0",
  "description": "CreatorBharat API - India's Creator Discovery Platform",
  "main": "src/index.js",
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "db:migrate": "prisma migrate dev",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:seed": "node prisma/seed.js"
  },
  "dependencies": {
    "@prisma/client": "^5.0.0",
    "bcryptjs": "^2.4.3",
    "cloudinary": "^2.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.0",
    "express-rate-limit": "^7.0.0",
    "helmet": "^7.0.0",
    "jsonwebtoken": "^9.0.0",
    "multer": "^1.4.5",
    "razorpay": "^2.9.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0",
    "prisma": "^5.0.0"
  }
}
*/
