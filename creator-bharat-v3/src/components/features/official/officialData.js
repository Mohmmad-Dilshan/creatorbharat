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
    displayName: 'CreatorBharat Official',
    category: 'Science & Tech • Protocol Node 001',
    bio: "Building the Mastermind of Bharat's Creator Economy. 🇮🇳\nInfrastructure of Trust for 1.4B Voices.",
    website: 'www.creatorbharat.com',
  },
  hi: {
    username: 'creatorbharat',
    displayName: 'क्रिएटरभारत ऑफिशियल',
    category: 'विज्ञान और तकनीक • प्रोटोकॉल नोड 001',
    bio: "भारत की क्रिएटर इकोनॉमी का मास्टरमाइंड बनाना। 🇮🇳\n1.4B आवाजों के लिए विश्वास का बुनियादी ढांचा।",
    website: 'www.creatorbharat.com',
  },
  baseStats: { posts: 1240, followers: '58.4K', following: 128 },
  socialPlatforms: [
    { platform: 'Twitter', url: 'https://twitter.com/creatorbharat', handle: '@CreatorBharat' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/creatorbharat', handle: 'company/creatorbharat' },
    { platform: 'GitHub', url: 'https://github.com/creatorbharat', handle: 'creatorbharat' },
    { platform: 'Instagram', url: 'https://instagram.com/creatorbharat', handle: '@creatorbharat' },
    { platform: 'Discord', url: 'https://discord.gg/creatorbharat', handle: 'CreatorBharat HQ' }
  ],
  highlights: [
    { id: 'v1', label: 'v1.0 Core', icon: Code2, color: '#0f172a', stories: [{ title: 'The Platform Vision', text: 'Migrating 50,000+ nodes to a decentralized ledger.', date: 'Live' }] },
    { id: 'updates', label: 'Updates', icon: Zap, color: '#FF9431', stories: [{ title: 'New UI Live', text: 'Brand dashboards feature real-time sentiment analysis.', date: '2h ago' }] },
    { id: 'roadmap', label: 'Roadmap', icon: Rocket, color: '#3B82F6', stories: [{ title: 'Phase 2', text: 'Onboarding Tier-2 regional aggregators.', date: 'Next' }] },
    { id: 'founders', label: 'Founders', icon: Users, color: '#10B981', stories: [{ title: 'Leadership', text: 'Mohmmad Dilshan on the future of Bharat.', date: 'Official' }] }
  ],
  posts: [
    {
      id: 1,
      title: 'CORE_PROTOCOL',
      category: 'Core System',
      date: 'June 10, 2026',
      readTime: '4 min read',
      icon: Code2,
      color: '#0f172a',
      summary: 'Migrating 50,000+ regional nodes to stateful trust architectures and unified brand-creator handshakes.',
      fullContent: `CreatorBharat has officially deployed the v1.0 Protocol Engine. This upgrade overhauls the sync-frequency model, allowing brand consoles to view real-time creator availability.
      
      Key Enhancements:
      • Decentralized Sync Engine: Syncing nodes across state shards has been reduced to 12ms average latency.
      • State Management: Refined the OAuth key exchange protocol for brand access tokens.
      • Performance Optimization: Bundled with modern compression standards to reduce client-side footprint by 42%.`
    },
    {
      id: 2,
      title: 'ROADMAP_Q3',
      category: 'Product Path',
      date: 'June 01, 2026',
      readTime: '3 min read',
      icon: Rocket,
      color: '#FF9431',
      summary: 'Unveiling the Creator Matching AI and decentralized escrow milestones scheduled for Q3-Q4.',
      fullContent: `As we cross our core milestones, the next phase of the CreatorBharat roadmap focuses on predictive matchmaking.
      
      Roadmap Highlights:
      • AI Matching Engine (Beta): Automated matching of campaign goals to creator demographics with 95%+ success probability.
      • Escrow Milestone Ledgers: Integration of dynamic payouts based on visual asset verification checks.
      • Creator Score V2: Incorporating continuous engagement parameters into the public reputation score.`
    },
    {
      id: 3,
      title: 'REGION_SYNC',
      category: 'Infrastructure',
      date: 'May 24, 2026',
      readTime: '5 min read',
      icon: Globe,
      color: '#3B82F6',
      summary: 'Deployment of localized edge-sync nodes in Maharashtra, UP, and Karnataka shards.',
      fullContent: `To achieve our mission of empowering the next billion voices, regional latency must remain sub-50ms. We have launched three new edge nodes.
      
      Status updates:
      • Maharashtra Shard (S1): Fully active with 12.4K verified nodes synced.
      • Karnataka Shard (S2): Complete synchronization of brand analytics pipelines.
      • North India Shard (S4): Onboarding 20,000 Tier-2/3 creators in UP and Rajasthan clusters.`
    },
    {
      id: 4,
      title: 'AUTH_NODE',
      category: 'Security',
      date: 'May 15, 2026',
      readTime: '2 min read',
      icon: ShieldCheck,
      color: '#10B981',
      summary: 'How cryptographically signed handles prevent social spoofing and trust degradation.',
      fullContent: `Trust is the absolute core of our creator marketplace. Authenticators verify profiles before they gain the verified status badges.
      
      Security Features:
      • Signed Handshakes: Every agreement is signed using decentralized profile keys.
      • Spoofing Protection: Anti-impersonation checks run hourly against known digital signatures.
      • OAuth 2.1 Enforcement: Zero storage of third-party login credentials.`
    },
    {
      id: 5,
      title: 'SCORE_V2',
      category: 'Algorithms',
      date: 'May 08, 2026',
      readTime: '4 min read',
      icon: Activity,
      color: '#7C3AED',
      summary: 'Refactoring the Creator Score equation to value consistency and response times over raw followers.',
      fullContent: `Follower count is a legacy metric. The new Creator Reputation Score V2 focuses on conversion, campaign fulfillment, and communication efficiency.
      
      Score Components:
      • Fulfillment Rate (40%): Successful completion of milestones.
      • Quality Score (30%): Semantic review feedback from verified brand partners.
      • Reach & Engagement (30%): Core engagement distribution verified by regional node shards.`
    },
    {
      id: 6,
      title: 'DATA_LEDGER',
      category: 'Ledger Tech',
      date: 'April 28, 2026',
      readTime: '3 min read',
      icon: Cpu,
      color: '#000',
      summary: 'Deploying the transparent escrow ledger for secure, zero-friction brand payouts.',
      fullContent: `Payment delays damage creator relations. CreatorBharat Escrow Ledgers secure brand budgets and release them to creators instantly upon milestone sign-off.
      
      Ledger Mechanics:
      • Safe Hold: Funds are held in audited digital accounts.
      • Automated Releases: Once deliverables are uploaded and checked, funds release within 5 seconds.
      • Dispute Resolution: System escrow agents step in if deliverables deviate from the campaign briefs.`
    }
  ],
  liveFeed: [
    "Node 102 synced in Maharashtra",
    "Protocol v1.0 deployment started",
    "Security audit 100% completed",
    "New brand cluster synced in Delhi",
    "Regional shard update: UP-Node active"
  ],
  founder: {
    name: 'Mohmmad Dilshan',
    role: 'Founder & Chief Architect',
    location: 'Bhilwara, Rajasthan',
    vision: 'Democratizing the digital economy for the next billion users through decentralized intelligence.',
    achievements: ['50K+ Nodes Scaled', 'Creator Economy Pioneer', 'Bharat Protocol Visionary']
  },
  team: [
    {
      id: 'dilshan',
      name: 'Mohmmad Dilshan',
      role: 'Founder & Chief Architect',
      category: 'leadership',
      location: 'Bhilwara, Rajasthan',
      avatar: 'https://ui-avatars.com/api/?name=Mohmmad+Dilshan&background=0f172a&color=fff&size=256',
      bio: 'Democratizing the digital economy for the next billion users through decentralized intelligence and protocol sharding.',
      skills: ['System Architecture', 'Decentralized Networks', 'Product Strategy', 'Go/Rust'],
      linkedin: 'https://linkedin.com/in/mohmmad-dilshan',
      github: 'https://github.com/mohmmad-dilshan',
      verified: true
    },
    {
      id: 'divyansh',
      name: 'Divyansh Sharma',
      role: 'Head of Engineering / Lead Architect',
      category: 'engineering',
      location: 'Jaipur, Rajasthan',
      avatar: 'https://ui-avatars.com/api/?name=Divyansh+Sharma&background=3B82F6&color=fff&size=256',
      bio: 'Leading developer relations and building high-performance sync engines, real-time analytics pipelines, and trust consensus.',
      skills: ['React/Vite', 'NodeJS/Express', 'PostgreSQL', 'Redis', 'WebSockets'],
      linkedin: 'https://linkedin.com/in/divyansh-sharma',
      github: 'https://github.com/divyansh-sharma',
      verified: true
    },
    {
      id: 'ritesh',
      name: 'Ritesh Verma',
      role: 'Lead Product Designer',
      category: 'design',
      location: 'Delhi NCR',
      avatar: 'https://ui-avatars.com/api/?name=Ritesh+Verma&background=7C3AED&color=fff&size=256',
      bio: 'Creating immersive, high-fidelity user experiences and modular CSS systems for brand console dashboards.',
      skills: ['Figma', 'CSS/Animations', 'Design Systems', 'Framer Motion', 'Prototyping'],
      linkedin: 'https://linkedin.com/in/ritesh-verma',
      github: 'https://github.com/ritesh-verma',
      verified: true
    },
    {
      id: 'priya',
      name: 'Priya Nair',
      role: 'Head of Creator Relations',
      category: 'operations',
      location: 'Bangalore, Karnataka',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Nair&background=10B981&color=fff&size=256',
      bio: 'Managing community onboarding, event campaigns, and influencer-brand escrow operations across India.',
      skills: ['Creator Partnerships', 'Event Execution', 'Public Relations', 'Escrow Management'],
      linkedin: 'https://linkedin.com/in/priya-nair',
      github: '#',
      verified: true
    },
    {
      id: 'aarav',
      name: 'Aarav Singhal',
      role: 'Lead Trust & Security Architect',
      category: 'engineering',
      location: 'Bhilwara, Rajasthan',
      avatar: 'https://ui-avatars.com/api/?name=Aarav+Singhal&background=FF9431&color=fff&size=256',
      bio: 'Auditing secure escrow systems, decentralized key management, and brand authentication protocols.',
      skills: ['Cybersecurity', 'API Security', 'Smart Contracts', 'OAuth Nodes', 'Risk Audit'],
      linkedin: 'https://linkedin.com/in/aarav-singhal',
      github: 'https://github.com/aarav-singhal',
      verified: true
    }
  ],
  shards: [
    { id: 'S1', region: 'North Shard', status: 'Active', latency: '12ms', load: '64%' },
    { id: 'S2', region: 'South Shard', status: 'Syncing', latency: '45ms', load: '12%' },
    { id: 'S3', region: 'West Shard', status: 'Active', latency: '18ms', load: '82%' },
    { id: 'S4', region: 'East Shard', status: 'Active', latency: '22ms', load: '41%' }
  ],
  analytics: {
    growth: [45, 52, 48, 70, 65, 85, 92],
    regions: [
      { name: 'Maharashtra', count: '12.4K', trend: '+12%' },
      { name: 'Delhi NCR', count: '8.9K', trend: '+8%' },
      { name: 'Karnataka', count: '7.5K', trend: '+15%' }
    ]
  }
};
