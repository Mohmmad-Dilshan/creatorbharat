import React, { createContext, useContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import { isValidRole } from '@/utils/security';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export const IS = {
  page: 'home',
  sel: { creator: null, campaign: null },
  user: null,
  role: null,
  isPro: false,
  saved: [],
  compared: [],
  applied: [],
  follows: [],        // who this user follows (creator/brand IDs)
  toasts: [],
  ui: { mobileMenu: false, hideNav: false },
  cf: { q: '', state: '', niche: [], platform: [], sort: 'score', verified: false, minFollowers: '', minER: '', minScore: '' },
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
    case 'LOGIN': {
      const role = isValidRole(a.role) ? a.role : 'guest';
      return { ...s, user: a.u, role, ui: { ...s.ui, mobileMenu: false } };
    }
    case 'LOGOUT': {
      localStorage.removeItem('cb_saved');
      localStorage.removeItem('cb_compared');
      localStorage.removeItem('cb_applied');
      localStorage.removeItem('cb_is_pro');
      localStorage.removeItem('cb_follows');
      return { ...IS, page: 'home' };
    }
    case 'SET_PRO': {
      localStorage.setItem('cb_is_pro', 'true');
      return { ...s, isPro: true };
    }
    case 'FOLLOW': {
      // Toggle follow — any logged-in user can follow anyone, unlimited
      const isFollowing = s.follows.includes(a.id);
      const newFollows = isFollowing
        ? s.follows.filter(x => x !== a.id)
        : [...s.follows, a.id];
      localStorage.setItem('cb_follows', JSON.stringify(newFollows));
      return { ...s, follows: newFollows };
    }
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
    try {
      const savedUser = localStorage.getItem('cb_user');
      const savedRole = localStorage.getItem('cb_role');
      if (savedUser && savedRole && isValidRole(savedRole)) {
        return { 
          ...IS, 
          user: JSON.parse(savedUser), 
          role: savedRole,
          isPro: localStorage.getItem('cb_is_pro') === 'true',
          saved: JSON.parse(localStorage.getItem('cb_saved') || '[]'),
          compared: JSON.parse(localStorage.getItem('cb_compared') || '[]'),
          applied: JSON.parse(localStorage.getItem('cb_applied') || '[]'),
          follows: JSON.parse(localStorage.getItem('cb_follows') || '[]'),
        };
      }
    } catch (e) {
      console.warn('Failed to parse saved user from localStorage:', e);
      localStorage.removeItem('cb_user');
      localStorage.removeItem('cb_role');
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

  // Sync user actions (saved, compared, applied, follows) to localStorage
  React.useEffect(() => {
    localStorage.setItem('cb_saved', JSON.stringify(st.saved));
    localStorage.setItem('cb_compared', JSON.stringify(st.compared));
    localStorage.setItem('cb_applied', JSON.stringify(st.applied));
    localStorage.setItem('cb_follows', JSON.stringify(st.follows));
  }, [st.saved, st.compared, st.applied, st.follows]);

  const value = useMemo(() => ({ st, dsp }), [st, dsp]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};
