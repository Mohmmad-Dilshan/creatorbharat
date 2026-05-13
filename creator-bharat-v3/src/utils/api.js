const API_BASE = import.meta.env.VITE_API_URL || 'https://creatorbharat.onrender.com/api';

export async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem('cb_token');
  try {
    const res = await fetch(API_BASE + endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: 'Bearer ' + token } : {}),
      },
      ...options,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    let data;
    const contentType = res.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      data = await res.json();
    } else {
      const text = await res.text();
      if (!res.ok) throw new Error(text || `HTTP Error ${res.status}`);
      return text;
    }

    if (!res.ok) throw new Error(data.error || `Error ${res.status}: ${res.statusText}`);
    return data;
  } catch (err) {
    // Only log actual code errors, not expected rate limits which are handled by fallbacks
    if (!err.message?.includes('429') && !err.message?.toLowerCase().includes('too many requests')) {
      console.error(`API Call failed [${endpoint}]:`, err);
    }
    throw err;
  }
}
