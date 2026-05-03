import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, fmt, LS } from '../utils/helpers';
import { apiCall } from '../utils/api';
import { Btn, SH, Bdg, SkeletonCard, Empty, Modal, Fld } from '../components/Primitives';
import { CampCard } from '../components/Cards';
import { Card } from '../components/Primitives';

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

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Premium Header */}
      <div style={{ background: '#050505', padding: mob ? '120px 20px 60px' : '160px 20px 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(16,185,129,0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #10B981, #fff, #FF9431)' }} />
        
        <div style={{ ...W(), position: 'relative', zIndex: 2 }}>
           <div style={{ maxWidth: 800 }}>
             <SH eyebrow="Brand Collaborations" title="Find Your Next Big Deal" sub="Connect with India's fastest-growing brands. From Jaipur startups to global giants." light mb={48} />
             
             <div className="au d2" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: mob ? '100%' : 400, position: 'relative' }}>
                   <input 
                      value={f.q} 
                      onChange={e => dsp({ t: 'CPF', v: { q: e.target.value } })} 
                      placeholder="Search campaigns, brands, or roles..." 
                      style={{ width: '100%', padding: '18px 24px 18px 56px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 16, outline: 'none', backdropFilter: 'blur(10px)' }} 
                   />
                   <span style={{ position: 'absolute', left: 22, top: '50%', transform: 'translateY(-50%)', fontSize: 20, opacity: 0.6 }}>🔍</span>
                </div>
                
                <div style={{ display: 'flex', gap: 12, width: mob ? '100%' : 'auto' }}>
                  <select 
                    value={f.niche} 
                    onChange={e => dsp({ t: 'CPF', v: { niche: e.target.value } })} 
                    style={{ padding: '0 24px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, fontWeight: 700, outline: 'none', cursor: 'pointer', height: 56 }}
                  >
                    <option value="" style={{ background: '#111' }}>All Categories</option>
                    {niches.map(n => <option key={n} value={n} style={{ background: '#111' }}>{n}</option>)}
                  </select>
                  
                  <button 
                    onClick={() => dsp({ t: 'CPF', v: { urgent: !f.urgent } })}
                    style={{ padding: '0 24px', borderRadius: 100, border: '1.5px solid ' + (f.urgent ? '#EF4444' : 'rgba(255,255,255,0.1)'), background: f.urgent ? 'rgba(239,68,68,0.1)' : 'transparent', color: f.urgent ? '#EF4444' : '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    🔥 Urgent Only
                  </button>
                </div>
             </div>
           </div>
        </div>
      </div>

      <div style={{ padding: mob ? '40px 20px' : '60px 20px', background: '#FAFAFA' }}>
        <div style={W()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: '#111', fontFamily: "'Fraunces', serif" }}>
               Latest Opportunities <span style={{ color: T.t3, fontSize: 15, fontWeight: 600, marginLeft: 8 }}>({filtered.length} Live)</span>
            </h2>
            {(f.q || f.niche || f.urgent) && (
              <button onClick={() => dsp({ t: 'CPF', v: { q: '', niche: '', urgent: false } })} style={{ background: 'none', border: 'none', color: '#FF9431', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Clear All Filters</button>
            )}
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', gap: 24 }}>
              {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '80px 0' }}>
               <Empty 
                icon="📋" 
                title="No Campaigns Found" 
                sub="Hum naye brand campaigns par kaam kar rahe hain. Tab tak dusre categories check karein!" 
                ctaLabel="Browse All Categories" 
                onCta={() => dsp({ t: 'CPF', v: { q: '', niche: '', urgent: false } })} 
               />
            </div>
          ) : (
            <div className="au" style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', gap: 24 }}>
              {filtered.map((c, i) => (
                 <div key={c.id} className={`au d${(i % 5) + 1}`}>
                    <CampCard campaign={c} onApply={camp => { setModal(camp); setDone(false); setAF({ pitch: '', portfolio: '', rate: '' }) }} />
                 </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal open={!!modal} title={'Campaign Application'} onClose={() => { setModal(null); setDone(false) }} width={600}>
        {done ? (
          <div className="si" style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ width: 80, height: 80, background: 'rgba(16,185,129,0.1)', color: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, margin: '0 auto 24px' }}>✓</div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: '#111', marginBottom: 12, fontWeight: 900 }}>Application Successful!</h3>
            <p style={{ fontSize: 16, color: T.t2, marginBottom: 32, lineHeight: 1.6, maxWidth: 400, margin: '0 auto 32px' }}>Aapka application brand tak pahunch gaya hai. Shortlist hone par aapko notification mil jayega.</p>
            <Btn lg onClick={() => { setModal(null); setDone(false) }} style={{ borderRadius: 100, padding: '16px 48px' }}>Done, Browse More</Btn>
          </div>
        ) : (
          <div className="ai">
            <div style={{ background: '#111', borderRadius: 24, padding: '24px', marginBottom: 32, color: '#fff', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: '#10B981', borderRadius: '50%', filter: 'blur(50px)', opacity: 0.3 }} />
              <p style={{ fontSize: 12, fontWeight: 900, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>You are applying for:</p>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 900, marginBottom: 8 }}>{modal?.title}</h3>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#10B981' }}>Est. Budget: {fmt.inr(modal?.budgetMin)} - {fmt.inr(modal?.budgetMax)}</p>
            </div>
            
            <Fld 
              label="Why should the brand choose you? *" 
              value={aF.pitch} 
              onChange={e => setAF(p => ({ ...p, pitch: e.target.value }))} 
              rows={4} 
              placeholder="Share your unique style, audience demographics, and why this brand fits your niche..." 
              required 
            />
            
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 12 }}>
              <Fld label="Your Quote (₹)" type="number" value={aF.rate} onChange={e => setAF(p => ({ ...p, rate: e.target.value }))} placeholder="15,000" />
              <Fld label="Past Work Link" value={aF.portfolio} onChange={e => setAF(p => ({ ...p, portfolio: e.target.value }))} placeholder="Portfolio or Reel URL" />
            </div>
            
            <Btn full lg onClick={submitApply} style={{ height: 60, borderRadius: 100, fontSize: 17, background: 'linear-gradient(135deg, #111, #333)', border: 'none', color: '#fff', marginTop: 12 }}>Submit Application 🚀</Btn>
          </div>
        )}
      </Modal>
    </div>
  );
}
