// 🇮🇳 CreatorBharat SaaS Newsletters Router
import express from 'express';
import prisma from '../prisma.js';
import { z } from 'zod';

const router = express.Router();

const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address.')
});

// POST /api/newsletter/subscribe — public newsletter registration
router.post('/subscribe', async (req, res) => {
  try {
    const parse = subscribeSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.errors[0].message });
    }

    const emailClean = parse.data.email.toLowerCase().trim();

    const existing = await prisma.newsletter.findUnique({
      where: { email: emailClean }
    });

    if (existing) {
      return res.status(400).json({ error: 'This email is already subscribed to the newsletter.' });
    }

    const subscription = await prisma.newsletter.create({
      data: { email: emailClean }
    });

    res.status(201).json({ success: true, message: 'Welcome to CreatorBharat Ecosystem!', subscription });
  } catch (err) {
    console.error('[POST /api/newsletter/subscribe] Error:', err.message);
    res.status(500).json({ error: 'Failed to complete newsletter subscription.' });
  }
});

export default router;
