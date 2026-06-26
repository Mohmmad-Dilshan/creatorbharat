import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  HelpCircle, 
  Plus, 
  Minus,
  Search,
  MessageSquare,
  ArrowRight,
  Users,
  Brain,
  Globe,
  CheckCircle,
  BarChart3,
  Briefcase,
  Megaphone
} from 'lucide-react';
import Seo from '@/components/common/SEO';
import { Btn, Bdg } from '@/components/common/Primitives';
import { usePlatformStats } from '@/hooks/usePlatformStats';
import { apiCall } from '@/utils/api';

// Import Externalized Data
import {
  AI_FAQS,
  OLD_WAY_POINTS,
  AI_WAY_POINTS,
  SCORE_DIMENSIONS,
  PLATFORM_COMPARISON_ROWS,
  SCORE_TIERS,
  PIPELINE_STEPS
} from '@/data/aiFaqData';

export default function AiFaqPage() {
  const [mob, setMob] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [search, setSearch] = useState('');
  const { analytics, loading: statsLoading } = usePlatformStats();

  useEffect(() => {
    const handleResize = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const [faqsList, setFaqsList] = useState(AI_FAQS);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    let active = true;
    apiCall('/pages/ai-faq')
      .then(res => {
        if (active && res && res.content && Array.isArray(res.content) && res.content.length > 0) {
          setFaqsList(res.content);
        }
      })
      .catch(err => console.error('Failed to load ai-faq config:', err));
    return () => { active = false; };
  }, []);

  // FAQ Filtering
  const filteredFaqs = useMemo(() => {
    return faqsList.filter(faq => 
      faq.q.toLowerCase().includes(search.toLowerCase()) || 
      faq.a.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, faqsList]);

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', color: '#475569', paddingBottom: 100, overflow: 'hidden', fontFamily: "'Outfit', sans-serif" }}>
      <Seo 
        title="AI Knowledge Hub & Simulator" 
        description="Explore CreatorBharat's AI scoring engine and matchmaking algorithms. Estimate your score and brand earnings with our real-time simulator."
        keywords="AI creator, creator score, matchmaker, creator earnings, brand ROI, influencer algorithms"
      />
      <style>{`
        .aifaq-landing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
          text-align: center;
        }
        @media (min-width: 1024px) {
          .aifaq-landing-grid {
            grid-template-columns: 1.15fr 0.85fr;
            text-align: left;
          }
        }
      `}</style>

      <section style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', padding: mob ? '90px 20px 60px' : '130px 24px 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.04), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #a855f7, #e2e8f0, #FF9431)' }} />
        
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div className="aifaq-landing-grid">
            {/* Left Side: Content & Action */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: mob ? 'center' : 'flex-start', width: '100%' }}>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(168, 85, 247, 0.08)', padding: '10px 20px', borderRadius: '100px', marginBottom: '28px', border: '1px solid rgba(168, 85, 247, 0.2)', color: '#0f172a' }}>
                <Brain size={14} color="#a855f7" />
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: "'Outfit', sans-serif" }}>AI Brain & Simulator Hub</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ fontSize: mob ? '36px' : '64px', fontWeight: 950, color: '#0f172a', marginBottom: '28px', letterSpacing: '-0.04em', lineHeight: 1.05, fontFamily: "'Outfit', sans-serif", textAlign: mob ? 'center' : 'left' }}>
                Verified Score. <br />
                <span style={{ background: 'linear-gradient(90deg, #a855f7, #FF9431)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Fair Matchmaking.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ fontSize: mob ? '14px' : '17px', color: '#475569', fontWeight: 650, marginBottom: '32px', maxWidth: '540px', lineHeight: 1.6, textAlign: mob ? 'center' : 'left' }}>
                Hamara AI engine aapke multi-platform content metrics aur engagement quality ko analyze karke transparent score generate karta hai. Isase premium brand collaborations simple ho jati hain.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ display: 'flex', gap: '12px', justifyContent: mob ? 'center' : 'flex-start', flexWrap: 'wrap' }}>
                <Btn primary onClick={() => {
                  const el = document.getElementById('scoring-engine');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Scoring Engine <ArrowRight size={16} style={{ marginLeft: 6 }} />
                </Btn>
                <Btn secondary onClick={() => {
                  const el = document.getElementById('ai-faq-accordion');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}>
                  View AI FAQs
                </Btn>
              </motion.div>
            </div>

            {/* Right Side: Canva Visual Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -6 }}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 24,
                padding: 12,
                boxShadow: '0 20px 40px rgba(168, 85, 247, 0.05)',
                position: 'relative',
                overflow: 'hidden',
                width: '100%'
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.05) 0%, transparent 60%)',
                pointerEvents: 'none'
              }} />
              <div style={{
                borderRadius: 16,
                overflow: 'hidden',
                position: 'relative',
                paddingTop: '75%', // 4:3 Aspect Ratio
                background: '#f8fafc'
              }}>
                <img
                  src="/faq_hero.png"
                  alt="AI Knowledge Hub & Matchmaker illustration"
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
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a855f7' }} className="animate-pulse" />
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CB Matchmaker V1.0</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981' }}>Secured Core Node</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats Strip */}
      <section style={{ padding: mob ? '0 16px 40px' : '0 24px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{
            display: 'grid',
            gridTemplateColumns: mob ? '1fr 1fr' : '1fr 1fr 1fr 1fr',
            gap: mob ? 12 : 20,
            background: 'linear-gradient(135deg, rgba(255,148,49,0.02) 0%, rgba(168,85,247,0.02) 100%)',
            border: '1px solid #e2e8f0',
            borderRadius: 24,
            padding: mob ? '20px 16px' : '28px 32px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.01)'
          }}
        >
          {[
            {
              icon: <Users size={18} color="#FF9431" />,
              label: 'Active Creators',
              value: statsLoading
                ? '...'
                : `${(1200 + (analytics?.totalCreators || 0)).toLocaleString('en-IN')}+`,
              sub: 'on platform'
            },
            {
              icon: <Briefcase size={18} color="#a855f7" />,
              label: 'Active Brands',
              value: statsLoading
                ? '...'
                : `${(45 + (analytics?.brandCount || 0))}+`,
              sub: 'onboarded'
            },
            {
              icon: <BarChart3 size={18} color="#10B981" />,
              label: 'Cities Covered',
              value: statsLoading
                ? '...'
                : `${(120 + (analytics?.cityCount || 0))}+`,
              sub: 'across India'
            },
            {
              icon: <Megaphone size={18} color="#FF9431" />,
              label: 'Active Campaigns',
              value: statsLoading
                ? '...'
                : `${(150 + (analytics?.totalCampaigns || 0))}+`,
              sub: 'live monthly'
            },
          ].map((stat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: mob ? 10 : 14 }}>
              <div style={{
                width: mob ? 36 : 44,
                height: mob ? 36 : 44,
                borderRadius: 12,
                background: '#ffffff',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
              }}>
                {stat.icon}
              </div>
              <div>
                <div style={{
                  fontSize: mob ? 18 : 22,
                  fontWeight: 950,
                  color: statsLoading ? '#94a3b8' : '#0f172a',
                  lineHeight: 1.1,
                  transition: 'color 0.3s'
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: mob ? 11 : 12, color: '#475569', fontWeight: 700, lineHeight: 1.3 }}>{stat.label}</div>
                <div style={{ fontSize: mob ? 10 : 11, color: '#64748b', fontWeight: 600 }}>{stat.sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* AI UNDERSTANDING SECTION */}
      <section style={{ maxWidth: 1200, margin: '0 auto 80px', padding: mob ? '0 16px' : '0 24px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: mob ? 40 : 60 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', padding: '8px 18px', borderRadius: 100, marginBottom: 20 }}
          >
            <Brain size={14} color="#a855f7" />
            <span style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2, color: '#a855f7' }}>AI Knowledge Base</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontSize: mob ? 28 : 48, fontWeight: 950, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}
          >
            CreatorBharat AI —<br />
            <span style={{ background: 'linear-gradient(90deg, #a855f7, #FF9431)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Samjho, Grow Karo
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{ fontSize: mob ? 14 : 17, color: '#475569', fontWeight: 600, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}
          >
            Chahe tum Instagram, YouTube, ya kisi bhi platform pe ho — yeh section tumhe batata hai ki CreatorBharat ka AI engine kaise tumhare liye kaam karta hai.
          </motion.p>
        </div>

        {/* BLOCK 1: Platform Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginBottom: mob ? 40 : 64 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 16 : 24 }}>
            {/* Pehle — Old Way */}
            <div style={{ background: '#fff8f8', border: '1px solid #fee2e2', borderRadius: 24, padding: mob ? 20 : 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ fontSize: 22 }}>😔</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 900, color: '#ef4444', textTransform: 'uppercase', letterSpacing: 1 }}>Other Platforms ka Tarika</div>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Instagram DMs, Cold Emails, Luck</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {OLD_WAY_POINTS.map((point, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(239,68,68,0.15)', display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: 1 }}>
                      <span style={{ fontSize: 10, color: '#ef4444', fontWeight: 900 }}>✕</span>
                    </div>
                    <span style={{ fontSize: 13, color: '#475569', lineHeight: 1.5, fontWeight: 650 }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ab — CreatorBharat AI */}
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 24, padding: mob ? 20 : 32, position: 'relative' }}>
              <div style={{ position: 'absolute', top: -1, left: '15%', right: '15%', height: 2, background: 'linear-gradient(90deg, transparent, #10B981, transparent)', borderRadius: 100 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ fontSize: 22 }}>🚀</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 900, color: '#10B981', textTransform: 'uppercase', letterSpacing: 1 }}>CreatorBharat AI ka Tarika</div>
                  <div style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Data-Driven, Fair, Transparent</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {AI_WAY_POINTS.map((point, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: 1 }}>
                      <CheckCircle size={11} color="#10B981" />
                    </div>
                    <span style={{ fontSize: 13, color: '#334155', lineHeight: 1.5, fontWeight: 650 }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* BLOCK 2: Creator Score Explained */}
        <motion.div
          id="scoring-engine"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginBottom: mob ? 40 : 64 }}
        >
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Bdg color="orange" sm>Creator Score Explained</Bdg>
            <h3 style={{ fontSize: mob ? 22 : 32, fontWeight: 950, color: '#0f172a', marginTop: 12, letterSpacing: '-0.02em' }}>
              Tumhara Score = Tumhari Actual Value
            </h3>
            <p style={{ fontSize: 13, color: '#475569', marginTop: 8, fontWeight: 650, maxWidth: 540, margin: '8px auto 0' }}>
              Yeh sirf followers count nahi hai. AI 4 real dimensions analyze karta hai.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : '1fr 1fr 1fr 1fr', gap: mob ? 12 : 20 }}>
            {SCORE_DIMENSIONS.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                style={{
                  background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20,
                  padding: mob ? '16px 14px' : '24px 20px',
                  display: 'flex', flexDirection: 'column', gap: 10,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: mob ? 24 : 28 }}>{item.icon}</span>
                  <span style={{
                    fontSize: mob ? 16 : 20, fontWeight: 950, color: item.color,
                    background: `${item.color}15`, padding: '2px 10px', borderRadius: 100
                  }}>{item.num}</span>
                </div>
                <div style={{ fontSize: mob ? 13 : 15, fontWeight: 900, color: '#0f172a' }}>{item.title}</div>
                <div style={{ fontSize: mob ? 11 : 12, color: '#475569', lineHeight: 1.5, fontWeight: 650 }}>{item.desc}</div>
                <div style={{
                  fontSize: 11, color: item.color, fontWeight: 750,
                  background: `${item.color}0d`, padding: '6px 10px', borderRadius: 8,
                  lineHeight: 1.4
                }}>{item.example}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* BLOCK 3: Platform Differentiation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginBottom: mob ? 40 : 64 }}
        >
          <div style={{
            background: 'linear-gradient(135deg, rgba(168,85,247,0.03), rgba(255,148,49,0.02))',
            border: '1px solid #e2e8f0', borderRadius: 28, padding: mob ? 20 : 40,
            position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.01)'
          }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, background: 'radial-gradient(circle, rgba(168,85,247,0.08), transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 24 : 40, alignItems: 'center' }}>
              <div>
                <Bdg color="purple" sm style={{ marginBottom: 16 }}>Agar tum Instagram/YouTube pe ho</Bdg>
                <h3 style={{ fontSize: mob ? 22 : 30, fontWeight: 950, color: '#0f172a', marginBottom: 16, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                  CreatorBharat alag kaise hai?
                </h3>
                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 20, fontWeight: 650 }}>
                  Instagram aur YouTube pe sirf content dikhta hai — <strong style={{ color: '#0f172a' }}>brands tumhe dhundh nahi sakte.</strong> CreatorBharat pe AI tumhara verified profile banata hai jise brands actively search karte hain.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {PLATFORM_COMPARISON_ROWS.map((row, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#ffffff', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.01)' }}>
                      <Globe size={14} color="#94a3b8" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: '#475569', lineHeight: 1.4, fontWeight: 650 }}>
                        <strong style={{ color: '#FF9431' }}>{row.platform}:</strong> {row.cb}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* CB = Layer on top of all platforms */}
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: 12, fontWeight: 900, color: '#a855f7', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>CreatorBharat = Layer on top</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                      { icon: '📸', label: 'Instagram Creator' },
                      { icon: '▶️', label: 'YouTube Creator' },
                      { icon: '🎵', label: 'Moj / Josh Creator' },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: 10, fontSize: 12, fontWeight: 700, color: '#475569', border: '1px solid #e2e8f0', flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span>{item.icon}</span> {item.label}
                        </div>
                        <ArrowRight size={14} color="#FF9431" />
                        <div style={{ padding: '8px 12px', background: 'rgba(255,148,49,0.08)', border: '1px solid rgba(255,148,49,0.2)', borderRadius: 10, fontSize: 12, fontWeight: 800, color: '#FF9431' }}>
                          CB Profile
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 14, padding: '10px 14px', background: 'linear-gradient(90deg, rgba(168,85,247,0.08), rgba(255,148,49,0.05))', borderRadius: 12, textAlign: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: '#0f172a' }}>→ AI Score + Brand Matching + Deals 💰</span>
                  </div>
                </div>

                <div style={{ padding: '14px 18px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 16, display: 'flex', gap: 10 }}>
                  <CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} />
                  <p style={{ margin: 0, fontSize: 12, color: '#334155', lineHeight: 1.5, fontWeight: 650 }}>
                    <strong style={{ color: '#10B981' }}>Join karo free mein.</strong> Apne existing platforms ko link karo. AI tumhara score calculate karega aur brands automatically discover karenge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BLOCK 4: Score Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <Bdg color="purple" sm>Score Tiers</Bdg>
            <h3 style={{ fontSize: mob ? 22 : 30, fontWeight: 950, color: '#0f172a', marginTop: 12, letterSpacing: '-0.02em' }}>
              Your Score = Your Tier
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : '1fr 1fr 1fr 1fr', gap: mob ? 10 : 16 }}>
            {SCORE_TIERS.map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                style={{
                  background: '#ffffff', border: `1.5px solid ${t.color}30`,
                  borderRadius: 20, padding: mob ? '16px 14px' : '24px 20px',
                  display: 'flex', flexDirection: 'column', gap: 10,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ fontSize: mob ? 28 : 32, marginBottom: 4 }}>{t.icon}</div>
                <div style={{ fontSize: mob ? 11 : 12, fontWeight: 900, color: t.color, textTransform: 'uppercase', letterSpacing: 1 }}>Score {t.score}</div>
                <div style={{ fontSize: mob ? 15 : 18, fontWeight: 950, color: '#0f172a' }}>{t.tier}</div>
                <div style={{ fontSize: 11, color: '#475569', fontWeight: 800, background: '#f1f5f9', padding: '4px 8px', borderRadius: 8, display: 'inline-block' }}>{t.what}</div>
                <div style={{ height: 1, background: '#f1f5f9', margin: '4px 0' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {t.perks.map((p, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: `${t.color}20`, display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: 1 }}>
                        <span style={{ fontSize: 8, color: t.color }}>✓</span>
                      </div>
                      <span style={{ fontSize: mob ? 10 : 11, color: '#475569', lineHeight: 1.4, fontWeight: 650 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* AI Matchmaker System Pipeline Visual */}
      <section style={{ maxWidth: 1200, margin: '80px auto 40px', padding: mob ? '0 16px' : '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Bdg color="orange" sm>THE ENGINE FLOW</Bdg>
          <h2 style={{ fontSize: mob ? '28px' : '40px', fontWeight: 950, color: '#0f172a', marginTop: 12, letterSpacing: '-0.5px' }}>
            Algorithmic Pipeline
          </h2>
          <p style={{ color: '#475569', fontSize: 14, marginTop: 4, fontWeight: 650 }}>How CreatorBharat processes your stats to match you with top Indian brands</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr 1fr 1fr', gap: 20 }}>
          {PIPELINE_STEPS.map((item) => (
            <motion.div 
              key={item.step}
              whileHover={{ y: -6, borderColor: '#a855f7' }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: 24, borderRadius: 20, transition: 'border-color 0.2s', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}
            >
              <div style={{ fontSize: 13, fontWeight: 950, color: '#a855f7', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>STEP {item.step}</span>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#a855f7' }} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, margin: 0, fontWeight: 650 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI FAQ Accordion */}
      <section id="ai-faq-accordion" style={{ maxWidth: 800, margin: '80px auto 0', padding: mob ? '0 16px' : '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Bdg color="purple" sm>FREQUENTLY ASKED QUESTIONS</Bdg>
          <h2 style={{ fontSize: mob ? '28px' : '40px', fontWeight: 950, color: '#0f172a', marginTop: 12, letterSpacing: '-0.5px' }}>
            Inside the AI Core
          </h2>
          <p style={{ color: '#475569', fontSize: 14, marginTop: 4, fontWeight: 650 }}>Questions about machine learning, verification, and score updates</p>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', marginBottom: 32 }}>
          <Search size={18} color="#71717a" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            placeholder="Search AI capabilities, scoring details, parameters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '16px 16px 16px 48px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 16, color: '#0f172a', outline: 'none', fontSize: 14, fontWeight: 650, boxSizing: 'border-box', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                style={{ 
                  background: '#ffffff', 
                  border: `1px solid ${isOpen ? '#a855f7' : '#e2e8f0'}`, 
                  borderRadius: 16, 
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{ width: '100%', padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', color: '#0f172a', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontSize: 15, fontWeight: 800, paddingRight: 12, lineHeight: 1.4 }}>{faq.q}</span>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: isOpen ? '#a855f715' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isOpen ? '#a855f7' : '#64748b', flexShrink: 0 }}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div style={{ padding: '0 20px 20px 20px', fontSize: 14, color: '#475569', lineHeight: 1.6, fontWeight: 600 }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 20px', border: '1.5px dashed #e2e8f0', borderRadius: 16, color: '#64748b' }}>
              <HelpCircle size={36} style={{ marginBottom: 12 }} />
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>No search results found</p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ maxWidth: 800, margin: '100px auto 0', padding: mob ? '0 16px' : '0 20px', textAlign: 'center' }}>
        <div style={{ background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)', border: '1px solid rgba(255,148,49,0.2)', borderRadius: 32, padding: mob ? '40px 20px' : '64px 40px', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px rgba(255,148,49,0.2)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15), transparent 70%)', pointerEvents: 'none' }} />
          <MessageSquare size={36} color="#ffffff" style={{ marginBottom: 20 }} />
          <h2 style={{ fontSize: mob ? 24 : 36, fontWeight: 950, color: '#ffffff', marginBottom: 16, letterSpacing: '-0.5px' }}>
            Build Your Algorithmic Profile
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, fontWeight: 650, maxWidth: 500, margin: '0 auto 32px' }}>
            Sign up now to lock in your score, link your socials, and get visible to 500+ premium Indian brands hiring creators today.
          </p>
          <Btn lg onClick={() => globalThis.location.href = '/apply'} style={{ padding: '16px 36px', borderRadius: 100, background: '#ffffff', color: '#EA580C', border: 'none', fontSize: 16, fontWeight: 950, boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
            Join Creator Ecosystem <ArrowRight size={18} style={{ marginLeft: 6 }} />
          </Btn>
        </div>
      </section>
    </div>
  );
}
