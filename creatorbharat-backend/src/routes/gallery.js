// 🇮🇳 CreatorBharat SaaS Ecosystem Gallery Router
import express from 'express';
import prisma from '../prisma.js';

const router = express.Router();

// GET /api/gallery — get all gallery items
router.get('/', async (req, res) => {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch (err) {
    console.error('[GET /api/gallery] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve gallery items.' });
  }
});

export default router;
