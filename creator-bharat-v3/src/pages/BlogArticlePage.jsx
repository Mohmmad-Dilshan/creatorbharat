import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, fmt } from '../theme';
import { Btn, PL, Bdg, SH } from '../components/Primitives';

export default function BlogArticlePage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [readPct, setReadPct] = useState(0);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    const scroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setReadPct((winScroll / height) * 100);
    };
    window.addEventListener('scroll', scroll);
    return () => {
      window.removeEventListener('resize', h);
      window.removeEventListener('scroll', scroll);
    };
  }, []);

  const b = st.sel.article;
  const go = (p) => { dsp({ t: 'GO', p }); scrollToTop(); };

  if (!b) return <div style={{ ...W(), padding: '80px 20px', textAlign: 'center' }}><SH title="Article not found" mb={20} /><Btn onClick={() => go('blog')}>Back to Blog</Btn></div>;

  return (
    <div style={{ background: '#fff' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, height: 4, background: '#FF9431', width: readPct + '%', zIndex: 10000, transition: 'width .1s' }} />
      
      <div style={{ background: T.n9, padding: mob ? '48px 20px' : '80px 20px', position: 'relative' }}>
        <div style={W(800)}>
          <button onClick={() => go('blog')} style={{ background: 'none', border: 'none', color: '#FF9431', fontWeight: 800, cursor: 'pointer', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>← Back to Blog</button>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <Bdg color="orange">{b.category || 'Creator Guide'}</Bdg>
            <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 13 }}>{fmt.date(b.date)} • {b.readTime || '5 min'} read</span>
          </div>
          <h1 style={{ fontSize: mob ? 28 : 44, color: '#fff', fontWeight: 900, lineHeight: 1.2, marginBottom: 24 }}>{b.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: T.gd, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>CB</div>
            <div>
              <p style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>CreatorBharat Editorial</p>
              <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 12 }}>Expert Insights for Bharat's Creators</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: mob ? '32px 20px' : '64px 20px' }}>
        <div style={W(800)}>
          {b.image && <img src={b.image} style={{ width: '100%', borderRadius: 24, marginBottom: 40, boxShadow: '0 20px 50px rgba(0,0,0,.1)' }} alt={b.title} />}
          <div className="blog-content" style={{ fontSize: 18, color: T.t1, lineHeight: 1.8 }}>
            <p style={{ marginBottom: 24, fontSize: 20, fontWeight: 500, color: T.n8 }}>{b.excerpt}</p>
            <div dangerouslySetInnerHTML={{ __html: b.content }} />
            {!b.content && <p>Content coming soon...</p>}
          </div>

          <div style={{ marginTop: 60, padding: '40px', background: T.bg2, borderRadius: 24, border: '1px solid ' + T.bd, textAlign: 'center' }}>
            <h3 style={{ fontSize: 22, fontWeight: 900, color: T.n8, marginBottom: 12 }}>Join the Creator Revolution</h3>
            <p style={{ fontSize: 16, color: T.t2, marginBottom: 24 }}>Get listed among Bharat's top creators and start receiving brand deals today.</p>
            <Btn lg onClick={() => go('apply')}>Build My Portfolio Free</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
