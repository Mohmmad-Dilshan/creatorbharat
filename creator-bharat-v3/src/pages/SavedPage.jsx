import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, apiCall, LS } from '../theme';
import { SH, Empty, Chip } from '../components/Primitives';
import { CreatorCard, CampCard } from '../components/Cards';

export default function SavedPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [tab, setTab] = useState('creators');
  const [allC, setAllC] = useState([]);
  const [allCp, setAllCp] = useState([]);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    apiCall('/creators?limit=100').then(d => setAllC(d.creators || [])).catch(console.error);
    apiCall('/campaigns?limit=100').then(d => setAllCp(d.campaigns || [])).catch(console.error);
    return () => window.removeEventListener('resize', h);
  }, []);

  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };
  const savedCreators = allC.filter(c => st.saved.includes(c.id));
  const savedCamps = allCp.filter(c => st.saved.includes(c.id));

  return (
    <div style={{ background: '#fff' }}>
      <div style={{ background: T.n8, padding: mob ? '32px 20px' : '48px 20px' }}>
        <div style={W()}><SH eyebrow="Saved" title="Your Saved Items" light mb={0} /></div>
      </div>
      <div style={{ padding: mob ? '24px 20px' : '36px 20px', background: T.bg2, minHeight: '70vh' }}>
        <div style={W()}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <button onClick={() => setTab('creators')} style={{ padding: '10px 20px', borderRadius: 30, background: tab === 'creators' ? T.gd : '#fff', color: tab === 'creators' ? '#fff' : T.t2, border: '1px solid ' + T.bd, fontWeight: 700, cursor: 'pointer' }}>Creators ({savedCreators.length})</button>
            <button onClick={() => setTab('campaigns')} style={{ padding: '10px 20px', borderRadius: 30, background: tab === 'campaigns' ? T.gd : '#fff', color: tab === 'campaigns' ? '#fff' : T.t2, border: '1px solid ' + T.bd, fontWeight: 700, cursor: 'pointer' }}>Campaigns ({savedCamps.length})</button>
          </div>

          {tab === 'creators' && (savedCreators.length === 0 ? <Empty icon="♡" title="No saved creators" sub="Heart-save creators while browsing to see them here." ctaLabel="Browse Creators" onCta={() => go('creators')} /> :
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
              {savedCreators.map(c => <CreatorCard key={c.id} creator={c} onView={cr => go('creator-profile', { creator: cr })} />)}
            </div>)}

          {tab === 'campaigns' && (savedCamps.length === 0 ? <Empty icon="📋" title="No saved campaigns" sub="Save campaigns to apply later." ctaLabel="Browse Campaigns" onCta={() => go('campaigns')} /> :
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill,minmax(300px,1fr))', gap: 20 }}>
              {savedCamps.map(c => <CampCard key={c.id} campaign={c} onApply={() => { }} />)}
            </div>)}
        </div>
      </div>
    </div>
  );
}
