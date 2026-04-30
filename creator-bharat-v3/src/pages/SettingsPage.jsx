import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop } from '../theme';
import { Btn, Card, Fld, Empty } from '../components/Primitives';

export default function SettingsPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [tab, setTab] = useState('profile');
  const c = st.creatorProfile;
  const [F, setF] = useState({ name: c?.name || '', bio: c?.bio || '', city: c?.city || '', state: c?.state || '', instagram: c?.instagram || '', youtube: c?.youtube || '', rateMin: c?.rateMin || '', rateMax: c?.rateMax || '' });

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const upF = (k, v) => setF(p => ({ ...p, [k]: v }));
  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });

  if (!st.user) return <div style={{ ...W(), padding: '80px 20px' }}><Empty icon="🔒" title="Login required" ctaLabel="Login" onCta={() => dsp({ t: 'UI', v: { authModal: true } })} /></div>;

  const saveProfile = () => {
    if (st.role === 'creator' && c) {
      dsp({ t: 'UPD_CP', id: c.id, patch: F });
      toast('Profile saved!', 'success');
    }
  };

  return (
    <div style={{ background: '#fff' }}>
      <div style={{ background: T.n8, padding: mob ? '32px 20px' : '48px 20px' }}>
        <div style={W(800)}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginBottom: 4, textTransform: 'uppercase' }}>Account</p>
          <h1 style={{ fontSize: 28, color: '#fff' }}>Settings</h1>
        </div>
      </div>
      <div style={{ padding: mob ? '24px 20px' : '40px 20px', background: T.bg2 }}>
        <div style={W(800)}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, overflowX: 'auto' }}>
            {[['profile', 'Profile'], ['account', 'Account'], ['privacy', 'Privacy']].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} style={{ padding: '10px 20px', borderRadius: 10, background: tab === id ? T.gd : '#fff', color: tab === id ? '#fff' : T.t2, border: '1px solid ' + T.bd, fontWeight: 700, cursor: 'pointer' }}>{label}</button>
            ))}
          </div>

          {tab === 'profile' && (
            <Card style={{ padding: '28px' }}>
              <h3 style={{ fontSize: 18, color: T.n8, marginBottom: 20 }}>Edit Profile</h3>
              <Fld label="Full Name" value={F.name} onChange={e => upF('name', e.target.value)} />
              <Fld label="Bio" value={F.bio} onChange={e => upF('bio', e.target.value)} rows={4} placeholder="Tell brands about yourself..." />
              <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 14 }}>
                <Fld label="City" value={F.city} onChange={e => upF('city', e.target.value)} />
                <Fld label="State" value={F.state} onChange={e => upF('state', e.target.value)} />
                <Fld label="Instagram" value={F.instagram} onChange={e => upF('instagram', e.target.value)} placeholder="@handle" />
                <Fld label="YouTube" value={F.youtube} onChange={e => upF('youtube', e.target.value)} placeholder="Channel name" />
              </div>
              <Btn onClick={saveProfile}>Save Changes</Btn>
            </Card>
          )}

          {tab === 'account' && (
            <Card style={{ padding: '28px' }}>
              <h3 style={{ fontSize: 18, color: T.n8, marginBottom: 20 }}>Account Details</h3>
              <p style={{ fontSize: 14, color: T.t2, marginBottom: 6 }}>Email: {st.user.email}</p>
              <p style={{ fontSize: 14, color: T.t2, marginBottom: 24 }}>Role: {st.role}</p>
              <Btn variant="outline" onClick={() => { if (window.confirm('Logout?')) dsp({ t: 'LOGOUT' }) }}>Logout</Btn>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
