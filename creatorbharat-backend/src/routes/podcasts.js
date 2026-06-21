// 🇮🇳 CreatorBharat SaaS Public Podcasts Router
import express from 'express';
import prisma from '../prisma.js';

const router = express.Router();

// GET /api/podcasts — retrieve published podcasts
router.get('/', async (req, res) => {
  try {
    const { creatorId } = req.query;

    const where = { published: true };
    if (creatorId) {
      where.creatorId = creatorId;
    }

    const podcasts = await prisma.podcast.findMany({
      where,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            handle: true,
            photo: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(podcasts);
  } catch (err) {
    console.error('[GET /api/podcasts] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve podcasts.' });
  }
});

// GET /api/podcasts/:id — retrieve single podcast
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const podcast = await prisma.podcast.findFirst({
      where: { id, published: true },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            handle: true,
            photo: true
          }
        }
      }
    });

    if (!podcast) {
      return res.status(404).json({ error: 'Podcast episode not found or is currently private.' });
    }

    res.json(podcast);
  } catch (err) {
    console.error('[GET /api/podcasts/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve podcast details.' });
  }
});

export default router;
