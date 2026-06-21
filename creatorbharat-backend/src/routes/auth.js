// 🇮🇳 CreatorBharat SaaS Authentication Router
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import prisma from '../prisma.js';
import { authMiddleware } from '../middleware/auth.js';
import { sendEmail } from '../utils/mailer.js';

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

// In-memory store for OTP verification (maps phone to { otp, expiresAt })
const otpStore = new Map();

// Creator Signup Schema
const CreatorRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  handle: z.string().regex(HANDLE_REGEX),
  city: z.string().optional(),
  state: z.string().optional(),
  phone: z.string().optional().or(z.literal('')),
  otp: z.string().optional().or(z.literal(''))
});

// Brand Signup Schema
const BrandRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  companyName: z.string().min(2),
  industry: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  otp: z.string().optional().or(z.literal(''))
});

// Send OTP to phone number
router.post('/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone || phone.length < 10) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit phone number.' });
    }

    const cleanedPhone = phone.replace(/\D/g, '');
    if (cleanedPhone.length !== 10) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit phone number.' });
    }

    // Default code 1234 for dev/testing, random 4-digit for production
    const otp = process.env.NODE_ENV === 'production' ? Math.floor(1000 + Math.random() * 9000).toString() : '1234';
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore.set(cleanedPhone, { otp, expiresAt });

    console.log(`\n--- [SMS OTP MOCK] ---`);
    console.log(`Sent code: ${otp} to phone: ${cleanedPhone}`);
    console.log(`Expires at: ${new Date(expiresAt).toLocaleTimeString()}`);
    console.log(`-----------------------\n`);

    res.json({ success: true, message: 'OTP sent successfully.' });
  } catch (err) {
    console.error('[send-otp] Error:', err.message);
    res.status(500).json({ error: 'Failed to send OTP.' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone and OTP are required.' });
    }

    const cleanedPhone = phone.replace(/\D/g, '');
    const record = otpStore.get(cleanedPhone);

    if (!record) {
      return res.status(400).json({ error: 'No OTP requested for this phone number.' });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(cleanedPhone);
      return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }

    if (record.otp !== otp.trim()) {
      return res.status(400).json({ error: 'Invalid OTP. Please try again.' });
    }

    res.json({ success: true, message: 'OTP verified successfully.' });
  } catch (err) {
    console.error('[verify-otp] Error:', err.message);
    res.status(500).json({ error: 'Verification failed.' });
  }
});

// Login using Phone and OTP
router.post('/login-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone and OTP are required.' });
    }

    const cleanedPhone = phone.replace(/\D/g, '');
    const record = otpStore.get(cleanedPhone);

    if (!record) {
      return res.status(400).json({ error: 'No OTP requested for this phone number.' });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(cleanedPhone);
      return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }

    if (record.otp !== otp.trim()) {
      return res.status(400).json({ error: 'Invalid OTP. Please try again.' });
    }

    const user = await prisma.user.findUnique({
      where: { phone: cleanedPhone },
      include: { creator: true, brand: true }
    });

    if (!user) {
      return res.status(404).json({ error: 'No account found with this phone number. Please sign up first.' });
    }

    if (user.isSuspended) {
      return res.status(403).json({ error: 'Your account has been suspended by an administrator. Please contact support.' });
    }

    otpStore.delete(cleanedPhone);

    const token = signToken(user.id);
    res.json({ token, user: safeUser(user) });
  } catch (err) {
    console.error('[login-otp] Error:', err.message);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
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

    // Handle OTP verification if phone is provided
    let verifiedPhone = null;
    if (validated.phone) {
      const cleanedPhone = validated.phone.replace(/\D/g, '');
      const record = otpStore.get(cleanedPhone);
      if (!record || record.otp !== validated.otp?.trim() || Date.now() > record.expiresAt) {
        return res.status(400).json({ error: 'Invalid or expired OTP for phone verification.' });
      }
      
      const phoneExists = await prisma.user.findUnique({ where: { phone: cleanedPhone } });
      if (phoneExists) {
        return res.status(400).json({ error: 'Phone number already registered to another account.' });
      }
      verifiedPhone = cleanedPhone;
      otpStore.delete(cleanedPhone);
    }

    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const user = await prisma.user.create({
      data: {
        email: emailLower,
        phone: verifiedPhone,
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

    // Send Welcome Email
    sendEmail({
      to: user.email,
      subject: 'Welcome to CreatorBharat! 🇮🇳',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #0f172a; max-width: 600px; margin: auto; border: 1px solid #f1f5f9; border-radius: 12px;">
          <h2 style="color: #FF9431;">Welcome to CreatorBharat, ${validated.name.trim()}! 🎉</h2>
          <p>We are thrilled to have you join India's premier influencer network.</p>
          <p>Here are your next steps to get started:</p>
          <ul style="line-height: 1.6;">
            <li><strong>Complete your profile:</strong> Add your portfolio, rates, and local impact details.</li>
            <li><strong>Submit for Verification:</strong> Get your Elite Badge to stand out to premium brands.</li>
            <li><strong>Apply to Campaigns:</strong> Pitch directly to campaigns in your niche.</li>
          </ul>
          <p style="margin-top: 24px;">Best regards,<br/><strong>Team CreatorBharat</strong></p>
        </div>
      `
    }).catch(err => console.error('Welcome email error:', err));
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

    // Handle OTP verification if phone is provided
    let verifiedPhone = null;
    if (validated.phone) {
      const cleanedPhone = validated.phone.replace(/\D/g, '');
      const record = otpStore.get(cleanedPhone);
      if (!record || record.otp !== validated.otp?.trim() || Date.now() > record.expiresAt) {
        return res.status(400).json({ error: 'Invalid or expired OTP for phone verification.' });
      }
      
      const phoneExists = await prisma.user.findUnique({ where: { phone: cleanedPhone } });
      if (phoneExists) {
        return res.status(400).json({ error: 'Phone number already registered to another account.' });
      }
      verifiedPhone = cleanedPhone;
      otpStore.delete(cleanedPhone);
    }

    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const user = await prisma.user.create({
      data: {
        email: emailLower,
        phone: verifiedPhone,
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

    // Send Welcome Email
    sendEmail({
      to: user.email,
      subject: 'Welcome to CreatorBharat for Brands! 💼',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #0f172a; max-width: 600px; margin: auto; border: 1px solid #f1f5f9; border-radius: 12px;">
          <h2 style="color: #FF9431;">Welcome to CreatorBharat, ${validated.companyName.trim()}! 🎉</h2>
          <p>We are thrilled to help you scale your campaigns with India's top regional storytellers.</p>
          <p>Here is what you can do right now:</p>
          <ul style="line-height: 1.6;">
            <li><strong>Post a Campaign:</strong> Create a campaign proposal and set your budget.</li>
            <li><strong>Discover Creators:</strong> Use our advanced geographic and niche filters to find verified partners.</li>
            <li><strong>Manage Pitches:</strong> Review creator applications and deposit funds securely into escrow.</li>
          </ul>
          <p style="margin-top: 24px;">Best regards,<br/><strong>Team CreatorBharat</strong></p>
        </div>
      `
    }).catch(err => console.error('Welcome email error:', err));
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

    if (user.isSuspended) {
      return res.status(403).json({ error: 'Your account has been suspended by an administrator. Please contact support.' });
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
