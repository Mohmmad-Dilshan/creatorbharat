import { 
  Users, 
  Zap, 
  Rocket, 
  Code2, 
  Globe, 
  ShieldCheck, 
  Activity, 
  Cpu 
} from 'lucide-react';

export const OFFICIAL_DATA = {
  en: {
    username: 'creatorbharat',
    displayName: 'CreatorBharat.Official',
    category: 'Ecosystem • Official Platform Handle',
    bio: "Democratizing India's Creator Economy. 🇮🇳\nConnecting brands with authentic regional creators with 0% middleman fees.",
    website: 'www.creatorbharat.com',
  },
  hi: {
    username: 'creatorbharat',
    displayName: 'CreatorBharat.Official',
    category: 'पारिस्थितिकी तंत्र • आधिकारिक हैंडल',
    bio: "भारत की क्रिएटर इकोनॉमी का लोकतंत्रीकरण। 🇮🇳\n0% ब्रोकरेज फीस पर ब्रांड्स को क्षेत्रीय क्रिएटर्स से जोड़ना।",
    website: 'www.creatorbharat.com',
  },
  baseStats: { posts: 120, followers: '58.4K', following: 128 },
  socialPlatforms: [
    { platform: 'Twitter', url: 'https://twitter.com/creatorbharat', handle: '@CreatorBharat' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/creatorbharat', handle: 'company/creatorbharat' },
    { platform: 'GitHub', url: 'https://github.com/creatorbharat', handle: 'creatorbharat' },
    { platform: 'Instagram', url: 'https://instagram.com/creatorbharat', handle: '@creatorbharat' },
    { platform: 'Discord', url: 'https://discord.gg/creatorbharat', handle: 'CreatorBharat HQ' }
  ],
  highlights: [
    { id: 'v1', label: 'v1.0 Launch', icon: Code2, color: '#0f172a', stories: [{ title: 'CreatorBharat v1.0', text: 'Ecosystem launch: Direct matching, secure escrow, and transparent ratings.', date: 'Live' }] },
    { id: 'updates', label: 'Updates', icon: Zap, color: '#FF9431', stories: [{ title: 'Feature Sync', text: 'Brand consoles now feature direct search filters by city and niche.', date: '2h ago' }] },
    { id: 'roadmap', label: 'Roadmap', icon: Rocket, color: '#3B82F6', stories: [{ title: 'Creator Success', text: 'Onboarding 20,000+ Tier-2/3 creators in regional languages.', date: 'Next' }] },
    { id: 'founders', label: 'Our Mission', icon: Users, color: '#10B981', stories: [{ title: 'Why CreatorBharat?', text: 'Removing commission-taking middlemen so creators keep 100% of earnings.', date: 'Official' }] }
  ],
  posts: [
    {
      id: 1,
      title: 'CreatorBharat v1.0 Platform Launch',
      category: 'Announcements',
      date: 'June 10, 2026',
      readTime: '3 min read',
      icon: Code2,
      color: '#0f172a',
      image: '/official_launch_poster.webp',
      summary: 'CreatorBharat v1.0 is officially live! Opening the gateway to direct, commission-free collaborations between brands and regional talent.',
      fullContent: `We are thrilled to announce that CreatorBharat v1.0 is officially live across India. Our mission is to build the trust infrastructure for India's regional creator economy.
      
      Key Features of v1.0:
      • Direct Creator Scout: Search and filter verified creators by niche, location, and audience demographics.
      • Secure Escrow Ledger: Campaign payments are held securely and released instantly upon deliverable verification.
      • Transparent Creator Score: Algorithmic reputation profiles based on campaign fulfillment and brand reviews.
      • 0% Middleman Fees: Creators keep 100% of their earnings, and brands pay zero agency commissions.`
    },
    {
      id: 2,
      title: 'Creator Score Algorithmic Formulation',
      category: 'Platform Guide',
      date: 'June 05, 2026',
      readTime: '4 min read',
      icon: Activity,
      color: '#7C3AED',
      image: '/creator_score_poster.webp',
      summary: 'How Creator Score V1 computes reputation transparently to help brands discover reliable partners.',
      fullContent: `To build trust in our marketplace, we introduce the algorithmic Creator Score. This metric helps brands identify highly reliable partners instantly.
      
      Score Components:
      • Campaign Fulfillment (45%): Successful delivery of brand assets and timeline compliance.
      • Brand Reviews (30%): Verified ratings and feedback from brand campaign managers.
      • Consistency (25%): Organic reach and consistency of uploads across connected social handles.`
    },
    {
      id: 3,
      title: 'Secure Escrow & Payout System',
      category: 'Security & Trust',
      date: 'May 28, 2026',
      readTime: '3 min read',
      icon: ShieldCheck,
      color: '#10B981',
      image: '/escrow_secure_poster.webp',
      summary: 'Say goodbye to payout delays. Our escrow system secures campaign budgets for complete peace of mind.',
      fullContent: `CreatorBharat's secure escrow ensures campaigns run smoothly for both brands and creators without delays.
      
      How Escrow Works:
      • Budget Lock: The brand funds the campaign milestones up-front to secure the creator's budget.
      • Work Verification: The creator uploads deliverables directly to the platform.
      • Instant Release: Once the deliverables are approved, funds are released to the creator in under 5 seconds.`
    },
    {
      id: 4,
      title: 'Regional Creators Reach & Growth',
      category: 'Ecosystem Insight',
      date: 'May 15, 2026',
      readTime: '4 min read',
      icon: Globe,
      color: '#3B82F6',
      image: '/regional_creators_poster.webp',
      summary: 'Why influencer marketing is migrating to Tier-2 & Tier-3 Indian cities and regional languages.',
      fullContent: `Metro saturation is real. The next wave of consumer growth in India is driven by regional creators speaking regional languages.
      
      Key Drivers:
      • Hyper-Local Engagement: Regional creators build highly loyal micro-communities with higher trust scores.
      • Language Focus: Content in Hindi, Marathi, Tamil, Telugu, and Punjabi sees 3x higher relative engagement.
      • High ROI: Cost-effective marketing targeting specific demographics directly without agency overhead.`
    }
  ],
  liveFeed: [
    "New brand onboarded from Bangalore",
    "CreatorBharat v1.0 active in 28 states",
    "Escrow campaign ₹1.5L settled successfully",
    "Creator Score V1.0 analytics updated",
    "Regional creator meetups planned in Rajasthan"
  ],
  founder: {
    name: 'Mohmmad Dilshan',
    role: 'Founder & CEO',
    location: 'Bhilwara, Rajasthan',
    vision: 'Building the infrastructure of trust and growth for India\'s regional creator economy.',
    achievements: ['Creator Economy Pioneer', '0% Broker Fee Advocate', 'Empowering Bharat\'s Voice']
  },
  team: [
    {
      id: 'dilshan',
      name: 'Mohmmad Dilshan',
      role: 'Founder & CEO',
      category: 'leadership',
      location: 'Bhilwara, Rajasthan',
      avatar: '/team_dilshan.webp',
      bio: 'On a mission to democratize the creator marketplace across India, providing secure direct collaborations and fair payouts.',
      skills: ['Ecosystem Vision', 'Product Strategy', 'Business Operations', 'Community Relations'],
      linkedin: 'https://linkedin.com/in/mohmmad-dilshan',
      github: 'https://github.com/mohmmad-dilshan',
      verified: true
    },
    {
      id: 'divyansh',
      name: 'Divyansh Sharma',
      role: 'Head of Engineering',
      category: 'engineering',
      location: 'Jaipur, Rajasthan',
      avatar: 'https://ui-avatars.com/api/?name=Divyansh+Sharma&background=3B82F6&color=fff&size=256',
      bio: 'Leading backend scaling, discovery search optimizations, real-time analytics, and escrow integration.',
      skills: ['System Architecture', 'NodeJS/Express', 'React/Vite', 'PostgreSQL', 'Redis'],
      linkedin: 'https://linkedin.com/in/divyansh-sharma',
      github: 'https://github.com/divyansh-sharma',
      verified: true
    },
    {
      id: 'ritesh',
      name: 'Ritesh Verma',
      role: 'Lead UX/UI Designer',
      category: 'design',
      location: 'Delhi NCR',
      avatar: 'https://ui-avatars.com/api/?name=Ritesh+Verma&background=7C3AED&color=fff&size=256',
      bio: 'Crafting responsive, premium-grade dashboard designs and animations for creators and brand partners.',
      skills: ['Figma', 'UI/UX Design', 'CSS Systems', 'Framer Motion', 'Interactive Prototypes'],
      linkedin: 'https://linkedin.com/in/ritesh-verma',
      github: 'https://github.com/ritesh-verma',
      verified: true
    },
    {
      id: 'priya',
      name: 'Priya Nair',
      role: 'Head of Creator Success',
      category: 'operations',
      location: 'Bangalore, Karnataka',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Nair&background=10B981&color=fff&size=256',
      bio: 'Managing talent onboarding, campaign coordination, and dispute settlements in the ecosystem.',
      skills: ['Campaign Management', 'Talent Relations', 'Public Relations', 'Operations Strategy'],
      linkedin: 'https://linkedin.com/in/priya-nair',
      github: '#',
      verified: true
    }
  ],
  shards: [
    { id: 'H1', region: 'North Hub (Delhi/Jaipur)', status: 'Active', latency: '4.5K+ Creators', load: '85%' },
    { id: 'H2', region: 'West Hub (Mumbai/Pune)', status: 'Active', latency: '5.8K+ Creators', load: '92%' },
    { id: 'H3', region: 'South Hub (Bangalore/Chennai)', status: 'Active', latency: '3.9K+ Creators', load: '78%' },
    { id: 'H4', region: 'East Hub (Kolkata/Guwahati)', status: 'Active', latency: '2.2K+ Creators', load: '64%' }
  ],
  analytics: {
    growth: [45, 52, 48, 70, 65, 85, 92],
    regions: [
      { name: 'Maharashtra', count: '5.8K', trend: '+12%' },
      { name: 'Delhi NCR', count: '4.5K', trend: '+8%' },
      { name: 'Karnataka', count: '3.9K', trend: '+15%' }
    ]
  }
};
