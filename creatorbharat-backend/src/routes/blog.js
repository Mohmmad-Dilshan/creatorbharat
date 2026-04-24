const router = require('express').Router();
const prisma = require('../prisma');

// GET /api/blog
router.get('/', async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/blog/:slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug: req.params.slug },
      include: { 
        comments: {
          where: { parentId: null },
          include: { replies: true }
        }
      }
    });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    // Increment views
    await prisma.blog.update({
      where: { id: blog.id },
      data: { views: { increment: 1 } }
    });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/blog/:id/comment
router.post('/:id/comment', async (req, res) => {
  try {
    const { name, email, text, parentId } = req.body;
    const comment = await prisma.comment.create({
      data: {
        blogId: req.params.id,
        name,
        email,
        text,
        parentId
      }
    });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
