import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, apiCall, fmt, ALL_STATES } from '../theme';
import { Btn, SH, Logo } from '../components/Primitives';
import { CreatorCard } from '../components/Cards';

export default function HomePage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showSug, setShowSug] = useState(false);
  const [showStateSug, setShowStateSug] = useState(false);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    const clickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setShowSug(false);
        setShowStateSug(false);
      }
    };
    window.addEventListener('resize', h);
    window.addEventListener('mousedown', clickOutside);
    return () => {
      window.removeEventListener('resize', h);
      window.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    apiCall('/creators?limit=12').then(d => {
      if (d) setCreators(d.creators || (Array.isArray(d) ? d : []));
      setLoading(false);
    }).catch(err => {
      console.error("Home creators fetch failed:", err);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const query = st.cf.q || '';
    if (!query.trim()) {
      setSuggestions([]);
      setShowSug(false);
      return;
    }

    const t = setTimeout(() => {
      setSearching(true);
      setShowSug(true);
      apiCall(`/creators?q=${query}&limit=6`).then(d => {
        if (d) setSuggestions(d.creators || (Array.isArray(d) ? d : []));
        setSearching(false);
      }).catch(err => {
        console.error("Search suggestions fetch failed:", err);
        setSearching(false);
        setSuggestions([]);
      });
    }, 300);

    return () => clearTimeout(t);
  }, [st.cf.q]);

  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };

  return (
    <div style={{ background: '#fff' }}>
      {/* 1. HERO SECTION */}
      <section style={{ background: '#FAFAFA', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: mob ? 140 : 180, paddingBottom: mob ? 80 : 120, position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '100vw', height: '70vh', background: 'radial-gradient(ellipse at top, rgba(255, 148, 49, 0.12), transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
        
        {/* DYNAMIC DOT GRID BACKGROUND */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none', maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)', animation: 'gridMove 100s linear infinite' }} />
        <style>{`
           @keyframes gridMove { from { background-position: 0 0; } to { background-position: 0 1000px; } }
           @keyframes pulseGreen { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
           .pro-tile { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); cursor: default; }
           .pro-tile:hover { transform: translateY(-12px); box-shadow: 0 40px 100px rgba(0,0,0,0.08) !important; border-color: rgba(16,185,129,0.2) !important; }
           .glow-on-hover:hover { box-shadow: 0 0 30px rgba(16,185,129,0.1) !important; }
        `}</style>

        <div style={{ ...W(), position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div className="au" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderRadius: 100, background: '#fff', border: '1px solid rgba(0,0,0,0.08)', marginBottom: 32, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}>
            <div style={{ background: '#10B981', color: '#fff', width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900 }}>✓</div>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>The Standard for Bharat's Elite Creators</span>
          </div>

          <h1 className="au d1" style={{ fontSize: mob ? 'clamp(44px,12vw,56px)' : 'clamp(64px,8vw,88px)', fontWeight: 900, color: '#111', lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.04em', maxWidth: 1000 }}>
            Your Digital <Typewriter words={['Identity', 'Portfolio', 'Protocol', 'Growth']} /> <br />
            Built for the Future.
          </h1>

          <p className="au d2" style={{ fontSize: mob ? 17 : 22, color: 'rgba(0,0,0,0.6)', lineHeight: 1.6, marginBottom: 48, fontWeight: 500, maxWidth: 720 }}>
            Launch a verified creator portfolio that actually converts. Deep analytics, secure payouts, and high-fidelity verification—all in one link.
          </p>

          <div className="au d3" style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: mob ? 14 : 16, marginBottom: 60, justifyContent: 'center', width: mob ? '100%' : 'auto' }}>
            <Btn lg full={mob} onClick={() => go('apply')} style={{ padding: '22px 48px', fontSize: 18, background: T.gd, color: '#fff', borderRadius: 100, fontWeight: 900, border: 'none', boxShadow: '0 12px 32px rgba(255,148,49,0.35)', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>🚀 Claim Your Link Free</span>
              <div style={{ position: 'absolute', top: 0, left: '-100%', width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', animation: 'shimmer 3s infinite', transform: 'skewX(-20deg)' }} />
            </Btn>
            <Btn lg variant="ghost" full={mob} onClick={() => dsp({ t: 'UI', v: { demoModal: true } })} style={{ padding: '20px 40px', fontSize: 17, background: 'rgba(0,0,0,0.03)', color: '#111', borderRadius: 100, fontWeight: 700, border: '1.5px solid rgba(0,0,0,0.08)', backdropFilter: 'blur(10px)', justifyContent: 'center', position: 'relative' }}>
              <span style={{ position: 'absolute', top: 12, left: 12, width: 8, height: 8, background: '#EF4444', borderRadius: '50%', animation: 'pulseGreen 1.5s infinite' }} />
              👁️ View Live Demo
            </Btn>
          </div>

          {/* SEARCH BAR WITH ELITE DROPDOWN */}
          <div className="search-container au d4" style={{ width: '100%', maxWidth: 1100, marginBottom: 80, position: 'relative', zIndex: 2000001 }}>
            <div style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(40px)', borderRadius: mob ? 32 : 100, padding: 8, display: 'flex', flexDirection: mob ? 'column' : 'row', gap: 8, boxShadow: '0 40px 100px -20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)' }}>
              <div style={{ flex: 1.5, position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span style={{ position: 'absolute', left: 24, fontSize: 20, opacity: 0.6 }}>🔍</span>
                <input
                  type="text"
                  placeholder="Search by niche (e.g. Fashion, Tech)..."
                  value={st.cf.q || ''}
                  onFocus={() => setShowSug(true)}
                  onChange={(e) => dsp({ t: 'CF', v: { q: e.target.value } })}
                  style={{ width: '100%', border: 'none', background: 'transparent', padding: mob ? '20px 20px 20px 64px' : '24px 20px 24px 64px', fontSize: 16, fontWeight: 600, outline: 'none', color: '#111' }}
                />
                {showSug && (
                  <div style={{ position: 'absolute', top: mob ? 'calc(100% + 12px)' : 'calc(100% + 20px)', left: 0, width: mob ? '100%' : 800, background: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(40px)', borderRadius: 40, boxShadow: '0 60px 150px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.05)', zIndex: 2000000, overflow: 'hidden', padding: mob ? 12 : 24, textAlign: 'left' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,0.04)', fontSize: 11, fontWeight: 900, color: T.t4, textTransform: 'uppercase' }}>Elite Discovery</div>
                    <div style={{ maxHeight: 400, overflowY: 'auto', padding: '16px 0' }}>
                      {suggestions.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16 }}>
                           {suggestions.map(c => (
                            <div key={c.id} onClick={() => { setShowSug(false); go('creator-profile', { creator: c }); }} style={{ padding: '16px', borderRadius: 24, background: 'rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', transition: '0.2s' }}>
                              <img src={c.img || c.photo} style={{ width: 60, height: 60, borderRadius: 16, objectFit: 'cover' }} />
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 16, fontWeight: 800 }}>{c.name}</div>
                                <div style={{ fontSize: 12, color: T.t4 }}>{c.niche} • {c.state || c.city}</div>
                                <div style={{ fontSize: 12, fontWeight: 900, color: '#FF9431', marginTop: 4 }}>{fmt.num(c.followers)} Reach</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : <div style={{ padding: 40, textAlign: 'center', color: T.t4 }}>No results found</div>}
                    </div>
                    {suggestions.length > 0 && (
                      <div onClick={() => { setShowSug(false); go('creators'); }} style={{ margin: '12px 0 0', padding: '20px', textAlign: 'center', background: '#111', borderRadius: 24, cursor: 'pointer', color: '#fff', fontSize: 15, fontWeight: 900 }}>
                        Browse All {fmt.num(2400)}+ Creators →
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div style={{ width: mob ? '100%' : 2, background: 'rgba(0,0,0,0.05)', margin: mob ? '8px 0' : '12px 0' }} />
              <div style={{ flex: 0.8, position: 'relative' }}>
                <div onClick={() => setShowStateSug(!showStateSug)} style={{ height: '100%', padding: mob ? '16px 20px 16px 56px' : '22px 20px 22px 56px', display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 20, fontSize: 20 }}>📍</span>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{st.cf.state || 'All States'}</span>
                </div>
                {showStateSug && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 12px)', left: 0, width: '100%', background: '#fff', borderRadius: 24, boxShadow: '0 40px 100px rgba(0,0,0,0.15)', zIndex: 2000000, maxHeight: 300, overflowY: 'auto', padding: 8 }}>
                    {['', ...ALL_STATES].map(s => (
                      <div key={s} onClick={() => { dsp({ t: 'CF', v: { state: s } }); setShowStateSug(false); }} style={{ padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', background: st.cf.state === s ? 'rgba(255,148,49,0.1)' : 'transparent' }}>{s || 'All States'}</div>
                    ))}
                  </div>
                )}
              </div>
              <Btn lg full={mob} onClick={() => go('creators')} style={{ borderRadius: 100, padding: mob ? '18px 40px' : '0 48px', fontSize: 17, background: '#111', color: '#fff', border: 'none', fontWeight: 900 }}>Search Now</Btn>
            </div>
          </div>

          {/* ELITE SYSTEM ARCHITECTURE BENTO */}
          <div className="au d5" style={{ width: '100%', maxWidth: 1100, position: 'relative' }}>
             <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(12, 1fr)', gridAutoRows: 'minmax(280px, auto)', gap: 32 }}>
                
                {/* Tile 1: The AI Terminal Mockup (Pro Tech Showcase) */}
                <div className="pro-tile glow-on-hover" style={{ gridColumn: mob ? '1' : '1 / 9', gridRow: mob ? 'auto' : 'span 2', background: '#fff', borderRadius: 56, padding: mob ? 32 : 64, border: '1px solid rgba(0,0,0,0.06)', textAlign: 'left', overflow: 'hidden', position: 'relative' }}>
                   <div style={{ position: 'relative', zIndex: 2 }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(16,185,129,0.06)', color: '#10B981', padding: '10px 24px', borderRadius: 100, fontSize: 12, fontWeight: 900, marginBottom: 40, letterSpacing: 1.5 }}>
                        <span style={{ width: 8, height: 8, background: '#10B981', borderRadius: '50%', animation: 'pulseGreen 1.5s infinite' }} /> AI_ENGINE_V3_ACTIVE
                      </div>
                      <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 36 : 72, fontWeight: 900, color: '#111', lineHeight: 0.9, marginBottom: 48, letterSpacing: '-0.05em' }}>The Identity <br /><span style={{ background: 'linear-gradient(90deg, #10B981, #FF9431)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Logic Protocol.</span></h3>
                      
                      {/* TERMINAL UI MOCKUP */}
                      <div style={{ background: '#0F172A', borderRadius: 24, padding: 24, fontFamily: 'monospace', fontSize: 14, color: '#94A3B8', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                         <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
                         </div>
                         <div style={{ color: '#10B981' }}>{'>'} GET /api/v3/verify/reach</div>
                         <div style={{ color: '#fff', marginTop: 4 }}>{'>'} STATUS: <span style={{ color: '#10B981' }}>AUTHENTICATED</span></div>
                         <div style={{ marginTop: 12 }}>{'>'} SCANNING SOCIAL_GRAPH...</div>
                         <div style={{ marginTop: 4 }}>{'>'} <span style={{ color: '#FF9431' }}>VERIFIED_BADGE_ISSUED</span></div>
                      </div>
                   </div>
                </div>

                {/* Tile 2: Sovereign Identity Mockup */}
                <div className="pro-tile" style={{ gridColumn: mob ? '1' : '9 / 13', background: '#0A0A0A', borderRadius: 56, padding: 48, color: '#fff', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                   <div>
                      <div style={{ fontSize: 40, marginBottom: 24 }}>🛡️</div>
                      <h3 style={{ fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 12 }}>Sovereign ID</h3>
                      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>One cryptographic link for your entire digital estate.</p>
                   </div>
                   <div style={{ marginTop: 32, padding: '16px 24px', background: 'rgba(255,255,255,0.05)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'monospace', color: '#FF9431', textAlign: 'center', fontSize: 16 }}>
                      cb.in/<span style={{ color: '#fff' }}>@you</span>
                   </div>
                </div>

                {/* Tile 3: Trust Protocol Dot */}
                <div className="pro-tile" style={{ gridColumn: mob ? '1' : '9 / 13', borderRadius: 56, padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left', background: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 15px rgba(16,185,129,0.5)' }} />
                      <span style={{ fontSize: 11, fontWeight: 900, color: '#10B981', textTransform: 'uppercase', letterSpacing: 2 }}>Protocol Activated</span>
                   </div>
                   <h4 style={{ fontSize: 22, fontWeight: 900, color: '#111', marginBottom: 8 }}>100% Earnings.</h4>
                   <p style={{ fontSize: 14, color: T.t4, fontWeight: 600 }}>No platform tax. Ever.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. THE SYSTEM SHOWCASE */}
      <section style={{ padding: mob ? '80px 20px' : '140px 20px', background: '#fff' }}>
        <div style={W()}>
           <div style={{ maxWidth: 800, marginBottom: 80, textAlign: 'left' }}>
              <div style={{ fontSize: 12, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16 }}>The Protocol</div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 40 : 64, fontWeight: 900, color: '#111', lineHeight: 1, marginBottom: 24 }}>Scale Your Reach <br /> <span style={{ background: T.gd, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Professionally.</span></h2>
           </div>
           <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 32 }}>
              {[
                { t: 'Smart Portfolios', d: 'Live sync data from all social platforms automatically.', i: '📊' },
                { t: 'Secure Payments', d: 'Automated invoicing and instant settlement logic.', i: '💳' },
                { t: 'Deep Audit', d: 'AI-driven analysis of audience quality and reach.', i: '🔍' }
              ].map((f, i) => (
                <div key={i} style={{ padding: 48, borderRadius: 48, background: '#FAFAFA', border: '1px solid rgba(0,0,0,0.04)', textAlign: 'left' }}>
                   <div style={{ fontSize: 40, marginBottom: 32 }}>{f.i}</div>
                   <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 16 }}>{f.t}</h3>
                   <p style={{ fontSize: 16, color: T.t4, lineHeight: 1.6 }}>{f.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 3. THE VERIFICATION ENGINE (TRUST) */}
      <section style={{ padding: mob ? '100px 20px' : '140px 20px', background: '#0A0A0A', textAlign: 'center', color: '#fff' }}>
        <div style={W(800)}>
          <div style={{ fontSize: 64, marginBottom: 32 }}>🛡️</div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 36 : 56, fontWeight: 900, marginBottom: 24 }}>The Badge of Authenticity</h2>
          <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 48 }}>Our AI-powered engine audits millions of data points to ensure your influence is real. Get verified and unlock premium brand partnerships.</p>
          <Btn lg style={{ borderRadius: 100, padding: '20px 48px', background: '#fff', color: '#111', fontWeight: 900, border: 'none' }}>Get Your Score →</Btn>
        </div>
      </section>

      {/* 4. FEATURED TALENT */}
      <section style={{ padding: mob ? '80px 20px' : '140px 20px', background: '#fff' }}>
        <div style={W()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
            <SH eyebrow="Discovery" title="Featured Talent" sub="Meet the creators who are defining the new creative age of Bharat." mb={0} />
            <Btn variant="outline" onClick={() => go('creators')}>View All Creators →</Btn>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 32 }}>
            {creators.slice(0, 6).map(c => <CreatorCard key={c.id} creator={c} onView={() => go('creator-profile', { creator: c })} />)}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section style={{ padding: mob ? '100px 20px' : '160px 20px', background: '#fff', overflow: 'hidden' }}>
        <div style={W()}>
          <SH eyebrow="Community" title="Voices of Bharat" sub="Real results from creators scaling their digital identity." center />
          <div style={{ display: 'flex', gap: 32, overflowX: 'auto', padding: '20px 0', scrollbarWidth: 'none' }}>
            {[
              { name: 'Arjun Mehta', niche: 'Tech & Gadgets', text: 'CreatorBharat helped me close my first ₹1L deal. The verified badge actually works!', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
              { name: 'Sana Khan', niche: 'Fashion & Beauty', text: "I've tried many link-in-bios, but this feels professional and attracts brands.", img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' }
            ].map((t, i) => (
              <div key={i} style={{ minWidth: mob ? 300 : 400, background: '#F9FAFB', borderRadius: 32, padding: 40, border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <img src={t.img} style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: '#FF9431', fontWeight: 700 }}>{t.niche}</div>
                  </div>
                </div>
                <p style={{ fontSize: 16, color: T.t2, lineHeight: 1.6, fontStyle: 'italic' }}>"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section style={{ padding: mob ? '100px 20px' : '160px 20px', background: '#FAFAFA' }}>
        <div style={W(800)}>
          <SH eyebrow="Information" title="Frequently Asked Questions" sub="Got doubts? We've got answers." center />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 60 }}>
            {[
              { q: "Is CreatorBharat free for creators?", a: "Yes, our core features including the Smart Media Kit are free for all verified creators." },
              { q: "How do I get the Verified Badge?", a: "Once you connect your socials, our AI audits your engagement. Pass the quality score, and you're verified." }
            ].map((f, i) => (
              <details key={i} style={{ background: '#fff', borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)', padding: '24px', cursor: 'pointer' }}>
                <summary style={{ fontWeight: 800, fontSize: 18, color: '#111', listStyle: 'none' }}>{f.q}</summary>
                <p style={{ marginTop: 16, fontSize: 16, color: T.t2 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section style={{ padding: mob ? '100px 20px' : '160px 20px', background: '#111', color: '#fff', textAlign: 'center' }}>
        <div style={W(800)}>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 42 : 72, fontWeight: 900, marginBottom: 24, lineHeight: 1 }}>Ab Rukna Nahi Hai.</h2>
          <p style={{ fontSize: 22, color: 'rgba(255,255,255,0.6)', marginBottom: 48 }}>Join 50,000+ creators building Bharat's next-gen digital economy.</p>
          <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: 16, justifyContent: 'center' }}>
            <Btn lg style={{ padding: '24px 64px', fontSize: 20, background: T.gd, color: '#fff', borderRadius: 100, fontWeight: 900, border: 'none' }} onClick={() => go('apply')}>Launch Your Portfolio Free</Btn>
            <Btn lg variant="outline" style={{ padding: '24px 64px', fontSize: 20, color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100 }} onClick={() => go('creators')}>Explore Creators</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

function Typewriter({ words, interval = 2000 }) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState('');
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx % words.length];
    const speed = del ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!del && sub === word) {
        setTimeout(() => setDel(true), interval);
      } else if (del && sub === '') {
        setDel(false);
        setIdx(i => i + 1);
      } else {
        setSub(del ? word.substring(0, sub.length - 1) : word.substring(0, sub.length + 1));
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [sub, del, idx, words, interval]);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ position: 'relative', zIndex: 2, background: 'linear-gradient(90deg, #FF9431, #DC2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{sub}</span>
      <span style={{ width: 3, height: '80%', background: '#FF9431', position: 'absolute', right: -6, top: '10%', animation: 'blink 1s infinite' }} />
      <svg style={{ position: 'absolute', bottom: -12, left: 0, width: '100%', height: 16, zIndex: 1, pointerEvents: 'none' }} viewBox="0 0 100 20" preserveAspectRatio="none">
        <path d="M2 15 Q 50 2 98 15" stroke="rgba(255, 148, 49, 0.4)" strokeWidth="8" strokeLinecap="round" fill="none" />
      </svg>
    </span>
  );
}
