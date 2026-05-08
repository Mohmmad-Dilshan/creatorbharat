import React, { useState, useEffect } from 'react';
import { useApp } from '../../context';
import { T } from '../../theme';
import { W, scrollToTop, fmt } from '../../utils/helpers';
import { Btn, Bdg, Empty } from '../../components/Primitives';

export default function BlogArticlePage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [readPct, setReadPct] = useState(0);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    const scroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setReadPct((winScroll / height) * 100);
    };
    globalThis.addEventListener('scroll', scroll);
    return () => {
      globalThis.removeEventListener('resize', h);
      globalThis.removeEventListener('scroll', scroll);
    };
  }, []);

  const b = st.sel.article;
  const go = (p) => { dsp({ t: 'GO', p }); scrollToTop(); };

  if (!b) return (
    <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}>
       <Empty icon="📖" title="Article Not Found" sub="Humne is article ko archieve kar diya hai ya link badal gaya hai." ctaLabel="Back to Blog" onCta={() => go('blog')} />
    </div>
  );

  const mockContent = `
    <p>Bharat ki creator economy ab tezi se badh rahi hai. Tier 2 aur Tier 3 cities ke creators ab national brands ki pehli pasand ban rahe hain. Iska sabse bada kaaran hai unka 'Authenticity' aur local connect.</p>
    
    <h3 style="font-family: 'Outfit', sans-serif; font-size: 24px; margin: 32px 0 16px; font-weight: 900;">1. Local Language ka Power</h3>
    <p>Hindi, Tamil, Telugu, aur Marathi jaise languages mein content banane wale creators ki engagement rate metro creators se 3x zyada hoti hai. Brands ko pata hai ki asli Bharat inhi languages mein basta hai.</p>
    
    <h3 style="font-family: 'Outfit', sans-serif; font-size: 24px; margin: 32px 0 16px; font-weight: 900;">2. Trust and Relatability</h3>
    <p>Jab ek creator apne local context mein kisi product ko promote karta hai, toh audience ko wo 'apna' lagta hai. Ye trust hi brand deals ko success banata hai.</p>
    
    <blockquote style="border-left: 4px solid #FF9431; padding: 24px; background: #f9f9f9; font-style: italic; margin: 32px 0; font-size: 20px; color: #555;">
       "Future of influence is local. Metro markets are saturated, growth is coming from the heartlands."
    </blockquote>
    
    <h3 style="font-family: 'Outfit', sans-serif; font-size: 24px; margin: 32px 0 16px; font-weight: 900;">3. Professionalism is Key</h3>
    <p>Sirf video banana kaafi nahi hai. Ek professional portfolio, clear rates, aur timely delivery hi aapko ek professional creator banati hai. CreatorBharat inhi cheezon mein aapki help karta hai.</p>
  `;

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, height: 4, background: '#FF9431', width: readPct + '%', zIndex: 10000, transition: 'width .1s' }} />
      
      {/* Article Header */}
      <div style={{ background: '#050505', padding: mob ? '120px 20px 60px' : '160px 20px 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 70%, rgba(255,148,49,0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FF9431, #fff, #128807)' }} />
        
        <div style={W(800)}>
          <button onClick={() => go('blog')} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '10px 20px', borderRadius: 100, fontWeight: 700, cursor: 'pointer', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
             <span style={{ fontSize: 16 }}>←</span> Back to Hub
          </button>
          
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <Bdg color="yellow">{b.category || 'Creator Strategy'}</Bdg>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 600 }}>{fmt.date(b.date)} • {b.readTime || '6 min'} read</span>
          </div>
          
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 32 : 56, color: '#fff', fontWeight: 900, lineHeight: 1.1, marginBottom: 32, letterSpacing: '-0.02em' }}>{b.title}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: T.gd, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 18, border: '2px solid rgba(255,255,255,0.2)' }}>CB</div>
            <div>
              <p style={{ color: '#fff', fontSize: 16, fontWeight: 800 }}>CreatorBharat Editorial</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600 }}>Expert Analysis for Bharat's Talent</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: mob ? '40px 20px' : '80px 20px', background: '#fff' }}>
        <div style={W(800)}>
          {b.image && (
             <div className="au" style={{ borderRadius: 32, overflow: 'hidden', marginBottom: 56, boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}>
                <img src={b.image} style={{ width: '100%', display: 'block' }} alt={b.title} />
             </div>
          )}
          
          <article className="ai" style={{ fontSize: 20, color: '#333', lineHeight: 1.8, fontFamily: "'Inter', sans-serif" }}>
            <p style={{ marginBottom: 32, fontSize: 24, fontWeight: 700, color: '#111', lineHeight: 1.5, letterSpacing: '-0.01em' }}>{b.excerpt}</p>
            
            <div dangerouslySetInnerHTML={{ __html: b.content || mockContent }} />
          </article>

          {/* Author / Bio */}
          <div style={{ marginTop: 80, paddingTop: 48, borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
             <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#eee', flexShrink: 0 }}>
                <img src="https://ui-avatars.com/api/?name=Creator+Bharat&background=050505&color=fff" style={{ width: '100%', height: '100%', borderRadius: '50%' }} alt="" />
             </div>
             <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: 18, fontWeight: 900, color: '#111' }}>About CreatorBharat</h4>
                <p style={{ fontSize: 14, color: T.t3, marginTop: 4, lineHeight: 1.5 }}>Hum Bharat ke Tier 2 & 3 cities ke talent ko main-stream economy se jodne ka mission par hain. Humara focus authentic growth aur fair monetisation par hai.</p>
             </div>
          </div>

          {/* Next Steps Card */}
          <div style={{ marginTop: 80, padding: mob ? '40px 24px' : '60px 48px', background: 'linear-gradient(135deg, #111, #333)', borderRadius: 40, color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: T.gd, borderRadius: '50%', filter: 'blur(50px)', opacity: 0.3 }} />
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 900, marginBottom: 16 }}>Ready to be the next big star?</h3>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>Aapka professional creator profile sirf 2 minute door hai. Abhi register karein aur deals paana shuru karein.</p>
            <Btn lg onClick={() => go('apply')} style={{ borderRadius: 100, padding: '18px 60px', background: T.gd, color: '#fff', border: 'none', fontSize: 18 }}>Get Started for Free</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
