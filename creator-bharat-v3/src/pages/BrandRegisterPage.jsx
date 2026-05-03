import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, LS, Auth, SS } from '../utils/helpers';
import { apiCall } from '../utils/api';
import { Btn, Fld, SH } from '../components/Primitives';

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
    if (!F.companyName || !F.email || !F.password) { toast('Please fill all required fields', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      const brand = { ...F, id: 'br-' + Date.now(), role: 'brand' };
      
      // Persistence
      const allB = LS.get('cb_brands', []);
      LS.set('cb_brands', [...allB, brand]);
      
      dsp({ t: 'LOGIN', u: brand, role: 'brand' });
      toast(`Welcome, ${F.companyName}!`, 'success');
      go('brand-dashboard'); setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: mob ? '1fr' : '480px 1fr', background: '#fff' }}>
      {/* Sidebar Onboarding */}
      {!mob && (
        <div style={{ background: '#050505', padding: '60px 48px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 0% 0%, rgba(16,185,129,0.1), transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #10B981, #fff, #FF9431)', opacity: 0.8 }} />
          
          <div style={{ marginBottom: 60, position: 'relative', zIndex: 2 }}>
             <h1 style={{ fontSize: 24, fontWeight: 900, color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 40, height: 40, background: '#10B981', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>CB</span>
                Brand Portal
             </h1>
          </div>

          <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, color: '#fff', marginBottom: 16, fontWeight: 900, lineHeight: 1.2 }}>Scale with Local Authenticity.</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 48 }}>Partner with 2,400+ verified creators across 50+ Indian cities. The most reliable way to enter Tier 2 & 3 markets.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
               {[
                 { t: 'Hyper-Local Discovery', d: 'Search by city, niche, and influence score.', i: '📍' },
                 { t: 'Verified Analytics', d: 'Get real stats, not just vanity numbers.', i: '📊' },
                 { t: 'Secure Payments', d: 'Escrow-based deals for peace of mind.', i: '🛡️' }
               ].map((item, i) => (
                 <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 24 }}>{item.i}</div>
                    <div>
                       <p style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{item.t}</p>
                       <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{item.d}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
          
          <div style={{ position: 'relative', zIndex: 2 }}>
             <div style={{ padding: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>"CreatorBharat changed how we look at Rajasthan. We found 20+ micro-creators in Jaipur and Udaipur in under a week."</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
                   <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#ccc' }} />
                   <div>
                      <p style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>Marketing Lead</p>
                      <p style={{ fontSize: 10, color: '#10B981', fontWeight: 700 }}>National Fashion Brand</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Form Area */}
      <div style={{ padding: mob ? '100px 24px 48px' : '80px 80px', overflowY: 'auto', background: '#fff' }}>
        <div style={{ maxWidth: 520 }}>
          <div className="au">
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: '#111', fontWeight: 900, marginBottom: 8 }}>Register Your Brand</h2>
            <p style={{ fontSize: 15, color: T.t3, marginBottom: 40, fontWeight: 500 }}>Join the ecosystem of brands growing with Bharat's creators.</p>

            <div className="ai">
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                 <Fld label="Company Name" value={F.companyName} onChange={e => upF('companyName', e.target.value)} placeholder="e.g. Nykaa" required />
                 <Fld label="Industry" value={F.industry} onChange={e => upF('industry', e.target.value)} options={['', 'Beauty', 'Fashion', 'Tech', 'Food', 'Real Estate', 'Education', 'Finance']} required />
               </div>
               
               <Fld label="Professional Work Email" type="email" value={F.email} onChange={e => upF('email', e.target.value)} placeholder="you@company.com" required />
               <Fld label="Primary Contact Person" value={F.contactName} onChange={e => upF('contactName', e.target.value)} placeholder="e.g. Priya Sharma" required />
               
               <Fld label="Set Password" type="password" value={F.password} onChange={e => upF('password', e.target.value)} placeholder="••••••••" required />
               
               <Fld label="About Your Brand / Vision" value={F.about} onChange={e => upF('about', e.target.value)} rows={4} placeholder="Tell creators what you are looking for in a partnership..." />
               
               <div style={{ marginTop: 12 }}>
                  <Btn full lg loading={loading} onClick={submit} style={{ height: 60, borderRadius: 100, fontSize: 17, background: '#111', color: '#fff', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>Create Brand Account 🚀</Btn>
               </div>
               
               <p style={{ textAlign: 'center', marginTop: 32, fontSize: 14, color: T.t3, fontWeight: 500 }}>
                  Already have an account? <span style={{ color: '#10B981', fontWeight: 800, cursor: 'pointer' }} onClick={() => dsp({ t: 'UI', v: { authModal: true, authTab: 'login' } })}>Login here</span>
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
