import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Check, Edit3 } from 'lucide-react';
import { Btn, Card } from '../../common/Primitives';
import { TrustBadge, TabNavigator } from './ProfileShared';

export const ReviewsTab = ({ c, mob, navigate, onWriteReview, setActiveTab }) => {
  const reviews = c.reviews || [
     { b: 'OYO Rooms', r: 5, t: 'Absolute professional. The Jaipur heritage campaign delivered 4x the expected engagement.', u: 'Brand Manager', d: '2 weeks ago', type: 'brand', id: 'oyo' },
     { b: 'Rohan Sharma', r: 5, t: 'The cultural storytelling in the summer drop was raw and authentic. Highly recommended!', u: 'Travel Creator', d: '1 month ago', type: 'creator', id: 'rohan' },
     { b: 'Amazon Bharat', r: 4, t: 'Great content quality. Revision process was smooth and delivery was on time.', u: 'Marketing Lead', d: '3 months ago', type: 'brand', id: 'amazon' }
  ];

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((sum, rev) => sum + rev.r, 0) / totalReviews).toFixed(1)
    : '5.0';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }} 
      style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
    >
       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 2fr', gap: mob ? '24px' : '40px', marginBottom: mob ? '24px' : '60px' }}>
          
          {/* Left Column: Aggregated Ratings & Breakdown Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Card style={{ 
                padding: mob ? '24px' : '36px', 
                borderRadius: '32px', 
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
                color: '#0f172a', 
                border: '1.5px solid rgba(226, 232, 240, 0.8)',
                boxShadow: '0 20px 40px rgba(15,23,42,0.02)',
              }}>
                 <div style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', textAlign: 'center' }}>
                   Verified Rating
                 </div>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{ fontSize: mob ? '56px' : '64px', fontWeight: 950, color: '#0f172a', lineHeight: 1, marginBottom: '6px' }}>
                      {averageRating}
                    </div>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                       {[1,2,3,4,5].map(s => {
                         const roundedRating = Math.round(Number(averageRating));
                         return <Star key={s} size={18} fill={s <= roundedRating ? '#FF9431' : 'none'} color={s <= roundedRating ? '#FF9431' : '#cbd5e1'} />;
                       })}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b' }}>
                      {totalReviews} Brand Reviews
                    </div>
                 </div>

                 {/* Star Breakdown Progress Bars */}
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                    {[5, 4, 3, 2, 1].map(stars => {
                      const count = reviews.filter(r => r.r === stars).length;
                      const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                      return (
                        <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 800, color: '#475569', minWidth: '10px', textAlign: 'center' }}>
                            {stars}
                          </span>
                          <Star size={10} fill="#FF9431" color="#FF9431" style={{ flexShrink: 0 }} />
                          <div style={{ flex: 1, height: '6px', background: '#e2e8f0', borderRadius: '100px', overflow: 'hidden' }}>
                            <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #FF9431, #EA580C)', borderRadius: '100px' }} />
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', minWidth: '16px', textAlign: 'right' }}>
                            {count}
                          </span>
                        </div>
                      );
                    })}
                 </div>
              </Card>
              
              <Btn 
                full 
                lg 
                onClick={() => onWriteReview()} 
                style={{ 
                  borderRadius: '100px', 
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
                  color: '#fff', 
                  border: 'none', 
                  gap: '8px', 
                  height: '54px',
                  fontWeight: 900,
                  fontSize: '14.5px',
                  boxShadow: '0 12px 24px rgba(15, 23, 42, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                  <Edit3 size={16} /> Write a Review
              </Btn>
          </div>

          {/* Right Column: Review Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
             {reviews.map((rev) => (
               <Card 
                 key={rev.id || Math.random()} 
                 style={{ 
                   padding: mob ? '20px' : '28px', 
                   borderRadius: '24px', 
                   border: '1px solid rgba(15,23,42,0.05)', 
                   background: '#fff',
                   boxShadow: '0 10px 30px rgba(0,0,0,0.01)',
                   transition: 'all 0.25s ease'
                 }}
                 onMouseEnter={e => { if (!mob) { e.currentTarget.style.borderColor = 'rgba(255, 148, 49, 0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(15,23,42,0.03)'; } }}
                 onMouseLeave={e => { if (!mob) { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.01)'; } }}
               >
                  {/* Rating Stars & Date */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                     <div style={{ display: 'flex', gap: '2px' }}>
                        {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s <= rev.r ? '#FF9431' : 'none'} color={s <= rev.r ? '#FF9431' : '#e2e8f0'} />)}
                     </div>
                     <span style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8' }}>
                       {rev.d}
                     </span>
                  </div>

                  {/* Comment */}
                  <h4 style={{ 
                    fontSize: mob ? '14px' : '16px', 
                    fontWeight: 700, 
                    color: '#334155', 
                    lineHeight: 1.5, 
                    margin: '0 0 20px 0',
                    fontFamily: 'Outfit, sans-serif'
                  }}>
                    "{rev.t}"
                  </h4>

                  {/* Reviewer Meta info */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f8fafc', paddingTop: '16px' }}>
                     <button 
                        onClick={() => rev.type ? navigate(`/${rev.type}/${rev.id}`) : null} 
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', outline: 'none', background: 'none', border: 'none', padding: 0, textAlign: 'left' }}
                     >
                        <div style={{ 
                          width: '36px', 
                          height: '36px', 
                          borderRadius: '50%', 
                          background: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          fontSize: '13px', 
                          fontWeight: 900, 
                          color: '#475569',
                          border: '2px solid #fff', 
                          boxShadow: '0 4px 10px rgba(0,0,0,0.06)' 
                        }}>
                          {rev.b ? rev.b[0] : 'B'}
                        </div>
                        <div>
                           <div style={{ fontSize: '13.5px', fontWeight: 900, color: '#0073b1', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#00598a'} onMouseLeave={e => e.currentTarget.style.color = '#0073b1'}>
                             {rev.b}
                           </div>
                           <div style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 600 }}>
                             {rev.u}
                           </div>
                        </div>
                     </button>
                     
                     <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f0fdf4', padding: '6px 12px', borderRadius: '100px', border: '1px solid #dcfce7', flexShrink: 0 }}>
                        <ShieldCheck size={12} color="#10B981" />
                        <span style={{ fontSize: '9.5px', fontWeight: 900, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Verified
                        </span>
                     </div>
                  </div>
               </Card>
             ))}
          </div>
       </div>

       <div style={{ marginTop: 'auto', width: '100%' }}>
          <TrustBadge />
          <TabNavigator activeTab="reviews" setActiveTab={setActiveTab} mob={mob} />
       </div>
    </motion.div>
  );
};

ReviewsTab.propTypes = { 
  c: PropTypes.object.isRequired, 
  mob: PropTypes.bool, 
  navigate: PropTypes.func.isRequired, 
  onWriteReview: PropTypes.func.isRequired, 
  setActiveTab: PropTypes.func.isRequired 
};
