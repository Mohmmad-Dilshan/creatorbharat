import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../core/context';
import { W, scrollToTop, LS } from '../../utils/helpers';
import { apiCall } from '../../utils/api';
import { Empty } from '../../components/common/Primitives';
import { CreatorCard, CampCard } from '../../components/common/Cards';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Heart } from 'lucide-react';

// Sub-Component: Saved Creators Grid
function SavedCreatorsGrid({ savedCreators, selectedIds, toggleSelect, go, mob }) {
  if (savedCreators.length === 0) {
    return (
      <div style={{ padding: '80px 0' }}>
        <Empty 
          icon="❤️" 
          title="No saved creators" 
          sub="Explore Bharat's talent and heart-save your favorites to find them later." 
          ctaLabel="Discover Creators" 
          onCta={() => go('creators')} 
        />
      </div>
    );
  }

  return (
    <div className="au" style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
      {savedCreators.map((c, i) => {
        const isSelected = selectedIds.includes(c.id);
        return (
          <div key={c.id} className={`au d${(i % 5) + 1}`} style={{ position: 'relative' }}>
            {/* Checkbox Overlay */}
            <button 
              onClick={() => toggleSelect(c.id)}
              style={{
                position: 'absolute',
                top: 16,
                left: 16,
                zIndex: 10,
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: isSelected ? '#FF9431' : '#ffffff',
                border: isSelected ? 'none' : '2px solid #cbd5e1',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                color: '#ffffff',
                transition: 'all 0.2s ease'
              }}
            >
              {isSelected && <Check size={14} strokeWidth={4} />}
            </button>
            
            <div style={{ opacity: isSelected ? 0.85 : 1, transition: 'opacity 0.2s' }}>
              <CreatorCard creator={c} onView={cr => go('creator-profile', { creator: cr })} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

SavedCreatorsGrid.propTypes = {
  savedCreators: PropTypes.array.isRequired,
  selectedIds: PropTypes.array.isRequired,
  toggleSelect: PropTypes.func.isRequired,
  go: PropTypes.func.isRequired,
  mob: PropTypes.bool.isRequired
};

// Sub-Component: Saved Campaigns Grid
function SavedCampaignsGrid({ savedCamps, selectedIds, toggleSelect, go, mob }) {
  if (savedCamps.length === 0) {
    return (
      <div style={{ padding: '80px 0' }}>
        <Empty 
          icon="📋" 
          title="No saved campaigns" 
          sub="Save interesting deals to apply when you have the perfect pitch ready." 
          ctaLabel="Browse Campaigns" 
          onCta={() => go('campaigns')} 
        />
      </div>
    );
  }

  return (
    <div className="au" style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', gap: 24 }}>
      {savedCamps.map((c, i) => {
        const isSelected = selectedIds.includes(c.id);
        return (
          <div key={c.id} className={`au d${(i % 5) + 1}`} style={{ position: 'relative' }}>
            {/* Checkbox Overlay */}
            <button 
              onClick={() => toggleSelect(c.id)}
              style={{
                position: 'absolute',
                top: 20,
                left: 20,
                zIndex: 10,
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: isSelected ? '#FF9431' : '#ffffff',
                border: isSelected ? 'none' : '2px solid #cbd5e1',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                color: '#ffffff',
                transition: 'all 0.2s ease'
              }}
            >
              {isSelected && <Check size={14} strokeWidth={4} />}
            </button>

            <div style={{ opacity: isSelected ? 0.85 : 1, transition: 'opacity 0.2s' }}>
              <CampCard campaign={c} onApply={() => go('campaigns')} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

SavedCampaignsGrid.propTypes = {
  savedCamps: PropTypes.array.isRequired,
  selectedIds: PropTypes.array.isRequired,
  toggleSelect: PropTypes.func.isRequired,
  go: PropTypes.func.isRequired,
  mob: PropTypes.bool.isRequired
};

// Main Component
export default function SavedPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [tab, setTab] = useState('creators');
  const [allC, setAllC] = useState([]);
  const [allCp, setAllCp] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    
    // Fetch data with fallbacks
    apiCall('/creators?limit=100').then(d => setAllC(d.creators || d || [])).catch(() => setAllC(LS.get('cb_creators', [])));
    apiCall('/campaigns?limit=100').then(d => setAllCp(d.campaigns || d || [])).catch(() => setAllCp(LS.get('cb_campaigns', [])));
    
    return () => window.removeEventListener('resize', h);
  }, []);

  // Clear selections on tab switch
  useEffect(() => {
    setSelectedIds([]);
  }, [tab]);

  const go = (p, sel) => {
    if (sel) dsp({ t: 'GO', p, sel });
    if (p === 'creator-profile') {
      const creator = sel?.creator || sel;
      navigate(`/creator/${creator?.handle || creator?.id || ''}`);
    } else {
      navigate(`/${p}`);
    }
    scrollToTop();
  };

  const savedCreators = allC.filter(c => st.saved.includes(c.id));
  const savedCamps = allCp.filter(c => st.saved.includes(c.id));

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleBulkUnsave = () => {
    selectedIds.forEach(id => {
      dsp({ t: 'SAVE', id });
    });
    const count = selectedIds.length;
    setSelectedIds([]);
    dsp({ t: 'TOAST', d: { type: 'success', msg: `Successfully unsaved ${count} items from library!` } });
  };

  const handleBulkApply = () => {
    selectedIds.forEach(id => {
      dsp({ t: 'APPLY', id });
    });
    const count = selectedIds.length;
    setSelectedIds([]);
    dsp({ t: 'TOAST', d: { type: 'success', msg: `Applied to ${count} campaigns in bulk!` } });
  };

  // Precalculate values to remove nested ternary from JSX
  const currentTotal = tab === 'creators' ? savedCreators.length : savedCamps.length;
  const isAllSelected = selectedIds.length === currentTotal;
  const selectAllLabel = isAllSelected ? 'Deselect All' : 'Select All';

  return (
    <div style={{ background: '#fff', minHeight: '100vh', paddingBottom: 120 }}>
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
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 12 }}>
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
              
              {/* Select All Utility */}
              {((tab === 'creators' && savedCreators.length > 0) || (tab === 'campaigns' && savedCamps.length > 0)) && (
                <button 
                  onClick={() => {
                    const currentList = tab === 'creators' ? savedCreators : savedCamps;
                    if (selectedIds.length === currentList.length) {
                      setSelectedIds([]);
                    } else {
                      setSelectedIds(currentList.map(item => item.id));
                    }
                  }}
                  style={{ background: 'none', border: 'none', color: '#FF9431', fontWeight: 850, fontSize: 13, cursor: 'pointer' }}
                >
                  {selectAllLabel}
                </button>
              )}
           </div>
        </div>
      </div>

      <div style={{ padding: mob ? '32px 20px' : '60px 20px', background: '#FAFAFA' }}>
        <div style={W()}>
          {tab === 'creators' ? (
            <SavedCreatorsGrid 
              savedCreators={savedCreators}
              selectedIds={selectedIds}
              toggleSelect={toggleSelect}
              go={go}
              mob={mob}
            />
          ) : (
            <SavedCampaignsGrid 
              savedCamps={savedCamps}
              selectedIds={selectedIds}
              toggleSelect={toggleSelect}
              go={go}
              mob={mob}
            />
          )}
        </div>
      </div>

      {/* FLOATING GLASSMORPHIC BULK OPERATIONS PANEL */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            style={{
              position: 'fixed',
              bottom: 24,
              left: '50%',
              zIndex: 1000,
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '16px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 40,
              boxShadow: '0 20px 50px rgba(15, 23, 42, 0.3)',
              width: mob ? '90%' : 'auto',
              maxWidth: '90%'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
               <div style={{ display: 'grid', placeItems: 'center', background: 'rgba(255, 148, 49, 0.1)', color: '#FF9431', padding: 8, borderRadius: '50%' }}>
                  <Heart size={16} fill="#FF9431" />
               </div>
               <span style={{ fontSize: 14, fontWeight: 800, color: '#ffffff' }}>
                  {selectedIds.length} {selectedIds.length === 1 ? 'item' : 'items'} selected
               </span>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
               <button
                 onClick={handleBulkUnsave}
                 style={{
                   background: 'rgba(239, 68, 68, 0.1)',
                   border: '1px solid rgba(239, 68, 68, 0.2)',
                   color: '#f87171',
                   fontSize: 13,
                   fontWeight: 850,
                   padding: '10px 20px',
                   borderRadius: '12px',
                   cursor: 'pointer',
                   transition: 'all 0.2s ease'
                 }}
               >
                  Unsave
               </button>
               
               {tab === 'campaigns' && (
                 <button
                   onClick={handleBulkApply}
                   style={{
                     background: '#FF9431',
                     border: 'none',
                     color: '#ffffff',
                     fontSize: 13,
                     fontWeight: 900,
                     padding: '10px 20px',
                     borderRadius: '12px',
                     cursor: 'pointer',
                     boxShadow: '0 4px 12px rgba(255, 148, 49, 0.2)',
                     transition: 'all 0.2s ease'
                   }}
                 >
                    Apply in Bulk
                 </button>
               )}
               
               <button 
                 onClick={() => setSelectedIds([])}
                 style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
               >
                  Cancel
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
