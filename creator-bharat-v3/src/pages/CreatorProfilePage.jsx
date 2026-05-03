import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, fmt, LS } from '../utils/helpers';
import { apiCall } from '../utils/api';
import { Btn, Bdg, Bar, Ring, Stars, Empty, Modal, Fld } from '../components/Primitives';
import { Card } from '../components/Primitives';

export default function CreatorProfilePage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [tab, setTab] = useState('about');
  const [showCollab, setShowCollab] = useState(false);
  const [collabMsg, setCollabMsg] = useState('');

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  // ULTRA SAFE DATA FETCHING
  const c = st?.sel?.creator || st?.creatorProfile;
  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };
  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type: type || 'info', msg } });

  if (!c) return <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}><Empty icon="👤" title="Creator not found" sub="Aap jo creator dhoond rahe hain wo shayad abhi available nahi hai." ctaLabel="Browse Creators" onCta={() => go('creators')} /></div>;

  const isOwn = st?.creatorProfile?.id === c?.id;
  const saved = st?.saved?.includes(c?.id) || false;
  const score = c?.score || 85;
  const tier = fmt?.tier(score) || { label: 'Elite', bc: 'blue' };
  const niches = Array.isArray(c?.niche) ? c.niche : [c?.niche || 'Digital Creator'].filter(Boolean);
  const platforms = Array.isArray(c?.platform) ? c.platform : [c?.platform || 'Instagram'].filter(Boolean);
  const img = c?.profile_pic || c?.photo || c?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c?.name || 'Creator')}&background=FF9933&color=fff&size=200`;
  const article = fmt?.article(c) || { title: 'The Rise of Bharat Creators', p1: 'Content creation in Tier 2 & 3 cities is exploding...', p2: 'With platforms like CreatorBharat, talent is going national.' };
  const reviews = c?.reviews || [];
  const avgRating = reviews.length ? reviews.reduce((s, r) => s + Number(r.rating || 0), 0) / reviews.length : 4.5;

  const sendCollab = () => {
    if (!st?.user) { dsp({ t: 'UI', v: { authModal: true, authTab: 'login' } }); return; }
    toast('Message sent to ' + (c?.name || 'Creator'), 'success');
    setShowCollab(false);
  };

  const packages = [
    { name: 'Starter', emoji: '📦', price: fmt?.inr(c?.rateMin || 10000), items: ['1 Post', '2 Stories', 'Standard Delivery'], color: '#10B981' },
    { name: 'Professional', emoji: '⭐', price: fmt?.inr(Math.round(((c?.rateMin || 10000) * 2.5))), items: ['2 Reels', '5 Stories', 'Priority Delivery'], color: '#FF9431', pop: true },
    { name: 'Enterprise', emoji: '👑', price: fmt?.inr(Math.round(((c?.rateMin || 10000) * 5))), items: ['4 Reels', '10 Stories', 'Full Campaign Strategy'], color: '#7C3AED' },
  ];

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Banner */}
      <div style={{ height: mob ? 220 : 380, background: 'linear-gradient(135deg,#0a0a0a,#1a0800)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(255,148,49,0.15), transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))' }} />
        
        <div style={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)', width: '100%', ...W() }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => go('creators')} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100, color: '#fff', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
              <span>←</span> Back
            </button>
          </div>
        </div>
      </div>

      <div style={W()}>
        {/* Profile Card Header */}
        <div className="au" style={{ background: '#fff', borderRadius: 32, border: '1px solid rgba(0,0,0,0.06)', padding: mob ? '24px' : '40px', marginTop: mob ? -60 : -100, position: 'relative', zIndex: 10, boxShadow: '0 20px 60px rgba(0,0,0,0.1)', marginBottom: 32 }}>
          <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: mob ? 20 : 32, alignItems: mob ? 'center' : 'flex-end', textAlign: mob ? 'center' : 'left' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: mob ? 120 : 160, height: mob ? 120 : 160, borderRadius: '50%', padding: 4, background: 'linear-gradient(135deg, #FF9431, #128807)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                <img src={img} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '6px solid #fff' }} alt={c?.name} />
              </div>
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 8, justifyContent: mob ? 'center' : 'flex-start', flexWrap: 'wrap', marginBottom: 12 }}>
                <Bdg color="blue">Verified Talent</Bdg>
                <Bdg color={tier.bc}>{tier.label} Tier</Bdg>
              </div>
              <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: mob ? 32 : 48, fontWeight: 900, color: '#111', lineHeight: 1, marginBottom: 8 }}>{c?.name || 'Verified Creator'}</h1>
              <p style={{ fontSize: 18, color: 'rgba(0,0,0,0.6)', fontWeight: 600, marginBottom: 8 }}>@{c?.handle || (c?.name || 'creator').toLowerCase().replace(' ', '')}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: mob ? 'center' : 'flex-start', color: '#64748b', fontSize: 15, fontWeight: 500 }}>
                 <span>📍 {c?.city || 'Bharat'}</span>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#cbd5e1' }} />
                <span>{niches.join(' • ')}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, width: mob ? '100%' : 'auto' }}>
              <Btn full={mob} lg onClick={() => setShowCollab(true)} style={{ background: 'linear-gradient(135deg,#FF9431,#DC2626)', border: 'none', color: '#fff' }}>🤝 Collaborate</Btn>
            </div>
          </div>

          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 16, marginTop: 40, paddingTop: 32, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
             {[
               { l: 'Audience', v: fmt?.num(c?.followers || 50000), s: 'Followers', i: '👥' },
               { l: 'Engagement', v: (c?.er || 4.2).toFixed(1) + '%', s: 'Rate', i: '📈' },
               { l: 'Views', v: fmt?.num((c?.followers || 50000) * 3), s: 'Avg', i: '👁' },
               { l: 'Price', v: fmt?.inr(c?.rateMin || 10000) + '+', s: 'Base', i: '💰' }
             ].map((st, i) => (
               <div key={i} style={{ background: 'rgba(0,0,0,0.02)', borderRadius: 24, padding: '20px', border: '1px solid rgba(0,0,0,0.03)' }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{st.i}</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#111' }}>{st.v}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>{st.l}</div>
               </div>
             ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, background: 'rgba(0,0,0,0.03)', padding: 6, borderRadius: 100, width: 'fit-content', margin: mob ? '0 auto 32px' : '0' }}>
          {['about', 'portfolio', 'packages', 'reviews'].map(id => (
            <button key={id} onClick={() => setTab(id)} style={{ padding: '10px 20px', background: tab === id ? '#fff' : 'transparent', border: 'none', borderRadius: 100, color: tab === id ? '#111' : '#64748b', fontWeight: 700, fontSize: 13, cursor: 'pointer', boxShadow: tab === id ? '0 4px 10px rgba(0,0,0,0.05)' : 'none' }}>{id.toUpperCase()}</button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ minHeight: 400, marginBottom: 80 }}>
           {tab === 'about' && (
              <Card style={{ padding: 32 }}>
                 <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 20 }}>Creative Bio</h3>
                 <p style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>{c?.bio || "Hello! I am a passionate creator building content for Bharat."}</p>
              </Card>
           )}
           {tab !== 'about' && <Empty icon="📂" title="Gallery coming soon" sub="We are preparing the portfolio for this creator." />}
        </div>
      </div>
      
      <Modal open={showCollab} title={'Collaborate with ' + (c?.name || 'Creator')} onClose={() => setShowCollab(false)}>
        <Fld label="Campaign Message" value={collabMsg} onChange={e => setCollabMsg(e.target.value)} rows={4} placeholder="Describe your collaboration..." />
        <Btn full lg onClick={sendCollab} style={{ marginTop: 12 }}>Send Request</Btn>
      </Modal>
    </div>
  );
}
