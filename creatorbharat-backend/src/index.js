// 🇮🇳 CreatorBharat SaaS Express API Server
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
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

// Security and CORS middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));

// Global Rate Limiter to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

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

// Global 404 Error handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Requested pathway or endpoint not found on this server.',
    message: 'Please verify the route parameters or refer to the official API docs.'
  });
});

// Global Exception handler
app.use((err, req, res, next) => {
  console.error('[Error Handler]:', err.stack || err.message || err);
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

// Seed Admin Account on Server Startup
(async () => {
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
  } catch (err) {
    console.error('[Database Seeder Error]:', err.message);
  }
})();

// Start Server
server.listen(PORT, () => {
  console.log(`🚀 CreatorBharat SaaS API Server running on port ${PORT}`);
});
