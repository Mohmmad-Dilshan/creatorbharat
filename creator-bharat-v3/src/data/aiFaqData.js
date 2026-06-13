export const AI_FAQS = [
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

export const OLD_WAY_POINTS = [
  'Follower count hi sab kuch — quality matter nahi',
  'Bot followers pata nahi chalte brands ko',
  'Delhi ka creator Mumbai brands tak nahi pahunch pata',
  'Rate negotiation blind hoti hai — koi data nahi',
  'Campaign milta hai luck se, merit se nahi',
  'Regional language creators ignored rehte hain',
];

export const AI_WAY_POINTS = [
  'True Engagement Score — bots filter out, real engagement count',
  'AI audience verification — brand ko real audience dikhti hai',
  'Hyper-local matching — Jaipur creator → Jaipur brand',
  'AI-calculated fair rate range — data se decide hota hai',
  'Algorithm-based matching — sahi campaign, sahi creator',
  '12+ Indian languages index — regional creators bhi visible',
];

export const SCORE_DIMENSIONS = [
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
];

export const PLATFORM_COMPARISON_ROWS = [
  { platform: 'Instagram', cb: 'Instagram = content feed. CB = verified creator marketplace.' },
  { platform: 'YouTube', cb: 'YouTube = views. CB = brand deal pipeline with verified data.' },
  { platform: 'Moj / Josh', cb: 'Short video platforms = reach. CB = monetization layer on top.' },
];

export const SCORE_TIERS = [
  { score: '10–59', tier: 'Evolving', icon: '🌱', color: '#94a3b8', bg: 'rgba(148,163,184,0.06)', border: 'rgba(148,163,184,0.15)', perks: ['Platform access', 'Basic profile', 'Apply to open campaigns'], what: 'Evolving Growth Mode' },
  { score: '60–74', tier: 'Rising Star', icon: '🚀', color: '#10B981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.2)', perks: ['Featured in brand discovery', 'Rising badge', 'Priority for micro campaigns'], what: 'Rising Traction Mode' },
  { score: '75–89', tier: 'Premium', icon: '⚡', color: '#FF9431', bg: 'rgba(255,148,49,0.06)', border: 'rgba(255,148,49,0.2)', perks: ['Premium brand campaigns', 'Verified badge', 'Higher rate bracket'], what: 'Premium Verified' },
  { score: '90–100', tier: 'Elite', icon: '👑', color: '#a855f7', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.25)', perks: ['Elite concierge matching', 'Dedicated manager', 'First access to premium deals'], what: 'Elite Platform Tier' },
];

export const PIPELINE_STEPS = [
  { step: '01', title: 'Data Ingestion', desc: 'Secure APIs pull real-time follower networks, video reach, and engagement logs.' },
  { step: '02', title: 'Audit Filtering', desc: 'Natural language processing and bot detection filter inactive accounts and comments.' },
  { step: '03', title: 'Niche Indexing', desc: 'Semantic tag models parse content themes, indexing you under 20+ specialized creator domains.' },
  { step: '04', title: 'Deal Matching', desc: 'Smart matches recommend your profile to verified brand campaigns targeting your niche.' }
];
