const API_BASE = 'https://creatorbharat.onrender.com/api';

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
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'API Error');
    return data;
  } catch (err) {
    console.error(`API Call failed [${endpoint}]:`, err);
    throw err;
  }
}
