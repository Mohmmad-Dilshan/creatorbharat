const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { auth } = require('../middleware/auth');
const prisma = new PrismaClient();

// GET /api/messages
router.get('/', auth, async (req, res) => {
  try {
    const isBrand = req.user.role === 'BRAND';
    const messages = await prisma.message.findMany({
      where: isBrand ? { brandId: req.user.brand.id } : { creatorId: req.user.creator.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/messages
router.post('/', auth, async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    const isBrand = req.user.role === 'BRAND';
    const message = await prisma.message.create({
      data: {
        text,
        fromBrand: isBrand,
        brandId: isBrand ? req.user.brand.id : receiverId,
        creatorId: isBrand ? receiverId : req.user.creator.id,
      }
    });
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
