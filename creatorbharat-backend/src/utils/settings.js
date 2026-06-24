// ⚙️ CreatorBharat — Dynamic Settings Loader
// Reads SystemSetting from DB, caches in memory (60s TTL) for performance.
// Admin panel changes → DB updated → next request gets fresh settings.

import prisma from '../prisma.js';

let cachedSettings = null;
let cacheExpiry = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

const DEFAULTS = {
  id: 'singleton',
  siteName: 'CreatorBharat',
  supportEmail: 'support@creatorbharat.com',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  proMembershipPrice: 4900,
  campaignBoostPrice: 9900,
  featuredSlotPrice: 19900,
  platformFee: 10,
  enableAIAssistant: true,
  enableEscrowSystem: true,
  maintenanceMode: false,
  enableEmail: true,
  enableSMS: true,
  razorpayKeyId: process.env.RAZORPAY_KEY_ID || '',
  razorpaySecret: process.env.RAZORPAY_SECRET || '',
  razorpayMode: 'test',
  resendApiKey: process.env.RESEND_API_KEY || '',
  emailFrom: process.env.EMAIL_FROM || 'onboarding@resend.dev',
  smsProvider: 'fast2sms',
  fast2smsKey: process.env.FAST2SMS_API_KEY || '',
  twilioSid: process.env.TWILIO_ACCOUNT_SID || '',
  twilioToken: process.env.TWILIO_AUTH_TOKEN || '',
  twilioPhone: process.env.TWILIO_PHONE_NUMBER || '',
};

/**
 * Get current platform settings. Uses memory cache (60s TTL).
 * Falls back to DEFAULTS if DB fetch fails.
 * @returns {Promise<Object>} settings object
 */
export async function getSettings() {
  const now = Date.now();
  if (cachedSettings && now < cacheExpiry) {
    return cachedSettings;
  }

  try {
    let row = await prisma.systemSetting.findUnique({ where: { id: 'singleton' } });
    if (!row) {
      // First time: create the singleton row with defaults
      row = await prisma.systemSetting.create({
        data: { id: 'singleton' }
      });
    }

    // Merge: prefer DB values, fallback to env/defaults for empty strings
    const merged = { ...DEFAULTS };
    for (const key of Object.keys(DEFAULTS)) {
      const dbVal = row[key];
      if (dbVal !== undefined && dbVal !== null) {
        // For strings: use DB value only if non-empty, else keep env/default
        if (typeof dbVal === 'string' && dbVal.trim() === '') {
          // keep merged[key] (env/default)
        } else {
          merged[key] = dbVal;
        }
      }
    }

    cachedSettings = merged;
    cacheExpiry = now + CACHE_TTL_MS;
    return merged;
  } catch (err) {
    console.error('[Settings] Failed to load from DB, using defaults:', err.message);
    return DEFAULTS;
  }
}

/**
 * Invalidate settings cache (call after admin updates settings).
 */
export function invalidateSettingsCache() {
  cachedSettings = null;
  cacheExpiry = 0;
}
