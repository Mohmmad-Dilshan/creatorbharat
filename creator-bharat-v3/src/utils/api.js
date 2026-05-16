const API_BASE = import.meta.env.VITE_API_URL || 'https://creatorbharat.onrender.com/api';

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

      let data;
      const contentType = res.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        if (!res.ok) throw new Error(text || `HTTP Error ${res.status}`);
        return text;
      }

      if (!res.ok) {
        // If rate limited, don't retry immediately
        if (res.status === 429 && attempt < retries) {
          await new Promise(r => setTimeout(r, 2000)); // Wait 2s
          return execute(attempt + 1);
        }
        throw new Error(data.error || `Error ${res.status}: ${res.statusText}`);
      }
      return data;
    } catch (err) {
      // Retry on network errors
      if (attempt < retries && !err.message?.includes('401') && !err.message?.includes('403')) {
        console.warn(`Retrying API call [${endpoint}]... Attempt ${attempt + 1}`);
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1))); // Exponential backoff
        return execute(attempt + 1);
      }
      
      if (!err.message?.includes('429') && !err.message?.toLowerCase().includes('too many requests')) {
        console.error(`API Call failed [${endpoint}]:`, err);
      }
      throw err;
    }
  };

  return execute(0);
}
