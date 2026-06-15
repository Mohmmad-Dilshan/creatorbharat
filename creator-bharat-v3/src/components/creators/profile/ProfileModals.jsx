import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Star } from 'lucide-react';
import { Modal, Btn, Fld } from '../../common/Primitives';

export const RateCreatorModal = ({ open, onClose, name, dsp, onSubmit, user }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

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
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', fontWeight: 500 }}>Only verified brands and creators can provide feedback to maintain platform integrity.</p>
          
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '32px' }}>
             {[1,2,3,4,5].map(s => (
               <button 
                 key={s} 
                 onMouseEnter={() => setHover(s)}
                 onMouseLeave={() => setHover(0)}
                 onClick={() => setRating(s)}
                 style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
               >
                 <Star 
                   size={40} 
                   fill={s <= (hover || rating) ? '#FF9431' : 'none'} 
                   color={s <= (hover || rating) ? '#FF9431' : '#cbd5e1'} 
                   style={{ transition: 'all 0.2s transform', transform: s === hover ? 'scale(1.2)' : 'scale(1)' }}
                 />
               </button>
             ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <Fld label="Collaboration Feedback" type="textarea" value={text} onChange={e => setText(e.target.value)} placeholder="Tell the community about your professional experience with this creator..." />
             
             <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <Btn full lg onClick={onClose} style={{ background: '#f1f5f9', color: '#64748b', borderRadius: '100px' }}>Cancel</Btn>
                <Btn full lg onClick={handleSubmit} loading={loading} style={{ background: '#0f172a', color: '#fff', borderRadius: '100px' }}>Submit Verified Review</Btn>
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
