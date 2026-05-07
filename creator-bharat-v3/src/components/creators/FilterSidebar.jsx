import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, User, Globe, Zap } from 'lucide-react';
import { W, ALL_STATES, INDIA_STATES } from '../../utils/helpers';
import { Btn } from '../Primitives';

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
FacebookIcon.propTypes = { size: PropTypes.number };

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
InstagramIcon.propTypes = { size: PropTypes.number };

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);
YoutubeIcon.propTypes = { size: PropTypes.number };

const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
TwitterIcon.propTypes = { size: PropTypes.number };

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
LinkedinIcon.propTypes = { size: PropTypes.number };

export default function FilterSidebar({ show, onClose, f, dsp, mob, niches, platforms }) {
  const clearFilters = () => dsp({ t: 'CF', v: { q: '', niche: [], state: '', district: '', platform: [], verified: false, minFollowers: '', sort: 'score', gender: '', language: '', minER: '' } });

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', zIndex: 999998 }}
          />
          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            style={{
              position: 'fixed', bottom: 0, left: 0, right: 0,
              maxHeight: '92vh', background: '#fff', borderRadius: '40px 40px 0 0',
              zIndex: 999999, overflowY: 'auto', padding: mob ? '24px 20px 60px' : '48px 48px 60px',
              boxShadow: '0 -20px 60px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ width: 40, height: 4, background: '#e2e8f0', borderRadius: 10, margin: '0 auto 24px' }} />

            <div style={W(640)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                <div>
                  <h3 style={{ fontSize: 28, fontWeight: 900, fontFamily: "'Outfit', sans-serif", color: '#111' }}>Advanced Filters</h3>
                  <p style={{ fontSize: 14, color: '#64748b', fontWeight: 600, marginTop: 4 }}>Find the perfect Bharat creator for your brand</p>
                </div>
                <button aria-label="Close filters" onClick={onClose} style={{ background: '#f1f5f9', border: 'none', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={20} color="#64748b" /></button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
                {/* Niche Section */}
                <div>
                  <span style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 16, letterSpacing: '1px' }}>Creator Niche</span>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {niches.map(n => {
                      const isSel = f.niche.includes(n);
                      return (
                        <button
                          key={n}
                          aria-pressed={isSel}
                          onClick={() => dsp({ t: 'CF', v: { niche: isSel ? f.niche.filter(x => x !== n) : [...f.niche, n] } })}
                          style={{
                            padding: '12px 22px', borderRadius: 100,
                            border: '1.5px solid ' + (isSel ? '#FF9431' : 'rgba(0,0,0,0.06)'),
                            background: isSel ? '#FF9431' : '#fff',
                            color: isSel ? '#fff' : '#475569',
                            fontSize: 14, fontWeight: 800, cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          {n}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Platform Section */}
                <div>
                  <span style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 16, letterSpacing: '1px' }}>Social Platforms</span>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {[
                      { name: 'Instagram', icon: <InstagramIcon size={18} />, color: '#E4405F' },
                      { name: 'YouTube', icon: <YoutubeIcon size={18} />, color: '#FF0000' },
                      { name: 'Twitter', icon: <TwitterIcon size={18} />, color: '#1DA1F2' },
                      { name: 'LinkedIn', icon: <LinkedinIcon size={18} />, color: '#0A66C2' },
                      { name: 'Facebook', icon: <FacebookIcon size={18} />, color: '#1877F2' }
                    ].map(p => {
                      const isSel = f.platform.includes(p.name);
                      return (
                        <button
                          key={p.name}
                          aria-pressed={isSel}
                          onClick={() => dsp({ t: 'CF', v: { platform: isSel ? f.platform.filter(x => x !== p.name) : [...f.platform, p.name] } })}
                          style={{
                            padding: '12px 22px', borderRadius: 100,
                            border: '1.5px solid ' + (isSel ? p.color : 'rgba(0,0,0,0.06)'),
                            background: isSel ? p.color : '#fff',
                            color: isSel ? '#fff' : '#475569',
                            fontSize: 14, fontWeight: 800, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 10,
                            transition: 'all 0.2s'
                          }}
                        >
                          {p.icon} {p.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Location Section */}
                <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 24 }}>
                  <div>
                    <label htmlFor="filter-state" style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 12 }}>State</label>
                    <div style={{ position: 'relative' }}>
                      <select
                        id="filter-state"
                        value={f.state}
                        onChange={e => dsp({ t: 'CF', v: { state: e.target.value, district: '' } })}
                        style={{
                          width: '100%', padding: '18px 20px', borderRadius: 18, border: '1.5px solid rgba(0,0,0,0.06)',
                          fontSize: 15, fontWeight: 700, background: '#f8fafc', outline: 'none',
                          appearance: 'none', color: '#111'
                        }}
                      >
                        <option value="">All India</option>
                        {ALL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <MapPin size={18} color="#94a3b8" style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="filter-district" style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 12 }}>District / City</label>
                    <select
                      id="filter-district"
                      value={f.district}
                      onChange={e => dsp({ t: 'CF', v: { district: e.target.value } })}
                      disabled={!f.state}
                      style={{
                        width: '100%', padding: '18px 20px', borderRadius: 18, border: '1.5px solid rgba(0,0,0,0.06)',
                        fontSize: 15, fontWeight: 700, background: f.state ? '#f8fafc' : '#f1f5f9',
                        opacity: f.state ? 1 : 0.6, outline: 'none', color: '#111'
                      }}
                    >
                      <option value="">{f.state ? `All in ${f.state}` : 'Select State First'}</option>
                      {f.state && (INDIA_STATES[f.state] || []).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Demographics */}
                <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 24 }}>
                  <div>
                    <span style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 12 }}>Gender</span>
                    <div style={{ display: 'flex', background: '#f8fafc', padding: 4, borderRadius: 100, border: '1.5px solid rgba(0,0,0,0.04)' }}>
                      {['Any', 'Male', 'Female'].map(g => (
                        <button
                          key={g}
                          aria-pressed={(f.gender || 'Any') === g}
                          onClick={() => dsp({ t: 'CF', v: { gender: g } })}
                          style={{
                            flex: 1, padding: '12px', borderRadius: 100, border: 'none',
                            background: (f.gender || 'Any') === g ? '#111' : 'transparent',
                            color: (f.gender || 'Any') === g ? '#fff' : '#64748b',
                            fontSize: 13, fontWeight: 800, cursor: 'pointer', transition: '0.3s'
                          }}
                        >{g}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="filter-language" style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 12 }}>Language</label>
                    <div style={{ position: 'relative' }}>
                      <select
                        id="filter-language"
                        value={f.language}
                        onChange={e => dsp({ t: 'CF', v: { language: e.target.value } })}
                        style={{
                          width: '100%', padding: '18px 20px', borderRadius: 18, border: '1.5px solid rgba(0,0,0,0.06)',
                          fontSize: 15, fontWeight: 700, background: '#f8fafc', outline: 'none', appearance: 'none', color: '#111'
                        }}
                      >
                        <option value="">All Languages</option>
                        {['Hindi', 'English', 'Punjabi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati'].map(l => (
                          <option key={l} value={l}>{l}</option>
                        ))}
                      </select>
                      <Globe size={18} color="#94a3b8" style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                  </div>
                </div>

                {/* Reach & Engagement */}
                <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 24 }}>
                  <div>
                    <label htmlFor="filter-min-followers" style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 12 }}>Min Followers</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        id="filter-min-followers"
                        type="number"
                        placeholder="e.g. 50000"
                        value={f.minFollowers}
                        onChange={e => dsp({ t: 'CF', v: { minFollowers: e.target.value } })}
                        style={{
                          width: '100%', padding: '18px 20px', borderRadius: 18, border: '1.5px solid rgba(0,0,0,0.06)',
                          fontSize: 15, fontWeight: 700, background: '#f8fafc', outline: 'none'
                        }}
                      />
                      <User size={18} color="#94a3b8" style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="filter-min-er" style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 12 }}>Min Engagement Rate</label>
                    <div style={{ position: 'relative' }}>
                      <select
                        id="filter-min-er"
                        value={f.minER}
                        onChange={e => dsp({ t: 'CF', v: { minER: e.target.value } })}
                        style={{
                          width: '100%', padding: '18px 20px', borderRadius: 18, border: '1.5px solid rgba(0,0,0,0.06)',
                          fontSize: 15, fontWeight: 700, background: '#f8fafc', outline: 'none', appearance: 'none', color: '#111'
                        }}
                      >
                        <option value="">Any ER</option>
                        <option value="2">2% +</option>
                        <option value="5">5% +</option>
                        <option value="10">10% +</option>
                      </select>
                      <Zap size={18} color="#10B981" style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                  </div>
                </div>

                {/* Verified Filter */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(59, 130, 246, 0.05)', padding: '24px', borderRadius: 24, border: '1.5px solid rgba(59, 130, 246, 0.1)' }}>
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 900, color: '#1E293B' }}>Verified Talent Only</h4>
                    <p style={{ fontSize: 13, color: '#64748B', fontWeight: 600, marginTop: 2 }}>Show only manually vetted elite creators</p>
                  </div>
                  <button
                    aria-pressed={f.verified}
                    aria-label="Toggle verified talent only"
                    onClick={() => dsp({ t: 'CF', v: { verified: !f.verified } })}
                    style={{
                      width: 56, height: 28, borderRadius: 100, background: f.verified ? '#3B82F6' : '#E2E8F0',
                      position: 'relative', border: 'none', cursor: 'pointer', transition: '0.3s'
                    }}
                  >
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%', background: '#fff',
                      position: 'absolute', top: 4, left: f.verified ? 32 : 4, transition: '0.3s',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }} />
                  </button>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                  <Btn variant="outline" lg full onClick={clearFilters} style={{ borderRadius: 100, height: 60, fontSize: 16 }}>Reset All</Btn>
                  <Btn lg full onClick={onClose} style={{ borderRadius: 100, height: 60, fontSize: 16, background: '#111', color: '#fff' }}>Apply Filters</Btn>
                </div>
              </div>
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
    minER: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired
};
