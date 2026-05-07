import React, { createContext, useContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

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
  ui: { authModal: false, authView: 'gateway', mobileMenu: false, hideNav: false },
  cf: { q: '', state: '', niche: [], platform: [], sort: 'score', verified: false, minFollowers: '', minER: '' },
  cpf: { q: '', niche: '', urgent: false }
};

export function reducer(s, a) {
  switch (a.t) {
    case 'GO': 
      return { 
        ...s, 
        page: a.p, 
        sel: a.sel ? { ...s.sel, ...a.sel } : s.sel, 
        ui: { ...s.ui, mobileMenu: false } 
      };
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
  // Load initial state from local storage if available
  const getInitialState = () => {
    const savedUser = localStorage.getItem('cb_user');
    const savedRole = localStorage.getItem('cb_role');
    if (savedUser && savedRole) {
      return { ...IS, user: JSON.parse(savedUser), role: savedRole };
    }
    return IS;
  };

  const [st, dsp] = useReducer(reducer, IS, getInitialState);

  // Sync auth state to localStorage
  React.useEffect(() => {
    if (st.user) {
      localStorage.setItem('cb_user', JSON.stringify(st.user));
      localStorage.setItem('cb_role', st.role);
    } else {
      localStorage.removeItem('cb_user');
      localStorage.removeItem('cb_role');
    }
  }, [st.user, st.role]);

  const value = useMemo(() => ({ st, dsp }), [st, dsp]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};
