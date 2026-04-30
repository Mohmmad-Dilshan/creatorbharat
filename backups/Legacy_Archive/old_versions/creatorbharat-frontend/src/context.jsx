import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { LS, SS, apiCall } from './theme';

export const Auth = {
  async login(email, pass) {
    try {
      const data = await apiCall('/auth/login', { method: 'POST', body: { email, password: pass } });
      localStorage.setItem('cb_token', data.token);
      SS.set({ id: data.user.id, role: data.user.role.toLowerCase(), email: data.user.email, name: data.user.name || data.user.companyName });
      return { ok: true, role: data.user.role.toLowerCase(), user: data.user };
    } catch (e) { return { ok: false, error: e.message || 'Login failed' } }
  },
  logout() { SS.clear(); localStorage.removeItem('cb_token') },
  session() { return SS.get() },
  getCreator(email) { return LS.get('cb_creators', []).find(c => c.email === email) || null },
  getBrand(email) { return LS.get('cb_brands', []).find(b => b.email === email) || null }
};

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export const IS = {
  page: 'home',
  sel: { creator: null, campaign: null, blog: null },
  user: null,
  role: null,
  saved: [],
  compared: [],
  applied: [],
  notifications: [{ id: 'n1', msg: 'Welcome to CreatorBharat! Bharat ke Creators, Duniya ki Nazar Mein.', read: false, time: 'Just now' }],
  toasts: [],
  ui: { authModal: false, authTab: 'login', shareModal: false, shareTarget: null, notifPanel: false, mobileMenu: false },
  creatorProfile: null,
  brand: { shortlisted: [] },
  cf: { q: '', state: '', district: '', niche: '', platform: '', sort: 'score', verified: false, minFollowers: '', minER: '' },
  cpf: { q: '', niche: '', urgent: false }
};

export function reducer(s, a) {
  switch (a.t) {
    case 'GO': return { ...s, page: a.p, sel: { ...s.sel, ...(a.sel || {}) }, ui: { ...s.ui, mobileMenu: false, notifPanel: false, shareModal: false } };
    case 'LOGIN': { const sess = SS.get(); let cp = null; if (sess && sess.role === 'creator') cp = Auth.getCreator(sess.email); return { ...s, user: a.u, role: a.role, creatorProfile: cp, ui: { ...s.ui, authModal: false } } }
    case 'LOGOUT': Auth.logout(); return { ...IS, page: 'home' };
    case 'SET_CP': return { ...s, creatorProfile: a.p };
    case 'UPD_CP': { const arr = LS.update('cb_creators', a.id, a.patch); return { ...s, creatorProfile: arr.find(c => c.id === a.id) || s.creatorProfile } };
    case 'SAVE': { const h = s.saved.includes(a.id); return { ...s, saved: h ? s.saved.filter(x => x !== a.id) : [...s.saved, a.id] } };
    case 'COMPARE': { if (s.compared.includes(a.id)) return { ...s, compared: s.compared.filter(x => x !== a.id) }; if (s.compared.length >= 3) return s; return { ...s, compared: [...s.compared, a.id] } };
    case 'APPLY': return { ...s, applied: [...s.applied.filter(x => x !== a.id), a.id] };
    case 'SHORTLIST': { const sl = s.brand.shortlisted; return { ...s, brand: { ...s.brand, shortlisted: sl.includes(a.id) ? sl.filter(x => x !== a.id) : [...sl, a.id] } } };
    case 'UI': return { ...s, ui: { ...s.ui, ...a.v } };
    case 'CF': return { ...s, cf: { ...s.cf, ...a.v } };
    case 'CPF': return { ...s, cpf: { ...s.cpf, ...a.v } };
    case 'TOAST': return { ...s, toasts: [...s.toasts, { id: Date.now() + Math.random(), ...a.d }] };
    case 'RM_TOAST': return { ...s, toasts: s.toasts.filter(t => t.id !== a.id) };
    case 'NOTIF': return { ...s, notifications: [{ id: Date.now(), ...a.n }, ...s.notifications] };
    case 'READ_ALL': return { ...s, notifications: s.notifications.map(n => ({ ...n, read: true })) };
    case 'SYNC_DATA': return { ...s, lastSync: Date.now() };
    default: return s;
  }
}

export const AppProvider = ({ children }) => {
  const [st, dsp] = useReducer(reducer, IS);

  useEffect(() => {
    const sess = Auth.session();
    if (sess) {
      dsp({ t: 'LOGIN', u: sess, role: sess.role });
    }
  }, []);

  return (
    <Ctx.Provider value={{ st, dsp }}>
      {children}
    </Ctx.Provider>
  );
};
