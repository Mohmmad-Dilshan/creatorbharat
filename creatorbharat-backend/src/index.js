// 🇮🇳 CreatorBharat SaaS Express API Server
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { logger } from './utils/logger.js';
import { rateLimit } from 'express-rate-limit';
import compression from 'compression';
import { createServer } from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from './prisma.js';

// Route Imports
import authRouter from './routes/auth.js';
import creatorsRouter from './routes/creators.js';
import campaignsRouter from './routes/campaigns.js';
import adminRouter from './routes/admin.js';
import applicationsRouter from './routes/applications.js';
import paymentsRouter from './routes/payments.js';
import reviewsRouter from './routes/reviews.js';
import messagesRouter from './routes/messages.js';
import blogRouter from './routes/blog.js';
import uploadsRouter from './routes/uploads.js';
import newsletterRouter from './routes/newsletter.js';
import contactsRouter from './routes/contacts.js';
import galleryRouter from './routes/gallery.js';
import podcastsRouter from './routes/podcasts.js';
import aiRouter from './routes/ai.js';
import gigsRouter from './routes/gigs.js';
import notificationsRouter from './routes/notifications.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const server = createServer(app);

// Dynamic CORS configuration to support localhost, multiple Vercel deployments, and custom domains
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:4000'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.includes(origin) || 
                      origin.endsWith('.vercel.app') || 
                      origin.includes('creatorbharat');
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'cb_token']
};

const io = new Server(server, {
  cors: corsOptions
});

// Response compression, Security and CORS middleware
app.use(compression());
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

// XSS Input Sanitizer middleware to protect from cross-site scripting
function sanitizeInput(obj) {
  if (typeof obj === 'string') {
    return obj
      .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/g, '')
      .replace(/javascript:[^"]*/g, '');
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeInput);
  }
  if (obj !== null && typeof obj === 'object') {
    const sanitized = {};
    for (const key in obj) {
      sanitized[key] = sanitizeInput(obj[key]);
    }
    return sanitized;
  }
  return obj;
}

app.use((req, res, next) => {
  if (req.body) {
    req.body = sanitizeInput(req.body);
  }
  next();
});

app.use('/uploads', express.static('public/uploads'));

// Strict Rate Limiter for Authentication & OTP requests to prevent spams
const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 auth/OTP requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many authentication attempts. Please try again after a minute.' }
});

// Relaxed Rate Limiter for general browsing APIs
const browseLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 600, // Limit each IP to 600 requests per 15 minutes for browsing
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

app.use('/api/auth/', authLimiter);
app.use('/api/', browseLimiter);

// Base Health Check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the CreatorBharat SaaS Production API Server! 🇮🇳 🚀',
    status: 'online',
    version: '3.0.0',
    support: 'hello@creatorbharat.com'
  });
});

app.get('/api', (req, res) => {
  res.json({ message: 'CreatorBharat SaaS REST API Engine is active 🚀' });
});

app.get('/api/stats/summary', async (req, res) => {
  try {
    const totalCreators = await prisma.creator.count();
    const reachResult = await prisma.creator.aggregate({
      _sum: { followers: true }
    });
    const totalReach = reachResult._sum.followers || 0;
    const totalCampaigns = await prisma.campaign.count();

    const stateCountsResult = await prisma.creator.groupBy({
      by: ['state'],
      _count: { state: true }
    });

    const stateCounts = {};
    stateCountsResult.forEach(item => {
      if (item.state) {
        stateCounts[item.state] = item._count.state;
      }
    });

    res.json({
      totalCreators,
      totalReach,
      totalCampaigns,
      stateCounts
    });
  } catch (err) {
    console.error('[GET /api/stats/summary] Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch platform summary statistics.' });
  }
});

// GET /api/pages/:pageName — public route to fetch page configuration
app.get('/api/pages/:pageName', async (req, res) => {
  try {
    const { pageName } = req.params;
    const config = await prisma.dynamicPageConfig.findUnique({
      where: { pageName }
    });
    if (!config) {
      // Structured defaults for demo environments
      let defaultContent = {};
      if (pageName === 'home') {
        defaultContent = {
          heroTitle: 'Find Elite Local Creators Across India',
          heroSubtitle: 'CreatorBharat connects top regional influencers with local and global brands for impactful collaborations.',
          ctaText: 'Launch Campaign Now',
          announcement: '⚡ Version 3.0 Live: Introducing Instant Wallet Bank Settlements!'
        };
      } else if (pageName === 'pricing') {
        defaultContent = {
          starterPrice: 0,
          proPrice: 49,
          proFeatures: 'Instant wallet withdrawals, Automated GST invoicing, Priority campaign listing, 0% commission fees, Pro verified badge',
          brandStarterPrice: 0,
          brandProPrice: 4999,
          brandProFeatures: 'Launch Unlimited Campaigns, Direct Outreach Pitch Console, Full A4 Creator Resume Access, Verified Gold Brand Badge, AI Smart Talent Matches, Advanced Analytics Dashboard, 24/7 Premium Priority Support'
        };
      } else if (pageName === 'calculator') {
        defaultContent = {
          rateMultiplier: 0.018,
          nicheMultiplier: 1.0,
          minFee: 500
        };
      } else if (pageName === 'faqs' || pageName === 'faq') {
        defaultContent = [
          { q: 'How does CreatorBharat escrow work?', a: 'Brands deposit campaign budgets into secure escrows. Funds are released instantly to creators after verified milestone deliverables are submitted.' },
          { q: 'Is there a signup fee for creators?', a: 'Signing up as a basic creator is completely free. Basic creators can receive brand deals. Creator Pro unlocking instant payouts requires a tiny monthly fee of ₹49.' },
          { q: 'Can I link multiple Instagram accounts?', a: 'Currently, each creator account can link one verified primary Instagram handle and one YouTube channel to calculate dynamic engagement rates.' }
        ];
      } else if (pageName === 'creator-landing') {
        defaultContent = {
          heroBadge: "India's Creator Ecosystem",
          heroTitle: "Build Your Creator Legacy.",
          heroSubtitle: "Bharat ke har creator ke liye — Tier 2, Tier 3, ya metro. Verified profile, direct brand deals, zero commission. Apni pehchan banao.",
          ctaPrimary: "Join Free — Start Today",
          ctaSecondary: "See Creator Profiles",
          bottomTitle: "Bharat Ka Creator Kahin Bhi Jayega. 🇮🇳",
          bottomSubtitle: "Bhilwara se Bangalore tak — har creator ki pehchan honi chahiye. Join karo aur apni legacy banao.",
          bottomCtaPrimary: "Join Free Now",
          bottomCtaSecondary: "View Pro Plans"
        };
      } else if (pageName === 'brand-landing') {
        defaultContent = {
          heroBadge: "Brand Command Center",
          heroTitle: "Scale with Bharat's Best.",
          heroSubtitle: "Scout verified regional creators, launch campaigns with escrow protection, and track ROI in real-time. Zero commission. Zero middlemen.",
          ctaPrimary: "Start Scouting Free",
          ctaSecondary: "Browse Creators",
          bottomTitle: "Ready to Scale? Join 500+ Brands.",
          bottomSubtitle: "Start free. No credit card required. Access Bharat's most verified creator network today.",
          bottomCtaPrimary: "Register Your Brand",
          bottomCtaSecondary: "Browse Creators"
        };
      }
      return res.json({ pageName, content: defaultContent });
    }
    res.json(config);
  } catch (err) {
    console.error('[GET /api/pages/:pageName] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve page configuration.' });
  }
});

// App Router Registry
app.use('/api/auth', authRouter);
app.use('/api/creators', creatorsRouter);
app.use('/api/campaigns', campaignsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/blog', blogRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/podcasts', podcastsRouter);
app.use('/api/ai', aiRouter);
app.use('/api/gigs', gigsRouter);
app.use('/api/notifications', notificationsRouter);

// Global 404 Error handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Requested pathway or endpoint not found on this server.',
    message: 'Please verify the route parameters or refer to the official API docs.'
  });
});

// Global Exception handler
app.use((err, req, res, next) => {
  logger.error('Unhandled request exception', err, { path: req.path, method: req.method });
  res.status(500).json({ error: 'Internal Server Error.' });
});

// Active Socket connection registry
const connectedUsers = new Map(); // profileId -> Set of socket.ids

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (!token) {
      return next(new Error('Authentication failed: Missing token'));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'cb_super_secret_jwt_key_2026_production');
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { creator: true, brand: true }
    });
    if (!user) {
      return next(new Error('Authentication failed: User not found'));
    }
    socket.user = user;
    next();
  } catch (err) {
    return next(new Error('Authentication failed: Invalid token'));
  }
});

io.on('connection', (socket) => {
  const isBrand = socket.user.role === 'BRAND';
  const profileId = isBrand ? socket.user.brand?.id : socket.user.creator?.id;
  
  if (profileId) {
    if (!connectedUsers.has(profileId)) {
      connectedUsers.set(profileId, new Set());
    }
    connectedUsers.get(profileId).add(socket.id);
  }

  socket.on('send_message', async (payload, callback) => {
    try {
      const { receiverId, text } = payload;
      if (!receiverId || !text) {
        throw new Error('Receiver ID and message content are required');
      }

      let brandId = '';
      let creatorId = '';

      if (isBrand) {
        const brand = socket.user.brand;
        if (!brand) throw new Error('Brand details not found');
        brandId = brand.id;
        creatorId = receiverId;
      } else {
        const creator = socket.user.creator;
        if (!creator) throw new Error('Creator details not found');
        creatorId = creator.id;
        brandId = receiverId;
      }

      const message = await prisma.message.create({
        data: {
          text,
          fromBrand: isBrand,
          brandId,
          creatorId
        }
      });

      const messageData = {
        id: message.id,
        text: message.text,
        time: new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
        createdAt: message.createdAt,
        read: message.read,
        brandId,
        creatorId
      };

      // Emit to receiver if online
      const receiverSockets = connectedUsers.get(receiverId);
      if (receiverSockets) {
        receiverSockets.forEach(sid => {
          io.to(sid).emit('receive_message', messageData);
        });
      }

      // Sync message to other tabs of the sender
      const senderSockets = connectedUsers.get(profileId);
      if (senderSockets) {
        senderSockets.forEach(sid => {
          if (sid !== socket.id) {
            io.to(sid).emit('receive_message', { ...messageData, isMe: true });
          }
        });
      }

      if (callback) callback({ success: true, message: { ...messageData, isMe: true } });

      // If sending to official support, trigger automated response
      if (receiverId === 'cb-official-support') {
        setTimeout(async () => {
          try {
            const supportResponseText = `Thank you for contacting CreatorBharat Support! 🇮🇳 Our team will review your message shortly. If this is regarding a recent milestone payment, please ensure you have uploaded proper verification links.`;
            
            const supportMessage = await prisma.message.create({
              data: {
                text: supportResponseText,
                fromBrand: !isBrand,
                brandId: isBrand ? profileId : 'cb-official-support',
                creatorId: isBrand ? 'cb-official-support' : profileId,
                read: false
              }
            });

            const supportMsgData = {
              id: supportMessage.id,
              text: supportMessage.text,
              time: new Date(supportMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isMe: false,
              createdAt: supportMessage.createdAt,
              read: supportMessage.read,
              brandId: supportMessage.brandId,
              creatorId: supportMessage.creatorId
            };

            const senderSocks = connectedUsers.get(profileId);
            if (senderSocks) {
              senderSocks.forEach(sid => {
                io.to(sid).emit('receive_message', supportMsgData);
              });
            }
          } catch (err) {
            console.error('Support auto-response error:', err.message);
          }
        }, 1500);
      }
    } catch (err) {
      console.error('Socket send_message error:', err.message);
      if (callback) callback({ success: false, error: err.message });
    }
  });

  socket.on('disconnect', () => {
    if (profileId && connectedUsers.has(profileId)) {
      connectedUsers.get(profileId).delete(socket.id);
      if (connectedUsers.get(profileId).size === 0) {
        connectedUsers.delete(profileId);
      }
    }
  });
});

// Seed Admin Account and Sample Data on Server Startup
(async () => {
  if (process.env.NODE_ENV === 'test') return;
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@creatorbharat.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'change-this-strong-password';

    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail.toLowerCase().trim() }
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await prisma.user.create({
        data: {
          email: adminEmail.toLowerCase().trim(),
          password: hashedPassword,
          role: 'ADMIN'
        }
      });
      console.log(`[Database Seeder]: Default admin user created successfully (${adminEmail}).`);
    } else {
      console.log(`[Database Seeder]: Admin account verified.`);
    }

    // Seed Creators and Brands if empty
    const customerCount = await prisma.user.count({
      where: { role: { in: ['CREATOR', 'BRAND'] } }
    });

    if (customerCount === 0) {
      console.log('[Database Seeder]: No creators or brands found. Seeding realistic sample dataset...');
      
      const defaultPasswordHash = await bcrypt.hash('password123', 10);

      // Create Creators
      const u1 = await prisma.user.create({
        data: {
          email: 'amit@creatorbharat.com',
          password: defaultPasswordHash,
          role: 'CREATOR',
          creator: {
            create: {
              name: 'Amit Sharma',
              handle: 'amit_travels',
              bio: 'Travelling across India to capture the authentic, unseen colors of rural Bharat. Let\'s showcase local beauty to the world.',
              city: 'Jaipur',
              state: 'Rajasthan',
              niche: ['Travel', 'Regional Trends'],
              platform: ['Instagram', 'YouTube'],
              followers: 35000,
              engagementRate: 6.8,
              rateMin: 5000,
              rateMax: 15000,
              photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
              coverImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200',
              isVerified: false,
              isPro: true,
              aadhaarUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=800',
              panUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=800',
              status: 'PENDING_APPROVAL',
              socialLinks: { instagram: 'https://instagram.com/amit_travels', youtube: 'https://youtube.com/c/amit_travels' }
            }
          }
        },
        include: { creator: true }
      });

      const u2 = await prisma.user.create({
        data: {
          email: 'neha@creatorbharat.com',
          password: defaultPasswordHash,
          role: 'CREATOR',
          creator: {
            create: {
              name: 'Neha Gupta',
              handle: 'neha_beauty',
              bio: 'Beauty, fashion, and lifestyle creator from Indore. I love sharing simple, local skincare and makeup secrets.',
              city: 'Indore',
              state: 'Madhya Pradesh',
              niche: ['Beauty', 'Fashion'],
              platform: ['Instagram'],
              followers: 65000,
              engagementRate: 4.2,
              rateMin: 8000,
              rateMax: 20000,
              photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
              coverImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200',
              isVerified: true,
              isPro: false,
              status: 'APPROVED',
              socialLinks: { instagram: 'https://instagram.com/neha_beauty' }
            }
          }
        },
        include: { creator: true }
      });

      // Create Brands
      const b1 = await prisma.user.create({
        data: {
          email: 'brand1@mamaearth.com',
          password: defaultPasswordHash,
          role: 'BRAND',
          brand: {
            create: {
              companyName: 'Mamaearth India',
              industry: 'Beauty & Cosmetics',
              website: 'https://mamaearth.in'
            }
          }
        },
        include: { brand: true }
      });

      const b2 = await prisma.user.create({
        data: {
          email: 'brand2@bharatstartups.com',
          password: defaultPasswordHash,
          role: 'BRAND',
          brand: {
            create: {
              companyName: 'BharatStartups',
              industry: 'Venture Capital & Community',
              website: 'https://bharatstartups.com'
            }
          }
        },
        include: { brand: true }
      });

      // Create Campaigns
      const camp1 = await prisma.campaign.create({
        data: {
          brandId: b1.brand.id,
          title: 'Vibrant Rajasthani Beauty Campaign',
          description: 'We are seeking authentic regional beauty creators in Rajasthan to showcase our new herbal facial range using local dialects and traditional style elements.',
          budget: 50000,
          niche: ['Beauty', 'Fashion'],
          platform: ['Instagram'],
          status: 'ACTIVE'
        }
      });

      const camp2 = await prisma.campaign.create({
        data: {
          brandId: b2.brand.id,
          title: 'Rural Entrepreneurs Stories Podcast Series',
          description: 'A campaign calling for tech/podcast creators who can host or feature interviews with successful small-town founders and local startup heroes.',
          budget: 75000,
          niche: ['Tech', 'Regional Trends'],
          platform: ['Instagram', 'YouTube'],
          status: 'ACTIVE'
        }
      });

      // Create Applications
      await prisma.application.create({
        data: {
          campaignId: camp2.id,
          creatorId: u1.creator.id,
          pitch: 'I regularly visit tier-2 entrepreneur spots in Rajasthan and would love to tell their stories in a raw, conversational podcast format.',
          status: 'PENDING'
        }
      });

      await prisma.application.create({
        data: {
          campaignId: camp1.id,
          creatorId: u2.creator.id,
          pitch: 'My audience is 80% girls from Madhya Pradesh and Rajasthan who love traditional skin care. This range perfectly fits my feed.',
          status: 'ACCEPTED'
        }
      });

      // Create Reviews
      await prisma.review.create({
        data: {
          creatorId: u2.creator.id,
          brandId: b1.brand.id,
          reviewerName: 'Mamaearth Brand Team',
          text: 'Excellent deliverables and highly authentic audience resonance. Highly recommend Neha for regional beauty launches.',
          rating: 5
        }
      });

      // Create Payments
      await prisma.payment.create({
        data: {
          id: 'pay_escrow_sample_123',
          brandId: b1.brand.id,
          creatorId: u2.creator.id,
          campaignId: camp1.id,
          recipientCreatorId: u2.creator.id,
          amount: 50000,
          type: 'CAMPAIGN_ESCROW',
          status: 'PAID'
        }
      });

      console.log('[Database Seeder]: Realistic sample dataset (Creators, Brands, Campaigns, Applications, Reviews, Payments) seeded successfully.');
    }


    // Seed Gallery Items if empty
    const galleryCount = await prisma.galleryItem.count();
    if (galleryCount === 0) {
      const defaultGallery = [
        {
          title: 'Jaipur Heritage Fashion Summit',
          description: 'A grand celebration linking traditional Rajasthani weavers with modern Gen-Z digital creators. Highlighted live styling workshops and brand matchmaking.',
          category: 'Summits',
          type: 'video',
          date: 'March 14, 2026',
          location: 'Jaipur, Rajasthan',
          thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          duration: '2:45',
          tags: ['Fashion', 'Brand Deals', 'Weavers']
        },
        {
          title: 'Bastar Art & Craft Exhibition',
          description: 'Showcasing the premium terracotta and brass craft collections of Bastar artisans through visual storytelling campaigns shot by regional travel vloggers.',
          category: 'Collaborations',
          type: 'photo',
          date: 'April 22, 2026',
          location: 'Jagdalpur, Chhattisgarh',
          thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
          tags: ['Artisans', 'Exhibition', 'Regional']
        },
        {
          title: 'Creator Node Bangalore Meetup',
          description: 'An exclusive networking event for tech and lifestyle influencers. Discussed monetization algorithms and brand campaign optimizations.',
          category: 'Summits',
          type: 'photo',
          date: 'May 05, 2026',
          location: 'Bangalore, Karnataka',
          thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
          tags: ['Networking', 'Tech', 'Lifestyle']
        },
        {
          title: 'Delhi Influencer Brand Conclave',
          description: 'Corporate brand managers and elite creators discussing escrow escrow metrics on CreatorBharat.',
          category: 'Collaborations',
          type: 'video',
          date: 'May 18, 2026',
          location: 'New Delhi',
          thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://www.w3schools.com/html/movie.mp4',
          duration: '1:30',
          tags: ['Brand Deals', 'Escrow', 'Conclave']
        },
        {
          title: 'Mobile Videography & Editing Boot Camp',
          description: 'A hands-on workshop guiding nano and micro creators on high-fidelity color grading and sound design for vertical mobile content.',
          category: 'Workshops',
          type: 'photo',
          date: 'June 01, 2026',
          location: 'Pune, Maharashtra',
          thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
          tags: ['Videography', 'Workshops', 'Mobile']
        },
        {
          title: 'Mumbai Creator Studio Hub Launch',
          description: 'Grand opening of the CreatorBharat flagship streaming facility, equipped with 4K cameras, acoustic chambers, and podcast setups for verified members.',
          category: 'Media',
          type: 'photo',
          date: 'June 10, 2026',
          location: 'Mumbai, Maharashtra',
          thumbnail: 'https://images.unsplash.com/photo-1590608897129-79da98d15969?auto=format&fit=crop&w=800&q=80',
          tags: ['Studio', 'Podcasting', 'Launch']
        }
      ];
      await prisma.galleryItem.createMany({ data: defaultGallery });
      console.log(`[Database Seeder]: ${defaultGallery.length} default gallery items seeded successfully.`);
    }

    // Seed Blog Articles if empty
    const blogCount = await prisma.blog.count();
    if (blogCount === 0) {
      const defaultBlogs = [
        {
          slug: 'creatorbharat-kya-hai-india-ka-creator-ecosystem',
          title: 'CreatorBharat Kya Hai? India Ka Pehla 3-Sided Creator Ecosystem',
          category: 'Platform Guide',
          excerpt: 'CreatorBharat sirf ek influencer platform nahi — ye India ka pehla decentralized creator economy ecosystem hai jo creators, brands, aur communities ko direct connect karta hai, bina kisi agency ke.',
          body: `
            <div class="quick-take" style="background:#fff7ed; border-left:4px solid #ff9431; padding:15px; margin-bottom:20px;">
              <strong>EK LINE MEIN:</strong> CreatorBharat ek 3-sided marketplace hai — creators, brands, aur communities ke liye — jahan koi agency nahi, koi middleman nahi, aur 0% commission.
            </div>
            <p>Agar aap Instagram ya YouTube pe content banate hain aur soch rahe hain ki "brand deals kaise milenge," ya agar aap ek brand hain jo local creators dhundh raha hai Tier-2/3 cities mein — toh CreatorBharat aapke liye bana hai.</p>
            <h2 id="what-is" style="font-family:'Playfair Display',serif; font-weight:800; margin-top:25px; color:#000;">CreatorBharat Kya Hai?</h2>
            <p>CreatorBharat India ka <strong>pehla verified creator ecosystem</strong> hai jo specifically Bharat ke regional creators ke liye design kiya gaya hai. Ye sirf ek directory nahi — ye ek complete SaaS platform hai jahan:</p>
            <ul>
              <li>Creators apna verified digital portfolio banate hain</li>
              <li>Brands verified creators ko directly dhundh aur hire karte hain</li>
              <li>Payments escrow mein secure rehte hain</li>
              <li>Koi bhi commission nahi liya jaata</li>
            </ul>
          `,
          image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200',
          featured: true,
          published: true,
          author: 'CreatorBharat',
          tags: ['CreatorBharat', 'Creator Economy', 'Platform Guide', '3-Sided Marketplace', 'India']
        },
        {
          slug: 'cb-score-kya-hota-hai-kaise-badhayein',
          title: 'CB Score Kya Hota Hai? Apna Creator Trust Score Kaise Badhayein',
          category: 'Creator Guides',
          excerpt: 'CB Score CreatorBharat ka proprietary trust index hai (0-100) jo brands ko instantly batata hai ki creator kitna reliable aur impactful hai. Samjhein kaise ye calculate hota hai aur kaise improve karein.',
          body: `
            <div class="quick-take" style="background:#fff7ed; border-left:4px solid #ff9431; padding:15px; margin-bottom:20px;">
              <strong>QUICK TAKE:</strong> CB Score sirf followers pe based nahi hai. Ye 4 factors ka combination hai — aur ek 50K follower creator, 500K follower creator se zyada score pa sakta hai agar uski engagement aur deal history strong ho.
            </div>
            <p>Jab bhi koi brand CreatorBharat pe kisi creator ka profile dekhta hai, sabse pehle unki nazar CB Score pe jaati hai. Ye 0-100 ka number unhe instantly batata hai ki ye creator brands ke liye kitna valuable hai.</p>
            <h2 id="what-is-score" style="font-family:'Playfair Display',serif; font-weight:800; margin-top:25px; color:#000;">CB Score Kya Hai?</h2>
            <p>CB Score (CreatorBharat Trust Score) India ka <strong>pehla creator credibility index</strong> hai. Ye ek algorithm-driven score hai jo sirf follower count nahi, balki 4 different dimensions ko measure karta hai.</p>
          `,
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
          featured: false,
          published: true,
          author: 'CreatorBharat',
          tags: ['CB Score', 'Creator Score', 'Trust Index', 'Creator Growth', 'CreatorBharat']
        },
        {
          slug: 'tier-2-creator-brand-deal-kaise-milega',
          title: 'Tier-2 Creator Ko Brand Deal Kaise Milega? Complete Step-by-Step Guide',
          category: 'Creator Guides',
          excerpt: 'Sirf metro creators ke liye nahi hain brand deals. Jaipur, Bhilwara, Indore ke creators bhi lakhs kamaa sakte hain. Ye guide aapko step-by-step batati hai ki verified hone se lekar pehli brand deal close karne tak ka poora process.',
          body: `
            <div class="quick-take" style="background:#fff7ed; border-left:4px solid #ff9431; padding:15px; margin-bottom:20px;">
              <strong>REALITY CHECK:</strong> 65% of our brand deals on CreatorBharat go to creators from Tier-2 and Tier-3 cities. Brands specifically want authentic regional voices. Aapka "local" hona hi aapka sabse bada advantage hai.
            </div>
            <p>Bahut se creators sochte hain ki brand deals sirf Mumbai ya Delhi ke "big influencers" ke liye hain. Ye myth hai. Brands ab specifically Tier-2 creators dhundh rahe hain kyunki unka audience zyada genuine aur engaged hota hai.</p>
          `,
          image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200',
          featured: false,
          published: true,
          author: 'CreatorBharat',
          tags: ['Brand Deals', 'Tier 2 Creators', 'Creator Income', 'Verified Badge', 'Escrow']
        }
      ];
      await prisma.blog.createMany({ data: defaultBlogs });
      console.log(`[Database Seeder]: ${defaultBlogs.length} default blogs seeded successfully.`);
    }

    // Seed default podcasts if empty
    const podcastCount = await prisma.podcast.count();
    if (podcastCount === 0) {
      const creators = await prisma.creator.findMany({ take: 1 });
      if (creators.length > 0) {
        const creatorId = creators[0].id;
        const defaultPodcasts = [
          {
            creatorId,
            title: 'Rural Entrepreneurship & Grassroots Startups in Rajasthan',
            description: 'In this episode, we talk to local founders in Udaipur who are building agricultural tech solutions for regional farmers, scaling without venture capital.',
            duration: '42:15',
            thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80',
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            published: true
          },
          {
            creatorId,
            title: 'How Tier-2 Content Creators are Digitizing Traditional Art Forms',
            description: 'Discussing the rise of local Rajasthani folk musicians and block painters utilizing Instagram Reels and YouTube to sell products directly globally.',
            duration: '28:40',
            thumbnail: 'https://images.unsplash.com/photo-1590608897129-79da98d15969?w=800&q=80',
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            published: true
          }
        ];
        await prisma.podcast.createMany({ data: defaultPodcasts });
        console.log(`[Database Seeder]: ${defaultPodcasts.length} default podcasts seeded successfully.`);
      }
    }
  } catch (err) {
    console.error('[Database Seeder Error]:', err.message);
  }
})();

// Start Server
if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    logger.info(`CreatorBharat SaaS API Server running on port ${PORT}`, { port: PORT });
  });
}

export { app, server };
