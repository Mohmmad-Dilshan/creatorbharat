// 📧 CreatorBharat SaaS Mailer Utility — Dynamic Keys via SystemSetting DB
import { Resend } from 'resend';
import { getSettings } from './settings.js';

/**
 * Sends a transactional email.
 * API keys are loaded from the DB (SystemSetting) so admin can update them without redeploying.
 * Falls back to sandbox console log if no key is set or if email is disabled.
 *
 * @param {Object} options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject line
 * @param {string} options.html - HTML content body
 */
export async function sendEmail({ to, subject, html }) {
  try {
    const settings = await getSettings();

    if (!settings.enableEmail) {
      console.log(`[Mailer]: Email feature is disabled in admin settings. Skipping email to ${to}`);
      return { success: true, sandbox: true, reason: 'email_disabled' };
    }

    const apiKey = settings.resendApiKey;
    const emailFrom = settings.emailFrom || 'onboarding@resend.dev';

    if (!apiKey || apiKey.trim() === '') {
      console.log('\n=================== 📨 [Sandbox Mailer — No API Key] ===================');
      console.log(`TO:      ${to}`);
      console.log(`SUBJECT: ${subject}`);
      console.log(`CONTENT: ${html}`);
      console.log('=======================================================================\n');
      return { success: true, sandbox: true };
    }

    const client = new Resend(apiKey);
    const { data, error } = await client.emails.send({
      from: emailFrom,
      to,
      subject,
      html
    });

    if (error) {
      console.warn('[Resend SDK Warning]:', error.message || error);
      return { success: false, error: error.message };
    }

    console.log(`[Mailer]: Email dispatched to ${to}. Message ID: ${data?.id}`);
    return { success: true, messageId: data?.id };
  } catch (err) {
    console.error('[Mailer Exception]:', err.message);
    return { success: false, error: err.message };
  }
}
