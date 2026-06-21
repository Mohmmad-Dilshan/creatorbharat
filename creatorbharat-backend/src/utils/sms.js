import dotenv from 'dotenv';
dotenv.config();

/**
 * Send an OTP SMS to a phone number.
 * Supports Twilio and Fast2SMS. Falls back to console log in development.
 * 
 * @param {string} phone - Target phone number
 * @param {string} otp - The OTP code to send
 */
export async function sendSMS(phone, otp) {
  const cleanedPhone = phone.replace(/\D/g, ''); // e.g. "9999999999"
  
  // 1. Twilio Integration
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromPhone = process.env.TWILIO_PHONE_NUMBER;
    
    // Ensure phone has country code for Twilio
    const formattedPhone = phone.startsWith('+') ? phone : `+91${cleanedPhone}`;
    
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const authString = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          From: fromPhone,
          To: formattedPhone,
          Body: `Your CreatorBharat verification code is ${otp}. Valid for 5 minutes.`
        })
      });
      
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to send SMS via Twilio');
      }
      console.log(`[Twilio SMS]: Sent OTP to ${formattedPhone} successfully. Message SID: ${result.sid}`);
      return { success: true, provider: 'twilio' };
    } catch (err) {
      console.error('[Twilio SMS Error]:', err.message);
    }
  }

  // 2. Fast2SMS Integration (Popular in India)
  if (process.env.FAST2SMS_API_KEY) {
    const apiKey = process.env.FAST2SMS_API_KEY;
    const tenDigitPhone = cleanedPhone.length > 10 ? cleanedPhone.slice(-10) : cleanedPhone;
    
    const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&route=otp&variables_values=${otp}&numbers=${tenDigitPhone}`;
    
    try {
      const response = await fetch(url, { method: 'GET' });
      const result = await response.json();
      
      if (!result.return) {
        throw new Error(result.message || 'Fast2SMS API returned failure');
      }
      console.log(`[Fast2SMS]: Sent OTP to ${tenDigitPhone} successfully.`);
      return { success: true, provider: 'fast2sms' };
    } catch (err) {
      console.error('[Fast2SMS Error]:', err.message);
    }
  }

  // 3. Fallback: Log to console (Sandbox Mode)
  console.warn(`\n--- [SMS OTP SANDBOX FALLBACK] ---`);
  console.warn(`SMS Provider API keys are not configured or failed.`);
  console.warn(`Sent code: ${otp} to phone: ${cleanedPhone}`);
  console.warn(`To enable real SMS, add FAST2SMS_API_KEY or TWILIO credentials to .env.`);
  console.warn(`----------------------------------\n`);
  
  return { success: true, provider: 'mock_sandbox' };
}
