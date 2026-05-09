import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { 
  Search, 
  Newspaper,
  Rocket,
  Share2,
  Bookmark
} from 'lucide-react';
import { Btn, Bdg } from '../../components/Primitives';
import { useNavigate, Link } from 'react-router-dom';
import { blogData } from '../../data/blogData';

const categories = ['All', 'Industry News', 'Creator Guides', 'Brand Stories', 'Regional Trends', 'Reports'];

const BlogCard = ({ blog, horizontal = false, mob = false }) => {
  const isHorizontal = horizontal && !mob;
  return (
    <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          display: isHorizontal ? 'grid' : 'block',
          gridTemplateColumns: isHorizontal ? '300px 1fr' : 'none',
          gap: isHorizontal ? '32px' : '0',
          padding: '24px 0',
          borderBottom: '1px solid #f1f5f9',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        whileHover={{ background: 'rgba(248, 250, 252, 0.5)', paddingLeft: '12px', paddingRight: '12px' }}
      >
        <div style={{ 
          width: '100%', 
          height: isHorizontal ? '200px' : '280px', 
          borderRadius: '24px', 
          overflow: 'hidden',
          background: '#f1f5f9',
          marginBottom: isHorizontal ? '0' : '24px'
        }}>
          <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Bdg color="orange" sm>{blog.category.toUpperCase()}</Bdg>
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 700 }}>{blog.readTime} Read</span>
          </div>
          <h3 style={{ 
            fontSize: isHorizontal ? '24px' : '20px', 
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
                   {typeof blog.author === 'object' ? blog.author.avatar : blog.author.split(' ').map(n => n[0]).join('')}
                </div>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#334155' }}>
                   {typeof blog.author === 'object' ? blog.author.name : blog.author}
                </span>
             </div>
             <div style={{ display: 'flex', gap: '16px', color: '#94a3b8' }}>
                <Bookmark size={18} />
                <Share2 size={18} />
             </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.object.isRequired,
  horizontal: PropTypes.bool,
  mob: PropTypes.bool
};

export default function BlogPage() {
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [activeTab, setActiveTab] = useState('All');

  React.useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const [search, setSearch] = useState('');
  const featured = blogData.find(b => b.featured);
  const filtered = blogData.filter(b => 
    !b.featured && 
    (activeTab === 'All' || b.category === activeTab) &&
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh' }}>
      
      {/* Search & Filter Header */}
      <section style={{ padding: mob ? '100px 24px 40px' : '160px 24px 60px', background: '#050505', color: '#fff', position: 'relative', overflow: 'hidden' }}>
         <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255, 148, 49, 0.15), transparent 70%)' }} />
         
         <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 255, 255, 0.05)', padding: '10px 20px', borderRadius: '100px', marginBottom: mob ? '16px' : '32px', border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
               <Newspaper size={16} color="#FF9431" />
               <span style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Insights & Intelligence</span>
            </motion.div>
            
            <h1 style={{ fontSize: mob ? '32px' : 'clamp(40px, 6vw, 72px)', fontWeight: 950, marginBottom: mob ? '24px' : '40px', letterSpacing: '-0.04em' }}>The Bharat <span style={{ color: '#FF9431' }}>Journal.</span></h1>
            
            <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
               <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
               <input 
                  type="text" 
                  placeholder={mob ? "Search articles..." : "Search articles, reports, or guides..."}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ width: '100%', padding: mob ? '16px 16px 16px 48px' : '24px 24px 24px 64px', borderRadius: '100px', border: 'none', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: mob ? '15px' : '18px', fontWeight: 600, outline: 'none', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}
               />
            </div>
         </div>
      </section>

      {/* Categories */}
      <section style={{ borderBottom: '1px solid #f1f5f9', background: '#fff', position: 'sticky', top: '0', zIndex: 100 }}>
         <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: mob ? '24px' : '40px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {categories.map(cat => {
               const active = activeTab === cat;
               return (
                  <button 
                     key={cat} 
                     onClick={() => setActiveTab(cat)}
                     style={{ padding: mob ? '16px 0' : '24px 0', borderBottom: `2px solid ${active ? '#FF9431' : 'transparent'}`, background: 'none', border: 'none', fontSize: '14px', fontWeight: 800, color: active ? '#0f172a' : '#94a3b8', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.3s ease' }}
                  >
                     {cat}
                  </button>
               );
            })}
         </div>
      </section>

      {/* Main Feed */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: mob ? '32px 20px' : '80px 24px' }}>
         <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 380px', gap: mob ? '40px' : '80px' }}>
            
            {/* Articles List */}
            <div>
               {featured && activeTab === 'All' && !search && (
                  <div style={{ marginBottom: mob ? '40px' : '80px' }}>
                     <div style={{ fontSize: '12px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Rocket size={14} /> Featured Story
                     </div>
                     <BlogCard blog={featured} horizontal={!mob} mob={mob} />
                  </div>
               )}

               <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                  {filtered.length > 0 ? (
                     filtered.map(blog => <BlogCard key={blog.id} blog={blog} mob={mob} />)
                  ) : (
                     <div style={{ textAlign: 'center', padding: '100px 0' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>No results found</h3>
                        <p style={{ color: '#64748b' }}>Try adjusting your search or filters.</p>
                     </div>
                  )}
               </div>
            </div>

            {/* Sidebar (Hidden on small mobile if desired, but we'll keep it simple) */}
            {!mob && (
               <aside>
                  <div style={{ background: '#fff', borderRadius: '32px', padding: '32px', border: '1px solid #f1f5f9', position: 'sticky', top: '100px' }}>
                     <h3 style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a', marginBottom: '24px' }}>Newsletter</h3>
                     <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>Get the latest insights from the Bharat creator economy delivered to your inbox.</p>
                     <input 
                        type="email" 
                        placeholder="your@email.com" 
                        style={{ width: '100%', padding: '16px 20px', borderRadius: '16px', border: '1px solid #f1f5f9', background: '#f8fafc', marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}
                     />
                     <Btn full lg style={{ background: '#0f172a', color: '#fff' }}>Subscribe Now</Btn>
                     
                     <div style={{ marginTop: '48px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a', marginBottom: '24px' }}>Trending Topics</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                           {['#InfluencerMarketing', '#BharatEconomy', '#ShortFormVideo', '#Monetization', '#Web3'].map(t => (
                              <span key={t} style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', padding: '8px 16px', background: '#f8fafc', borderRadius: '100px', border: '1px solid #f1f5f9' }}>{t}</span>
                           ))}
                        </div>
                     </div>
                  </div>
               </aside>
            )}

         </div>
      </main>

   </div>
  );
}
