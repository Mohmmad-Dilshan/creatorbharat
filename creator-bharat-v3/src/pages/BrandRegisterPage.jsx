import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context';
import { T } from '../theme';
import { LS } from '../utils/helpers';
import { Btn, Fld } from '../components/Primitives';
import { motion } from 'framer-motion';
import { Target, ShieldCheck, Users, ArrowRight } from 'lucide-react';

export default function BrandRegisterPage() {
  const { dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [F, setF] = useState({ companyName: '', industry: '', email: '', contactName: '', password: '', about: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const upF = (k, v) => setF(p => ({ ...p, [k]: v }));
  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });

  const submit = (e) => {
    if (e) e.preventDefault();
    if (!F.companyName || !F.email || !F.password) { toast('Please fill all required fields', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      const brand = { ...F, id: 'br-' + Date.now(), role: 'brand' };
      const allB = LS.get('cb_brands', []);
      LS.set('cb_brands', [...allB, brand]);
      
      dsp({ t: 'LOGIN', u: brand, role: 'brand' });
      toast(`Welcome to the elite club, ${F.companyName}!`, 'success');
      navigate('/brand-dashboard');
      setLoading(false);
    }, 1500);
  };

  const benefits = [
    { t: 'Hyper-Local Targeting', d: 'Connect with creators in Bhilwara, Jaipur, and 50+ cities.', i: Target, c: '#10B981' },
    { t: 'Verified Analytics', d: 'Real reach and engagement data, manually audited.', i: ShieldCheck, c: '#3B82F6' },
    { t: 'Direct Access', d: 'No middleman commissions. Direct deal management.', i: Users, c: '#F59E0B' }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: mob ? '1fr' : '480px 1fr', background: '#fff' }}>
      {/* Sidebar Onboarding */}
      {!mob && (
        <div style={{ background: '#050505', padding: '60px 48px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 0% 0%, rgba(16,185,129,0.1), transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #10B981, #fff, #FF9431)', opacity: 0.8 }} />
          
          <div style={{ marginBottom: 60, position: 'relative', zIndex: 2 }}>
             <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
                <h1 style={{ fontSize: 24, fontWeight: 900, color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
                   <span style={{ width: 40, height: 40, background: '#10B981', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                      CB
                   </span>
                   <span>Brand Console</span>
                </h1>
             </Link>
          </div>

          <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, color: '#fff', marginBottom: 16, fontWeight: 900, lineHeight: 1.2 }}>Scale Your Growth <br/>with Bharat's Elite.</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 48 }}>The most reliable way to enter Tier 2 & 3 markets. Verified creators, transparent results.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
               {benefits.map((item, i) => {
                 const Icon = item.i;
                 return (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={item.t} 
                      style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}
                    >
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.c, border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Icon size={22} />
                      </div>
                      <div>
                         <p style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{item.t}</p>
                         <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4, lineHeight: 1.5 }}>{item.d}</p>
                      </div>
                   </motion.div>
                 );
               })}
            </div>
          </div>
          
          <div style={{ position: 'relative', zIndex: 2 }}>
             <div style={{ padding: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>"CreatorBharat changed how we look at Rajasthan. We found 20+ micro-creators in Bhilwara in under a week."</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
                   <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 900 }}>M</div>
                   <div>
                      <p style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>Marketing Head</p>
                      <p style={{ fontSize: 10, color: '#10B981', fontWeight: 700 }}>National Fashion Brand</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Form Area */}
      <div style={{ padding: mob ? '100px 24px 48px' : '80px 80px', overflowY: 'auto', background: '#fff' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="au"
          >
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, color: '#111', fontWeight: 900, marginBottom: 8 }}>Register Your Brand</h2>
            <p style={{ fontSize: 16, color: T.t3, marginBottom: 40, fontWeight: 500 }}>Join the ecosystem of elite brands growing in Bharat.</p>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
               <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 20 }}>
                 <Fld label="Company Name" value={F.companyName} onChange={e => upF('companyName', e.target.value)} placeholder="e.g. Nykaa" required />
                 <Fld label="Industry" value={F.industry} onChange={e => upF('industry', e.target.value)} options={['', 'Beauty', 'Fashion', 'Tech', 'Food', 'Real Estate', 'Education', 'Finance']} required />
               </div>
               
               <Fld label="Work Email" type="email" value={F.email} onChange={e => upF('email', e.target.value)} placeholder="hello@company.com" required />
               <Fld label="Contact Person" value={F.contactName} onChange={e => upF('contactName', e.target.value)} placeholder="Aman Deep" required />
               
               <Fld label="Account Password" type="password" value={F.password} onChange={e => upF('password', e.target.value)} placeholder="••••••••" required />
               
               <Fld label="About Your Brand" value={F.about} onChange={e => upF('about', e.target.value)} rows={3} placeholder="What are you looking for in creators?" />
               
               <div style={{ marginTop: 12 }}>
                  <Btn full lg loading={loading} style={{ height: 60, borderRadius: 100, fontSize: 17, background: '#111', color: '#fff', border: 'none', fontWeight: 900, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                    Create Brand Account <ArrowRight size={20} style={{ marginLeft: 8 }} />
                  </Btn>
               </div>
               
               <p style={{ textAlign: 'center', marginTop: 12, fontSize: 14, color: T.t3, fontWeight: 500 }}>
                  Already have an account? <Link to="/login" style={{ color: '#10B981', fontWeight: 800, textDecoration: 'none' }}>Login here</Link>
               </p>
            </form>

            <div style={{ marginTop: 60, paddingTop: 40, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'center', gap: 32, opacity: 0.5 }}>
               {/* Brand Logos Placeholder */}
               <div style={{ fontSize: 12, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px' }}>Trusted By 500+ National Brands</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
