// 🇮🇳 CreatorBharat SaaS Ecosystem Gigs Router
import express from 'express';
import prisma from '../prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

// GET /api/gigs/me — fetch active campaign gigs for logged-in creator or brand
router.get('/me', async (req, res) => {
  try {
    if (req.user.role === 'CREATOR') {
      const creator = await prisma.creator.findUnique({
        where: { userId: req.user.id }
      });
      if (!creator) return res.status(404).json({ error: 'Creator profile details not found.' });

      const gigs = await prisma.campaignGig.findMany({
        where: { creatorId: creator.id },
        include: {
          campaign: {
            include: {
              brand: true
            }
          },
          milestones: {
            orderBy: { createdAt: 'asc' }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
      res.json(gigs);
    } else if (req.user.role === 'BRAND') {
      const brand = await prisma.brand.findUnique({
        where: { userId: req.user.id }
      });
      if (!brand) return res.status(404).json({ error: 'Brand profile details not found.' });

      const gigs = await prisma.campaignGig.findMany({
        where: {
          campaign: { brandId: brand.id }
        },
        include: {
          creator: true,
          campaign: true,
          milestones: {
            orderBy: { createdAt: 'asc' }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
      res.json(gigs);
    } else {
      res.status(403).json({ error: 'Unauthorized role access.' });
    }
  } catch (err) {
    console.error('[GET /api/gigs/me] Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch gigs.' });
  }
});

// POST /api/gigs/:id/milestones/:mId/submit — submit proof of work for a milestone (Creator only)
router.post('/:id/milestones/:mId/submit', async (req, res) => {
  try {
    if (req.user.role !== 'CREATOR') {
      return res.status(403).json({ error: 'Only creators can submit milestone proof of work.' });
    }

    const { id, mId } = req.params;
    const { proofText, proofUrl } = req.body;

    const creator = await prisma.creator.findUnique({
      where: { userId: req.user.id }
    });
    if (!creator) return res.status(404).json({ error: 'Creator profile details not found.' });

    // Verify gig belongs to this creator
    const gig = await prisma.campaignGig.findUnique({
      where: { id },
      include: { milestones: true }
    });

    if (!gig) {
      return res.status(404).json({ error: 'Gig not found.' });
    }

    if (gig.creatorId !== creator.id) {
      return res.status(403).json({ error: 'Unauthorized to access this gig.' });
    }

    const milestone = gig.milestones.find(m => m.id === mId);
    if (!milestone) {
      return res.status(404).json({ error: 'Milestone not found.' });
    }

    if (milestone.status === 'APPROVED') {
      return res.status(400).json({ error: 'Milestone has already been approved.' });
    }

    const updatedMilestone = await prisma.gigMilestone.update({
      where: { id: mId },
      data: {
        status: 'SUBMITTED',
        proofText: proofText || null,
        proofUrl: proofUrl || null,
        updatedAt: new Date()
      }
    });

    res.json({ success: true, milestone: updatedMilestone });
  } catch (err) {
    console.error('[POST /api/gigs/:id/milestones/:mId/submit] Error:', err.message);
    res.status(500).json({ error: 'Failed to submit milestone proof.' });
  }
});

// POST /api/gigs/:id/milestones/:mId/approve — approve milestone and release payment (Brand only)
router.post('/:id/milestones/:mId/approve', async (req, res) => {
  try {
    if (req.user.role !== 'BRAND') {
      return res.status(403).json({ error: 'Only brands can approve milestones.' });
    }

    const { id, mId } = req.params;

    const brand = await prisma.brand.findUnique({
      where: { userId: req.user.id }
    });
    if (!brand) return res.status(404).json({ error: 'Brand profile details not found.' });

    // Verify gig and milestone belong to a campaign owned by this brand
    const gig = await prisma.campaignGig.findUnique({
      where: { id },
      include: {
        campaign: true,
        milestones: true
      }
    });

    if (!gig) {
      return res.status(404).json({ error: 'Gig not found.' });
    }

    if (gig.campaign.brandId !== brand.id) {
      return res.status(403).json({ error: 'Unauthorized to manage this gig.' });
    }

    const milestone = gig.milestones.find(m => m.id === mId);
    if (!milestone) {
      return res.status(404).json({ error: 'Milestone not found.' });
    }

    if (milestone.status === 'APPROVED') {
      return res.status(400).json({ error: 'Milestone is already approved.' });
    }

    // Update milestone to approved
    const updatedMilestone = await prisma.gigMilestone.update({
      where: { id: mId },
      data: {
        status: 'APPROVED',
        updatedAt: new Date()
      }
    });

    // Escrow payout release: Create a transaction to reward the creator
    const amountInInr = Math.round(milestone.amount);
    await prisma.walletTransaction.create({
      data: {
        creatorId: gig.creatorId,
        amount: amountInInr,
        type: 'CAMPAIGN_PAYOUT',
        status: 'SUCCESS',
        description: `Escrow payout released for milestone: ${milestone.title}`,
        referenceId: `gig-ms-${mId}`
      }
    });

    // Check if all milestones are now approved
    const allMilestones = await prisma.gigMilestone.findMany({
      where: { gigId: id }
    });

    const allApproved = allMilestones.every(m => m.status === 'APPROVED');
    let updatedGig = gig;
    if (allApproved) {
      updatedGig = await prisma.campaignGig.update({
        where: { id },
        data: { status: 'COMPLETED' },
        include: { milestones: true }
      });
    }

    res.json({
      success: true,
      milestone: updatedMilestone,
      gigStatus: updatedGig.status
    });
  } catch (err) {
    console.error('[POST /api/gigs/:id/milestones/:mId/approve] Error:', err.message);
    res.status(500).json({ error: 'Failed to approve milestone.' });
  }
});

export default router;
