import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth, type AuthRequest } from '../auth.js';

export const notificationRouter = Router();

// GET notifications for current user
notificationRouter.get('/notifications', requireAuth, (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const notifications = db.prepare(`
      SELECT * FROM notifications 
      WHERE user_id = ? 
      ORDER BY created_at DESC 
      LIMIT 20
    `).all(userId);

    const unreadCount = db.prepare(`
      SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0
    `).get(userId) as { count: number };

    res.json({
      notifications,
      unread_count: unreadCount.count
    });
  } catch (err: unknown) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ error: 'Failed to fetch notifications.' });
  }
});

// PATCH Mark single notification as read
notificationRouter.patch('/notifications/:id/read', requireAuth, (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    db.prepare('UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?').run(id, userId);
    res.json({ message: 'Marked as read.' });
  } catch (err: unknown) {
    console.error('Error marking notification:', err);
    res.status(500).json({ error: 'Failed to update notification.' });
  }
});

// POST Mark all as read
notificationRouter.post('/notifications/read-all', requireAuth, (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    db.prepare('UPDATE notifications SET is_read = 1 WHERE user_id = ?').run(userId);
    res.json({ message: 'All notifications marked as read.' });
  } catch (err: unknown) {
    console.error('Error marking all notifications:', err);
    res.status(500).json({ error: 'Failed to update notifications.' });
  }
});
