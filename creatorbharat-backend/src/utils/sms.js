// 📱 CreatorBharat SaaS SMS Utility — Dynamic Keys via SystemSetting DB
import { getSettings } from './settings.js';

/**
 * Send an OTP SMS to a phone number.
 * SMS provider and API keys are loaded from DB (SystemSetting), configurable from admin panel.
 * Supports Fast2SMS and Twilio. Falls back to console sandbox if disabled or no keys.
 *
 * @param {string} phone - Target phone number
 * @param {string} otp - The OTP code to send
 */
export async function sendSMS(phone, otp) {
  const cleanedPhone = phone.replace(/\D/g, '');

  try {
    const settings = await getSettings();

    if (!settings.enableSMS) {
      console.log(`[SMS]: SMS feature is disabled in admin settings. OTP for ${cleanedPhone}: ${otp}`);
      return { success: true, sandbox: true, reason: 'sms_disabled' };
    }

    const provider = settings.smsProvider || 'fast2sms';

    // 1. Fast2SMS Integration (Popular in India)
    if (provider === 'fast2sms' && settings.fast2smsKey) {
      const tenDigitPhone = cleanedPhone.length > 10 ? cleanedPhone.slice(-10) : cleanedPhone;
      const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${settings.fast2smsKey}&route=otp&variables_values=${otp}&numbers=${tenDigitPhone}`;

      try {
        const response = await fetch(url, { method: 'GET' });
        const result = await response.json();
        if (!result.return) throw new Error(result.message || 'Fast2SMS returned failure');
        console.log(`[Fast2SMS]: OTP sent to ${tenDigitPhone} successfully.`);
        return { success: true, provider: 'fast2sms' };
      } catch (err) {
        console.error('[Fast2SMS Error]:', err.message);
        // Fall through to sandbox
      }
    }

    // 2. Twilio Integration
    if (provider === 'twilio' && settings.twilioSid && settings.twilioToken && settings.twilioPhone) {
      const formattedPhone = phone.startsWith('+') ? phone : `+91${cleanedPhone}`;
      const url = `https://api.twilio.com/2010-04-01/Accounts/${settings.twilioSid}/Messages.json`;
      const authString = Buffer.from(`${settings.twilioSid}:${settings.twilioToken}`).toString('base64');

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${authString}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            From: settings.twilioPhone,
            To: formattedPhone,
            Body: `Your CreatorBharat verification code is ${otp}. Valid for 5 minutes.`
          })
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Twilio SMS failed');
        console.log(`[Twilio SMS]: OTP sent to ${formattedPhone}. SID: ${result.sid}`);
        return { success: true, provider: 'twilio' };
      } catch (err) {
        console.error('[Twilio SMS Error]:', err.message);
        // Fall through to sandbox
      }
    }
  } catch (settingsErr) {
    console.error('[SMS]: Failed to load settings:', settingsErr.message);
  }

  // 3. Sandbox Fallback — always succeeds so OTP flow doesn't break in dev
  console.warn('\n--- [SMS OTP SANDBOX FALLBACK] ---');
  console.warn(`No SMS provider configured or keys missing.`);
  console.warn(`OTP: ${otp} → Phone: ${cleanedPhone}`);
  console.warn(`Configure SMS keys in Admin Panel → System Settings → SMS.\n`);
  return { success: true, provider: 'sandbox' };
}
