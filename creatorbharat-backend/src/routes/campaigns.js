const router = require('express').Router();
const prisma = require('../prisma');
const { auth } = require('../middleware/auth');

// GET /api/campaigns
router.get('/', async (req, res) => {
  try {
    const { niche, platform, urgent, page=1, limit=20 } = req.query;
    const where = { status: 'LIVE' };
    if (niche) where.niche = { has: niche };
    if (platform) where.platform = { has: platform };
    if (urgent === 'true') where.urgent = true;

    const [campaigns, total] = await Promise.all([
      prisma.campaign.findMany({
        where, orderBy: { createdAt: 'desc' },
        skip: (page-1)*limit, take: parseInt(limit),
        include: { brand: { select: { companyName: true, logo: true, verified: true } } }
      }),
      prisma.campaign.count({ where })
    ]);

    res.json({ campaigns, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/campaigns/:id
router.get('/:id', async (req, res) => {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: req.params.id },
      include: { brand: true, applications: { include: { creator: true } } }
    });
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/campaigns -- brand creates campaign
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'BRAND')
      return res.status(403).json({ error: 'Only brands can create campaigns' });

    const campaign = await prisma.campaign.create({
      data: { ...req.body, brandId: req.user.brand.id, status: 'LIVE' }
    });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
