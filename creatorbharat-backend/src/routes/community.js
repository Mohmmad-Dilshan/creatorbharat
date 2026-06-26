// 🇮🇳 CreatorBharat SaaS Community Router
import express from 'express';
import prisma from '../prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/community/posts — Get community feed posts
router.get('/posts', authMiddleware, async (req, res) => {
  try {
    const creator = await prisma.creator.findUnique({
      where: { userId: req.user.id }
    });

    const posts = await prisma.communityPost.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            handle: true,
            photo: true,
            isVerified: true
          }
        },
        likes: creator ? {
          where: { creatorId: creator.id },
          select: { id: true }
        } : false
      }
    });

    // Map posts to format response and include a boolean if current creator has liked it
    const formatted = posts.map(post => {
      const likedByMe = creator ? post.likes && post.likes.length > 0 : false;
      const { likes, ...postData } = post;
      return {
        ...postData,
        likedByMe
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error('[GET /api/community/posts] Error:', err.message);
    res.status(500).json({ error: 'Failed to load community feed.' });
  }
});

// POST /api/community/posts — Create a new community post (Creator only)
router.post('/posts', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'CREATOR') {
      return res.status(403).json({ error: 'Only creators can post to the community feed.' });
    }

    const { content, imageUrl } = req.body;
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Post content cannot be empty.' });
    }

    const creator = await prisma.creator.findUnique({
      where: { userId: req.user.id }
    });
    if (!creator) {
      return res.status(404).json({ error: 'Creator profile not found.' });
    }

    const post = await prisma.communityPost.create({
      data: {
        creatorId: creator.id,
        content: content.trim(),
        imageUrl: imageUrl || null
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            handle: true,
            photo: true,
            isVerified: true
          }
        }
      }
    });

    res.status(201).json({
      ...post,
      likedByMe: false
    });
  } catch (err) {
    console.error('[POST /api/community/posts] Error:', err.message);
    res.status(500).json({ error: 'Failed to create community post.' });
  }
});

// POST /api/community/posts/:id/like — Toggle post like (Creator only)
router.post('/posts/:id/like', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'CREATOR') {
      return res.status(403).json({ error: 'Only creators can like posts.' });
    }

    const { id } = req.params;
    
    const creator = await prisma.creator.findUnique({
      where: { userId: req.user.id }
    });
    if (!creator) {
      return res.status(404).json({ error: 'Creator profile not found.' });
    }

    const post = await prisma.communityPost.findUnique({
      where: { id }
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    // Check if already liked
    const existingLike = await prisma.communityPostLike.findUnique({
      where: {
        postId_creatorId: {
          postId: id,
          creatorId: creator.id
        }
      }
    });

    let likedByMe = false;
    let newLikesCount = post.likesCount;

    if (existingLike) {
      // Unlike
      await prisma.communityPostLike.delete({
        where: { id: existingLike.id }
      });
      newLikesCount = Math.max(0, post.likesCount - 1);
      await prisma.communityPost.update({
        where: { id },
        data: { likesCount: newLikesCount }
      });
      likedByMe = false;
    } else {
      // Like
      await prisma.communityPostLike.create({
        data: {
          postId: id,
          creatorId: creator.id
        }
      });
      newLikesCount = post.likesCount + 1;
      await prisma.communityPost.update({
        where: { id },
        data: { likesCount: newLikesCount }
      });
      likedByMe = true;

      // Trigger a notification to post author if it is not self
      if (post.creatorId !== creator.id) {
        try {
          const author = await prisma.creator.findUnique({ where: { id: post.creatorId } });
          if (author) {
            await prisma.notification.create({
              data: {
                userId: author.userId,
                title: '❤️ Community Post Liked',
                body: `${creator.name} liked your community post. Check it out!`,
                type: 'INFO',
                link: '/creator/community'
              }
            });
          }
        } catch (notifErr) {
          console.error('Failed to notify post author of like:', notifErr.message);
        }
      }
    }

    res.json({ success: true, likesCount: newLikesCount, likedByMe });
  } catch (err) {
    console.error('[POST /api/community/posts/:id/like] Error:', err.message);
    res.status(500).json({ error: 'Failed to process post like.' });
  }
});

export default router;
