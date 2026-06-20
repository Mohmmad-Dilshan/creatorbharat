// 🇮🇳 CreatorBharat SaaS Express API Server
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';

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

// Auth Routes (Sign Up, Login, OTP Validation)
app.use('/api/auth', (req, res) => {
  res.status(501).json({ message: 'Auth endpoints template initialized. Implement auth.js routes.' });
});

// Creator Routes (Profiles, Rate cards, Verification)
app.use('/api/creators', (req, res) => {
  res.status(501).json({ message: 'Creator endpoints template initialized. Implement creators.js routes.' });
});

// Campaign Routes (Listing, Application submissions)
app.use('/api/campaigns', (req, res) => {
  res.status(501).json({ message: 'Campaign endpoints template initialized. Implement campaigns.js routes.' });
});

// Global 404 Error handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

// Global Exception handler
app.use((err, req, res, next) => {
  console.error('[Error Handler]:', err.stack);
  res.status(500).json({ error: 'Internal Server Error.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 CreatorBharat SaaS API Server running on port ${PORT}`);
});
