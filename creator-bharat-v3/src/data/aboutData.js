import { Award, Globe, TrendingUp } from 'lucide-react';

export const BLUEPRINT_CARDS = [
  {
    num: "01",
    title: "Verify Identity",
    sub: "Digital Pehchan",
    desc: "We verify the analytics, location, and brand-safety of regional creators so brands can bypass fake followers and hire authentic talent.",
    accent: "#FF9431"
  },
  {
    num: "02",
    title: "Bypass Middlemen",
    sub: "Direct Pitch SaaS",
    desc: "Brands pitch directly to creators in Tier 2 & 3 cities through our open marketplace. No agency gatekeepers or massive markups.",
    accent: "#10B981"
  },
  {
    num: "03",
    title: "Zero Broker Fees",
    sub: "Safe Escrow Ledgers",
    desc: "Payouts are secured in safe escrow ledgers and released immediately upon project completion. Best part? We charge 0% commission.",
    accent: "#3B82F6"
  }
];

export const TIMELINE_DATA = [
  {
    year: "2024: THE SPARK",
    title: "The Bhilwara Prototype",
    desc: "Identifying the massive gap between regional talent in Tier 2 & 3 cities and national brand opportunities. We tested our first directory manually mapping 150 local creators in Rajasthan.",
    stats: [
      { label: "Creators Mapped", value: "150+" },
      { label: "Target City", value: "Bhilwara" }
    ]
  },
  {
    year: "2025: THE INFRASTRUCTURE",
    title: "The Trust & Identity Layer",
    desc: "Launched our proprietary Creator Score algorithm and verified Digital Pehchan. This allowed upcoming creators to present data-validated analytics without expensive agencies.",
    stats: [
      { label: "Active Profiles", value: "1,200+" },
      { label: "System Trust Metric", value: "Blue Badges" }
    ]
  },
  {
    year: "2026: THE REVOLUTION",
    title: "Elite National Marketplace",
    desc: "Scaled CreatorBharat into an elite SaaS platform with zero broker fee policies, automated ROI calculators, interactive podium leaderboards, and safe escrow ledger systems.",
    stats: [
      { label: "Active Users", value: "2,400+" },
      { label: "Broker Fees Charged", value: "0%" }
    ]
  }
];

export const PHILOSOPHY_PILLARS = [
  {
    title: 'Identity',
    desc: 'Giving every creator a verified, data-backed professional portfolio that brands can trust.',
    features: ['Digital Pehchan Profile', 'Real-Time Engagement APIs', 'Anti-Fraud Score Metrics'],
    icon: Award,
    color: '#FF9431',
    badge: 'Infrastructure'
  },
  {
    title: 'Access',
    desc: 'Removing gatekeepers. Creators in small towns now apply directly to the biggest national brands.',
    features: ['Zero-Brokerage Escrow', 'Open Pitch Marketplace', 'Local Language Support'],
    icon: Globe,
    color: '#10B981',
    badge: 'Opportunity'
  },
  {
    title: 'Growth',
    desc: 'Providing the financial tools and analytics to scale from a local star to a national icon.',
    features: ['ROI Valuation Gauges', 'SaaS Media Kits', 'Fast Invoice Financing'],
    icon: TrendingUp,
    color: '#3B82F6',
    badge: 'Scale'
  }
];
