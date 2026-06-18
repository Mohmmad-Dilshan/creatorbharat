import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, ArrowRight } from 'lucide-react';
import { Btn } from '../../common/Primitives';
import { TrustBadge, TabNavigator, TabEmptyState } from './ProfileShared';

const GalleryItem = ({ i, src, index, mob, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const imgUrl = typeof src === 'string' ? src : `https://picsum.photos/seed/elite-gal-${i}/1000/1000`;
  return (
    <button 
      key={`gal-${i}`} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative', aspectRatio: '1/1', borderRadius: '32px', overflow: 'hidden', cursor: 'pointer', border: '1px solid #f1f5f9', boxShadow: '0 8px 32px rgba(0,0,0,0.02)', outline: 'none', padding: 0, background: 'none', width: '100%', display: 'block' }}
      onClick={() => onClick(index)}
    >
      <img src={imgUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
      <span style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ background: '#fff', padding: '16px', borderRadius: '50%', color: '#0f172a', display: 'flex' }}><ImageIcon size={24} /></span>
      </span>
    </button>
  );
};
GalleryItem.propTypes = { i: PropTypes.number.isRequired, src: PropTypes.any, index: PropTypes.number.isRequired, mob: PropTypes.bool, onClick: PropTypes.func.isRequired };

export const GalleryTab = ({ c, mob, setActiveTab }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const isDummy = c.id === 'fallback';
  if (!c.gallery && !isDummy) return <TabEmptyState title="Gallery" icon={ImageIcon} mob={mob} setActiveTab={setActiveTab} tabId="gallery" />;
  const images = c.gallery || [1,2,3,4,5,6,7,8,9];

  const getImgUrl = (idx) => {
    if (idx === null || idx < 0 || idx >= images.length) return '';
    const src = images[idx];
    return typeof src === 'string' ? src : `https://picsum.photos/seed/elite-gal-${idx + 1}/1000/1000`;
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Right') {
        setActiveIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'Escape' || e.key === 'Esc') {
        setActiveIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, images.length]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
       <div style={{ marginBottom: mob ? '24px' : '60px' }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: mob ? 'column' : 'row', 
            alignItems: mob ? 'flex-start' : 'center', 
            justifyContent: 'space-between', 
            gap: mob ? '8px' : '20px',
            marginBottom: '32px' 
          }}>
             <h2 style={{ fontSize: mob ? '26px' : '32px', fontWeight: 950, color: '#0f172a', margin: 0 }}>Lifestyle Gallery</h2>
             <div style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px' }}>The Elite Visual Identity</div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: mob ? '16px' : '24px' }}>
             {images.map((img, idx) => (
                <GalleryItem key={img} i={idx + 1} index={idx} src={img} mob={mob} onClick={setActiveIndex} />
             ))}
          </div>
          <div style={{ marginTop: mob ? '20px' : '48px', textAlign: 'center' }}>
             <Btn lg onClick={() => window.open('https://instagram.com', '_blank', 'noopener,noreferrer')} style={{ borderRadius: '100px', background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', gap: '10px' }}>
                Follow on Instagram <ArrowRight size={20} />
             </Btn>
          </div>
       </div>

       {activeIndex !== null && createPortal(
         <AnimatePresence>
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={() => setActiveIndex(null)}
             style={{
               position: 'fixed',
               inset: 0,
               background: 'rgba(10, 10, 10, 0.95)',
               backdropFilter: 'blur(20px)',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               zIndex: 999999,
               padding: '24px'
             }}
           >
             {/* Lightbox Header */}
             <div style={{ position: 'absolute', top: '24px', left: '24px', right: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', zIndex: 10 }}>
                <div style={{ fontSize: '14px', fontWeight: 750, color: '#94a3b8' }}>
                   Image {activeIndex + 1} of {images.length}
                </div>
                <button 
                  onClick={() => setActiveIndex(null)} 
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '18px',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  ✕
                </button>
             </div>

             {/* Main Container with Nav buttons and Image */}
             <div style={{ position: 'relative', width: '100%', maxWidth: '900px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: mob ? '50vh' : '70vh' }}>
                {/* Left Arrow Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveIndex((prev) => (prev - 1 + images.length) % images.length); }}
                  style={{
                    position: 'absolute',
                    left: mob ? '12px' : '-80px',
                    background: 'rgba(20, 20, 20, 0.6)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: mob ? '44px' : '56px',
                    height: mob ? '44px' : '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '24px',
                    zIndex: 10,
                    transition: 'all 0.2s',
                    backdropFilter: 'blur(8px)',
                    outline: 'none'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'scale(1.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(20, 20, 20, 0.6)'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  ‹
                </button>

                {/* Image Wrapper */}
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                  <motion.img
                    key={activeIndex}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    src={getImgUrl(activeIndex)}
                    alt={`Gallery item ${activeIndex + 1}`}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      borderRadius: '24px',
                      objectFit: 'contain',
                      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)'
                    }}
                  />
                </div>

                {/* Right Arrow Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveIndex((prev) => (prev + 1) % images.length); }}
                  style={{
                    position: 'absolute',
                    right: mob ? '12px' : '-80px',
                    background: 'rgba(20, 20, 20, 0.6)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: mob ? '44px' : '56px',
                    height: mob ? '44px' : '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '24px',
                    zIndex: 10,
                    transition: 'all 0.2s',
                    backdropFilter: 'blur(8px)',
                    outline: 'none'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'scale(1.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(20, 20, 20, 0.6)'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  ›
                </button>
             </div>

             {/* Bottom watermark or caption */}
             <div style={{ position: 'absolute', bottom: '24px', color: '#64748b', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>
                Lifestyle Showcase • CreatorBharat verified
             </div>
           </motion.div>
         </AnimatePresence>,
         document.body
       )}

        <div style={{ marginTop: 'auto', width: '100%' }}>
           <TrustBadge />
           <TabNavigator activeTab="gallery" setActiveTab={setActiveTab} mob={mob} />
        </div>
     </motion.div>
  );
};
GalleryTab.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, setActiveTab: PropTypes.func.isRequired };
