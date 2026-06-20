// 🇮🇳 CreatorBharat SaaS Blogs Router
import express from 'express';
import prisma from '../prisma.js';

const router = express.Router();

// GET /api/blog — list all published articles
router.get('/', async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(blogs);
  } catch (err) {
    console.error('[GET /api/blog] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve blog articles.' });
  }
});

// GET /api/blog/:slug — fetch single blog detail with comments
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: {
        comments: {
          where: { parentId: null },
          include: { replies: true }
        }
      }
    });

    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    // Increment views asynchronously
    await prisma.blog.update({
      where: { id: blog.id },
      data: { views: { increment: 1 } }
    });

    res.json(blog);
  } catch (err) {
    console.error('[GET /api/blog/:slug] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve blog detail.' });
  }
});

// POST /api/blog/:id/comment — post comments on blog
router.post('/:id/comment', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, text, parentId } = req.body;

    if (!name || !text) {
      return res.status(400).json({ error: 'Name and comment message are required.' });
    }

    const comment = await prisma.comment.create({
      data: {
        blogId: id,
        name,
        email: email || null,
        text,
        parentId: parentId || null
      }
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error('[POST /api/blog/:id/comment] Error:', err.message);
    res.status(500).json({ error: 'Failed to publish comment.' });
  }
});

export default router;
