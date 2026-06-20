// 🇮🇳 CreatorBharat SaaS Admin Router
import express from 'express';
import prisma from '../prisma.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Apply auth middleware and requireRole ADMIN to all routes inside this router
router.use(authMiddleware);
router.use(requireRole(['ADMIN']));

// GET /api/admin/verifications — fetch pending verification requests
router.get('/verifications', async (req, res) => {
  try {
    const creators = await prisma.creator.findMany({
      where: { isVerified: false },
      orderBy: { updatedAt: 'desc' }
    });
    res.json(creators);
  } catch (err) {
    console.error('[GET /api/admin/verifications] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve verification queue.' });
  }
});

// POST /api/admin/verify/:creatorId — approve user profile verification
router.post('/verify/:creatorId', async (req, res) => {
  try {
    const { creatorId } = req.params;

    const creator = await prisma.creator.findUnique({
      where: { id: creatorId }
    });

    if (!creator) {
      return res.status(404).json({ error: 'Creator profile not found.' });
    }

    const updated = await prisma.creator.update({
      where: { id: creatorId },
      data: { isVerified: true }
    });

    res.json({ message: 'Creator profile successfully verified.', creator: updated });
  } catch (err) {
    console.error('[POST /api/admin/verify/:creatorId] Error:', err.message);
    res.status(500).json({ error: 'Failed to verify creator profile.' });
  }
});

export default router;
