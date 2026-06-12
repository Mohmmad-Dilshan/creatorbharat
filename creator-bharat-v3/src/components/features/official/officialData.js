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
  highlights: [
    { id: 'v3', label: 'V3 Core', icon: Code2, color: '#0f172a', stories: [{ title: 'The V3 Vision', text: 'Migrating 50,000+ nodes to a decentralized ledger.', date: 'Live' }] },
    { id: 'updates', label: 'Updates', icon: Zap, color: '#FF9431', stories: [{ title: 'New UI Live', text: 'Brand dashboards feature real-time sentiment analysis.', date: '2h ago' }] },
    { id: 'roadmap', label: 'Roadmap', icon: Rocket, color: '#3B82F6', stories: [{ title: 'Phase 2', text: 'Onboarding Tier-2 regional aggregators.', date: 'Next' }] },
    { id: 'founders', label: 'Founders', icon: Users, color: '#10B981', stories: [{ title: 'Leadership', text: 'Mohmmad Dilshan on the future of Bharat.', date: 'Official' }] }
  ],
  posts: [
    { id: 1, title: 'V3_PROTOCOL', icon: Code2, color: '#0f172a' },
    { id: 2, title: 'ROADMAP_Q3', icon: Rocket, color: '#FF9431' },
    { id: 3, title: 'REGION_SYNC', icon: Globe, color: '#3B82F6' },
    { id: 4, title: 'AUTH_NODE', icon: ShieldCheck, color: '#10B981' },
    { id: 5, title: 'SCORE_V2', icon: Activity, color: '#7C3AED' },
    { id: 6, title: 'DATA_LEDGER', icon: Cpu, color: '#000' }
  ],
  liveFeed: [
    "Node 102 synced in Maharashtra",
    "Protocol V3.2 deployment started",
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
