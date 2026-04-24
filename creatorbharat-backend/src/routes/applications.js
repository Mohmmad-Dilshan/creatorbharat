const router = require('express').Router();
const prisma = require('../prisma');
const { auth } = require('../middleware/auth');

// POST /api/applications
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'CREATOR') return res.status(403).json({ error: 'Only creators can apply' });
    const { campaignId, message, proposedRate } = req.body;
    
    const existing = await prisma.application.findUnique({
      where: { campaignId_creatorId: { campaignId, creatorId: req.user.creator.id } }
    });
    if (existing) return res.status(400).json({ error: 'Already applied' });

    const application = await prisma.application.create({
      data: { campaignId, creatorId: req.user.creator.id, message, proposedRate: parseInt(proposedRate)||null }
    });
    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/applications/me
router.get('/me', auth, async (req, res) => {
  try {
    if (req.user.role === 'CREATOR') {
      const apps = await prisma.application.findMany({
        where: { creatorId: req.user.creator.id },
        include: { campaign: true }
      });
      res.json(apps);
    } else if (req.user.role === 'BRAND') {
      const apps = await prisma.application.findMany({
        where: { campaign: { brandId: req.user.brand.id } },
        include: { creator: true, campaign: true }
      });
      res.json(apps);
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
