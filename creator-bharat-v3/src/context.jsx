import React, { createContext, useContext, useReducer } from 'react';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export const IS = {
  page: 'home',
  sel: { creator: null, campaign: null },
  user: null,
  role: null,
  saved: [],
  compared: [],
  applied: [],
  toasts: [],
  ui: { authModal: false, mobileMenu: false, hideNav: false },
  cf: { q: '', state: '', niche: [], platform: [], sort: 'score', verified: false, minFollowers: '', minER: '' },
  cpf: { q: '', niche: '', urgent: false }
};

export function reducer(s, a) {
  switch (a.t) {
    case 'GO': return { ...s, page: a.p, sel: { ...s.sel, ...(a.sel || {}) }, ui: { ...s.ui, mobileMenu: false } };
    case 'LOGIN': return { ...s, user: a.u, role: a.role, ui: { ...s.ui, authModal: false } };
    case 'LOGOUT': return { ...IS, page: 'home' };
    case 'SAVE': {
      const h = s.saved.includes(a.id);
      return { ...s, saved: h ? s.saved.filter(x => x !== a.id) : [...s.saved, a.id] };
    }
    case 'COMPARE': {
      if (s.compared.includes(a.id)) return { ...s, compared: s.compared.filter(x => x !== a.id) };
      if (s.compared.length >= 3) return s;
      return { ...s, compared: [...s.compared, a.id] };
    }
    case 'APPLY': return { ...s, applied: [...s.applied.filter(x => x !== a.id), a.id] };
    case 'UI': return { ...s, ui: { ...s.ui, ...a.v } };
    case 'CF': return { ...s, cf: { ...s.cf, ...a.v } };
    case 'CPF': return { ...s, cpf: { ...s.cpf, ...a.v } };
    case 'CLEAR_COMPARE': return { ...s, compared: [] };
    case 'TOAST': return { ...s, toasts: [...s.toasts, { id: Date.now() + Math.random(), ...a.d }] };
    case 'RM_TOAST': return { ...s, toasts: s.toasts.filter(t => t.id !== a.id) };
    default: return s;
  }
}

export const AppProvider = ({ children }) => {
  const [st, dsp] = useReducer(reducer, IS);
  return <Ctx.Provider value={{ st, dsp }}>{children}</Ctx.Provider>;
};
