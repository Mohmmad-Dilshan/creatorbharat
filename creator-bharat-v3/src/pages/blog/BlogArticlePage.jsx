import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Clock, 
  Twitter,
  Linkedin,
  Facebook,
  Bookmark,
  Sparkles,
  Copy
} from 'lucide-react';
import { Btn, Bdg } from '../../components/Primitives';
import { useNavigate } from 'react-router-dom';

const SocialButton = ({ icon: Icon, color, label }) => (
  <motion.button
    whileHover={{ scale: 1.1, backgroundColor: color + '10' }}
    whileTap={{ scale: 0.9 }}
    aria-label={label}
    style={{
      width: '48px',
      height: '48px',
      borderRadius: '16px',
      border: '1px solid #f1f5f9',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: color,
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }}
  >
    <Icon size={20} />
  </motion.button>
);

SocialButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string
};

export default function BlogArticlePage() {
  const navigate = useNavigate();
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

  const article = {
    id: 1,
    title: 'The Silent Revolution: How Tier 3 India is Redefining Digital Content',
    category: 'Industry News',
    date: 'May 08, 2026',
    readTime: '12 min',
    excerpt: 'Deep dive into the rural creator economy that is outpacing urban growth by 40%. Why brands are shifting their budgets to regional influencers.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200',
    author: {
      name: 'Anita Deshmukh',
      role: 'Chief Editor, Bharat Journal',
      bio: 'Anita has over 15 years of experience in regional media and digital transformation. She leads our creator intelligence unit.',
      avatar: 'AD'
    }
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#0f172a' }}>
      
      {/* Reading Progress Bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: '#FF9431',
          transformOrigin: '0%',
          zIndex: 2000,
          scaleX
        }}
      />

      {/* Article Header (Logo Only) */}
      <header style={{ 
        padding: '160px 24px 40px', 
        textAlign: 'center',
        background: '#fcfcfc',
        borderBottom: '1px solid #f1f5f9'
      }}>
         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.h2 
              onClick={() => navigate('/blog')}
              style={{ cursor: 'pointer', fontSize: '24px', fontWeight: 950, letterSpacing: '-0.04em', margin: 0, display: 'inline-block' }}
            >
              THE BHARAT <span style={{ color: '#FF9431' }}>JOURNAL.</span>
            </motion.h2>
         </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '60px auto 120px', padding: '0 24px' }}>
         
         {/* Article Breadcrumb & Meta */}
         <div style={{ maxWidth: '800px', margin: '0 auto 40px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
               <Bdg color="orange">{article.category.toUpperCase()}</Bdg>
               <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 700 }}>{article.date}</span>
            </div>
            <h1 style={{ 
              fontSize: 'clamp(32px, 6vw, 64px)', 
              fontWeight: 950, 
              lineHeight: 1.05, 
              letterSpacing: '-0.05em',
              marginBottom: '32px'
            }}>
              {article.title}
            </h1>
            <p style={{ fontSize: '20px', color: '#475569', lineHeight: 1.6, fontWeight: 500, margin: '0 auto 40px' }}>
               {article.excerpt}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
               <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                  {article.author.avatar}
               </div>
               <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '15px', fontWeight: 900 }}>{article.author.name}</div>
                  <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 700 }}>{article.author.role}</div>
               </div>
            </div>
         </div>

         {/* Hero Image */}
         <div style={{ width: '100%', height: 'clamp(300px, 60vh, 700px)', borderRadius: '40px', overflow: 'hidden', marginBottom: '60px', boxShadow: '0 40px 100px rgba(0,0,0,0.1)' }}>
            <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
         </div>

         {/* Content Grid */}
         <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '80px 1fr 300px', gap: '60px' }}>
            
            {/* Share Sidebar */}
            {!mob && (
               <aside style={{ position: 'sticky', top: '120px', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <SocialButton icon={Twitter} color="#1DA1F2" label="Share on Twitter" />
                  <SocialButton icon={Linkedin} color="#0077B5" label="Share on LinkedIn" />
                  <SocialButton icon={Facebook} color="#1877F2" label="Share on Facebook" />
                  <SocialButton icon={Copy} color="#64748b" label="Copy Link" />
                  <div style={{ height: '40px', width: '1px', background: '#e2e8f0', margin: '12px auto' }} />
                  <SocialButton icon={Bookmark} color="#FF9431" label="Save Article" />
               </aside>
            )}

            {/* Main Article Content */}
            <article style={{ maxWidth: '800px', margin: '0 auto' }}>
               <div style={{ 
                 fontSize: '20px', 
                 lineHeight: 1.8, 
                 color: '#334155',
                 fontFamily: 'Inter, system-ui, sans-serif'
               }}>
                  <p>Bharat ki digital landscape mein ek anokhi kranti aa rahi hai. Jab hum digital Bharat ki baat karte hain, toh aksar hamara dhyan sirf metro cities jaise Delhi, Mumbai ya Bangalore par jata hai. Lekin asli kahani toh Tier 2 aur Tier 3 Bharat ke chote shehron aur gaon mein likhi ja rahi hai.</p>
                  
                  <h2 style={{ fontSize: '32px', fontWeight: 950, color: '#0f172a', margin: '48px 0 24px', letterSpacing: '-0.03em' }}>The Power of Hyper-Localism</h2>
                  <p>Regional content creators ab sirf 'entertainers' nahi rahe, balki wo ab apne community ke sabse bade 'opinion leaders' ban chuke hain. Ek local creator jo apni boli (dialect) mein baat karta hai, uska trust factor ek global influencer se kahi zyada hota hai.</p>
                  
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
                    "The Next Billion Users won't consume content in English. They will consume it in the language they dream in. That's where the future of Bharat's economy lies."
                  </blockquote>

                  <p>Brands ab is baat ko samajh chuke hain. Is saal ke marketing reports ke mutabiq, 60% se zyada leading brands ne apna budget regional marketing ki taraf shift kiya hai. Iska seedha fayda Tier 3 creators ko mil raha hai jo apne culture aur roots se jude hue hain.</p>

                  <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', margin: '40px 0 20px', letterSpacing: '-0.02em' }}>Monetization Challenges & Solutions</h3>
                  <p>Lekin sirf popularity kaafi nahi hai. Ek creator ko businessman banne ke liye sahi tools aur ecosystem ki zaroorat hoti hai. CreatorBharat isi gap ko bharne ke liye banaya gaya hai. Hum creators ko sirf brands se nahi jodte, balki unhe professional media kits aur dashboard analytics provide karte hain taaki wo apna business scale kar sakein.</p>
                  
                  <div style={{ padding: '40px', background: '#0f172a', borderRadius: '32px', color: '#fff', margin: '60px 0' }}>
                     <Sparkles size={32} color="#FF9431" style={{ marginBottom: '24px' }} />
                     <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '16px' }}>Ready to Scale Your Journey?</h3>
                     <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>Join the elite 1% of regional creators on Bharat's first professional marketplace.</p>
                     <Btn style={{ background: '#FF9431', color: '#fff', border: 'none' }}>Create Your Media Kit Now</Btn>
                  </div>
               </div>

               {/* Author Bio Card */}
               <div style={{ marginTop: '100px', padding: '48px', background: '#f8fafc', borderRadius: '40px', display: 'flex', flexWrap: mob ? 'wrap' : 'nowrap', gap: '32px', alignItems: 'center' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '24px', flexShrink: 0 }}>
                     {article.author.avatar}
                  </div>
                  <div>
                     <h4 style={{ fontSize: '20px', fontWeight: 950, marginBottom: '8px' }}>About {article.author.name}</h4>
                     <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{article.author.bio}</p>
                     <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
                        <Btn sm style={{ borderRadius: '8px' }}>Follow Anita</Btn>
                        <Btn sm outline style={{ borderRadius: '8px' }}>Read More Posts</Btn>
                     </div>
                  </div>
               </div>
            </article>

            {/* Right Sidebar: Related & Trending */}
            {!mob && (
               <aside style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 950, marginBottom: '24px', borderBottom: '2px solid #0f172a', display: 'inline-block' }}>CONTINUE READING</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                     {[2, 3, 4].map(i => (
                        <button 
                          key={i} 
                          style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, textAlign: 'left', width: '100%', fontFamily: 'inherit', color: 'inherit' }} 
                          onClick={() => navigate(`/blog/${i}`)}
                          aria-label="Read related article"
                        >
                           <div style={{ height: '120px', width: '100%', background: '#f1f5f9', borderRadius: '16px', marginBottom: '12px', overflow: 'hidden' }}>
                              <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?w=400`} alt="related" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                           </div>
                           <h4 style={{ fontSize: '14px', fontWeight: 800, lineHeight: 1.4, margin: '0 0 6px' }}>Exploring the impact of regional music on digital trends</h4>
                           <span style={{ fontSize: '11px', color: '#FF9431', fontWeight: 900 }}>TRENDS • 6 MIN READ</span>
                        </button>
                     ))}
                  </div>
               </aside>
            )}

         </div>

      </main>

      {/* Footer / More Articles Section */}
      <section style={{ padding: '120px 24px', background: '#fcfcfc', borderTop: '1px solid #f1f5f9' }}>
         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
               <h2 style={{ fontSize: '48px', fontWeight: 950, letterSpacing: '-0.04em' }}>From The <span style={{ color: '#FF9431' }}>Newsroom.</span></h2>
               <p style={{ color: '#64748b', fontSize: '18px' }}>More exclusive insights for the modern creator economy.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
               {[5, 6].map(i => (
                  <button 
                    key={i} 
                    style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, textAlign: 'left', width: '100%', fontFamily: 'inherit', color: 'inherit' }} 
                    onClick={() => navigate(`/blog/${i}`)}
                    aria-label="Read article"
                  >
                     <div style={{ width: '100%', height: '240px', background: '#f1f5f9', borderRadius: '32px', overflow: 'hidden', marginBottom: '24px' }}>
                        <img src={`https://images.unsplash.com/photo-${1510000000000 + i * 100000}?w=600`} alt="related" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                     </div>
                     <Bdg color="orange">INDUSTRY</Bdg>
                     <h3 style={{ fontSize: '24px', fontWeight: 950, margin: '16px 0', lineHeight: 1.2 }}>Algorithm decoded: 5 hacks to double your reach in 2026</h3>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#94a3b8', fontSize: '14px', fontWeight: 700 }}>
                        <Clock size={16} /> 10 MIN READ
                     </div>
                  </button>
               ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '80px' }}>
               <Btn lg outline style={{ borderRadius: '100px' }} onClick={() => navigate('/blog')}>Back to All Headlines</Btn>
            </div>
         </div>
      </section>

    </div>
  );
}

