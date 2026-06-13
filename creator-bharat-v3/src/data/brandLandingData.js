import {
  BarChart3, Globe, Zap, Lock, MessageSquare, Briefcase, Target, ShieldCheck
} from 'lucide-react';

export const STATS = [
  { v: '2,400+', l: 'Verified Creators' },
  { v: '150+', l: 'Districts Covered' },
  { v: '0%', l: 'Commission Fee' },
  { v: '₹45Cr+', l: 'Deals Facilitated' },
];

export const FEATURES = [
  { icon: BarChart3, title: 'CB Score Database', desc: 'Every creator has a verified trust score (0-100) based on engagement quality, deal history, and community rating. No fake followers.', color: '#FF9431' },
  { icon: Globe, title: '3D Scout Maps', desc: 'Interactive India map showing creator density by state and district. Find hyperlocal talent in Tier 2 & 3 cities instantly.', color: '#3B82F6' },
  { icon: Zap, title: 'Sponsored Tasks Engine', desc: 'Launch micro-task campaigns targeting specific niches. Creators apply, execute, and get paid — all on platform.', color: '#10B981' },
  { icon: Lock, title: 'Escrow Protection', desc: 'Campaign funds are locked in secure escrow before any creator starts work. Released only on verified delivery.', color: '#7C3AED' },
  { icon: MessageSquare, title: 'Direct Creator Chat', desc: 'Pitch directly to verified creators without agency middlemen. Real conversations, real deals.', color: '#EC4899' },
  { icon: BarChart3, title: 'Campaign Analytics', desc: 'Track impressions, engagement, and ROI in real-time. Download reports for every campaign.', color: '#F59E0B' },
];

export const HOW_IT_WORKS = [
  { n: '01', title: 'Register Your Brand', desc: 'Create a free brand profile with company details, GSTIN, and work email verification.', icon: Briefcase },
  { n: '02', title: 'Scout Verified Creators', desc: 'Use CB Score filters, niche tags, and the 3D India map to find the perfect local creators.', icon: Target },
  { n: '03', title: 'Launch Campaign + Escrow', desc: 'Build your campaign brief, set budget, lock funds in escrow, and go live in minutes.', icon: ShieldCheck },
];

export const TESTIMONIALS = [
  { name: 'Rohan Mehta', role: 'Brand Director, PepsiCo India', quote: 'CreatorBharat solved our Tier 2 influencer outreach problem. We hired 45 creators across Rajasthan in days with zero agency overhead.', rating: 5 },
  { name: 'Ananya Sen', role: 'Influencer Marketing Lead, Nykaa', quote: 'The transparent escrow ledger is a game changer. We fund campaigns knowing our money is safe until deliverables are fully verified.', rating: 5 },
  { name: 'Vikram Joshi', role: 'Growth Head, Mamaearth', quote: 'CB Score filtering saved us weeks of vetting. We only talk to creators who have proven engagement — no bots, no fake numbers.', rating: 5 },
];

export const PLANS = [
  {
    name: 'Launchpad',
    price: 'Free',
    period: 'lifetime',
    desc: 'Register your brand identity and explore the creator catalog securely.',
    features: ['Register Company Profile', 'Explore Creator Catalog', 'Filter & Save Favorites', 'Access Community Forums', 'Standard Analytics'],
    cta: 'Start Scouting',
    isPro: false,
  },
  {
    name: 'Enterprise / Scale',
    price: '₹4,999',
    period: 'month',
    desc: 'Unlock premium AI intelligence, co-creation squads, and dedicated escrow.',
    features: ['Launch Unlimited Campaigns', 'Direct Outreach Pitch Console', 'Buy Co-Creation Bundles', 'Verified Gold Brand Badge', 'AI Smart Talent Matches', 'Advanced ROI Dashboard', '24/7 Dedicated Support'],
    cta: 'Scale Your Brand',
    isPro: true,
    promo: 'Early Bird: First 100 brands lock in at 50% discount forever!'
  },
];
