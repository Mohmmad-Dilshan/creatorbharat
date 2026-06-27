// 🇮🇳 CreatorBharat SaaS Missions Router
import express from 'express';
import prisma from '../prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/missions — List active missions and current creator's completion status
router.get('/', authMiddleware, async (req, res) => {
  try {
    const creator = await prisma.creator.findUnique({
      where: { userId: req.user.id }
    });

    const missions = await prisma.mission.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' }
    });

    let completions = [];
    if (creator) {
      completions = await prisma.missionCompletion.findMany({
        where: { creatorId: creator.id }
      });
    }

    const colors = { REFER: '#7C3AED', POST_SOCIAL: '#3B82F6', COMPLETE_PROFILE: '#10B981', APPLY_CAMPAIGN: '#FF9431' };
    const formatted = missions.map(mission => {
      const completion = completions.find(c => c.missionId === mission.id);
      return {
        ...mission,
        rewardColor: colors[mission.type] || '#FF9431',
        deadline: mission.expiresAt,
        status: completion ? completion.status : 'NOT_STARTED',
        proofUrl: completion ? completion.proofUrl : null,
        completionId: completion ? completion.id : null
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error('[GET /api/missions] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve missions.' });
  }
});

// POST /api/missions/:id/complete — Submit proof of mission completion (Creator only)
router.post('/:id/complete', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'CREATOR') {
      return res.status(403).json({ error: 'Missions are only for creators.' });
    }

    const { id } = req.params;
    const { proofUrl } = req.body;

    const creator = await prisma.creator.findUnique({
      where: { userId: req.user.id }
    });
    if (!creator) {
      return res.status(404).json({ error: 'Creator profile not found.' });
    }

    const mission = await prisma.mission.findUnique({
      where: { id }
    });
    if (!mission || !mission.active) {
      return res.status(404).json({ error: 'Active mission not found.' });
    }

    // Check if already completed/submitted
    const existing = await prisma.missionCompletion.findFirst({
      where: {
        missionId: id,
        creatorId: creator.id
      }
    });

    if (existing) {
      return res.status(400).json({
        error: `You have already submitted a completion request. Current status: ${existing.status}`
      });
    }

    const completion = await prisma.missionCompletion.create({
      data: {
        missionId: id,
        creatorId: creator.id,
        proofUrl: proofUrl || null,
        status: 'PENDING'
      }
    });

    // Notify admin or trigger notification
    try {
      await prisma.notification.create({
        data: {
          userId: creator.userId,
          title: '⏳ Mission Submitted for Review',
          body: `Your proof for the mission "${mission.title}" has been submitted. Verification is pending.`,
          type: 'INFO',
          link: '/creator/monetization'
        }
      });
    } catch (notifErr) {
      console.error('Failed to notify creator about mission submission:', notifErr.message);
    }

    res.status(201).json({ success: true, message: 'Mission proof submitted successfully!', completion });
  } catch (err) {
    console.error('[POST /api/missions/:id/complete] Error:', err.message);
    res.status(500).json({ error: 'Failed to submit mission proof.' });
  }
});

export default router;
