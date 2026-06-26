// 🇮🇳 CreatorBharat SaaS Referrals Router
import express from 'express';
import prisma from '../prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/referrals/my — Get referral statistics and list of referred creators
router.get('/my', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'CREATOR') {
      return res.status(403).json({ error: 'Referrals are only available for creators.' });
    }

    const creator = await prisma.creator.findUnique({
      where: { userId: req.user.id }
    });
    if (!creator) {
      return res.status(404).json({ error: 'Creator profile not found.' });
    }

    // Fetch all referrals made by this creator
    const referrals = await prisma.referral.findMany({
      where: { referrerId: creator.id },
      include: {
        referred: {
          select: {
            id: true,
            name: true,
            handle: true,
            photo: true,
            isVerified: true,
            createdAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const totalReferred = referrals.length;
    const verifiedCount = referrals.filter(r => r.status === 'VERIFIED' || r.status === 'REWARDED').length;
    const pendingCount = totalReferred - verifiedCount;
    const totalEarnings = referrals
      .filter(r => r.status === 'REWARDED')
      .reduce((sum, r) => sum + r.rewardAmount, 0);

    res.json({
      referralCode: creator.handle,
      totalReferred,
      pendingCount,
      verifiedCount,
      totalEarnings,
      referrals
    });
  } catch (err) {
    console.error('[GET /api/referrals/my] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve referral data.' });
  }
});

// POST /api/referrals — Apply a referral code (link current creator as referred by handle)
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'CREATOR') {
      return res.status(403).json({ error: 'Only creators can apply referral codes.' });
    }

    const { code } = req.body;
    if (!code || code.trim().length === 0) {
      return res.status(400).json({ error: 'Referral code is required.' });
    }

    const referredCreator = await prisma.creator.findUnique({
      where: { userId: req.user.id }
    });
    if (!referredCreator) {
      return res.status(404).json({ error: 'Creator profile not found.' });
    }

    // Check if creator has already been referred
    const existing = await prisma.referral.findUnique({
      where: { referredId: referredCreator.id }
    });
    if (existing) {
      return res.status(400).json({ error: 'You have already applied a referral code.' });
    }

    // Find referrer by handle (code)
    const referrerCreator = await prisma.creator.findUnique({
      where: { handle: code.trim().toLowerCase() }
    });

    if (!referrerCreator) {
      return res.status(404).json({ error: 'Invalid referral code.' });
    }

    if (referrerCreator.id === referredCreator.id) {
      return res.status(400).json({ error: 'You cannot refer yourself.' });
    }

    // Create the referral record
    const referral = await prisma.referral.create({
      data: {
        referrerId: referrerCreator.id,
        referredId: referredCreator.id,
        status: 'PENDING',
        rewardAmount: 199
      }
    });

    // Notify referrer
    try {
      await prisma.notification.create({
        data: {
          userId: referrerCreator.userId,
          title: '👥 New Referral Registered',
          body: `${referredCreator.name} registered using your referral code. You will get ₹199 once they get verified!`,
          type: 'INFO',
          link: '/creator/monetization'
        }
      });
    } catch (notifErr) {
      console.error('Failed to notify referrer:', notifErr.message);
    }

    res.status(201).json({ success: true, message: 'Referral code applied successfully!', referral });
  } catch (err) {
    console.error('[POST /api/referrals] Error:', err.message);
    res.status(500).json({ error: 'Failed to apply referral code.' });
  }
});

export default router;
