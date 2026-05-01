import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, apiCall, fmt, LS } from '../theme';
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

  const c = st.sel.creator || st.creatorProfile;
  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };
  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type: type || 'info', msg } });

  if (!c) return <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}><Empty icon="👤" title="Creator not found" sub="Aap jo creator dhoond rahe hain wo shayad abhi available nahi hai." ctaLabel="Browse Creators" onCta={() => go('creators')} /></div>;

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
    { name: 'Starter', emoji: '📦', price: fmt.inr(c.rateMin || 10000), items: ['1 Post', '2 Stories', 'Standard Delivery', 'Basic Reporting'], color: '#10B981' },
    { name: 'Professional', emoji: '⭐', price: fmt.inr(Math.round(((c.rateMin || 10000) * 2.5))), items: ['2 Reels', '5 Stories', 'Priority Delivery', 'Audience Analytics'], color: '#FF9431', pop: true },
    { name: 'Enterprise', emoji: '👑', price: fmt.inr(Math.round(((c.rateMin || 10000) * 5))), items: ['4 Reels', '10 Stories', 'Full Campaign Strategy', 'Commercial Rights'], color: '#7C3AED' },
  ];

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Banner / Cover */}
      <div style={{ height: mob ? 220 : 380, background: 'linear-gradient(135deg,#0a0a0a,#1a0800)', position: 'relative', overflow: 'hidden' }}>
        {c.coverUrl ? (
           <img src={c.coverUrl} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: .6 }} alt="" />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(255,148,49,0.15), transparent 70%)' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))' }} />
        
        {/* Animated Background Mesh */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none' }}>
           <svg width="100%" height="100%" style={{ filter: 'blur(100px)' }}>
              <circle cx="20%" cy="30%" r="20%" fill="#FF9431" />
              <circle cx="80%" cy="60%" r="25%" fill="#128807" />
           </svg>
        </div>

        <div style={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)', width: '100%', ...W() }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => go('creators')} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100, color: '#fff', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
              <span style={{ fontSize: 16 }}>←</span> Back to Discovery
            </button>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => dsp({ t: 'SAVE', id: c.id })} style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid ' + (saved ? '#FF9431' : 'rgba(255,255,255,0.15)'), borderRadius: '50%', color: saved ? '#FF9431' : '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>{saved ? '❤️' : '🤍'}</button>
              <button onClick={() => dsp({ t: 'UI', v: { shareModal: true, shareTarget: c } })} style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🔗</button>
            </div>
          </div>
        </div>
      </div>

      <div style={W()}>
        {/* Profile Card Header */}
        <div className="au" style={{ background: '#fff', borderRadius: 32, border: '1px solid rgba(0,0,0,0.06)', padding: mob ? '24px' : '40px', marginTop: mob ? -60 : -100, position: 'relative', zIndex: 10, boxShadow: '0 20px 60px rgba(0,0,0,0.1)', marginBottom: 32 }}>
          <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: mob ? 20 : 32, alignItems: mob ? 'center' : 'flex-end', textAlign: mob ? 'center' : 'left' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: mob ? 120 : 160, height: mob ? 120 : 160, borderRadius: '50%', padding: 4, background: 'linear-gradient(135deg, #FF9431, #128807)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                <img src={img} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '6px solid #fff' }} alt={c.name} />
              </div>
              {c.verified && <div style={{ position: 'absolute', bottom: 10, right: 10, width: 32, height: 32, borderRadius: '50%', background: '#2563EB', border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#fff', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>✓</div>}
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 8, justifyContent: mob ? 'center' : 'flex-start', flexWrap: 'wrap', marginBottom: 12 }}>
                <Bdg color="blue">Verified Talent</Bdg>
                <Bdg color={tier.bc}>{tier.label} Tier</Bdg>
                {c.featured && <Bdg color="yellow">Featured</Bdg>}
              </div>
              <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: mob ? 32 : 48, fontWeight: 900, color: '#111', lineHeight: 1, marginBottom: 8, letterSpacing: '-0.03em' }}>{c.name}</h1>
              <p style={{ fontSize: 18, color: 'rgba(0,0,0,0.6)', fontWeight: 600, marginBottom: 8 }}>@{c.handle}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: mob ? 'center' : 'flex-start', color: T.t3, fontSize: 15, fontWeight: 500 }}>
                 <span>📍 {typeof c.city === 'object' ? c.city.name : (c.city || 'Bharat')}{c.state ? ', ' + c.state : ''}</span>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: T.bd2 }} />
                <span>{niches.join(' • ')}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, width: mob ? '100%' : 'auto' }}>
              {isOwn ? (
                <Btn full={mob} lg onClick={() => go('settings')} variant="outline">Edit Your Page</Btn>
              ) : (
                <>
                  <Btn full={mob} lg onClick={() => setShowCollab(true)} style={{ background: 'linear-gradient(135deg,#FF9431,#DC2626)', border: 'none', color: '#fff', boxShadow: '0 10px 30px rgba(255,148,49,0.3)' }}>🤝 Collaborate</Btn>
                </>
              )}
            </div>
          </div>

          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 16, marginTop: 40, paddingTop: 32, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
             {[
               { l: 'Audience Reach', v: fmt.num(c.followers), s: 'Followers', i: '👥', c: '#3B82F6' },
               { l: 'Engagement Rate', v: (c.er || 4.2).toFixed(1) + '%', s: 'High Growth', i: '📈', c: '#10B981' },
               { l: 'Content Views', v: fmt.num(c.followers * 3), s: 'Monthly Avg', i: '👁', c: '#F59E0B' },
               { l: 'Base Commercials', v: fmt.inr(c.rateMin) + '+', s: 'Per Deliverable', i: '💰', c: '#7C3AED' }
             ].map((st, i) => (
               <div key={i} className={`au d${i+1}`} style={{ background: 'rgba(0,0,0,0.02)', borderRadius: 24, padding: '20px', border: '1px solid rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ fontSize: 24, marginBottom: 12 }}>{st.i}</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#111', lineHeight: 1, marginBottom: 4 }}>{st.v}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.t3 }}>{st.l}</div>
                  <div style={{ position: 'absolute', right: -10, bottom: -10, fontSize: 64, opacity: 0.03, fontWeight: 900 }}>{st.i}</div>
               </div>
             ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="au d2" style={{ display: 'flex', gap: 8, marginBottom: 32, background: 'rgba(0,0,0,0.03)', padding: 6, borderRadius: 100, width: 'fit-content', margin: mob ? '0 auto 32px' : '0 0 32px 0' }}>
          {[
            ['about', 'Profile Details'],
            ['portfolio', 'Content Gallery'],
            ['packages', 'Commercials'],
            ['reviews', 'Brand Reviews']
          ].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ padding: '12px 24px', background: tab === id ? '#fff' : 'transparent', border: 'none', borderRadius: 100, color: tab === id ? '#111' : T.t3, fontWeight: 700, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s', boxShadow: tab === id ? '0 4px 12px rgba(0,0,0,0.08)' : 'none' }}>{label}</button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ minHeight: 400, marginBottom: 80 }}>
          {tab === 'about' && (
            <div className="ai" style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.8fr 1fr', gap: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <Card style={{ padding: '32px' }}>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 900, color: '#111', marginBottom: 20 }}>Creative Bio</h3>
                  <p style={{ fontSize: 16, color: T.t1, lineHeight: 1.8, whiteSpace: 'pre-line' }}>{c.bio || "No biography provided yet."}</p>
                </Card>
                
                <Card style={{ padding: '32px' }}>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 900, color: '#111', marginBottom: 20 }}>Editorial Spotlight</h3>
                  <div style={{ background: 'rgba(255,148,49,0.05)', borderRadius: 20, padding: '24px', borderLeft: '4px solid #FF9431' }}>
                    <h4 style={{ fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 12 }}>{article.title}</h4>
                    <p style={{ fontSize: 15, color: T.t2, lineHeight: 1.7 }}>{article.p1}</p>
                    <p style={{ fontSize: 15, color: T.t2, lineHeight: 1.7, marginTop: 12 }}>{article.p2}</p>
                  </div>
                </Card>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ background: '#111', borderRadius: 32, padding: '32px', color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: T.gd, borderRadius: '50%', filter: 'blur(40px)', opacity: 0.4 }} />
                  <p style={{ fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>Creator Performance Score</p>
                  <Ring score={score} size={140} />
                  <div style={{ marginTop: 24, padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: 20 }}>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>This score is based on audience authenticity, engagement stability, and content quality.</p>
                  </div>
                </div>

                <Card style={{ padding: '24px' }}>
                  <h4 style={{ fontSize: 15, fontWeight: 800, color: '#111', marginBottom: 16 }}>Available Platforms</h4>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {platforms.map(p => (
                      <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: T.bg2, borderRadius: 12, border: '1px solid rgba(0,0,0,0.05)', fontWeight: 700, fontSize: 14 }}>
                        {p === 'Instagram' ? '📸' : p === 'YouTube' ? '🎥' : '📱'} {p}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {tab === 'portfolio' && (
            <div className="ai" style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(3, 1fr)', gap: 16 }}>
              {portfolio.length > 0 ? portfolio.map((url, i) => (
                <div key={i} style={{ borderRadius: 24, overflow: 'hidden', position: 'relative', cursor: 'pointer', aspectRatio: '1', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <img src={url} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} alt="" onMouseEnter={e => e.target.style.transform = 'scale(1.1)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))', opacity: 0, transition: 'opacity 0.3s', display: 'flex', alignItems: 'flex-end', padding: 16 }} onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0}>
                    <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>Featured Work</span>
                  </div>
                </div>
              )) : (
                <div style={{ gridColumn: '1 / -1' }}><Empty icon="🖼" title="No portfolio images" sub="Is creator ne abhi apna portfolio upload nahi kiya hai." /></div>
              )}
            </div>
          )}

          {tab === 'packages' && (
            <div className="ai" style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 24 }}>
              {packages.map((pkg, i) => (
                <div key={pkg.name} style={{ borderRadius: 32, border: '2px solid ' + (pkg.pop ? '#FF9431' : 'rgba(0,0,0,0.06)'), padding: '40px 32px', background: pkg.pop ? '#fff' : 'rgba(0,0,0,0.02)', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: pkg.pop ? '0 20px 40px rgba(255,148,49,0.1)' : 'none' }}>
                  {pkg.pop && <div style={{ position: 'absolute', top: 20, right: 24, background: '#FF9431', color: '#fff', fontSize: 10, fontWeight: 900, padding: '4px 12px', borderRadius: 100 }}>MOST BOOKED</div>}
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{pkg.emoji}</div>
                  <h3 style={{ fontSize: 24, fontWeight: 900, color: '#111', marginBottom: 8 }}>{pkg.name}</h3>
                  <div style={{ fontSize: 36, fontWeight: 900, color: pkg.pop ? '#FF9431' : '#111', marginBottom: 24 }}>{pkg.price}</div>
                  <div style={{ flex: 1, marginBottom: 32 }}>
                    {pkg.items.map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, fontSize: 15, color: T.t2, fontWeight: 500 }}>
                        <span style={{ color: pkg.pop ? '#FF9431' : '#10B981', fontSize: 18 }}>✓</span> {item}
                      </div>
                    ))}
                  </div>
                  <Btn full lg variant={pkg.pop ? 'primary' : 'outline'} onClick={() => setShowCollab(true)}>Select {pkg.name}</Btn>
                </div>
              ))}
            </div>
          )}

          {tab === 'reviews' && (
            <div className="ai" style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 800 }}>
              {reviews.length > 0 ? reviews.map((r, i) => (
                <Card key={i} style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: T.bg3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏢</div>
                      <div>
                        <h4 style={{ fontSize: 16, fontWeight: 800, color: '#111' }}>{r.brand}</h4>
                        <p style={{ fontSize: 12, color: T.t3 }}>Verified Partnership</p>
                      </div>
                    </div>
                    <Stars rating={r.rating} />
                  </div>
                  <p style={{ fontSize: 15, color: T.t1, lineHeight: 1.6, fontStyle: 'italic' }}>"{r.text}"</p>
                  <p style={{ fontSize: 12, color: T.t3, marginTop: 12 }}>{fmt.date(r.date)}</p>
                </Card>
              )) : (
                <Empty icon="⭐" title="No reviews yet" sub="Be the first brand to collaborate and leave a review!" />
              )}
            </div>
          )}
        </div>
      </div>

      <Modal open={showCollab} title={'Launch Collaboration with ' + c.name} onClose={() => setShowCollab(false)}>
        <p style={{ fontSize: 14, color: T.t2, marginBottom: 24 }}>Send a direct request to {c.name}. Verified creators usually respond within 24 hours.</p>
        <Fld label="Collaboration Details" value={collabMsg} onChange={e => setCollabMsg(e.target.value)} rows={4} placeholder="Briefly describe your campaign, goals, and timeline..." />
        <Btn full lg onClick={sendCollab} style={{ marginTop: 8 }}>Send Direct Request</Btn>
      </Modal>
    </div>
  );
}
