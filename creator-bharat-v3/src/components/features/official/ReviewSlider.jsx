import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, X, Edit3 } from 'lucide-react';
import { useApp } from '@/core/context';
import AuthRequiredModal from './AuthRequiredModal';

const TESTIMONIALS_DATA = [
  {
    name: "Rohan Mehta",
    role: "Brand Director, PepsiCo India",
    quote: "CreatorBharat solved our influencer outreach problem. The verified metrics allowed us to hire 45 creators across Rajasthan in days with zero agency overhead.",
    rating: 5,
    tag: "Verified Brand Partner"
  },
  {
    name: "Komalpreet Kaur",
    role: "Travel Creator, Amritsar",
    quote: "Having a dynamic verified QR profile changed my life. Brands pitch me directly now. I've secured three major campaigns this quarter alone, all via CB.",
    rating: 5,
    tag: "Verified Elite Creator"
  },
  {
    name: "Ananya Sen",
    role: "Influencer Marketing Lead, Nykaa",
    quote: "The transparent escrow ledger is a game changer. We fund campaigns knowing our money is safe until deliverables are fully verified by the smart system.",
    rating: 5,
    tag: "Verified Brand Partner"
  }
];

export default function ReviewSlider({ mob }) {
  const { st, dsp } = useApp();
  const [reviewsList, setReviewsList] = useState(TESTIMONIALS_DATA);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [newQuote, setNewQuote] = useState('');
  const [newRating, setNewRating] = useState(5);

  const next = () => setCurrentIdx(prev => (prev + 1) % reviewsList.length);
  const prev = () => setCurrentIdx(prev => (prev - 1 + reviewsList.length) % reviewsList.length);

  const current = reviewsList[currentIdx];

  const handleOpenCompose = () => {
    if (st?.user) {
      setShowComposeModal(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newQuote.trim()) return;

    const isCreator = st.role === 'creator';
    const tag = isCreator ? 'Verified Elite Creator' : 'Verified Brand Partner';
    const authorRole = isCreator
      ? `${st.user?.creatorProfile?.niche?.[0] || 'Digital'} Creator, ${st.user?.creatorProfile?.city || 'India'}`
      : `${st.user?.brandProfile?.companyName || 'Ecosystem'} Executive`;

    const newReview = {
      name: st.user?.name || 'Verified Partner',
      role: authorRole,
      quote: newQuote.trim(),
      rating: newRating,
      tag: tag
    };

    setReviewsList([newReview, ...reviewsList]);
    setCurrentIdx(0);
    setNewQuote('');
    setNewRating(5);
    setShowComposeModal(false);

    dsp({
      t: 'TOAST',
      d: {
        type: 'success',
        msg: '🎉 Testimonial successfully synced with CB Ledger!'
      }
    });
  };

  return (
    <div style={{ 
      background: '#f8fafc', 
      borderRadius: '32px', 
      padding: mob ? '32px 24px' : '48px', 
      border: '1px solid #e2e8f0',
      marginTop: '40px',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'left'
    }}>
      {/* Background Decor - pointer-events none to prevent scroll locks */}
      <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '150px', height: '150px', background: 'radial-gradient(circle, #FF9431 0%, transparent 70%)', opacity: 0.05, pointerEvents: 'none' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={20} color="#FF9431" />
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', letterSpacing: '1.5px', textTransform: 'uppercase' }}>ECOSYSTEM TRUST REVIEWS</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button 
            onClick={handleOpenCompose}
            style={{ 
              background: '#fff', 
              border: '1px solid #cbd5e1', 
              borderRadius: '20px', 
              padding: '6px 14px', 
              fontSize: '11px', 
              fontWeight: 800, 
              color: '#0f172a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginRight: '8px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >
            <Edit3 size={12} /> Leave Review
          </button>
          <button onClick={prev} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #cbd5e1', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>‹</button>
          <button onClick={next} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #cbd5e1', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>›</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={`${current.name}-${currentIdx}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 1 }}
        >
          {/* Star Rating */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ color: i < current.rating ? '#FF9431' : '#cbd5e1', fontSize: '18px' }}>★</span>
            ))}
          </div>

          <p style={{ 
            fontSize: mob ? '16px' : '18px', 
            fontWeight: 600, 
            color: '#334155', 
            lineHeight: 1.6, 
            fontStyle: 'italic', 
            margin: 0 
          }}>
            "{current.quote}"
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a' }}>{current.name}</div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>{current.role}</div>
            </div>
            <div style={{ 
              background: '#FF943110', 
              color: '#FF9431', 
              padding: '6px 12px', 
              borderRadius: '100px', 
              fontSize: '11px', 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              letterSpacing: '1px' 
            }}>
              {current.tag}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Review Composer Modal */}
      <AnimatePresence>
        {showComposeModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowComposeModal(false)} 
              style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)' }} 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              style={{ position: 'relative', background: '#fff', padding: '40px 32px', borderRadius: '28px', maxWidth: '480px', width: '100%', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', color: '#0f172a' }}
            >
              <button 
                onClick={() => setShowComposeModal(false)} 
                style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', color: '#64748b', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>

              <h3 style={{ fontSize: '22px', fontWeight: 950, marginBottom: '4px', letterSpacing: '-0.02em' }}>Submit Shard Review</h3>
              <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '24px' }}>Provide verified feedback regarding the CreatorBharat transaction escrow ledger.</p>

              <form onSubmit={handleSubmit}>
                {/* Clickable Star Rating */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Ecosystem Rating</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      >
                        <Star 
                          size={24} 
                          fill={star <= newRating ? '#FF9431' : 'none'} 
                          color={star <= newRating ? '#FF9431' : '#cbd5e1'} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Textarea review */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Review Description</label>
                  <textarea
                    required
                    placeholder="Enter details about your direct brand campaign experiences..."
                    rows={4}
                    value={newQuote}
                    onChange={(e) => setNewQuote(e.target.value)}
                    style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '14px', lineHeight: '1.6', resize: 'none', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    type="button"
                    onClick={() => setShowComposeModal(false)}
                    style={{ flex: 1, padding: '14px', borderRadius: '12px', background: '#f1f5f9', border: 'none', color: '#64748b', fontWeight: 700, cursor: 'pointer', fontSize: '14px' }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    style={{ flex: 1, padding: '14px', borderRadius: '12px', background: '#0f172a', border: 'none', color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: '14px', boxShadow: '0 8px 16px rgba(15,23,42,0.15)' }}
                  >
                    Verify & Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Local Guest Auth Lock Modal */}
      <AuthRequiredModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}

ReviewSlider.propTypes = {
  mob: PropTypes.bool.isRequired
};
