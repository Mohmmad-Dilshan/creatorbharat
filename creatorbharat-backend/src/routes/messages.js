// 🇮🇳 CreatorBharat SaaS Messages Router
import express from 'express';
import prisma from '../prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

// GET /api/messages — fetch user chat histories
router.get('/', async (req, res) => {
  try {
    const isBrand = req.user.role === 'BRAND';
    
    let where = {};
    if (isBrand) {
      const brand = await prisma.brand.findUnique({ where: { userId: req.user.id } });
      if (!brand) return res.status(404).json({ error: 'Brand details not found.' });
      where.brandId = brand.id;
    } else {
      const creator = await prisma.creator.findUnique({ where: { userId: req.user.id } });
      if (!creator) return res.status(404).json({ error: 'Creator details not found.' });
      where.creatorId = creator.id;
    }

    const messages = await prisma.message.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json(messages);
  } catch (err) {
    console.error('[GET /api/messages] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve messages.' });
  }
});

// POST /api/messages — send new chat message
router.post('/', async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    const isBrand = req.user.role === 'BRAND';

    if (!receiverId || !text) {
      return res.status(400).json({ error: 'Receiver ID and text message are required.' });
    }

    let brandId = '';
    let creatorId = '';

    if (isBrand) {
      const brand = await prisma.brand.findUnique({ where: { userId: req.user.id } });
      if (!brand) return res.status(404).json({ error: 'Brand details not found.' });
      brandId = brand.id;
      creatorId = receiverId;
    } else {
      const creator = await prisma.creator.findUnique({ where: { userId: req.user.id } });
      if (!creator) return res.status(404).json({ error: 'Creator details not found.' });
      creatorId = creator.id;
      brandId = receiverId;
    }

    const message = await prisma.message.create({
      data: {
        text,
        fromBrand: isBrand,
        brandId,
        creatorId
      }
    });

    res.status(201).json(message);
  } catch (err) {
    console.error('[POST /api/messages] Error:', err.message);
    res.status(500).json({ error: 'Failed to dispatch chat message.' });
  }
});

export default router;
