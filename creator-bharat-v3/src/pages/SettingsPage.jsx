import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, LS } from '../theme';
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
    <div style={{ background: '#FAFAFA', minHeight: '100vh', paddingBottom: 80 }}>
      {/* Premium Header */}
      <div style={{ background: '#050505', padding: mob ? '120px 20px 48px' : '160px 20px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(255,148,49,0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FF9431, #fff, #128807)' }} />
        
        <div style={W(800)}>
          <div style={{ position: 'relative', zIndex: 2 }}>
             <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Management Console</p>
             <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: mob ? 32 : 48, color: '#fff', fontWeight: 900 }}>Settings</h1>
          </div>
        </div>
      </div>

      <div style={{ marginTop: -40, position: 'relative', zIndex: 10 }}>
        <div style={W(800)}>
          <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: 32 }}>
             {/* Nav Tabs */}
             <div style={{ width: mob ? '100%' : 220, flexShrink: 0 }}>
                <Card style={{ padding: '12px', background: '#fff' }}>
                   {[
                     { id: 'profile', label: 'Public Profile', icon: '👤' },
                     { id: 'account', label: 'Account Security', icon: '🔒' },
                     { id: 'notifications', label: 'Notifications', icon: '🔔' },
                     { id: 'billing', label: 'Billing & Rates', icon: '💳' }
                   ].map(item => (
                     <button 
                       key={item.id} 
                       onClick={() => setTab(item.id)} 
                       style={{ width: '100%', padding: '14px 18px', borderRadius: 12, background: tab === item.id ? 'rgba(0,0,0,0.03)' : 'transparent', border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'all 0.2s' }}
                     >
                       <span style={{ fontSize: 18 }}>{item.icon}</span>
                       <span style={{ fontSize: 14, fontWeight: tab === item.id ? 800 : 500, color: tab === item.id ? '#111' : T.t3 }}>{item.label}</span>
                     </button>
                   ))}
                   <div style={{ margin: '12px 0', height: 1, background: 'rgba(0,0,0,0.05)' }} />
                   <button 
                      onClick={() => { if (window.confirm('Are you sure you want to logout?')) dsp({ t: 'LOGOUT' }) }} 
                      style={{ width: '100%', padding: '14px 18px', borderRadius: 12, background: 'transparent', border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', color: '#EF4444' }}
                   >
                      <span style={{ fontSize: 18 }}>🚪</span>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>Logout</span>
                   </button>
                </Card>
             </div>

             {/* Content Area */}
             <div style={{ flex: 1 }}>
                {tab === 'profile' && (
                  <Card style={{ padding: '32px', background: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                       <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 900, color: '#111' }}>Public Profile</h3>
                       <Bdg color="blue">LIVE ON SITE</Bdg>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32, padding: '24px', background: T.bg2, borderRadius: 24 }}>
                       <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#ccc', overflow: 'hidden', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                          <img src={c?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(st.user.name)}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                       </div>
                       <div>
                          <Btn sm variant="outline">Change Photo</Btn>
                          <p style={{ fontSize: 12, color: T.t3, marginTop: 8 }}>JPG, PNG or WebP. Max 2MB.</p>
                       </div>
                    </div>

                    <Fld label="Display Name" value={F.name} onChange={e => upF('name', e.target.value)} />
                    <Fld label="Creative Bio" value={F.bio} onChange={e => upF('bio', e.target.value)} rows={4} placeholder="Aapka introduction brands ke liye..." />
                    
                    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 20, marginBottom: 20 }}>
                      <Fld label="City" value={F.city} onChange={e => upF('city', e.target.value)} />
                      <Fld label="State" value={F.state} onChange={e => upF('state', e.target.value)} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 20 }}>
                      <Fld label="Instagram Handle" value={F.instagram} onChange={e => upF('instagram', e.target.value)} placeholder="@username" />
                      <Fld label="YouTube Channel" value={F.youtube} onChange={e => upF('youtube', e.target.value)} placeholder="Channel URL" />
                    </div>

                    <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                       <Btn lg full={mob} onClick={saveProfile} style={{ borderRadius: 100, padding: '16px 48px' }}>Save Profile Changes</Btn>
                    </div>
                  </Card>
                )}

                {tab === 'account' && (
                  <Card style={{ padding: '32px', background: '#fff' }}>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 900, color: '#111', marginBottom: 32 }}>Account Security</h3>
                    
                    <div style={{ marginBottom: 32 }}>
                       <p style={{ fontSize: 14, fontWeight: 700, color: T.t3, marginBottom: 12 }}>LOGIN EMAIL</p>
                       <div style={{ padding: '16px 20px', background: T.bg2, borderRadius: 12, border: '1px solid rgba(0,0,0,0.05)', fontSize: 15, fontWeight: 700, color: '#111' }}>
                          {st.user.email}
                       </div>
                    </div>

                    <div style={{ padding: '24px', background: 'rgba(239,68,68,0.03)', borderRadius: 24, border: '1px solid rgba(239,68,68,0.1)' }}>
                       <h4 style={{ fontSize: 16, fontWeight: 900, color: '#EF4444', marginBottom: 8 }}>Danger Zone</h4>
                       <p style={{ fontSize: 14, color: T.t2, marginBottom: 20 }}>Account delete karne se aapka saara data permanent delete ho jayega.</p>
                       <Btn variant="outline" style={{ color: '#EF4444', borderColor: 'rgba(239,68,68,0.2)' }}>Delete Account</Btn>
                    </div>
                  </Card>
                )}

                {tab === 'billing' && (
                  <Card style={{ padding: '32px', background: '#fff' }}>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 900, color: '#111', marginBottom: 32 }}>Commercial Settings</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                       <Fld label="Minimum Rate (₹)" type="number" value={F.rateMin} onChange={e => upF('rateMin', e.target.value)} />
                       <Fld label="Maximum Rate (₹)" type="number" value={F.rateMax} onChange={e => upF('rateMax', e.target.value)} />
                    </div>
                    <Btn onClick={saveProfile}>Update Rates</Btn>
                  </Card>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
