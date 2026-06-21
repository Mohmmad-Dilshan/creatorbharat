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
      include: { user: true },
      orderBy: { updatedAt: 'desc' }
    });
    res.json(creators);
  } catch (err) {
    console.error('[GET /api/admin/verifications] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve verification queue.' });
  }
});

// GET /api/admin/brands — fetch all registered brands
router.get('/brands', async (req, res) => {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        user: true,
        _count: {
          select: { campaigns: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(brands);
  } catch (err) {
    console.error('[GET /api/admin/brands] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve brands.' });
  }
});

// GET /api/admin/payments — fetch all system payments
router.get('/payments', async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        creator: true,
        brand: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(payments);
  } catch (err) {
    console.error('[GET /api/admin/payments] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve payments.' });
  }
});

// POST /api/admin/users/suspend/:userId — toggle account suspension status
router.post('/users/suspend/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    if (user.role === 'ADMIN') {
      return res.status(400).json({ error: 'Cannot suspend administrators.' });
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { isSuspended: !user.isSuspended }
    });

    res.json({ message: `User account successfully ${updated.isSuspended ? 'suspended' : 'unsuspended'}.`, user: updated });
  } catch (err) {
    console.error('[POST /api/admin/users/suspend/:userId] Error:', err.message);
    res.status(500).json({ error: 'Failed to update user suspension status.' });
  }
});

// POST /api/admin/payments/override — manually release or refund escrow balances
router.post('/payments/override', async (req, res) => {
  try {
    const { paymentId, action } = req.body;
    if (!paymentId || !action) {
      return res.status(400).json({ error: 'Payment ID and override action are required.' });
    }

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId }
    });

    if (!payment) return res.status(404).json({ error: 'Escrow payment record not found.' });
    if (payment.type !== 'CAMPAIGN_ESCROW') {
      return res.status(400).json({ error: 'Overrides are only applicable to campaign escrows.' });
    }

    if (action === 'RELEASE') {
      await prisma.payment.update({
        where: { id: paymentId },
        data: { status: 'RELEASED' }
      });

      if (payment.campaignId && payment.recipientCreatorId) {
        await prisma.application.updateMany({
          where: {
            campaignId: payment.campaignId,
            creatorId: payment.recipientCreatorId
          },
          data: { status: 'COMPLETED' }
        });
      }

      res.json({ message: 'Escrow budget manually released to creator successfully.' });
    } else if (action === 'REFUND') {
      await prisma.payment.update({
        where: { id: paymentId },
        data: { status: 'REFUNDED' }
      });

      if (payment.campaignId && payment.recipientCreatorId) {
        await prisma.application.updateMany({
          where: {
            campaignId: payment.campaignId,
            creatorId: payment.recipientCreatorId
          },
          data: { status: 'REJECTED' }
        });
      }

      res.json({ message: 'Escrow budget manually refunded to brand successfully.' });
    } else {
      res.status(400).json({ error: 'Invalid override action.' });
    }
  } catch (err) {
    console.error('[POST /api/admin/payments/override] Error:', err.message);
    res.status(500).json({ error: 'Failed to execute escrow payment override.' });
  }
});

// DELETE /api/admin/campaigns/:campaignId — delete campaigns that violate T&C
router.delete('/campaigns/:campaignId', async (req, res) => {
  try {
    const { campaignId } = req.params;
    await prisma.campaign.delete({ where: { id: campaignId } });
    res.json({ message: 'Campaign deleted successfully by administrator.' });
  } catch (err) {
    console.error('[DELETE /api/admin/campaigns/:campaignId] Error:', err.message);
    res.status(500).json({ error: 'Failed to delete campaign.' });
  }
});

// GET /api/admin/stats — aggregate live dashboard counts and trends
router.get('/stats', async (req, res) => {
  try {
    const totalCreators = await prisma.creator.count();
    const totalBrands = await prisma.brand.count();
    const totalCampaigns = await prisma.campaign.count();
    const totalEscrows = await prisma.payment.aggregate({
      where: { status: 'PAID', type: 'CAMPAIGN_ESCROW' },
      _sum: { amount: true }
    });

    const payments = await prisma.payment.findMany({
      where: { status: { in: ['PAID', 'RELEASED'] } },
      select: { amount: true, createdAt: true }
    });

    const users = await prisma.user.findMany({
      select: { createdAt: true }
    });

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      last6Months.push({
        month: monthNames[d.getMonth()],
        year: d.getFullYear(),
        userCount: 0,
        escrowVolume: 0
      });
    }

    users.forEach(u => {
      const date = new Date(u.createdAt);
      const mName = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const match = last6Months.find(m => m.month === mName && m.year === year);
      if (match) match.userCount++;
    });

    payments.forEach(p => {
      const date = new Date(p.createdAt);
      const mName = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const match = last6Months.find(m => m.month === mName && m.year === year);
      if (match) match.escrowVolume += p.amount;
    });

    res.json({
      counts: {
        creators: totalCreators,
        brands: totalBrands,
        campaigns: totalCampaigns,
        escrowHoldings: totalEscrows._sum.amount || 0
      },
      chartData: last6Months
    });
  } catch (err) {
    console.error('[GET /api/admin/stats] Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch platform metrics.' });
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
