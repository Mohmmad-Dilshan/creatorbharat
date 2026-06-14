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
  'Rajasthani', 'Haryanvi', 'Tulu', 'Awadhi', 'Other'
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
  { name: 'Instagram', icon: <InstagramIcon size={16} />, color: '#E4405F' },
  { name: 'YouTube', icon: <YoutubeIcon size={16} />, color: '#FF0000' },
  { name: 'Twitter', icon: <TwitterIcon size={16} />, color: '#1DA1F2' },
  { name: 'LinkedIn', icon: <LinkedinIcon size={16} />, color: '#0A66C2' },
  { name: 'Facebook', icon: <FacebookIcon size={16} />, color: '#1877F2' },
];

const SectionLabel = ({ icon, children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
    <div style={{ width: 28, height: 28, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
    </div>
    <span style={{ fontSize: 11, fontWeight: 950, color: '#475569', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{children}</span>
  </div>
);
SectionLabel.propTypes = { icon: PropTypes.node, children: PropTypes.node };

const ChipGroup = ({ items, selected, onToggle, colorFn }) => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    {items.map(item => {
      const key = typeof item === 'string' ? item : item.name;
      const label = typeof item === 'string' ? item : item.name;
      const isSel = selected.includes(key);
      const color = colorFn ? colorFn(item) : '#FF9431';
      return (
        <button
          key={key}
          onClick={() => onToggle(key, isSel)}
          style={{
            padding: '8px 16px', borderRadius: 100,
            border: '1.5px solid ' + (isSel ? color : '#e2e8f0'),
            background: isSel ? color : '#fff',
            color: isSel ? '#fff' : '#475569',
            fontSize: 13, fontWeight: 800, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
            transition: 'all 0.15s',
            boxShadow: isSel ? `0 4px 12px ${color}33` : 'none',
          }}
        >
          {typeof item !== 'string' && item.icon}
          {label}
        </button>
      );
    })}
  </div>
);
ChipGroup.propTypes = {
  items: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  colorFn: PropTypes.func,
};

const SelectField = ({ id, label, value, onChange, icon, options, placeholder }) => (
  <div>
    <label htmlFor={id} style={{ display: 'block', fontSize: 11, fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>{label}</label>
    <div style={{ position: 'relative' }}>
      <select
        id={id}
        value={value}
        onChange={onChange}
        style={{
          width: '100%', padding: '13px 44px 13px 16px', borderRadius: 14,
          border: '1.5px solid #e2e8f0', fontSize: 14, fontWeight: 700,
          background: '#f8fafc', outline: 'none', appearance: 'none',
          color: value ? '#0f172a' : '#64748b', cursor: 'pointer',
        }}
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
      </select>
      <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }}>
        {icon}
      </div>
    </div>
  </div>
);
SelectField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.node,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
};

export default function FilterSidebar({ show, onClose, f, dsp, mob, niches }) {
  const clearFilters = () => dsp({ t: 'CF', v: { q: '', niche: [], state: '', district: '', platform: [], verified: false, minFollowers: '', sort: 'score', gender: '', language: '', minER: '', minScore: '' } });

  // Count active filters for the badge
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

  const handleNicheToggle = (n, isSel) =>
    dsp({ t: 'CF', v: { niche: isSel ? f.niche.filter(x => x !== n) : [...(f.niche || []), n] } });

  const handlePlatformToggle = (p, isSel) =>
    dsp({ t: 'CF', v: { platform: isSel ? f.platform.filter(x => x !== p) : [...(f.platform || []), p] } });

  // Desktop: centered modal | Mobile: full-screen bottom sheet
  const isDesktop = !mob;

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="filter-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(5,5,5,0.65)', backdropFilter: 'blur(16px)', zIndex: 999998 }}
          />

          {/* ── Panel ── */}
          <motion.div
            key="filter-panel"
            initial={isDesktop ? { opacity: 0, scale: 0.97, y: 20 } : { y: '100%' }}
            animate={isDesktop ? { opacity: 1, scale: 1, y: 0 } : { y: 0 }}
            exit={isDesktop ? { opacity: 0, scale: 0.97, y: 20 } : { y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 260 }}
            style={isDesktop ? {
              // Desktop: centered modal
              position: 'fixed', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '92vw', maxWidth: 860,
              maxHeight: '88vh',
              background: '#fff', borderRadius: 32,
              zIndex: 999999,
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 40px 100px rgba(0,0,0,0.3)',
              overflow: 'hidden',
            } : {
              // Mobile: full-screen bottom sheet
              position: 'fixed', bottom: 0, left: 0, right: 0,
              height: '95vh',
              background: '#fff', borderRadius: '28px 28px 0 0',
              zIndex: 999999,
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 -20px 60px rgba(0,0,0,0.2)',
            }}
          >
            {/* ── Sticky Header ── */}
            <div style={{
              padding: mob ? '16px 20px 14px' : '24px 32px 20px',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexShrink: 0, background: '#fff',
              borderRadius: mob ? '28px 28px 0 0' : '32px 32px 0 0',
            }}>
              {/* Drag handle on mobile */}
              {mob && <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 40, height: 4, background: '#e2e8f0', borderRadius: 10 }} />}

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: mob ? 6 : 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SlidersHorizontal size={18} color="#fff" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <h3 style={{ fontSize: mob ? 18 : 22, fontWeight: 950, color: '#0f172a', letterSpacing: '-0.03em' }}>Advanced Filters</h3>
                    {activeCount > 0 && (
                      <span style={{ background: '#FF9431', color: '#fff', fontSize: 11, fontWeight: 950, padding: '2px 8px', borderRadius: 100 }}>
                        {activeCount} active
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, marginTop: 1 }}>Find the perfect creator for your campaign</p>
                </div>
              </div>
              <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: '50%', background: '#f1f5f9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            {/* ── Scrollable Body ── */}
            <div style={{ flex: 1, overflowY: 'auto', padding: mob ? '20px 20px 0' : '24px 32px 0' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
                gap: isDesktop ? '28px 40px' : '24px',
                paddingBottom: 16,
              }}>

                {/* ── Niche (full width) ── */}
                <div style={{ gridColumn: isDesktop ? '1 / -1' : '1' }}>
                  <SectionLabel icon={<span style={{ fontSize: 13 }}>🎯</span>}>Creator Niche</SectionLabel>
                  <ChipGroup
                    items={niches}
                    selected={f?.niche || []}
                    onToggle={handleNicheToggle}
                  />
                </div>

                {/* ── Platform (full width) ── */}
                <div style={{ gridColumn: isDesktop ? '1 / -1' : '1' }}>
                  <SectionLabel icon={<span style={{ fontSize: 13 }}>📱</span>}>Social Platform</SectionLabel>
                  <ChipGroup
                    items={PLATFORMS_DATA}
                    selected={f?.platform || []}
                    onToggle={handlePlatformToggle}
                    colorFn={item => item.color}
                  />
                </div>

                {/* ── State ── */}
                <SelectField
                  id="filter-state"
                  label="State"
                  value={f.state}
                  onChange={e => dsp({ t: 'CF', v: { state: e.target.value, district: '' } })}
                  icon={<MapPin size={16} />}
                  options={ALL_STATES.map(s => ({ label: s, value: s }))}
                  placeholder="All India"
                />

                {/* ── District ── */}
                <div>
                  <label htmlFor="filter-district" style={{ display: 'block', fontSize: 11, fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>District / City</label>
                  <select
                    id="filter-district"
                    value={f.district}
                    onChange={e => dsp({ t: 'CF', v: { district: e.target.value } })}
                    disabled={!f.state}
                    style={{
                      width: '100%', padding: '13px 16px', borderRadius: 14,
                      border: '1.5px solid #e2e8f0', fontSize: 14, fontWeight: 700,
                      background: f.state ? '#f8fafc' : '#f8fafc', opacity: f.state ? 1 : 0.5,
                      outline: 'none', color: f.district ? '#0f172a' : '#64748b', cursor: f.state ? 'pointer' : 'not-allowed',
                    }}
                  >
                    <option value="">{f.state ? `All in ${f.state}` : 'Select State First'}</option>
                    {f.state && (INDIA_STATES[f.state] || []).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* ── Gender ── */}
                <div>
                  <SectionLabel icon={<Users size={14} color="#64748b" />}>Gender</SectionLabel>
                  <div style={{ display: 'flex', background: '#f1f5f9', padding: 4, borderRadius: 14, gap: 4 }}>
                    {['Any', 'Male', 'Female'].map(g => (
                      <button
                        key={g}
                        onClick={() => dsp({ t: 'CF', v: { gender: g } })}
                        style={{
                          flex: 1, padding: '10px', borderRadius: 10, border: 'none',
                          background: (f.gender || 'Any') === g ? '#fff' : 'transparent',
                          color: (f.gender || 'Any') === g ? '#0f172a' : '#64748b',
                          fontSize: 13, fontWeight: 900, cursor: 'pointer', transition: '0.2s',
                          boxShadow: (f.gender || 'Any') === g ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                        }}
                      >{g}</button>
                    ))}
                  </div>
                </div>

                {/* ── Language ── */}
                <SelectField
                  id="filter-language"
                  label="Language"
                  value={f.language}
                  onChange={e => dsp({ t: 'CF', v: { language: e.target.value } })}
                  icon={<Globe size={16} />}
                  options={LANGUAGES.map(l => ({ label: l, value: l }))}
                  placeholder="All Languages"
                />

                {/* ── Min Followers ── */}
                <div style={{ gridColumn: isDesktop ? '1 / -1' : '1' }}>
                  <SectionLabel icon={<Users size={14} color="#64748b" />}>Min Followers</SectionLabel>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {FOLLOWER_PRESETS.map(opt => (
                      <button
                        key={opt.label}
                        onClick={() => dsp({ t: 'CF', v: { minFollowers: opt.value } })}
                        style={{
                          padding: '8px 18px', borderRadius: 100,
                          border: '1.5px solid ' + ((f.minFollowers || '') === opt.value ? '#0f172a' : '#e2e8f0'),
                          background: (f.minFollowers || '') === opt.value ? '#0f172a' : '#fff',
                          color: (f.minFollowers || '') === opt.value ? '#fff' : '#475569',
                          fontSize: 13, fontWeight: 900, cursor: 'pointer', transition: '0.15s',
                        }}
                      >{opt.label}</button>
                    ))}
                  </div>
                </div>

                {/* ── Engagement Rate ── */}
                <div>
                  <SectionLabel icon={<Zap size={14} color="#10B981" />}>Min Engagement Rate</SectionLabel>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {[{ label: 'Any', value: '' }, { label: '2%+', value: '2' }, { label: '5%+', value: '5' }, { label: '10%+', value: '10' }].map(opt => (
                      <button
                        key={opt.label}
                        onClick={() => dsp({ t: 'CF', v: { minER: opt.value } })}
                        style={{
                          padding: '8px 18px', borderRadius: 100,
                          border: '1.5px solid ' + ((f.minER || '') === opt.value ? '#10B981' : '#e2e8f0'),
                          background: (f.minER || '') === opt.value ? '#10B981' : '#fff',
                          color: (f.minER || '') === opt.value ? '#fff' : '#475569',
                          fontSize: 13, fontWeight: 900, cursor: 'pointer', transition: '0.15s',
                        }}
                      >{opt.label}</button>
                    ))}
                  </div>
                </div>

                {/* ── CB Score ── */}
                <div>
                  <SectionLabel icon={<span style={{ fontSize: 13 }}>⭐</span>}>CB Score (Min)</SectionLabel>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {[{ label: 'Any', value: '' }, { label: '60+', value: '60' }, { label: '80+', value: '80' }, { label: '90+', value: '90' }].map(opt => (
                      <button
                        key={opt.label}
                        onClick={() => dsp({ t: 'CF', v: { minScore: opt.value } })}
                        style={{
                          padding: '8px 18px', borderRadius: 100,
                          border: '1.5px solid ' + ((f.minScore || '') === opt.value ? '#FF9431' : '#e2e8f0'),
                          background: (f.minScore || '') === opt.value ? '#FF9431' : '#fff',
                          color: (f.minScore || '') === opt.value ? '#fff' : '#475569',
                          fontSize: 13, fontWeight: 900, cursor: 'pointer', transition: '0.15s',
                        }}
                      >{opt.label}</button>
                    ))}
                  </div>
                </div>

                {/* ── Verified Toggle (full width) ── */}
                <div style={{
                  gridColumn: isDesktop ? '1 / -1' : '1',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: f.verified ? 'rgba(59,130,246,0.04)' : '#f8fafc',
                  padding: '16px 20px', borderRadius: 16,
                  border: '1.5px solid ' + (f.verified ? 'rgba(59,130,246,0.15)' : '#e2e8f0'),
                  transition: '0.2s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: f.verified ? 'rgba(59,130,246,0.1)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0' }}>
                      <ShieldCheck size={18} color={f.verified ? '#3B82F6' : '#94a3b8'} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 900, color: '#0f172a' }}>Verified Talent Only</div>
                      <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>Show only manually vetted elite creators</div>
                    </div>
                  </div>
                  <button
                    onClick={() => dsp({ t: 'CF', v: { verified: !f.verified } })}
                    style={{
                      width: 52, height: 28, borderRadius: 100,
                      background: f.verified ? '#3B82F6' : '#e2e8f0',
                      position: 'relative', border: 'none', cursor: 'pointer', transition: '0.3s',
                      flexShrink: 0,
                    }}
                  >
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%', background: '#fff',
                      position: 'absolute', top: 4, left: f.verified ? 28 : 4, transition: '0.3s',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }} />
                  </button>
                </div>

              </div>
            </div>

            {/* ── Sticky Footer ── */}
            <div style={{
              padding: mob ? '16px 20px 28px' : '20px 32px',
              borderTop: '1px solid #f1f5f9',
              display: 'flex', gap: 12, flexShrink: 0, background: '#fff',
              borderRadius: mob ? 0 : '0 0 32px 32px',
            }}>
              <button
                onClick={clearFilters}
                style={{
                  flex: 1, padding: '14px', borderRadius: 14,
                  background: '#f1f5f9', color: '#475569', border: 'none',
                  fontSize: 14, fontWeight: 900, cursor: 'pointer', transition: '0.2s',
                }}
              >
                {activeCount > 0 ? `Reset ${activeCount} Filter${activeCount > 1 ? 's' : ''}` : 'Reset All'}
              </button>
              <button
                onClick={onClose}
                style={{
                  flex: 2, padding: '14px', borderRadius: 14,
                  background: '#0f172a', color: '#fff', border: 'none',
                  fontSize: 14, fontWeight: 950, cursor: 'pointer', transition: '0.2s',
                  boxShadow: '0 8px 20px rgba(15,23,42,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                Apply Filters
                {activeCount > 0 && (
                  <span style={{ background: '#FF9431', color: '#fff', fontSize: 11, fontWeight: 950, padding: '2px 8px', borderRadius: 100 }}>
                    {activeCount}
                  </span>
                )}
              </button>
            </div>

          </motion.div>
        </>
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
