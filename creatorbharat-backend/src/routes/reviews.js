// 🇮🇳 CreatorBharat SaaS Reviews Router
import express from 'express';
import prisma from '../prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// POST /api/reviews — brands or users publish feedback for creator
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { creatorId, text, rating, reviewerName } = req.body;

    if (!creatorId || !text || !rating) {
      return res.status(400).json({ error: 'Creator ID, review text, and rating are required.' });
    }

    const brand = req.user.role === 'BRAND' ? req.user.brand : null;

    const review = await prisma.review.create({
      data: {
        creatorId,
        brandId: brand?.id || null,
        reviewerName: reviewerName || req.user.email,
        text,
        rating: parseInt(rating)
      }
    });

    res.status(201).json(review);
  } catch (err) {
    console.error('[POST /api/reviews] Error:', err.message);
    res.status(500).json({ error: 'Failed to publish creator review.' });
  }
});

export default router;
