import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  MessageCircle as Twitter, 
  Briefcase as Linkedin,
  MessageCircle,
  Bookmark,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const SocialButton = ({ icon: Icon, color }) => (
  <motion.button
    whileHover={{ scale: 1.1, backgroundColor: color, color: '#fff' }}
    whileTap={{ scale: 0.9 }}
    style={{
      width: '44px',
      height: '44px',
      borderRadius: '12px',
      border: '1px solid #f1f5f9',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#64748b',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }}
  >
    <Icon size={18} />
  </motion.button>
);

SocialButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired
};

export default function BlogArticlePage() {
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  // Mock article data (fallback if not selected)
  const article = {
    title: 'How to Monetize Your Local Audience',
    category: 'Guides',
    date: 'April 15, 2026',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200',
    excerpt: 'Beyond the vanity metrics of likes and followers, lies the real potential of Tier 2 & 3 Bharat. Here is how you can convert your local influence into a sustainable business.',
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Reading Progress Bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: '#FF9431',
          transformOrigin: '0%',
          zIndex: 1001,
          scaleX
        }}
      />

      {/* Header / Hero */}
      <section style={{ 
        background: '#050505', 
        padding: '160px 24px 80px', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 70%, rgba(255, 148, 49, 0.1), transparent 70%)' }} />
        
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)', 
              border: '1px solid rgba(255, 255, 255, 0.1)', 
              color: '#fff', 
              padding: '10px 20px', 
              borderRadius: '100px', 
              fontSize: '13px', 
              fontWeight: 800, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '32px'
            }}
          >
            <ArrowLeft size={16} /> Back to Hub
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}
          >
            <span style={{ 
              background: 'rgba(255, 148, 49, 0.15)', 
              color: '#FF9431', 
              padding: '6px 16px', 
              borderRadius: '100px', 
              fontSize: '12px', 
              fontWeight: 900,
              letterSpacing: '0.05em'
            }}>
              {article.category.toUpperCase()}
            </span>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
            <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px', fontWeight: 600 }}>
              {article.date} • {article.readTime} Read
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ 
              fontSize: 'clamp(32px, 6vw, 56px)', 
              fontWeight: 950, 
              color: '#fff', 
              lineHeight: 1.1, 
              marginBottom: '40px',
              letterSpacing: '-0.04em'
            }}
          >
            {article.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
          >
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #FF9431, #FFC187)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              color: '#fff'
            }}>CB</div>
            <div>
              <div style={{ color: '#fff', fontSize: '16px', fontWeight: 800 }}>CreatorBharat Editorial</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '13px', fontWeight: 600 }}>Expert Analysis for Bharat</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: mob ? '1fr' : '80px 1fr 300px', gap: '60px' }}>
          
          {/* Left Sidebar (Desktop Only) */}
          {!mob && (
            <div style={{ position: 'sticky', top: '100px', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <SocialButton icon={Twitter} color="#1DA1F2" />
              <SocialButton icon={Linkedin} color="#0077B5" />
              <SocialButton icon={MessageCircle} color="#25D366" />
              <SocialButton icon={Bookmark} color="#FF9431" />
            </div>
          )}

          {/* Main Content */}
          <div style={{ maxWidth: '800px' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              style={{ 
                borderRadius: '40px', 
                overflow: 'hidden', 
                marginBottom: '60px',
                boxShadow: '0 40px 80px rgba(0,0,0,0.1)'
              }}
            >
              <img src={article.image} alt={article.title} style={{ width: '100%', display: 'block' }} />
            </motion.div>

            <article style={{ 
              fontSize: '20px', 
              color: '#334155', 
              lineHeight: 1.8,
              fontFamily: "'Inter', sans-serif"
            }}>
              <p style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '40px', lineHeight: 1.5, letterSpacing: '-0.01em' }}>
                {article.excerpt}
              </p>

              <p>Bharat ki creator economy ab tezi se badh rahi hai. Tier 2 aur Tier 3 cities ke creators ab national brands ki pehli pasand ban rahe hain. Iska sabse bada kaaran hai unka 'Authenticity' aur local connect.</p>
              
              <h3 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', margin: '48px 0 24px', letterSpacing: '-0.02em' }}>1. Local Language ka Power</h3>
              <p>Hindi, Tamil, Telugu, aur Marathi jaise languages mein content banane wale creators ki engagement rate metro creators se 3x zyada hoti hai. Brands ko pata hai ki asli Bharat inhi languages mein basta hai. Jab aap apni boli mein baat karte hain, toh audience aap par zyada trust karti hai.</p>
              
              <blockquote style={{ 
                borderLeft: '4px solid #FF9431', 
                padding: '32px 40px', 
                background: '#f8fafc', 
                borderRadius: '0 24px 24px 0',
                margin: '48px 0',
                fontSize: '22px',
                fontWeight: 700,
                color: '#0f172a',
                fontStyle: 'italic',
                lineHeight: 1.5
              }}>
                "Future of influence is local. Metro markets are saturated, growth is coming from the heartlands. If you are a creator in a Tier 2 city, you are sitting on a goldmine."
              </blockquote>
              
              <h3 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', margin: '48px 0 24px', letterSpacing: '-0.02em' }}>2. Professionalism is Key</h3>
              <p>Sirf video banana kaafi nahi hai. Ek professional portfolio, clear rates, aur timely delivery hi aapko ek professional creator banati hai. CreatorBharat inhi cheezon mein aapki help karta hai. Aapka media kit aapka sabse bada marketing tool hai.</p>
              
              <p>Aaj ke digital era mein, brands sirf followers nahi, balki convertion aur engagement dhund rahe hain. Tier 2/3 India ke creators ke paas wo dedicated audience hai jo unke har suggestion ko follow karti hai.</p>
            </article>

            {/* Author Footer */}
            <div style={{ 
              marginTop: '80px', 
              paddingTop: '60px', 
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              gap: '24px',
              alignItems: 'center'
            }}>
               <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#f1f5f9', flexShrink: 0, overflow: 'hidden' }}>
                  <img src="https://ui-avatars.com/api/?name=Creator+Bharat&background=050505&color=fff" alt="Author" style={{ width: '100%', height: '100%' }} />
               </div>
               <div>
                  <h4 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>Written by CreatorBharat Team</h4>
                  <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
                    We are on a mission to build India's elite infrastructure for the next generation of digital creators. Join us as we build the future of Bharat.
                  </p>
               </div>
            </div>
          </div>

          {/* Right Sidebar (Desktop Only) */}
          {!mob && (
            <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
              <div style={{ 
                background: '#f8fafc', 
                borderRadius: '32px', 
                padding: '32px', 
                border: '1px solid #e2e8f0' 
              }}>
                <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} color="#FF9431" /> Pro Tips
                </h4>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ fontSize: '14px', color: '#475569', fontWeight: 600, display: 'flex', gap: '8px' }}>
                    <ChevronRight size={14} color="#FF9431" style={{ flexShrink: 0, marginTop: '2px' }} />
                    Verify your identity early for 2x trust.
                  </li>
                  <li style={{ fontSize: '14px', color: '#475569', fontWeight: 600, display: 'flex', gap: '8px' }}>
                    <ChevronRight size={14} color="#FF9431" style={{ flexShrink: 0, marginTop: '2px' }} />
                    Link all social accounts to your CB profile.
                  </li>
                  <li style={{ fontSize: '14px', color: '#475569', fontWeight: 600, display: 'flex', gap: '8px' }}>
                    <ChevronRight size={14} color="#FF9431" style={{ flexShrink: 0, marginTop: '2px' }} />
                    Update your rates every quarter.
                  </li>
                </ul>
              </div>

              {/* Newsletter Small */}
              <div style={{ 
                background: '#050505', 
                borderRadius: '32px', 
                padding: '32px', 
                marginTop: '24px',
                color: '#fff'
              }}>
                 <h5 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '12px' }}>Subscribe to News</h5>
                 <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>Join 5k+ creators getting early insights.</p>
                 <input 
                  type="email" 
                  placeholder="Your email" 
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    borderRadius: '12px', 
                    border: 'none', 
                    background: 'rgba(255,255,255,0.1)', 
                    color: '#fff', 
                    marginBottom: '12px',
                    fontSize: '14px'
                  }} 
                 />
                 <button style={{ 
                   width: '100%', 
                   padding: '12px', 
                   borderRadius: '12px', 
                   background: '#FF9431', 
                   color: '#fff', 
                   border: 'none', 
                   fontWeight: 800, 
                   fontSize: '14px', 
                   cursor: 'pointer' 
                 }}>
                   Sign Up
                 </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Posts */}
      <section style={{ padding: '80px 24px', background: '#fcfcfc', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>More from the Hub</h2>
            <button style={{ color: '#FF9431', fontWeight: 800, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              View all articles <ArrowRight size={18} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
                 <div style={{ height: '180px', background: '#f1f5f9' }} />
                 <div style={{ padding: '24px' }}>
                    <div style={{ color: '#FF9431', fontSize: '12px', fontWeight: 900, marginBottom: '8px' }}>TRENDS</div>
                    <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>Upcoming Creator Trends in Bharat for 2026</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px' }}>
                       <Clock size={14} /> 8 min read
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
