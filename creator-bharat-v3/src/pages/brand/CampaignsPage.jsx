import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/core/context';
import { fmt, LS } from '../../utils/helpers';
import { fetchCampaigns } from '../../utils/platformService';
import { Btn, SkeletonCard, Empty, Modal, Fld } from '@/components/common/Primitives';
import { CampCard } from '@/components/common/Cards';
import EliteHeader from '../../components/layout/EliteHeader';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { LayoutGrid, Smartphone, Zap, CheckCircle2, XCircle, Search, Rocket, ArrowRight, TrendingUp, Users, Target, ShieldCheck, Star, Camera, Heart, Sliders } from 'lucide-react';

const SwipeCard = ({ campaign: c, onSwipe, onApply }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const colorRight = useTransform(x, [50, 150], ['rgba(16, 185, 129, 0)', 'rgba(16, 185, 129, 1)']);
  const colorLeft = useTransform(x, [-150, -50], ['rgba(239, 68, 68, 1)', 'rgba(239, 68, 68, 0)']);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) onSwipe('right', c);
    else if (info.offset.x < -100) onSwipe('left', c);
  };

  return (
    <motion.div
      style={{ x, rotate, opacity, position: 'absolute', width: '100%', height: '100%', cursor: 'grab' }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
        <CampCard campaign={c} onApply={() => onApply(c)} />
        
        <motion.div style={{ position: 'absolute', inset: 0, background: colorRight, borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 20 }}>
           <CheckCircle2 size={100} color="#fff" />
        </motion.div>
        <motion.div style={{ position: 'absolute', inset: 0, background: colorLeft, borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 20 }}>
           <XCircle size={100} color="#fff" />
        </motion.div>
      </div>
    </motion.div>
  );
};

SwipeCard.propTypes = {
  campaign: PropTypes.object.isRequired,
  onSwipe: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired
};

export default function CampaignsPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const { cpf: f } = st;
  const [loading, setLoading] = useState(true);
  const [all, setAll] = useState([]);
  const [modal, setModal] = useState(null);
  const [done, setDone] = useState(false);
  const [aF, setAF] = useState({ pitch: '', portfolio: '', rate: '' });
  const [viewMode, setViewMode] = useState('grid');
  const [swipeIndex, setSwipeIndex] = useState(0);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    setLoading(true);
    fetchCampaigns({ limit: 100 }).then(list => {
      setAll(list);
      setLoading(false);
    }).catch(() => {
       setLoading(false);
    });
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type: type || 'info', msg } });
  const filtered = all.filter(c => {
    const q = (f.q || '').toLowerCase();
    const title = (c.title || '').toLowerCase();
    const brand = (typeof c.brand === 'object' ? c.brand.companyName : (c.brand || '')).toLowerCase();
    if (q && !title.includes(q) && !brand.includes(q)) return false;
    if (f.niche && !ensureArray(c.niche).includes(f.niche)) return false;
    if (f.urgent && !c.urgent) return false;
    return true;
  });

  const ensureArray = val => {
    if (Array.isArray(val)) return val;
    return val ? [val] : [];
  };

  const submitApply = (overrideCamp) => {
    const target = overrideCamp || modal;
    if (!st.user) { navigate('/login'); return; }
    
    LS.push('cb_applications', { 
      id: 'app-' + Date.now(), 
      campaignId: target.id, 
      campaignTitle: target.title, 
      brand: target.brand, 
      applicantEmail: st.user?.email, 
      applicantName: st.user?.name, 
      pitch: aF.pitch || 'Quick Apply via Swipe', 
      portfolio: aF.portfolio, 
      rate: aF.rate, 
      status: 'applied', 
      date: new Date().toISOString() 
    });
    
    dsp({ t: 'APPLY', id: target.id }); 
    setDone(true);
    toast(`Application sent for "${target.title}"`, 'success');
  };

  const handleSwipe = (dir, camp) => {
    if (dir === 'right') {
      submitApply(camp);
    }
    setSwipeIndex(p => p + 1);
  };

  const clearFilters = () => dsp({ t: 'CPF', v: { q: '', niche: '', urgent: false } });

  const isPublic = !st.user;

  const handleApplyClick = (camp) => {
    if (isPublic) {
      navigate('/login');
    } else {
      setModal(camp); 
      setDone(false); 
      setAF({ pitch: '', portfolio: '', rate: '' });
    }
  };

  const CategoryChips = () => {
    const niches = ['All', 'Fashion', 'Tech', 'Lifestyle', 'Gaming', 'Fitness', 'Beauty', 'Finance', 'Food'];
    return (
      <div style={{ width: '100%', position: 'relative', overflow: 'hidden', padding: mob ? '10px 0 20px' : '16px 0 24px' }}>
        {/* Premium Fade Indicators — mobile only */}
        {mob && (
          <>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '40px', background: 'linear-gradient(90deg, #fff 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40px', background: 'linear-gradient(-90deg, #fff 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }} />
          </>
        )}
        
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          overflowX: mob ? 'auto' : 'visible',
          flexWrap: mob ? 'nowrap' : 'wrap',
          padding: mob ? '5px 20px 15px' : '0', 
          width: '100%', 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          boxSizing: 'border-box',
          justifyContent: mob ? 'flex-start' : 'center'
        }}>
          {niches.map(n => {
            const active = f.niche === (n === 'All' ? '' : n);
            return (
              <motion.button
                key={n}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dsp({ t: 'CPF', v: { niche: n === 'All' ? '' : n } })}
                style={{ 
                  padding: mob ? '10px 24px' : '12px 28px', 
                  borderRadius: '100px', 
                  border: 'none',
                  background: active 
                    ? 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)' 
                    : '#fff', 
                  color: active ? '#fff' : '#64748b',
                  fontSize: mob ? '13px' : '14px', 
                  fontWeight: 900, 
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: active 
                    ? '0 10px 25px rgba(255,148,49,0.3)' 
                    : '0 4px 15px rgba(0,0,0,0.04)',
                  flexShrink: 0,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  border: active ? 'none' : '1px solid #f1f5f9'
                }}
              >
                {n}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  const SearchBar = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: mob ? '24px' : '20px', boxSizing: 'border-box' }}>
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        flexDirection: mob ? 'column' : 'row', 
        width: '100%', 
        maxWidth: mob ? '100%' : '880px', 
        margin: '0 auto',
        justifyContent: 'center', 
        padding: mob ? '0 20px' : '0',
        boxSizing: 'border-box',
        alignItems: 'center'
      }}>
        {/* Ultra-Tactile Search Bar */}
        <div style={{ width: '100%', position: 'relative', boxSizing: 'border-box' }}>
            <motion.div 
              initial={false}
              animate={{ boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                background: '#fff', 
                borderRadius: '30px', 
                padding: mob ? '10px 10px 10px 20px' : '14px 14px 14px 32px', 
                border: '1px solid #f1f5f9',
                position: 'relative',
                boxSizing: 'border-box',
                width: '100%'
              }}
            >
              <Search size={mob ? 20 : 22} color="#FF9431" style={{ marginRight: mob ? '12px' : '18px', flexShrink: 0 }} />
                <input 
                  id="campaign-search-input"
                  name="campaign_q"
                  value={f.q} 
                  onChange={e => dsp({ t: 'CPF', v: { q: e.target.value } })} 
                  placeholder={mob ? "Search campaigns..." : "Search premium deal flow, brands..."} 
                  style={{ 
                    flex: 1, 
                    border: 'none', 
                    background: 'none', 
                    outline: 'none', 
                    fontWeight: 700, 
                    fontSize: mob ? '15px' : '17px', 
                    color: '#0f172a', 
                    width: '100%', 
                    minWidth: 0,
                    letterSpacing: '-0.01em'
                  }}
                />
                
                <button 
                  style={{ 
                    background: '#0f172a', 
                    border: 'none', 
                    width: mob ? '44px' : '52px', 
                    height: mob ? '44px' : '52px', 
                    borderRadius: '22px', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#fff', 
                    flexShrink: 0,
                    boxShadow: '0 10px 20px rgba(15,23,42,0.2)'
                  }}
                >
                   <Sliders size={mob ? 18 : 20} />
                </button>

                {!mob && (
                  <div style={{ marginLeft: '16px', background: '#f8fafc', padding: '8px 14px', borderRadius: '14px', fontSize: '11px', fontWeight: 900, color: '#94a3b8', border: '1px solid #f1f5f9', letterSpacing: '1px' }}>
                    COMMAND K
                  </div>
                )}
            </motion.div>
        </div>
        
        {/* Premium Segmented Toggle */}
        <div style={{ 
          display: 'flex', 
          gap: '6px', 
          background: 'rgba(15,23,42,0.04)', 
          padding: '6px', 
          borderRadius: '32px', 
          width: mob ? '100%' : 'auto',
          boxSizing: 'border-box'
        }}>
            <button 
              onClick={() => setViewMode('grid')} 
              style={{ 
                flex: 1,
                padding: mob ? '12px' : '12px 32px', 
                borderRadius: '26px', 
                border: 'none', 
                background: viewMode === 'grid' ? '#fff' : 'transparent', 
                boxShadow: viewMode === 'grid' ? '0 10px 20px rgba(0,0,0,0.1)' : 'none', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '10px', 
                fontSize: mob ? '13px' : '15px', 
                fontWeight: 900, 
                color: viewMode === 'grid' ? '#0f172a' : '#64748b',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                whiteSpace: 'nowrap'
              }}
            >
              <LayoutGrid size={mob ? 16 : 18} /> Grid
            </button>
            <button 
              onClick={() => setViewMode('swipe')} 
              style={{ 
                flex: 1,
                padding: mob ? '12px' : '12px 32px', 
                borderRadius: '26px', 
                border: 'none', 
                background: viewMode === 'swipe' ? '#fff' : 'transparent', 
                boxShadow: viewMode === 'swipe' ? '0 10px 20px rgba(0,0,0,0.1)' : 'none', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '10px', 
                fontSize: mob ? '13px' : '15px', 
                fontWeight: 900, 
                color: viewMode === 'swipe' ? '#0f172a' : '#64748b',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                whiteSpace: 'nowrap'
              }}
            >
              <Smartphone size={mob ? 16 : 18} /> Swipe
            </button>
        </div>
      </div>
      <CategoryChips />
    </div>
  );

  return (
    <div style={{ 
      background: '#fcfcfc', 
      minHeight: '100vh', 
      width: '100%', 
      maxWidth: '100vw',
      overflowX: 'hidden', 
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <EliteHeader 
        eyebrow="ELITE BRAND PARTNERSHIPS"
        title={
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Layer 1: Outline Style */}
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                fontSize: mob ? '24px' : 'clamp(24px, 4vw, 38px)', 
                fontWeight: 900, 
                color: 'transparent', 
                WebkitTextStroke: mob ? '0.5px #0f172a' : '1px #0f172a',
                letterSpacing: mob ? '1px' : '3px',
                textTransform: 'uppercase',
                marginBottom: '8px',
                textAlign: 'center'
              }}
            >
              India's Flagship
            </motion.span>

            {/* Layer 2: Massive Solid Gradient */}
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{ 
                fontSize: mob ? 'clamp(36px, 10vw, 56px)' : 'clamp(40px, 8vw, 92px)', 
                fontWeight: 950, 
                lineHeight: 0.9,
                background: 'linear-gradient(90deg, #FF9431 0%, #FFB366 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.05em',
                filter: 'drop-shadow(0 15px 30px rgba(255,148,49,0.2))',
                textAlign: 'center',
                width: '100%'
              }}
            >
              BRAND DEALS
            </motion.span>

            {/* Layer 3: Serif/Sans Mix */}
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ 
                fontSize: mob ? '18px' : 'clamp(18px, 3vw, 32px)', 
                fontWeight: 500, 
                color: '#0f172a',
                fontStyle: 'italic',
                fontFamily: "'Playfair Display', serif",
                marginTop: '12px',
                textAlign: 'center'
              }}
            >
              Curated for the <span style={{ fontWeight: 950, fontStyle: 'normal', fontFamily: "'Outfit', sans-serif", borderBottom: mob ? '2px solid #FF9431' : '4px solid #FF9431' }}>Elite Creator</span>
            </motion.span>
          </div>
        }
        sub={
          <div style={{ 
            marginTop: mob ? '20px' : '40px', 
            width: '100%',
            maxWidth: mob ? '100%' : '750px', 
            margin: mob ? '20px auto 0' : '40px auto 0', 
            fontSize: mob ? '15px' : '20px', 
            color: '#64748b', 
            lineHeight: 1.6, 
            fontWeight: 500,
            padding: mob ? '0 4px' : '0',
            boxSizing: 'border-box'
          }}>
              Scale your digital influence with India's most ambitious brands.{mob ? ' ' : <br/>}
              Direct access to <span style={{ color: '#0f172a', fontWeight: 900 }}>high-ticket collaborations</span> and exclusive brand deals.
          </div>
        }
        light={true}
        compact={viewMode === 'swipe'}
      />

      {/* Search + Chips — below EliteHeader, properly centered */}
      <div style={{ 
        width: '100%', 
        background: mob ? '#fff' : 'linear-gradient(180deg, #f8fafc 0%, #fcfcfc 100%)',
        borderBottom: '1px solid #f1f5f9',
        padding: mob ? '20px 0 0' : '40px 20px 0',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          <SearchBar />
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: mob ? '0 20px 100px' : '0 40px 100px', boxSizing: 'border-box', overflowX: 'hidden' }}>
        
        {isPublic && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              background: 'radial-gradient(circle at top left, #121212 0%, #050505 100%)', 
              borderRadius: mob ? '32px' : '48px', 
              padding: mob ? '48px 24px' : '80px 60px', 
              color: '#fff', 
              marginBottom: '60px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.3)',
              marginTop: '-40px',
              display: 'flex',
              flexDirection: mob ? 'column' : 'row',
              alignItems: 'center',
              gap: mob ? '32px' : '60px',
              border: '1px solid rgba(255,255,255,0.05)',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            {/* Ultra-Elite Background Mesh */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 10, repeat: Infinity }}
              style={{ position: 'absolute', right: '-10%', top: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,148,49,0.15) 0%, transparent 70%)', zIndex: 0 }} 
            />
            <motion.div 
              animate={{ opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 8, repeat: Infinity }}
              style={{ position: 'absolute', left: '-5%', bottom: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', zIndex: 0 }} 
            />

            <div style={{ position: 'relative', zIndex: 10, textAlign: mob ? 'center' : 'left', flex: 1.2 }}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#FF9431', padding: '10px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 900, marginBottom: '32px', letterSpacing: '2px' }}
              >
                <Zap size={16} fill="#FF9431" /> ELITE BRAND ACCESS
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ 
                  fontSize: mob ? '32px' : '62px', 
                  fontWeight: 950, 
                  marginBottom: mob ? '20px' : '28px', 
                  lineHeight: 1,
                  letterSpacing: '-0.04em'
                }}
              >
                Monetize Your <br/>
                <span style={{ 
                  background: 'linear-gradient(90deg, #FF9431 0%, #FFB366 100%)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent' 
                }}>Creative Voice</span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ fontSize: mob ? '16px' : '19px', opacity: 0.7, marginBottom: '44px', maxWidth: '600px', lineHeight: 1.7, fontWeight: 500 }}
              >
                Join the fastest-growing network of verified creators. Unlock direct brand collaborations, secure milestone payments, and grow with data-driven insights.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: mob ? 'center' : 'flex-start' }}
              >
                <Btn lg onClick={() => navigate('/login')} style={{ background: '#FF9431', border: 'none', color: '#fff', padding: '20px 48px', borderRadius: '100px', fontWeight: 950, fontSize: '16px', boxShadow: '0 20px 40px rgba(255,148,49,0.3)' }}>
                  Start Earning Now
                </Btn>
                <Btn lg variant="white" onClick={() => navigate('/apply')} style={{ borderRadius: '100px', padding: '20px 48px', fontWeight: 950, fontSize: '16px', background: 'transparent', border: '2px solid rgba(255,255,255,0.2)', color: '#fff' }}>
                  Register Profile
                </Btn>
              </motion.div>
            </div>

            {/* Ultra-Elite Desktop Visual Side */}
            {!mob && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{ flex: 0.8, position: 'relative' }}
              >
                {/* Floating Trust Assets */}
                <motion.div 
                   animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}
                   style={{ position: 'absolute', top: '-40px', left: '-20px', background: '#10B981', color: '#fff', padding: '8px 16px', borderRadius: '12px', fontSize: '11px', fontWeight: 900, zIndex: 10, boxShadow: '0 10px 20px rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                   <ShieldCheck size={14} /> VERIFIED NETWORK
                </motion.div>

                <motion.div 
                   animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                   style={{ position: 'absolute', bottom: '-30px', right: '-10px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', color: '#fff', padding: '12px 20px', borderRadius: '16px', fontSize: '11px', fontWeight: 900, zIndex: 10, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                   <Star size={14} color="#FBBF24" fill="#FBBF24" /> 500+ PREMIUM BRANDS
                </motion.div>

                <div style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  backdropFilter: 'blur(20px)',
                  borderRadius: '40px', 
                  padding: '40px', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 0 20px rgba(255,255,255,0.02)',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', letterSpacing: '2px' }}>REAL-TIME ANALYTICS</div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444', opacity: 0.5 }} />
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
                    </div>
                  </div>

                  <div style={{ spaceY: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
                      <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, rgba(255,148,49,0.2) 0%, rgba(255,148,49,0.05) 100%)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF9431', border: '1px solid rgba(255,148,49,0.1)' }}>
                        <Users size={28} />
                      </div>
                      <div>
                        <div style={{ fontSize: '24px', fontWeight: 950 }}>1.8M+</div>
                        <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Global Impression</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
                      <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.05) 100%)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', border: '1px solid rgba(16,185,129,0.1)' }}>
                        <TrendingUp size={28} />
                      </div>
                      <div>
                        <div style={{ fontSize: '24px', fontWeight: 950 }}>₹2.5Cr+</div>
                        <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Total Payouts</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0.05) 100%)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', border: '1px solid rgba(59,130,246,0.1)' }}>
                        <Target size={28} />
                      </div>
                      <div>
                        <div style={{ fontSize: '24px', fontWeight: 950 }}>Elite</div>
                        <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Creator Tier</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '40px' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '11px', fontWeight: 900, color: '#94a3b8' }}>
                        <span>NETWORK HEALTH</span>
                        <span style={{ color: '#10B981' }}>98.2%</span>
                     </div>
                     <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '98.2%' }}
                          transition={{ duration: 2, delay: 1 }}
                          style={{ height: '100%', background: 'linear-gradient(90deg, #10B981, #34D399)' }} 
                        />
                     </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {isPublic && (
          <div style={{ marginBottom: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
               <div style={{ width: '40px', height: '1px', background: '#FF9431' }} />
               <span style={{ fontSize: '12px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px' }}>Spotlight Opportunity</span>
            </div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              style={{ 
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
                borderRadius: '40px', 
                padding: mob ? '40px 24px' : '60px', 
                display: 'flex', 
                flexDirection: mob ? 'column' : 'row', 
                gap: '40px', 
                alignItems: 'center',
                boxShadow: '0 40px 80px rgba(15,23,42,0.2)',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'radial-gradient(circle at top right, rgba(255,148,49,0.1), transparent 70%)' }} />
              
              <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                 <div style={{ background: 'rgba(255,148,49,0.1)', color: '#FF9431', padding: '6px 16px', borderRadius: '100px', fontSize: '11px', fontWeight: 900, display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', border: '1px solid rgba(255,148,49,0.2)' }}>
                    <Star size={12} fill="#FF9431" /> DEAL OF THE WEEK
                 </div>
                 <h2 style={{ fontSize: mob ? '26px' : '48px', fontWeight: 950, color: '#fff', lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.02em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Mega Launch: <span style={{ color: '#FF9431' }}>Nike Phantom</span> <br/> Creator Campaign
                 </h2>
                 <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '40px', maxWidth: '500px' }}>
                    Join the exclusive launch of Nike's new Phantom series. Looking for 50 elite athletes and lifestyle creators.
                 </p>
                 
                 <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '40px' }}>
                    <div>
                       <div style={{ fontSize: '10px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Est. Payout</div>
                       <div style={{ fontSize: '24px', fontWeight: 950, color: '#10B981' }}>₹5,50,000+</div>
                    </div>
                    <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }} />
                    <div>
                       <div style={{ fontSize: '10px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Requirement</div>
                       <div style={{ fontSize: '24px', fontWeight: 950, color: '#fff' }}>100K+ Follows</div>
                    </div>
                 </div>
                 
                 <Btn lg onClick={() => navigate('/login')} style={{ background: '#fff', color: '#0f172a', border: 'none', padding: '18px 48px', borderRadius: '100px', fontWeight: 950, fontSize: '16px' }}>
                    Apply for Spotlight
                 </Btn>
              </div>
              
              <div style={{ flex: 0.8, width: '100%', position: 'relative' }}>
                 <img 
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800" 
                    style={{ width: '100%', height: mob ? '250px' : '400px', objectFit: 'cover', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }} 
                    alt="Nike Launch" 
                 />
                 <div style={{ position: 'absolute', inset: 0, borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)' }} />
              </div>
            </motion.div>
          </div>
        )}

        {viewMode === 'grid' ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' }}>
               <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '4px', height: '24px', background: '#FF9431', borderRadius: '2px' }} />
                  {isPublic ? 'Featured Opportunities' : `${filtered.length} Live Campaigns`}
               </h2>
               {(f.q || f.niche || f.urgent) && <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: '#64748b', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>Reset Filters</button>}
            </div>

            {(() => {
              if (loading) {
                return (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '32px' }}>
                    {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
                  </div>
                );
              }
              const displayList = isPublic ? filtered.slice(0, 6) : filtered;
              if (displayList.length === 0) {
                return <Empty icon="📦" title="No Deals Found" sub="Try adjusting your search or filters to find more deals." ctaLabel="Clear Filters" onCta={clearFilters} />;
              }
              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '32px' }}>
                  {displayList.map((c, i) => (
                    <motion.div 
                      key={c.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <CampCard isTeaser={isPublic} campaign={c} onApply={handleApplyClick} />
                    </motion.div>
                  ))}
                  {isPublic && filtered.length > 6 && (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0' }}>
                      <Btn lg variant="ghost" onClick={() => navigate('/login')} style={{ fontWeight: 900, fontSize: '18px', color: '#FF9431' }}>View {filtered.length - 6} More Premium Deals <ArrowRight size={20} style={{ marginLeft: 8 }} /></Btn>
                    </div>
                  )}
                </div>
              );
            })()}
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '600px', position: 'relative' }}>
             <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF9431', fontWeight: 900, fontSize: '13px', justifyContent: 'center', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                   <Zap size={14} fill="#FF9431" /> QUICK DISCOVERY
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', marginTop: '8px' }}>Swipe Right to Apply instantly</h3>
             </div>

             <div style={{ position: 'relative', width: mob ? '100%' : '450px', height: '550px' }}>
                <AnimatePresence>
                  {filtered.slice(swipeIndex, swipeIndex + 2).reverse().map((c, i) => (
                    <SwipeCard 
                      key={c.id} 
                      campaign={c} 
                      onSwipe={handleSwipe} 
                      onApply={handleApplyClick}
                    />
                  ))}
                </AnimatePresence>
                
                {swipeIndex >= filtered.length && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                     <div style={{ width: '80px', height: '80px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>🏁</div>
                     <h4 style={{ fontSize: '20px', fontWeight: 900 }}>All caught up!</h4>
                     <p style={{ color: '#64748b', fontSize: '15px', marginTop: '8px' }}>You've reviewed all active campaigns.</p>
                     <Btn style={{ marginTop: '24px' }} onClick={() => setSwipeIndex(0)}>Refresh List</Btn>
                  </div>
                )}
             </div>

             <div style={{ display: 'flex', gap: '24px', marginTop: '48px' }}>
                <button onClick={() => handleSwipe('left', filtered[swipeIndex])} style={{ width: '64px', height: '64px', borderRadius: '50%', border: 'none', background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <XCircle size={32} />
                </button>
                <button onClick={() => handleSwipe('right', filtered[swipeIndex])} style={{ width: '64px', height: '64px', borderRadius: '50%', border: 'none', background: '#0f172a', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', cursor: 'pointer', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <CheckCircle2 size={32} />
                </button>
             </div>
          </div>
        )}
      </div>

      <Modal open={!!modal} title={'Deploy Application'} onClose={() => { setModal(null); setDone(false); }} width={600}>
         {done ? (
           <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ width: '80px', height: '80px', background: 'rgba(16,185,129,0.1)', color: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                 <CheckCircle2 size={40} />
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '12px' }}>Application Sent!</h3>
              <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '32px' }}>The brand will review your profile and pitch. We'll notify you if you're shortlisted.</p>
              <Btn full lg onClick={() => setModal(null)}>Back to Discovery</Btn>
           </div>
         ) : (
           <div style={{ padding: '10px' }}>
              <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '24px', marginBottom: '32px', border: '1px solid #f1f5f9' }}>
                 <p style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>CAMPAIGN</p>
                 <h4 style={{ fontSize: '20px', fontWeight: 900 }}>{modal?.title}</h4>
                 <div style={{ marginTop: '12px', fontSize: '16px', fontWeight: 900, color: '#10B981' }}>{fmt.inr(modal?.budgetMin)} - {fmt.inr(modal?.budgetMax)}</div>
              </div>
              
              <Fld 
                label="Your Pitch *" 
                value={aF.pitch} 
                onChange={e => setAF(p => ({ ...p, pitch: e.target.value }))} 
                rows={4} 
                placeholder="Why are you a great fit for this brand?"
              />
              <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '20px', marginTop: '12px' }}>
                 <Fld label="Expected Rate (₹)" type="number" value={aF.rate} onChange={e => setAF(p => ({ ...p, rate: e.target.value }))} placeholder="15,000" />
                 <Fld label="Portfolio Link" value={aF.portfolio} onChange={e => setAF(p => ({ ...p, portfolio: e.target.value }))} placeholder="Instagram/Reel Link" />
              </div>
              <Btn full lg style={{ marginTop: '32px', borderRadius: '100px', height: '60px' }} onClick={() => submitApply()}>Submit Application 🚀</Btn>
           </div>
         )}
      </Modal>
    </div>
  );
}
