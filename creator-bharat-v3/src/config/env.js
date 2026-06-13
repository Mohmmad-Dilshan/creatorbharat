export const ENV = {
  apiUrl: import.meta.env.VITE_API_URL || 'https://creatorbharat.onrender.com/api',
  authMode: import.meta.env.VITE_AUTH_MODE || 'demo',
  appEnv: import.meta.env.VITE_ENV || import.meta.env.MODE || 'development',
};

export const isDemoAuthMode = () => ENV.authMode !== 'api';
