import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Globe, Zap, Users, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { ALL_STATES, INDIA_STATES } from '../../utils/helpers';
import {
  InstagramIcon,
  YoutubeIcon,
  TwitterIcon,
  LinkedinIcon,
  FacebookIcon
} from '../icons/SocialIcons';

const LANGUAGES = [
  'Hindi', 'English', 'Bengali', 'Marathi', 'Telugu', 'Tamil', 'Gujarati', 'Urdu',
  'Kannada', 'Odia', 'Malayalam', 'Punjabi', 'Assamese', 'Maithili', 'Bhojpuri',
  'Rajasthani', 'Haryanvi', 'Tulu', 'Awadhi', 'Other',
];

const FOLLOWER_PRESETS = [
  { label: 'Any', value: '' },
  { label: '10K+', value: '10000' },
  { label: '50K+', value: '50000' },
  { label: '100K+', value: '100000' },
  { label: '500K+', value: '500000' },
  { label: '1M+', value: '1000000' },
];

const PLATFORMS_DATA = [
  { name: 'Instagram', icon: <InstagramIcon size={15} />, color: '#E4405F' },
  { name: 'YouTube',   icon: <YoutubeIcon size={15} />,   color: '#FF0000' },
  { name: 'Twitter',   icon: <TwitterIcon size={15} />,   color: '#1DA1F2' },
  { name: 'LinkedIn',  icon: <LinkedinIcon size={15} />,  color: '#0A66C2' },
  { name: 'Facebook',  icon: <FacebookIcon size={15} />,  color: '#1877F2' },
];

/* ─── Small reusable bits ───────────────────────────────────── */
const Label = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 950, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 12 }}>
    {children}
  </div>
);
Label.propTypes = { children: PropTypes.node };

const Chip = ({ label, active, onClick, color = '#FF9431', icon }) => (
  <button
    onClick={onClick}
    style={{
      padding: '7px 16px', borderRadius: 100, cursor: 'pointer',
      border: '1.5px solid ' + (active ? color : '#e2e8f0'),
      background: active ? color : '#fff',
      color: active ? '#fff' : '#475569',
      fontSize: 13, fontWeight: 800,
      display: 'flex', alignItems: 'center', gap: 6,
      transition: 'all 0.15s',
      boxShadow: active ? `0 4px 12px ${color}40` : 'none',
      whiteSpace: 'nowrap',
    }}
  >
    {icon}{label}
  </button>
);
Chip.propTypes = {
  label: PropTypes.string, active: PropTypes.bool,
  onClick: PropTypes.func, color: PropTypes.string, icon: PropTypes.node,
};

const SelectInput = ({ id, value, onChange, placeholder, options, icon, disabled }) => (
  <div style={{ position: 'relative' }}>
    <select
      id={id} value={value} onChange={onChange} disabled={disabled}
      style={{
        width: '100%', padding: '12px 40px 12px 14px', borderRadius: 12,
        border: '1.5px solid #e2e8f0', fontSize: 14, fontWeight: 700,
        background: disabled ? '#f1f5f9' : '#f8fafc', outline: 'none',
        appearance: 'none', color: value ? '#0f172a' : '#64748b',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1,
      }}
    >
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
    </select>
    <div style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8', display: 'flex' }}>
      {icon}
    </div>
  </div>
);
SelectInput.propTypes = {
  id: PropTypes.string, value: PropTypes.string, onChange: PropTypes.func,
  placeholder: PropTypes.string, options: PropTypes.array,
  icon: PropTypes.node, disabled: PropTypes.bool,
};

/* ─── Main FilterSidebar ────────────────────────────────────── */
export default function FilterSidebar({ show, onClose, f, dsp, mob, niches }) {
  const clearFilters = () => dsp({
    t: 'CF', v: {
      q: '', niche: [], state: '', district: '', platform: [],
      verified: false, minFollowers: '', sort: 'score',
      gender: '', language: '', minER: '', minScore: '',
    },
  });

  const activeCount = [
    f.niche?.length > 0,
    f.platform?.length > 0,
    f.state,
    f.gender && f.gender !== 'Any',
    f.language,
    f.minFollowers,
    f.minER,
    f.minScore,
    f.verified,
  ].filter(Boolean).length;

  const toggleNiche = (n) => dsp({ t: 'CF', v: { niche: f.niche?.includes(n) ? f.niche.filter(x => x !== n) : [...(f.niche || []), n] } });
  const togglePlatform = (p) => dsp({ t: 'CF', v: { platform: f.platform?.includes(p) ? f.platform.filter(x => x !== p) : [...(f.platform || []), p] } });
  const isDesktop = !mob;

  /* ── shared inner content ── */
  const FilterContent = () => (
    <>
      {/* Drag handle — mobile only */}
      {mob && (
        <div style={{ width: 44, height: 5, background: '#e2e8f0', borderRadius: 10, margin: '0 auto 16px' }} />
      )}

      {/* ── Header ── */}
      <div style={{
        padding: mob ? '0 20px 14px' : '24px 32px 18px',
        borderBottom: '1px solid #f1f5f9',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <SlidersHorizontal size={17} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: mob ? 17 : 20, fontWeight: 950, color: '#0f172a', letterSpacing: '-0.03em' }}>Advanced Filters</span>
              {activeCount > 0 && (
                <span style={{ background: '#FF9431', color: '#fff', fontSize: 10, fontWeight: 950, padding: '2px 8px', borderRadius: 100 }}>
                  {activeCount} active
                </span>
              )}
            </div>
            <p style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginTop: 1 }}>Find the perfect creator for your campaign</p>
          </div>
        </div>
        <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: '50%', background: '#f1f5f9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <X size={16} color="#64748b" />
        </button>
      </div>

      {/* ── Scrollable body ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: mob ? '20px 20px 0' : '20px 32px 0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
          gap: isDesktop ? '22px 36px' : '20px',
          paddingBottom: 12,
        }}>

          {/* Niche — full width */}
          <div style={{ gridColumn: '1 / -1' }}>
            <Label>🎯 Creator Niche</Label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {niches.map(n => (
                <Chip key={n} label={n} active={f.niche?.includes(n)} onClick={() => toggleNiche(n)} />
              ))}
            </div>
          </div>

          {/* Platform — full width */}
          <div style={{ gridColumn: '1 / -1' }}>
            <Label>📱 Social Platform</Label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {PLATFORMS_DATA.map(p => (
                <Chip key={p.name} label={p.name} icon={p.icon} active={f.platform?.includes(p.name)} onClick={() => togglePlatform(p.name)} color={p.color} />
              ))}
            </div>
          </div>

          {/* State */}
          <div>
            <Label><MapPin size={11} style={{ display: 'inline', marginRight: 4 }} />State</Label>
            <SelectInput
              id="filter-state" value={f.state}
              onChange={e => dsp({ t: 'CF', v: { state: e.target.value, district: '' } })}
              placeholder="All India"
              options={ALL_STATES.map(s => ({ label: s, value: s }))}
              icon={<MapPin size={15} />}
            />
          </div>

          {/* District */}
          <div>
            <Label>District / City</Label>
            <SelectInput
              id="filter-district" value={f.district}
              onChange={e => dsp({ t: 'CF', v: { district: e.target.value } })}
              placeholder={f.state ? `All in ${f.state}` : 'Select State First'}
              options={(f.state ? (INDIA_STATES[f.state] || []) : []).map(c => ({ label: c, value: c }))}
              icon={<MapPin size={15} />}
              disabled={!f.state}
            />
          </div>

          {/* Gender */}
          <div>
            <Label><Users size={11} style={{ display: 'inline', marginRight: 4 }} />Gender</Label>
            <div style={{ display: 'flex', background: '#f1f5f9', padding: 4, borderRadius: 12, gap: 3 }}>
              {['Any', 'Male', 'Female'].map(g => (
                <button
                  key={g}
                  onClick={() => dsp({ t: 'CF', v: { gender: g } })}
                  style={{
                    flex: 1, padding: '9px', borderRadius: 9, border: 'none',
                    background: (f.gender || 'Any') === g ? '#fff' : 'transparent',
                    color: (f.gender || 'Any') === g ? '#0f172a' : '#64748b',
                    fontSize: 13, fontWeight: 900, cursor: 'pointer', transition: '0.2s',
                    boxShadow: (f.gender || 'Any') === g ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  }}
                >{g}</button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <Label><Globe size={11} style={{ display: 'inline', marginRight: 4 }} />Language</Label>
            <SelectInput
              id="filter-language" value={f.language}
              onChange={e => dsp({ t: 'CF', v: { language: e.target.value } })}
              placeholder="All Languages"
              options={LANGUAGES.map(l => ({ label: l, value: l }))}
              icon={<Globe size={15} />}
            />
          </div>

          {/* Min Followers — full width */}
          <div style={{ gridColumn: '1 / -1' }}>
            <Label><Users size={11} style={{ display: 'inline', marginRight: 4 }} />Min Followers</Label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {FOLLOWER_PRESETS.map(opt => (
                <Chip key={opt.label} label={opt.label} color="#0f172a"
                  active={(f.minFollowers || '') === opt.value}
                  onClick={() => dsp({ t: 'CF', v: { minFollowers: opt.value } })}
                />
              ))}
            </div>
          </div>

          {/* Engagement Rate */}
          <div>
            <Label><Zap size={11} color="#10B981" style={{ display: 'inline', marginRight: 4 }} />Min Engagement Rate</Label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[{ label: 'Any', value: '' }, { label: '2%+', value: '2' }, { label: '5%+', value: '5' }, { label: '10%+', value: '10' }].map(opt => (
                <Chip key={opt.label} label={opt.label} color="#10B981"
                  active={(f.minER || '') === opt.value}
                  onClick={() => dsp({ t: 'CF', v: { minER: opt.value } })}
                />
              ))}
            </div>
          </div>

          {/* CB Score */}
          <div>
            <Label>⭐ CB Score (Min)</Label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[{ label: 'Any', value: '' }, { label: '60+', value: '60' }, { label: '80+', value: '80' }, { label: '90+', value: '90' }].map(opt => (
                <Chip key={opt.label} label={opt.label} color="#FF9431"
                  active={(f.minScore || '') === opt.value}
                  onClick={() => dsp({ t: 'CF', v: { minScore: opt.value } })}
                />
              ))}
            </div>
          </div>

          {/* Verified Toggle — full width */}
          <div style={{
            gridColumn: '1 / -1',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: f.verified ? 'rgba(59,130,246,0.04)' : '#f8fafc',
            padding: '14px 18px', borderRadius: 14,
            border: '1.5px solid ' + (f.verified ? 'rgba(59,130,246,0.18)' : '#e2e8f0'),
            transition: 'all 0.2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: f.verified ? 'rgba(59,130,246,0.1)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0' }}>
                <ShieldCheck size={16} color={f.verified ? '#3B82F6' : '#94a3b8'} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 900, color: '#0f172a' }}>Verified Talent Only</div>
                <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>Show only manually vetted elite creators</div>
              </div>
            </div>
            <button
              onClick={() => dsp({ t: 'CF', v: { verified: !f.verified } })}
              style={{
                width: 50, height: 26, borderRadius: 100, flexShrink: 0,
                background: f.verified ? '#3B82F6' : '#e2e8f0',
                position: 'relative', border: 'none', cursor: 'pointer', transition: '0.3s',
              }}
            >
              <div style={{
                width: 18, height: 18, borderRadius: '50%', background: '#fff',
                position: 'absolute', top: 4, left: f.verified ? 28 : 4, transition: '0.3s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              }} />
            </button>
          </div>

        </div>
      </div>

      {/* ── Sticky Footer ── */}
      <div style={{
        padding: mob ? '14px 20px 28px' : '16px 32px',
        borderTop: '1px solid #f1f5f9',
        display: 'flex', gap: 10, flexShrink: 0,
      }}>
        <button
          onClick={clearFilters}
          style={{
            flex: 1, padding: '13px', borderRadius: 12,
            background: '#f1f5f9', color: '#475569', border: 'none',
            fontSize: 13, fontWeight: 900, cursor: 'pointer',
          }}
        >
          {activeCount > 0 ? `Reset (${activeCount})` : 'Reset All'}
        </button>
        <button
          onClick={onClose}
          style={{
            flex: 2, padding: '13px', borderRadius: 12,
            background: '#0f172a', color: '#fff', border: 'none',
            fontSize: 14, fontWeight: 950, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 6px 16px rgba(15,23,42,0.18)',
          }}
        >
          Apply Filters
          {activeCount > 0 && (
            <span style={{ background: '#FF9431', color: '#fff', fontSize: 10, fontWeight: 950, padding: '2px 7px', borderRadius: 100 }}>
              {activeCount}
            </span>
          )}
        </button>
      </div>
    </>
  );

  return (
    <AnimatePresence>
      {show && (
        isDesktop ? (
          /* ── DESKTOP: centered overlay modal ── */
          <>
            <motion.div
              key="filter-bd"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={onClose}
              style={{ position: 'fixed', inset: 0, background: 'rgba(5,5,5,0.6)', backdropFilter: 'blur(14px)', zIndex: 999998 }}
            />
            {/* Flex-centering layer (no transform conflict with framer-motion) */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <motion.div
                key="filter-modal"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                onClick={e => e.stopPropagation()}
                style={{
                  pointerEvents: 'auto',
                  width: '88vw', maxWidth: 840,
                  maxHeight: '86vh',
                  background: '#fff', borderRadius: 24,
                  display: 'flex', flexDirection: 'column',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.04)',
                  overflow: 'hidden',
                }}
              >
                <FilterContent />
              </motion.div>
            </div>
          </>
        ) : (
          /* ── MOBILE: bottom sheet ── */
          <>
            <motion.div
              key="filter-bd-mob"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={onClose}
              style={{ position: 'fixed', inset: 0, background: 'rgba(5,5,5,0.6)', backdropFilter: 'blur(14px)', zIndex: 999998 }}
            />
            <motion.div
              key="filter-sheet"
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 260 }}
              style={{
                position: 'fixed', bottom: 0, left: 0, right: 0,
                height: '93vh',
                background: '#fff', borderRadius: '24px 24px 0 0',
                zIndex: 999999,
                display: 'flex', flexDirection: 'column',
                boxShadow: '0 -16px 50px rgba(0,0,0,0.18)',
                padding: '16px 0 0',
              }}
            >
              <FilterContent />
            </motion.div>
          </>
        )
      )}
    </AnimatePresence>
  );
}

FilterSidebar.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dsp: PropTypes.func.isRequired,
  mob: PropTypes.bool,
  niches: PropTypes.arrayOf(PropTypes.string).isRequired,
  platforms: PropTypes.arrayOf(PropTypes.string),
  f: PropTypes.shape({
    q: PropTypes.string,
    niche: PropTypes.arrayOf(PropTypes.string),
    state: PropTypes.string,
    district: PropTypes.string,
    platform: PropTypes.arrayOf(PropTypes.string),
    verified: PropTypes.bool,
    minFollowers: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sort: PropTypes.string,
    gender: PropTypes.string,
    language: PropTypes.string,
    minER: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minScore: PropTypes.string,
  }).isRequired,
};
