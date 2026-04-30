import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, LS, apiCall, Auth, SS } from '../theme';
import { Btn, Fld, PL } from '../components/Primitives';

export default function BrandRegisterPage() {
  const { dsp, st } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [F, setF] = useState({ companyName: '', industry: '', email: '', contactName: '', password: '', about: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const upF = (k, v) => setF(p => ({ ...p, [k]: v }));
  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });
  const go = (p) => { dsp({ t: 'GO', p }); scrollToTop(); };

  const submit = () => {
    if (!F.companyName || !F.email || !F.password) { toast('Fill all required fields', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      const brand = { ...F, id: 'br-' + Date.now(), role: 'brand' };
      LS.push('cb_brands', brand);
      SS.set({ id: brand.id, role: 'brand', email: brand.email, name: brand.companyName });
      dsp({ t: 'LOGIN', u: brand, role: 'brand' });
      toast(`Welcome, ${F.companyName}!`, 'success');
      go('brand-dashboard'); setLoading(false);
    }, 600);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: mob ? '1fr' : '400px 1fr', background: '#fff' }}>
      {!mob && (
        <div style={{ background: T.n9, padding: '48px 40px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 48 }}><div style={{ width: 32, height: 32, borderRadius: 8, background: T.gd, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: '#fff' }}>CB</div><span style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>Creator<span style={{ color: T.gd }}>Bharat</span></span></div>
          <h2 style={{ fontSize: 26, color: '#fff', marginBottom: 12 }}>Find Your Perfect Creator Partner</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.55)', lineHeight: 1.7 }}>Access 2,400+ verified creators across 50+ Indian cities.</p>
        </div>
      )}
      <div style={{ padding: mob ? '32px 20px' : '48px 56px', overflowY: 'auto' }}>
        <div style={{ maxWidth: 500 }}>
          <h2 style={{ fontSize: 22, color: T.n8, marginBottom: 6 }}>Register Your Brand</h2>
          <p style={{ fontSize: 14, color: T.t3, marginBottom: 28 }}>Free to register. ₹49 per campaign listing.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Fld label="Company Name *" value={F.companyName} onChange={e => upF('companyName', e.target.value)} placeholder="Nykaa" required />
            <Fld label="Industry *" value={F.industry} onChange={e => upF('industry', e.target.value)} options={['', 'Beauty', 'Fashion', 'Tech', 'Food', 'Other']} required />
            <Fld label="Work Email *" type="email" value={F.email} onChange={e => upF('email', e.target.value)} placeholder="you@company.com" required />
            <Fld label="Contact Person *" value={F.contactName} onChange={e => upF('contactName', e.target.value)} placeholder="Priya" required />
            <Fld label="Password *" type="password" value={F.password} onChange={e => upF('password', e.target.value)} placeholder="Min 6 chars" required />
          </div>
          <Fld label="About Your Brand" value={F.about} onChange={e => upF('about', e.target.value)} rows={3} placeholder="Tell creators about your brand..." />
          <Btn full lg loading={loading} onClick={submit}>Create Brand Account</Btn>
        </div>
      </div>
    </div>
  );
}
