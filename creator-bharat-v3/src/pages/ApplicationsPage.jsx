import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, LS, fmt } from '../theme';
import { SH, Card, Bdg, Chip, Empty } from '../components/Primitives';

export default function ApplicationsPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const go = (p) => { dsp({ t: 'GO', p }); scrollToTop(); };
  const myApps = LS.get('cb_applications', []).filter(a => a.applicantEmail === st.user?.email);
  const filtered = filter ? myApps.filter(a => (a.status || 'applied') === filter) : myApps;
  const STATUS_COLORS = { applied: 'blue', 'under-review': 'yellow', shortlisted: 'purple', selected: 'green', rejected: 'red' };

  if (!st.user || st.role !== 'creator') return <div style={{ ...W(), padding: '80px 20px' }}><Empty icon="🔒" title="Login required" ctaLabel="Login" onCta={() => dsp({ t: 'UI', v: { authModal: true } })} /></div>;

  return (
    <div style={{ background: '#fff' }}>
      <div style={{ background: T.n8, padding: mob ? '32px 20px' : '48px 20px' }}>
        <div style={W()}><SH eyebrow="My Applications" title={`${myApps.length} Applications`} light mb={0} /></div>
      </div>
      <div style={{ padding: '16px 20px', background: T.bg2, borderBottom: `1px solid ${T.bd}` }}>
        <div style={W()}><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip label="All" active={!filter} onClick={() => setFilter('')} />
          {['applied', 'shortlisted', 'selected', 'rejected'].map(s => <Chip key={s} label={s.charAt(0).toUpperCase() + s.slice(1)} active={filter === s} onClick={() => setFilter(filter === s ? '' : s)} />)}
        </div></div>
      </div>
      <div style={{ padding: mob ? '24px 20px' : '36px 20px', background: T.bg2, minHeight: '60vh' }}>
        <div style={W()}>
          {filtered.length === 0 ? <Empty icon="📋" title="No applications" sub="Apply to campaigns to see them here." ctaLabel="Browse Campaigns" onCta={() => go('campaigns')} /> :
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filtered.map(a => (
                <Card key={a.id} style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontWeight: 700, color: T.n8, fontSize: 15, marginBottom: 4 }}>{a.campaignTitle}</h4>
                      <p style={{ fontSize: 13, color: T.gd, fontWeight: 600, marginBottom: 6 }}>{typeof a.brand === 'object' && a.brand ? a.brand.companyName : a.brand}</p>
                      <p style={{ fontSize: 12, color: T.t3 }}>{fmt.date(a.date)}</p>
                    </div>
                    <Bdg color={STATUS_COLORS[a.status || 'applied']}>{(a.status || 'applied').replace('-', ' ')}</Bdg>
                  </div>
                  {a.pitch && <p style={{ fontSize: 13, color: T.t2, marginTop: 10, lineHeight: 1.6, fontStyle: 'italic', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>"{a.pitch}"</p>}
                </Card>
              ))}
            </div>}
        </div>
      </div>
    </div>
  );
}
