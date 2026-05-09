import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { 
  Search, 
  Clock, 
  Calendar, 
  Newspaper,
  Rocket,
  Share2,
  Bookmark
} from 'lucide-react';
import { Btn, Bdg } from '../../components/Primitives';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Industry News', 'Creator Guides', 'Brand Stories', 'Regional Trends', 'Reports'];

const blogData = [
  { id: 1, title: 'The Silent Revolution: How Tier 3 India is Redefining Digital Content', category: 'Industry News', date: 'May 08, 2026', readTime: '12 min', excerpt: 'Deep dive into the rural creator economy that is outpacing urban growth by 40%. Why brands are shifting their budgets to regional influencers.', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200', featured: true, author: 'Anita Deshmukh' },
  { id: 2, title: 'Algorithm Decoded: 5 Hacks to Double Your Reach in Bharat', category: 'Creator Guides', date: 'May 07, 2026', readTime: '6 min', excerpt: 'Stop fighting the algorithm. Start using these five proven strategies to make your content go viral in local circles.', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800', author: 'Vikram Seth' },
  { id: 3, title: 'Case Study: How a Local Snack Brand Hit 50M Impressions', category: 'Brand Stories', date: 'May 05, 2026', readTime: '8 min', excerpt: 'The inside story of the most successful regional campaign of 2026. Zero celebrity budget, 100% creator driven.', image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800', author: 'Rahul Kapoor' },
  { id: 4, title: 'The Rise of Bhojpuri Pop Culture in Digital Spaces', category: 'Regional Trends', date: 'May 02, 2026', readTime: '10 min', excerpt: 'Exploring the massive impact of regional music and comedy on global streaming platforms.', image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800', author: 'Priya Verma' },
  { id: 5, title: 'Creator Monetization Report 2026: The New Gold Rush', category: 'Reports', date: 'April 30, 2026', readTime: '15 min', excerpt: 'Our exclusive annual report on the state of earnings for mid-tier creators in India.', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800', author: 'Arjun Mehta' },
  { id: 6, title: 'Platform Update: Smart Media Kits are Now Live!', category: 'Industry News', date: 'April 28, 2026', readTime: '3 min', excerpt: 'Announcing our most requested feature yet. Create professional kits in 60 seconds.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', author: 'Team CreatorBharat' }
];

const BlogCard = ({ blog, horizontal = false }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => navigate(`/blog/${blog.id}`)}
      style={{
        display: horizontal ? 'grid' : 'block',
        gridTemplateColumns: horizontal ? '300px 1fr' : 'none',
        gap: '32px',
        padding: '24px 0',
        borderBottom: '1px solid #f1f5f9',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      whileHover={{ background: 'rgba(248, 250, 252, 0.5)', paddingLeft: '12px', paddingRight: '12px' }}
    >
      <div style={{ 
        width: '100%', 
        height: horizontal ? '200px' : '280px', 
        borderRadius: '24px', 
        overflow: 'hidden',
        background: '#f1f5f9',
        marginBottom: horizontal ? '0' : '24px'
      }}>
        <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <Bdg color="orange" sm>{blog.category.toUpperCase()}</Bdg>
          <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 700 }}>{blog.readTime} Read</span>
        </div>
        <h3 style={{ 
          fontSize: horizontal ? '24px' : '20px', 
          fontWeight: 950, 
          color: '#0f172a', 
          lineHeight: 1.25, 
          marginBottom: '12px',
          letterSpacing: '-0.03em'
        }}>
          {blog.title}
        </h3>
        <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {blog.excerpt}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900 }}>
                 {blog.author.split(' ').map(n => n[0]).join('')}
              </div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#334155' }}>{blog.author}</span>
           </div>
           <div style={{ display: 'flex', gap: '16px', color: '#94a3b8' }}>
              <Bookmark size={18} />
              <Share2 size={18} />
           </div>
        </div>
      </div>
    </motion.div>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.object.isRequired,
  horizontal: PropTypes.bool
};

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const featured = blogData.find(b => b.featured);
  const filtered = blogData.filter(b => 
    !b.featured && 
    (activeTab === 'All' || b.category === activeTab) &&
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#0f172a' }}>
      
      {/* Newspaper Header */}
      <header style={{ 
        padding: '160px 24px 60px', 
        borderBottom: '2px solid #0f172a', 
        textAlign: 'center',
        background: '#fcfcfc'
      }}>
         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              style={{ fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '16px', color: '#64748b' }}
            >
              Bharat's Premium Creator Intelligence Hub
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontSize: 'clamp(48px, 10vw, 120px)', fontWeight: 950, letterSpacing: '-0.06em', margin: '0 0 24px', lineHeight: 0.85 }}
            >
              THE BHARAT <span style={{ color: '#FF9431' }}>JOURNAL.</span>
            </motion.h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '16px 0' }}>
               <span style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>VOL. III NO. 08</span>
               <div style={{ height: '14px', width: '1px', background: '#cbd5e1' }} />
               <span style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}</span>
               <div style={{ height: '14px', width: '1px', background: '#cbd5e1' }} />
               <span style={{ fontSize: '13px', fontWeight: 900, color: '#FF9431' }}>LIVE UPDATES</span>
            </div>
         </div>
      </header>

      {/* Categories Navigation */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #f1f5f9' }}>
         <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', overflowX: 'auto', padding: '0 24px', scrollbarWidth: 'none' }}>
            {categories.map(c => (
               <button
                 key={c}
                 onClick={() => setActiveTab(c)}
                 style={{
                   padding: '20px 24px',
                   border: 'none',
                   background: 'none',
                   fontSize: '13px',
                   fontWeight: 900,
                   color: activeTab === c ? '#FF9431' : '#64748b',
                   cursor: 'pointer',
                   whiteSpace: 'nowrap',
                   borderBottom: '2px solid ' + (activeTab === c ? '#FF9431' : 'transparent'),
                   transition: 'all 0.2s ease'
                 }}
               >
                 {c.toUpperCase()}
               </button>
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', padding: '0 20px' }}>
               <Search size={18} color="#94a3b8" />
            </div>
         </div>
      </nav>

      {/* Main Content Layout */}
      <main style={{ maxWidth: '1200px', margin: '60px auto 120px', padding: '0 24px' }}>
         
         <div style={{ display: 'grid', gridTemplateColumns: globalThis.innerWidth > 1024 ? '1fr 340px' : '1fr', gap: '60px' }}>
            
            {/* Left Column: Feed */}
            <div>
               {/* Featured Article */}
               {activeTab === 'All' && !search && featured && (
                  <motion.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ marginBottom: '80px', borderBottom: '4px solid #0f172a', paddingBottom: '60px' }}
                  >
                     <div style={{ position: 'relative', width: '100%', height: '500px', borderRadius: '40px', overflow: 'hidden', marginBottom: '40px' }}>
                        <img src={featured.image} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                        <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px' }}>
                           <Bdg color="orange">{featured.category.toUpperCase()}</Bdg>
                           <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 950, color: '#fff', margin: '20px 0', lineHeight: 1.05, letterSpacing: '-0.04em' }}>
                              {featured.title}
                           </h2>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'rgba(255,255,255,0.8)', fontSize: '15px', fontWeight: 600 }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={16} /> {featured.date}</span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={16} /> {featured.readTime} Read</span>
                           </div>
                        </div>
                     </div>
                     <p style={{ fontSize: '20px', color: '#475569', lineHeight: 1.6, fontWeight: 500, maxWidth: '800px' }}>
                        {featured.excerpt}
                     </p>
                     <Btn lg onClick={() => navigate(`/blog/${featured.id}`)} style={{ marginTop: '32px', borderRadius: '100px' }}>Read Full Exclusive Story</Btn>
                  </motion.section>
               )}

               {/* Latest News Feed */}
               <section>
                  <h2 style={{ fontSize: '32px', fontWeight: 950, marginBottom: '40px', letterSpacing: '-0.03em' }}>
                     {activeTab === 'All' ? 'Latest Headlines' : `${activeTab} Headlines`}
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                     {filtered.map(blog => (
                        <BlogCard key={blog.id} blog={blog} horizontal={globalThis.innerWidth > 768} />
                     ))}
                  </div>
               </section>
            </div>

            {/* Right Column: Sidebar */}
            {globalThis.innerWidth > 1024 && (
               <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                  
                  {/* Search Sidebar */}
                  <div style={{ marginBottom: '60px' }}>
                     <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '24px', borderBottom: '2px solid #0f172a', display: 'inline-block' }}>SEARCH ARCHIVE</h3>
                     <div style={{ position: 'relative' }}>
                        <Search style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
                        <input 
                          type="text" 
                          placeholder="Type keywords..." 
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          style={{ 
                            width: '100%', 
                            padding: '16px', 
                            borderRadius: '12px', 
                            border: '1px solid #f1f5f9', 
                            background: '#f8fafc',
                            fontSize: '14px',
                            fontWeight: 600,
                            outline: 'none'
                          }} 
                        />
                     </div>
                  </div>

                  {/* Trending Now */}
                  <div style={{ marginBottom: '60px' }}>
                     <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '24px', borderBottom: '2px solid #0f172a', display: 'inline-block' }}>TRENDING NOW</h3>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {blogData.slice(0, 4).map((b, i) => (
                           <div key={b.id} style={{ display: 'flex', gap: '16px', cursor: 'pointer' }}>
                              <span style={{ fontSize: '32px', fontWeight: 950, color: '#e2e8f0', lineHeight: 0.8 }}>0{i+1}</span>
                              <div>
                                 <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px', lineHeight: 1.4 }}>{b.title}</h4>
                                 <span style={{ fontSize: '12px', color: '#FF9431', fontWeight: 900 }}>{b.category.toUpperCase()}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Newsletter Widget */}
                  <div style={{ background: '#0f172a', padding: '32px', borderRadius: '32px', color: '#fff' }}>
                     <Rocket size={32} color="#FF9431" style={{ marginBottom: '20px' }} />
                     <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '12px', lineHeight: 1.1 }}>Join 10k+ Decision Makers.</h3>
                     <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '24px', lineHeight: 1.6 }}>Get the weekly creator intelligence report directly in your inbox.</p>
                     <input 
                        type="email" 
                        placeholder="Email address" 
                        style={{ 
                           width: '100%', 
                           padding: '14px', 
                           borderRadius: '12px', 
                           border: 'none', 
                           background: 'rgba(255,255,255,0.1)', 
                           color: '#fff', 
                           marginBottom: '12px',
                           fontSize: '14px'
                        }} 
                     />
                     <Btn style={{ width: '100%', background: '#FF9431', color: '#fff', border: 'none', borderRadius: '12px' }}>SUBSCRIBE</Btn>
                  </div>

               </aside>
            )}

         </div>

      </main>

      {/* Footer Branding */}
      <footer style={{ padding: '80px 24px', borderTop: '1px solid #f1f5f9', textAlign: 'center', background: '#fcfcfc' }}>
         <Newspaper size={40} color="#cbd5e1" style={{ marginBottom: '24px' }} />
         <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 600 }}>&copy; 2026 CreatorBharat Media. All rights reserved. <br /> Built for the Next Billion Creators.</p>
      </footer>

    </div>
  );
}

