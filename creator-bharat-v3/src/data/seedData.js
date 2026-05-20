/**
 * seedData.js
 * 
 * High-quality fallback data for the platform when the API is unavailable.
 * Ensures the 'Elite' aesthetics are maintained even during backend downtime.
 */

export const SEED_CREATORS = [
  {
    id: 'arjun-kapoor',
    name: 'Arjun Kapoor',
    handle: 'arjun-kapoor',
    slug: 'arjun-kapoor',
    followers: 1200000,
    niche: ['Automobile', 'Lifestyle', 'Tech'],
    city: 'Mumbai',
    state: 'Maharashtra',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'An elite storyteller, lifestyle connoisseur, and automotive reviewer crafting cinematic narratives at the intersection of future technology and daily premium lifestyle across Bharat.',
    likes: 14582,
    tagline: 'Bridging elite luxury automobiles, futuristic tech, and authentic Indian storytelling.',
    philosophy: "Content creation isn't just about demonstrating silicon specifications or horsepower; it's about building a desire and connecting with the heart of every tech and auto lover in Bharat.",
    honest_review: "CreatorBharat V3 has completely transformed my brand collaboration pipeline. The media kit builder and live analytical proof allow me to close tier-1 automotive campaigns with absolute transparency and 3x faster response times.",
    ai_intel: {
      match: '98%',
      summary: 'Vibrant Cinematic Editing, Luxury Niche Authority, and High Conversion ROI Potential',
      stats: [
        { l: 'Brand Safety', v: '99% Secure' },
        { l: 'Retention Score', v: 'Excellent' },
        { l: 'ROI Potential', v: '5.2x' }
      ]
    },
    audience_desc: 'Arjun dominates premium urban demographics with a strong affinity for automobile upgrades, smartphone launches, and premium lifestyle acquisitions.',
    audience_hubs: [
      { l: 'Mumbai Metro', d: '48% Majority', p: 48 },
      { l: 'Delhi NCR', d: '32% Strong', p: 32 },
      { l: 'Pune & Bangalore', d: '20% Reach', p: 20 }
    ],
    expertise: [
      { t: 'Cinematography', items: ['Anamorphic Capture', 'Automotive Color Correction'], c: '#FF9431' },
      { t: 'Creative Writing', items: ['Hinglish Hooks', 'Engagement Retention Loops'], c: '#0ea5e9' },
      { t: 'Strategic Analytics', items: ['ROI Benchmarking', 'Conversion Campaign Paths'], c: '#10B981' }
    ],
    local_voice: "Being based in Mumbai gives me direct access to India's premium creative heart. My local hub presence connects brands natively to India's most affluent urban and regional demographics.",
    local_hubs: ['Mumbai', 'Delhi NCR', 'Pune'],
    local_penetration: '94%',
    regional_dialects: 'Hinglish, Hindi, Punjabi',
    local_impact_hubs: [
      { l: 'Mumbai Metro', v: '94%' },
      { l: 'Delhi NCR', v: '82%' },
      { l: 'Pune', v: '76%' }
    ],
    local_collab: true,
    viral_content: [
      { views: '2.4M', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=400' },
      { views: '1.8M', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400' },
      { views: '3.1M', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400' }
    ],
    case_studies: [
      { title: 'BMW India Premium X5 Launch', brand: 'BMW India', results: [{ l: 'Reach', v: '3.2M' }, { l: 'ROI', v: '5.2x' }] },
      { title: 'OnePlus 12 Launch Campaign', brand: 'OnePlus Bharat', results: [{ l: 'Clicks', v: '120K' }, { l: 'Sales Hub', v: '22K+' }] },
      { title: 'Premium Audio Drop', brand: 'Pioneer Gear', results: [{ l: 'Views', v: '2.1M' }, { l: 'Shares', v: '28K' }] }
    ],
    services: [
      { t: 'Cinematic Car Reviews', d: 'Custom-graded anamorphic 4K cinematic video reels featuring high-conversion visual storytelling.', c: '#FF9431' },
      { t: 'High-Retention Tech Placements', d: 'Premium native product integration in regular daily lifestyle segments.', c: '#0ea5e9' },
      { t: 'Strategic Collaborations', d: 'Consultations on targeting tier-1 urban tech-consumers and premium lifestyle buyers.', c: '#10b981' }
    ],
    packages: [
      { l: 'Premium Reel Launch', v: '₹45,000', pop: false, items: ['1 Premium 4K Reel', '3 Sequential Stories', 'Link in Bio (48 hours)', 'Full Color Grading'] },
      { l: 'Elite Impact Hub Campaign', v: '₹95,000', pop: true, items: ['3 Premium Reels', '5 Instagram Stories', 'Professional Scriptwriting', 'Audience Analytics Report', 'Usage Rights (3mo)'] },
      { l: 'Official Brand Partner', v: 'Custom', pop: false, items: ['Exclusive Partnership', '6 Reels per Month', 'Product Integration', 'Usage Rights (6mo)', 'Event Appearances'] }
    ],
    reviews: [
      { b: 'BMW India', r: 5, t: 'Absolutely elite execution. The premium X5 launch campaign delivered outstanding demographic retention.', u: 'Marketing Director', d: '1 week ago', type: 'brand', id: 'bmw' },
      { b: 'OnePlus Bharat', r: 5, t: 'The cinematic technology review reel was highly artistic and authentic. Outstanding conversion results!', u: 'Brand Lead', d: '3 weeks ago', type: 'brand', id: 'oneplus' },
      { b: 'Pioneer Gear', r: 5, t: 'Very cooperative, punctual, and strictly professional with creative revisions. Perfect alignment.', u: 'PR Manager', d: '2 months ago', type: 'brand', id: 'pioneer' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=400'
    ]
  },
  {
    id: 's1',
    name: 'Aman Deep',
    handle: 'amandeep',
    slug: 'amandeep',
    followers: 125000,
    niche: ['Tech', 'Lifestyle'],
    city: 'Mumbai',
    state: 'Maharashtra',
    image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400',
    photo: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400',
    bio: 'Tech enthusiast, gadget reviewer, and minimalist living advocate. Aman focuses on real-world technology utility, home automation, and smart lifestyle upgrades for the modern Indian household.',
    likes: 8492,
    tagline: 'Making high-end technology simple and highly functional for everyday life.',
    philosophy: 'Technology is at its best when it seamlessly blends into your life without calling too much attention to itself. Minimalist, clean, and highly productive.',
    ai_intel: {
      match: '96%',
      summary: 'Excellent Tech-Demographic Penetration, Minimalist Aesthetics, and Exceptionally High Engagement.',
      stats: [
        { l: 'Brand Safety', v: '100% Secure' },
        { l: 'Retention Score', v: 'Very Good' },
        { l: 'ROI Potential', v: '4.8x' }
      ]
    },
    audience_desc: "Aman's audience consists of tech-savvy urban young professionals looking for authentic reviews, productivity gear, and smart home appliances.",
    audience_hubs: [
      { l: 'Mumbai Metro', d: '40% Majority', p: 40 },
      { l: 'Delhi NCR', d: '30% Strong', p: 30 },
      { l: 'Bangalore Metro', d: '30% Reach', p: 30 }
    ],
    expertise: [
      { t: 'Tech Reviews', items: ['Unboxings', 'Stress Tests', 'Setup Guides'], c: '#0ea5e9' },
      { t: 'Minimalist Styling', items: ['Desk Setups', 'Smart Lighting Design'], c: '#FF9431' },
      { t: 'Digital Productivity', items: ['App Workflows', 'Time Management Hacks'], c: '#10B981' }
    ],
    local_voice: 'Being based in Mumbai gives me direct access to major tech launches and corporate brand headquarters. Natively connecting urban professionals.',
    local_hubs: ['Mumbai', 'Pune', 'Bangalore'],
    local_penetration: '91%',
    regional_dialects: 'Hinglish, Hindi, Marathi',
    local_impact_hubs: [
      { l: 'Mumbai Metro', v: '91%' },
      { l: 'Pune Metro', v: '78%' },
      { l: 'Bangalore Hub', v: '65%' }
    ],
    local_collab: true,
    viral_content: [
      { views: '1.6M', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400' },
      { views: '980K', img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=400' },
      { views: '2.2M', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400' }
    ],
    case_studies: [
      { title: 'Sony ANC Headphones Launch', brand: 'Sony India', results: [{ l: 'Reach', v: '1.8M' }, { l: 'ROI', v: '4.5x' }] },
      { title: 'Smart Workspace Makeover', brand: 'IKEA India', results: [{ l: 'Clicks', v: '95K' }, { l: 'Conversion', v: '14%' }] }
    ],
    services: [
      { t: 'Minimalist Desk Integrations', d: 'High-aesthetic workspace integration videos featuring premium tech accessories.', c: '#0ea5e9' },
      { t: 'Detailed Product Reviews', d: 'In-depth usage reviews focused on durability, function, and aesthetic compatibility.', c: '#FF9431' }
    ],
    packages: [
      { l: 'Minimalist Setup Slot', v: '₹25,000', pop: false, items: ['1 Premium Reels Placement', '2 Stories with Swipe Up', 'High-res setup images'] },
      { l: 'Full Video Review & Hub', v: '₹55,000', pop: true, items: ['Dedicated 5-min product video', '2 Dedicated Reels', '4 Stories with Direct Link', 'Permanent bio link (7 days)'] }
    ],
    reviews: [
      { b: 'Sony India', r: 5, t: 'Brilliant aesthetic presentation. Aman has an exceptional understanding of minimal branding.', u: 'Marketing Executive', d: '2 weeks ago', type: 'brand', id: 'sony' },
      { b: 'IKEA India', r: 5, t: 'The Desk Makeover campaign was visually stellar. Delivered 14% conversion on our table frames!', u: 'PR Lead', d: '1 month ago', type: 'brand', id: 'ikea' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400'
    ]
  },
  {
    id: 'priya-mehta',
    name: 'Priya Mehta',
    handle: 'priya-mehta',
    slug: 'priya-mehta',
    followers: 85000,
    niche: ['Travel', 'Fashion'],
    city: 'Mumbai',
    state: 'Maharashtra',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    bio: 'Travel documentarian and luxury fashion curator. Priya merges visual aesthetics with travel diaries, showcasing hidden heritage stays and ethnic apparel lines across Bharat.',
    likes: 12490,
    tagline: 'Exploring slow travel, heritage architecture, and sustainable luxury fashion.',
    philosophy: "Travel is not about visiting tourist hubs; it's about connecting with the local culture, supporting heritage crafts, and wearing clothes that tell a story.",
    ai_intel: {
      match: '97%',
      summary: 'Stellar Aesthetic Travel Vibe, Strong Female Audience Affinity, and Exceptional Brand Trust.',
      stats: [
        { l: 'Brand Safety', v: '100% Secure' },
        { l: 'Engagement rate', v: '9.2%' },
        { l: 'Conversion Multiplier', v: '5.6x' }
      ]
    },
    audience_desc: "Priya has a highly engaged female-skewed audience who trust her styling recommendations, sustainable fashion finds, and luxury boutique hotels.",
    audience_hubs: [
      { l: 'Delhi NCR', d: '52% Majority', p: 52 },
      { l: 'Jaipur Metro', d: '28% Strong', p: 28 },
      { l: 'Mumbai Metro', d: '20% Reach', p: 20 }
    ],
    expertise: [
      { t: 'Vibrant Storytelling', items: ['Heritage Stays Vlogging', 'Cultural Documentaries'], c: '#FF9431' },
      { t: 'Ethnic Style Styling', items: ['Sustainable Fabrics', 'Fusion Fashion Looks'], c: '#ec4899' },
      { t: 'High-Res Photography', items: ['Travel Portfolios', 'Architectural Backdrops'], c: '#10B981' }
    ],
    local_voice: "Operating from the historic streets of Delhi, I bring a native understanding of Indian craftsmanship and North India's richest heritage locations.",
    local_hubs: ['Delhi NCR', 'Jaipur', 'Udaipur'],
    local_penetration: '96%',
    local_collab: true,
    viral_content: [
      { views: '3.2M', img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=400' },
      { views: '2.4M', img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=400' },
      { views: '4.1M', img: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=400' }
    ],
    case_studies: [
      { title: 'Heritage Stay Summer Campaign', brand: 'Taj Heritage Hotels', results: [{ l: 'Reach', v: '2.5M' }, { l: 'Bookings', v: '420+' }] },
      { title: 'Sustainable Linen Drop', brand: 'FabIndia Sustainable', results: [{ l: 'Reach', v: '1.2M' }, { l: 'ROI', v: '5.6x' }] }
    ],
    services: [
      { t: 'Boutique Hotel Showcase', d: 'Immersive property walkthroughs showcasing design, food, and native experiences.', c: '#FF9431' },
      { t: 'High-Fashion Lookbooks', d: 'Custom styling lookbooks highlighting apparel lines in stunning travel backdrops.', c: '#ec4899' }
    ],
    packages: [
      { l: 'Heritage Reel Highlight', v: '₹35,000', pop: false, items: ['1 Cinematic Reels', '3 Styled Stories', 'Usage Rights for 1 Month'] },
      { l: 'Slow Travel Experience Hub', v: '₹80,000', pop: true, items: ['2 Cinematic Property Reels', '5 High-res lifestyle photos', 'Dedicated travel guide in bio (14 days)', 'Usage Rights for 3 Months'] }
    ],
    reviews: [
      { b: 'Taj Heritage', r: 5, t: 'Outstanding photography! Priya truly captured the essence of slow luxury in our luxury heritage hotel.', u: 'General Manager', d: '1 week ago', type: 'brand', id: 'taj' },
      { b: 'FabIndia', r: 5, t: 'The sustainable linen lookbook was stunning and drove high-fidelity organic conversions to our website.', u: 'Apparel Lead', d: '3 weeks ago', type: 'brand', id: 'fabindia' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=400'
    ]
  },
  {
    id: 'rahul-sharma',
    name: 'Rahul Sharma',
    handle: 'rahul-sharma',
    slug: 'rahul-sharma',
    followers: 210000,
    niche: ['Fitness', 'Health'],
    city: 'Jaipur',
    state: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    bio: 'Strength coach, functional fitness athlete, and healthy lifestyle developer. Rohan provides evidence-based workout routines, nutritional guides, and sustainable longevity tips.',
    likes: 15830,
    tagline: 'Democratizing evidence-based athletic training and sustainable functional nutrition.',
    philosophy: 'Fitness is not a temporary phase or aesthetic goal; it is a permanent framework for building a resilient mind, body, and long-term athletic capability.',
    ai_intel: {
      match: '98%',
      summary: 'Elite Scientific Athletic Training, Strong Working-Class Following, and Exceptional conversion rate on supplements.',
      stats: [
        { l: 'Brand Safety', v: '100% Secure' },
        { l: 'Retention rate', v: '94%' },
        { l: 'ROI Potential', v: '6.1x' }
      ]
    },
    audience_desc: "Rohan's audience comprises health-conscious urban professionals, fitness hobbyists, and amateur athletes aged 20-38.",
    audience_hubs: [
      { l: 'Bangalore Metro', d: '55% Majority', p: 55 },
      { l: 'Hyderabad Tech', d: '25% Strong', p: 25 },
      { l: 'Chennai Metro', d: '20% Reach', p: 20 }
    ],
    expertise: [
      { t: 'Strength & Conditioning', items: ['Functional Workouts', 'Posture Correction'], c: '#10B981' },
      { t: 'Evidence Nutrition', items: ['Macro Tracking', 'Clean Meal Preps'], c: '#FF9431' },
      { t: 'Longevity Coach', items: ['Mental Focus', 'Sleep Optimization'], c: '#0ea5e9' }
    ],
    local_voice: 'Based in the fitness-first hub of Bangalore, I connect directly with young tech professionals and corporate gym enthusiasts seeking science-backed advice.',
    local_hubs: ['Bangalore', 'Hyderabad', 'Chennai'],
    local_penetration: '92%',
    local_collab: true,
    viral_content: [
      { views: '4.5M', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400' },
      { views: '3.1M', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400' },
      { views: '2.8M', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400' }
    ],
    case_studies: [
      { title: 'Whey Protein Launch Campaign', brand: 'MyProtein India', results: [{ l: 'Reach', v: '2.8M' }, { l: 'Conversions', v: '18K Sales' }] },
      { title: 'Fitness App Growth Drive', brand: 'Cult.fit Elite', results: [{ l: 'App Installs', v: '32K' }, { l: 'ROI', v: '6.1x' }] }
    ],
    services: [
      { t: 'Science-Backed Supplements Reviews', d: 'Rigorous and honest ingredient analysis combined with functional tests.', c: '#10B981' },
      { t: 'Dynamic Fitness Workouts', d: 'Cinematic training guides and lifestyle hacks for busy working professionals.', c: '#FF9431' }
    ],
    packages: [
      { l: 'Workout Integration Slot', v: '₹30,000', pop: false, items: ['1 Workout Reels Integration', '2 Nutritional Stories', 'Supplements Link in bio (48 hours)'] },
      { l: 'Elite Athletic Transformation Campaign', v: '₹75,000', pop: true, items: ['3 Workout and diet Reels', '6 Detailed Stories', 'Custom fitness discount code creation', 'Supplements guide link (30 days)'] }
    ],
    reviews: [
      { b: 'MyProtein India', r: 5, t: 'Rohan is a consummate fitness professional. The supplement review campaign converted exceptionally well.', u: 'Partnership Manager', d: '2 weeks ago', type: 'brand', id: 'myprotein' },
      { b: 'Cult.fit Elite', r: 5, t: 'The evidence-backed workout integrations brought premium registrations to our mobile app. Highly recommended.', u: 'Growth Director', d: '1 month ago', type: 'brand', id: 'cult' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=400'
    ]
  },
  {
    id: 'sneha-iyer',
    name: 'Sneha Iyer',
    handle: 'sneha-iyer',
    slug: 'sneha-iyer',
    followers: 45000,
    niche: ['Food', 'Culture'],
    city: 'Chennai',
    state: 'Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    bio: 'Culinary storyteller, traditional recipe preserver, and food historian. Sanya explores the rich history behind regional Indian cooking, presenting simple kitchen hacks and street food guides.',
    likes: 9840,
    tagline: 'Reviving traditional regional flavors and documenting food histories.',
    philosophy: 'Indian cuisine is a beautiful, complex mosaic of local soil, historical trade routes, and ancestral kitchen wisdom. Every ingredient has a beautiful story to tell.',
    ai_intel: {
      match: '95%',
      summary: 'Excellent Food-Niche Engagement, High-Fidelity Cooking Demos, and Authentic Indian Audience Appeal.',
      stats: [
        { l: 'Brand Safety', v: '99% Secure' },
        { l: 'Engagement rate', v: '11.8%' },
        { l: 'ROI Potential', v: '5.1x' }
      ]
    },
    audience_desc: "Sanya is followed by home cooks, culinary students, and food explorers who value detailed cooking instructions and culinary culture.",
    audience_hubs: [
      { l: 'Jaipur Metro', d: '45% Majority', p: 45 },
      { l: 'Ahmedabad Metro', d: '30% Strong', p: 30 },
      { l: 'Delhi NCR', d: '25% Reach', p: 25 }
    ],
    expertise: [
      { t: 'Traditional Cooking', items: ['Regional Rajasthani Recipes', 'Fermentation Hacks'], c: '#FF9431' },
      { t: 'Food History Vlogging', items: ['Ingredient Origin Tales', 'Royal Kitchen Diaries'], c: '#0ea5e9' },
      { t: 'Culinary Photography', items: ['Premium Food Styling', 'Rustic Table setups'], c: '#10B981' }
    ],
    local_voice: 'Rooted in the royal culinary heritage of Jaipur, my cooking showcases the authentic, rich spices and slow-cooking techniques of traditional India.',
    local_hubs: ['Jaipur', 'Udaipur', 'Ahmedabad'],
    local_penetration: '94%',
    local_collab: true,
    viral_content: [
      { views: '2.8M', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400' },
      { views: '1.5M', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400' },
      { views: '3.6M', img: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=400' }
    ],
    case_studies: [
      { title: 'Organic Ghee Launch Campaign', brand: 'Aashirvaad Organic', results: [{ l: 'Reach', v: '1.9M' }, { l: 'Sales Growth', v: '22%' }] },
      { title: 'Kitchen Equipment Review Drive', brand: 'Wonderchef India', results: [{ l: 'Clicks', v: '85K' }, { l: 'ROI', v: '5.1x' }] }
    ],
    services: [
      { t: 'Regional Recipe Creation', d: 'Authentic cooking tutorials highlighting traditional spices and preparation techniques.', c: '#FF9431' },
      { t: 'Brand Cookware Placements', d: 'Organic product integrations in standard daily recipes and kitchen diaries.', c: '#0ea5e9' }
    ],
    packages: [
      { l: 'Traditional Recipe Slot', v: '₹22,000', pop: false, items: ['1 Cooking Tutorial Reel', '2 Ingredient Stories', 'Link in bio for recipe (24 hours)'] },
      { l: 'Elite Culinary Campaign Hub', v: '₹50,000', pop: true, items: ['3 Dedicated Cooking Reels', '5 Instagram Stories', 'Professional Food Styling', 'Product brand link permanent (14 days)'] }
    ],
    reviews: [
      { b: 'Aashirvaad Organic', r: 5, t: 'The Organic Ghee launch tutorial was beautifully filmed and brought high conversions for our premium segments.', u: 'Product Lead', d: '2 weeks ago', type: 'brand', id: 'aashirvaad' },
      { b: 'Wonderchef India', r: 5, t: 'Excellent cookware showcase. Sanya highlighted the durability and efficiency in a very authentic way.', u: 'Marketing Manager', d: '1 month ago', type: 'brand', id: 'wonderchef' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400'
    ]
  },
  { id: 's5', name: 'Vikram Singh', handle: 'vik_tech', followers: 320000, niche: ['Tech', 'Gaming'], city: 'Hyderabad', state: 'Telangana', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' }
];

export const SEED_CAMPAIGNS = [
  { id: 'c1', title: 'Summer Collection Launch', brand: 'Nykaa', budget: 500000, targetCity: 'Mumbai', status: 'active' },
  { id: 'c2', title: 'Tech Review Series', brand: 'Samsung', budget: 1200000, targetCity: 'Bangalore', status: 'active' },
  { id: 'c3', title: 'Fitness Challenge 2024', brand: 'Cult.fit', budget: 300000, targetCity: 'Delhi', status: 'completed' }
];
