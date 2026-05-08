import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { 
  Search, 
  ChevronRight, 
  Clock, 
  Calendar, 
  ArrowRight,
  Sparkles,
  Newspaper,
  Rocket
} from 'lucide-react';

const BlogCard = ({ blog, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    style={{
      background: '#fff',
      borderRadius: '32px',
      overflow: 'hidden',
      border: '1px solid #f1f5f9',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    whileHover={{ y: -10, boxShadow: '0 30px 60px rgba(0,0,0,0.05)', borderColor: '#FF9431' }}
  >
    <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
      <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '20px', 
        background: 'rgba(255, 255, 255, 0.9)', 
        backdropFilter: 'blur(10px)',
        padding: '6px 14px', 
        borderRadius: '100px', 
        fontSize: '12px', 
        fontWeight: 900,
        color: '#FF9431',
        letterSpacing: '0.05em'
      }}>
        {blog.category.toUpperCase()}
      </div>
    </div>
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', color: '#94a3b8', fontSize: '13px', fontWeight: 700 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Calendar size={14} /> {blog.date}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={14} /> {blog.readTime}
        </div>
      </div>
      <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', lineHeight: 1.3, marginBottom: '16px', letterSpacing: '-0.02em' }}>
        {blog.title}
      </h3>
      <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>
        {blog.excerpt}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF9431', fontWeight: 900, fontSize: '14px' }}>
        Read Full Article <ArrowRight size={16} />
      </div>
    </div>
  </motion.div>
);

BlogCard.propTypes = {
  blog: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    readTime: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired
  }).isRequired,
  delay: PropTypes.number
};

export default function BlogPage() {
  const [cat, setCat] = useState('All');
  const [search, setSearch] = useState('');

  const blogs = [
    { id: 1, title: 'How to Monetize Your Local Audience', category: 'Guides', date: 'April 15, 2026', readTime: '5 min', excerpt: 'Discover the secrets of working with hyper-local brands in Tier 2 cities and how to price your services for maximum value.', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800' },
    { id: 2, title: 'Top 10 Creators in Rajasthan for 2026', category: 'Trends', date: 'April 10, 2026', readTime: '8 min', excerpt: 'Our curated list of the most influential voices from the Pink City and beyond. Who is making waves in Bharat?', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800' },
    { id: 3, title: 'Understanding Brand Deals in Hindi', category: 'Industry', date: 'April 05, 2026', readTime: '6 min', excerpt: 'Negotiating contracts can be tricky when languages vary. Here is what every creator needs to know about professional agreements.', image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800' },
    { id: 4, title: 'The Rise of Regional Content Creators', category: 'Culture', date: 'March 28, 2026', readTime: '10 min', excerpt: 'Why Bharat is no longer just watching — it is creating. A deep dive into the cultural shift in Indian digital spaces.', image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800' },
    { id: 5, title: 'SEO for Creators: Get Found Locally', category: 'Guides', date: 'March 22, 2026', readTime: '4 min', excerpt: 'Simple tips to make your creator portfolio rank on Google when brands search for local talent in your city.', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800' },
    { id: 6, title: 'CreatorBharat v3: What is New?', category: 'News', date: 'March 15, 2026', readTime: '3 min', excerpt: 'Announcing the launch of our most advanced platform yet. Built with ❤️ for the next generation of digital Bharat.', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800' }
  ];

  const categories = ['All', 'Guides', 'Trends', 'Industry', 'Culture', 'News'];
  const filtered = blogs.filter(b => 
    (cat === 'All' || b.category === cat) && 
    (b.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Hero */}
      <section style={{ 
        background: '#050505', 
        padding: '160px 24px 100px', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(255, 148, 49, 0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #FF9431, #fff, #128807)' }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'rgba(255, 255, 255, 0.05)', 
              padding: '8px 16px', 
              borderRadius: '100px',
              marginBottom: '32px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Sparkles size={14} color="#FF9431" />
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Insights & News</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: 950, color: '#fff', marginBottom: '24px', letterSpacing: '-0.04em' }}
          >
            The Voice of <br />
            <span style={{ color: '#FF9431' }}>Digital Bharat.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.6)', maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.6 }}
          >
            Stay updated with the latest trends, guides, and stories from India's rising creator economy.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ 
              maxWidth: '500px', 
              margin: '0 auto',
              position: 'relative'
            }}
          >
            <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} size={20} />
            <input 
              type="text" 
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '20px 20px 20px 60px', 
                borderRadius: '100px', 
                border: '1px solid rgba(255,255,255,0.1)', 
                background: 'rgba(255,255,255,0.05)', 
                color: '#fff',
                fontSize: '16px',
                outline: 'none',
                backdropFilter: 'blur(10px)'
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section style={{ padding: '40px 24px', background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
         <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map(c => (
              <button 
                key={c}
                onClick={() => setCat(c)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '100px',
                  border: '1.5px solid ' + (cat === c ? '#FF9431' : '#f1f5f9'),
                  background: cat === c ? 'rgba(255, 148, 49, 0.05)' : 'transparent',
                  color: cat === c ? '#FF9431' : '#64748b',
                  fontSize: '14px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {c.toUpperCase()}
              </button>
            ))}
         </div>
      </section>

      {/* Blog Grid */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '40px' 
          }}>
            {filtered.map((blog, i) => (
              <BlogCard key={blog.id} blog={blog} delay={0.1 * (i % 3)} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
               <Newspaper size={64} color="#cbd5e1" style={{ marginBottom: '24px' }} />
               <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#475569' }}>No articles found matching your search.</h3>
               <button 
                 onClick={() => {setCat('All'); setSearch('');}}
                 style={{ color: '#FF9431', fontWeight: 800, background: 'none', border: 'none', cursor: 'pointer', marginTop: '16px' }}
               >
                 Clear all filters
               </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{ padding: '100px 24px', background: '#f8fafc' }}>
        <div style={{ 
          maxWidth: '1000px', 
          margin: '0 auto', 
          background: '#fff', 
          borderRadius: '40px', 
          padding: '80px 40px', 
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
           <div style={{ 
             position: 'absolute', 
             top: '-50%', 
             left: '-10%', 
             width: '40%', 
             height: '100%', 
             background: 'rgba(255, 148, 49, 0.03)', 
             borderRadius: '50%', 
             filter: 'blur(60px)' 
           }} />
           
           <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                background: 'rgba(255, 148, 49, 0.1)', 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#FF9431',
                margin: '0 auto 24px'
              }}>
                 <Rocket size={32} />
              </div>
              <h2 style={{ fontSize: '36px', fontWeight: 950, color: '#0f172a', marginBottom: '16px', letterSpacing: '-0.02em' }}>Never Miss a Story.</h2>
              <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '500px', margin: '0 auto 40px', lineHeight: 1.6 }}>
                Join 5,000+ creators and brands receiving weekly insights on Bharat's digital landscape.
              </p>
              
              <div style={{ 
                maxWidth: '500px', 
                margin: '0 auto', 
                display: 'flex', 
                gap: '12px',
                flexDirection: 'column'
              }}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  style={{ 
                    width: '100%', 
                    padding: '20px 24px', 
                    borderRadius: '100px', 
                    border: '1px solid #e2e8f0', 
                    fontSize: '16px', 
                    fontWeight: 600,
                    outline: 'none'
                  }} 
                />
                <button style={{ 
                  width: '100%', 
                  padding: '20px', 
                  borderRadius: '100px', 
                  background: '#0f172a', 
                  color: '#fff', 
                  border: 'none', 
                  fontSize: '16px', 
                  fontWeight: 900, 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  Subscribe to Newsletter <ChevronRight size={18} />
                </button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
