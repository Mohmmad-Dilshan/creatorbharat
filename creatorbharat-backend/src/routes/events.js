// 🇮🇳 CreatorBharat SaaS Events Router
import express from 'express';
import prisma from '../prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/events — Get upcoming events (published only, unless admin query parameter)
router.get('/', async (req, res) => {
  try {
    const { all } = req.query;
    
    const where = {};
    if (all !== 'true') {
      where.published = true;
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { date: 'asc' }
    });
    res.json(events);
  } catch (err) {
    console.error('[GET /api/events] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve events.' });
  }
});

// GET /api/events/:id — Get details of a single event
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id }
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }
    res.json(event);
  } catch (err) {
    console.error('[GET /api/events/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve event.' });
  }
});

// POST /api/events — Create an event (Admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin role required.' });
    }

    const { title, description, date, location, venue, type, coverImage, registrationUrl, eligibility, isFeatured, published } = req.body;
    if (!title || !description || !date || !location || !type) {
      return res.status(400).json({ error: 'title, description, date, location, and type are required.' });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        venue: venue || null,
        type,
        coverImage: coverImage || null,
        registrationUrl: registrationUrl || null,
        eligibility: eligibility || null,
        isFeatured: isFeatured ?? false,
        published: published ?? false
      }
    });

    res.status(201).json(event);
  } catch (err) {
    console.error('[POST /api/events] Error:', err.message);
    res.status(500).json({ error: 'Failed to create event.' });
  }
});

// PUT /api/events/:id — Edit an event (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin role required.' });
    }

    const { id } = req.params;
    const { title, description, date, location, venue, type, coverImage, registrationUrl, eligibility, isFeatured, published } = req.body;

    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    const updated = await prisma.event.update({
      where: { id },
      data: {
        title,
        description,
        date: date ? new Date(date) : undefined,
        location,
        venue,
        type,
        coverImage,
        registrationUrl,
        eligibility,
        isFeatured,
        published
      }
    });

    res.json(updated);
  } catch (err) {
    console.error('[PUT /api/events/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to update event.' });
  }
});

// DELETE /api/events/:id — Delete an event (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin role required.' });
    }

    const { id } = req.params;
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    await prisma.event.delete({ where: { id } });
    res.json({ success: true, message: 'Event deleted successfully.' });
  } catch (err) {
    console.error('[DELETE /api/events/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to delete event.' });
  }
});

export default router;
