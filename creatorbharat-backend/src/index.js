// 🇮🇳 CreatorBharat SaaS Express API Server
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';

// Route Imports
import authRouter from './routes/auth.js';
import creatorsRouter from './routes/creators.js';
import campaignsRouter from './routes/campaigns.js';
import adminRouter from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Security and CORS middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Global Rate Limiter to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
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

// App Router Registry
app.use('/api/auth', authRouter);
app.use('/api/creators', creatorsRouter);
app.use('/api/campaigns', campaignsRouter);
app.use('/api/admin', adminRouter);

// Global 404 Error handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

// Global Exception handler
app.use((err, req, res, next) => {
  console.error('[Error Handler]:', err.stack || err.message || err);
  res.status(500).json({ error: 'Internal Server Error.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 CreatorBharat SaaS API Server running on port ${PORT}`);
});
