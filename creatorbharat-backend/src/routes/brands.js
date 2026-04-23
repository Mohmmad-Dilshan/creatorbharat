const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { auth } = require('../middleware/auth');
const prisma = new PrismaClient();

// GET /api/brands/:id
router.get('/:id', async (req, res) => {
  try {
    const brand = await prisma.brand.findUnique({
      where: { id: req.params.id },
      include: { campaigns: true }
    });
    if (!brand) return res.status(404).json({ error: 'Brand not found' });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/brands/me
router.put('/me', auth, async (req, res) => {
  try {
    if (req.user.role !== 'BRAND') return res.status(403).json({ error: 'Only brands can update brand profile' });
    const { companyName, contactName, website, industry, logo } = req.body;
    const updated = await prisma.brand.update({
      where: { userId: req.user.id },
      data: { companyName, contactName, website, industry, logo }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
