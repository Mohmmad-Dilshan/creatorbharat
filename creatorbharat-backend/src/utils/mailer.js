// 🇮🇳 CreatorBharat SaaS Mailer Utility
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resendApiKey = process.env.RESEND_API_KEY;
const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev';

let resendClient = null;

if (resendApiKey && resendApiKey !== 'your_resend_api_key') {
  resendClient = new Resend(resendApiKey);
}

/**
 * Sends a transactional email using Resend SDK, with a server console fallback for local sandbox debugging.
 * @param {Object} options - Email sending options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject line
 * @param {string} options.html - HTML content body
 */
export async function sendEmail({ to, subject, html }) {
  try {
    if (!resendClient) {
      console.log('\n=================== 📨 [Sandbox Mailer Fallback] ===================');
      console.log(`TO:      ${to}`);
      console.log(`SUBJECT: ${subject}`);
      console.log('CONTENT:');
      console.log(html);
      console.log('=====================================================================\n');
      return { success: true, sandbox: true };
    }

    const { data, error } = await resendClient.emails.send({
      from: emailFrom,
      to,
      subject,
      html
    });

    if (error) {
      console.warn('[Resend SDK Warning]:', error.message || error);
      console.log('\n=================== 📨 [Resend Failure Sandbox Fallback] ===================');
      console.log(`TO:      ${to}`);
      console.log(`SUBJECT: ${subject}`);
      console.log(`REASON:  ${error.message || JSON.stringify(error)}`);
      console.log('============================================================================\n');
      return { success: false, error: error.message };
    }

    console.log(`[Mailer]: Email dispatched successfully to ${to}. Message ID: ${data?.id}`);
    return { success: true, messageId: data?.id };
  } catch (err) {
    console.error('[Mailer Exception]:', err.message);
    return { success: false, error: err.message };
  }
}
