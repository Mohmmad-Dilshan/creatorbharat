import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, LS } from '../utils/helpers';
import { apiCall } from '../utils/api';
import { SH as Sh, SkeletonCard, Empty, Btn } from '../components/Primitives';
import { BlogCard } from '../components/Cards';

export default function BlogPage() {
  const { dsp } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [cat, setCat] = useState('All');

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    setLoading(true);
    apiCall('/blog').then(d => {
      setBlogs(d || []);
      setLoading(false);
    }).catch(() => {
       // Fallback to seed data
       const seed = LS.get('cb_blogs', [
         { id: 1, title: 'How to Monetize Your Local Audience', category: 'Guides', date: '2026-04-15', readTime: '5 min', excerpt: 'Discover the secrets of working with hyper-local brands in Tier 2 cities.', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800' },
         { id: 2, title: 'Top 10 Creators in Rajasthan for 2026', category: 'Trends', date: '2026-04-10', readTime: '8 min', excerpt: 'Our curated list of the most influential voices from the Pink City and beyond.', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800' },
         { id: 3, title: 'Understanding Brand Deals in Hindi', category: 'Industry', date: '2026-04-05', readTime: '6 min', excerpt: 'Negotiating contracts can be tricky. Here is what you need to know.', image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800' }
       ]);
       setBlogs(seed);
       setLoading(false);
    });
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };

  const categories = ['All', ...new Set(blogs.map(b => b.category).filter(Boolean))];
  const filtered = cat === 'All' ? blogs : blogs.filter(b => b.category === cat);

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Premium Header */}
      <div style={{ background: '#050505', padding: mob ? '120px 20px 60px' : '160px 20px 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(255,148,49,0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FF9431, #fff, #128807)' }} />
        
        <div style={W()}>
          <div style={{ maxWidth: 800 }}>
             <Sh eyebrow="Education & Insights" title="Creator Knowledge Hub" sub="Expert guides and deep dives into the Indian creator economy." light mb={48} />
             
             <div className="au d2" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {categories.map(c => (
                  <button 
                    key={c} 
                    onClick={() => setCat(c)} 
                    style={{ padding: '12px 28px', borderRadius: 100, border: '1.5px solid ' + (cat === c ? '#FF9431' : 'rgba(255,255,255,0.1)'), background: cat === c ? '#FF9431' : 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s' }}
                  >
                    {c.toUpperCase()}
                  </button>
                ))}
             </div>
          </div>
        </div>
      </div>

      <div style={{ padding: mob ? '40px 20px' : '80px 20px', background: '#FAFAFA' }}>
        <div style={W()}>
          {loading && (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))', gap: 32 }}>
               {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
            </div>
          )}
          
          {!loading && filtered.length === 0 && (
            <Empty icon="📝" title="No articles found" sub="Check back later for new content." />
          )}
          
          {!loading && filtered.length > 0 && (
            <div className="au" style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))', gap: 40 }}>
              {filtered.map((b, i) => (
                 <div key={b.id} className={`au d${(i % 5) + 1}`}>
                    <BlogCard article={b} onClick={() => go('blog-article', { article: b })} />
                 </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Featured Newsletter */}
      <div style={{ padding: '100px 20px', background: '#fff', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
         <div style={W(800)}>
            <div style={{ textAlign: 'center', background: T.bg2, borderRadius: 48, padding: mob ? '48px 24px' : '80px 60px', border: '1px solid rgba(0,0,0,0.03)' }}>
               <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 900, color: '#111', marginBottom: 16 }}>Stay Ahead of the Curve</h2>
               <p style={{ fontSize: 16, color: T.t3, marginBottom: 32, fontWeight: 600 }}>Get the weekly "Bharat Creator" report directly in your inbox.</p>
               <div style={{ display: 'flex', gap: 12, maxWidth: 480, margin: '0 auto', flexDirection: mob ? 'column' : 'row' }}>
                  <input placeholder="Enter your email" style={{ flex: 1, padding: '18px 24px', borderRadius: 100, border: '1px solid rgba(0,0,0,0.1)', outline: 'none', fontSize: 16 }} />
                  <Btn lg style={{ borderRadius: 100, padding: '0 40px' }}>Subscribe Now</Btn>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
