import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Cpu, 
  HelpCircle, 
  Plus, 
  Minus,
  Search,
  MessageSquare,
  ArrowRight,
  Zap,
  BarChart2,
  Star,
  Users,
  Target,
  TrendingUp,
  Shield,
  Activity,
  ChevronDown,
  Award,
  Brain,
  Globe,
  CheckCircle
} from 'lucide-react';
import Seo from '@/components/common/SEO';
import { Btn, Card, Bdg } from '@/components/common/Primitives';
import { usePlatformStats } from '@/hooks/usePlatformStats';

// Niche multipliers — different niches have different brand demand
const NICHE_CONFIG = {
  'Finance':   { mult: 1.35, avg_er: 5.2, demand: 'Very High' },
  'Tech':      { mult: 1.28, avg_er: 4.8, demand: 'High' },
  'Fitness':   { mult: 1.22, avg_er: 7.1, demand: 'High' },
  'Beauty':    { mult: 1.18, avg_er: 6.4, demand: 'High' },
  'Lifestyle': { mult: 1.10, avg_er: 5.9, demand: 'Medium' },
  'Travel':    { mult: 1.08, avg_er: 6.8, demand: 'Medium' },
  'Gaming':    { mult: 1.15, avg_er: 9.2, demand: 'High' },
  'Food':      { mult: 1.05, avg_er: 8.3, demand: 'Medium' },
  'Education': { mult: 1.20, avg_er: 4.5, demand: 'High' },
  'Comedy':    { mult: 0.95, avg_er: 10.1, demand: 'Medium' },
};

// Platform avg benchmarks for comparison bar
const PLATFORM_BENCHMARKS = {
  score: 54,
  engagement: 4.2,
  authenticity: 74,
  consistency: 5.8,
  followers: 85000,
};

// AI FAQs
const AI_FAQS = [
  {
    q: "How does the CreatorBharat AI calculate my Creator Score?",
    a: "Our AI engine analyzes four core dimensions: 1) True Engagement Rate (excluding bot interactions), 2) Content Consistency (posting patterns and frequency), 3) Audience Authenticity (percentage of real vs suspicious followers), and 4) Niche Authority (how relevant and focused your content is to your category). These factors are combined using a dynamic weight model to generate your score out of 100."
  },
  {
    q: "How does bot detection and audience verification work?",
    a: "We integrate directly with social media platform APIs to analyze the follower network. Our machine learning algorithms check profile completeness, activity history, and commenting behaviors of your followers. Followers flagged as inactive or automated bots are excluded from engagement calculations, providing brands with an authentic audience quality report."
  },
  {
    q: "Can the matchmaking AI predict my campaign ROI?",
    a: "Yes! The matchmaking model simulates campaign outcomes before they launch. By matching your audience demographics (location, age, interest mapping) with the brand's target consumer profiles, the AI estimates key performance indicators (KPIs) such as click-through rates (CTR), impressions, and conversion probability, ensuring high ROI alignment."
  },
  {
    q: "How can I optimize my profile to get better AI matchmaking recommendations?",
    a: "To boost your match probability: 1) Keep all social links active and authenticated, 2) Keep your state and city updated as many brands target hyper-local demographics, 3) Select precise niche tags, and 4) Deliver high-quality deliverables on active campaigns to maintain a high platform feedback score."
  },
  {
    q: "Does the AI engine support regional languages and local search?",
    a: "Absolutely. Our natural language processing (NLP) models index creator content across 12+ Indian regional languages. This allows brands to run local vernacular campaigns, targeting specific language communities with maximum cultural relevance."
  }
];

export default function AiFaqPage() {
  const [mob, setMob] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [search, setSearch] = useState('');
  const { analytics, loading: statsLoading } = usePlatformStats();

  useEffect(() => {
    const handleResize = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [openIndex, setOpenIndex] = useState(null);
  const [nicheOpen, setNicheOpen] = useState(false);

  // Simulator State
  const [followers, setFollowers] = useState(50000);
  const [engagement, setEngagement] = useState(4.5);
  const [consistency, setConsistency] = useState(8);
  const [authenticity, setAuthenticity] = useState(85);
  const [niche, setNiche] = useState('Lifestyle');

  // Real-time Score Calculations
  const calculations = useMemo(() => {
    const nicheCfg = NICHE_CONFIG[niche] || NICHE_CONFIG['Lifestyle'];

    // Core score formula
    const logF = Math.log10(followers);
    const scoreVal = (engagement * 3) + (consistency * 3.5) + ((authenticity - 50) * 0.6) + (logF * 3.5);
    const finalScore = Math.min(100, Math.max(10, Math.round(scoreVal)));

    // Pillar scores (0-100 each) for breakdown bars
    const pillars = {
      engagement: Math.min(100, Math.round((engagement / 15) * 100)),
      consistency: Math.round((consistency / 10) * 100),
      authenticity: Math.round(((authenticity - 50) / 50) * 100),
      reach: Math.min(100, Math.round((logF / Math.log10(1000000)) * 100)),
    };

    // Tier
    let tier = 'Evolving Tier';
    let tierColor = '#94a3b8';
    let tierIcon = '🌱';
    if (finalScore >= 90) { tier = 'Elite Concierge'; tierColor = '#a855f7'; tierIcon = '👑'; }
    else if (finalScore >= 75) { tier = 'Premium Verified'; tierColor = '#FF9431'; tierIcon = '⚡'; }
    else if (finalScore >= 60) { tier = 'Rising Star'; tierColor = '#10B981'; tierIcon = '🚀'; }

    // Pay estimation with niche multiplier
    const baseRate = followers * (engagement / 100) * 1.8;
    const scoreMult = finalScore / 70;
    const constMult = consistency / 7.5;
    let pay = baseRate * scoreMult * constMult * nicheCfg.mult;
    pay = Math.max(2500, Math.round(pay / 500) * 500);
    let formattedPay = `₹${pay.toLocaleString('en-IN')}`;
    if (pay >= 100000) formattedPay = `₹${(pay / 100000).toFixed(2)}L`;

    // Monthly earning estimate (avg 4 posts/month)
    const monthlyPay = pay * 4;
    let formattedMonthly = `₹${monthlyPay.toLocaleString('en-IN')}`;
    if (monthlyPay >= 100000) formattedMonthly = `₹${(monthlyPay / 100000).toFixed(1)}L/mo`;

    const matchRate = Math.min(99, Math.round(75 + (finalScore * 0.24)));

    // vs platform average
    const vsAvg = {
      score: finalScore - PLATFORM_BENCHMARKS.score,
      engagement: engagement - PLATFORM_BENCHMARKS.engagement,
      authenticity: authenticity - PLATFORM_BENCHMARKS.authenticity,
    };

    // AI tips based on lowest pillar
    const lowestPillar = Object.entries(pillars).sort((a, b) => a[1] - b[1])[0][0];
    const tips = {
      engagement: 'Boost engagement with Q&A stickers, polls, and reply-to-comment videos.',
      consistency: 'Post daily for 21 days to build content rhythm and trigger algorithm boosts.',
      authenticity: 'Remove inactive followers and avoid follow-for-follow tactics.',
      reach: 'Collaborate with 2-3 creators in your niche to cross-pollinate audiences.',
    };

    return {
      score: finalScore, tier, tierColor, tierIcon,
      pay: formattedPay, monthlyPay: formattedMonthly,
      matchRate, pillars, vsAvg,
      nicheDemand: nicheCfg.demand,
      nicheAvgEr: nicheCfg.avg_er,
      topTip: tips[lowestPillar],
      weakestPillar: lowestPillar,
    };
  }, [followers, engagement, consistency, authenticity, niche]);

  // FAQ Filtering
  const filteredFaqs = useMemo(() => {
    return AI_FAQS.filter(faq => 
      faq.q.toLowerCase().includes(search.toLowerCase()) || 
      faq.a.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div style={{ background: '#09090b', minHeight: '100vh', color: '#fafafa', paddingBottom: 100, overflow: 'hidden', fontFamily: "'Outfit', sans-serif" }}>
      <Seo 
        title="AI Knowledge Hub & Simulator" 
        description="Explore CreatorBharat's AI scoring engine and matchmaking algorithms. Estimate your score and brand earnings with our real-time simulator."
        keywords="AI creator, creator score, matchmaker, creator earnings, brand ROI, influencer algorithms"
      />

      {/* Hero Section */}
      <section style={{ position: 'relative', padding: mob ? '90px 16px 48px' : '160px 24px 100px', textAlign: 'center', background: 'radial-gradient(circle at top, rgba(255, 148, 49, 0.15) 0%, rgba(168, 85, 247, 0.08) 50%, transparent 100%)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #FF9431, #a855f7, #10B981)' }} />
        
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '8px 16px', borderRadius: 100, marginBottom: 24 }}
          >
            <Sparkles size={14} color="#FF9431" />
            <span style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', color: '#ff9431' }}>Algorithmic Discovery Hub</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: mob ? '32px' : '64px', fontWeight: 950, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20 }}
          >
            Where Creativity Meets <br />
            <span style={{ background: 'linear-gradient(90deg, #FF9431, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Data-Driven Precision</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: mob ? 15 : 18, color: '#a1a1aa', fontWeight: 500, lineHeight: 1.6, maxWidth: 600, margin: '0 auto 40px' }}
          >
            Explore our advanced AI scoring models, calculate your estimated worth, and understand the intelligence connecting top Indian creators with elite brands.
          </motion.p>
        </div>
      </section>

      {/* Quick Stats Strip — Hero ke baad, Simulator se pehle */}
      <section style={{ padding: mob ? '0 16px 40px' : '0 24px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{
            display: 'grid',
            gridTemplateColumns: mob ? '1fr 1fr' : '1fr 1fr 1fr 1fr',
            gap: mob ? 12 : 20,
            background: 'linear-gradient(135deg, rgba(255,148,49,0.04) 0%, rgba(168,85,247,0.04) 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 24,
            padding: mob ? '20px 16px' : '28px 32px',
          }}
        >
          {[
            {
              icon: <Users size={18} color="#FF9431" />,
              label: 'Active Creators',
              value: statsLoading
                ? '...'
                : analytics?.totalCreators
                  ? `${analytics.totalCreators.toLocaleString('en-IN')}+`
                  : '45,000+',
              sub: 'on platform'
            },
            {
              icon: <Star size={18} color="#a855f7" />,
              label: 'Brand Campaigns',
              value: statsLoading
                ? '...'
                : analytics?.dealValue
                  ? `${Math.round(analytics.dealValue / 100000)}L+`
                  : '500+',
              sub: 'live monthly'
            },
            {
              icon: <BarChart2 size={18} color="#10B981" />,
              label: 'Cities Covered',
              value: statsLoading
                ? '...'
                : analytics?.cityCount
                  ? `${analytics.cityCount}+`
                  : '120+',
              sub: 'across India'
            },
            {
              icon: <Zap size={18} color="#FF9431" />,
              label: 'Total Creator Reach',
              value: statsLoading
                ? '...'
                : analytics?.totalReach
                  ? analytics.totalReach >= 10000000
                    ? `${(analytics.totalReach / 10000000).toFixed(1)}Cr+`
                    : `${(analytics.totalReach / 100000).toFixed(0)}L+`
                  : '50Cr+',
              sub: 'combined followers'
            },
          ].map((stat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: mob ? 10 : 14 }}>
              <div style={{
                width: mob ? 36 : 44,
                height: mob ? 36 : 44,
                borderRadius: 12,
                background: 'rgba(255,255,255,0.04)',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                {stat.icon}
              </div>
              <div>
                <div style={{
                  fontSize: mob ? 18 : 22,
                  fontWeight: 950,
                  color: statsLoading ? '#52525b' : '#fff',
                  lineHeight: 1.1,
                  transition: 'color 0.3s'
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: mob ? 11 : 12, color: '#71717a', fontWeight: 700, lineHeight: 1.3 }}>{stat.label}</div>
                <div style={{ fontSize: mob ? 10 : 11, color: '#52525b', fontWeight: 600 }}>{stat.sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ═══ AI UNDERSTANDING SECTION ═══ */}
      {/* Yeh section public + other platform creators ko samjhata hai ki CreatorBharat AI kya hai */}
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
            style={{ fontSize: mob ? 28 : 48, fontWeight: 950, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}
          >
            CreatorBharat AI —<br />
            <span style={{ background: 'linear-gradient(90deg, #a855f7, #FF9431)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Samjho, Grow Karo
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{ fontSize: mob ? 14 : 17, color: '#71717a', fontWeight: 600, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}
          >
            Chahe tum Instagram, YouTube, ya kisi bhi platform pe ho — yeh section tumhe batata hai ki CreatorBharat ka AI engine kaise tumhare liye kaam karta hai.
          </motion.p>
        </div>

        {/* ── BLOCK 1: Platform Comparison — Pehle vs Ab ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginBottom: mob ? 40 : 64 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 16 : 24 }}>
            {/* Pehle — Old Way */}
            <div style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)', borderRadius: 24, padding: mob ? 20 : 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ fontSize: 22 }}>😔</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 900, color: '#ef4444', textTransform: 'uppercase', letterSpacing: 1 }}>Other Platforms ka Tarika</div>
                  <div style={{ fontSize: 12, color: '#52525b', fontWeight: 600 }}>Instagram DMs, Cold Emails, Luck</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Follower count hi sab kuch — quality matter nahi',
                  'Bot followers pata nahi chalte brands ko',
                  'Delhi ka creator Mumbai brands tak nahi pahunch pata',
                  'Rate negotiation blind hoti hai — koi data nahi',
                  'Campaign milta hai luck se, merit se nahi',
                  'Regional language creators ignored rehte hain',
                ].map((point, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(239,68,68,0.15)', display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: 1 }}>
                      <span style={{ fontSize: 10, color: '#ef4444', fontWeight: 900 }}>✕</span>
                    </div>
                    <span style={{ fontSize: 13, color: '#71717a', lineHeight: 1.5, fontWeight: 650 }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ab — CreatorBharat AI */}
            <div style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 24, padding: mob ? 20 : 32, position: 'relative' }}>
              <div style={{ position: 'absolute', top: -1, left: '15%', right: '15%', height: 2, background: 'linear-gradient(90deg, transparent, #10B981, transparent)', borderRadius: 100 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ fontSize: 22 }}>🚀</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 900, color: '#10B981', textTransform: 'uppercase', letterSpacing: 1 }}>CreatorBharat AI ka Tarika</div>
                  <div style={{ fontSize: 12, color: '#52525b', fontWeight: 600 }}>Data-Driven, Fair, Transparent</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'True Engagement Score — bots filter out, real engagement count',
                  'AI audience verification — brand ko real audience dikhti hai',
                  'Hyper-local matching — Jaipur creator → Jaipur brand',
                  'AI-calculated fair rate range — data se decide hota hai',
                  'Algorithm-based matching — sahi campaign, sahi creator',
                  '12+ Indian languages index — regional creators bhi visible',
                ].map((point, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: 1 }}>
                      <CheckCircle size={11} color="#10B981" />
                    </div>
                    <span style={{ fontSize: 13, color: '#e4e4e7', lineHeight: 1.5, fontWeight: 650 }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── BLOCK 2: Creator Score Kya Hota Hai — Visual Explainer ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginBottom: mob ? 40 : 64 }}
        >
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Bdg color="orange" sm>Creator Score Explained</Bdg>
            <h3 style={{ fontSize: mob ? 22 : 32, fontWeight: 950, color: '#fff', marginTop: 12, letterSpacing: '-0.02em' }}>
              Tumhara Score = Tumhari Actual Value
            </h3>
            <p style={{ fontSize: 13, color: '#71717a', marginTop: 8, fontWeight: 650, maxWidth: 540, margin: '8px auto 0' }}>
              Yeh sirf followers count nahi hai. AI 4 real dimensions analyze karta hai.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : '1fr 1fr 1fr 1fr', gap: mob ? 12 : 20 }}>
            {[
              {
                num: '40%',
                title: 'True Engagement',
                icon: '💬',
                color: '#FF9431',
                desc: 'Bots remove karke real likes, comments, saves count kiye jaate hain.',
                example: 'Example: 10K followers, 800 real interactions = 8% true ER'
              },
              {
                num: '25%',
                title: 'Content Consistency',
                icon: '📅',
                color: '#a855f7',
                desc: 'Kitni regularity se post karte ho — weekly, daily, ya kabhi kabhi.',
                example: 'Daily poster = max score, monthly = low score'
              },
              {
                num: '20%',
                title: 'Audience Authenticity',
                icon: '🛡️',
                color: '#10B981',
                desc: 'Kitne followers real hain — bot accounts automatically detect hote hain.',
                example: '85%+ real = verified badge, 50% se below = flagged'
              },
              {
                num: '15%',
                title: 'Niche Authority',
                icon: '🎯',
                color: '#0ea5e9',
                desc: 'Apne niche mein kitne focused aur relevant ho — scattered content low score.',
                example: 'Pure Finance creator > Mixed content creator in Finance niche'
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                style={{
                  background: '#121215', border: '1px solid #27272a', borderRadius: 20,
                  padding: mob ? '16px 14px' : '24px 20px',
                  display: 'flex', flexDirection: 'column', gap: 10
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: mob ? 24 : 28 }}>{item.icon}</span>
                  <span style={{
                    fontSize: mob ? 16 : 20, fontWeight: 950, color: item.color,
                    background: `${item.color}15`, padding: '2px 10px', borderRadius: 100
                  }}>{item.num}</span>
                </div>
                <div style={{ fontSize: mob ? 13 : 15, fontWeight: 900, color: '#fff' }}>{item.title}</div>
                <div style={{ fontSize: mob ? 11 : 12, color: '#71717a', lineHeight: 1.5, fontWeight: 650 }}>{item.desc}</div>
                <div style={{
                  fontSize: 11, color: item.color, fontWeight: 750,
                  background: `${item.color}0d`, padding: '6px 10px', borderRadius: 8,
                  lineHeight: 1.4
                }}>{item.example}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── BLOCK 3: Platform se CreatorBharat kaise alag hai ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginBottom: mob ? 40 : 64 }}
        >
          <div style={{
            background: 'linear-gradient(135deg, rgba(168,85,247,0.06), rgba(255,148,49,0.04))',
            border: '1px solid rgba(168,85,247,0.15)', borderRadius: 28, padding: mob ? 20 : 40,
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, background: 'radial-gradient(circle, rgba(168,85,247,0.08), transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 24 : 40, alignItems: 'center' }}>
              <div>
                <Bdg color="purple" sm style={{ marginBottom: 16 }}>Agar tum Instagram/YouTube pe ho</Bdg>
                <h3 style={{ fontSize: mob ? 22 : 30, fontWeight: 950, color: '#fff', marginBottom: 16, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                  CreatorBharat alag kaise hai?
                </h3>
                <p style={{ fontSize: 14, color: '#a1a1aa', lineHeight: 1.7, marginBottom: 20, fontWeight: 650 }}>
                  Instagram aur YouTube pe sirf content dikhta hai — <strong style={{ color: '#fff' }}>brands tumhe dhundh nahi sakte.</strong> CreatorBharat pe AI tumhara verified profile banata hai jise brands actively search karte hain.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { platform: 'Instagram', cb: 'Instagram = content feed. CB = verified creator marketplace.' },
                    { platform: 'YouTube', cb: 'YouTube = views. CB = brand deal pipeline with verified data.' },
                    { platform: 'Moj / Josh', cb: 'Short video platforms = reach. CB = monetization layer on top.' },
                  ].map((row, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                      <Globe size={14} color="#71717a" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: '#a1a1aa', lineHeight: 1.4, fontWeight: 650 }}>
                        <strong style={{ color: '#FF9431' }}>{row.platform}:</strong> {row.cb}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* CB = Layer on top of all platforms */}
                <div style={{ background: '#121215', border: '1px solid #27272a', borderRadius: 20, padding: '20px' }}>
                  <div style={{ fontSize: 12, fontWeight: 900, color: '#a855f7', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>CreatorBharat = Layer on top</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                      { icon: '📸', label: 'Instagram Creator', arrow: true },
                      { icon: '▶️', label: 'YouTube Creator', arrow: true },
                      { icon: '🎵', label: 'Moj / Josh Creator', arrow: true },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, fontSize: 12, fontWeight: 700, color: '#a1a1aa', flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span>{item.icon}</span> {item.label}
                        </div>
                        <ArrowRight size={14} color="#FF9431" />
                        <div style={{ padding: '8px 12px', background: 'rgba(255,148,49,0.08)', border: '1px solid rgba(255,148,49,0.2)', borderRadius: 10, fontSize: 12, fontWeight: 800, color: '#FF9431' }}>
                          CB Profile
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 14, padding: '10px 14px', background: 'linear-gradient(90deg, rgba(168,85,247,0.1), rgba(255,148,49,0.08))', borderRadius: 12, textAlign: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: '#fff' }}>→ AI Score + Brand Matching + Deals 💰</span>
                  </div>
                </div>

                <div style={{ padding: '14px 18px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 16, display: 'flex', gap: 10 }}>
                  <CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} />
                  <p style={{ margin: 0, fontSize: 12, color: '#a1a1aa', lineHeight: 1.5, fontWeight: 650 }}>
                    <strong style={{ color: '#10B981' }}>Join karo free mein.</strong> Apne existing platforms ko link karo. AI tumhara score calculate karega aur brands automatically discover karenge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── BLOCK 4: Tier System Visual ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <Bdg color="purple" sm>Score Tiers</Bdg>
            <h3 style={{ fontSize: mob ? 22 : 30, fontWeight: 950, color: '#fff', marginTop: 12, letterSpacing: '-0.02em' }}>
              Tumhara Score = Tumhari Tier
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : '1fr 1fr 1fr 1fr', gap: mob ? 10 : 16 }}>
            {[
              { score: '10–59', tier: 'Evolving', icon: '🌱', color: '#94a3b8', bg: 'rgba(148,163,184,0.06)', border: 'rgba(148,163,184,0.15)', perks: ['Platform access', 'Basic profile', 'Apply to open campaigns'], what: 'Abhi grow karo' },
              { score: '60–74', tier: 'Rising Star', icon: '🚀', color: '#10B981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.2)', perks: ['Brand discovery mein dikhna', 'Rising badge', 'Priority for micro campaigns'], what: 'Consistent raho' },
              { score: '75–89', tier: 'Premium', icon: '⚡', color: '#FF9431', bg: 'rgba(255,148,49,0.06)', border: 'rgba(255,148,49,0.2)', perks: ['Premium brand campaigns', 'Verified badge', 'Higher rate bracket'], what: 'Top 25% creators' },
              { score: '90–100', tier: 'Elite', icon: '👑', color: '#a855f7', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.25)', perks: ['Elite concierge matching', 'Dedicated manager', 'First access to premium deals'], what: 'Top 5% creators' },
            ].map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                style={{
                  background: t.bg, border: `1px solid ${t.border}`,
                  borderRadius: 20, padding: mob ? '16px 14px' : '24px 20px',
                  display: 'flex', flexDirection: 'column', gap: 10
                }}
              >
                <div style={{ fontSize: mob ? 28 : 32, marginBottom: 4 }}>{t.icon}</div>
                <div style={{ fontSize: mob ? 11 : 12, fontWeight: 900, color: t.color, textTransform: 'uppercase', letterSpacing: 1 }}>Score {t.score}</div>
                <div style={{ fontSize: mob ? 15 : 18, fontWeight: 950, color: '#fff' }}>{t.tier}</div>
                <div style={{ fontSize: 11, color: '#52525b', fontWeight: 800, background: 'rgba(255,255,255,0.03)', padding: '4px 8px', borderRadius: 8, display: 'inline-block' }}>{t.what}</div>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '4px 0' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {t.perks.map((p, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: `${t.color}20`, display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: 1 }}>
                        <span style={{ fontSize: 8, color: t.color }}>✓</span>
                      </div>
                      <span style={{ fontSize: mob ? 10 : 11, color: '#71717a', lineHeight: 1.4, fontWeight: 650 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Main Grid: Simulator + Results */}
      <section style={{ padding: mob ? '0 16px' : '0 20px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 3 }}>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.2fr 1fr', gap: mob ? 20 : 28, alignItems: 'start' }}>

          {/* LEFT: Simulator Inputs */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card style={{ background: '#121215', border: '1px solid #27272a', padding: mob ? 16 : 32, borderRadius: 28, position: 'relative' }}>
              <div style={{ position: 'absolute', top: -1, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255, 148, 49, 0.4), transparent)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255, 148, 49, 0.1)', display: 'grid', placeItems: 'center', color: '#FF9431' }}>
                  <Cpu size={22} />
                </div>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 900, color: '#fff', margin: 0 }}>AI Score Simulator</h2>
                  <p style={{ fontSize: 12, color: '#71717a', margin: '2px 0 0 0', fontWeight: 600 }}>Tune your metrics — see your score update live</p>
                </div>
              </div>

              {/* Niche Selector */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 13, fontWeight: 800, color: '#a1a1aa', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Your Content Niche</label>
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setNicheOpen(p => !p)}
                    style={{
                      width: '100%', padding: '12px 16px', background: '#1c1c20',
                      border: `1px solid ${nicheOpen ? '#FF9431' : '#27272a'}`,
                      borderRadius: 12, color: '#fff', cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      fontSize: 14, fontWeight: 800, transition: 'border-color 0.2s'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {niche}
                      <span style={{
                        fontSize: 10, fontWeight: 900, padding: '2px 8px', borderRadius: 100,
                        background: NICHE_CONFIG[niche]?.demand === 'Very High' ? 'rgba(168,85,247,0.15)' :
                          NICHE_CONFIG[niche]?.demand === 'High' ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.06)',
                        color: NICHE_CONFIG[niche]?.demand === 'Very High' ? '#a855f7' :
                          NICHE_CONFIG[niche]?.demand === 'High' ? '#10B981' : '#71717a',
                        textTransform: 'uppercase', letterSpacing: 1
                      }}>
                        {NICHE_CONFIG[niche]?.demand} demand
                      </span>
                    </span>
                    <ChevronDown size={16} color="#71717a" style={{ transform: nicheOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>
                  <AnimatePresence>
                    {nicheOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        style={{
                          position: 'absolute', top: '110%', left: 0, right: 0, zIndex: 50,
                          background: '#18181b', border: '1px solid #27272a', borderRadius: 16,
                          overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                        }}
                      >
                        {Object.keys(NICHE_CONFIG).map(n => (
                          <button
                            key={n}
                            onClick={() => { setNiche(n); setNicheOpen(false); }}
                            style={{
                              width: '100%', padding: '11px 16px', background: n === niche ? 'rgba(255,148,49,0.08)' : 'none',
                              border: 'none', borderBottom: '1px solid #27272a', color: n === niche ? '#FF9431' : '#e4e4e7',
                              cursor: 'pointer', textAlign: 'left', fontSize: 14, fontWeight: 700,
                              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                            }}
                          >
                            {n}
                            <span style={{ fontSize: 11, color: '#52525b', fontWeight: 700 }}>avg ER {NICHE_CONFIG[n].avg_er}%</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Sliders */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* Followers */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 800, color: '#e4e4e7' }}>Follower Reach</label>
                    <span style={{ fontSize: 14, fontWeight: 900, color: '#FF9431' }}>
                      {followers >= 100000 ? `${(followers / 100000).toFixed(1)}L` : followers.toLocaleString('en-IN')}
                      {followers > PLATFORM_BENCHMARKS.followers
                        ? <span style={{ fontSize: 10, color: '#10B981', marginLeft: 6, fontWeight: 900 }}>↑ above avg</span>
                        : <span style={{ fontSize: 10, color: '#f59e0b', marginLeft: 6, fontWeight: 900 }}>↓ below avg</span>
                      }
                    </span>
                  </div>
                  <input type="range" min="5000" max="1000000" step="5000" value={followers}
                    onChange={e => setFollowers(Number(e.target.value))}
                    style={{ width: '100%', height: mob ? 8 : 6, borderRadius: 3, accentColor: '#FF9431', background: '#27272a', outline: 'none', cursor: 'pointer' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#52525b', marginTop: 4, fontWeight: 700 }}>
                    <span>5K</span><span>500K</span><span>1M+</span>
                  </div>
                </div>

                {/* Engagement */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 800, color: '#e4e4e7' }}>Engagement Rate</label>
                    <span style={{ fontSize: 14, fontWeight: 900, color: '#FF9431' }}>
                      {engagement.toFixed(1)}%
                      {engagement >= calculations.nicheAvgEr
                        ? <span style={{ fontSize: 10, color: '#10B981', marginLeft: 6, fontWeight: 900 }}>↑ niche avg {calculations.nicheAvgEr}%</span>
                        : <span style={{ fontSize: 10, color: '#f59e0b', marginLeft: 6, fontWeight: 900 }}>↓ niche avg {calculations.nicheAvgEr}%</span>
                      }
                    </span>
                  </div>
                  <input type="range" min="0.5" max="15.0" step="0.1" value={engagement}
                    onChange={e => setEngagement(Number(e.target.value))}
                    style={{ width: '100%', height: mob ? 8 : 6, borderRadius: 3, accentColor: '#FF9431', background: '#27272a', outline: 'none', cursor: 'pointer' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#52525b', marginTop: 4, fontWeight: 700 }}>
                    <span>0.5%</span><span>7.5%</span><span>15%</span>
                  </div>
                </div>

                {/* Consistency */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 800, color: '#e4e4e7' }}>Content Consistency</label>
                    <span style={{ fontSize: 14, fontWeight: 900, color: '#FF9431' }}>{consistency}/10</span>
                  </div>
                  <input type="range" min="1" max="10" step="1" value={consistency}
                    onChange={e => setConsistency(Number(e.target.value))}
                    style={{ width: '100%', height: mob ? 8 : 6, borderRadius: 3, accentColor: '#FF9431', background: '#27272a', outline: 'none', cursor: 'pointer' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#52525b', marginTop: 4, fontWeight: 700 }}>
                    <span>Irregular</span><span>Steady</span><span>Daily</span>
                  </div>
                </div>

                {/* Authenticity */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 800, color: '#e4e4e7' }}>Audience Authenticity</label>
                    <span style={{ fontSize: 14, fontWeight: 900, color: '#FF9431' }}>{authenticity}% Real</span>
                  </div>
                  <input type="range" min="50" max="100" step="1" value={authenticity}
                    onChange={e => setAuthenticity(Number(e.target.value))}
                    style={{ width: '100%', height: mob ? 8 : 6, borderRadius: 3, accentColor: '#FF9431', background: '#27272a', outline: 'none', cursor: 'pointer' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#52525b', marginTop: 4, fontWeight: 700 }}>
                    <span>50% Flagged</span><span>75% Good</span><span>100% Elite</span>
                  </div>
                </div>
              </div>

              {/* AI Tip Box */}
              <div style={{ marginTop: 24, padding: '14px 16px', background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.15)', borderRadius: 14, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Zap size={16} color="#a855f7" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 900, color: '#a855f7', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
                    AI TIP — Improve {calculations.weakestPillar}
                  </div>
                  <p style={{ margin: 0, fontSize: 12, color: '#a1a1aa', lineHeight: 1.5, fontWeight: 650 }}>
                    {calculations.topTip}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* RIGHT: Results Panel */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Score Ring Card */}
            <Card style={{ background: '#121215', border: '1px solid #27272a', padding: mob ? 20 : 24, borderRadius: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <Bdg color="purple" sm style={{ marginBottom: 14 }}>REAL-TIME AI SCORE</Bdg>

              <div style={{ position: 'relative', width: 130, height: 130, display: 'grid', placeItems: 'center', marginBottom: 12 }}>
                <svg width="130" height="130" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="50" cy="50" r="42" stroke="#1c1c20" strokeWidth="8" fill="transparent" />
                  <motion.circle cx="50" cy="50" r="42" stroke="url(#aiGrad)" strokeWidth="8" fill="transparent"
                    strokeDasharray={263.8}
                    animate={{ strokeDashoffset: 263.8 - (263.8 * calculations.score) / 100 }}
                    transition={{ type: 'spring', stiffness: 50, damping: 14 }}
                    strokeLinecap="round" />
                  <defs>
                    <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF9431" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <motion.span
                    key={calculations.score}
                    initial={{ scale: 1.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    style={{ fontSize: 34, fontWeight: 950, color: '#fff', letterSpacing: '-1px', lineHeight: 1 }}
                  >
                    {calculations.score}
                  </motion.span>
                  <span style={{ fontSize: 9, fontWeight: 900, color: '#71717a', textTransform: 'uppercase', letterSpacing: 1 }}>/ 100</span>
                </div>
              </div>

              <div style={{ fontSize: 16, fontWeight: 950, color: calculations.tierColor, marginBottom: 4 }}>
                {calculations.tierIcon} {calculations.tier}
              </div>
              <div style={{ fontSize: 11, color: '#52525b', fontWeight: 700, marginBottom: 16 }}>
                {calculations.vsAvg.score >= 0
                  ? <span style={{ color: '#10B981' }}>+{calculations.vsAvg.score} pts above platform avg</span>
                  : <span style={{ color: '#f59e0b' }}>{calculations.vsAvg.score} pts below platform avg</span>
                }
              </div>

              {/* 4 metrics grid */}
              <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { label: 'PER POST', value: calculations.pay, color: '#fff', icon: <Award size={12} color="#FF9431" /> },
                  { label: 'MONTHLY EST.', value: calculations.monthlyPay, color: '#10B981', icon: <TrendingUp size={12} color="#10B981" /> },
                  { label: 'CAMPAIGN MATCH', value: `${calculations.matchRate}%`, color: '#a855f7', icon: <Target size={12} color="#a855f7" /> },
                  { label: 'NICHE DEMAND', value: calculations.nicheDemand, color: '#FF9431', icon: <Activity size={12} color="#FF9431" /> },
                ].map((m, i) => (
                  <div key={i} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.04)', textAlign: 'left' }}>
                    <div style={{ fontSize: 9, color: '#52525b', fontWeight: 900, letterSpacing: 0.5, marginBottom: 5, display: 'flex', alignItems: 'center', gap: 4 }}>
                      {m.icon} {m.label}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 950, color: m.color }}>{m.value}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Score Pillar Breakdown */}
            <Card style={{ background: '#121215', border: '1px solid #27272a', padding: mob ? 16 : 20, borderRadius: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Shield size={16} color="#FF9431" />
                <span style={{ fontSize: 13, fontWeight: 900, color: '#fff' }}>Score Breakdown</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Engagement', value: calculations.pillars.engagement, color: '#FF9431' },
                  { label: 'Consistency', value: calculations.pillars.consistency, color: '#a855f7' },
                  { label: 'Authenticity', value: calculations.pillars.authenticity, color: '#10B981' },
                  { label: 'Reach', value: calculations.pillars.reach, color: '#0ea5e9' },
                ].map(p => (
                  <div key={p.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontSize: 12, color: '#a1a1aa', fontWeight: 700 }}>{p.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 900, color: p.color }}>{p.value}</span>
                    </div>
                    <div style={{ height: 6, background: '#1c1c20', borderRadius: 100, overflow: 'hidden' }}>
                      <motion.div
                        animate={{ width: `${p.value}%` }}
                        transition={{ type: 'spring', stiffness: 60, damping: 14 }}
                        style={{ height: '100%', background: p.color, borderRadius: 100, opacity: 0.85 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Platform Benchmark */}
            <Card style={{ background: '#121215', border: '1px solid #27272a', padding: mob ? 16 : 20, borderRadius: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <BarChart2 size={16} color="#a855f7" />
                <span style={{ fontSize: 13, fontWeight: 900, color: '#fff' }}>vs Platform Average</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'Creator Score', you: calculations.score, avg: PLATFORM_BENCHMARKS.score, unit: '' },
                  { label: 'Engagement Rate', you: engagement, avg: PLATFORM_BENCHMARKS.engagement, unit: '%' },
                  { label: 'Authenticity', you: authenticity, avg: PLATFORM_BENCHMARKS.authenticity, unit: '%' },
                ].map(b => {
                  const isAbove = b.you >= b.avg;
                  const maxVal = Math.max(b.you, b.avg) * 1.2;
                  return (
                    <div key={b.label} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.01)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 12, color: '#71717a', fontWeight: 700 }}>{b.label}</span>
                        <span style={{ fontSize: 12, fontWeight: 900, color: isAbove ? '#10B981' : '#f59e0b' }}>
                          {isAbove ? '↑' : '↓'} {b.you}{b.unit} vs {b.avg}{b.unit}
                        </span>
                      </div>
                      <div style={{ position: 'relative', height: 6, background: '#1c1c20', borderRadius: 100 }}>
                        {/* platform avg marker */}
                        <div style={{
                          position: 'absolute', top: -3, width: 2, height: 12, background: '#52525b', borderRadius: 1,
                          left: `${(b.avg / maxVal) * 100}%`
                        }} />
                        <motion.div
                          animate={{ width: `${Math.min(100, (b.you / maxVal) * 100)}%` }}
                          transition={{ type: 'spring', stiffness: 60, damping: 14 }}
                          style={{ height: '100%', background: isAbove ? '#10B981' : '#f59e0b', borderRadius: 100, opacity: 0.8 }}
                        />
                      </div>
                      <div style={{ fontSize: 10, color: '#3f3f46', marginTop: 4, fontWeight: 700 }}>
                        Platform avg marker ↑
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Pro CTA */}
            <div style={{ background: 'linear-gradient(135deg, rgba(255,148,49,0.06), rgba(168,85,247,0.06))', border: '1px solid rgba(255,148,49,0.14)', borderRadius: 18, padding: '16px 18px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <Sparkles size={18} color="#FF9431" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: 13, fontWeight: 900, color: '#fff' }}>Lock in your real score</h4>
                <p style={{ margin: 0, fontSize: 12, color: '#71717a', lineHeight: 1.5, fontWeight: 650 }}>
                  Connect your socials to get your actual verified AI score — not an estimate.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Matchmaker System Pipeline Visual */}
      <section style={{ maxWidth: 1200, margin: '80px auto 40px', padding: mob ? '0 16px' : '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Bdg color="orange" sm>THE ENGINE FLOW</Bdg>
          <h2 style={{ fontSize: mob ? 28 : 40, fontWeight: 950, color: '#fff', marginTop: 12, letterSpacing: '-0.5px' }}>
            Algorithmic Pipeline
          </h2>
          <p style={{ color: '#71717a', fontSize: 14, marginTop: 4, fontWeight: 650 }}>How CreatorBharat processes your stats to match you with top Indian brands</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr 1fr 1fr', gap: 20 }}>
          {[
            { step: '01', title: 'Data Ingestion', desc: 'Secure APIs pull real-time follower networks, video reach, and engagement logs.' },
            { step: '02', title: 'Audit Filtering', desc: 'Natural language processing and bot detection filter inactive accounts and comments.' },
            { step: '03', title: 'Niche Indexing', desc: 'Semantic tag models parse content themes, indexing you under 20+ specialized creator domains.' },
            { step: '04', title: 'Deal Matching', desc: 'Smart matches recommend your profile to verified brand campaigns targeting your niche.' }
          ].map((item, idx) => (
            <motion.div 
              key={item.step}
              whileHover={{ y: -6, borderColor: '#a855f7' }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              style={{ background: '#121215', border: '1px solid #27272a', padding: 24, borderRadius: 20, transition: 'border-color 0.2s' }}
            >
              <div style={{ fontSize: 13, fontWeight: 950, color: '#a855f7', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>STEP {item.step}</span>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#a855f7' }} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 900, color: '#fff', marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: '#71717a', lineHeight: 1.6, margin: 0, fontWeight: 650 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI FAQ Accordion */}
      <section style={{ maxWidth: 800, margin: '80px auto 0', padding: mob ? '0 16px' : '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Bdg color="purple" sm>FREQUENTLY ASKED QUESTIONS</Bdg>
          <h2 style={{ fontSize: mob ? 28 : 40, fontWeight: 950, color: '#fff', marginTop: 12, letterSpacing: '-0.5px' }}>
            Inside the AI Core
          </h2>
          <p style={{ color: '#71717a', fontSize: 14, marginTop: 4, fontWeight: 650 }}>Questions about machine learning, verification, and score updates</p>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', marginBottom: 32 }}>
          <Search size={18} color="#71717a" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            placeholder="Search AI capabilities, scoring details, parameters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '16px 16px 16px 48px', background: '#121215', border: '1px solid #27272a', borderRadius: 16, color: '#fff', outline: 'none', fontSize: 14, fontWeight: 650, boxSizing: 'border-box' }}
          />
        </div>

        {/* FAQ Accordion Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                style={{ 
                  background: '#121215', 
                  border: `1px solid ${isOpen ? '#a855f7' : '#27272a'}`, 
                  borderRadius: 16, 
                  overflow: 'hidden',
                  transition: 'border-color 0.2s'
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{ width: '100%', padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontSize: 15, fontWeight: 800, paddingRight: 12, lineHeight: 1.4 }}>{faq.q}</span>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: isOpen ? '#a855f720' : '#27272a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isOpen ? '#a855f7' : '#fafafa', flexShrink: 0 }}>
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
                      <div style={{ padding: '0 20px 20px 20px', fontSize: 14, color: '#a1a1aa', lineHeight: 1.6, fontWeight: 600 }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 20px', border: '1px dashed #27272a', borderRadius: 16, color: '#71717a' }}>
              <HelpCircle size={36} style={{ marginBottom: 12 }} />
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>No search results found</p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ maxWidth: 800, margin: '100px auto 0', padding: mob ? '0 16px' : '0 20px', textAlign: 'center' }}>
        <div style={{ background: 'linear-gradient(180deg, #121215 0%, #09090b 100%)', border: '1px solid #27272a', borderRadius: 32, padding: mob ? '40px 20px' : '64px 40px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.08), transparent 70%)', pointerEvents: 'none' }} />
          <MessageSquare size={36} color="#a855f7" style={{ marginBottom: 20 }} />
          <h2 style={{ fontSize: mob ? 24 : 36, fontWeight: 950, color: '#fff', marginBottom: 16, letterSpacing: '-0.5px' }}>
            Build Your Algorithmic Profile
          </h2>
          <p style={{ fontSize: 14, color: '#a1a1aa', lineHeight: 1.6, fontWeight: 650, maxWidth: 500, margin: '0 auto 32px' }}>
            Sign up now to lock in your score, link your socials, and get visible to 500+ premium Indian brands hiring creators today.
          </p>
          <Btn lg onClick={() => globalThis.location.href = '/apply'} style={{ padding: '16px 36px', borderRadius: 100, background: 'linear-gradient(90deg, #FF9431, #a855f7)', color: '#fff', border: 'none', fontSize: 16, fontWeight: 950 }}>
            Join Creator Ecosystem <ArrowRight size={18} style={{ marginLeft: 6 }} />
          </Btn>
        </div>
      </section>
    </div>
  );
}
