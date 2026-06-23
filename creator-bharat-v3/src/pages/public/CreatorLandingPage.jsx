import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { Btn, Bdg } from '@/components/common/Primitives';
import Seo from '@/components/common/SEO';

// Import Externalized Data
import {
  STATS,
  WHAT_YOU_GET,
  HOW_IT_WORKS,
  MILESTONES,
  UPCOMING_FEATURES,
  PLANS,
  TESTIMONIALS
} from '@/data/creatorLandingData';

export default function CreatorLandingPage() {
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
        title="For Creators — Build Your Legacy"
        description="India's first creator ecosystem for Tier 2 & 3 creators. Verified profiles, direct brand deals, zero commission, physical trophies, and monthly missions."
        keywords="creator platform india, influencer marketing, tier 2 creators, brand deals, creator monetization"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "CreatorBharat — For Creators",
          "description": "India's first creator ecosystem for Tier 2 & 3 creators with verified profiles, direct brand deals, and zero commission.",
          "url": "https://creatorbharat.com/creator-hub",
          "publisher": {
            "@type": "Organization",
            "name": "CreatorBharat",
            "url": "https://creatorbharat.com",
            "logo": "https://creatorbharat.com/android-chrome-512x512.png"
          },
          "offers": {
            "@type": "Offer",
            "name": "Creator Pro Membership",
            "description": "Verified profile, direct brand deals, zero commission on all earnings.",
            "priceCurrency": "INR",
            "price": "499",
            "availability": "https://schema.org/InStock",
            "url": "https://creatorbharat.com/pricing"
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://creatorbharat.com" },
              { "@type": "ListItem", "position": 2, "name": "Creator Hub", "item": "https://creatorbharat.com/creator-hub" }
            ]
          }
        }}
      />

      <style>{`
        .creator-landing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
          text-align: center;
        }
        @media (min-width: 1024px) {
          .creator-landing-grid {
            grid-template-columns: 1.15fr 0.85fr;
            text-align: left;
          }
        }
        .step-connect-arrow {
          display: none;
        }
        @media (min-width: 1024px) {
          .step-connect-arrow {
            display: block;
            position: absolute;
            top: 50%;
            right: -24px;
            transform: translateY(-50%);
            z-index: 10;
            color: #FF9431;
            opacity: 0.5;
          }
        }
        .milestone-trophy-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px rgba(255, 148, 49, 0.08) !important;
          border-color: rgba(255, 148, 49, 0.25) !important;
        }

        /* Hero Responsive Classes */
        .hero-section {
          padding: 80px 16px 60px !important;
        }
        @media (min-width: 768px) {
          .hero-section {
            padding: 100px 24px 80px !important;
          }
        }
        @media (min-width: 1024px) {
          .hero-section {
            padding: 130px 24px 100px !important;
          }
        }

        .hero-left-col {
          align-items: center !important;
        }
        @media (min-width: 1024px) {
          .hero-left-col {
            align-items: flex-start !important;
          }
        }

        .hero-title {
          font-size: 36px !important;
          line-height: 1.1 !important;
          text-align: center !important;
        }
        @media (min-width: 640px) {
          .hero-title {
            font-size: 48px !important;
          }
        }
        @media (min-width: 1024px) {
          .hero-title {
            font-size: 68px !important;
            text-align: left !important;
            line-height: 1.05 !important;
          }
        }

        .hero-desc {
          font-size: 15px !important;
          text-align: center !important;
          margin: 0 auto 32px !important;
        }
        @media (min-width: 768px) {
          .hero-desc {
            font-size: 17px !important;
          }
        }
        @media (min-width: 1024px) {
          .hero-desc {
            font-size: 18px !important;
            text-align: left !important;
            margin: 0 0 32px 0 !important;
          }
        }

        .hero-ctas {
          justify-content: center !important;
        }
        @media (min-width: 1024px) {
          .hero-ctas {
            justify-content: flex-start !important;
          }
        }

        .hero-stats-grid {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 12px !important;
          margin-top: 32px !important;
        }
        @media (min-width: 640px) {
          .hero-stats-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            margin-top: 48px !important;
          }
        }

        .hero-right-col {
          max-width: 480px !important;
          width: 100% !important;
          margin: 0 auto !important;
        }
        @media (min-width: 1024px) {
          .hero-right-col {
            max-width: none !important;
            margin: 0 !important;
          }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero-section" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', padding: mob ? '90px 20px 60px' : '130px 24px 100px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #e2e8f0' }}>
        {/* Full-bleed background creators image (low opacity) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/creator_landing_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
          zIndex: 0
        }} />
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '50%', height: '60%', background: 'radial-gradient(circle, rgba(255,148,49,0.05) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '50%', height: '60%', background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FF9431, #e2e8f0, #138808)', zIndex: 3 }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <div className="creator-landing-grid">
            {/* Left Column: Text & Actions */}
            <div className="hero-left-col" style={{ display: 'flex', flexDirection: 'column', alignItems: mob ? 'center' : 'flex-start' }}>
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,148,49,0.1)', padding: '10px 20px', borderRadius: 100, marginBottom: 32, border: '1px solid rgba(255,148,49,0.2)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF9431', boxShadow: '0 0 10px #FF9431' }} />
                <span style={{ fontSize: 12, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '0.2em' }}>India's Creator Ecosystem</span>
              </motion.div>

              <motion.h1 className="hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ fontSize: mob ? '40px' : '68px', fontWeight: 950, color: '#0f172a', lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 24, textAlign: mob ? 'center' : 'left' }}>
                Build Your <br />
                <span style={{ background: 'linear-gradient(135deg, #FF9431 0%, #0f172a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Creator Legacy.</span>
              </motion.h1>

              <motion.p className="hero-desc" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ fontSize: mob ? '15px' : '18px', color: '#475569', maxWidth: 600, margin: mob ? '0 auto 32px' : '0 0 32px 0', lineHeight: 1.6, fontWeight: 500, textAlign: mob ? 'center' : 'left' }}>
                Bharat ke har creator ke liye — Tier 2, Tier 3, ya metro. <span style={{ color: '#0f172a', fontWeight: 700 }}>Verified profile, direct brand deals, zero commission.</span> Apni pehchan banao.
              </motion.p>

              <motion.div className="hero-ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ display: 'flex', gap: 16, justifyContent: mob ? 'center' : 'flex-start', flexWrap: 'wrap', width: '100%' }}>
                <Btn lg onClick={() => navigate('/apply')} style={{ background: '#FF9431', color: '#fff', borderRadius: 100, padding: '16px 36px', fontSize: 15, fontWeight: 950, boxShadow: '0 20px 40px rgba(255,148,49,0.25)' }}>
                  Join Free — Start Today <ArrowRight size={18} />
                </Btn>
                <Btn lg onClick={() => navigate('/creators')} style={{ background: '#ffffff', color: '#475569', borderRadius: 100, padding: '16px 36px', fontSize: 15, fontWeight: 950, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  See Creator Profiles
                </Btn>
              </motion.div>

              {/* Stats */}
              <motion.div className="hero-stats-grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginTop: 48, width: '100%' }}>
                {STATS.map(s => (
                  <div key={s.l} style={{ background: '#ffffff', padding: '14px 10px', borderRadius: 16, border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize: mob ? '18px' : '24px', fontWeight: 950, color: '#FF9431', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.v}</div>
                    <div style={{ fontSize: 9, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 6 }}>{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column: Visual Poster Card */}
            <motion.div
              className="hero-right-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -6 }}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 28,
                padding: 12,
                boxShadow: '0 20px 40px rgba(255, 148, 49, 0.05)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 80% 20%, rgba(255, 148, 49, 0.05) 0%, transparent 60%)',
                pointerEvents: 'none'
              }} />
              <div style={{
                borderRadius: 20,
                overflow: 'hidden',
                position: 'relative',
                paddingTop: '75%', // 4:3 Aspect Ratio
                background: '#f8fafc'
              }}>
                <img
                  src="/creator_landing_hero.png"
                  alt="Creator Legacy"
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: 12, padding: '0 8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff9431' }} className="animate-pulse" />
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verified Node Feed</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981' }}>Live Sync</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: mob ? '80px 20px' : '120px 24px', background: '#fcfcfc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Bdg color="saffron" sm>HOW IT WORKS</Bdg>
            <h2 style={{ fontSize: mob ? '32px' : '52px', fontWeight: 950, color: '#0f172a', marginTop: 16, letterSpacing: '-0.04em' }}>
              3 Steps to Your <br /><span style={{ color: '#FF9431' }}>First Brand Deal.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3,1fr)', gap: 32 }}>
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={step.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ padding: 40, background: '#fff', borderRadius: 40, border: '1px solid #f1f5f9', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -10, right: -10, fontSize: 80, fontWeight: 950, color: 'rgba(0,0,0,0.03)', lineHeight: 1 }}>{step.n}</div>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: step.color + '12', color: step.color, display: 'grid', placeItems: 'center', marginBottom: 24 }}>
                  <step.icon size={24} />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', marginBottom: 12 }}>{step.title}</h3>
                <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{step.desc}</p>
                {i < 2 && (
                  <div className="step-connect-arrow">
                    <ArrowRight size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section style={{ padding: mob ? '80px 20px' : '120px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Bdg color="saffron" sm>PLATFORM BENEFITS</Bdg>
            <h2 style={{ fontSize: mob ? '32px' : '52px', fontWeight: 950, color: '#0f172a', marginTop: 16, letterSpacing: '-0.04em' }}>
              Everything You Get <br /><span style={{ color: '#FF9431' }}>as a Creator.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3,1fr)', gap: 24 }}>
            {WHAT_YOU_GET.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} style={{ padding: 32, background: '#f8fafc', borderRadius: 32, border: '1px solid #f1f5f9', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 20, right: 20 }}>
                  <span style={{ padding: '4px 10px', borderRadius: 100, fontSize: 10, fontWeight: 900, background: item.tag === 'PRO' ? '#FF943120' : '#10B98120', color: item.tag === 'PRO' ? '#FF9431' : '#10B981' }}>
                    {item.tag}
                  </span>
                </div>
                <div style={{ width: 48, height: 48, borderRadius: 16, background: item.color + '12', color: item.color, display: 'grid', placeItems: 'center', marginBottom: 20 }}>
                  <item.icon size={24} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLAY BUTTON MILESTONES ── */}
      <section style={{ padding: mob ? '80px 20px' : '120px 24px', background: '#fcfcfc', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,148,49,0.04), transparent 70%)' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Bdg color="saffron" sm>MILESTONE REWARDS</Bdg>
            <h2 style={{ fontSize: mob ? '32px' : '52px', fontWeight: 950, color: '#0f172a', marginTop: 16, letterSpacing: '-0.04em' }}>
              Earn Physical <span style={{ color: '#FF9431' }}>Play Buttons.</span>
            </h2>
            <p style={{ fontSize: 16, color: '#475569', marginTop: 12, fontWeight: 500 }}>
              Not just followers — your CB Score, brand deals, and platform activity all count.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {MILESTONES.map((m, i) => (
              <motion.div key={m.title} className="milestone-trophy-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ padding: mob ? '32px 20px' : '40px', background: '#ffffff', borderRadius: mob ? 24 : 40, border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 15px 40px rgba(0,0,0,0.02)', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <div style={{ fontSize: mob ? 48 : 56, marginBottom: 20 }}>{m.icon}</div>
                <h3 style={{ fontSize: mob ? 20 : 22, fontWeight: 950, color: '#0f172a', marginBottom: 12 }}>{m.title}</h3>
                <div style={{ padding: mob ? '10px 12px' : '12px 16px', background: `${m.color}15`, borderRadius: 16, border: `1px solid ${m.color}30`, marginBottom: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: m.color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>Requirements</div>
                  <div style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>{m.req}</div>
                </div>
                <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500, lineHeight: 1.5 }}>
                  <span style={{ color: m.color, fontWeight: 800 }}>Reward: </span>{m.reward}
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <p style={{ fontSize: 14, color: '#64748b', fontWeight: 600 }}>
              CB Score = Followers (25pts) + Engagement Rate (25pts) + Brand Deals (25pts) + Platform Activity (25pts)
            </p>
          </div>
        </div>
      </section>

      {/* ── UPCOMING FEATURES ── */}
      <section style={{ padding: mob ? '80px 20px' : '120px 24px', background: '#fcfcfc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Bdg color="blue" sm>COMING SOON</Bdg>
            <h2 style={{ fontSize: mob ? '32px' : '52px', fontWeight: 950, color: '#0f172a', marginTop: 16, letterSpacing: '-0.04em' }}>
              What's <span style={{ color: '#3B82F6' }}>Coming Next.</span>
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', marginTop: 12, fontWeight: 500 }}>
              We're building the future of creator economy. Here's what's on the roadmap.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3,1fr)', gap: 20 }}>
            {UPCOMING_FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} style={{ padding: 28, background: '#fff', borderRadius: 28, border: '1px solid #f1f5f9', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: '#3B82F612', color: '#3B82F6', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <f.icon size={22} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 900, color: '#0f172a', margin: 0 }}>{f.title}</h4>
                    <span style={{ fontSize: 10, fontWeight: 900, color: '#3B82F6', background: '#3B82F612', padding: '2px 8px', borderRadius: 100 }}>{f.eta}</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500, lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: mob ? '80px 20px' : '120px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Bdg color="saffron" sm>CREATOR PLANS</Bdg>
            <h2 style={{ fontSize: mob ? '32px' : '52px', fontWeight: 950, color: '#0f172a', marginTop: 16, letterSpacing: '-0.04em' }}>Simple Pricing.</h2>
            <p style={{ fontSize: 16, color: '#64748b', fontWeight: 500, marginTop: 12 }}>Start free. Upgrade when you're ready to scale.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 32, alignItems: 'stretch' }}>
            {PLANS.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ padding: '48px 40px', background: plan.isPro ? '#0f172a' : '#fff', borderRadius: 40, border: plan.isPro ? '2px solid #FF9431' : '1px solid #f1f5f9', boxShadow: plan.isPro ? '0 40px 80px rgba(255,148,49,0.15)' : '0 20px 40px rgba(0,0,0,0.02)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                {plan.isPro && <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, #FF9431, #EA580C)', color: '#fff', padding: '8px 20px', borderRadius: 100, fontSize: 11, fontWeight: 950, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>ELITE SELECTION</div>}
                <h3 style={{ fontSize: 24, fontWeight: 950, color: plan.isPro ? '#fff' : '#0f172a', marginBottom: 8 }}>{plan.name}</h3>
                <p style={{ fontSize: 14, color: plan.isPro ? 'rgba(255,255,255,0.5)' : '#64748b', fontWeight: 500, marginBottom: 24 }}>{plan.desc}</p>
                {plan.promo && <div style={{ padding: '10px 14px', background: 'rgba(16,185,129,0.1)', border: '1px dashed rgba(16,185,129,0.3)', borderRadius: 12, fontSize: 12, color: '#10B981', fontWeight: 800, marginBottom: 24 }}>{plan.promo}</div>}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 32 }}>
                  <span style={{ fontSize: 56, fontWeight: 950, color: plan.isPro ? '#FF9431' : '#0f172a', letterSpacing: '-0.04em' }}>{plan.price}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: plan.isPro ? 'rgba(255,255,255,0.4)' : '#94a3b8' }}>/{plan.period}</span>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 22, height: 22, borderRadius: 8, background: plan.isPro ? '#FF943120' : '#10B98115', display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: 1 }}>
                        <CheckCircle2 size={13} color={plan.isPro ? '#FF9431' : '#10B981'} />
                      </div>
                      <span style={{ fontSize: 14, color: plan.isPro ? 'rgba(255,255,255,0.8)' : '#475569', fontWeight: 600, lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Btn full lg onClick={() => navigate('/apply')} style={{ borderRadius: 100, padding: '18px', background: plan.isPro ? '#FF9431' : '#0f172a', color: '#fff', fontSize: 15, fontWeight: 950, boxShadow: plan.isPro ? '0 15px 30px rgba(255,148,49,0.3)' : 'none' }}>
                  {plan.cta} <ArrowRight size={18} />
                </Btn>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREATOR UNION SECTION ── */}
      <section style={{ padding: mob ? '80px 20px' : '120px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Bdg color="saffron" sm>CREATOR UNION</Bdg>
              <h2 style={{ fontSize: mob ? '32px' : '48px', fontWeight: 950, color: '#0f172a', marginTop: 16, marginBottom: 20, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Akele Nahi Ladna.<br /><span style={{ color: '#FF9431' }}>Hum Saath Hain.</span>
              </h2>
              <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7, fontWeight: 500, marginBottom: 28 }}>
                Jab kisi creator ka Instagram ya YouTube account galat se suspend hota hai, toh akele complaint karne par koi nahi sunta. <strong style={{ color: '#0f172a' }}>CreatorBharat Creator Union</strong> aapke liye collective appeal file karta hai — hazaaron verified creators ki awaaz ek saath.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { icon: '🚨', title: 'Crisis Alert System', desc: 'Account suspend hote hi nearby creators ko instant alert — coordinated support campaign shuru.' },
                  { icon: '📋', title: 'Collective Appeals', desc: 'CreatorBharat institutionally Meta/YouTube ko appeal karta hai hazaaron verified accounts ki taraf se.' },
                  { icon: '⚖️', title: 'Legal Advocacy', desc: 'Brand ne payment nahi kiya? Platform ne unfair treatment kiya? Hum aapki taraf khade hain.' },
                ].map(item => (
                  <div key={item.title} style={{ display: 'flex', gap: 14, padding: '16px 20px', background: '#FFF7ED', borderRadius: 18, border: '1px solid #FED7AA' }}>
                    <span style={{ fontSize: 22 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 900, color: '#0f172a', marginBottom: 2 }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: 48, padding: 48, color: '#fff', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: 'rgba(255,148,49,0.1)', borderRadius: '50%', filter: 'blur(40px)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>🛡️</div>
                <h3 style={{ fontSize: 26, fontWeight: 950, marginBottom: 16, letterSpacing: '-0.02em' }}>Creator Collective Charter</h3>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 28 }}>
                  "Bharat ke har creator ko ye haq hai ki uska kaam, pehchan, aur income safe rahe. CreatorBharat is charter ke tehat har verified creator ki safeguard karta hai."
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['Zero tolerance for unfair account suspension', 'Transparent brand deal escrow protection', 'Collective bargaining rights for creator payments', 'Free legal consultation for verified creators'].map(r => (
                    <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={16} color="#10B981" />
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BHARAT CREATOR CARD ── */}
      <section style={{ padding: mob ? '80px 20px' : '120px 24px', background: '#ffffff', position: 'relative', overflow: 'hidden', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 50%, rgba(255,148,49,0.04), transparent 60%)' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 64, alignItems: 'center' }}>
            {/* Card Preview */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: 32, padding: 40, border: '2px solid rgba(255,148,49,0.3)', boxShadow: '0 40px 80px rgba(0,0,0,0.4)', maxWidth: 360, margin: '0 auto' }}>
                <div style={{ height: 4, background: 'linear-gradient(90deg, #FF9431 33%, #fff 33%, #fff 66%, #138808 66%)', borderRadius: 100, marginBottom: 32 }} />
                <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24 }}>
                  <div style={{ width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg, #FF9431, #EA580C)', display: 'grid', placeItems: 'center', fontSize: 28, fontWeight: 950, color: '#fff' }}>R</div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 900, color: '#FF9431', letterSpacing: '2px', marginBottom: 4 }}>CREATORBHARAT VERIFIED</div>
                    <div style={{ fontSize: 20, fontWeight: 950, color: '#fff' }}>Rahul Sharma</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>@rahul_creates</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
                  {[{l:'City',v:'Jaipur'},{l:'Niche',v:'Fitness'},{l:'Score',v:'92'}].map(s => (
                    <div key={s.l} style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 12px', borderRadius: 14, textAlign: 'center' }}>
                      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>{s.l}</div>
                      <div style={{ fontSize: 14, fontWeight: 950, color: '#fff' }}>{s.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>Profile URL</div>
                    <div style={{ fontSize: 11, color: '#FF9431', fontWeight: 700 }}>creatorbharat.com/rahul</div>
                  </div>
                  <div style={{ width: 52, height: 52, background: '#fff', borderRadius: 14, display: 'grid', placeItems: 'center', fontSize: 24 }}>📱</div>
                </div>
              </div>
            </motion.div>
            {/* Text */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Bdg color="saffron" sm>BHARAT CREATOR CARD</Bdg>
              <h2 style={{ fontSize: mob ? '32px' : '48px', fontWeight: 950, color: '#0f172a', marginTop: 16, marginBottom: 20, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Apni Digital <span style={{ color: '#FF9431' }}>Pehchan.</span>
              </h2>
              <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, fontWeight: 500, marginBottom: 32 }}>
                Har verified creator ko milta hai ek downloadable <strong style={{ color: '#0f172a' }}>Bharat Creator Card</strong> — Aadhaar jaisi pehchan, lekin creators ke liye. QR scan karo, live media kit khulega. Local shops se deals close karna ab aur bhi aasaan.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Download to phone wallet or print anytime', 'QR code opens your live verified profile', 'Share in Instagram bio or WhatsApp status', 'Instant credibility with local brands & shops'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <CheckCircle2 size={16} color="#FF9431" />
                    <span style={{ fontSize: 14, color: '#475569', fontWeight: 600 }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── GTM ROADMAP ── */}
      <section style={{ padding: mob ? '80px 20px' : '120px 24px', background: '#fcfcfc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Bdg color="green" sm>OUR JOURNEY</Bdg>
            <h2 style={{ fontSize: mob ? '32px' : '52px', fontWeight: 950, color: '#0f172a', marginTop: 16, letterSpacing: '-0.04em' }}>
              Bhilwara se <span style={{ color: '#138808' }}>Bharat Tak.</span>
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', marginTop: 12, fontWeight: 500 }}>Ground zero se national scale — ye hai CreatorBharat ka safar.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3,1fr)', gap: 24 }}>
            {[
              { phase: 'Phase 1', title: 'Rajasthan Launch', timeline: 'Jan - Mar 2026', desc: 'Bhilwara, Jaipur, Udaipur ke creators ke saath shuruwaat. 150+ creators manually mapped. City interns hired from MDS University, BITS Pilani.', icon: '🌱', color: '#10B981', done: true },
              { phase: 'Phase 2', title: 'Tier-2 India Belt', timeline: 'Apr - Jun 2026', desc: 'UP, MP, Gujarat, Bihar ke Tier-2 cities mein expansion. College Ambassador Program launch. 2,400+ creators onboarded.', icon: '🚀', color: '#FF9431', done: true },
              { phase: 'Phase 3', title: 'National Scale', timeline: 'Jul 2026 onwards', desc: 'Pan-India presence. 50,000+ verified creators. Summit events every quarter. Creator Union formally registered. International brand partnerships.', icon: '🇮🇳', color: '#7C3AED', done: false },
            ].map((step, i) => (
              <motion.div key={step.phase} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ padding: 36, background: step.done ? '#fff' : 'rgba(124,58,237,0.03)', borderRadius: 32, border: `1.5px solid ${step.done ? '#f1f5f9' : '#7C3AED30'}`, position: 'relative', overflow: 'hidden' }}>
                {step.done && <div style={{ position: 'absolute', top: 20, right: 20 }}><Bdg sm color="green">Completed</Bdg></div>}
                <div style={{ fontSize: 40, marginBottom: 16 }}>{step.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 900, color: step.color, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 6 }}>{step.phase} · {step.timeline}</div>
                <h3 style={{ fontSize: 20, fontWeight: 950, color: '#0f172a', marginBottom: 12 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Campus Ambassador */}
          <div style={{ marginTop: 40, padding: mob ? '28px' : '40px', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', borderRadius: 32, display: 'flex', flexDirection: mob ? 'column' : 'row', alignItems: 'center', gap: 32, justifyContent: 'space-between', border: '1px solid #e2e8f0', boxShadow: '0 30px 60px rgba(0,0,0,0.03)' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 8 }}>BECOME A CAMPUS AMBASSADOR</div>
              <h3 style={{ fontSize: mob ? '20px' : '28px', fontWeight: 950, color: '#0f172a', marginBottom: 10 }}>Apne College mein CreatorBharat launch karo</h3>
              <p style={{ fontSize: 14, color: '#475569', fontWeight: 500, maxWidth: 500 }}>Commission-based + Certificate. Creators ko onboard karo, referral earn karo. MDS, BITS Pilani, IIS Jaipur — already active hubs.</p>
            </div>
            <Btn lg onClick={() => navigate('/apply')} style={{ background: '#FF9431', color: '#fff', borderRadius: 100, padding: '18px 36px', fontWeight: 950, flexShrink: 0, whiteSpace: 'nowrap' }}>
              Apply as Ambassador <ArrowRight size={18} />
            </Btn>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: mob ? '80px 20px' : '120px 24px', background: '#fcfcfc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Bdg color="saffron" sm>CREATOR STORIES</Bdg>
            <h2 style={{ fontSize: mob ? '32px' : '52px', fontWeight: 950, color: '#0f172a', marginTop: 16, letterSpacing: '-0.04em' }}>Real Creators. <span style={{ color: '#FF9431' }}>Real Results.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3,1fr)', gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ padding: 32, background: '#fff', borderRadius: 32, border: '1px solid #f1f5f9' }}>
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
          <motion.div whileHover={{ y: -8 }} style={{ background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)', borderRadius: mob ? 40 : 64, padding: mob ? '60px 28px' : '100px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 40px 100px rgba(255,148,49,0.25)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15), transparent 60%)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: mob ? '36px' : '64px', fontWeight: 950, color: '#fff', marginBottom: 24, letterSpacing: '-0.04em' }}>
                Bharat Ka Creator <br />Kahin Bhi Jayega. 🇮🇳
              </h2>
              <p style={{ fontSize: mob ? '16px' : '20px', color: 'rgba(255,255,255,0.8)', maxWidth: 600, margin: '0 auto 48px', lineHeight: 1.6, fontWeight: 500 }}>
                Bhilwara se Bangalore tak — har creator ki pehchan honi chahiye. Join karo aur apni legacy banao.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Btn lg onClick={() => navigate('/apply')} style={{ background: '#fff', color: '#EA580C', borderRadius: 100, padding: '20px 48px', fontSize: 17, fontWeight: 950, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
                  Join Free Now <ArrowRight size={20} />
                </Btn>
                <Btn lg onClick={() => navigate('/pricing')} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 100, padding: '20px 48px', fontSize: 17, fontWeight: 950, border: '1px solid rgba(255,255,255,0.3)' }}>
                  View Pro Plans
                </Btn>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
