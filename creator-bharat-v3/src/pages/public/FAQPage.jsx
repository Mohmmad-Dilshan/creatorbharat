import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Seo from '@/components/common/SEO';
import { 
  Search, 
  MessageCircle,
  ArrowRight,
  LifeBuoy,
  Sparkles,
  Command,
  ThumbsUp,
  ThumbsDown,
  X,
  Plus
} from 'lucide-react';
import { Btn, Card, Bdg } from '@/components/common/Primitives';

// Data Import
import { FAQS, FAQ_CATEGORIES, QUICK_GUIDES } from '../../data/faqs';

/**
 * SENIOR DEV NOTE: 
 * FAQ System v3.1 - Elite SaaS Support.
 * Refactored into modular sub-components to optimize maintainability and resolve cognitive complexity.
 */

// --- SUB-COMPONENTS ---

const Highlight = ({ text, highlight }) => {
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

const FAQHero = ({ search, setSearch, mob, trending }) => (
  <section style={{ background: '#050505', padding: mob ? '120px 20px 80px' : '180px 24px 140px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255, 148, 49, 0.1), transparent 70%)' }} />
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #FF9431, #fff, #10B981)' }} />
    
    <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 255, 255, 0.05)', padding: '10px 20px', borderRadius: '100px', marginBottom: '32px', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <Command size={16} color="#FF9431" />
        <span style={{ fontSize: '12px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Concierge Knowledge Base</span>
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ fontSize: 'clamp(42px, 8vw, 84px)', fontWeight: 950, color: '#fff', marginBottom: '40px', letterSpacing: '-0.05em', lineHeight: 0.95 }}>
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
          style={{ width: '100%', padding: mob ? '20px 60px' : '28px 64px', borderRadius: '100px', border: '1.5px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '18px', fontWeight: 600, outline: 'none', backdropFilter: 'blur(20px)', transition: '0.3s' }} 
        />
        {search && (
          <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}><X size={18} /></button>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '32px' }}>
        <span style={{ fontSize: '11px', fontWeight: 900, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', alignSelf: 'center', letterSpacing: '1px' }}>Trending:</span>
        {trending.map(t => (
          <button key={t} onClick={() => setSearch(t)} onFocus={() => {}} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', padding: '8px 18px', borderRadius: '100px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', transition: '0.2s' }} onMouseOver={(e) => e.target.style.borderColor = '#FF9431'}>{t}</button>
        ))}
      </motion.div>
    </div>
  </section>
);

const FAQAccordion = ({ q, a, cat, highlight, delay = 0, mob }) => {
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
          {(highlight || cat) && <div style={{ fontSize: '10px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px' }}>{cat}</div>}
          <span style={{ fontSize: mob ? '16px' : '18px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.01em', paddingRight: '12px', lineHeight: 1.3 }}>
            <Highlight text={q} highlight={highlight} />
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0, color: isOpen ? '#FF9431' : '#cbd5e1' }}
          style={{ flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%', background: isOpen ? '#FF943115' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Plus size={20} style={{ transform: isOpen ? 'rotate(45deg)' : 'none', transition: '0.3s' }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ padding: mob ? '0 20px 24px' : '0 40px 40px', color: '#64748b', fontSize: mob ? '15px' : '16px', lineHeight: 1.8, fontWeight: 500 }}
          >
            <div style={{ padding: mob ? '20px' : '32px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
               <Highlight text={a} highlight={highlight} />
               <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #edf2f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.5px' }}>WAS THIS HELPFUL?</span>
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
                           fontSize: '13px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: '0.2s'
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

const CategoryTabs = ({ activeCat, setActiveCat, setSearch, mob, counts }) => (
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
           zIndex: activeCat === c.id ? 2 : 1
         }}
       >
         <c.icon size={mob ? 18 : 20} color={activeCat === c.id ? '#FF9431' : '#cbd5e1'} strokeWidth={2.5} />
         {c.name}
         <span style={{ fontSize: '11px', background: activeCat === c.id ? 'rgba(255,255,255,0.1)' : '#f8fafc', padding: '2px 8px', borderRadius: '100px', color: activeCat === c.id ? '#FF9431' : '#94a3b8', border: activeCat === c.id ? 'none' : '1px solid #f1f5f9' }}>{counts[c.id] || 0}</span>
       </button>
     ))}
  </div>
);

// --- MAIN COMPONENT ---

export default function FAQPage() {
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const { counts, filtered } = useMemo(() => {
    const map = { all: FAQS.length };
    FAQS.forEach(f => {
      const catId = FAQ_CATEGORIES.find(c => c.name.toLowerCase().includes(f.cat.toLowerCase().replace('for ', '')) || c.id === f.cat.toLowerCase())?.id || 'general';
      map[catId] = (map[catId] || 0) + 1;
    });

    const list = FAQS.filter(f => {
      const matchesSearch = f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
      if (search.trim()) return matchesSearch;
      if (activeCat === 'all') return true;
      const catObj = FAQ_CATEGORIES.find(c => c.id === activeCat);
      return catObj && f.cat.toLowerCase().includes(catObj.name.toLowerCase().replace('for ', ''));
    });

    return { counts: map, filtered: list };
  }, [search, activeCat]);

  const trending = ["Elite Score", "Payment Cycle", "Verification Badge", "Campaign ROI"];

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', paddingBottom: '100px' }}>
      <Seo title="Knowledge Base | CreatorBharat" description="Detailed answers to all your questions about Bharat's elite creator ecosystem." keywords="faq, support, help center, creator guide, brand guide" />
      
      <FAQHero search={search} setSearch={setSearch} mob={mob} trending={trending} />

      <section style={{ padding: mob ? '0 16px 60px' : '0 24px 120px', marginTop: '-60px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <CategoryTabs activeCat={activeCat} setActiveCat={setActiveCat} setSearch={setSearch} mob={mob} counts={counts} />

          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.8fr 1fr', gap: mob ? '40px' : '80px', alignItems: 'start' }}>
             <div>
                <div style={{ marginBottom: '48px' }}>
                   <Bdg color="orange" sm>{search.trim() ? 'SEARCH RESULTS' : activeCat.toUpperCase()}</Bdg>
                   <h2 style={{ fontSize: mob ? '28px' : '44px', fontWeight: 950, color: '#0f172a', marginTop: '16px', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                     {search.trim() ? `Search results for "${search}"` : FAQ_CATEGORIES.find(c => c.id === activeCat)?.name || 'Frequently Asked'}
                   </h2>
                </div>
                
                <AnimatePresence mode="wait">
                   <motion.div key={activeCat + search} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {filtered.map((faq, i) => (
                        <FAQAccordion key={faq.q} q={faq.q} a={faq.a} cat={faq.cat} highlight={search} delay={i * 0.05} mob={mob} />
                      ))}
                      
                      {filtered.length === 0 && (
                        <div style={{ textAlign: 'center', padding: mob ? '80px 20px' : '120px 40px', background: '#f8fafc', borderRadius: '40px', border: '1.5px dashed #e2e8f0' }}>
                           <LifeBuoy size={64} color="#cbd5e1" style={{ marginBottom: '24px' }} />
                           <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#475569', letterSpacing: '-0.02em' }}>No matches found</h3>
                           <p style={{ color: '#94a3b8', marginTop: '12px', fontSize: '16px', fontWeight: 500, maxWidth: '400px', margin: '12px auto' }}>Aapka sawaal shayad dusri category mein ho ya hamari team ko directly contact karein.</p>
                           <Btn variant="outline" onClick={() => { setSearch(''); setActiveCat('all'); }} style={{ marginTop: '32px', borderRadius: '100px', fontWeight: 900 }}>Reset Filters</Btn>
                        </div>
                      )}
                   </motion.div>
                </AnimatePresence>
             </div>

             <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: mob ? 'static' : 'sticky', top: '120px' }}>
                <Card style={{ padding: mob ? '32px' : '48px', borderRadius: mob ? '32px' : '56px', background: '#fff', border: '1.5px solid #f1f5f9', boxShadow: '0 40px 100px rgba(0,0,0,0.03)' }}>
                   <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: '#FF943110', color: '#FF9431', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}><MessageCircle size={32} /></div>
                   <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', marginBottom: '16px', letterSpacing: '-0.02em' }}>Still need help?</h3>
                   <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.6, marginBottom: '40px', fontWeight: 500 }}>Aapko sawaal ka jawab nahi mila? Humari elite team aapse baat karne ke liye hamesha ready hai.</p>
                   <Btn full lg onClick={() => navigate('/contact')} style={{ padding: '24px', borderRadius: '100px', background: '#0f172a', color: '#fff', fontSize: '18px', fontWeight: 950 }}>Support Concierge <ArrowRight size={22} /></Btn>
                </Card>

                <div style={{ display: 'grid', gap: '16px' }}>
                   <div style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px', marginLeft: '12px' }}>RESOURCES & GUIDES</div>
                   {QUICK_GUIDES.map((item) => (
                     <motion.div key={item.t} whileHover={{ x: 12, background: '#fff' }} style={{ padding: '24px', background: 'rgba(255,255,255,0.6)', borderRadius: '24px', border: '1.5px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '20px', transition: '0.3s' }}>
                        <div style={{ background: '#FF943110', padding: '12px', borderRadius: '16px' }}><item.icon color="#FF9431" size={24} /></div>
                        <div style={{ flex: 1 }}><h4 style={{ fontSize: '15px', fontWeight: 950, color: '#0f172a', marginBottom: '2px' }}>{item.t}</h4><p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>{item.d}</p></div>
                        <ArrowRight size={18} color="#cbd5e1" />
                     </motion.div>
                   ))}
                </div>
             </aside>
          </div>
        </div>
      </section>

      <section style={{ padding: mob ? '0 20px 80px' : '0 24px 120px', textAlign: 'center' }}>
         <div style={{ maxWidth: '900px', margin: '0 auto', background: 'linear-gradient(135deg, #0f172a 0%, #050505 100%)', padding: mob ? '60px 24px' : '80px 48px', borderRadius: mob ? '48px' : '72px', position: 'relative', overflow: 'hidden', color: '#fff' }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', opacity: 0.1 }}><Sparkles size={200} color="#FF9431" /></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Sparkles size={48} color="#FF9431" style={{ marginBottom: '32px' }} />
              <h2 style={{ fontSize: mob ? '32px' : '48px', fontWeight: 950, color: '#fff', marginBottom: '24px', letterSpacing: '-0.04em' }}>Revolutionizing <br />Bharat's Influence.</h2>
              <p style={{ fontSize: mob ? '16px' : '20px', color: 'rgba(255,255,255,0.6)', fontWeight: 500, lineHeight: 1.6, maxWidth: '500px', margin: '0 auto 48px' }}>Join the elite network of 15,000+ creators and 500+ brands building the future of marketing.</p>
              <Btn lg onClick={() => navigate('/creators')} style={{ background: '#fff', color: '#0f172a', borderRadius: '100px', fontWeight: 950, padding: '20px 48px' }}>Explore Ecosystem</Btn>
            </div>
         </div>
      </section>
    </div>
  );
}

FAQHero.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  mob: PropTypes.bool,
  trending: PropTypes.arrayOf(PropTypes.string).isRequired
};

FAQAccordion.propTypes = {
  q: PropTypes.string.isRequired,
  a: PropTypes.string.isRequired,
  cat: PropTypes.string.isRequired,
  highlight: PropTypes.string.isRequired,
  delay: PropTypes.number,
  mob: PropTypes.bool
};

CategoryTabs.propTypes = {
  activeCat: PropTypes.string.isRequired,
  setActiveCat: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  mob: PropTypes.bool,
  counts: PropTypes.object.isRequired
};
