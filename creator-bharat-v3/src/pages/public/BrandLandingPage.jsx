import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { Btn, Bdg } from '@/components/common/Primitives';
import Seo from '@/components/common/SEO';

// Import Externalized Data
import {
  STATS,
  FEATURES,
  HOW_IT_WORKS,
  TESTIMONIALS,
  PLANS
} from '@/data/brandLandingData';

export default function BrandLandingPage() {
  const navigate = useNavigate();
  const [mob, setMob] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  return (
    <div style={{ background: '#fff', overflowX: 'hidden' }}>
      <Seo
        title="For Brands — Scale Campaign ROI"
        description="Scout verified regional creators, launch campaigns with escrow protection, and track ROI in real-time. Zero commission. Zero middlemen."
        keywords="influencer marketing india, brand campaigns, creator marketing, tier 2 creators, cb score"
      />

      {/* ── HERO ── */}
      <section style={{ background: '#050505', padding: mob ? '120px 20px 80px' : '180px 24px 120px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '50%', height: '60%', background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '50%', height: '60%', background: 'radial-gradient(circle, rgba(255,148,49,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #10B981, #fff, #FF9431)' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(16,185,129,0.1)', padding: '10px 20px', borderRadius: 100, marginBottom: 32, border: '1px solid rgba(16,185,129,0.2)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
            <span style={{ fontSize: 12, fontWeight: 900, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Brand Command Center</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ fontSize: mob ? '44px' : '88px', fontWeight: 950, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.05em', marginBottom: 32 }}>
            Scale with <br />
            <span style={{ background: 'linear-gradient(135deg, #10B981 0%, #fff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Bharat's Best.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ fontSize: mob ? '16px' : '20px', color: 'rgba(255,255,255,0.55)', maxWidth: 680, margin: '0 auto 48px', lineHeight: 1.6, fontWeight: 500 }}>
            Scout verified regional creators, launch campaigns with escrow protection, and track ROI in real-time. <span style={{ color: '#fff', fontWeight: 700 }}>Zero commission. Zero middlemen.</span>
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn lg onClick={() => navigate('/brand-register')} style={{ background: '#10B981', color: '#fff', borderRadius: 100, padding: '18px 40px', fontSize: 16, fontWeight: 950, boxShadow: '0 20px 40px rgba(16,185,129,0.25)' }}>
              Start Scouting Free <ArrowRight size={20} />
            </Btn>
            <Btn lg onClick={() => navigate('/creators')} style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', borderRadius: 100, padding: '18px 40px', fontSize: 16, fontWeight: 950, border: '1px solid rgba(255,255,255,0.12)' }}>
              Browse Creators
            </Btn>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 16, marginTop: 64, maxWidth: 800, margin: '64px auto 0' }}>
            {STATS.map(s => (
              <div key={s.l} style={{ background: 'rgba(255,255,255,0.04)', padding: '24px 16px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
                <div style={{ fontSize: mob ? '28px' : '36px', fontWeight: 950, color: '#10B981', letterSpacing: '-0.03em' }}>{s.v}</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: mob ? '80px 20px' : '120px 24px', background: '#fcfcfc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Bdg color="green" sm>HOW IT WORKS</Bdg>
            <h2 style={{ fontSize: mob ? '32px' : '52px', fontWeight: 950, color: '#0f172a', marginTop: 16, letterSpacing: '-0.04em' }}>
              From Scout to Scale <br /><span style={{ color: '#10B981' }}>in 3 Steps.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3,1fr)', gap: 32 }}>
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={step.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ padding: 40, background: '#fff', borderRadius: 40, border: '1px solid #f1f5f9', boxShadow: '0 20px 40px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -10, right: -10, fontSize: 80, fontWeight: 950, color: 'rgba(0,0,0,0.03)', lineHeight: 1 }}>{step.n}</div>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: '#10B98112', color: '#10B981', display: 'grid', placeItems: 'center', marginBottom: 24 }}>
                  <step.icon size={24} />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', marginBottom: 12 }}>{step.title}</h3>
                <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: mob ? '80px 20px' : '120px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Bdg color="saffron" sm>PLATFORM FEATURES</Bdg>
            <h2 style={{ fontSize: mob ? '32px' : '52px', fontWeight: 950, color: '#0f172a', marginTop: 16, letterSpacing: '-0.04em' }}>
              Everything You Need <br /><span style={{ color: '#FF9431' }}>to Win.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3,1fr)', gap: 24 }}>
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} style={{ padding: 32, background: '#f8fafc', borderRadius: 32, border: '1px solid #f1f5f9' }}>
                <div style={{ width: 48, height: 48, borderRadius: 16, background: f.color + '12', color: f.color, display: 'grid', placeItems: 'center', marginBottom: 20 }}>
                  <f.icon size={24} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: mob ? '80px 20px' : '120px 24px', background: '#fcfcfc' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Bdg color="green" sm>BRAND PRICING</Bdg>
            <h2 style={{ fontSize: mob ? '32px' : '52px', fontWeight: 950, color: '#0f172a', marginTop: 16, letterSpacing: '-0.04em' }}>Simple, Transparent Pricing.</h2>
            <p style={{ fontSize: 16, color: '#64748b', fontWeight: 500, marginTop: 12 }}>No hidden fees. No agency markups. 0% commission on all deals.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 32, alignItems: 'stretch' }}>
            {PLANS.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ padding: '48px 40px', background: plan.isPro ? '#0f172a' : '#fff', borderRadius: 40, border: plan.isPro ? '2px solid #10B981' : '1px solid #f1f5f9', boxShadow: plan.isPro ? '0 40px 80px rgba(16,185,129,0.15)' : '0 20px 40px rgba(0,0,0,0.02)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                {plan.isPro && <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, #10B981, #059669)', color: '#fff', padding: '8px 20px', borderRadius: 100, fontSize: 11, fontWeight: 950, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>MOST POPULAR</div>}
                <h3 style={{ fontSize: 24, fontWeight: 950, color: plan.isPro ? '#fff' : '#0f172a', marginBottom: 8 }}>{plan.name}</h3>
                <p style={{ fontSize: 14, color: plan.isPro ? 'rgba(255,255,255,0.5)' : '#64748b', fontWeight: 500, marginBottom: 24 }}>{plan.desc}</p>
                {plan.promo && <div style={{ padding: '10px 14px', background: 'rgba(16,185,129,0.1)', border: '1px dashed rgba(16,185,129,0.3)', borderRadius: 12, fontSize: 12, color: '#10B981', fontWeight: 800, marginBottom: 24 }}>{plan.promo}</div>}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 32 }}>
                  <span style={{ fontSize: 56, fontWeight: 950, color: plan.isPro ? '#10B981' : '#0f172a', letterSpacing: '-0.04em' }}>{plan.price}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: plan.isPro ? 'rgba(255,255,255,0.4)' : '#94a3b8' }}>/{plan.period}</span>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 22, height: 22, borderRadius: 8, background: plan.isPro ? 'rgba(16,185,129,0.15)' : '#10B98115', display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: 1 }}>
                        <CheckCircle2 size={13} color="#10B981" />
                      </div>
                      <span style={{ fontSize: 14, color: plan.isPro ? 'rgba(255,255,255,0.8)' : '#475569', fontWeight: 600, lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Btn full lg onClick={() => navigate('/brand-register')} style={{ borderRadius: 100, padding: '18px', background: plan.isPro ? '#10B981' : '#0f172a', color: '#fff', fontSize: 15, fontWeight: 950, boxShadow: plan.isPro ? '0 15px 30px rgba(16,185,129,0.3)' : 'none' }}>
                  {plan.cta} <ArrowRight size={18} />
                </Btn>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: mob ? '80px 20px' : '120px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Bdg color="saffron" sm>BRAND STORIES</Bdg>
            <h2 style={{ fontSize: mob ? '32px' : '52px', fontWeight: 950, color: '#0f172a', marginTop: 16, letterSpacing: '-0.04em' }}>Trusted by India's <span style={{ color: '#FF9431' }}>Top Brands.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3,1fr)', gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ padding: 32, background: '#f8fafc', borderRadius: 32, border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} color="#FF9431" fill="#FF9431" />)}
                </div>
                <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.7, fontWeight: 500, fontStyle: 'italic', marginBottom: 24 }}>"{t.quote}"</p>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: '#0f172a' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginTop: 2 }}>{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: mob ? '80px 20px' : '120px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div whileHover={{ y: -8 }} style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: mob ? 40 : 64, padding: mob ? '60px 28px' : '100px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.2)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 50%, rgba(16,185,129,0.1), transparent 60%)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: mob ? '36px' : '64px', fontWeight: 950, color: '#fff', marginBottom: 24, letterSpacing: '-0.04em' }}>
                Ready to Scale? <br /><span style={{ color: '#10B981' }}>Join 500+ Brands.</span>
              </h2>
              <p style={{ fontSize: mob ? '16px' : '20px', color: 'rgba(255,255,255,0.5)', maxWidth: 600, margin: '0 auto 48px', lineHeight: 1.6, fontWeight: 500 }}>
                Start free. No credit card required. Access Bharat's most verified creator network today.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Btn lg onClick={() => navigate('/brand-register')} style={{ background: '#10B981', color: '#fff', borderRadius: 100, padding: '20px 48px', fontSize: 17, fontWeight: 950, boxShadow: '0 20px 40px rgba(16,185,129,0.3)' }}>
                  Register Your Brand <ArrowRight size={20} />
                </Btn>
                <Btn lg onClick={() => navigate('/creators')} style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', borderRadius: 100, padding: '20px 48px', fontSize: 17, fontWeight: 950, border: '1px solid rgba(255,255,255,0.15)' }}>
                  Browse Creators
                </Btn>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
