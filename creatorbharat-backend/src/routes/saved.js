// 🇮🇳 CreatorBharat SaaS Saved & Bookmarked Items Router
import express from 'express';
import prisma from '../prisma.js';
import { authMiddleware } from '../middleware/auth.js';
import { z } from 'zod';

const router = express.Router();

const saveSchema = z.object({
  targetId: z.string().min(1, 'Target ID is required.'),
  itemType: z.enum(['CREATOR', 'CAMPAIGN']).optional()
});

// GET /api/saved — List all saved/bookmarked items for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const savedItems = await prisma.savedItem.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(savedItems);
  } catch (err) {
    console.error('[GET /api/saved] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve saved items.' });
  }
});

// POST /api/saved — Save/Bookmark an item (idempotent upsert)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const parse = saveSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.errors[0].message });
    }

    let { targetId, itemType } = parse.data;

    if (!itemType) {
      // Auto-detect itemType
      const isCreator = await prisma.creator.findUnique({ where: { id: targetId } });
      if (isCreator) {
        itemType = 'CREATOR';
      } else {
        const isCampaign = await prisma.campaign.findUnique({ where: { id: targetId } });
        if (isCampaign) {
          itemType = 'CAMPAIGN';
        } else {
          return res.status(404).json({ error: 'Target item not found in database.' });
        }
      }
    }

    const saved = await prisma.savedItem.upsert({
      where: {
        userId_targetId_itemType: {
          userId: req.user.id,
          targetId,
          itemType
        }
      },
      update: {}, // Keep existing if already saved
      create: {
        userId: req.user.id,
        targetId,
        itemType
      }
    });

    res.status(201).json({
      success: true,
      message: `${itemType} saved successfully.`,
      saved
    });
  } catch (err) {
    console.error('[POST /api/saved] Error:', err.message);
    res.status(500).json({ error: 'Failed to save item.' });
  }
});

// DELETE /api/saved/:targetId — Unsave/Remove a bookmark
router.delete('/:targetId', authMiddleware, async (req, res) => {
  try {
    const { targetId } = req.params;

    const deleteResult = await prisma.savedItem.deleteMany({
      where: {
        userId: req.user.id,
        targetId: targetId
      }
    });

    res.json({
      success: true,
      message: 'Item removed from saved list.',
      count: deleteResult.count
    });
  } catch (err) {
    console.error('[DELETE /api/saved/:targetId] Error:', err.message);
    res.status(500).json({ error: 'Failed to unsave item.' });
  }
});

export default router;
