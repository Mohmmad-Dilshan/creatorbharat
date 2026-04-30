import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, apiCall, fmt } from '../theme';
import { SH, Bdg, SkeletonCard, Empty } from '../components/Primitives';
import { BlogCard } from '../components/Cards';

export default function BlogPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    setLoading(true);
    apiCall('/blog').then(d => {
      setBlogs(d || []);
      setLoading(false);
    }).catch(() => setLoading(false));
    return () => window.removeEventListener('resize', h);
  }, []);

  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };

  const categories = ['All', ...new Set(blogs.map(b => b.category).filter(Boolean))];
  const [cat, setCat] = useState('All');
  const filtered = cat === 'All' ? blogs : blogs.filter(b => b.category === cat);

  return (
    <div style={{ background: '#fff' }}>
      <div style={{ background: T.n8, padding: mob ? '48px 20px' : '80px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(255,148,49,0.08) 0%, transparent 50%)' }} />
        <div style={W()}>
          <SH eyebrow="Resources" title="Creator Insights" sub="Guides, trends, and success stories from Bharat's creator economy." light mb={40} />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{ padding: '10px 20px', borderRadius: 30, border: '1.5px solid ' + (cat === c ? '#FF9431' : 'rgba(255,255,255,0.1)'), background: cat === c ? '#FF9431' : 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all .3s' }}>{c}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: mob ? '32px 20px' : '64px 20px', background: T.bg2, minHeight: '60vh' }}>
        <div style={W()}>
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill,minmax(340px,1fr))', gap: 24 }}>
              {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <Empty icon="📝" title="No articles found" sub="Check back later for new content." />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill,minmax(340px,1fr))', gap: 32 }}>
              {filtered.map(b => <BlogCard key={b.id} article={b} onClick={() => go('blog-article', { article: b })} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
