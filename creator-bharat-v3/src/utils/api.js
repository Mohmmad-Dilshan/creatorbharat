const API_BASE = import.meta.env.VITE_API_URL || 'https://creatorbharat.onrender.com/api';

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

function isAuthenticationError(err) {
  const msg = err.message || '';
  return msg.includes('401') || msg.includes('403');
}

function isRateLimitError(err) {
  if (err.status === 429) return true;
  const msg = (err.message || '').toLowerCase();
  return msg.includes('429') || msg.includes('too many requests');
}

export async function apiCall(endpoint, options = {}, retries = 2) {
  const token = localStorage.getItem('cb_token');
  
  const execute = async (attempt) => {
    try {
      const res = await fetch(API_BASE + endpoint, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: 'Bearer ' + token } : {}),
        },
        ...options,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      return await parseResponse(res);
    } catch (err) {
      if (err.isHttpError && err.status === 429 && attempt < retries) {
        await new Promise(r => setTimeout(r, 2000));
        return execute(attempt + 1);
      }
      
      const isAuthErr = isAuthenticationError(err);
      if (attempt < retries && !isAuthErr) {
        console.warn(`Retrying API call [${endpoint}]... Attempt ${attempt + 1}`);
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        return execute(attempt + 1);
      }
      
      if (!isRateLimitError(err)) {
        console.error(`API Call failed [${endpoint}]:`, err);
      }
      throw err;
    }
  };

  return execute(0);
}
