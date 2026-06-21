// 🇮🇳 CreatorBharat SaaS Admin Router
import express from 'express';
import prisma from '../prisma.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import { sendEmail } from '../utils/mailer.js';

const router = express.Router();

// Apply auth middleware and requireRole ADMIN to all routes inside this router
router.use(authMiddleware);
router.use(requireRole(['ADMIN']));

// GET /api/admin/verifications — fetch pending verification requests
router.get('/verifications', async (req, res) => {
  try {
    const creators = await prisma.creator.findMany({
      where: { isVerified: false },
      orderBy: { updatedAt: 'desc' }
    });
    res.json(creators);
  } catch (err) {
    console.error('[GET /api/admin/verifications] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve verification queue.' });
  }
});

// POST /api/admin/verify/:creatorId — approve user profile verification
router.post('/verify/:creatorId', async (req, res) => {
  try {
    const { creatorId } = req.params;

    const creator = await prisma.creator.findUnique({
      where: { id: creatorId },
      include: { user: true }
    });

    if (!creator) {
      return res.status(404).json({ error: 'Creator profile not found.' });
    }

    const updated = await prisma.creator.update({
      where: { id: creatorId },
      data: { isVerified: true }
    });

    res.json({ message: 'Creator profile successfully verified.', creator: updated });

    // Send verification approval email (non-blocking)
    if (creator.user?.email) {
      sendEmail({
        to: creator.user.email,
        subject: 'Profile Verified - Welcome to CreatorBharat Elite! 🎖️',
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #0f172a; max-width: 600px; margin: auto; border: 1px solid #f1f5f9; border-radius: 12px;">
            <h2 style="color: #FF9431;">Congratulations, ${creator.name}! 🎉</h2>
            <p>Your CreatorBharat profile verification is complete. You have been awarded the official <strong>Elite Badge</strong>.</p>
            <p>Here is what this means for your profile:</p>
            <ul style="line-height: 1.6;">
              <li><strong>Verified Badge:</strong> A checkmark badge is now visible next to your handle to build instant trust with brands.</li>
              <li><strong>Top Placement:</strong> Verified creators are prioritized in search results and campaign matchmaking filters.</li>
              <li><strong>Direct Collabs:</strong> Premium brands can now message you directly and send contract offers.</li>
            </ul>
            <p style="margin-top: 24px;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/creator/dashboard" style="background: #FF9431; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Go to Creator Dashboard
              </a>
            </p>
            <p style="margin-top: 28px; font-size: 12px; color: #94a3b8;">Best regards,<br/>Team CreatorBharat</p>
          </div>
        `
      }).catch(err => console.error('Verification approval email warning:', err.message));
    }
  } catch (err) {
    console.error('[POST /api/admin/verify/:creatorId] Error:', err.message);
    res.status(500).json({ error: 'Failed to verify creator profile.' });
  }
});

export default router;
