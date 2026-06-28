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

/**
 * Compiles a dynamic rich HTML email template with consistent CreatorBharat branding.
 */
export function compileEmailTemplate({ title, name, bodyHtml, ctaText, ctaUrl, frontendUrl = 'http://localhost:5173' }) {
  return `
    <div style="font-family: sans-serif; background-color: #F8FAFC; padding: 40px 20px; color: #0F172A;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05); border: 1px solid #E2E8F0;">
        <div style="background: linear-gradient(135deg, #FF9431, #EA580C); padding: 32px 40px; text-align: center;">
          <h1 style="color: #FFFFFF; font-size: 28px; font-weight: 900; margin: 0; letter-spacing: -0.03em;">CreatorBharat</h1>
          <p style="color: rgba(255, 255, 255, 0.85); font-size: 11px; font-weight: 800; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 0.1em;">India Ka Creator Platform</p>
        </div>
        <div style="padding: 40px;">
          <h2 style="font-size: 20px; font-weight: 800; color: #0F172A; margin: 0 0 16px;">${title}</h2>
          <p style="font-size: 15px; font-weight: bold; color: #475569; margin: 0 0 16px;">Dear ${name || 'User'},</p>
          <div style="font-size: 14px; line-height: 1.6; color: #475569;">
            ${bodyHtml}
          </div>
          ${ctaText && ctaUrl ? `
          <div style="text-align: center; margin: 32px 0 16px;">
            <a href="${ctaUrl}" style="display: inline-block; background-color: #0F172A; color: #FFFFFF; font-size: 14px; font-weight: bold; padding: 14px 32px; border-radius: 100px; text-decoration: none; box-shadow: 0 8px 16px rgba(15, 23, 42, 0.15);">
              ${ctaText}
            </a>
          </div>
          ` : ''}
        </div>
        <div style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 24px 40px; text-align: center; font-size: 12px; color: #64748B; font-weight: bold;">
          <p style="margin: 0 0 8px;">Copyright &copy; 2026 CreatorBharat. All rights reserved.</p>
          <p style="margin: 0; font-size: 11px;">
            <a href="${frontendUrl}/terms" style="color: #64748B; text-decoration: underline;">Terms of Service</a> &bull; 
            <a href="${frontendUrl}/privacy" style="color: #64748B; text-decoration: underline;">Privacy Policy</a> &bull; 
            <a href="mailto:support@creatorbharat.com" style="color: #64748B; text-decoration: underline;">Support Helpdesk</a>
          </p>
        </div>
      </div>
    </div>
  `;
}

