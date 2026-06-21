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

// PUT /api/admin/creators/:id — administrative update creator profile details
router.put('/creators/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, handle, bio, city, state, niche, platform, followers,
      engagementRate, rateMin, rateMax, photo, coverImage, status, isVerified, isPro,
      aadhaarUrl, panUrl
    } = req.body;

    if (handle) {
      const existing = await prisma.creator.findFirst({
        where: {
          handle: handle.toLowerCase().trim(),
          NOT: { id }
        }
      });
      if (existing) {
        return res.status(400).json({ error: 'This handle is already taken.' });
      }
    }

    const updated = await prisma.creator.update({
      where: { id },
      data: {
        name,
        handle: handle ? handle.toLowerCase().trim() : undefined,
        bio,
        city,
        state,
        niche: Array.isArray(niche) ? niche : undefined,
        platform: Array.isArray(platform) ? platform : undefined,
        followers: followers !== undefined ? parseInt(followers) : undefined,
        engagementRate: engagementRate !== undefined ? parseFloat(engagementRate) : undefined,
        rateMin: rateMin !== undefined ? parseInt(rateMin) : undefined,
        rateMax: rateMax !== undefined ? parseInt(rateMax) : undefined,
        photo,
        coverImage,
        status,
        isVerified: isVerified !== undefined ? isVerified : undefined,
        isPro: isPro !== undefined ? isPro : undefined,
        aadhaarUrl: aadhaarUrl !== undefined ? aadhaarUrl : undefined,
        panUrl: panUrl !== undefined ? panUrl : undefined
      }
    });

    res.json(updated);
  } catch (err) {
    console.error('[PUT /api/admin/creators/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to update creator profile.' });
  }
});

// PUT /api/admin/brands/:id — administrative update brand profile details
router.put('/brands/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { companyName, industry, website } = req.body;

    const updated = await prisma.brand.update({
      where: { id },
      data: {
        companyName,
        industry,
        website
      }
    });

    res.json(updated);
  } catch (err) {
    console.error('[PUT /api/admin/brands/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to update brand profile.' });
  }
});

// PUT /api/admin/campaigns/:id — administrative update campaign details
router.put('/campaigns/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, budget, platform, niche, status } = req.body;

    const updated = await prisma.campaign.update({
      where: { id },
      data: {
        title,
        description,
        budget: budget !== undefined ? parseInt(budget) : undefined,
        platform: Array.isArray(platform) ? platform : undefined,
        niche: Array.isArray(niche) ? niche : undefined,
        status
      }
    });

    res.json(updated);
  } catch (err) {
    console.error('[PUT /api/admin/campaigns/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to update campaign details.' });
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

// GET /api/admin/blogs — get all blog articles (published and drafts)
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        _count: { select: { comments: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(blogs);
  } catch (err) {
    console.error('[GET /api/admin/blogs] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve blog articles.' });
  }
});

// POST /api/admin/blogs — create new blog post
router.post('/blogs', async (req, res) => {
  try {
    const { title, slug, excerpt, body, category, author, image, tags, featured, published } = req.body;
    if (!title || !slug || !body || !category || !author) {
      return res.status(400).json({ error: 'Title, slug, body, category, and author are required.' });
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-_]/g, '-').trim();

    // Check unique slug
    const existing = await prisma.blog.findUnique({ where: { slug: cleanSlug } });
    if (existing) {
      return res.status(400).json({ error: 'A blog post with this URL slug already exists.' });
    }

    const blog = await prisma.blog.create({
      data: {
        title: title.trim(),
        slug: cleanSlug,
        excerpt: (excerpt || '').trim(),
        body: body.trim(),
        category: category.trim(),
        author: author.trim(),
        image: image || null,
        tags: Array.isArray(tags) ? tags : [],
        featured: !!featured,
        published: !!published
      }
    });

    res.status(201).json(blog);
  } catch (err) {
    console.error('[POST /api/admin/blogs] Error:', err.message);
    res.status(500).json({ error: 'Failed to create blog post.' });
  }
});

// PUT /api/admin/blogs/:id — edit blog post
router.put('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, excerpt, body, category, author, image, tags, featured, published } = req.body;

    const existingBlog = await prisma.blog.findUnique({ where: { id } });
    if (!existingBlog) return res.status(404).json({ error: 'Blog post not found.' });

    let cleanSlug = existingBlog.slug;
    if (slug && slug !== existingBlog.slug) {
      cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-_]/g, '-').trim();
      const duplicate = await prisma.blog.findUnique({ where: { slug: cleanSlug } });
      if (duplicate) return res.status(400).json({ error: 'A blog post with this URL slug already exists.' });
    }

    const updated = await prisma.blog.update({
      where: { id },
      data: {
        title: title !== undefined ? title.trim() : existingBlog.title,
        slug: cleanSlug,
        excerpt: excerpt !== undefined ? excerpt.trim() : existingBlog.excerpt,
        body: body !== undefined ? body.trim() : existingBlog.body,
        category: category !== undefined ? category.trim() : existingBlog.category,
        author: author !== undefined ? author.trim() : existingBlog.author,
        image: image !== undefined ? image : existingBlog.image,
        tags: tags !== undefined ? (Array.isArray(tags) ? tags : []) : existingBlog.tags,
        featured: featured !== undefined ? !!featured : existingBlog.featured,
        published: published !== undefined ? !!published : existingBlog.published
      }
    });

    res.json(updated);
  } catch (err) {
    console.error('[PUT /api/admin/blogs/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to update blog post.' });
  }
});

// DELETE /api/admin/blogs/:id — delete blog post
router.delete('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.blog.delete({ where: { id } });
    res.json({ message: 'Blog article and its comments deleted successfully.' });
  } catch (err) {
    console.error('[DELETE /api/admin/blogs/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to delete blog article.' });
  }
});

// GET /api/admin/newsletters — list newsletter subscribers
router.get('/newsletters', async (req, res) => {
  try {
    const subscribers = await prisma.newsletter.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(subscribers);
  } catch (err) {
    console.error('[GET /api/admin/newsletters] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve newsletter subscribers.' });
  }
});

// DELETE /api/admin/newsletters/:id — delete subscriber
router.delete('/newsletters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.newsletter.delete({ where: { id } });
    res.json({ message: 'Newsletter subscriber removed successfully.' });
  } catch (err) {
    console.error('[DELETE /api/admin/newsletters/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to remove subscriber.' });
  }
});

// GET /api/admin/contacts — list contact messages
router.get('/contacts', async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(messages);
  } catch (err) {
    console.error('[GET /api/admin/contacts] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve contact messages.' });
  }
});

// PUT /api/admin/contacts/:id/read — mark contact message as read
router.put('/contacts/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    const msg = await prisma.contactMessage.findUnique({ where: { id } });
    if (!msg) return res.status(404).json({ error: 'Contact message not found.' });

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { read: !msg.read }
    });
    res.json(updated);
  } catch (err) {
    console.error('[PUT /api/admin/contacts/:id/read] Error:', err.message);
    res.status(500).json({ error: 'Failed to update message status.' });
  }
});

// DELETE /api/admin/contacts/:id — delete contact message
router.delete('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.contactMessage.delete({ where: { id } });
    res.json({ message: 'Contact message deleted successfully.' });
  } catch (err) {
    console.error('[DELETE /api/admin/contacts/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to delete contact message.' });
  }
});

// GET /api/admin/podcasts — get all podcasts
router.get('/podcasts', async (req, res) => {
  try {
    const podcasts = await prisma.podcast.findMany({
      include: {
        creator: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(podcasts);
  } catch (err) {
    console.error('[GET /api/admin/podcasts] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve podcasts.' });
  }
});

// POST /api/admin/podcasts/toggle/:id — toggle podcast published status
router.post('/podcasts/toggle/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const podcast = await prisma.podcast.findUnique({ where: { id } });
    if (!podcast) return res.status(404).json({ error: 'Podcast episode not found.' });

    const updated = await prisma.podcast.update({
      where: { id },
      data: { published: !podcast.published }
    });

    res.json({ message: `Podcast successfully ${updated.published ? 'published' : 'unpublished'}.`, podcast: updated });
  } catch (err) {
    console.error('[POST /api/admin/podcasts/toggle/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to update podcast status.' });
  }
});

// DELETE /api/admin/podcasts/:id — delete podcast
router.delete('/podcasts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.podcast.delete({ where: { id } });
    res.json({ message: 'Podcast episode deleted successfully.' });
  } catch (err) {
    console.error('[DELETE /api/admin/podcasts/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to delete podcast episode.' });
  }
});

// POST /api/admin/podcasts — create new podcast
router.post('/podcasts', async (req, res) => {
  try {
    const { creatorId, title, description, duration, thumbnail, audioUrl, videoUrl, published } = req.body;
    if (!creatorId || !title || !duration) {
      return res.status(400).json({ error: 'Creator ID, Title, and Duration are required.' });
    }

    const creator = await prisma.creator.findUnique({ where: { id: creatorId } });
    if (!creator) return res.status(404).json({ error: 'Creator not found.' });

    const podcast = await prisma.podcast.create({
      data: {
        creatorId,
        title,
        description: description || null,
        duration,
        thumbnail: thumbnail || null,
        audioUrl: audioUrl || null,
        videoUrl: videoUrl || null,
        published: published ?? false
      },
      include: { creator: true }
    });

    res.status(201).json({ message: 'Podcast episode created successfully.', podcast });
  } catch (err) {
    console.error('[POST /api/admin/podcasts] Error:', err.message);
    res.status(500).json({ error: 'Failed to create podcast episode.' });
  }
});

// PUT /api/admin/podcasts/:id — update existing podcast
router.put('/podcasts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { creatorId, title, description, duration, thumbnail, audioUrl, videoUrl, published } = req.body;

    const existing = await prisma.podcast.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Podcast episode not found.' });

    if (creatorId) {
      const creator = await prisma.creator.findUnique({ where: { id: creatorId } });
      if (!creator) return res.status(404).json({ error: 'Creator not found.' });
    }

    const updated = await prisma.podcast.update({
      where: { id },
      data: {
        creatorId: creatorId || undefined,
        title: title || undefined,
        description: description !== undefined ? description : undefined,
        duration: duration || undefined,
        thumbnail: thumbnail !== undefined ? thumbnail : undefined,
        audioUrl: audioUrl !== undefined ? audioUrl : undefined,
        videoUrl: videoUrl !== undefined ? videoUrl : undefined,
        published: published !== undefined ? published : undefined
      },
      include: { creator: true }
    });

    res.json({ message: 'Podcast episode updated successfully.', podcast: updated });
  } catch (err) {
    console.error('[PUT /api/admin/podcasts/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to update podcast episode.' });
  }
});

// GET /api/admin/reviews — fetch all reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        creator: true,
        brand: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(reviews);
  } catch (err) {
    console.error('[GET /api/admin/reviews] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve reviews.' });
  }
});

// DELETE /api/admin/reviews/:id — delete/moderate a review
router.delete('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.review.delete({ where: { id } });
    res.json({ message: 'Review deleted successfully.' });
  } catch (err) {
    console.error('[DELETE /api/admin/reviews/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to delete review.' });
  }
});

// POST /api/admin/verify/reject/:creatorId — reject creator verification and clear document uploads
router.post('/verify/reject/:creatorId', async (req, res) => {
  try {
    const { creatorId } = req.params;
    const { reason } = req.body;

    const creator = await prisma.creator.findUnique({
      where: { id: creatorId },
      include: { user: true }
    });

    if (!creator) {
      return res.status(404).json({ error: 'Creator profile not found.' });
    }

    const updated = await prisma.creator.update({
      where: { id: creatorId },
      data: {
        isVerified: false,
        status: 'REJECTED',
        aadhaarUrl: null,
        panUrl: null
      }
    });

    res.json({ message: 'Creator verification rejected and documents reset.', creator: updated });

    // Send email notification (non-blocking)
    if (creator.user?.email) {
      sendEmail({
        to: creator.user.email,
        subject: 'Action Required: Verification Documents Rejected ⚠️',
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #0f172a; max-width: 600px; margin: auto; border: 1px solid #f1f5f9; border-radius: 12px;">
            <h2 style="color: #ef4444;">Verification Update, ${creator.name}</h2>
            <p>During our administrative audit, we encountered issues with your uploaded identity verification documents.</p>
            <div style="background: #fffbeb; border: 1px solid #fef3c7; color: #b45309; padding: 16px; border-radius: 8px; margin: 20px 0; font-weight: 500;">
              <strong>Rejection Reason:</strong><br/>
              ${reason || 'Uploaded documents are blurry, expired, or names do not match.'}
            </div>
            <p>To fix this, we have reset your verification portal. Please log back in to your dashboard and re-upload clear, valid documents:</p>
            <p style="margin-top: 24px;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/creator/verification" style="background: #ef4444; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Upload Documents Again
              </a>
            </p>
            <p style="margin-top: 28px; font-size: 12px; color: #94a3b8;">Best regards,<br/>Team CreatorBharat</p>
          </div>
        `
      }).catch(err => console.error('Verification rejection email warning:', err.message));
    }
  } catch (err) {
    console.error('[POST /api/admin/verify/reject/:creatorId] Error:', err.message);
    res.status(500).json({ error: 'Failed to reject creator verification.' });
  }
});

// GET /api/admin/campaigns/:campaignId/applications — fetch applications for a campaign
router.get('/campaigns/:campaignId/applications', async (req, res) => {
  try {
    const { campaignId } = req.params;
    const applications = await prisma.application.findMany({
      where: { campaignId },
      include: {
        creator: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(applications);
  } catch (err) {
    console.error('[GET /api/admin/campaigns/:campaignId/applications] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve campaign applications.' });
  }
});

// GET /api/admin/comments — fetch all blog comments
router.get('/comments', async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        blog: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(comments);
  } catch (err) {
    console.error('[GET /api/admin/comments] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve blog comments.' });
  }
});

// DELETE /api/admin/comments/:id — delete a blog comment
router.delete('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.comment.delete({ where: { id } });
    res.json({ message: 'Comment deleted successfully.' });
  } catch (err) {
    console.error('[DELETE /api/admin/comments/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to delete comment.' });
  }
});

// POST /api/admin/applications/:id/status — moderate/change campaign pitch status
router.post('/applications/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // PENDING, ACCEPTED, REJECTED, COMPLETED

    if (!status) {
      return res.status(400).json({ error: 'Status is required.' });
    }

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        creator: { include: { user: true } },
        campaign: { include: { brand: { include: { user: true } } } }
      }
    });

    if (!application) {
      return res.status(404).json({ error: 'Application pitch not found.' });
    }

    const updated = await prisma.application.update({
      where: { id },
      data: { status }
    });

    res.json({ message: 'Pitch application status updated successfully.', application: updated });

    // Optional: send email to creator about pitch status update (non-blocking)
    if (application.creator?.user?.email) {
      sendEmail({
        to: application.creator.user.email,
        subject: `Pitch Status Update: ${application.campaign.title} 📣`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #0f172a; max-width: 600px; margin: auto; border: 1px solid #f1f5f9; border-radius: 12px;">
            <h2 style="color: #FF9431;">Pitch Update! 📣</h2>
            <p>Your pitch for the campaign "<strong>${application.campaign.title}</strong>" has been marked as <strong>${status}</strong> by administration moderation.</p>
            <p style="margin-top: 24px;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/creator/dashboard" style="background: #FF9431; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Go to Dashboard
              </a>
            </p>
            <p style="margin-top: 28px; font-size: 12px; color: #94a3b8;">Best regards,<br/>Team CreatorBharat</p>
          </div>
        `
      }).catch(err => console.error('Application status update email warning:', err.message));
    }
  } catch (err) {
    console.error('[POST /api/admin/applications/:id/status] Error:', err.message);
    res.status(500).json({ error: 'Failed to update application status.' });
  }
});

// GET /api/admin/creators/full — all creators with enriched data (wallet, score, achievements)
router.get('/creators/full', async (req, res) => {
  try {
    const creators = await prisma.creator.findMany({
      include: {
        user: true,
        _count: {
          select: {
            applications: true,
            reviews: true,
            podcasts: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(creators);
  } catch (err) {
    console.error('[GET /api/admin/creators/full] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve full creator data.' });
  }
});

// GET /api/admin/creators/:id/transactions — creator wallet transaction history
router.get('/creators/:id/transactions', async (req, res) => {
  try {
    const { id } = req.params;
    const payments = await prisma.payment.findMany({
      where: {
        OR: [
          { recipientCreatorId: id },
          { creatorId: id }
        ]
      },
      include: {
        brand: true,
        campaign: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(payments);
  } catch (err) {
    console.error('[GET /api/admin/creators/:id/transactions] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve creator transactions.' });
  }
});

// POST /api/admin/creators/:id/score — manually adjust creator score
router.post('/creators/:id/score', async (req, res) => {
  try {
    const { id } = req.params;
    const { score, reason } = req.body;

    if (score === undefined || score === null) {
      return res.status(400).json({ error: 'Score value is required.' });
    }

    const creator = await prisma.creator.findUnique({ where: { id }, include: { user: true } });
    if (!creator) return res.status(404).json({ error: 'Creator not found.' });

    const updated = await prisma.creator.update({
      where: { id },
      data: { score: Number(score) }
    });

    res.json({ message: `Creator score updated to ${score}. Reason: ${reason || 'Admin override'}`, creator: updated });

    // Notify creator via email (non-blocking)
    if (creator.user?.email) {
      sendEmail({
        to: creator.user.email,
        subject: 'Your CreatorBharat Score Has Been Updated 🎯',
        html: `<div style="font-family:sans-serif;padding:20px;max-width:600px;margin:auto">
          <h2 style="color:#FF9431">Score Update! 🎯</h2>
          <p>Hi ${creator.name}, your CreatorBharat platform score has been updated to <strong>${score}</strong>.</p>
          ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
          <p style="margin-top:24px"><a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/creator/score" style="background:#FF9431;color:#fff;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block">View Your Score</a></p>
        </div>`
      }).catch(err => console.error('Score update email error:', err.message));
    }
  } catch (err) {
    console.error('[POST /api/admin/creators/:id/score] Error:', err.message);
    res.status(500).json({ error: 'Failed to update creator score.' });
  }
});

// GET /api/admin/leaderboard — get leaderboard entries with management controls
router.get('/leaderboard', async (req, res) => {
  try {
    const creators = await prisma.creator.findMany({
      where: { isVerified: true },
      include: {
        user: true,
        _count: { select: { applications: true, reviews: true } }
      },
      orderBy: [
        { score: 'desc' },
        { followers: 'desc' }
      ],
      take: 100
    });
    res.json(creators);
  } catch (err) {
    console.error('[GET /api/admin/leaderboard] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve leaderboard.' });
  }
});

// GET /api/admin/applications — fetch ALL campaign applications across platform
router.get('/applications', async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      include: {
        creator: { include: { user: true } },
        campaign: { include: { brand: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(applications);
  } catch (err) {
    console.error('[GET /api/admin/applications] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve all applications.' });
  }
});

// GET /api/admin/brand-analytics — brand performance dashboard
router.get('/brand-analytics', async (req, res) => {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        user: true,
        _count: {
          select: { campaigns: true }
        },
        campaigns: {
          include: {
            _count: { select: { applications: true } },
            payments: { where: { type: 'CAMPAIGN_ESCROW' } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const brandAnalytics = brands.map(b => {
      const totalBudget = b.campaigns.reduce((sum, c) => {
        return sum + c.payments.reduce((s, p) => s + (p.amount || 0), 0);
      }, 0);
      const totalApplications = b.campaigns.reduce((sum, c) => sum + (c._count?.applications || 0), 0);
      return {
        id: b.id,
        companyName: b.companyName,
        industry: b.industry,
        email: b.user?.email,
        isSuspended: b.user?.isSuspended,
        createdAt: b.createdAt,
        totalCampaigns: b._count.campaigns,
        totalApplications,
        totalBudgetSpent: totalBudget
      };
    });

    res.json(brandAnalytics);
  } catch (err) {
    console.error('[GET /api/admin/brand-analytics] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve brand analytics.' });
  }
});

// GET /api/admin/platform/activity — admin activity log
router.get('/platform/activity', async (req, res) => {
  try {
    // Aggregate recent activity from multiple tables
    const [recentUsers, recentVerifications, recentPayments, recentCampaigns, recentBlogs] = await Promise.all([
      prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 10, select: { id: true, email: true, role: true, createdAt: true } }),
      prisma.creator.findMany({ where: { isVerified: true }, orderBy: { updatedAt: 'desc' }, take: 10, select: { id: true, name: true, isVerified: true, updatedAt: true } }),
      prisma.payment.findMany({ orderBy: { createdAt: 'desc' }, take: 10, include: { brand: { select: { companyName: true } } } }),
      prisma.campaign.findMany({ orderBy: { createdAt: 'desc' }, take: 10, select: { id: true, title: true, status: true, createdAt: true } }),
      prisma.blog.findMany({ orderBy: { createdAt: 'desc' }, take: 5, select: { id: true, title: true, published: true, createdAt: true } })
    ]);

    const activity = [
      ...recentUsers.map(u => ({ type: 'NEW_USER', label: `New ${u.role} registered: ${u.email}`, time: u.createdAt })),
      ...recentVerifications.map(v => ({ type: 'VERIFIED', label: `Creator verified: ${v.name}`, time: v.updatedAt })),
      ...recentPayments.map(p => ({ type: 'PAYMENT', label: `Payment ${p.status}: ₹${p.amount} — ${p.brand?.companyName || 'Unknown Brand'}`, time: p.createdAt })),
      ...recentCampaigns.map(c => ({ type: 'CAMPAIGN', label: `Campaign posted: ${c.title}`, time: c.createdAt })),
      ...recentBlogs.map(b => ({ type: 'BLOG', label: `Blog ${b.published ? 'published' : 'drafted'}: ${b.title}`, time: b.createdAt }))
    ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 40);

    res.json(activity);
  } catch (err) {
    console.error('[GET /api/admin/platform/activity] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve platform activity.' });
  }
});

// GET /api/admin/platform/stats/deep — extended platform stats
router.get('/platform/stats/deep', async (req, res) => {
  try {
    const [
      totalCreators,
      verifiedCreators,
      totalBrands,
      totalCampaigns,
      activeCampaigns,
      totalApplications,
      acceptedApplications,
      totalBlogs,
      publishedBlogs,
      totalSubscribers,
      unreadContacts,
      totalReviews,
      pendingVerifications,
      totalGallery
    ] = await Promise.all([
      prisma.creator.count(),
      prisma.creator.count({ where: { isVerified: true } }),
      prisma.brand.count(),
      prisma.campaign.count(),
      prisma.campaign.count({ where: { status: 'ACTIVE' } }),
      prisma.application.count(),
      prisma.application.count({ where: { status: 'ACCEPTED' } }),
      prisma.blog.count(),
      prisma.blog.count({ where: { published: true } }),
      prisma.newsletter.count(),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.review.count(),
      prisma.creator.count({ where: { isVerified: false } }),
      prisma.galleryItem.count()
    ]);

    const escrowTotal = await prisma.payment.aggregate({
      where: { type: 'CAMPAIGN_ESCROW', status: 'PAID' },
      _sum: { amount: true }
    });

    res.json({
      creators: { total: totalCreators, verified: verifiedCreators, pending: pendingVerifications },
      brands: { total: totalBrands },
      campaigns: { total: totalCampaigns, active: activeCampaigns },
      applications: { total: totalApplications, accepted: acceptedApplications },
      content: { blogs: totalBlogs, published: publishedBlogs, gallery: totalGallery },
      marketing: { subscribers: totalSubscribers, unreadContacts },
      reviews: { total: totalReviews },
      finance: { escrowHeld: escrowTotal._sum.amount || 0 }
    });
  } catch (err) {
    console.error('[GET /api/admin/platform/stats/deep] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve deep platform stats.' });
  }
});

// GET /api/admin/gallery — fetch all gallery items
router.get('/gallery', async (req, res) => {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch (err) {
    console.error('[GET /api/admin/gallery] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve gallery items.' });
  }
});

// POST /api/admin/gallery — create gallery item
router.post('/gallery', async (req, res) => {
  try {
    const { title, description, category, type, date, location, thumbnail, videoUrl, duration, tags } = req.body;
    if (!title || !category || !type || !thumbnail) {
      return res.status(400).json({ error: 'Title, Category, Type, and Thumbnail are required.' });
    }

    const item = await prisma.galleryItem.create({
      data: {
        title,
        description: description || '',
        category,
        type,
        date: date || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        location: location || '',
        thumbnail,
        videoUrl: videoUrl || null,
        duration: duration || null,
        tags: Array.isArray(tags) ? tags : []
      }
    });

    res.status(201).json(item);
  } catch (err) {
    console.error('[POST /api/admin/gallery] Error:', err.message);
    res.status(500).json({ error: 'Failed to create gallery item.' });
  }
});

// PUT /api/admin/gallery/:id — update gallery item
router.put('/gallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, type, date, location, thumbnail, videoUrl, duration, tags } = req.body;

    const existing = await prisma.galleryItem.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Gallery item not found.' });

    const updated = await prisma.galleryItem.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existing.title,
        description: description !== undefined ? description : existing.description,
        category: category !== undefined ? category : existing.category,
        type: type !== undefined ? type : existing.type,
        date: date !== undefined ? date : existing.date,
        location: location !== undefined ? location : existing.location,
        thumbnail: thumbnail !== undefined ? thumbnail : existing.thumbnail,
        videoUrl: videoUrl !== undefined ? videoUrl : existing.videoUrl,
        duration: duration !== undefined ? duration : existing.duration,
        tags: Array.isArray(tags) ? tags : existing.tags
      }
    });

    res.json(updated);
  } catch (err) {
    console.error('[PUT /api/admin/gallery/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to update gallery item.' });
  }
});

// DELETE /api/admin/gallery/:id — delete gallery item
router.delete('/gallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.galleryItem.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Gallery item not found.' });

    await prisma.galleryItem.delete({ where: { id } });
    res.json({ message: 'Gallery item successfully deleted.' });
  } catch (err) {
    console.error('[DELETE /api/admin/gallery/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to delete gallery item.' });
  }
});

export default router;

