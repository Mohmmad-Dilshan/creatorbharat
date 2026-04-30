import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, apiCall, fmt, LS } from '../theme';
import { Btn, SH, Bdg, SkeletonCard, Empty, Modal, Fld } from '../components/Primitives';
import { CampCard } from '../components/Cards';

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
      setAll(d.campaigns || []);
      setLoading(false);
    }).catch(() => setLoading(false));
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
    if (!aF.pitch) { toast('Write your pitch first', 'error'); return; }
    LS.push('cb_applications', { id: 'app-' + Date.now(), campaignId: modal.id, campaignTitle: modal.title, brand: modal.brand, applicantEmail: st.user?.email, applicantName: st.user?.name, pitch: aF.pitch, portfolio: aF.portfolio, rate: aF.rate, status: 'applied', date: new Date().toISOString() });
    dsp({ t: 'APPLY', id: modal.id }); setDone(true);
    toast(`Applied to "${modal.title}"! Good luck.`, 'success');
  };

  return (
    <div style={{ background: '#fff' }}>
      <div style={{ background: T.n8, padding: mob ? '48px 20px' : '80px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 30% 70%, rgba(16,185,129,0.08) 0%, transparent 50%)' }} />
        <div style={W()}>
          <SH eyebrow="Opportunities" title="Brand Campaigns" sub="Collaborate with top Indian brands and agencies." light mb={40} />
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', maxWidth: 800 }}>
            <div style={{ flex: 1, minWidth: 280, position: 'relative' }}>
              <input value={f.q} onChange={e => dsp({ t: 'CPF', v: { q: e.target.value } })} placeholder="Search campaigns by brand or title..." style={{ width: '100%', padding: '16px 20px 16px 48px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 15, outline: 'none' }} />
              <span style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', fontSize: 18, opacity: 0.6 }}>🔎</span>
            </div>
            <select value={f.niche} onChange={e => dsp({ t: 'CPF', v: { niche: e.target.value } })} style={{ padding: '0 24px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', fontSize: 14, color: '#fff', background: 'rgba(255,255,255,0.05)', outline: 'none' }}>
              <option value="" style={{ background: T.n8 }}>All Categories</option>
              {niches.map(n => <option key={n} value={n} style={{ background: T.n8 }}>{n}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div style={{ padding: mob ? '32px 20px' : '48px 20px', background: T.bg2, minHeight: '80vh' }}>
        <div style={W()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <p style={{ fontSize: 15, color: T.t2, fontWeight: 700 }}>{filtered.length} Opportunities Available</p>
            </div>
            {(f.q || f.niche || f.urgent) && <Btn sm variant="ghost" onClick={() => dsp({ t: 'CPF', v: { q: '', niche: '', urgent: false } })}>Clear Filters</Btn>}
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill,minmax(340px,1fr))', gap: 24 }}>
              {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <Empty icon="📋" title="No campaigns found" sub="Check back later or try different filters." ctaLabel="Reset Filters" onCta={() => dsp({ t: 'CPF', v: { q: '', niche: '', urgent: false } })} />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill,minmax(340px,1fr))', gap: 24 }}>
              {filtered.map(c => <CampCard key={c.id} campaign={c} onApply={camp => { setModal(camp); setDone(false); setAF({ pitch: '', portfolio: '', rate: '' }) }} />)}
            </div>
          )}
        </div>
      </div>

      <Modal open={!!modal} title={modal?.title || ''} onClose={() => { setModal(null); setDone(false) }} width={600}>
        {done ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: 64, marginBottom: 24, filter: 'drop-shadow(0 0 20px rgba(16,185,129,0.3))' }}>✅</div>
            <h3 style={{ fontSize: 26, color: T.t1, marginBottom: 12, fontWeight: 900 }}>Application Sent!</h3>
            <p style={{ fontSize: 16, color: T.t2, marginBottom: 32, lineHeight: 1.6 }}>Your interest has been shared with the brand. They will reach out via the platform if shortlisted.</p>
            <Btn lg onClick={() => { setModal(null); setDone(false) }} style={{ borderRadius: 16, padding: '16px 40px' }}>Browse More Deals</Btn>
          </div>
        ) : (
          <div>
            <div style={{ background: T.bg2, borderRadius: 20, padding: '24px', marginBottom: 28, border: `1px solid ${T.bd}` }}>
              <p style={{ fontSize: 12, fontWeight: 900, color: T.gd, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8 }}>Campaign Detail</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: T.t1 }}>{typeof modal?.brand === 'object' && modal.brand ? modal.brand.companyName : modal?.brand}</p>
              <p style={{ fontSize: 15, color: T.t3, marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>💰 Budget: <span style={{ color: T.ok, fontWeight: 900 }}>{fmt.inr(modal?.budgetMin)} - {fmt.inr(modal?.budgetMax)}</span></p>
            </div>
            <Fld label="Why are you a good fit? *" value={aF.pitch} onChange={e => setAF(p => ({ ...p, pitch: e.target.value }))} rows={5} placeholder="Share your content style, previous success, and why you love this brand." required />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Fld label="Expected Rate (₹)" type="number" value={aF.rate} onChange={e => setAF(p => ({ ...p, rate: e.target.value }))} placeholder="15000" />
              <Fld label="Portfolio Link" value={aF.portfolio} onChange={e => setAF(p => ({ ...p, portfolio: e.target.value }))} placeholder="URL to past work" />
            </div>
            <Btn full lg onClick={submitApply} style={{ height: 56, borderRadius: 16, marginTop: 12, fontSize: 17 }}>Submit Application 🚀</Btn>
          </div>
        )}
      </Modal>
    </div>
  );
}
