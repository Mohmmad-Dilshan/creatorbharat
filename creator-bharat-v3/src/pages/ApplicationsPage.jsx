import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { W, scrollToTop, LS, fmt } from '../utils/helpers';
import { Card, Bdg, Empty } from '../components/Primitives';
import EliteHeader from '../components/layout/EliteHeader';

export default function ApplicationsPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
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
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: 80 }}>
      <EliteHeader 
        eyebrow="Mission Tracking"
        title="My Applications"
        sub="Monitor your collaboration status and deal progression."
        gradient="saffron"
        light={true}
        compact
      />

      <div style={{ padding: '16px 20px', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.04)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={W(900)}>
           <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 2 }}>
              <button 
                onClick={() => setFilter('')} 
                style={{ padding: '8px 16px', borderRadius: 100, border: 'none', background: filter === '' ? '#111' : '#f1f5f9', color: filter === '' ? '#fff' : '#64748b', fontSize: 11, fontWeight: 900, cursor: 'pointer', transition: '0.2s' }}
              >
                ALL
              </button>
              {['shortlisted', 'selected', 'rejected'].map(s => (
                <button 
                  key={s} 
                  onClick={() => setFilter(filter === s ? '' : s)} 
                  style={{ padding: '8px 16px', borderRadius: 100, border: 'none', background: filter === s ? '#111' : '#f1f5f9', color: filter === s ? '#fff' : '#64748b', fontSize: 11, fontWeight: 900, cursor: 'pointer', transition: '0.2s' }}
                >
                  {s.toUpperCase()}
                </button>
              ))}
           </div>
        </div>
      </div>

      <div style={{ padding: mob ? '24px 16px' : '40px 20px' }}>
        <div style={W(900)}>
          {filtered.length === 0 ? (
            <div style={{ padding: '40px 0' }}>
               <Empty icon="📋" title="No Applications Found" sub="You haven't applied to any missions matching this status." ctaLabel="Explore Missions" onCta={() => go('campaigns')} />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {filtered.map((a, i) => (
                <Card key={a.id} style={{ padding: '24px', background: '#fff', borderRadius: 24, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                    <div style={{ flex: 1, minWidth: 280 }}>
                      <p style={{ fontSize: 12, fontWeight: 800, color: '#FF9431', marginBottom: 4, textTransform: 'uppercase' }}>{typeof a.brand === 'object' && a.brand ? a.brand.companyName : a.brand}</p>
                      <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 900, color: '#111', marginBottom: 12 }}>{a.campaignTitle}</h4>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                             <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 800 }}>DATE:</span>
                             <span style={{ fontSize: 13, color: '#111', fontWeight: 700 }}>{fmt.date(a.date)}</span>
                          </div>
                          <div style={{ width: 1, height: 12, background: '#e2e8f0' }} />
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                             <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 800 }}>BID:</span>
                             <span style={{ fontSize: 13, color: '#10B981', fontWeight: 800 }}>{fmt.inr(a.rate || 0)}</span>
                          </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: mob ? 'flex-start' : 'flex-end' }}>
                       <Bdg sm color={STATUS_COLORS[a.status || 'applied']}>
                          { (a.status || 'applied').toUpperCase() }
                       </Bdg>
                       <button 
                         onClick={() => go('campaigns')}
                         style={{ background: 'none', border: 'none', color: '#3B82F6', fontSize: 12, fontWeight: 800, cursor: 'pointer', padding: 0 }}
                       >
                         View Details →
                       </button>
                    </div>
                  </div>
                  
                  {a.pitch && (
                    <div style={{ marginTop: 20, padding: '16px', background: '#F8FAFC', borderRadius: 16, border: '1px solid rgba(0,0,0,0.02)', position: 'relative' }}>
                       <div style={{ position: 'absolute', top: -8, left: 12, background: '#fff', padding: '0 8px', fontSize: 10, fontWeight: 900, color: '#cbd5e1' }}>MY PITCH</div>
                       <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5, fontWeight: 500 }}>"{a.pitch}"</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
