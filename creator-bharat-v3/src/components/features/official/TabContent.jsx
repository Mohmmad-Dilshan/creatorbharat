import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, BookOpen } from 'lucide-react';
import { OFFICIAL_DATA } from './officialData';
import IntelligenceHub from './IntelligenceHub';
import RoadmapTimeline from './RoadmapTimeline';
import MastermindSection from './MastermindSection';
import ReviewSlider from './ReviewSlider';
import InsightsGrid from './InsightsGrid';

export default function TabContent({ activeTab, mob }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [hoveredPostId, setHoveredPostId] = useState(null);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab} 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.2 }}
        >
           {activeTab === 'posts' && (
             <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: mob ? '16px' : '28px' }}>
                {OFFICIAL_DATA.posts.map(post => {
                  const Icon = post.icon;
                  const isHovered = hoveredPostId === post.id;
                  const accentColor = post.color === '#000' || post.color === '#0f172a' ? '#FF9431' : post.color;

                  return (
                    <div 
                      key={post.id} 
                      onClick={() => setSelectedPost(post)}
                      onMouseEnter={() => setHoveredPostId(post.id)}
                      onMouseLeave={() => setHoveredPostId(null)}
                      style={{ 
                        aspectRatio: mob ? 'auto' : '1/1',
                        minHeight: mob ? '140px' : 'auto',
                        background: isHovered 
                          ? `linear-gradient(135deg, #0f172a 0%, #1e293b 100%), radial-gradient(circle at top right, ${accentColor}15, transparent 60%)`
                          : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
                        borderRadius: '24px',
                        padding: mob ? '20px' : '28px',
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        border: isHovered ? `1px solid ${accentColor}70` : '1px solid rgba(255,255,255,0.05)',
                        boxShadow: isHovered 
                          ? `0 12px 35px ${accentColor}15, inset 0 0 12px ${accentColor}10` 
                          : '0 8px 30px rgba(15,23,42,0.1)',
                        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      {/* Background accent glow orb */}
                      <div style={{
                        position: 'absolute',
                        right: '-30px',
                        top: '-30px',
                        width: '100px',
                        height: '100px',
                        background: `radial-gradient(circle, ${accentColor}25 0%, transparent 70%)`,
                        opacity: isHovered ? 1 : 0.4,
                        transition: 'opacity 0.3s ease',
                        pointerEvents: 'none'
                      }} />

                      {/* Top Row: Category tag and Icon */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', position: 'relative', zIndex: 1 }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 900,
                          color: accentColor,
                          background: `${accentColor}15`,
                          border: `1.5px solid ${accentColor}25`,
                          padding: '4px 10px',
                          borderRadius: '100px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.8px'
                        }}>
                          {post.category}
                        </span>
                        <div style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          background: isHovered ? `${accentColor}20` : 'rgba(255,255,255,0.05)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isHovered ? accentColor : '#fff',
                          border: isHovered ? `1.5px solid ${accentColor}30` : '1px solid rgba(255,255,255,0.05)',
                          transform: isHovered ? 'scale(1.15) rotate(12deg)' : 'scale(1) rotate(0)',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}>
                          <Icon size={18} />
                        </div>
                      </div>

                      {/* Middle: Title & Brief Description */}
                      <div style={{ marginTop: mob ? '16px' : 'auto', marginBottom: mob ? '8px' : '10px', position: 'relative', zIndex: 1 }}>
                        <h4 style={{ 
                          color: '#fff', 
                          fontSize: mob ? '17px' : '20px', 
                          fontWeight: 950,
                          margin: '0 0 6px 0',
                          letterSpacing: '-0.02em',
                          transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                          transition: 'transform 0.3s ease'
                        }}>
                          {post.title}
                        </h4>
                        <p style={{ 
                          color: isHovered ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.55)', 
                          fontSize: '12px', 
                          margin: 0,
                          lineHeight: '1.6',
                          display: '-webkit-box',
                          WebkitLineClamp: mob ? 2 : 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          fontWeight: 500,
                          transition: 'color 0.3s ease'
                        }}>
                          {post.summary}
                        </p>
                      </div>

                      {/* Bottom Row: Read time indicators */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: '11px',
                        fontWeight: 650,
                        marginTop: mob ? '8px' : '0',
                        position: 'relative',
                        zIndex: 1
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={12} color={isHovered ? accentColor : 'rgba(255,255,255,0.4)'} /> {post.readTime}
                        </div>
                        <span style={{ 
                          color: accentColor, 
                          opacity: isHovered ? 1 : 0, 
                          transform: isHovered ? 'translateX(0)' : 'translateX(-6px)',
                          transition: 'all 0.3s ease',
                          fontWeight: 800
                        }}>
                          READ PROTOCOL →
                        </span>
                      </div>
                    </div>
                  );
                })}
             </div>
           )}
           {activeTab === 'mastermind' && (
              <div>
                 <IntelligenceHub mob={mob} />
                 <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', margin: '40px 0' }} />
                 <RoadmapTimeline />
                 <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', margin: '40px 0' }} />
                 <MastermindSection mob={mob} />
                 <ReviewSlider mob={mob} />
              </div>
           )}
           {activeTab === 'insights' && <InsightsGrid mob={mob} />}
        </motion.div>
      </AnimatePresence>

      {/* Interactive Detail Modal */}
      <AnimatePresence>
        {selectedPost && (() => {
          const accentColor = selectedPost.color === '#000' || selectedPost.color === '#0f172a' ? '#FF9431' : selectedPost.color;
          
          // Split fullContent by newline and parse bullets
          const formattedContent = selectedPost.fullContent.split('\n').map((line, idx) => {
            const trimmed = line.trim();
            if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
              const cleanedText = trimmed.replace(/^[•-]\s*/, '');
              const parts = cleanedText.split(':');
              if (parts.length > 1) {
                return (
                  <div key={idx} style={{ marginBottom: '12px', display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#e2e8f0' }}>
                    <span style={{ color: accentColor, fontWeight: 900, fontSize: '14px' }}>⚡</span>
                    <span style={{ fontSize: '13px', lineHeight: 1.6 }}>
                      <strong style={{ color: '#fff', fontFamily: 'monospace', fontWeight: 700 }}>{parts[0]}:</strong>
                      {parts.slice(1).join(':')}
                    </span>
                  </div>
                );
              }
              return (
                <div key={idx} style={{ marginBottom: '12px', display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#e2e8f0' }}>
                  <span style={{ color: accentColor, fontWeight: 900, fontSize: '14px' }}>⚡</span>
                  <span style={{ fontSize: '13px', lineHeight: 1.6 }}>{cleanedText}</span>
                </div>
              );
            }
            return (
              <p key={idx} style={{ margin: '0 0 16px 0', color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', lineHeight: 1.7, fontWeight: 400 }}>
                {line}
              </p>
            );
          });

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 3000,
                background: 'rgba(15,23,42,0.9)',
                backdropFilter: 'blur(16px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '100%',
                  maxWidth: '650px',
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '1.5px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '32px',
                  padding: mob ? '28px 20px' : '40px',
                  position: 'relative',
                  boxShadow: `0 25px 50px -12px ${accentColor}20, 0 0 40px ${accentColor}10`,
                  color: '#f8fafc'
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPost(null)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#94a3b8',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color = '#94a3b8';
                  }}
                >
                  <X size={18} />
                </button>

                {/* Category Badge */}
                <span style={{
                  fontSize: '11px',
                  fontWeight: 900,
                  color: accentColor,
                  background: `${accentColor}15`,
                  border: `1px solid ${accentColor}30`,
                  padding: '6px 14px',
                  borderRadius: '100px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  display: 'inline-block',
                  marginBottom: '18px'
                }}>
                  {selectedPost.category}
                </span>

                {/* Title */}
                <h3 style={{
                  fontSize: mob ? '22px' : '28px',
                  fontWeight: 950,
                  color: '#fff',
                  margin: '0 0 12px 0',
                  letterSpacing: '-0.03em'
                }}>
                  {selectedPost.title}
                </h3>

                {/* Metadata row */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  color: '#94a3b8',
                  fontSize: '12px',
                  fontWeight: 650,
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  paddingBottom: '20px',
                  marginBottom: '24px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} color={accentColor} /> {selectedPost.date}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BookOpen size={14} color={accentColor} /> {selectedPost.readTime}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }} />
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#22c55e', textTransform: 'uppercase' }}>SIGNED_SECURE</span>
                  </div>
                </div>

                {/* Monospace Code-Block Specifications Console */}
                <div style={{
                  background: '#090d16',
                  border: '1.5px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px',
                  padding: mob ? '20px 16px' : '24px',
                  fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
                  fontSize: '13px',
                  maxHeight: mob ? '250px' : '320px',
                  overflowY: 'auto',
                  color: '#cbd5e1',
                  position: 'relative',
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)'
                }}>
                  {/* Console Controls Decoration */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
                    </div>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 800 }}>MANIFEST_SPEC_00{selectedPost.id}</span>
                  </div>
                  
                  {/* Formatted Content */}
                  <div>
                    {formattedContent}
                  </div>
                </div>

                {/* Footer CTA */}
                <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>CB_SYSTEM_HASH: 0x9f1a...{selectedPost.id}82</span>
                  <button
                    onClick={() => setSelectedPost(null)}
                    style={{
                      background: accentColor,
                      color: '#fff',
                      border: 'none',
                      padding: '12px 28px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      cursor: 'pointer',
                      boxShadow: `0 8px 20px ${accentColor}30`,
                      transition: 'transform 0.2s, filter 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
                  >
                    Acknowledge Manifest
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </>
  );
}

TabContent.propTypes = {
  activeTab: PropTypes.string.isRequired,
  mob: PropTypes.bool.isRequired
};
