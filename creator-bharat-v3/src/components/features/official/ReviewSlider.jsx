import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Award } from 'lucide-react';

const TESTIMONIALS_DATA = [
  {
    name: "Rohan Mehta",
    role: "Brand Director, PepsiCo India",
    quote: "CreatorBharat solved our Tier 2 influencer outreach problem. The verified metrics allowed us to hire 45 creators across Rajasthan in days with zero agency overhead.",
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
  const [currentIdx, setCurrentIdx] = useState(0);

  const next = () => setCurrentIdx(prev => (prev + 1) % TESTIMONIALS_DATA.length);
  const prev = () => setCurrentIdx(prev => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);

  const current = TESTIMONIALS_DATA[currentIdx];

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={20} color="#FF9431" />
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', letterSpacing: '1.5px', textTransform: 'uppercase' }}>ECOSYSTEM TRUST REVIEWS</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={prev} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #cbd5e1', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>‹</button>
          <button onClick={next} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #cbd5e1', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>›</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {/* Star Rating */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {['star1', 'star2', 'star3', 'star4', 'star5'].slice(0, current.rating).map(starKey => (
              <span key={starKey} style={{ color: '#FF9431', fontSize: '18px' }}>★</span>
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
    </div>
  );
}

ReviewSlider.propTypes = {
  mob: PropTypes.bool.isRequired
};
