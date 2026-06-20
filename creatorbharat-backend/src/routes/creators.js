// 🇮🇳 CreatorBharat SaaS Creators Router
import express from 'express';
import prisma from '../prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/creators — query and filter active creators
router.get('/', async (req, res) => {
  try {
    const { q, state, niche, platform, verified, minFollowers, sort, page = 1, limit = 20 } = req.query;

    const where = {};
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { bio: { contains: q, mode: 'insensitive' } }
      ];
    }
    if (state) where.state = state;
    if (niche) where.niche = { has: niche };
    if (platform) where.platform = { has: platform };
    if (verified === 'true') where.isVerified = true;
    if (minFollowers) where.followers = { gte: parseInt(minFollowers) };

    const orderBy = sort === 'followers' ? { followers: 'desc' } : { createdAt: 'desc' };

    const [creators, total] = await Promise.all([
      prisma.creator.findMany({
        where,
        orderBy,
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit)
      }),
      prisma.creator.count({ where })
    ]);

    res.json({
      creators,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (err) {
    console.error('[GET /api/creators] Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch creators.' });
  }
});

// GET /api/creators/:idOrHandle — fetch single profile
router.get('/:idOrHandle', async (req, res) => {
  try {
    const { idOrHandle } = req.params;

    const creator = await prisma.creator.findFirst({
      where: {
        OR: [
          { id: idOrHandle },
          { handle: idOrHandle.toLowerCase() }
        ]
      }
    });

    if (!creator) {
      return res.status(404).json({ error: 'Creator profile not found.' });
    }

    res.json(creator);
  } catch (err) {
    console.error('[GET /api/creators/:idOrHandle] Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch creator profile.' });
  }
});

// PUT /api/creators/me — update authenticated creator's profile details
router.put('/me', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'CREATOR') {
      return res.status(403).json({ error: 'Access restricted to creators only.' });
    }

    const {
      name, bio, city, state, niche, platform,
      followers, engagementRate, rateMin, rateMax
    } = req.body;

    const updated = await prisma.creator.update({
      where: { userId: req.user.id },
      data: {
        name,
        bio,
        city,
        state,
        niche: Array.isArray(niche) ? niche : undefined,
        platform: Array.isArray(platform) ? platform : undefined,
        followers: followers !== undefined ? parseInt(followers) : undefined,
        engagementRate: engagementRate !== undefined ? parseFloat(engagementRate) : undefined,
        rateMin: rateMin !== undefined ? parseInt(rateMin) : undefined,
        rateMax: rateMax !== undefined ? parseInt(rateMax) : undefined
      }
    });

    res.json(updated);
  } catch (err) {
    console.error('[PUT /api/creators/me] Error:', err.message);
    res.status(500).json({ error: 'Failed to update profile details.' });
  }
});

export default router;
