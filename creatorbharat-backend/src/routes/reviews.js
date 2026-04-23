const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { auth } = require('../middleware/auth');
const prisma = new PrismaClient();

// POST /api/reviews
router.post('/', auth, async (req, res) => {
  try {
    const { creatorId, text, rating, reviewerName } = req.body;
    let verified = false;
    let brandId = null;
    if (req.user.role === 'BRAND') {
      verified = true;
      brandId = req.user.brand.id;
    }
    const review = await prisma.review.create({
      data: { creatorId, brandId, reviewerName, text, rating: parseInt(rating), verified }
    });
    // Recalculate avg rating
    const agg = await prisma.review.aggregate({
      where: { creatorId },
      _avg: { rating: true }
    });
    await prisma.creator.update({
      where: { id: creatorId },
      data: { avgRating: agg._avg.rating || 0 }
    });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
