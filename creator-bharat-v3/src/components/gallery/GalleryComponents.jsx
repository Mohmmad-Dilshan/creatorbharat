import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Video, Image, Calendar, MapPin, Play, Pause, X, 
  Volume2, VolumeX, Clock, Activity, Camera, SlidersHorizontal, ArrowUpDown
} from 'lucide-react';

// 1. Gallery Header Component (SaaS Telemetry Stats)
export function GalleryHeader({ stats }) {
  return (
    <div style={{
      padding: '80px 0 40px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Blur Spheres */}
      <div style={{
        position: 'absolute', top: -100, right: '10%', width: 250, height: 250,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,148,49,0.1) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', bottom: -50, left: '5%', width: 200, height: 200,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
        filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lg: '1.1fr 0.9fr', gap: 48, alignItems: 'center' }}>
          {/* Left Title and Stats block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,148,49,0.08)', padding: '6px 16px', borderRadius: 100, marginBottom: 16 }}>
                <Activity size={14} color="#FF9431" className="animate-pulse" />
                <span style={{ fontSize: 11, fontWeight: 800, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"Outfit", sans-serif' }}>Community Footprint</span>
              </div>
              <h1 className="influence-heading" style={{
                fontSize: '44px', fontWeight: 900, color: '#0f172a',
                lineHeight: 1.1, marginBottom: 16, fontFamily: '"Outfit", sans-serif',
                letterSpacing: '-0.02em'
              }}>
                Ecosystem Gallery
              </h1>
              <p style={{
                fontSize: '16px', color: '#475569', lineHeight: 1.6,
                maxWidth: 620, fontFamily: '"Outfit", sans-serif', margin: 0
              }}>
                Explore visual highlights of India's most trusted creator-brand network. Community summits, brand deals, live workshops, and engineering nodes syncing across the nation.
              </p>
            </div>

            {/* Stats row inside left block */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid #e2e8f0',
              borderRadius: 20,
              padding: '20px',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.03)'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', fontFamily: '"Outfit", sans-serif' }}>{stats.totalItems}</div>
                  <div style={{ fontSize: 10, color: '#64748b', fontWeight: 600, marginTop: 2 }}>Media Nodes</div>
                </div>
                <div style={{ borderLeft: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#FF9431', fontFamily: '"Outfit", sans-serif', paddingLeft: 4 }}>{stats.cities}+</div>
                  <div style={{ fontSize: 10, color: '#64748b', fontWeight: 600, marginTop: 2, paddingLeft: 4 }}>Locations</div>
                </div>
                <div style={{ borderLeft: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#10b981', fontFamily: '"Outfit", sans-serif', paddingLeft: 4 }}>4</div>
                  <div style={{ fontSize: 10, color: '#64748b', fontWeight: 600, marginTop: 2, paddingLeft: 4 }}>Categories</div>
                </div>
                <div style={{ borderLeft: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', fontFamily: '"Outfit", sans-serif', paddingLeft: 4 }}>{stats.totalHoursVideo}</div>
                  <div style={{ fontSize: 10, color: '#64748b', fontWeight: 600, marginTop: 2, paddingLeft: 4 }}>Video Hours</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Canva-style poster card */}
          <motion.div 
            whileHover={{ y: -6 }}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 24,
              padding: 12,
              boxShadow: '0 20px 40px rgba(15, 23, 42, 0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Ambient glows behind poster */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle at 80% 20%, rgba(255, 148, 49, 0.06) 0%, transparent 60%)',
              pointerEvents: 'none'
            }} />
            
            <div style={{
              borderRadius: 16,
              overflow: 'hidden',
              position: 'relative',
              paddingTop: '66.67%', // 3:2 Aspect Ratio
              background: '#f8fafc'
            }}>
              <img 
                src="/gallery_hero_group.png" 
                alt="CreatorBharat Ecosystem" 
                style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginTop: 14, padding: '0 8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} className="animate-pulse" />
                <span style={{ fontSize: 11, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ecosystem Feed</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#FF9431' }}>v1.0 Live</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

GalleryHeader.propTypes = {
  stats: PropTypes.object.isRequired
};

// 2. Filter & Search Toolbar Component
export function GalleryFilterToolbar({
  search, setSearch,
  activeCategory, setActiveCategory,
  activeType, setActiveType,
  sortBy, setSortBy
}) {
  const categories = ['All', 'Summits', 'Collaborations', 'Workshops', 'Media'];
  const mediaTypes = [
    { label: 'All Media', value: 'all' },
    { label: 'Photos Only', value: 'photo', icon: Camera },
    { label: 'Videos Only', value: 'video', icon: Play }
  ];

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: 24,
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
      marginBottom: 32
    }}>
      {/* Top row: Search input & Media type selectors */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Search Field */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '4px 14px',
          background: '#f8fafc', borderRadius: 14, border: '1px solid #e2e8f0',
          flex: 1, minWidth: 260, maxWidth: 360
        }}>
          <Search size={16} color="#64748b" />
          <input
            type="text"
            placeholder="Search events, cities, or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: 'none', border: 'none', outline: 'none',
              fontSize: 14, color: '#0f172a', fontWeight: 600,
              width: '100%', height: '36px',
              fontFamily: '"Outfit", sans-serif'
            }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Media Type Filter (Photos / Videos) */}
        <div style={{
          display: 'flex', background: '#f1f5f9', borderRadius: 12, padding: 4
        }}>
          {mediaTypes.map(type => {
            const Icon = type.icon;
            const active = activeType === type.value;
            return (
              <button
                key={type.value}
                onClick={() => setActiveType(type.value)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 14px', borderRadius: 9, border: 'none',
                  background: active ? '#ffffff' : 'transparent',
                  color: active ? '#FF9431' : '#64748b',
                  fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  boxShadow: active ? '0 2px 8px rgba(15, 23, 42, 0.05)' : 'none',
                  transition: 'all 0.2s',
                  fontFamily: '"Outfit", sans-serif'
                }}
              >
                {Icon && <Icon size={14} />}
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom row: Category Tabs & Sort Filter */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center',
        justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: 16
      }}>
        {/* Category Pill Switcher */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {categories.map(cat => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 16px', borderRadius: 100, border: '1px solid',
                  borderColor: active ? '#FF9431' : '#e2e8f0',
                  background: active ? '#FF9431' : '#ffffff',
                  color: active ? '#ffffff' : '#475569',
                  fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: '"Outfit", sans-serif'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sort selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ArrowUpDown size={14} color="#64748b" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 12px', borderRadius: 10, border: '1px solid #e2e8f0',
              background: '#ffffff', color: '#475569', fontSize: 13, fontWeight: 700,
              cursor: 'pointer', outline: 'none', fontFamily: '"Outfit", sans-serif'
            }}
          >
            <option value="latest">Latest Events</option>
            <option value="oldest">Oldest Events</option>
          </select>
        </div>
      </div>
    </div>
  );
}

GalleryFilterToolbar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired,
  setActiveCategory: PropTypes.func.isRequired,
  activeType: PropTypes.string.isRequired,
  setActiveType: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired
};

// 3. Grid Card Component
export function GalleryCard({ item, onClick }) {
  const isVideo = item.type === 'video';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -6 }}
      onClick={() => onClick(item)}
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 20,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }}
    >
      {/* Thumbnail section with hover blur overlay */}
      <div style={{
        position: 'relative', width: '100%', paddingTop: '62.5%', // 16:10 aspect
        overflow: 'hidden', background: '#f1f5f9'
      }}>
        <img 
          src={item.thumbnail} 
          alt={item.title}
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            objectFit: 'cover', transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="gallery-image-hover"
        />

        {/* Hover zoom styling hook */}
        <style>{`
          .gallery-image-hover {
            transform: scale(1);
          }
          div:hover > div > .gallery-image-hover {
            transform: scale(1.05);
          }
        `}</style>

        {/* Floating Category Badge */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          padding: '4px 10px', borderRadius: 100,
          background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)',
          fontSize: 10, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase',
          border: '1px solid #e2e8f0', letterSpacing: '0.02em', zIndex: 2
        }}>
          {item.category}
        </div>

        {/* Play / View Overlay Badge */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(15, 23, 42, 0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0, transition: 'opacity 0.2s', zIndex: 1
        }}
        className="gallery-overlay"
        >
          <div style={{
            width: 44, height: 44, borderRadius: '50%', background: '#ffffff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
            transform: 'scale(0.9)', transition: 'transform 0.2s'
          }}
          className="gallery-play-icon"
          >
            {isVideo ? (
              <Play size={18} color="#FF9431" fill="#FF9431" style={{ marginLeft: 2 }} />
            ) : (
              <Camera size={18} color="#FF9431" />
            )}
          </div>
        </div>

        <style>{`
          .gallery-overlay { opacity: 0; }
          div:hover > div > .gallery-overlay { opacity: 1; }
          div:hover > div > .gallery-overlay > .gallery-play-icon { transform: scale(1); }
        `}</style>

        {/* Duration sticker for videos */}
        {isVideo && item.duration && (
          <div style={{
            position: 'absolute', bottom: 12, right: 12,
            padding: '2px 8px', borderRadius: 6, background: 'rgba(15,23,42,0.75)',
            color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4
          }}>
            <Clock size={10} /> {item.duration}
          </div>
        )}
      </div>

      {/* Content description metadata */}
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontSize: 16, fontWeight: 800, color: '#0f172a',
          marginBottom: 8, lineHeight: 1.3, fontFamily: '"Outfit", sans-serif'
        }}>
          {item.title}
        </h3>
        <p style={{
          fontSize: 13, color: '#475569', lineHeight: 1.5,
          marginBottom: 16, flex: 1, fontFamily: '"Outfit", sans-serif'
        }}>
          {item.description.length > 100 ? `${item.description.slice(0, 96)}...` : item.description}
        </p>

        {/* Footer info: Location & Date tags */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16, borderTop: '1px solid #f1f5f9',
          paddingTop: 12, fontSize: 11, fontWeight: 700, color: '#64748b'
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <MapPin size={12} color="#94a3b8" />
            {item.location}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
            <Calendar size={12} color="#94a3b8" />
            {item.date}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

GalleryCard.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

// 4. Lightbox Overlay Modal Component (featuring fully functional HTML5 video player)
export function MediaLightboxModal({ item, onClose }) {
  const isVideo = item.type === 'video';
  
  // Custom video player states
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log('Video play failed:', err));
    }
  };

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const seekTime = Number(e.target.value);
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // Autoplay video on modal launch
  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false); // Autoplay blocked
      });
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [isVideo, item]);

  // Formatter helper for video time
  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 2000000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px'
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: 24,
          maxWidth: 900,
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
      >
        {/* Media Window wrapper */}
        <div style={{ position: 'relative', background: '#090d16', width: '100%', paddingTop: '56.25%' }}>
          
          {/* Close button inside media window */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', zIndex: 100, transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#FF9431'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.6)'}
          >
            <X size={20} />
          </button>

          {isVideo ? (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <video
                ref={videoRef}
                src={item.videoUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={togglePlay}
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }}
              />

              {/* Central Pause Overlay trigger indicator */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  style={{
                    position: 'absolute', width: 72, height: 72, borderRadius: '50%',
                    background: '#FF9431', border: 'none', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 25px rgba(255,148,49,0.4)', cursor: 'pointer',
                    zIndex: 2, transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <Play size={30} fill="#ffffff" style={{ marginLeft: 4 }} />
                </button>
              )}

              {/* Custom Controls Panel */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(9,13,22,0.95) 0%, rgba(9,13,22,0.4) 70%, transparent 100%)',
                padding: '20px', display: 'flex', flexDirection: 'column', gap: 10,
                zIndex: 3
              }}>
                {/* Timeline slider row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    style={{
                      flex: 1, height: 4, borderRadius: 2, accentColor: '#FF9431',
                      cursor: 'pointer', background: 'rgba(255,255,255,0.2)', outline: 'none'
                    }}
                  />
                </div>

                {/* Control Action Buttons Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    {/* Play/Pause */}
                    <button onClick={togglePlay} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      {isPlaying ? <Pause size={18} fill="#ffffff" /> : <Play size={18} fill="#ffffff" />}
                    </button>
                    
                    {/* Volume Mute Toggle */}
                    <button onClick={toggleMute} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>

                    {/* Time Counter */}
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  {/* Telemetry info */}
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Active Feed Sync
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ position: 'absolute', inset: 0 }}>
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          )}
        </div>

        {/* Details & Info description segment below media */}
        <div style={{ padding: '24px 28px', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{
              padding: '4px 10px', borderRadius: 6, background: '#FF943115',
              fontSize: 10, fontWeight: 800, color: '#FF9431', textTransform: 'uppercase'
            }}>
              {item.category}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: '#64748b', marginLeft: 'auto' }}>
              <MapPin size={12} color="#94a3b8" />
              {item.location}
            </div>
          </div>

          <h2 style={{
            fontSize: 20, fontWeight: 900, color: '#0f172a',
            marginBottom: 8, fontFamily: '"Outfit", sans-serif'
          }}>
            {item.title}
          </h2>
          <p style={{
            fontSize: 14, color: '#475569', lineHeight: 1.6,
            marginBottom: 16, fontFamily: '"Outfit", sans-serif'
          }}>
            {item.description}
          </p>

          {/* Tags List */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {item.tags.map(tag => (
              <span 
                key={tag} 
                style={{ 
                  fontSize: 11, fontWeight: 700, color: '#475569', 
                  background: '#f1f5f9', padding: '4px 10px', borderRadius: 8 
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

MediaLightboxModal.propTypes = {
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};
