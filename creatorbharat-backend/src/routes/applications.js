// 🇮🇳 CreatorBharat SaaS Applications Router
import express from 'express';
import prisma from '../prisma.js';
import { authMiddleware } from '../middleware/auth.js';
import { sendEmail } from '../utils/mailer.js';

const router = express.Router();

router.use(authMiddleware);

// POST /api/applications — submit pitch to campaign
router.post('/', async (req, res) => {
  try {
    if (req.user.role !== 'CREATOR') {
      return res.status(403).json({ error: 'Access restricted to creators only.' });
    }

    const { campaignId, message, proposedRate } = req.body;

    if (!campaignId) {
      return res.status(400).json({ error: 'Campaign ID is required.' });
    }

    const creator = await prisma.creator.findUnique({
      where: { userId: req.user.id }
    });

    if (!creator) {
      return res.status(404).json({ error: 'Creator profile details not found.' });
    }

    const existing = await prisma.application.findUnique({
      where: {
        campaignId_creatorId: {
          campaignId,
          creatorId: creator.id
        }
      }
    });

    if (existing) {
      return res.status(400).json({ error: 'You have already applied to this campaign.' });
    }

    const application = await prisma.application.create({
      data: {
        campaignId,
        creatorId: creator.id,
        pitch: message,
        status: 'PENDING'
      }
    });

    res.status(201).json(application);

    // Look up brand details for email alert
    (async () => {
      try {
        const campaignDetail = await prisma.campaign.findUnique({
          where: { id: campaignId },
          include: {
            brand: {
              include: {
                user: true
              }
            }
          }
        });

        if (campaignDetail?.brand?.user?.email) {
          await sendEmail({
            to: campaignDetail.brand.user.email,
            subject: `New Pitch Received: ${campaignDetail.title}`,
            html: `
              <div style="font-family: sans-serif; padding: 20px; color: #0f172a; max-width: 600px; margin: auto; border: 1px solid #f1f5f9; border-radius: 12px;">
                <h2 style="color: #FF9431;">New Pitch Received! 🚀</h2>
                <p>A creator has pitched to your campaign: <strong>${campaignDetail.title}</strong>.</p>
                <p><strong>Creator Name:</strong> ${creator.name}</p>
                <p><strong>Pitch Message:</strong> "${message}"</p>
                <p style="margin-top: 24px;">
                  <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/brand/applications" style="background: #FF9431; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    Review Applications
                  </a>
                </p>
                <p style="margin-top: 28px; font-size: 12px; color: #94a3b8;">Best regards,<br/>Team CreatorBharat</p>
              </div>
            `
          });
        }
      } catch (err) {
        console.error('Pitch email notification warning:', err.message);
      }
    })();
  } catch (err) {
    console.error('[POST /api/applications] Error:', err.message);
    res.status(500).json({ error: 'Failed to submit application.' });
  }
});

// GET /api/applications/me — fetch active applications for logged-in user
router.get('/me', async (req, res) => {
  try {
    if (req.user.role === 'CREATOR') {
      const creator = await prisma.creator.findUnique({
        where: { userId: req.user.id }
      });
      if (!creator) return res.status(404).json({ error: 'Creator details not found.' });

      const apps = await prisma.application.findMany({
        where: { creatorId: creator.id },
        include: { campaign: true }
      });
      res.json(apps);
    } else if (req.user.role === 'BRAND') {
      const brand = await prisma.brand.findUnique({
        where: { userId: req.user.id }
      });
      if (!brand) return res.status(404).json({ error: 'Brand details not found.' });

      const apps = await prisma.application.findMany({
        where: {
          campaign: { brandId: brand.id }
        },
        include: {
          creator: true,
          campaign: true
        }
      });
      res.json(apps);
    } else {
      res.status(403).json({ error: 'Unauthorized role access.' });
    }
  } catch (err) {
    console.error('[GET /api/applications/me] Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch user applications.' });
  }
});

// PUT /api/applications/:id — update application status (SHORTLISTED, REJECTED, etc.)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required.' });
    }

    const isBrand = req.user.role === 'BRAND';
    if (!isBrand) {
      return res.status(403).json({ error: 'Only brands can update application statuses.' });
    }

    const brand = await prisma.brand.findUnique({ where: { userId: req.user.id } });
    if (!brand) return res.status(404).json({ error: 'Brand profile details not found.' });

    // Find the application and verify it belongs to one of this brand's campaigns
    const application = await prisma.application.findUnique({
      where: { id },
      include: { campaign: true }
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found.' });
    }

    if (application.campaign.brandId !== brand.id) {
      return res.status(403).json({ error: 'Unauthorized to modify this application.' });
    }

    const updated = await prisma.application.update({
      where: { id },
      data: { status }
    });

    res.json(updated);
  } catch (err) {
    console.error('[PUT /api/applications/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to update application status.' });
  }
});

export default router;
