/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useApp } from '../context';

import { W, scrollToTop, fmt } from '../utils/helpers';

import { Btn, Bdg, Ring, Empty, Modal, Fld, Card } from '../components/Primitives';


const AnalyticsGrid = ({ c, mob }) => {
  const stats = [
    { l: 'Total Reach', v: fmt?.num(c?.followers || 50000), i: '👥', c: '#3B82F6' },
    { l: 'Engagement', v: (c?.er || 4.2).toFixed(1) + '%', i: '📈', c: '#10B981' },
    { l: 'Avg Views', v: fmt?.num((c?.followers || 50000) * 2), i: '👁', c: '#FF9431' },
    { l: 'Base Rate', v: fmt?.inr(c?.rateMin || 5000), i: '💰', c: '#7C3AED' }
  ];
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 16, marginTop: 40, paddingTop: 32, borderTop: '1px solid rgba(0,0,0,0.04)' }}>
       {stats.map((stat) => (
         <div key={stat.l} style={{ background: '#f8fafc', borderRadius: 24, padding: '24px', border: '1px solid rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: 18, marginBottom: 12, background: stat.c + '15', width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{stat.i}</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#111' }}>{stat.v}</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginTop: 4 }}>{stat.l}</div>
         </div>
       ))}
    </div>
  );
};

const PackageSuites = ({ c, setShowCollab }) => {
  const packages = [
    { name: 'Starter', price: fmt?.inr(c?.rateMin || 5000), items: ['1 Feed Post', '2 Story Slides'], color: '#10B981' },
    { name: 'Elite', price: fmt?.inr(Math.round(((c?.rateMin || 5000) * 2.5))), items: ['2 Reels', '5 Story Slides', 'Priority'], color: '#FF9431', pop: true },
    { name: 'Omnichannel', price: fmt?.inr(Math.round(((c?.rateMin || 5000) * 5))), items: ['4 Reels', '10 Story Slides', 'Brand Usage'], color: '#7C3AED' },
  ];

  return (
    <Card style={{ padding: '32px', borderRadius: 28 }}>
      <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 24, fontFamily: "'Outfit', sans-serif" }}>Collaboration Suites</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {packages.map(p => (
          <div key={p.name} style={{ padding: '20px', borderRadius: 20, border: `2px solid ${p.pop ? '#FF9431' : 'rgba(0,0,0,0.04)'}`, background: p.pop ? '#FFF7ED' : 'transparent', position: 'relative' }}>
              {p.pop && <div style={{ position: 'absolute', top: -10, right: 10, background: '#FF9431', color: '#fff', fontSize: 10, fontWeight: 900, padding: '4px 10px', borderRadius: 100 }}>POPULAR</div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 16, fontWeight: 900 }}>{p.name}</span>
                <span style={{ fontSize: 16, fontWeight: 900, color: '#111' }}>{p.price}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {p.items.map(it => (
                  <div key={it} style={{ fontSize: 13, color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: p.pop ? '#FF9431' : '#cbd5e1' }} />
                    {it}
                  </div>
                ))}
              </div>
          </div>
        ))}
      </div>
      <Btn full lg style={{ marginTop: 24, borderRadius: 100, background: '#111', color: '#fff' }} onClick={() => setShowCollab(true)}>Get Custom Quote</Btn>
    </Card>
  );
};

export default function CreatorProfilePage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [showCollab, setShowCollab] = useState(false);
  const [collabMsg, setCollabMsg] = useState('');

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const c = st?.sel?.creator || st?.creatorProfile;
  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };
  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type: type || 'info', msg } });

  if (!c) return <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}><Empty icon="👤" title="Creator not found" sub="Aap jo creator dhoond rahe hain wo shayad abhi available nahi hai." ctaLabel="Browse Creators" onCta={() => go('creators')} /></div>;

  const score = c?.score || 85;
  const tier = fmt?.tier(score) || { label: 'Elite', bc: 'blue' };
  const niches = Array.isArray(c?.niche) ? c.niche : [c?.niche || 'Digital Creator'].filter(Boolean);
  const platforms = Array.isArray(c?.platform) ? c.platform : [c?.platform || 'Instagram'].filter(Boolean);
  const img = c?.profile_pic || c?.photo || c?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c?.name || 'Creator')}&background=FF9933&color=fff&size=200`;

  const sendCollab = () => {
    if (!st?.user) { dsp({ t: 'UI', v: { authModal: true, authTab: 'login' } }); return; }
    toast('Message sent to ' + (c?.name || 'Creator'), 'success');
    setShowCollab(false);
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ height: mob ? 200 : 320, background: 'linear-gradient(135deg, #0f172a, #1e293b)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, #f8fafc, transparent)' }} />
        <div style={{ ...W(1180), padding: '24px', position: 'relative', height: '100%' }}>
           <button onClick={() => go('creators')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>← MARKETPLACE</button>
        </div>
      </div>

      <div style={W(1180)}>
        <div style={{ background: '#fff', borderRadius: 32, border: '1px solid rgba(0,0,0,0.04)', padding: mob ? '24px' : '40px', marginTop: -80, position: 'relative', zIndex: 10, boxShadow: '0 30px 60px rgba(0,0,0,0.05)', marginBottom: 32 }}>
          <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: 32, alignItems: mob ? 'center' : 'flex-end', textAlign: mob ? 'center' : 'left' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: mob ? 120 : 160, height: mob ? 120 : 160, borderRadius: 28, padding: 3, background: 'linear-gradient(135deg, #FF9431, #DC2626)', boxShadow: '0 10px 30px rgba(255,148,49,0.2)' }}>
                <img src={img} style={{ width: '100%', height: '100%', borderRadius: 25, objectFit: 'cover', border: '5px solid #fff' }} alt={c?.name} />
              </div>
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 8, justifyContent: mob ? 'center' : 'flex-start', marginBottom: 12 }}>
                <Bdg sm color="green">Verified Creator</Bdg>
                <Bdg sm color="blue">{tier.label} Tier</Bdg>
              </div>
              <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 32 : 44, fontWeight: 900, color: '#111', lineHeight: 1.1, marginBottom: 8 }}>{c?.name || 'Verified Talent'}</h1>
              <p style={{ fontSize: 18, color: '#64748b', fontWeight: 600, marginBottom: 16 }}>@{c?.handle || 'username'}</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: mob ? 'center' : 'flex-start', color: '#94a3b8', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                 <span>📍 {c?.city || 'Bharat'}</span>
                 <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#cbd5e1', alignSelf: 'center' }} />
                 <span>{niches.slice(0, 2).join(' • ')}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, width: mob ? '100%' : 'auto' }}>
              <Btn full={mob} lg onClick={() => setShowCollab(true)} style={{ background: '#111', color: '#fff', borderRadius: 100, padding: '18px 40px', fontSize: 15, fontWeight: 800 }}>🤝 BOOK COLLAB</Btn>
            </div>
          </div>
          <AnalyticsGrid c={c} mob={mob} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.8fr 1fr', gap: 32, marginBottom: 80 }}>
           <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <Card style={{ padding: '32px', borderRadius: 28 }}>
                 <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 20, fontFamily: "'Outfit', sans-serif" }}>Mission & Bio</h3>
                 <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, fontWeight: 500 }}>{c?.bio || "Hello! I am a passionate creator building content for Bharat. My goal is to create authentic connections between brands and people through storytelling."}</p>
                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
                    {niches.map(n => <Bdg key={n} color="blue">{n}</Bdg>)}
                    {platforms.map(p => <Bdg key={p} color="gray">{p}</Bdg>)}
                 </div>
              </Card>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                 {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} style={{ aspectRatio: '1/1', background: '#e2e8f0', borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
                       <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))' }} />
                       <div style={{ position: 'absolute', bottom: 10, left: 10, color: '#fff', fontSize: 10, fontWeight: 900 }}>CONTENT #{i}</div>
                    </div>
                 ))}
              </div>
           </div>

           <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <PackageSuites c={c} setShowCollab={setShowCollab} />
              <Card style={{ padding: '32px', background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: '#fff', borderRadius: 28, textAlign: 'center' }}>
                 <p style={{ fontSize: 11, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', marginBottom: 16 }}>Elite Audit Score</p>
                 <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                    <Ring score={score} size={100} strokeWidth={8} light />
                 </div>
                 <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>This creator has passed our 12-point quality check for audience authenticity.</p>
              </Card>
           </div>
        </div>
      </div>
      
      <Modal open={showCollab} title={'Brief ' + (c?.name || 'Creator')} onClose={() => setShowCollab(false)}>
        <div style={{ padding: '10px' }}>
          <p style={{ fontSize: 14, color: '#64748b', marginBottom: 20 }}>Send a direct message to initiate collaboration.</p>
          <Fld label="Mission Brief" value={collabMsg} onChange={e => setCollabMsg(e.target.value)} rows={4} placeholder="What are you looking for? (e.g. 2 Reels for Beauty Brand)" />
          <Btn full lg onClick={sendCollab} style={{ marginTop: 12, borderRadius: 100 }}>Deploy Message</Btn>
        </div>
      </Modal>
    </div>
  );
}
