// 🇮🇳 CreatorBharat SaaS Achievements Router
import express from 'express';
import prisma from '../prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/achievements/creator/:id — Get achievements for a specific creator
router.get('/creator/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const achievements = await prisma.achievement.findMany({
      where: { creatorId: id },
      orderBy: { unlockedAt: 'desc' }
    });
    res.json(achievements);
  } catch (err) {
    console.error('[GET /api/achievements/creator/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve achievements.' });
  }
});

// POST /api/achievements — Grant an achievement (Admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin role required.' });
    }

    const { creatorId, type, title, description } = req.body;
    if (!creatorId || !type || !title) {
      return res.status(400).json({ error: 'creatorId, type, and title are required.' });
    }

    // Verify creator exists
    const creator = await prisma.creator.findUnique({
      where: { id: creatorId }
    });
    if (!creator) {
      return res.status(404).json({ error: 'Creator not found.' });
    }

    const achievement = await prisma.achievement.create({
      data: {
        creatorId,
        type,
        title,
        description: description || null,
        isAwarded: true
      }
    });

    // Create a notification for the creator
    try {
      await prisma.notification.create({
        data: {
          userId: creator.userId,
          title: `🏆 New Achievement Unlocked: ${title}`,
          body: `Congratulations! You unlocked the "${title}" badge. Check it out on your profile!`,
          type: 'SUCCESS',
          link: '/creator/achievements'
        }
      });
    } catch (notifErr) {
      console.error('Failed to create notification for achievement:', notifErr.message);
    }

    res.status(201).json(achievement);
  } catch (err) {
    console.error('[POST /api/achievements] Error:', err.message);
    res.status(500).json({ error: 'Failed to grant achievement.' });
  }
});

export default router;
