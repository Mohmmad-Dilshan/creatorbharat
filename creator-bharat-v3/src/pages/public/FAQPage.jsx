import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Seo from '@/components/common/SEO';
import { 
  Search, 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck, 
  Zap, 
  Users, 
  MessageCircle,
  ArrowRight,
  LifeBuoy,
  Sparkles,
  Command,
  Lock,
  Wallet,
  Target
} from 'lucide-react';
import { Btn, Card, Bdg } from '@/components/common/Primitives';

const FAQAccordion = ({ q, a, delay = 0, mob }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      style={{
        background: isOpen ? '#fff' : 'rgba(255, 255, 255, 0.7)',
        borderRadius: '32px',
        border: `1.5px solid ${isOpen ? '#FF9431' : '#f1f5f9'}`,
        marginBottom: '16px',
        overflow: 'hidden',
        boxShadow: isOpen ? '0 30px 60px rgba(255, 148, 49, 0.1)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: mob ? '24px 20px' : '32px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        <span style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.01em' }}>{q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0, color: isOpen ? '#FF9431' : '#cbd5e1' }}
          style={{ width: '32px', height: '32px', borderRadius: '50%', background: isOpen ? '#FF943115' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <ChevronDown size={20} />
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
            <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
               {a}
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
  delay: PropTypes.number,
  mob: PropTypes.bool
};

export default function FAQPage() {
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('Creators');

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const faqs = [
    { cat: 'General', q: 'What makes CreatorBharat "Elite"?', a: 'Unlike generic platforms, CreatorBharat uses a custom "Elite Score" to verify talent authenticity. We focus on Tier 2 & 3 city creators who represent the real, massive heart of India\'s consumer market.' },
    { cat: 'Creators', q: 'How is the Elite Score calculated?', a: 'Our AI engine audits engagement velocity, follower quality (anti-bot check), content consistency, and audience sentiment to generate a score out of 1000.' },
    { cat: 'Payments', q: 'How do I receive my brand deal payments?', a: 'All deals are commission-free. Brands pay you directly through our secure deal management system, ensuring transparent and on-time payouts.' },
    { cat: 'Brands', q: 'Can we run campaigns across multiple cities?', a: 'Yes. Our "Mission Architect" allows brands to deploy hyper-local campaigns in specific districts, targeting regional languages and local influence.' },
    { cat: 'Creators', q: 'What are the benefits of the Pro plan?', a: 'Pro members get a Verified Blue Badge, priority search placement, unlimited deal applications, and an AI-generated SEO article that ranks on Google.' },
    { cat: 'Security', q: 'Who can see my personal contact details?', a: 'Your contact details remain encrypted. Brands can only message you through the platform unless you explicitly choose to share your WhatsApp/Email during a deal.' }
  ];

  const cats = [
    { id: 'General', icon: HelpCircle },
    { id: 'Creators', icon: Users },
    { id: 'Brands', icon: Target },
    { id: 'Payments', icon: Wallet },
    { id: 'Security', icon: Lock }
  ];

  const filtered = faqs.filter(f => 
    (f.cat === activeCat) && 
    (f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh' }}>
      <Seo 
        title="Frequently Asked Questions"
        description="Everything you need to know about CreatorBharat."
        keywords="faq, help, questions, how it works"
      />
      
      {/* Search Hero */}
      <section style={{ 
        background: '#050505', 
        padding: mob ? '120px 20px 60px' : '160px 24px 100px', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255, 148, 49, 0.1), transparent 70%)', opacity: 0.8 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #FF9431, #fff, #10B981)' }} />
        
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              background: 'rgba(255, 255, 255, 0.05)', 
              padding: '10px 20px', 
              borderRadius: '100px',
              marginBottom: '32px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Command size={16} color="#FF9431" />
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Elite Knowledge Base</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(48px, 8vw, 84px)', fontWeight: 950, color: '#fff', marginBottom: '48px', letterSpacing: '-0.05em', lineHeight: 0.95 }}
          >
            How can we <br />
            <span style={{ background: 'linear-gradient(90deg, #FF9431, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Resolve Today?</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}
          >
            <Search style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={20} />
            <input 
              type="text" 
              placeholder="Search your question..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ 
                width: '100%', 
                padding: mob ? '16px 20px 16px 60px' : '20px 24px 20px 64px', 
                borderRadius: '100px', 
                border: 'none', 
                background: 'rgba(255,255,255,0.1)', 
                color: '#fff', 
                fontSize: '16px',
                outline: 'none',
                backdropFilter: 'blur(10px)'
              }} 
            />
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section style={{ padding: '0 24px 120px', marginTop: '-60px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Category Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginBottom: '64px' }}>
             {cats.map(c => (
               <button
                 key={c.id}
                 onClick={() => setActiveCat(c.id)}
                 style={{
                   padding: '16px 32px', borderRadius: '100px', border: 'none',
                   background: activeCat === c.id ? '#0f172a' : '#fff',
                   color: activeCat === c.id ? '#fff' : '#64748b',
                   fontSize: '15px', fontWeight: 900, cursor: 'pointer',
                   display: 'flex', alignItems: 'center', gap: '12px',
                   boxShadow: activeCat === c.id ? '0 15px 30px rgba(0,0,0,0.1)' : '0 5px 15px rgba(0,0,0,0.02)',
                   transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                 }}
               >
                 <c.icon size={18} color={activeCat === c.id ? '#FF9431' : '#cbd5e1'} strokeWidth={2.5} />
                 {c.id}
               </button>
             ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'start' }}>
             
             {/* FAQ List */}
             <div>
                <div style={{ marginBottom: '40px' }}>
                   <Bdg color="orange" sm>{activeCat.toUpperCase()}</Bdg>
                   <h2 style={{ fontSize: '36px', fontWeight: 950, color: '#0f172a', marginTop: '16px', letterSpacing: '-0.02em' }}>Top Questions</h2>
                </div>
                
                <AnimatePresence mode="wait">
                   <motion.div key={activeCat + search} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {filtered.map((faq, i) => (
                        <FAQAccordion key={faq.q} q={faq.q} a={faq.a} delay={i * 0.1} mob={mob} />
                      ))}
                      {filtered.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '100px 0', background: '#f8fafc', borderRadius: '40px' }}>
                           <LifeBuoy size={64} color="#cbd5e1" style={{ marginBottom: '24px' }} />
                           <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#475569' }}>No matches for "{search}"</h3>
                           <Btn variant="outline" onClick={() => setSearch('')} style={{ marginTop: '24px', borderRadius: '100px' }}>Clear Search</Btn>
                        </div>
                      )}
                   </motion.div>
                </AnimatePresence>
             </div>

             {/* Support Sidebar */}
             <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Card style={{ padding: '40px', borderRadius: '48px', background: '#fff', border: '1px solid #f1f5f9' }}>
                   <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#FF943110', color: '#FF9431', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                      <MessageCircle size={28} />
                   </div>
                   <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', marginBottom: '16px' }}>Still need help?</h3>
                   <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, marginBottom: '32px', fontWeight: 500 }}>
                      Aapka sawaal yahan nahi mila? Humari team 24/7 available hai aapki queries solve karne ke liye.
                   </p>
                   <Btn full lg onClick={() => navigate('/contact')} style={{ padding: '20px', borderRadius: '100px', background: '#0f172a', color: '#fff', fontSize: '16px', fontWeight: 950 }}>
                      Connect with Support <ArrowRight size={20} />
                   </Btn>
                </Card>

                {/* Quick Guides */}
                <div style={{ display: 'grid', gap: '16px' }}>
                   {[
                     { t: 'Security Protocols', icon: ShieldCheck, d: 'How we verify creator IDs.' },
                     { t: 'Monetization 101', icon: Zap, d: 'Guide to your first brand deal.' },
                     { t: 'Brand Manual', icon: Target, d: 'Optimizing mission deployment.' }
                   ].map((item) => (
                     <motion.div
                       key={item.t}
                       whileHover={{ x: 10 }}
                       style={{ padding: '24px 32px', background: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '20px' }}
                     >
                        <item.icon color="#FF9431" size={24} />
                        <div>
                           <h4 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>{item.t}</h4>
                           <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>{item.d}</p>
                        </div>
                        <ChevronDown size={18} style={{ transform: 'rotate(-90deg)', marginLeft: 'auto', color: '#cbd5e1' }} />
                     </motion.div>
                   ))}
                </div>
             </div>

          </div>
        </div>
      </section>

      {/* Final Pulse Section */}
      <section style={{ padding: '0 24px 120px', textAlign: 'center' }}>
         <div style={{ maxWidth: '800px', margin: '0 auto', background: '#f8fafc', padding: '64px', borderRadius: '56px', border: '1px solid #f1f5f9' }}>
            <Sparkles size={40} color="#FF9431" style={{ marginBottom: '24px' }} />
            <h2 style={{ fontSize: '32px', fontWeight: 950, color: '#0f172a', marginBottom: '16px' }}>Growing Bharat Together.</h2>
            <p style={{ fontSize: '18px', color: '#64748b', fontWeight: 500, lineHeight: 1.6 }}>
              Join 15,000+ creators who trust CreatorBharat to professionalize their influence.
            </p>
         </div>
      </section>

    </div>
  );
}
