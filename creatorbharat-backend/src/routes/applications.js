// 🇮🇳 CreatorBharat SaaS Applications Router
import express from 'express';
import prisma from '../prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

// POST /api/applications — submit pitch to campaign
router.post('/', async (req, res) => {
  try {
    if (req.user.role !== 'CREATOR') {
      return res.status(403).json({ error: 'Access restricted to creators only.' });
    }

    const { campaignId, message, proposedRate } = req.body;

    if (!campaignId) {
      return res.status(400).json({ error: 'Campaign ID is required.' });
    }

    const creator = await prisma.creator.findUnique({
      where: { userId: req.user.id }
    });

    if (!creator) {
      return res.status(404).json({ error: 'Creator profile details not found.' });
    }

    const existing = await prisma.application.findUnique({
      where: {
        campaignId_creatorId: {
          campaignId,
          creatorId: creator.id
        }
      }
    });

    if (existing) {
      return res.status(400).json({ error: 'You have already applied to this campaign.' });
    }

    const application = await prisma.application.create({
      data: {
        campaignId,
        creatorId: creator.id,
        pitch: message,
        status: 'PENDING'
      }
    });

    res.status(201).json(application);
  } catch (err) {
    console.error('[POST /api/applications] Error:', err.message);
    res.status(500).json({ error: 'Failed to submit application.' });
  }
});

// GET /api/applications/me — fetch active applications for logged-in user
router.get('/me', async (req, res) => {
  try {
    if (req.user.role === 'CREATOR') {
      const creator = await prisma.creator.findUnique({
        where: { userId: req.user.id }
      });
      if (!creator) return res.status(404).json({ error: 'Creator details not found.' });

      const apps = await prisma.application.findMany({
        where: { creatorId: creator.id },
        include: { campaign: true }
      });
      res.json(apps);
    } else if (req.user.role === 'BRAND') {
      const brand = await prisma.brand.findUnique({
        where: { userId: req.user.id }
      });
      if (!brand) return res.status(404).json({ error: 'Brand details not found.' });

      const apps = await prisma.application.findMany({
        where: {
          campaign: { brandId: brand.id }
        },
        include: {
          creator: true,
          campaign: true
        }
      });
      res.json(apps);
    } else {
      res.status(403).json({ error: 'Unauthorized role access.' });
    }
  } catch (err) {
    console.error('[GET /api/applications/me] Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch user applications.' });
  }
});

export default router;
