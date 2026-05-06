import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, LS, fmt } from '../utils/helpers';
import { SH, Card, Bdg, Chip, Empty, Btn } from '../components/Primitives';
import EliteHeader from '../components/layout/EliteHeader';

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

  if (!st.user || st.role !== 'creator') return (
    <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}>
       <Empty icon="🔒" title="Access Locked" sub="Login as a creator to view your deal history." ctaLabel="Sign In Now" onCta={() => dsp({ t: 'UI', v: { authModal: true } })} />
    </div>
  );

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh', paddingBottom: 80 }}>
      {/* Elite Applications Header */}
      <EliteHeader 
        eyebrow="History & Status"
        title="My Applications"
        sub="Track your collaboration history and deal status in real-time."
        gradient="saffron"
      />

      <div style={{ padding: '24px 20px', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.05)', position: 'sticky', top: 80, zIndex: 100 }}>
        <div style={W()}>
           <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
              <Chip label="All Applications" active={!filter} onClick={() => setFilter('')} />
              {['applied', 'shortlisted', 'selected', 'rejected'].map(s => (
                <Chip key={s} label={s.toUpperCase()} active={filter === s} onClick={() => setFilter(filter === s ? '' : s)} />
              ))}
           </div>
        </div>
      </div>

      <div style={{ padding: mob ? '32px 20px' : '48px 20px' }}>
        <div style={W(900)}>
          {filtered.length === 0 ? (
            <div style={{ padding: '60px 0' }}>
               <Empty icon="📋" title="No matching applications" sub="Aapne abhi tak koi application nahi bheja hai ya filter match nahi kar raha." ctaLabel="Browse Latest Campaigns" onCta={() => go('campaigns')} />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {filtered.map((a, i) => (
                <Card key={a.id} className="au" style={{ padding: '32px', background: '#fff', border: '1px solid rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 800, color: '#FF9431', marginBottom: 8 }}>{typeof a.brand === 'object' && a.brand ? a.brand.companyName : a.brand}</p>
                      <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 900, color: '#111', marginBottom: 12 }}>{a.campaignTitle}</h4>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 13, color: T.t4, fontWeight: 700 }}>APPLIED ON:</span>
                            <span style={{ fontSize: 14, color: '#111', fontWeight: 800 }}>{fmt.date(a.date)}</span>
                         </div>
                         <div style={{ width: 1, height: 16, background: 'rgba(0,0,0,0.05)' }} />
                         <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 13, color: T.t4, fontWeight: 700 }}>BID:</span>
                            <span style={{ fontSize: 14, color: '#10B981', fontWeight: 900 }}>{fmt.inr(a.rate || 0)}</span>
                         </div>
                      </div>
                      
                      {a.pitch && (
                        <div style={{ marginTop: 20, padding: '16px', background: '#F8FAFC', borderRadius: 16, border: '1px solid rgba(0,0,0,0.02)' }}>
                           <p style={{ fontSize: 14, color: T.t2, lineHeight: 1.6, fontStyle: 'italic' }}>"{a.pitch}"</p>
                        </div>
                      )}
                    </div>
                    
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
                       <Bdg color={STATUS_COLORS[a.status || 'applied']}>
                          { (a.status || 'applied').toUpperCase() }
                       </Bdg>
                       <Btn variant="outline" sm onClick={() => go('campaigns')}>View Detail</Btn>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
