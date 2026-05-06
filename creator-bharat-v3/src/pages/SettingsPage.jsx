import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, LS } from '../utils/helpers';
import { Btn, Card, Fld, Empty, Bdg } from '../components/Primitives';

export default function SettingsPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [tab, setTab] = useState('profile');
  const c = st.creatorProfile;
  const [F, setF] = useState({ 
    name: c?.name || '', 
    bio: c?.bio || '', 
    city: c?.city || '', 
    state: c?.state || '', 
    instagram: c?.instagram || '', 
    youtube: c?.youtube || '', 
    rateMin: c?.rateMin || '', 
    rateMax: c?.rateMax || '' 
  });

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const upF = (k, v) => setF(p => ({ ...p, [k]: v }));
  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });

  if (!st.user) return (
    <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}>
      <Empty icon="🔒" title="Identity Required" sub="Settings change karne ke liye login kerna zaroori hai." ctaLabel="Login Now" onCta={() => dsp({ t: 'UI', v: { authModal: true } })} />
    </div>
  );

  const saveProfile = () => {
    if (st.role === 'creator' && c) {
      dsp({ t: 'UPD_CP', id: c.id, patch: F });
      
      // Update persistent storage
      const allC = LS.get('cb_creators', []);
      const updated = allC.map(cr => cr.id === c.id ? { ...cr, ...F } : cr);
      LS.set('cb_creators', updated);
      
      toast('Profile updated successfully!', 'success');
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: 80 }}>
      <EliteHeader 
        eyebrow="Console Management"
        title="Settings"
        sub="Control your identity, security, and commercial configurations."
        gradient="saffron"
        light={true}
        compact
      />

      <div style={{ marginTop: -40, position: 'relative', zIndex: 10 }}>
        <div style={W(1100)}>
          <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: 24, padding: mob ? '0 16px' : 0 }}>
             {/* Sidebar Navigation */}
             <div style={{ width: mob ? '100%' : 260, flexShrink: 0 }}>
                <Card style={{ padding: '12px', background: '#fff', borderRadius: 24, border: '1px solid rgba(0,0,0,0.04)' }}>
                   {[
                     { id: 'profile', label: 'Identity Profile', icon: '👤' },
                     { id: 'billing', label: 'Commercials', icon: '💰' },
                     { id: 'account', label: 'Security', icon: '🔒' }
                   ].map(item => (
                     <button 
                       key={item.id} 
                       onClick={() => setTab(item.id)} 
                       style={{ 
                         width: '100%', padding: '12px 16px', borderRadius: 12, 
                         background: tab === item.id ? '#111' : 'transparent', 
                         border: 'none', textAlign: 'left', display: 'flex', 
                         alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'all 0.2s' 
                       }}
                     >
                       <span style={{ fontSize: 16 }}>{item.icon}</span>
                       <span style={{ fontSize: 13, fontWeight: tab === item.id ? 800 : 600, color: tab === item.id ? '#fff' : '#64748b' }}>{item.label}</span>
                     </button>
                   ))}
                   <div style={{ margin: '12px 0', height: 1, background: 'rgba(0,0,0,0.04)' }} />
                   <button 
                      onClick={() => { if (window.confirm('Are you sure you want to logout?')) dsp({ t: 'LOGOUT' }) }} 
                      style={{ width: '100%', padding: '12px 16px', borderRadius: 12, background: 'transparent', border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', color: '#EF4444', fontSize: 13, fontWeight: 700 }}
                   >
                      <span style={{ fontSize: 16 }}>🚪</span>
                      <span>Logout Account</span>
                   </button>
                </Card>
             </div>

             {/* Content Area */}
             <div style={{ flex: 1 }}>
                {tab === 'profile' && (
                  <Card style={{ padding: mob ? '24px' : '32px', background: '#fff', borderRadius: 28, border: '1px solid rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                       <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 900, color: '#111' }}>Identity Profile</h3>
                       <Bdg sm color="blue">ELITE VERIFIED</Bdg>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32, padding: '20px', background: '#f8fafc', borderRadius: 20, border: '1px solid rgba(0,0,0,0.02)' }}>
                       <div style={{ width: 64, height: 64, borderRadius: 16, background: '#e2e8f0', overflow: 'hidden', border: '2px solid #fff' }}>
                          <img src={c?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(st.user.name)}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                       </div>
                       <div>
                          <button style={{ background: '#111', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 8, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>CHANGE PHOTO</button>
                          <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 6, fontWeight: 600 }}>Recommended: 400x400px (Max 2MB)</p>
                       </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      <Fld label="Display Name" value={F.name} onChange={e => upF('name', e.target.value)} />
                      <Fld label="Creative Bio" value={F.bio} onChange={e => upF('bio', e.target.value)} rows={4} placeholder="Your story for potential brand partners..." />
                      
                      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 20 }}>
                        <Fld label="City / Region" value={F.city} onChange={e => upF('city', e.target.value)} />
                        <Fld label="State" value={F.state} onChange={e => upF('state', e.target.value)} />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 20 }}>
                        <Fld label="Instagram ID" value={F.instagram} onChange={e => upF('instagram', e.target.value)} placeholder="@username" />
                        <Fld label="YouTube Link" value={F.youtube} onChange={e => upF('youtube', e.target.value)} placeholder="Channel URL" />
                      </div>
                    </div>

                    <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'flex-end' }}>
                       <Btn lg full={mob} onClick={saveProfile} style={{ borderRadius: 100, background: '#111', color: '#fff', padding: '14px 40px', fontSize: 14 }}>Deploy Changes</Btn>
                    </div>
                  </Card>
                )}

                {tab === 'billing' && (
                  <Card style={{ padding: '32px', background: '#fff', borderRadius: 28 }}>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 900, color: '#111', marginBottom: 32 }}>Commercial Settings</h3>
                    <p style={{ fontSize: 14, color: '#64748b', marginBottom: 32, lineHeight: 1.6 }}>Define your standard payout range. This helps brands filter their search based on their budget capacity.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
                       <Fld label="Minimum Rate (₹)" type="number" value={F.rateMin} onChange={e => upF('rateMin', e.target.value)} />
                       <Fld label="Maximum Rate (₹)" type="number" value={F.rateMax} onChange={e => upF('rateMax', e.target.value)} />
                    </div>
                    <Btn lg full onClick={saveProfile} style={{ borderRadius: 100, background: '#111', color: '#fff' }}>Sync Rates</Btn>
                  </Card>
                )}

                {tab === 'account' && (
                  <Card style={{ padding: '32px', background: '#fff', borderRadius: 28 }}>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 900, color: '#111', marginBottom: 32 }}>Security Center</h3>
                    
                    <div style={{ marginBottom: 40 }}>
                       <p style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', marginBottom: 10, textTransform: 'uppercase' }}>Verified Email</p>
                       <div style={{ padding: '14px 18px', background: '#f8fafc', borderRadius: 12, border: '1px solid rgba(0,0,0,0.04)', fontSize: 14, fontWeight: 700, color: '#111' }}>
                          {st.user.email}
                       </div>
                    </div>

                    <div style={{ padding: '24px', background: '#FEF2F2', borderRadius: 20, border: '1px solid #FECACA' }}>
                       <h4 style={{ fontSize: 16, fontWeight: 900, color: '#991B1B', marginBottom: 6 }}>Identity Removal</h4>
                       <p style={{ fontSize: 13, color: '#B91C1C', marginBottom: 20, opacity: 0.8 }}>Permanently delete your identity and all associated data from CreatorBharat. This cannot be undone.</p>
                       <button style={{ background: '#EF4444', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 10, fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>DELETE IDENTITY</button>
                    </div>
                  </Card>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
