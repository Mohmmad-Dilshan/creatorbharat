import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, LS, Auth, fmt } from '../utils/helpers';
import { Btn, Card, Bdg, Empty } from '../components/Primitives';
import EliteHeader from '../components/layout/EliteHeader';

export default function BrandDashboardPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };
  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });

  if (!st.user || st.role !== 'brand') return (
    <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}>
       <Empty icon="🔒" title="Brand Access Only" sub="Brand dashboard dekhne ke liye brand account se login karein." ctaLabel="Join as Brand" onCta={() => go('brand-register')} />
    </div>
  );

  const myBrand = st.user;
  const myCamps = LS.get('cb_campaigns', []).filter(c => c.brandEmail === st.user.email);
  const myApps = LS.get('cb_applications', []).filter(a => myCamps.some(c => c.id === a.campaignId));
  const shortlisted = LS.get('cb_creators', []).filter(c => (st.brand?.shortlisted || []).includes(c.id));

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh', paddingBottom: 80 }}>
      {/* Elite Brand Header */}
      <EliteHeader 
        eyebrow="Management Console"
        title={myBrand.companyName || myBrand.name || 'Brand Dashboard'}
        sub="Manage your campaigns, track applications, and discover talent."
        gradient="green"
      >
        <Btn lg variant="primary" onClick={() => go('campaign-builder')}>+ Launch New Campaign</Btn>
      </EliteHeader>

      <div style={{ marginTop: -40 }}>
        <div style={W()}>
          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 20, marginBottom: 32 }}>
             {[
               { l: 'Live Campaigns', v: myCamps.length, c: '#10B981', i: '🚀' },
               { l: 'Total Applications', v: myApps.length, c: '#3B82F6', i: '📄' },
               { l: 'Shortlisted', v: shortlisted.length, c: '#7C3AED', i: '⭐' },
               { l: 'Impressions', v: '1.2M', c: '#FF9431', i: '👁️' }
             ].map((st, i) => (
               <Card key={i} className="au" style={{ padding: '24px', background: '#fff', textAlign: 'center', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{st.i}</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: st.c, lineHeight: 1 }}>{st.v}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.t3, marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{st.l}</div>
               </Card>
             ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.5fr 1fr', gap: 32 }}>
            {/* Campaigns List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
               <Card style={{ padding: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                     <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 900, color: '#111' }}>Active Campaigns</h3>
                     <Btn sm variant="ghost" onClick={() => go('campaigns')}>View All</Btn>
                  </div>
                  
                  {myCamps.length === 0 ? (
                    <Empty icon="🚀" title="No active campaigns" sub="Pahla campaign launch karein aur creators se connect karein." ctaLabel="Post Campaign" onCta={() => go('campaign-builder')} />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                       {myCamps.map(c => (
                         <div key={c.id} style={{ padding: '24px', background: 'rgba(0,0,0,0.02)', borderRadius: 24, border: '1px solid rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
                            <div>
                               <h4 style={{ fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 4 }}>{c.title}</h4>
                               <p style={{ fontSize: 14, color: T.t3, fontWeight: 600 }}>{c.filled || 0} / {c.slots || 10} creators hired • {fmt.inr(c.budgetMin)} Budget</p>
                            </div>
                            <div style={{ display: 'flex', gap: 12 }}>
                               <Bdg color="green">LIVE</Bdg>
                               <Btn sm variant="outline">Manage Applications</Btn>
                            </div>
                         </div>
                       ))}
                    </div>
                  )}
               </Card>
            </div>

            {/* Sidebar Resources */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
               <Card style={{ padding: '32px' }}>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 900, color: '#111', marginBottom: 24 }}>Shortlisted Talent</h3>
                  {shortlisted.length === 0 ? (
                    <p style={{ fontSize: 14, color: T.t3, lineHeight: 1.6 }}>Aapne abhi tak kisi creator ko shortlist nahi kiya hai. Discovery engine use karein.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                       {shortlisted.slice(0, 5).map(c => (
                         <div key={c.id} onClick={() => go('creator-profile', { creator: c })} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                            <img src={c.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}`} style={{ width: 44, height: 44, borderRadius: 12, objectFit: 'cover' }} alt="" />
                            <div>
                               <p style={{ fontSize: 14, fontWeight: 800, color: '#111' }}>{c.name}</p>
                               <p style={{ fontSize: 12, color: T.t3 }}>{fmt.num(c.followers)} Followers • {typeof c.city === 'object' ? c.city.name : (c.city || 'Bharat')}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                  )}
                  <Btn full variant="outline" style={{ marginTop: 24 }} onClick={() => go('creators')}>Discover More Creators</Btn>
               </Card>

               <Card style={{ padding: '32px', background: '#111', color: '#fff' }}>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 900, marginBottom: 12 }}>Bharat AI Assistant</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 24, lineHeight: 1.6 }}>Need help finding the right creator for your specific niche? Let our AI suggest the best match.</p>
                  <Btn full variant="white">Ask AI Assistant</Btn>
               </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
