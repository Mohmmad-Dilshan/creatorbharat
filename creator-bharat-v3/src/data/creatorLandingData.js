import {
  ShieldCheck, Globe, Zap, Wallet, BarChart3, MessageSquare, Trophy, Gift, Calendar, Play, Users, Sparkles
} from 'lucide-react';

export const STATS = [
  { v: '2,400+', l: 'Verified Creators' },
  { v: '₹45Cr+', l: 'Paid to Creators' },
  { v: '0%', l: 'Commission Charged' },
  { v: '500+', l: 'Brand Partners' },
];

export const WHAT_YOU_GET = [
  { icon: ShieldCheck, title: 'Verified Elite Badge', desc: 'Get your official CreatorBharat blue badge. Brands trust verified creators 3x more. Stand out in every search.', color: '#3B82F6', tag: 'FREE' },
  { icon: Globe, title: 'Cinematic Public Profile', desc: 'Your own media kit page at creatorbharat.com/yourname — 8 tabs of portfolio, case studies, rates, and reviews.', color: '#FF9431', tag: 'FREE' },
  { icon: Zap, title: 'Brand Deal Marketplace', desc: 'Browse and apply to campaigns from verified brands. No agency middlemen. Direct escrow-secured payouts.', color: '#10B981', tag: 'FREE' },
  { icon: Wallet, title: 'Instant Wallet Payouts', desc: 'Earnings go directly to your bank via Razorpay. Zero brokerage. What you earn is 100% yours.', color: '#7C3AED', tag: 'FREE' },
  { icon: BarChart3, title: 'Creator Analytics', desc: 'Track profile views, brand interest, engagement trends, and campaign performance in real-time.', color: '#F59E0B', tag: 'PRO' },
  { icon: MessageSquare, title: 'Direct Brand Chat', desc: 'Message verified brands directly. No cold emails. No waiting. Secure encrypted conversations.', color: '#EC4899', tag: 'PRO' },
  { icon: Trophy, title: 'Play Button Milestones', desc: 'Earn physical trophies — Rising (10K), Bharat (50K), India (100K). Real recognition for real creators.', color: '#FF9431', tag: 'FREE' },
  { icon: Gift, title: 'Monthly Missions', desc: 'Complete platform tasks and earn cashback, credits, and Pro trial. Refer creators, post content, grow together.', color: '#10B981', tag: 'FREE' },
  { icon: Calendar, title: 'Exclusive Events', desc: 'Get invited to CreatorBharat Summits, workshops, and award nights. Network with top brands face-to-face.', color: '#7C3AED', tag: 'PRO' },
];

export const HOW_IT_WORKS = [
  { n: '01', icon: ShieldCheck, title: 'Create & Verify Profile', desc: 'Sign up free. Fill your 5-tab portfolio — Identity, Social, Story, Packages, Local Hub. Submit for verification.', color: '#FF9431' },
  { n: '02', icon: Zap, title: 'Get Discovered by Brands', desc: 'Your verified profile appears in brand searches. CB Score filter puts you in front of the right brands.', color: '#10B981' },
  { n: '03', icon: Wallet, title: 'Apply & Earn', desc: 'Apply to campaigns, complete deliverables, get paid via escrow. Zero commission. 100% yours.', color: '#7C3AED' },
];

export const MILESTONES = [
  { icon: '🌱', title: 'Rising Creator', req: '10K followers + CB Score 50+', reward: 'Starter Swag Kit + Digital Badge + Featured Profile', color: '#10B981' },
  { icon: '🏆', title: 'Bharat Creator', req: '50K followers + CB Score 70+ + 3 deals', reward: 'Rising Swag Kit + Summit Invite + T-shirt + Trophy', color: '#FF9431' },
  { icon: '🇮🇳', title: 'India Creator', req: '100K followers + CB Score 85+ + 10 deals', reward: 'Elite Trophy + Cash Bonus + National Brand Priority', color: '#7C3AED' },
];

export const UPCOMING_FEATURES = [
  { icon: Globe, title: 'Multi-Language Profiles', desc: 'Write your bio in Hindi, Rajasthani, or any regional language. Brands can auto-translate.', eta: 'Q3 2027' },
  { icon: Play, title: 'Video Media Kit', desc: 'Upload a 60-second intro video to your profile. Let brands see you before they hire you.', eta: 'Q2 2027' },
  { icon: Users, title: 'Co-Creation Bundles', desc: 'Team up with creators in your city. Offer joint packages to brands for higher payouts.', eta: 'Q3 2027' },
  { icon: ShieldCheck, title: 'Creator Union Protection', desc: 'If your account gets suspended on Instagram/YouTube, CB files collective appeals on your behalf.', eta: 'Q4 2027' },
  { icon: BarChart3, title: 'Live Social API Sync', desc: 'Connect Instagram/YouTube API for real-time follower and engagement data on your profile.', eta: 'Q1 2027' },
  { icon: Sparkles, title: 'AI Profile SEO', desc: 'AI writes an SEO article about you that ranks on Google. Brands find you organically.', eta: 'Q2 2027' },
];

export const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'lifetime',
    desc: 'Build your profile and start getting discovered.',
    features: ['Verified Profile Page', 'Basic Dashboard', 'View Campaign Catalog', 'Public Profile Handle', 'Play Button Milestones'],
    cta: 'Start Free',
    isPro: false,
  },
  {
    name: 'Creator Pro',
    price: '₹49',
    period: 'month',
    desc: 'Unlock everything — unlimited deals, direct chat, full analytics.',
    promo: 'SPECIAL: First 100 creators get 1 month FREE!',
    features: ['Unlimited Campaign Applications', 'Direct Brand Chat', 'Full Analytics Dashboard', 'Verified Blue Badge', 'Dynamic A4 Media Kit PDF', 'AI Profile SEO Article', 'Top Search Priority (Top 1%)', 'VIP Event Access'],
    cta: 'Claim Pro Access',
    isPro: true,
  },
];

export const TESTIMONIALS = [
  { name: 'Priya Mehta', role: 'Travel Creator, Mumbai · 85K followers', quote: 'CreatorBharat ne mujhe Taj Hotels ke saath directly connect kiya. No agency, no cuts. ₹80,000 ka deal 3 din mein close hua.', rating: 5 },
  { name: 'Rahul Sharma', role: 'Fitness Creator, Jaipur · 2.1L followers', quote: 'Mera CB Score 92 hai. Brands ab mujhe directly message karte hain. Pehle agency ke through 30% cut jaata tha — ab 0%.', rating: 5 },
  { name: 'Sneha Iyer', role: 'Food Creator, Chennai · 45K followers', quote: 'Tier-2 city mein hone ke bawajood mujhe national brands mil rahe hain. CreatorBharat ne meri reach national kar di.', rating: 5 },
];
