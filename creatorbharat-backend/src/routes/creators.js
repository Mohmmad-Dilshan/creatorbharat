const router = require('express').Router();
const prisma = require('../prisma');
const { auth } = require('../middleware/auth');

// GET /api/creators — list with filters
router.get('/', async (req, res) => {
  try {
    const { q, state, district, niche, platform, verified, minFollowers, minER, sort, page=1, limit=20 } = req.query;

    const where = { status: 'ACTIVE' };
    if (q) where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { city: { contains: q, mode: 'insensitive' } },
      { bio: { contains: q, mode: 'insensitive' } },
    ];
    if (state) where.state = state;
    if (district) where.city = district;
    if (niche) where.niche = { has: niche };
    if (platform) where.platform = { has: platform };
    if (verified === 'true') where.verified = true;
    if (minFollowers) where.followers = { gte: parseInt(minFollowers) };
    if (minER) where.engagementRate = { gte: parseFloat(minER) };

    const orderBy = sort === 'followers' ? { followers: 'desc' }
      : sort === 'er' ? { engagementRate: 'desc' }
      : { score: 'desc' };

    const [creators, total] = await Promise.all([
      prisma.creator.findMany({
        where, orderBy,
        skip: (page-1) * limit,
        take: parseInt(limit),
        include: { reviews: { select: { rating: true } } }
      }),
      prisma.creator.count({ where })
    ]);

    res.json({ creators, total, page: parseInt(page), pages: Math.ceil(total/limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/creators/:handle — single creator profile
router.get('/:handle', async (req, res) => {
  try {
    const creator = await prisma.creator.findUnique({
      where: { handle: req.params.handle },
      include: {
        reviews: { orderBy: { createdAt: 'desc' } },
        podcasts: { where: { published: true } },
        _count: { select: { reviews: true, applications: true } }
      }
    });
    if (!creator) return res.status(404).json({ error: 'Creator not found' });
    res.json(creator);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/creators/me — update own profile
router.put('/me', auth, async (req, res) => {
  try {
    if (req.user.role !== 'CREATOR')
      return res.status(403).json({ error: 'Only creators can update creator profile' });

    const {
      name, bio, city, state, district, niche, platform,
      followers, engagementRate, instagram, youtube, twitter,
      rateMin, rateMax, services, languages, responseTime,
      photo, coverPhoto, portfolio
    } = req.body;

    const updated = await prisma.creator.update({
      where: { userId: req.user.id },
      data: {
        name, bio, city, state, district, niche, platform,
        followers: parseInt(followers)||0,
        engagementRate: parseFloat(engagementRate)||0,
        instagram, youtube, twitter,
        rateMin: parseInt(rateMin)||0,
        rateMax: parseInt(rateMax)||0,
        services, languages, responseTime,
        photo, coverPhoto, portfolio
      }
    });

    // Recalculate score
    await updateCreatorScore(updated.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Score calculation helper
async function updateCreatorScore(creatorId) {
  const c = await prisma.creator.findUnique({ where: { id: creatorId } });
  let score = 0;
  if (c.photo) score += 10;
  if (c.bio && c.bio.length > 50) score += 15;
  if (c.city) score += 5;
  if (c.niche?.length) score += 5;
  if (c.platform?.length) score += 5;
  if (c.instagram) score += 5;
  if (c.rateMin) score += 8;
  if (c.services?.length >= 3) score += 7;
  const f = c.followers;
  if (f >= 1000000) score += 30;
  else if (f >= 500000) score += 24;
  else if (f >= 100000) score += 18;
  else if (f >= 50000) score += 12;
  else if (f >= 10000) score += 6;
  score += Math.min(30, Math.round(c.engagementRate * 3));
  await prisma.creator.update({ where: { id: creatorId }, data: { score: Math.min(100, score) } });
}

module.exports = router;
