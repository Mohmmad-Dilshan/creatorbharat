import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, fmt, LS } from '../utils/helpers';
import { apiCall } from '../utils/api';
import { Btn, SH, Bdg, SkeletonCard, Empty, Modal, Fld } from '../components/Primitives';
import { CampCard } from '../components/Cards';
import { Card } from '../components/Primitives';
import EliteHeader from '../components/layout/EliteHeader';
import { motion } from 'framer-motion';

export default function CampaignsPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const { cpf: f } = st;
  const [loading, setLoading] = useState(true);
  const [all, setAll] = useState([]);
  const [modal, setModal] = useState(null);
  const [done, setDone] = useState(false);
  const [aF, setAF] = useState({ pitch: '', portfolio: '', rate: '' });

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    setLoading(true);
    apiCall('/campaigns?limit=100').then(d => {
      setAll(d.campaigns || d || []);
      setLoading(false);
    }).catch(() => {
       const seed = LS.get('cb_campaigns', []);
       setAll(seed);
       setLoading(false);
    });
    return () => window.removeEventListener('resize', h);
  }, []);

  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type: type || 'info', msg } });

  const filtered = all.filter(c => {
    const title = (c.title || '').toLowerCase();
    const brandName = typeof c.brand === 'object' && c.brand ? c.brand.companyName : (c.brand || '');
    const q = (f.q || '').toLowerCase();
    if (q && !title.includes(q) && !brandName.toLowerCase().includes(q)) return false;
    if (f.niche) {
      const cn = Array.isArray(c.niche) ? c.niche : [c.niche];
      if (!cn.includes(f.niche)) return false;
    }
    if (f.urgent && !c.urgent) return false;
    return (c.status || '').toLowerCase() === 'live' || (c.status || '').toLowerCase() === 'active' || !c.status;
  });

  const niches = [...new Set(all.flatMap(c => Array.isArray(c.niche) ? c.niche : [c.niche]).filter(Boolean))];

  const submitApply = () => {
    if (!st.user) { dsp({ t: 'UI', v: { authModal: true, authTab: 'login' } }); return; }
    if (!aF.pitch) { toast('Please write your pitch first', 'error'); return; }
    
    LS.push('cb_applications', { 
      id: 'app-' + Date.now(), 
      campaignId: modal.id, 
      campaignTitle: modal.title, 
      brand: modal.brand, 
      applicantEmail: st.user?.email, 
      applicantName: st.user?.name, 
      pitch: aF.pitch, 
      portfolio: aF.portfolio, 
      rate: aF.rate, 
      status: 'applied', 
      date: new Date().toISOString() 
    });
    
    dsp({ t: 'APPLY', id: modal.id }); 
    setDone(true);
    toast(`Application sent for "${modal.title}"`, 'success');
  };

  const clearFilters = () => dsp({ t: 'CPF', v: { q: '', niche: '', urgent: false } });

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <EliteHeader 
        eyebrow="Collaborations"
        title="Find Your Next Big Deal"
        sub="Connect with India's fastest-growing brands. From Jaipur startups to global giants."
        gradient="blue"
        light={true}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', width: '100%', maxWidth: 800, justifyContent: 'center' }}>
          <div style={{ flex: 1, minWidth: mob ? '100%' : 400, position: 'relative' }}>
            <motion.div 
              style={{ 
                display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 100, padding: '8px 8px 8px 24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}
            >
              <span style={{ fontSize: 20, marginRight: 16 }}>🔍</span>
              <input 
                value={f.q} 
                onChange={e => dsp({ t: 'CPF', v: { q: e.target.value } })} 
                placeholder="Search campaigns, brands..." 
                style={{ flex: 1, border: 'none', background: 'none', color: '#111', fontSize: 16, fontWeight: 500, outline: 'none' }} 
              />
            </motion.div>
          </div>
          
          <div style={{ display: 'flex', gap: 12, width: mob ? '100%' : 'auto' }}>
            <select 
              value={f.niche} 
              onChange={e => dsp({ t: 'CPF', v: { niche: e.target.value } })} 
              style={{ padding: '0 24px', borderRadius: 100, border: '1px solid rgba(0,0,0,0.08)', background: '#fff', color: '#1e293b', fontSize: 14, fontWeight: 800, outline: 'none', cursor: 'pointer', height: 56, minWidth: 160 }}
            >
              <option value="">All Categories</option>
              {niches.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            
            <button 
              onClick={() => dsp({ t: 'CPF', v: { urgent: !f.urgent } })}
              style={{ 
                padding: '0 28px', borderRadius: 100, border: '1.5px solid ' + (f.urgent ? '#EF4444' : 'rgba(0,0,0,0.08)'), 
                background: f.urgent ? 'rgba(239,68,68,0.05)' : '#fff', color: f.urgent ? '#EF4444' : '#64748b', 
                fontSize: 14, fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', height: 56
              }}
            >
              🔥 Urgent
            </button>
          </div>
        </div>
      </EliteHeader>

      <div style={{ padding: mob ? '40px 16px' : '60px 20px', background: '#fdfdfd' }}>
        <div style={W(1200)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: mob ? 20 : 26, fontWeight: 900, color: '#111', fontFamily: "'Outfit', sans-serif" }}>
               Latest Opportunities <span style={{ color: '#94a3b8', fontSize: 15, fontWeight: 800, marginLeft: 12 }}>{filtered.length} Live Campaigns</span>
            </h2>
            {(f.q || f.niche || f.urgent) && (
              <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: '#FF9431', fontWeight: 900, fontSize: 13, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Clear All</button>
            )}
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))', gap: 32 }}>
              {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '100px 0' }}>
               <Empty 
                icon="📋" 
                title="No Campaigns Found" 
                sub="Hum naye brand campaigns par kaam kar rahe hain. Tab tak dusre categories check karein!" 
                ctaLabel="Browse All Opportunities" 
                onCta={clearFilters} 
               />
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))', gap: 32 }}>
              {filtered.map((c, i) => (
                <motion.div 
                  key={c.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <CampCard campaign={c} onApply={camp => { setModal(camp); setDone(false); setAF({ pitch: '', portfolio: '', rate: '' }) }} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal open={!!modal} title={'Campaign Application'} onClose={() => { setModal(null); setDone(false) }} width={600}>
        {done ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ width: 100, height: 100, background: 'rgba(16,185,129,0.06)', color: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, margin: '0 auto 32px' }}>✓</div>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, color: '#111', marginBottom: 16, fontWeight: 900 }}>Application Sent!</h3>
            <p style={{ fontSize: 16, color: '#64748b', marginBottom: 40, lineHeight: 1.6, maxWidth: 420, margin: '0 auto 40px' }}>Aapka application brand tak pahunch gaya hai. Shortlist hone par hum aapko notify karenge.</p>
            <Btn lg onClick={() => { setModal(null); setDone(false) }} style={{ borderRadius: 100, padding: '16px 60px' }}>Done, Browse More</Btn>
          </div>
        ) : (
          <div style={{ padding: '10px' }}>
            <div style={{ background: '#f8fafc', borderRadius: 24, padding: '28px', marginBottom: 40, border: '1px solid rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, background: '#FF9431', borderRadius: '50%', filter: 'blur(60px)', opacity: 0.08 }} />
              <p style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Applying for:</p>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 900, color: '#111', marginBottom: 12 }}>{modal?.title}</h3>
              <div style={{ display: 'inline-flex', padding: '6px 16px', background: 'rgba(16,185,129,0.08)', borderRadius: 100, fontSize: 14, fontWeight: 800, color: '#10B981' }}>
                Est. Budget: {fmt.inr(modal?.budgetMin)} - {fmt.inr(modal?.budgetMax)}
              </div>
            </div>
            
            <Fld 
              label="Why should the brand choose you? *" 
              value={aF.pitch} 
              onChange={e => setAF(p => ({ ...p, pitch: e.target.value }))} 
              rows={4} 
              placeholder="Share your unique style, audience demographics, and why this brand fits your niche..." 
              required 
            />
            
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 20, marginBottom: 16 }}>
              <Fld label="Your Quote (₹)" type="number" value={aF.rate} onChange={e => setAF(p => ({ ...p, rate: e.target.value }))} placeholder="15,000" />
              <Fld label="Past Work Link" value={aF.portfolio} onChange={e => setAF(p => ({ ...p, portfolio: e.target.value }))} placeholder="Portfolio or Reel URL" />
            </div>
            
            <Btn full lg onClick={submitApply} style={{ height: 64, borderRadius: 100, fontSize: 18, background: '#111', color: '#fff', border: 'none', marginTop: 16, fontWeight: 900 }}>Submit Application 🚀</Btn>
          </div>
        )}
      </Modal>
    </div>
  );
}
