import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.2fr 2fr', gap: '40px', marginBottom: '60px' }}>
          <div>
              <Card style={{ 
                padding: '40px', 
                textAlign: 'center', 
                borderRadius: '40px', 
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
                color: '#0f172a', 
                border: '1.5px solid rgba(226, 232, 240, 0.8)',
                boxShadow: '0 20px 40px rgba(15,23,42,0.03)',
                marginBottom: '24px' 
              }}>
                 <div style={{ fontSize: '12px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Aggregate Authority</div>
                 <div style={{ fontSize: '72px', fontWeight: 950, color: '#0f172a', lineHeight: 1, marginBottom: '8px' }}>{averageRating}</div>
                 <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '16px' }}>
                    {[1,2,3,4,5].map(s => {
                      const roundedRating = Math.round(Number(averageRating));
                      return <Star key={s} size={20} fill={s <= roundedRating ? '#FF9431' : 'none'} color={s <= roundedRating ? '#FF9431' : '#cbd5e1'} />;
                    })}
                 </div>
                 <div style={{ fontSize: '14px', fontWeight: 750, color: '#64748b' }}>Based on {c.reviews_count || totalReviews} Verified Collaborations</div>
              </Card>
              <Btn full lg onClick={() => onWriteReview()} style={{ borderRadius: '100px', background: 'linear-gradient(90deg, #FF9431, #EA580C)', color: '#fff', border: 'none', gap: '10px', boxShadow: '0 12px 24px rgba(234, 88, 12, 0.2)' }}>
                  <Star size={18} fill="currentColor" /> Write a Review
              </Btn>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             {reviews.map((rev) => (
               <Card key={rev.id || Math.random()} style={{ padding: '32px', borderRadius: '32px', border: '1.5px solid #f1f5f9', background: '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                     <div>
                        <div style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
                           {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s <= rev.r ? '#FF9431' : 'none'} color={s <= rev.r ? '#FF9431' : '#cbd5e1'} />)}
                        </div>
                        <h4 style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a' }}>"{rev.t}"</h4>
                     </div>
                     <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8' }}>{rev.d}</div>
                  </div>
                  <button 
                     onClick={() => rev.type ? navigate(`/${rev.type}/${rev.id}`) : null} 
                     style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', outline: 'none', background: 'none', border: 'none', padding: 0, textAlign: 'left', width: '100%' }}
                  >
                     <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, border: '2px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>{rev.b[0]}</div>
                     <div>
                        <div style={{ fontSize: '15px', fontWeight: 900, color: '#0073b1', textDecoration: 'underline' }}>{rev.b}</div>
                        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 650 }}>{rev.u}</div>
                     </div>
                  </button>
               </Card>
             ))}
          </div>
       </div>
       <TrustBadge />
       <TabNavigator activeTab="reviews" setActiveTab={setActiveTab} mob={mob} />
    </motion.div>
  );
};
ReviewsTab.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, navigate: PropTypes.func.isRequired, onWriteReview: PropTypes.func.isRequired, setActiveTab: PropTypes.func.isRequired };
