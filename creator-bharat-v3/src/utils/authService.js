import { apiCall } from './api';

/**
 * Send OTP to the given phone number for login or phone update.
 * POST /auth/send-otp
 */
export async function sendOtp(phone) {
  return apiCall('/auth/send-otp', { method: 'POST', body: { phone } });
}

/**
 * Verify the OTP entered by the user for mobile login or phone update.
 * POST /auth/verify-otp
 */
export async function verifyOtp(phone, otp) {
  return apiCall('/auth/verify-otp', { method: 'POST', body: { phone, otp } });
}

/**
 * Send a password reset link to the given email address.
 * POST /auth/forgot-password
 */
export async function sendForgotPassword(email) {
  return apiCall('/auth/forgot-password', { method: 'POST', body: { email } });
}

/**
 * Reset the user's password using the token from the reset link.
 * POST /auth/reset-password
 */
export async function resetPassword(token, newPassword) {
  return apiCall('/auth/reset-password', { method: 'POST', body: { token, newPassword } });
}

/**
 * Change the logged-in creator's password.
 * POST /auth/change-password
 * Requires JWT (automatically injected by apiCall from cb_token).
 */
export async function changePassword(currentPassword, newPassword) {
  return apiCall('/auth/change-password', {
    method: 'POST',
    body: { currentPassword, newPassword },
  });
}

/**
 * Update the logged-in creator's phone number after OTP verification.
 * POST /auth/update-phone
 * Requires JWT (automatically injected by apiCall from cb_token).
 */
export async function updatePhone(newPhone, otp) {
  return apiCall('/auth/update-phone', {
    method: 'POST',
    body: { phone: newPhone, otp },
  });
}

/**
 * Update the logged-in creator's email address with password confirmation.
 * POST /auth/update-email
 * Requires JWT (automatically injected by apiCall from cb_token).
 */
export async function updateEmail(newEmail, currentPassword) {
  return apiCall('/auth/update-email', {
    method: 'POST',
    body: { newEmail, password: currentPassword },
  });
}

/**
 * Merge a registration server response with the locally-collected form data and
 * any pre-existing profile, ensuring key fields are never lost if the server
 * omits them (e.g. phone is collected for OTP but not sent to the register endpoint).
 *
 * Merge priority (highest → lowest):
 *   1. serverResponse fields
 *   2. formData fields (fallback when server returns null/undefined)
 *   3. priorProfile fields (fallback when both server and form are absent)
 *   4. Empty string (final fallback to keep fields defined)
 *
 * Validates: Requirements 1.1, 1.2, 1.6
 */
export function mergeRegistrationProfile(serverResponse, formData, priorProfile = {}) {
  // Normalise the server payload — backends vary in how they nest the profile
  const serverProfile =
    serverResponse.creator ||
    serverResponse.creatorProfile ||
    serverResponse ||
    {};

  return {
    // 1. Start with any prior profile values
    ...priorProfile,
    // 2. Overwrite with whatever the server returned
    ...serverProfile,
    // 3. For fields that may be absent/null in the server response, fall back to
    //    form-entered values, then prior profile, then empty string.
    name:   serverProfile.name   || formData.name   || priorProfile.name   || '',
    phone:  serverProfile.phone  || formData.phone  || priorProfile.phone  || '',
    city:   serverProfile.city   || formData.city   || priorProfile.city   || '',
    state:  serverProfile.state  || formData.state  || priorProfile.state  || '',
    handle: serverProfile.handle || formData.handle || priorProfile.handle || '',
    email:  serverProfile.email  || formData.email  || priorProfile.email  || '',
  };
}
