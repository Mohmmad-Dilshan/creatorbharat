import React, { useState, useEffect } from 'react';
import { useApp } from '../../context';
import { W, scrollToTop, LS } from '../../utils/helpers';
import { apiCall } from '../../utils/api';
import { Empty } from '../../components/Primitives';
import { CreatorCard, CampCard } from '../../components/Cards';

export default function SavedPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [tab, setTab] = useState('creators');
  const [allC, setAllC] = useState([]);
  const [allCp, setAllCp] = useState([]);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    
    // Fetch data with fallbacks
    apiCall('/creators?limit=100').then(d => setAllC(d.creators || d || [])).catch(() => setAllC(LS.get('cb_creators', [])));
    apiCall('/campaigns?limit=100').then(d => setAllCp(d.campaigns || d || [])).catch(() => setAllCp(LS.get('cb_campaigns', [])));
    
    return () => window.removeEventListener('resize', h);
  }, []);

  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };
  const savedCreators = allC.filter(c => st.saved.includes(c.id));
  const savedCamps = allCp.filter(c => st.saved.includes(c.id));

  return (
    <div style={{ background: '#fff', minHeight: '100vh', paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ background: '#050505', padding: mob ? '120px 20px 48px' : '160px 20px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 70%, rgba(255,148,49,0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FF9431, #fff, #128807)' }} />
        
        <div style={W()}>
          <div style={{ position: 'relative', zIndex: 2 }}>
             <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Personal Collection</p>
             <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 32 : 48, color: '#fff', fontWeight: 900 }}>Saved Library</h1>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 20px', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.05)', position: 'sticky', top: 80, zIndex: 100 }}>
        <div style={W()}>
           <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
              <button 
                onClick={() => setTab('creators')} 
                style={{ 
                  padding: '12px 28px', 
                  borderRadius: 100, 
                  border: 'none', 
                  background: tab === 'creators' ? '#111' : '#F3F4F6', 
                  color: tab === 'creators' ? '#fff' : '#111', 
                  fontWeight: 800, 
                  fontSize: 14, 
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Creators ({savedCreators.length})
              </button>
              <button 
                onClick={() => setTab('campaigns')} 
                style={{ 
                  padding: '12px 28px', 
                  borderRadius: 100, 
                  border: 'none', 
                  background: tab === 'campaigns' ? '#111' : '#F3F4F6', 
                  color: tab === 'campaigns' ? '#fff' : '#111', 
                  fontWeight: 800, 
                  fontSize: 14, 
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Campaigns ({savedCamps.length})
              </button>
           </div>
        </div>
      </div>

      <div style={{ padding: mob ? '32px 20px' : '60px 20px', background: '#FAFAFA' }}>
        <div style={W()}>
          {tab === 'creators' && (
            savedCreators.length === 0 ? (
               <div style={{ padding: '80px 0' }}>
                  <Empty icon="❤️" title="No saved creators" sub="Explore Bharat's talent and heart-save your favorites to find them later." ctaLabel="Discover Creators" onCta={() => go('creators')} />
               </div>
            ) : (
              <div className="au" style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
                {savedCreators.map((c, i) => (
                   <div key={c.id} className={`au d${(i % 5) + 1}`}>
                      <CreatorCard creator={c} onView={cr => go('creator-profile', { creator: cr })} />
                   </div>
                ))}
              </div>
            )
          )}

          {tab === 'campaigns' && (
            savedCamps.length === 0 ? (
               <div style={{ padding: '80px 0' }}>
                  <Empty icon="📋" title="No saved campaigns" sub="Save interesting deals to apply when you have the perfect pitch ready." ctaLabel="Browse Campaigns" onCta={() => go('campaigns')} />
               </div>
            ) : (
              <div className="au" style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', gap: 24 }}>
                {savedCamps.map((c, i) => (
                   <div key={c.id} className={`au d${(i % 5) + 1}`}>
                      <CampCard campaign={c} onApply={() => go('campaigns')} />
                   </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
