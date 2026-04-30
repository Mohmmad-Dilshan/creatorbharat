// CreatorBharat V3 - Design System & Theme
// Matching production site at creatorbharat.vercel.app

export const T = {
  // Brand Gradients
  gd: 'linear-gradient(135deg, #FF9431 0%, #FF6B00 100%)', // Indian Saffron
  ga: 'linear-gradient(135deg, #128807 0%, #0F6B06 100%)', // Indian Green
  
  // Neutral Palette (Dark Mode Base)
  n9: '#050505',
  n8: '#0A0A0A',
  n7: '#111111',
  n6: '#1A1A1A',
  
  // UI Colors
  bg: '#FFFFFF',
  bg2: '#F9FAFB',
  bg3: '#F3F4F6',
  
  // Borders & Accents
  bd: 'rgba(0,0,0,0.08)',
  bd2: 'rgba(0,0,0,0.12)',
  bd3: 'rgba(255,255,255,0.1)',
  
  // Status Colors
  ok: '#10B981',
  okl: 'rgba(16,185,129,.1)',
  wn: '#F59E0B',
  wnl: 'rgba(245,158,11,.1)',
  info: '#3B82F6',
  infol: 'rgba(59,130,246,.1)',
  
  // Typography
  t1: '#111827',
  t2: '#4B5563',
  t3: '#6B7280',
  t4: '#9CA3AF',
  
  // Shadows
  sh1: '0 1px 3px rgba(0,0,0,0.05)',
  sh2: '0 4px 20px rgba(0,0,0,0.08)',
  sh3: '0 12px 40px rgba(0,0,0,0.12)',
  sh4: '0 24px 64px rgba(0,0,0,0.16)',
  
  // Brand Tiers
  gold: '#D97706',
  platinum: '#7C3AED',
  silver: '#4B5563',
  rising: '#6B7280'
};

export const fmt = {
  num(n) { if (!n) return '0'; n = Number(n); if (n >= 1e7) return (n / 1e7).toFixed(1) + 'Cr'; if (n >= 1e5) return (n / 1e5).toFixed(1) + 'L'; if (n >= 1e3) return Math.round(n / 1e3) + 'K'; return String(n) },
  inr(n) { if (!n) return '₹0'; n = Number(n); if (n >= 1e5) return '₹' + (n / 1e5).toFixed(1) + 'L'; if (n >= 1e3) return '₹' + Math.round(n / 1e3) + 'K'; return '₹' + n },
  date(d) { if (!d) return ''; try { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) } catch { return '' } },
  handle(s) { return (s || '').toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') },
  score(c) {
    let s = 0; if (c.photo || c.avatarUrl) s += 10; if (c.bio && c.bio.length > 50) s += 15; if (c.city) s += 5; if (c.state) s += 3;
    const ni = Array.isArray(c.niche) ? c.niche : [c.niche].filter(Boolean); if (ni.length) s += 5;
    const pl = Array.isArray(c.platform) ? c.platform : [c.platform].filter(Boolean); if (pl.length) s += 5;
    if (c.services && c.services.length >= 3) s += 7; if (c.instagram) s += 5; if (c.youtube) s += 5; if (c.rateMin) s += 5; if (c.languages && c.languages.length) s += 5;
    const f = Number(c.followers || 0); if (f >= 1e6) s += 30; else if (f >= 5e5) s += 24; else if (f >= 1e5) s += 18; else if (f >= 5e4) s += 12; else if (f >= 1e4) s += 6; else if (f > 0) s += 2;
    s += Math.min(30, Math.round(Number(c.er || 0) * 3)); return Math.min(100, s)
  },
  tier(sc) { if (sc >= 91) return { label: 'Platinum', color: T.platinum, bc: 'purple' }; if (sc >= 76) return { label: 'Gold', color: T.gold, bc: 'gold' }; if (sc >= 51) return { label: 'Silver', color: T.silver, bc: 'silver' }; return { label: 'Rising', color: T.rising, bc: 'rising' } },
  completeness(c) {
    const fields = [{ k: 'photo', l: 'Add profile photo', p: 10 }, { k: 'bio', l: 'Write your bio', p: 15 }, { k: 'city', l: 'Add city', p: 5 }, { k: 'niche', l: 'Select niche', p: 5 }, { k: 'platform', l: 'Add platform', p: 5 }, { k: 'instagram', l: 'Add Instagram', p: 5 }, { k: 'rateMin', l: 'Set your rate', p: 8 }, { k: 'services', l: 'Add 3+ services', p: 7 }];
    let done = 0, total = 60, missing = [];
    fields.forEach(f => { const v = c[f.k]; const has = Array.isArray(v) ? (f.k === 'services' ? v.length >= 3 : v.length > 0) : !!v; if (has) done += f.p; else missing.push(`${f.l} (+${f.p}%)`) });
    return { pct: Math.min(100, Math.round((done / total) * 100)), missing: missing.slice(0, 4) }
  }
};

export const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
export const W = (max = 1200) => ({ maxWidth: max, margin: '0 auto', padding: '0 20px' });

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

export const LS = {
  get(k, fb = null) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb } catch { return fb } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)) } catch { } },
  push(k, item) { const a = LS.get(k, []); a.push(item); LS.set(k, a); return a },
  update(k, id, patch) { const a = LS.get(k, []); const i = a.findIndex(x => x.id === id); if (i > -1) { a[i] = { ...a[i], ...patch }; LS.set(k, a) } return a },
  remove(k, id) { const a = LS.get(k, []).filter(x => x.id !== id); LS.set(k, a); return a }
};

export const SS = {
  get() { return LS.get('cb_session', null) },
  set(v) { LS.set('cb_session', v) },
  clear() { localStorage.removeItem('cb_session') }
};

export const Auth = {
  getBrand(email) { return LS.get('cb_brands', []).find(b => b.email === email) },
  getCreator(email) { return LS.get('cb_creators', []).find(c => c.email === email) }
};

export const ALL_STATES = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"];

export const INDIA_STATES = {
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli", "Belgaum"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"]
};

export const CITIES = ["Jaipur", "Mumbai", "New Delhi", "Bangalore", "Pune", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Indore", "Chandigarh"];
