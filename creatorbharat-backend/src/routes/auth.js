// 🇮🇳 CreatorBharat SaaS Authentication Router
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import prisma from '../prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HANDLE_REGEX = /^[a-zA-Z0-9_.-]{3,30}$/;

const signToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'cb_super_secret_jwt_key_2026_production',
    { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }
  );
};

const safeUser = (user) => {
  const { password, ...rest } = user;
  return rest;
};

// Creator Signup Schema
const CreatorRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  handle: z.string().regex(HANDLE_REGEX),
  city: z.string().optional(),
  state: z.string().optional()
});

// Brand Signup Schema
const BrandRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  companyName: z.string().min(2),
  industry: z.string().optional(),
  website: z.string().url().optional().or(z.literal(''))
});

// Creator Registration Endpoint
router.post('/register/creator', async (req, res) => {
  try {
    const validated = CreatorRegisterSchema.parse(req.body);
    const emailLower = validated.email.toLowerCase().trim();
    const handleLower = validated.handle.toLowerCase().trim();

    // Check unique email and handle
    const emailExists = await prisma.user.findUnique({ where: { email: emailLower } });
    if (emailExists) return res.status(400).json({ error: 'Email already registered.' });

    const handleExists = await prisma.creator.findUnique({ where: { handle: handleLower } });
    if (handleExists) return res.status(400).json({ error: 'Handle already taken.' });

    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const user = await prisma.user.create({
      data: {
        email: emailLower,
        password: hashedPassword,
        role: 'CREATOR',
        creator: {
          create: {
            handle: handleLower,
            name: validated.name.trim(),
            city: validated.city?.trim() || null,
            state: validated.state?.trim() || null
          }
        }
      },
      include: { creator: true }
    });

    const token = signToken(user.id);
    res.status(201).json({ token, user: safeUser(user) });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors[0].message });
    }
    console.error('[register/creator] Error:', err.message);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// Brand Registration Endpoint
router.post('/register/brand', async (req, res) => {
  try {
    const validated = BrandRegisterSchema.parse(req.body);
    const emailLower = validated.email.toLowerCase().trim();

    const emailExists = await prisma.user.findUnique({ where: { email: emailLower } });
    if (emailExists) return res.status(400).json({ error: 'Email already registered.' });

    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const user = await prisma.user.create({
      data: {
        email: emailLower,
        password: hashedPassword,
        role: 'BRAND',
        brand: {
          create: {
            companyName: validated.companyName.trim(),
            industry: validated.industry?.trim() || null,
            website: validated.website?.trim() || null
          }
        }
      },
      include: { brand: true }
    });

    const token = signToken(user.id);
    res.status(201).json({ token, user: safeUser(user) });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors[0].message });
    }
    console.error('[register/brand] Error:', err.message);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// User Login Endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: { creator: true, brand: true }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = signToken(user.id);
    res.json({ token, user: safeUser(user) });
  } catch (err) {
    console.error('[login] Error:', err.message);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// Get Active Session Endpoint
router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: safeUser(req.user) });
});

export default router;
