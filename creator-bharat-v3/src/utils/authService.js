import { apiCall } from './api';
import { isDemoAuthMode } from '@/config/env';
import { LS } from './helpers';

const DEMO_DELAY = 800;
const DEMO_OTP = '1234';

const wait = (ms = DEMO_DELAY) => new Promise(resolve => setTimeout(resolve, ms));

function makeMockToken() {
  return 'mock-jwt-token-' + Date.now();
}

function cleanEmailName(email, fallback = 'user') {
  const cleanEmail = email || `${fallback}@creatorbharat.com`;
  const baseName = cleanEmail.split('@')[0] || fallback;
  return {
    cleanEmail,
    cleanName: baseName.charAt(0).toUpperCase() + baseName.slice(1),
    handle: baseName.toLowerCase().replace(/\s+/g, ''),
  };
}

function normalizeAuthResponse(res) {
  return {
    token: res.token,
    user: res.user || res.creator || res.brand || res,
  };
}

function demoError(message, status = 400) {
  const err = new Error(message);
  err.status = status;
  return err;
}

export function getDemoOtp() {
  return DEMO_OTP;
}

export function isUsingDemoAuth() {
  return isDemoAuthMode();
}

export async function loginWithPassword({ email, password, role }) {
  if (!isDemoAuthMode()) {
    return normalizeAuthResponse(await apiCall('/auth/login', {
      method: 'POST',
      body: { email, password },
    }));
  }

  await wait(1000);
  const emailLower = email.toLowerCase().trim();
  const isCreator = role === 'creator';

  if (isCreator) {
    const allCreators = LS.get('cb_creators', []);
    const matchedCreator = allCreators.find(cr => cr.email?.toLowerCase().trim() === emailLower);
    if (matchedCreator) {
      return {
        token: makeMockToken(),
        user: {
          id: matchedCreator.id,
          email: matchedCreator.email,
          name: matchedCreator.name,
          role: 'creator',
          creator: matchedCreator
        }
      };
    }
  }

  const { cleanEmail, cleanName, handle } = cleanEmailName(email);

  const user = {
    id: isCreator ? 'c-1' : 'b-1',
    email: cleanEmail,
    name: cleanName,
    role,
  };

  if (isCreator) {
    user.creator = {
      id: 'c-1',
      handle,
      city: 'Mumbai',
      state: 'Maharashtra',
      followers: 25000,
      score: 92,
      niche: ['Digital Creator'],
      bio: 'Elite creator on CreatorBharat',
      gallery: [],
      full_story: { p1: '', quote: '', p2: '', p3: '' },
      milestones: [],
      services: [],
      awards: [],
      collabs: [],
    };
  } else {
    user.brand = {
      id: 'b-1',
      companyName: cleanName.charAt(0).toUpperCase() + cleanName.slice(1) + ' Brands',
      industry: 'Tech',
      city: 'Mumbai',
      state: 'Maharashtra',
    };
  }

  return { token: makeMockToken(), user };
}

/**
 * Send OTP to the given phone number for login or phone update.
 * POST /auth/send-otp
 */
export async function sendOtp(phone) {
  if (isDemoAuthMode()) {
    await wait();
    return { ok: true, demoOtp: DEMO_OTP, phone };
  }
  return apiCall('/auth/send-otp', { method: 'POST', body: { phone } });
}

/**
 * Verify the OTP entered by the user for mobile login or phone update.
 * POST /auth/verify-otp
 */
export async function verifyOtp(phone, otp) {
  if (isDemoAuthMode()) {
    await wait();
    if (otp !== DEMO_OTP) throw demoError(`Invalid OTP. Please use ${DEMO_OTP}`);
    return { ok: true, phone };
  }
  return apiCall('/auth/verify-otp', { method: 'POST', body: { phone, otp } });
}

/**
 * Log in the user using their phone number and verified OTP.
 * POST /auth/login-otp
 */
export async function loginWithOtp(phone, otp) {
  if (isDemoAuthMode()) {
    await wait(1000);
    if (otp !== DEMO_OTP) throw demoError(`Invalid OTP. Please use ${DEMO_OTP}`);
    
    const cleanedPhone = phone.replace(/\D/g, '');
    const allCreators = LS.get('cb_creators', []);
    const matchedCreator = allCreators.find(cr => cr.phone?.replace(/\D/g, '') === cleanedPhone);

    if (matchedCreator) {
      return {
        token: makeMockToken(),
        user: {
          id: matchedCreator.id,
          email: matchedCreator.email,
          name: matchedCreator.name,
          role: 'creator',
          creator: matchedCreator
        }
      };
    }

    // Simulate user fetch fallback
    const user = {
      id: 'c-1',
      email: 'demo-otp-user@creatorbharat.com',
      phone: cleanedPhone,
      name: 'OTP Demo User',
      role: 'creator',
      creator: {
        id: 'c-1',
        handle: 'otpdemouser',
        city: 'Mumbai',
        state: 'Maharashtra',
        followers: 25000,
        score: 92,
        niche: ['Digital Creator'],
        bio: 'Elite creator on CreatorBharat',
        gallery: [],
        full_story: { p1: '', quote: '', p2: '', p3: '' },
        milestones: [],
        services: [],
        awards: [],
        collabs: [],
      }
    };
    return { token: makeMockToken(), user };
  }
  return normalizeAuthResponse(await apiCall('/auth/login-otp', {
    method: 'POST',
    body: { phone, otp },
  }));
}

export async function registerCreator(form) {
  if (!isDemoAuthMode()) {
    return normalizeAuthResponse(await apiCall('/auth/register/creator', {
      method: 'POST',
      body: {
        email: form.email,
        password: form.password,
        name: form.name,
        handle: form.handle || form.name.toLowerCase().replace(/\s+/g, ''),
        city: form.city,
        state: form.state,
        phone: form.phone,
        otp: form.otp,
      },
    }));
  }

  await wait(1000);

  const allCreators = LS.get('cb_creators', []);
  
  // Validate duplicate email
  const emailLower = form.email?.toLowerCase().trim();
  const emailExists = allCreators.some(cr => cr.email?.toLowerCase().trim() === emailLower);
  if (emailExists) {
    throw demoError('Email already registered.');
  }

  // Validate duplicate handle
  const cleanHandle = (form.handle || form.name.toLowerCase().replace(/\s+/g, '')).toLowerCase().trim();
  const handleExists = allCreators.some(cr => cr.handle?.toLowerCase().trim() === cleanHandle);
  if (handleExists) {
    throw demoError('Handle already taken.');
  }

  // Validate duplicate phone
  let verifiedPhone = null;
  if (form.phone) {
    verifiedPhone = form.phone.replace(/\D/g, '');
    const phoneExists = allCreators.some(cr => cr.phone?.replace(/\D/g, '') === verifiedPhone);
    if (phoneExists) {
      throw demoError('Phone number already registered to another account.');
    }
  }

  return {
    token: makeMockToken(),
    user: {
      id: 'c-' + Date.now(),
      email: form.email,
      phone: verifiedPhone,
      name: form.name,
      role: 'creator',
      creator: {
        id: 'c-' + Date.now(),
        handle: cleanHandle,
        city: form.city,
        state: form.state,
        phone: verifiedPhone,
        followers: 0,
        score: 85,
      },
    },
  };
}

export async function registerBrand(form) {
  if (!isDemoAuthMode()) {
    return normalizeAuthResponse(await apiCall('/auth/register/brand', {
      method: 'POST',
      body: {
        email: form.email,
        password: form.password,
        companyName: form.companyName,
        contactName: form.contactName,
        industry: form.industry,
        phone: form.phone,
        otp: form.otp,
        website: form.website,
        linkedin: form.linkedin,
        gstin: form.gstin,
        city: form.city,
        state: form.state,
      },
    }));
  }

  await wait(1000);
  return {
    token: makeMockToken(),
    user: {
      id: 'b-' + Date.now(),
      email: form.email,
      name: form.contactName,
      role: 'brand',
      brand: {
        id: 'b-' + Date.now(),
        companyName: form.companyName,
        industry: form.industry,
        city: form.city,
        state: form.state,
      },
    },
  };
}

/**
 * Send a password reset link to the given email address.
 * POST /auth/forgot-password
 */
export async function sendForgotPassword(email) {
  if (isDemoAuthMode()) {
    await wait(1000);
    return { ok: true, email };
  }
  return apiCall('/auth/forgot-password', { method: 'POST', body: { email } });
}

/**
 * Reset the user's password using the token from the reset link.
 * POST /auth/reset-password
 */
export async function resetPassword(token, newPassword) {
  if (isDemoAuthMode()) {
    await wait();
    if (!token) throw demoError('This password reset link is invalid or has expired.');
    return { ok: true };
  }
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

/**
 * Fetch the logged-in user profile details using the active JWT token.
 * GET /auth/me
 */
export async function getCurrentUser() {
  if (isDemoAuthMode()) {
    await wait(200);
    const savedUser = localStorage.getItem('cb_user');
    if (!savedUser) throw demoError('No active session.');
    return { user: JSON.parse(savedUser) };
  }
  return normalizeAuthResponse(await apiCall('/auth/me'));
}
