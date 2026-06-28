import prisma from '../prisma.js';
import { createNotification } from '../routes/notifications.js';

/**
 * Checks a creator's attributes (verification, score, deals, etc.) 
 * and automatically awards any missing eligible achievements/badges.
 *
 * @param {string} creatorId - Unique ID of the creator
 * @returns {Promise<Array>} List of newly granted achievements
 */
export async function checkAndAwardAchievements(creatorId) {
  try {
    const creator = await prisma.creator.findUnique({
      where: { id: creatorId },
      include: { 
        achievements: true,
        user: true,
        applications: {
          where: { status: 'APPROVED' }
        }
      }
    });

    if (!creator) return [];

    const existingBadges = new Set(creator.achievements.map(a => a.badge));
    const newlyGranted = [];

    const grant = async (badge, title, description) => {
      if (existingBadges.has(badge)) return;

      const ach = await prisma.achievement.create({
        data: {
          creatorId,
          title,
          description,
          badge
        }
      });
      newlyGranted.push(ach);

      // Create in-app notification for the creator
      if (creator.user) {
        try {
          await prisma.notification.create({
            data: {
              userId: creator.user.id,
              title: `🏅 New Badge Earned: ${title}!`,
              body: `Congratulations! You have unlocked the "${title}" achievement badge.`,
              type: 'INFO',
              link: '/creator/achievements'
            }
          });
        } catch (notifErr) {
          console.error('[Achievement Awarder]: Failed to create notification:', notifErr.message);
        }
      }
    };

    // 1. Check Verification Status
    if (creator.isVerified) {
      await grant(
        'verified_elite',
        'Verified Elite Check',
        'Awarded to creators who successfully pass the official CreatorBharat identity verification.'
      );
    }

    // 2. Check Trust Score milestones
    if (creator.score >= 90) {
      await grant(
        'score_90',
        'Trust Icon (90+ Score)',
        'Reached an elite platform trust score index of 90 or above.'
      );
    }
    if (creator.score >= 80) {
      await grant(
        'score_80',
        'Rising Star (80+ Score)',
        'Reached a platform trust score index of 80 or above.'
      );
    }

    // 3. Check Campaign Deals milestones
    if (creator.applications && creator.applications.length >= 3) {
      await grant(
        'deal_master',
        'Deal Master',
        'Successfully completed and closed 3 or more brand campaigns on CreatorBharat.'
      );
    }

    if (newlyGranted.length > 0) {
      console.log(`[Achievement Awarder]: Granted ${newlyGranted.length} new badges to creator ${creator.name}`);
    }

    return newlyGranted;
  } catch (err) {
    console.error('[Achievement Awarder Error]:', err.message);
    return [];
  }
}
