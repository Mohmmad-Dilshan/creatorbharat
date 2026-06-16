import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Star } from 'lucide-react';
import { Modal, Btn, Fld } from '../../common/Primitives';

export const RateCreatorModal = ({ open, onClose, name, dsp, onSubmit, user }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const QUICK_TAGS = [
    'Highly Professional', 
    'On-Time Delivery', 
    'Creative Storytelling', 
    'Excellent Communication', 
    'Exceeded Reach Goals', 
    'Easy Revisions'
  ];

  const handleTagClick = (tag) => {
    setText(prev => {
      const trimmed = prev.trim();
      if (!trimmed) return `${tag}.`;
      if (trimmed.endsWith('.') || trimmed.endsWith('!') || trimmed.endsWith(',')) {
        return `${trimmed} ${tag}.`;
      }
      return `${trimmed}, ${tag.toLowerCase()}.`;
    });
  };

  const getDescriptor = (val) => {
    switch (val) {
      case 1: return { label: 'Poor', desc: 'Not professional, delayed delivery', color: '#ef4444' };
      case 2: return { label: 'Fair', desc: 'Average work but had communication issues', color: '#f97316' };
      case 3: return { label: 'Good', desc: 'Satisfactory delivery, met requirements', color: '#eab308' };
      case 4: return { label: 'Very Good', desc: 'Highly creative and professional delivery', color: '#10b981' };
      case 5: return { label: 'Outstanding!', desc: 'Exceptional quality, super fast response', color: '#10b981' };
      default: return { label: 'Select Rating', desc: 'Click on stars to rate', color: '#94a3b8' };
    }
  };

  const currentDescriptor = getDescriptor(hover || rating);

  const handleSubmit = () => {
    if (rating === 0) { dsp({ t: 'TOAST', d: { type: 'warn', msg: 'Please select a star rating' } }); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onSubmit) {
        onSubmit({
          b: user?.name || 'Partner Brand',
          r: rating,
          t: text || 'Absolute professional. Highly recommended!',
          u: user?.email ? 'Verified Brand' : 'Verified Partner',
          d: 'Just now',
          type: 'brand',
          id: 'brand-' + Date.now()
        });
      }
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Review submitted and verified!' } });
      onClose();
    }, 1000);
  };

  return (
    <Modal open={open} title={'Write a Review for ' + name} onClose={onClose} width={500}>
       <div style={{ padding: '24px' }}>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', fontWeight: 650, lineHeight: 1.5 }}>
            Only verified brands and partners can provide feedback to maintain platform integrity.
          </p>
          
          {/* Interactive Stars Row */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '28px' }}>
             <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '12px' }}>
                {[1,2,3,4,5].map(s => (
                  <button 
                    key={s} 
                    onMouseEnter={() => setHover(s)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(s)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <Star 
                      size={38} 
                      fill={s <= (hover || rating) ? '#FF9431' : 'none'} 
                      color={s <= (hover || rating) ? '#FF9431' : '#cbd5e1'} 
                      style={{ transition: 'all 0.15s ease', transform: s === hover ? 'scale(1.2)' : 'scale(1)' }}
                    />
                  </button>
                ))}
             </div>
             
             {/* Dynamic Rating Descriptor Badge */}
             <div style={{ 
               padding: '6px 16px', 
               borderRadius: '100px', 
               background: '#f8fafc', 
               border: '1.5px solid #f1f5f9',
               textAlign: 'center', 
               minHeight: '44px',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               transition: 'all 0.2s ease'
             }}>
                <span style={{ fontSize: '13px', fontWeight: 950, color: currentDescriptor.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {currentDescriptor.label}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', marginTop: '1px' }}>
                  {currentDescriptor.desc}
                </span>
             </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             {/* Reviews Quick Tags */}
             <div>
                <span style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>
                  Quick Feedback Tags
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                   {QUICK_TAGS.map(tag => (
                     <button
                       key={tag}
                       onClick={() => handleTagClick(tag)}
                       style={{
                         padding: '6px 12px',
                         borderRadius: '100px',
                         background: '#f1f5f9',
                         border: '1.5px solid #e2e8f0',
                         color: '#475569',
                         fontSize: '12px',
                         fontWeight: 750,
                         cursor: 'pointer',
                         transition: 'all 0.2s',
                       }}
                       onMouseEnter={e => {
                         e.currentTarget.style.borderColor = '#FF9431';
                         e.currentTarget.style.background = 'rgba(255, 148, 49, 0.05)';
                         e.currentTarget.style.color = '#FF9431';
                       }}
                       onMouseLeave={e => {
                         e.currentTarget.style.borderColor = '#e2e8f0';
                         e.currentTarget.style.background = '#f1f5f9';
                         e.currentTarget.style.color = '#475569';
                       }}
                     >
                       + {tag}
                     </button>
                   ))}
                </div>
             </div>

             {/* Review Input Field with fixed rows parameter */}
             <Fld 
               label="Collaboration Feedback" 
               rows={4} 
               value={text} 
               onChange={e => setText(e.target.value)} 
               placeholder="Tell the community about your professional experience with this creator..." 
             />
             
             <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <Btn full lg onClick={onClose} style={{ background: '#f1f5f9', color: '#64748b', borderRadius: '100px', border: 'none', fontWeight: 900 }}>Cancel</Btn>
                <Btn full lg onClick={handleSubmit} loading={loading} style={{ background: '#0f172a', color: '#fff', borderRadius: '100px', border: 'none', fontWeight: 900 }}>Submit Verified Review</Btn>
             </div>
          </div>
       </div>
    </Modal>
  );
};
RateCreatorModal.propTypes = { 
  open: PropTypes.bool.isRequired, 
  onClose: PropTypes.func.isRequired, 
  name: PropTypes.string.isRequired, 
  dsp: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  })
};

export const CollabBriefModal = ({ open, onClose, pkg, creatorName, dsp }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Brief sent successfully! The creator will review and respond.' } });
      onClose();
    }, 1500);
  };

  return (
    <Modal open={open} onClose={onClose} title={`Brief for ${creatorName}`} width={550}>
       <div style={{ padding: '20px' }}>
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', marginBottom: '24px', border: '1px solid #f1f5f9' }}>
             <div style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Selected Package</div>
             <div style={{ fontSize: '16px', fontWeight: 950, color: '#0f172a' }}>{pkg ? `${pkg.l} (${pkg.v})` : 'Custom Campaign Brief (Sponsorship)'}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <Fld label="Campaign Objective" placeholder="e.g. Brand Awareness, Sales Drive, New Launch" />
             <Fld label="Target Timeline" placeholder="When do you want to go live?" />
             <Fld label="Additional Notes" type="textarea" placeholder="Tell the creator about your brand vision..." />
             
             <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <Btn full lg onClick={onClose} style={{ background: '#f1f5f9', color: '#64748b', borderRadius: '100px' }}>Cancel</Btn>
                <Btn full lg onClick={handleSubmit} loading={loading} style={{ background: '#0073b1', color: '#fff', borderRadius: '100px' }}>Send Collaboration Brief</Btn>
             </div>
          </div>
       </div>
    </Modal>
  );
};
CollabBriefModal.propTypes = { open: PropTypes.bool.isRequired, onClose: PropTypes.func.isRequired, pkg: PropTypes.object, creatorName: PropTypes.string, dsp: PropTypes.func.isRequired };
