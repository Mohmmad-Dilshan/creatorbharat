import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Minus, ThumbsUp, ThumbsDown, X, Command } from 'lucide-react';
import { FAQ_CATEGORIES } from '@/data/faqs';

export const Highlight = ({ text, highlight }) => {
  if (!highlight.trim()) return <span>{text}</span>;
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={`hl-${i}-${part.slice(0, 5)}`} style={{ background: '#FF943130', color: '#FF9431', fontWeight: 700, borderRadius: '4px', padding: '0 2px' }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

Highlight.propTypes = {
  text: PropTypes.string.isRequired,
  highlight: PropTypes.string.isRequired
};

export const FAQHero = ({ search, setSearch, mob, trending }) => (
  <section style={{ background: '#050505', padding: mob ? '120px 20px 80px' : '180px 24px 140px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255, 148, 49, 0.1), transparent 70%)' }} />
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #FF9431, #fff, #10B981)' }} />
    
    <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 255, 255, 0.05)', padding: '10px 20px', borderRadius: '100px', marginBottom: '32px', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <Command size={16} color="#FF9431" />
        <span style={{ fontSize: '12px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: "'Outfit', sans-serif" }}>Concierge Knowledge Base</span>
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ fontSize: 'clamp(42px, 8vw, 84px)', fontWeight: 950, color: '#fff', marginBottom: '40px', letterSpacing: '-0.05em', lineHeight: 0.95, fontFamily: "'Outfit', sans-serif" }}>
        Knowledge is <br />
        <span style={{ background: 'linear-gradient(90deg, #FF9431, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Power & Growth.</span>
      </motion.h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ position: 'relative', maxWidth: '640px', margin: '0 auto' }}>
        <Search style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={22} />
        <input 
          type="text" 
          placeholder="Search for questions, terms, or policies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', padding: mob ? '20px 60px' : '28px 64px', borderRadius: '100px', border: '1.5px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '18px', fontWeight: 600, outline: 'none', backdropFilter: 'blur(20px)', transition: '0.3s', boxSizing: 'border-box' }} 
        />
        {search && (
          <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}><X size={18} /></button>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '32px' }}>
        <span style={{ fontSize: '11px', fontWeight: 900, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', alignSelf: 'center', letterSpacing: '1px', fontFamily: "'Outfit', sans-serif" }}>Trending:</span>
        {trending.map(t => (
          <button key={t} onClick={() => setSearch(t)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', padding: '8px 18px', borderRadius: '100px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', transition: '0.2s', fontFamily: "'Outfit', sans-serif" }} onMouseOver={(e) => e.target.style.borderColor = '#FF9431'} onMouseOut={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}>{t}</button>
        ))}
      </motion.div>
    </div>
  </section>
);

FAQHero.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  mob: PropTypes.bool,
  trending: PropTypes.array.isRequired
};

export const FAQAccordion = ({ q, a, cat, highlight, delay = 0, mob }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      style={{
        background: isOpen ? '#fff' : 'rgba(255, 255, 255, 0.7)',
        borderRadius: mob ? '24px' : '32px',
        border: `1.5px solid ${isOpen ? '#FF9431' : '#f1f5f9'}`,
        marginBottom: '12px',
        overflow: 'hidden',
        boxShadow: isOpen ? '0 30px 60px rgba(255, 148, 49, 0.1)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', padding: mob ? '20px' : '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {(highlight || cat) && <div style={{ fontSize: '10px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: "'Outfit', sans-serif" }}>{cat}</div>}
          <span style={{ fontSize: mob ? '16px' : '18px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.01em', paddingRight: '12px', lineHeight: 1.3, fontFamily: "'Outfit', sans-serif" }}>
            <Highlight text={q} highlight={highlight} />
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0, color: isOpen ? '#FF9431' : '#cbd5e1' }}
          style={{ flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%', background: isOpen ? '#FF943115' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ padding: mob ? '0 20px 24px' : '0 40px 40px', color: '#64748b', fontSize: mob ? '15px' : '16px', lineHeight: 1.8, fontWeight: 500, overflow: 'hidden' }}
          >
            <div style={{ padding: mob ? '20px' : '32px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
               <Highlight text={a} highlight={highlight} />
               <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #edf2f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', letterSpacing: '0.5px', fontFamily: "'Outfit', sans-serif" }}>WAS THIS HELPFUL?</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                     {[
                       { id: 'yes', label: 'Yes', icon: ThumbsUp, color: '#10B981' },
                       { id: 'no', label: 'No', icon: ThumbsDown, color: '#EF4444' }
                     ].map(b => (
                       <button 
                         key={b.id}
                         onClick={() => setFeedback(b.id)}
                         style={{ 
                           padding: '10px 20px', borderRadius: '100px', border: feedback === b.id ? `1px solid ${b.color}` : '1px solid #e2e8f0',
                           background: feedback === b.id ? `${b.color}10` : '#fff', color: feedback === b.id ? b.color : '#64748b',
                           fontSize: '13px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: '0.2s', fontFamily: "'Outfit', sans-serif"
                         }}
                       >
                         <b.icon size={14} /> {b.label}
                       </button>
                     ))}
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

FAQAccordion.propTypes = {
  q: PropTypes.string.isRequired,
  a: PropTypes.string.isRequired,
  cat: PropTypes.string,
  highlight: PropTypes.string.isRequired,
  delay: PropTypes.number,
  mob: PropTypes.bool
};

export const CategoryTabs = ({ activeCat, setActiveCat, setSearch, mob, counts }) => (
  <div style={{ 
    display: 'flex', 
    flexWrap: mob ? 'nowrap' : 'wrap',
    overflowX: mob ? 'auto' : 'visible',
    padding: mob ? '12px 10px' : '12px 0',
    gap: mob ? '10px' : '16px', 
    justifyContent: mob ? 'flex-start' : 'center', 
    marginBottom: mob ? '32px' : '64px',
    scrollbarWidth: 'none',
    WebkitOverflowScrolling: 'touch',
    maskImage: mob ? 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' : 'none',
    msOverflowStyle: 'none'
  }}>
     <style>{`div::-webkit-scrollbar { display: none; }`}</style>
     {FAQ_CATEGORIES.map(c => (
       <button
         key={c.id}
         onClick={() => { setActiveCat(c.id); setSearch(''); }}
         style={{
           padding: mob ? '12px 18px' : '18px 32px', borderRadius: '100px', 
           background: activeCat === c.id ? '#0f172a' : '#fff',
           color: activeCat === c.id ? '#fff' : '#64748b',
           fontSize: mob ? '14px' : '15px', fontWeight: 950, cursor: 'pointer',
           display: 'flex', alignItems: 'center', gap: mob ? '8px' : '12px',
           boxShadow: activeCat === c.id ? '0 20px 40px rgba(0,0,0,0.1)' : '0 8px 24px rgba(0,0,0,0.03)',
           transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
           whiteSpace: 'nowrap',
           border: `1.5px solid ${activeCat === c.id ? '#0f172a' : '#f1f5f9'}`,
           transform: activeCat === c.id ? 'scale(1.05)' : 'scale(1)',
           zIndex: activeCat === c.id ? 2 : 1,
           fontFamily: "'Outfit', sans-serif"
         }}
       >
         <c.icon size={mob ? 18 : 20} color={activeCat === c.id ? '#FF9431' : '#cbd5e1'} strokeWidth={2.5} />
         {c.name}
         <span style={{ fontSize: '11px', background: activeCat === c.id ? 'rgba(255,255,255,0.1)' : '#f8fafc', padding: '2px 8px', borderRadius: '100px', color: activeCat === c.id ? '#FF9431' : '#94a3b8', border: activeCat === c.id ? 'none' : '1px solid #f1f5f9' }}>{counts[c.id] || 0}</span>
       </button>
     ))}
  </div>
);

CategoryTabs.propTypes = {
  activeCat: PropTypes.string.isRequired,
  setActiveCat: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  mob: PropTypes.bool,
  counts: PropTypes.object.isRequired
};
