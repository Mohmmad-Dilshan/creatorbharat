import React, { useState } from 'react';
import { useApp } from '../../context';
import { Modal, Fld, Btn } from '../Primitives';

export default function AuthModal() {
  const { st, dsp } = useApp();
  const [tab, setTab] = useState(st.ui.authTab || 'login');

  const onClose = () => dsp({ t: 'UI', v: { authModal: false } });

  return (
    <Modal open={true} onClose={onClose} title={tab === 'login' ? 'Namaste, Welcome Back' : 'Join the Revolution'}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 32, background: '#F3F4F6', padding: 6, borderRadius: 100 }}>
        <button onClick={() => setTab('login')} style={{ flex: 1, padding: '12px', borderRadius: 100, border: 'none', background: tab === 'login' ? '#fff' : 'transparent', fontWeight: 800, cursor: 'pointer' }}>Login</button>
        <button onClick={() => setTab('register')} style={{ flex: 1, padding: '12px', borderRadius: 100, border: 'none', background: tab === 'register' ? '#fff' : 'transparent', fontWeight: 800, cursor: 'pointer' }}>Register</button>
      </div>
      
      {tab === 'login' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Fld label="Email Address" type="email" placeholder="you@email.com" />
          <Fld label="Password" type="password" placeholder="••••••••" />
          <Btn full lg onClick={() => { 
            dsp({ t: 'LOGIN', u: { name: 'Demo User', id: 'u1' } }); 
            onClose(); 
          }}>
            Sign In Now
          </Btn>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Btn variant="outline" onClick={() => { 
            onClose(); 
            dsp({ t: 'GO', p: 'apply' }); 
          }}>
            Creator Path
          </Btn>
          <Btn variant="outline" onClick={() => { 
            onClose(); 
            dsp({ t: 'GO', p: 'brand-register' }); 
          }}>
            Brand Path
          </Btn>
        </div>
      )}
    </Modal>
  );
}
