export const CALCULATOR_TYPES = [
  {
    id: "er",
    title: "Engagement Rate Calculator",
    desc: "Calculate your true audience engagement rate on Instagram or YouTube and compare against industry benchmarks.",
    color: "#FF9431"
  },
  {
    id: "valuation",
    title: "Brand Valuation Estimator",
    desc: "Estimate your earning potential per post, reel, or video based on local market supply and demand trends.",
    color: "#10B981"
  },
  {
    id: "budget",
    title: "Campaign Budget Planner",
    desc: "A tool for brands to estimate the budget required for influencer campaigns based on target metrics.",
    color: "#6366F1"
  }
];

export const BENCHMARKS = {
  instagram: [
    { range: "Below 1%", rating: "Low", desc: "Low engagement. Focus on interactive stories and community replies." },
    { range: "1% - 3%", rating: "Average", desc: "Healthy baseline. Standard for most micro and macro creators." },
    { range: "3% - 6%", rating: "High", desc: "Excellent audience connection. Highly desirable for premium brands." },
    { range: "Above 6%", rating: "Exceptional", desc: "Superstar engagement levels. Command premium pricing!" }
  ],
  youtube: [
    { range: "Below 2%", rating: "Low", desc: "Low view-to-sub ratio. Optimize thumbnails and video intros." },
    { range: "2% - 5%", rating: "Average", desc: "Good baseline. Typical of established channels." },
    { range: "5% - 9%", rating: "High", desc: "Strong retention. High mid-roll and integration value." },
    { range: "Above 9%", rating: "Exceptional", desc: "Extreme loyalty. Fanbase actively watches almost every upload." }
  ]
};

export const INDUSTRY_MULTIPLIERS = {
  tech: 1.4,
  fashion: 1.1,
  finance: 1.6,
  lifestyle: 1.0,
  gaming: 1.25,
  education: 1.15
};
