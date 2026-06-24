// 🇮🇳 CreatorBharat SaaS Ecosystem Gallery Router
import express from 'express';
import prisma from '../prisma.js';
import { authMiddleware } from '../middleware/auth.js';
import { upload, uploadFileToCloud } from '../utils/uploader.js';

const router = express.Router();

// GET /api/gallery — get all public global gallery items
router.get('/', async (req, res) => {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch (err) {
    console.error('[GET /api/gallery] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve gallery items.' });
  }
});

// GET /api/gallery/creator/:creatorId — get gallery items of a specific creator
router.get('/creator/:creatorId', async (req, res) => {
  try {
    const { creatorId } = req.params;
    const items = await prisma.creatorGallery.findMany({
      where: { creatorId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch (err) {
    console.error('[GET /api/gallery/creator/:creatorId] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve creator gallery.' });
  }
});

// GET /api/gallery/me — get gallery items of the logged in creator
router.get('/me', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'CREATOR') {
      return res.status(403).json({ error: 'Access restricted to creators only.' });
    }
    const creator = await prisma.creator.findUnique({
      where: { userId: req.user.id }
    });
    if (!creator) {
      return res.status(404).json({ error: 'Creator profile not found.' });
    }
    const items = await prisma.creatorGallery.findMany({
      where: { creatorId: creator.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch (err) {
    console.error('[GET /api/gallery/me] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve your gallery.' });
  }
});

// POST /api/gallery — upload an image to the creator's gallery
router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (req.user.role !== 'CREATOR') {
      return res.status(403).json({ error: 'Access restricted to creators only.' });
    }
    const creator = await prisma.creator.findUnique({
      where: { userId: req.user.id }
    });
    if (!creator) {
      return res.status(404).json({ error: 'Creator profile not found.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file provided.' });
    }

    const { title, description } = req.body;

    const folder = `creatorbharat/creators/${creator.id}/gallery`;
    const fileUrl = await uploadFileToCloud(req.file.buffer, req.file.originalname, folder);

    // Resolve absolute URL
    const baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
    const absoluteUrl = fileUrl.startsWith('/') ? `${baseUrl}${fileUrl}` : fileUrl;

    const newItem = await prisma.creatorGallery.create({
      data: {
        creatorId: creator.id,
        imageUrl: absoluteUrl,
        title: title || null,
        description: description || null
      }
    });

    res.status(201).json({
      success: true,
      item: newItem
    });
  } catch (err) {
    console.error('[POST /api/gallery] Error:', err.message);
    res.status(500).json({ error: err.message || 'Gallery upload failed.' });
  }
});

// DELETE /api/gallery/:id — delete a gallery item
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'CREATOR') {
      return res.status(403).json({ error: 'Access restricted to creators only.' });
    }
    const creator = await prisma.creator.findUnique({
      where: { userId: req.user.id }
    });
    if (!creator) {
      return res.status(404).json({ error: 'Creator profile not found.' });
    }

    const item = await prisma.creatorGallery.findUnique({
      where: { id: req.params.id }
    });

    if (!item) {
      return res.status(404).json({ error: 'Gallery item not found.' });
    }

    if (item.creatorId !== creator.id) {
      return res.status(403).json({ error: 'Unauthorized to delete this item.' });
    }

    await prisma.creatorGallery.delete({
      where: { id: req.params.id }
    });

    res.json({ success: true, message: 'Gallery item deleted successfully.' });
  } catch (err) {
    console.error('[DELETE /api/gallery/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to delete gallery item.' });
  }
});

export default router;
