import { ENV } from '@/config/env';

const API_BASE = ENV.apiUrl;

let _unauthorizedHandler = null;
export function setUnauthorizedHandler(fn) { _unauthorizedHandler = fn; }

// ─── Token Management ─────────────────────────────────────────────────────────

export function getAccessToken() {
  return localStorage.getItem('cb_token');
}

export function getRefreshToken() {
  return localStorage.getItem('cb_refresh_token');
}

export function setTokens(accessToken, refreshToken) {
  if (accessToken) localStorage.setItem('cb_token', accessToken);
  if (refreshToken) localStorage.setItem('cb_refresh_token', refreshToken);
}

export function clearTokens() {
  localStorage.removeItem('cb_token');
  localStorage.removeItem('cb_refresh_token');
}

// ─── JWT Refresh Logic ────────────────────────────────────────────────────────

let _isRefreshing = false;
let _refreshQueue = []; // Queued calls waiting on a refresh

async function doTokenRefresh() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token available');

  const res = await fetch(API_BASE + '/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Refresh failed');

  setTokens(data.token, null); // Only access token returned on refresh
  return data.token;
}

async function refreshAndRetry(endpoint, options) {
  if (_isRefreshing) {
    // Queue this request until refresh completes
    return new Promise((resolve, reject) => {
      _refreshQueue.push({ resolve, reject, endpoint, options });
    });
  }

  _isRefreshing = true;
  try {
    const newToken = await doTokenRefresh();

    // Drain queue — retry all waiting calls with new token
    _refreshQueue.forEach(({ resolve, reject, endpoint: ep, options: opts }) => {
      apiCall(ep, opts)
        .then(resolve)
        .catch(reject);
    });
    _refreshQueue = [];

    // Retry the original call
    return await executeRequest(endpoint, options, newToken);
  } catch (refreshErr) {
    _refreshQueue.forEach(({ reject }) => reject(refreshErr));
    _refreshQueue = [];
    clearTokens();
    if (_unauthorizedHandler) _unauthorizedHandler();
    throw refreshErr;
  } finally {
    _isRefreshing = false;
  }
}

// ─── HTTP Helpers ─────────────────────────────────────────────────────────────

class HttpError extends Error {
  constructor(res, data) {
    super(data?.error || `Error ${res.status}: ${res.statusText}`);
    this.name = 'HttpError';
    this.isHttpError = true;
    this.status = res.status;
    this.statusText = res.statusText;
    this.data = data;
  }
}

async function parseResponse(res) {
  const contentType = res.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    const data = await res.json();
    if (!res.ok) {
      throw new HttpError(res, data);
    }
    return data;
  }
  
  const text = await res.text();
  if (!res.ok) {
    throw new Error(text || `HTTP Error ${res.status}`);
  }
  return text;
}

function isRateLimitError(err) {
  if (err.status === 429) return true;
  const msg = (err.message || '').toLowerCase();
  return msg.includes('429') || msg.includes('too many requests');
}

function logApiError(err, endpoint) {
  if (isRateLimitError(err)) return;

  const isNetworkError =
    err.name === 'TypeError' ||
    err.message?.includes('Failed to fetch') ||
    err.message?.includes('fetch') ||
    !navigator.onLine;

  if (import.meta.env.DEV && isNetworkError) {
    console.warn(`[Dev Mode] API host offline/sleeping. Using local/seed fallback for endpoint: ${endpoint}`);
  } else {
    console.error(`API Call failed [${endpoint}]:`, err);
  }
}

// Core fetch execution (accepts explicit token override for retry)
async function executeRequest(endpoint, options = {}, tokenOverride = null) {
  const token = tokenOverride || getAccessToken();

  const res = await fetch(API_BASE + endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  return await parseResponse(res);
}

// ─── Main API Call ────────────────────────────────────────────────────────────

export async function apiCall(endpoint, options = {}, retries = 2) {
  const execute = async (attempt) => {
    try {
      return await executeRequest(endpoint, options);
    } catch (err) {
      const isRateLimit = err.isHttpError && err.status === 429;
      const isUnauthorized = err.isHttpError && err.status === 401;

      // On 401, attempt silent token refresh (only once, not for auth endpoints)
      if (isUnauthorized && !endpoint.includes('/auth/') && attempt === 0) {
        return await refreshAndRetry(endpoint, options);
      }

      if (attempt < retries && (isRateLimit || (!isUnauthorized))) {
        const delay = isRateLimit ? 2000 : 1000 * (attempt + 1);
        if (!isRateLimit) {
          console.warn(`Retrying API call [${endpoint}]... Attempt ${attempt + 1}`);
        }
        await new Promise(r => setTimeout(r, delay));
        return execute(attempt + 1);
      }

      if (isUnauthorized && _unauthorizedHandler) {
        _unauthorizedHandler();
      }

      logApiError(err, endpoint);
      throw err;
    }
  };

  return execute(0);
}
