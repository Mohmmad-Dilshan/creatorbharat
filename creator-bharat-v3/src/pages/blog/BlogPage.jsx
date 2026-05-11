import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { 
  Search,
  ArrowRight,
  TrendingUp,
  Mail,
  ArrowUpRight,
  Globe
} from 'lucide-react';
import { Btn, Bdg } from '@/components/common/Primitives';
import { Link } from 'react-router-dom';
import { blogData } from '../../data/blogData';
import Seo from '@/components/common/SEO';

/**
 * THEME: CreatorBharat Elite Edition
 * Layout: Newspaper / Editorial Hybrid
 */

const categories = ['All', 'Industry News', 'Creator Guides', 'Brand Stories', 'Regional Trends', 'Reports'];
const BRAND_ORANGE = '#FF9431';

const getNewspaperDate = () => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options).toUpperCase();
};

const NewspaperHeader = ({ mob }) => (
  <header style={{ borderBottom: '4px double #000', paddingBottom: '15px', marginBottom: '30px', position: 'relative', paddingLeft: mob ? '20px' : 0, paddingRight: mob ? '20px' : 0 }}>
    <div style={{ 
      display: 'flex', 
      flexDirection: mob ? 'column' : 'row',
      justifyContent: 'space-between', 
      alignItems: 'center', 
      fontSize: mob ? '9px' : '11px', 
      fontWeight: 800, 
      textTransform: 'uppercase', 
      letterSpacing: '0.15em', 
      color: '#666',
      marginBottom: '10px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Globe size={12} /> GLOBAL EDITION
      </div>
      <span>{getNewspaperDate()}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        BHILWARA, RAJ <ArrowUpRight size={10} />
      </div>
    </div>
    
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <h1 style={{ 
        fontFamily: '"Playfair Display", serif', 
        fontSize: 'clamp(40px, 10vw, 130px)', 
        fontWeight: 900, 
        margin: '0',
        letterSpacing: '-0.04em',
        lineHeight: 0.85,
        color: '#000'
      }}>
        THE BHARAT <span style={{ color: BRAND_ORANGE }}>JOURNAL.</span>
      </h1>
      <p style={{ 
        fontSize: mob ? '10px' : '14px', 
        fontWeight: 900, 
        textTransform: 'uppercase', 
        letterSpacing: '0.4em', 
        marginTop: '10px',
        color: '#000'
      }}>
        The Pulse of India's Creator Economy
      </p>
    </div>

    <div style={{ 
      marginTop: '20px',
      borderTop: '1px solid #000', 
      paddingTop: '12px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center'
    }}>
       <Link to="/" style={{ textDecoration: 'none', color: '#000', fontSize: '12px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '5px' }}>
         <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} /> MAIN WEBSITE
       </Link>
       <div style={{ display: 'flex', gap: mob ? '10px' : '20px', fontSize: '11px', fontWeight: 800 }}>
         <span>PRIME</span><span>•</span><span>ELITE</span><span>•</span><span>BHARAT</span>
       </div>
       <div style={{ color: BRAND_ORANGE, fontWeight: 900, fontSize: '12px' }}>LIVE UPDATES</div>
    </div>
  </header>
);

NewspaperHeader.propTypes = { mob: PropTypes.bool.isRequired };

const blogShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  readTime: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired
});

const LeadStory = ({ blog }) => (
  <article style={{ marginBottom: '60px' }}>
    <Link to={`/blog/${blog.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ display: 'grid', gridTemplateColumns: globalThis.innerWidth < 1024 ? '1fr' : '1.3fr 0.7fr', gap: '40px', borderBottom: '1px solid #000', paddingBottom: '40px' }}>
        <div style={{ width: '100%', height: '500px', overflow: 'hidden', border: '1px solid #000' }}>
          <img src={blog.image} alt={blog.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Bdg color="orange" style={{ alignSelf: 'flex-start', marginBottom: '20px' }}>{blog.category}</Bdg>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 900, lineHeight: 1.05, marginBottom: '24px', color: '#000' }}>
            {blog.title}
          </h2>
          <p style={{ fontSize: '18px', color: '#4b5563', lineHeight: 1.6, marginBottom: '32px' }}>
            {blog.excerpt}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, border: `2px solid ${BRAND_ORANGE}` }}>
              {blog.author.avatar}
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800 }}>{blog.author.name}</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>{blog.readTime} Read • {blog.date}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </article>
);

LeadStory.propTypes = { blog: blogShape.isRequired };

const NewsletterBanner = () => (
  <section style={{ 
    background: BRAND_ORANGE, 
    padding: '60px 40px', 
    marginBottom: '60px', 
    textAlign: 'center',
    color: '#000',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Mail size={40} style={{ marginBottom: '20px' }} />
      <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '40px', fontWeight: 900, marginBottom: '15px' }}>The Bharat Intelligence</h3>
      <p style={{ fontSize: '18px', fontWeight: 700, marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
        Join 50,000+ creators and brand managers getting exclusive weekly data reports.
      </p>
      <div style={{ display: 'flex', gap: '10px', maxWidth: '500px', margin: '0 auto', flexDirection: globalThis.innerWidth < 600 ? 'column' : 'row' }}>
        <input 
          type="email" 
          placeholder="ENTER YOUR EMAIL" 
          style={{ flex: 1, padding: '15px 20px', border: '2px solid #000', background: '#fff', fontSize: '14px', fontWeight: 800, outline: 'none' }} 
        />
        <button style={{ background: '#000', color: '#fff', padding: '15px 30px', border: 'none', fontSize: '14px', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase' }}>
          Subscribe Now
        </button>
      </div>
    </div>
  </section>
);


const NewsCard = ({ blog, size = 'medium' }) => {
  const isSmall = size === 'small';
  return (
    <article style={{ height: '100%' }}>
      <Link to={`/blog/${blog.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <motion.div whileHover={{ y: -5 }} style={{ paddingBottom: '30px', borderBottom: '1px solid #f1f5f9', marginBottom: '30px', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {!isSmall && (
            <div style={{ width: '100%', height: '220px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '20px' }}>
              <img src={blog.image} alt={blog.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 900, color: BRAND_ORANGE, textTransform: 'uppercase' }}>{blog.category}</span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>{blog.readTime}</span>
            </div>
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: isSmall ? '18px' : '24px', fontWeight: 800, lineHeight: 1.2, marginBottom: '12px', color: '#000' }}>
              {blog.title}
            </h3>
            {!isSmall && (
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {blog.excerpt}
              </p>
            )}
          </div>
          <p style={{ marginTop: '15px', fontSize: '12px', fontWeight: 700, color: '#334155' }}>By {blog.author.name}</p>
        </motion.div>
      </Link>
    </article>
  );
};

NewsCard.propTypes = { blog: blogShape.isRequired, size: PropTypes.string };

const NavSearch = ({ categories, activeTab, setActiveTab, search, setSearch, mob }) => (
  <nav style={{ 
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mob ? '12px 20px' : '12px 0', borderBottom: '1px solid #000', marginBottom: '40px', flexDirection: mob ? 'column' : 'row', gap: '20px'
  }}>
    <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', width: mob ? '100%' : 'auto', scrollbarWidth: 'none' }}>
      {categories.map(cat => (
        <button key={cat} onClick={() => setActiveTab(cat)} style={{ background: 'none', border: 'none', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: activeTab === cat ? BRAND_ORANGE : '#000', cursor: 'pointer', whiteSpace: 'nowrap', padding: '5px 0' }}>
          {cat}
        </button>
      ))}
    </div>
    <div style={{ position: 'relative', width: mob ? '100%' : '300px' }}>
      <Search size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#000' }} />
      <input type="text" placeholder="SEARCH THE JOURNAL..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: '100%', padding: '10px 40px 10px 12px', border: '1px solid #000', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', outline: 'none' }} />
    </div>
  </nav>
);

NavSearch.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired, activeTab: PropTypes.string.isRequired, setActiveTab: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired, setSearch: PropTypes.func.isRequired, mob: PropTypes.bool.isRequired
};

const TrendingSidebar = ({ mob }) => (
  <aside>
    <div style={{ borderLeft: mob ? 'none' : '1px solid #000', paddingLeft: mob ? 0 : '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', borderBottom: '3px solid #000', paddingBottom: '10px' }}>
        <TrendingUp size={20} color={BRAND_ORANGE} />
        <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', fontWeight: 900 }}>Trending Now</h4>
      </div>
      {blogData.slice(0, 4).map((blog) => (
        <div key={blog.id} style={{ marginBottom: '24px', display: 'flex', gap: '15px' }}>
          <span style={{ fontSize: '32px', fontWeight: 900, color: '#e2e8f0', lineHeight: 1 }}>{blog.id < 10 ? `0${blog.id}` : blog.id}</span>
          <Link to={`/blog/${blog.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h5 style={{ fontSize: '15px', fontWeight: 800, lineHeight: 1.3, marginBottom: '5px', color: '#000' }}>{blog.title}</h5>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>By {blog.author.name}</span>
          </Link>
        </div>
      ))}
      <div style={{ background: '#000', padding: '30px', marginTop: '40px', color: '#fff' }}>
        <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', fontWeight: 900, marginBottom: '15px' }}>Elite Access</h4>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '20px' }}>Get deeper creator analytics and trend forecasting.</p>
        <Link to="/pricing" style={{ textDecoration: 'none' }}>
          <Btn full style={{ background: BRAND_ORANGE, color: '#000', borderRadius: 0, padding: '12px', fontWeight: 900 }}>UPGRADE NOW</Btn>
        </Link>
      </div>
    </div>
  </aside>
);
TrendingSidebar.propTypes = { mob: PropTypes.bool.isRequired };
const BlogContent = ({ activeTab, search, mob, featured, remaining, filtered }) => {
  if (activeTab === 'All' && !search) {
    return (
      <>
        {!mob && featured && <LeadStory blog={featured} />}
        <NewsletterBanner mob={mob} />
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 320px', gap: '60px' }}>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '40px' }}>
              {remaining.map(blog => <NewsCard key={blog.id} blog={blog} />)}
            </div>
          </div>
          <TrendingSidebar mob={mob} />
        </div>
      </>
    );
  }

  return (
    <div style={{ minHeight: '400px' }}>
      <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: 900, marginBottom: '40px' }}>
        {search ? `Search Results for "${search}"` : activeTab}
      </h2>
      {filtered.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '40px' }}>
          {filtered.map(blog => <NewsCard key={blog.id} blog={blog} />)}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 900 }}>No stories found</h3>
          <p style={{ color: '#64748b' }}>Try another category or search term.</p>
        </div>
      )}
    </div>
  );
};

BlogContent.propTypes = {
  activeTab: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  mob: PropTypes.bool.isRequired,
  featured: blogShape,
  remaining: PropTypes.arrayOf(blogShape),
  filtered: PropTypes.arrayOf(blogShape)
};

export default function BlogPage() {
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const featured = blogData.find(b => b.featured);
  const remaining = blogData.filter(b => !b.featured);
  const filtered = blogData.filter(b => (activeTab === 'All' || b.category === activeTab) && (b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase())));

  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: mob ? '20px 0 0 0' : '40px 0' }}>
      <Seo 
        title="The Bharat Journal | Creator Economy Intelligence"
        description="Deep dive into the rural creator economy, regional trends, and industry insights from Bharat Journal by CreatorBharat."
        keywords="creator economy india, bharat journal, regional marketing trends, influencer data india"
      />
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: mob ? '0' : '0 24px' }}>
        <NewspaperHeader mob={mob} />
        <NavSearch categories={categories} activeTab={activeTab} setActiveTab={setActiveTab} search={search} setSearch={setSearch} mob={mob} />
        
        <div style={{ padding: mob ? '0 20px' : 0 }}>
          <BlogContent 
            activeTab={activeTab} 
            search={search} 
            mob={mob} 
            featured={featured} 
            remaining={remaining} 
            filtered={filtered} 
          />
        </div>

        {/* Footer Ticker */}
        <section style={{ marginTop: '80px', borderTop: '4px double #000', padding: '20px 0', display: 'flex', alignItems: 'center', gap: '20px', overflow: 'hidden', background: '#fff' }}>
          <div style={{ background: '#000', color: '#fff', padding: '5px 15px', fontSize: '12px', fontWeight: 900, whiteSpace: 'nowrap', zIndex: 1, position: 'relative' }}>BHARAT TICKER</div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }} style={{ whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 700, color: '#000', display: 'inline-block' }}>
              • Creator Economy growth hits $5B • 60% of brand budgets shifting to regional content • Bhilwara becomes new hub for digital creators • Tier 3 growth at all-time high • New creator policy announced by CB •
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
