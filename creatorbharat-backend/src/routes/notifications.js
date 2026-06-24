// 🔔 CreatorBharat SaaS — Notifications Router
import express from 'express';
import prisma from '../prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// ─────────────────────────────────────────────────
// GET /api/notifications — get logged-in user's notifications
// ─────────────────────────────────────────────────
router.get('/', authMiddleware, async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    const unreadCount = notifications.filter(n => !n.isRead).length;

    res.json({ notifications, unreadCount });
  } catch (err) {
    console.error('[GET /api/notifications] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve notifications.' });
  }
});

// ─────────────────────────────────────────────────
// PUT /api/notifications/:id/read — mark single notification as read
// ─────────────────────────────────────────────────
router.put('/:id/read', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await prisma.notification.findUnique({ where: { id } });
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found.' });
    }
    if (notification.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized.' });
    }

    await prisma.notification.update({
      where: { id },
      data: { isRead: true }
    });

    res.json({ message: 'Notification marked as read.' });
  } catch (err) {
    console.error('[PUT /api/notifications/:id/read] Error:', err.message);
    res.status(500).json({ error: 'Failed to mark notification.' });
  }
});

// ─────────────────────────────────────────────────
// PUT /api/notifications/read-all — mark all notifications as read
// ─────────────────────────────────────────────────
router.put('/read-all', authMiddleware, async (req, res) => {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.user.id, isRead: false },
      data: { isRead: true }
    });
    res.json({ message: 'All notifications marked as read.' });
  } catch (err) {
    console.error('[PUT /api/notifications/read-all] Error:', err.message);
    res.status(500).json({ error: 'Failed to mark all notifications.' });
  }
});

// ─────────────────────────────────────────────────
// DELETE /api/notifications/:id — delete a notification
// ─────────────────────────────────────────────────
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await prisma.notification.findUnique({ where: { id } });
    if (!notification) return res.status(404).json({ error: 'Notification not found.' });
    if (notification.userId !== req.user.id) return res.status(403).json({ error: 'Not authorized.' });

    await prisma.notification.delete({ where: { id } });
    res.json({ message: 'Notification deleted.' });
  } catch (err) {
    console.error('[DELETE /api/notifications/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to delete notification.' });
  }
});

// ─────────────────────────────────────────────────
// DELETE /api/notifications — clear all notifications
// ─────────────────────────────────────────────────
router.delete('/', authMiddleware, async (req, res) => {
  try {
    await prisma.notification.deleteMany({ where: { userId: req.user.id } });
    res.json({ message: 'All notifications cleared.' });
  } catch (err) {
    console.error('[DELETE /api/notifications] Error:', err.message);
    res.status(500).json({ error: 'Failed to clear notifications.' });
  }
});

export default router;

// ─────────────────────────────────────────────────
// Helper: createNotification — call from other routes to trigger alerts
// ─────────────────────────────────────────────────
/**
 * Create an in-app notification for a user.
 * @param {Object} opts
 * @param {string} opts.userId - Target user ID
 * @param {string} opts.title - Short title
 * @param {string} opts.body - Notification body text
 * @param {string} [opts.type] - INFO | SUCCESS | WARNING | PAYMENT | CAMPAIGN | VERIFICATION
 * @param {string} [opts.link] - Optional frontend link to navigate
 */
export async function createNotification({ userId, title, body, type = 'INFO', link = null }) {
  try {
    await prisma.notification.create({
      data: { userId, title, body, type, link }
    });
  } catch (err) {
    // Non-fatal — log and continue
    console.error('[createNotification] Error:', err.message);
  }
}
