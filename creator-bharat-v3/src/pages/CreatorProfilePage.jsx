import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, apiCall, fmt, LS } from '../theme';
import { Btn, Bdg, Bar, Ring, Stars, Empty, Modal, Fld } from '../components/Primitives';

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

  const c = st.sel.creator || st.creatorProfile;
  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };
  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type: type || 'info', msg } });

  if (!c) return <div style={{ ...W(), padding: '80px 20px', textAlign: 'center' }}><Empty icon="👤" title="Creator not found" ctaLabel="Browse Creators" onCta={() => go('creators')} /></div>;

  const isOwn = st.creatorProfile && st.creatorProfile.id === c.id;
  const saved = st.saved.includes(c.id);
  const score = c.score || fmt.score(c);
  const tier = fmt.tier(score);
  const niches = Array.isArray(c.niche) ? c.niche : [c.niche].filter(Boolean);
  const platforms = Array.isArray(c.platform) ? c.platform : [c.platform].filter(Boolean);
  const img = c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF9933&color=fff&size=200`;
  const portfolio = c.portfolio || [];
  const article = fmt.article(c);
  const reviews = c.reviews || [];
  const avgRating = reviews.length ? reviews.reduce((s, r) => s + Number(r.rating || 0), 0) / reviews.length : 0;

  const sendCollab = () => {
    if (!st.user) { dsp({ t: 'UI', v: { authModal: true, authTab: 'login' } }); return; }
    toast('Message sent to ' + c.name, 'success');
    setShowCollab(false);
  };

  const packages = [
    { name: 'Starter', emoji: '📦', price: fmt.inr(c.rateMin || 10000), items: ['1 Post', '2 Stories', 'Basic caption'], color: '#10B981' },
    { name: 'Pro', emoji: '⭐', price: fmt.inr(Math.round(((c.rateMin || 10000) + (c.rateMax || 30000)) / 2)), items: ['2 Reels', '5 Stories', 'Custom caption'], color: '#FF9933', pop: true },
    { name: 'Premium', emoji: '👑', price: fmt.inr(c.rateMax || 50000), items: ['3 Reels', '10 Stories', 'Campaign report'], color: '#7C3AED' },
  ];

  return (
    <div style={{ background: '#fff' }}>
      <div style={{ height: mob ? 190 : 300, background: 'linear-gradient(135deg,#0a0a0a,#1a0800)', position: 'relative', overflow: 'hidden' }}>
        {c.coverUrl && <img src={c.coverUrl} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: .7 }} alt="" />}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(0,0,0,.15),rgba(0,0,0,.7))' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#FF9933 33%,#fff 33%,#fff 66%,#138808 66%)' }} />
        <div style={{ position: 'absolute', top: 14, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => go('creators')} style={{ padding: '7px 14px', background: 'rgba(0,0,0,.5)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, color: '#fff', fontSize: 12, cursor: 'pointer' }}>Back</button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => dsp({ t: 'SAVE', id: c.id })} style={{ padding: '7px 14px', background: 'rgba(0,0,0,.5)', border: '1px solid ' + (saved ? '#FF9933' : 'rgba(255,255,255,.15)'), borderRadius: 8, color: saved ? '#FF9933' : '#fff', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>{saved ? 'Saved' : 'Save'}</button>
          </div>
        </div>
      </div>

      <div style={W()}>
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid ' + T.bd, padding: mob ? '20px' : '28px', marginTop: mob ? -40 : -50, position: 'relative', zIndex: 2, boxShadow: '0 8px 40px rgba(0,0,0,.1)', marginBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: 18, alignItems: mob ? 'flex-start' : 'flex-end' }}>
            <div style={{ position: 'relative', flexShrink: 0, marginTop: mob ? -44 : -54 }}>
              <img src={img} style={{ width: mob ? 80 : 100, height: mob ? 80 : 100, borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff', boxShadow: '0 4px 20px rgba(0,0,0,.15)' }} alt={c.name} />
              {c.verified && <div style={{ position: 'absolute', bottom: 2, right: 2, width: 22, height: 22, borderRadius: '50%', background: '#2563EB', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff' }}>✓</div>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
                <Bdg sm color="blue">Verified</Bdg>
                <Bdg sm color={tier.bc}>{tier.label}</Bdg>
                {c.trending && <Bdg sm color="red">Trending</Bdg>}
              </div>
              <h1 style={{ fontSize: mob ? 22 : 30, fontWeight: 900, color: T.n8, lineHeight: 1.1, marginBottom: 4 }}>{c.name}</h1>
              <p style={{ fontSize: 13, color: T.t3, marginBottom: 4 }}>@{c.handle}</p>
              <p style={{ fontSize: 13, color: T.t2 }}>📍 {c.city}{c.state ? ', ' + c.state : ''} • {niches.join(', ')}</p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flexShrink: 0 }}>
              {isOwn ? (
                <Btn onClick={() => go('settings')}>Edit Profile</Btn>
              ) : (
                <Btn style={{ background: 'linear-gradient(135deg,#FF9933,#FF6B00)', border: 'none', color: '#fff' }} onClick={() => setShowCollab(true)}>Collaborate</Btn>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(3,1fr)' : 'repeat(6,1fr)', gap: 10, marginTop: 20, paddingTop: 18, borderTop: '1px solid ' + T.bd }}>
            {[
              [fmt.num(c.followers), 'Followers', '👥'],
              [Number(c.er || 0).toFixed(1) + '%', 'ER', '📈'],
              [fmt.num(c.followers * 3), 'Views', '👁'],
              [fmt.inr(c.rateMin) + '+', 'Rate', '💰'],
              [c.completedDeals || 0, 'Deals', '🤝'],
              [avgRating > 0 ? avgRating.toFixed(1) : 'New', 'Rating', '⭐'],
            ].map(item => (
              <div key={item[1]} style={{ textAlign: 'center', padding: '10px 6px', background: T.bg2, borderRadius: 10 }}>
                <div style={{ fontSize: 16, marginBottom: 3 }}>{item[2]}</div>
                <div style={{ fontSize: mob ? 13 : 18, fontWeight: 900, color: T.n8 }}>{item[0]}</div>
                <div style={{ fontSize: 10, color: T.t3, marginTop: 3 }}>{item[1]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid ' + T.bd, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid ' + T.bd, background: T.bg2 }}>
            {[['about', 'About'], ['packages', 'Packages'], ['portfolio', 'Portfolio'], ['article', 'Article'], ['reviews', 'Reviews']].map(item => (
              <button key={item[0]} onClick={() => setTab(item[0])} style={{ padding: '13px 18px', background: tab === item[0] ? '#fff' : 'transparent', border: 'none', borderBottom: '3px solid ' + (tab === item[0] ? '#FF9933' : 'transparent'), color: tab === item[0] ? '#FF9933' : T.t2, fontWeight: tab === item[0] ? 700 : 500, fontSize: mob ? 11 : 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>{item[1]}</button>
            ))}
          </div>

          <div style={{ padding: mob ? '18px' : '26px' }}>
            {tab === 'about' && (
              <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '2fr 1fr', gap: 24 }}>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: T.n8, marginBottom: 8 }}>About</h3>
                  <p style={{ fontSize: 14, color: T.t2, lineHeight: 1.8, background: T.bg2, padding: '14px 16px', borderRadius: 10, borderLeft: '3px solid #FF9933' }}>{c.bio}</p>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: T.n8, marginBottom: 8, marginTop: 20 }}>Platforms</h3>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{platforms.map(p => <Bdg key={p} color="blue">{p}</Bdg>)}</div>
                </div>
                <div>
                  <div style={{ textAlign: 'center', padding: '20px', background: T.bg2, borderRadius: 14, border: '1px solid ' + T.bd }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: T.t3, textTransform: 'uppercase', marginBottom: 12 }}>Creator Score</p>
                    <Ring score={score} size={90} />
                  </div>
                </div>
              </div>
            )}

            {tab === 'packages' && (
              <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 18 }}>
                {packages.map(pkg => (
                  <div key={pkg.name} style={{ borderRadius: 16, border: '2px solid ' + (pkg.pop ? pkg.color : T.bd), padding: '22px', position: 'relative', background: pkg.pop ? pkg.color + '06' : '#fff' }}>
                    {pkg.pop && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: pkg.color, color: '#fff', fontSize: 10, fontWeight: 800, padding: '3px 12px', borderRadius: 20 }}>POPULAR</div>}
                    <div style={{ fontSize: 26, marginBottom: 10 }}>{pkg.emoji}</div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: T.n8 }}>{pkg.name}</h3>
                    <div style={{ fontSize: 24, fontWeight: 900, color: pkg.color, marginBottom: 14 }}>{pkg.price}</div>
                    <div style={{ borderTop: '1px solid ' + T.bd, paddingTop: 12, marginBottom: 16 }}>
                      {pkg.items.map(d => <div key={d} style={{ display: 'flex', gap: 7, marginBottom: 7, fontSize: 12, color: T.t2 }}>✓ {d}</div>)}
                    </div>
                    <Btn full onClick={() => setShowCollab(true)}>Select {pkg.name}</Btn>
                  </div>
                ))}
              </div>
            )}

            {tab === 'portfolio' && (
              <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: 12 }}>
                {portfolio.map((url, i) => <img key={i} src={url} style={{ width: '100%', aspectRatio: '1', borderRadius: 12, objectFit: 'cover' }} alt="" />)}
                {portfolio.length === 0 && <Empty icon="🖼" title="No portfolio yet" />}
              </div>
            )}

            {tab === 'article' && (
              <div style={{ maxWidth: 680 }}>
                <h2 style={{ fontSize: mob ? 19 : 24, color: T.n8, marginBottom: 16, fontWeight: 800 }}>{article.title}</h2>
                <p style={{ fontSize: 14, color: T.t1, lineHeight: 1.85 }}>{article.p1}</p>
                <p style={{ fontSize: 14, color: T.t1, lineHeight: 1.85, marginTop: 14 }}>{article.p2}</p>
                <p style={{ fontSize: 14, color: T.t1, lineHeight: 1.85, marginTop: 14 }}>{article.p3}</p>
              </div>
            )}

            {tab === 'reviews' && (
              <div>
                {reviews.map((r, i) => (
                  <div key={i} style={{ padding: '16px', background: T.bg2, borderRadius: 12, marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{r.brand}</span>
                      <Stars rating={r.rating} sm />
                    </div>
                    <p style={{ fontSize: 13, color: T.t2, fontStyle: 'italic' }}>"{r.text}"</p>
                  </div>
                ))}
                {reviews.length === 0 && <Empty icon="⭐" title="No reviews yet" />}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal open={showCollab} title={'Collaborate with ' + c.name} onClose={() => setShowCollab(false)}>
        <Fld label="Your Message" value={collabMsg} onChange={e => setCollabMsg(e.target.value)} rows={3} placeholder="Hi, I am interested in collaborating..." />
        <Btn full onClick={sendCollab}>Send Message</Btn>
      </Modal>
    </div>
  );
}
