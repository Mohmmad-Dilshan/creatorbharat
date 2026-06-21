import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, Play, X, Video, Disc, Clock } from 'lucide-react';
import { Btn } from '../../common/Primitives';
import { TrustBadge, TabNavigator, TabEmptyState } from './ProfileShared';

const PodcastItem = ({ pod, onPlay, mob }) => {
  const [isHovered, setIsHovered] = useState(false);
  const coverUrl = pod.thumbnail || 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&h=500&fit=crop';
  
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#fff',
        borderRadius: '32px',
        overflow: 'hidden',
        border: '1px solid #f1f5f9',
        boxShadow: isHovered ? '0 20px 40px rgba(15,23,42,0.06)' : '0 8px 32px rgba(0,0,0,0.02)',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* Cover Art Area */}
      <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: '#0f172a' }}>
        <img 
          src={coverUrl} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.4s ease'
          }} 
          alt={pod.title} 
        />
        
        {/* Hover overlay with Play button */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15,23,42,0.4)',
          backdropFilter: 'blur(4px)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <button 
            onClick={() => onPlay(pod)}
            style={{
              background: '#FF9431',
              color: '#fff',
              border: 'none',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(255,148,49,0.4)',
              transform: isHovered ? 'scale(1)' : 'scale(0.8)',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <Play size={28} fill="#fff" style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* Media type badges */}
        <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
          {pod.videoUrl && (
            <span style={{
              background: 'rgba(15,23,42,0.75)',
              backdropFilter: 'blur(4px)',
              color: '#fff',
              fontSize: '10px',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '100px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <Video size={10} /> Video
            </span>
          )}
          {pod.audioUrl && (
            <span style={{
              background: 'rgba(15,23,42,0.75)',
              backdropFilter: 'blur(4px)',
              color: '#fff',
              fontSize: '10px',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '100px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <Headphones size={10} /> Audio
            </span>
          )}
        </div>

        {/* Duration badge */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          background: 'rgba(15,23,42,0.75)',
          backdropFilter: 'blur(4px)',
          color: '#fff',
          fontSize: '10px',
          fontWeight: 800,
          padding: '4px 10px',
          borderRadius: '100px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Clock size={10} /> {pod.duration}
        </div>
      </div>

      {/* Episode metadata info */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
        <h3 style={{
          margin: 0,
          fontSize: '18px',
          fontWeight: 850,
          color: '#0f172a',
          lineHeight: 1.3,
          fontFamily: 'Outfit, sans-serif'
        }}>
          {pod.title}
        </h3>
        
        <p style={{
          margin: 0,
          fontSize: '13px',
          color: '#64748b',
          lineHeight: 1.5,
          fontWeight: 500,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {pod.description || 'No show notes provided for this episode.'}
        </p>

        {/* Play trigger button inside card */}
        <button
          onClick={() => onPlay(pod)}
          style={{
            marginTop: 'auto',
            background: 'rgba(255,148,49,0.06)',
            border: 'none',
            borderRadius: '16px',
            padding: '12px 20px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#FF9431',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#FF9431'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,148,49,0.06)'; e.currentTarget.style.color = '#FF9431'; }}
        >
          <Play size={14} fill="currentColor" /> Play Episode
        </button>
      </div>
    </div>
  );
};
PodcastItem.propTypes = {
  pod: PropTypes.object.isRequired,
  onPlay: PropTypes.func.isRequired,
  mob: PropTypes.bool
};

const PodcastPlayerPortal = ({ pod, onClose, creatorName, mob }) => {
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  
  // Decide whether to show video or audio. If a videoUrl exists, show video. Otherwise show audio.
  const hasVideo = !!pod.videoUrl;
  const mediaUrl = hasVideo ? pod.videoUrl : pod.audioUrl;

  return createPortal(
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10, 10, 10, 0.85)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
        padding: '24px'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: hasVideo ? '760px' : '450px',
          background: '#0f172a',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '32px',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '10px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px' }}>
              HOSTED BY {creatorName.toUpperCase()}
            </span>
            <h4 style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: 800, color: '#fff', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {pod.title}
            </h4>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#94a3b8'; }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Media Player Frame */}
        <div style={{ background: '#090d16' }}>
          {hasVideo ? (
            <video 
              ref={videoRef}
              src={mediaUrl}
              controls
              autoPlay
              poster={pod.thumbnail || undefined}
              style={{ width: '100%', aspectRatio: '16/9', display: 'block' }}
            />
          ) : (
            <div style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              {/* Audio Cover Disc Animation */}
              <div style={{ position: 'relative', width: '160px', height: '160px', borderRadius: '50%', overflow: 'hidden', boxShadow: '0 12px 36px rgba(0,0,0,0.4)', border: '4px solid #1e293b' }}>
                <img 
                  src={pod.thumbnail || 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&h=500&fit=crop'} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    animation: 'spin 12s infinite linear'
                  }} 
                  alt="" 
                />
                <div style={{ position: 'absolute', inset: '60px', background: '#090d16', borderRadius: '50%', border: '4px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Disc size={20} color="#FF9431" style={{ animation: 'spin 3s infinite linear' }} />
                </div>
              </div>

              <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
              `}</style>

              {/* HTML5 Audio Tag */}
              <audio 
                ref={audioRef}
                src={mediaUrl}
                controls
                autoPlay
                style={{ width: '100%', maxWidth: '350px', height: '40px', borderRadius: '100px' }}
              />
            </div>
          )}
        </div>

        {/* Episode Notes Footer */}
        <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', background: '#0f172a' }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', lineHeight: 1.6, maxHeight: '80px', overflowY: 'auto' }} className="no-scrollbar">
            {pod.description || 'No additional show notes.'}
          </p>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};
PodcastPlayerPortal.propTypes = {
  pod: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  creatorName: PropTypes.string.isRequired,
  mob: PropTypes.bool
};

export const PodcastsTab = ({ c, mob, setActiveTab }) => {
  const [activeEpisode, setActiveEpisode] = useState(null);
  
  const episodes = c.podcasts || [];

  if (episodes.length === 0) {
    return <TabEmptyState title="Podcasts" icon={Headphones} mob={mob} setActiveTab={setActiveTab} tabId="podcasts" />;
  }

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
          <div>
            <h2 style={{ fontSize: mob ? '26px' : '32px', fontWeight: 950, color: '#0f172a', margin: 0 }}>Show & Podcasts</h2>
            <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748b', fontWeight: 500 }}>Listen to original broadcasts and shows hosted by {c.name}.</p>
          </div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px' }}>Broadcast Network</div>
        </div>

        {/* Podcasts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: mob ? '20px' : '32px' }}>
          {episodes.map((pod) => (
            <PodcastItem 
              key={pod.id} 
              pod={pod} 
              onPlay={setActiveEpisode} 
              mob={mob} 
            />
          ))}
        </div>
      </div>

      {activeEpisode && (
        <PodcastPlayerPortal 
          pod={activeEpisode} 
          onClose={() => setActiveEpisode(null)} 
          creatorName={c.name} 
          mob={mob} 
        />
      )}
    </motion.div>
  );
};
PodcastsTab.propTypes = {
  c: PropTypes.object.isRequired,
  mob: PropTypes.bool,
  setActiveTab: PropTypes.func.isRequired
};
