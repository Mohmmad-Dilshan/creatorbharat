// 🇮🇳 CreatorBharat SaaS Frontend Upload Service
import { ENV } from '@/config/env';

const API_BASE = ENV.apiUrl;

/**
 * Uploads a file (image, banner, PDF) to the backend API.
 * Handles automatic prepend of backend host for local storage fallback.
 * 
 * @param {File} file - The file object from input or dropzone
 * @returns {Promise<{ success: boolean, url: string, fileName: string }>}
 */
export async function uploadFile(file) {
  const token = localStorage.getItem('cb_token');
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(API_BASE + '/uploads/image', {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: 'Bearer ' + token } : {})
    },
    body: formData
  });

  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.error || 'File upload failed.');
  }

  // If backend returned a relative path (local storage fallback /uploads/xxx)
  // we prepend the backend server origin
  if (data.url && data.url.startsWith('/uploads/')) {
    const origin = API_BASE.replace(/\/api\/?$/, '');
    data.url = origin + data.url;
  }

  return data;
}
