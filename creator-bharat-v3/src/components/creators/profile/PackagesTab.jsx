import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, Calculator, TrendingUp, Target, Users, Percent, ArrowRight } from 'lucide-react';
import { useApp } from '../../../core/context';
import { Card } from '../../common/Primitives';
import { TrustBadge, TabNavigator, TabEmptyState, GatedOverlay } from './ProfileShared';

const convertValue = (val, targetCurrency) => {
  if (!val || val === 'Custom' || val === 'Custom Quote') return val;
  if (targetCurrency === 'INR') return val;
  
  // Extract number from value (e.g. "₹12,500" -> 12500)
  const num = parseInt(val.replace(/[^0-9]/g, ''), 10);
  if (isNaN(num)) return val;
  
  const converted = Math.round(num / 83);
  return `$${converted.toLocaleString('en-US')} USD`;
};

const PackageCard = ({ p, onSelect, mob }) => (
  <Card style={{ 
    padding: mob ? '24px' : '32px', 
    borderRadius: '40px', 
    border: p.pop ? '2px solid #FF9431' : '1.5px solid #f1f5f9', 
    position: 'relative', 
    display: 'flex', 
    flexDirection: 'column', 
    background: '#fff', 
    boxShadow: p.pop ? '0 20px 40px rgba(255,148,49,0.1)' : 'none',
    width: mob ? '290px' : '100%',
    flexShrink: mob ? 0 : 1
  }}>
    {p.pop && <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#FF9431', color: '#fff', padding: '4px 16px', borderRadius: '100px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Most Popular</div>}
    <div style={{ marginBottom: '24px' }}>
      <div style={{ fontSize: '14px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{p.l}</div>
      <div style={{ fontSize: '32px', fontWeight: 950, color: '#0f172a' }}>{p.v}</div>
    </div>
    <div style={{ flex: 1, marginBottom: '32px' }}>
      {p.items.map((item) => (
        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: '#64748b', fontWeight: 600 }}>
          <CheckCircle2 size={16} color="#10B981" /> {item}
        </div>
      ))}
    </div>
    <button 
      onClick={() => onSelect(p)} 
      style={{ width: '100%', padding: '16px', borderRadius: '100px', background: p.pop ? 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)' : '#1e293b', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      Select Package
    </button>
  </Card>
);
PackageCard.propTypes = { 
  p: PropTypes.shape({
    l: PropTypes.string.isRequired,
    v: PropTypes.string.isRequired,
    pop: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onSelect: PropTypes.func.isRequired 
};

const CollabFAQ = ({ mob }) => (
  <div style={{ marginTop: mob ? '32px' : '80px', background: '#f8fafc', padding: mob ? '32px' : '60px', borderRadius: '40px', border: '1.5px solid #f1f5f9' }}>
     <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '40px', textAlign: 'center' }}>Collaboration Intelligence (FAQ)</h3>
     <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: '24px' }}>
        {[
          { q: 'What is the typical turnaround time?', a: 'For cinematic reels, it is 5-7 working days. Express delivery (48hrs) is available for select packages.' },
          { q: 'How do revisions work?', a: 'Every package includes 2 rounds of creative revisions to ensure the content aligns with brand guidelines.' },
          { q: 'Are raw files provided?', a: 'Raw footage can be provided as an add-on or included in the Brand Partner tier.' },
          { q: 'Usage rights for content?', a: 'Digital usage rights for 6 months are included in all professional tiers.' }
        ].map((f) => (
          <div key={f.q.slice(0, 20)} style={{ padding: '24px', background: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
             <div style={{ fontSize: '15px', fontWeight: 950, color: '#0f172a', marginBottom: '8px' }}>{f.q}</div>
             <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 500, lineHeight: 1.6 }}>{f.a}</div>
          </div>
        ))}
     </div>
  </div>
);
CollabFAQ.propTypes = { mob: PropTypes.bool };

const CampaignCalculator = ({ c, currency, mob, setActiveTab }) => {
  const [platform, setPlatform] = React.useState('mixed'); // mixed, instagram, youtube
  
  // Dynamic ranges based on currency
  const minBudget = currency === 'INR' ? 15000 : 200;
  const maxBudget = currency === 'INR' ? 300000 : 3600;
  const step = currency === 'INR' ? 5000 : 50;
  const defaultBudget = currency === 'INR' ? 50000 : 600;
  
  const [budget, setBudget] = React.useState(defaultBudget);

  // Synchronize budget default when currency changes
  React.useEffect(() => {
    if (currency === 'INR') {
      setBudget(prev => {
        if (prev < 1000) {
          return Math.round((prev * 83) / 5000) * 5000;
        }
        return prev;
      });
    } else {
      setBudget(prev => {
        if (prev >= 1000) {
          return Math.round((prev / 83) / 50) * 50;
        }
        return prev;
      });
    }
  }, [currency]);

  // Real-world benchmark stats for calculations
  const getMetrics = () => {
    const budgetInINR = currency === 'INR' ? budget : budget * 83;
    
    let cpm, er, cr, roiMult;
    if (platform === 'instagram') {
      cpm = 180;
      er = 0.042;
      cr = 0.012;
      roiMult = 2.8;
    } else if (platform === 'youtube') {
      cpm = 280;
      er = 0.058;
      cr = 0.018;
      roiMult = 3.4;
    } else {
      cpm = 220;
      er = 0.048;
      cr = 0.015;
      roiMult = 3.1;
    }

    const reach = Math.round((budgetInINR / cpm) * 1000);
    const engagements = Math.round(reach * er);
    const conversions = Math.round(engagements * cr);
    const mediaValue = Math.round(budget * roiMult);

    return { reach, engagements, conversions, mediaValue, roiMult };
  };

  const { reach, engagements, conversions, mediaValue, roiMult } = getMetrics();

  // Determine dynamic deliverables text based on budget
  const getDeliverables = () => {
    const budgetInINR = currency === 'INR' ? budget : budget * 83;
    if (budgetInINR < 25000) {
      return {
        title: 'Starter Pack Deliverables',
        items: [
          '1 Cinematic Reel or Post',
          '2 Interactive Stories (with Link)',
          'Analytics report after 48 hours',
          'Standard turnaround time (7 days)'
        ]
      };
    } else if (budgetInINR < 75000) {
      return {
        title: 'Growth Accelerator Deliverables',
        items: [
          '2 Premium Reels / Dedicated Posts',
          '4 Interactive Stories',
          'Bio Link Placement (3 days)',
          'Raw content access',
          'Turnaround time (5 days)'
        ]
      };
    } else if (budgetInINR < 150000) {
      return {
        title: 'Elite Brand Builder Deliverables',
        items: [
          '3 Cinematic Reels / Dedicated Videos',
          '6 Custom Stories with Link',
          'Bio Link Placement (7 days)',
          'Brand whitelist rights (30 days)',
          'Express delivery (3 days)'
        ]
      };
    } else {
      return {
        title: 'Omnichannel Partner Deliverables',
        items: [
          'Dedicated long-form video integration',
          '5 Cross-posted Reels',
          'Unlimited Story coverage during launch',
          'Permanent Link-in-Bio',
          'Exclusive niche category buyout (3 months)'
        ]
      };
    }
  };

  const deliverables = getDeliverables();

  const handleDraftProposal = () => {
    const formattedBudget = currency === 'INR' ? `₹${budget.toLocaleString('en-IN')}` : `$${budget.toLocaleString('en-US')} USD`;
    const platformName = platform === 'instagram' ? 'Instagram' : platform === 'youtube' ? 'YouTube' : 'Cross-Platform Mixed';
    
    const draftText = `Hi ${c.name || 'Creator'}, we are interested in collaborating with you. We simulated a campaign using your Profile ROI Calculator with a budget of ${formattedBudget} on ${platformName}.\n\nWe project to hit:\n- Est. Reach: ~${reach.toLocaleString()} views\n- Est. Engagements: ~${engagements.toLocaleString()} interactions\n- Projected Media Value: ${currency === 'INR' ? '₹' : '$'}${mediaValue.toLocaleString()} (${roiMult}x ROI)\n\nWe would love to discuss custom deliverables and lock this campaign schedule. Let us know your availability!`;

    localStorage.setItem(`draft_campaign_${c.id}`, draftText);
    setActiveTab('connect');
    
    setTimeout(() => {
      const el = document.getElementById('quick-connect');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const formatCurrency = (val) => {
    return currency === 'INR' ? `₹${val.toLocaleString('en-IN')}` : `$${val.toLocaleString('en-US')}`;
  };

  return (
    <Card style={{ 
      padding: mob ? '28px 20px' : '48px', 
      borderRadius: '40px', 
      border: '1.5px solid rgba(226, 232, 240, 0.8)',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
      boxShadow: '0 20px 40px rgba(15,23,42,0.03)',
      marginTop: mob ? '32px' : '64px',
      marginBottom: mob ? '32px' : '64px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: '0', left: '0', width: '4px', height: '100%', background: '#FF9431' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <Calculator size={24} color="#FF9431" />
        <span style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Interactive Planning Suite
        </span>
      </div>
      <h3 style={{ fontSize: mob ? '22px' : '28px', fontWeight: 950, color: '#0f172a', marginBottom: '12px' }}>
        Campaign ROI & Budget Estimator
      </h3>
      <p style={{ fontSize: '15px', color: '#64748b', fontWeight: 550, lineHeight: 1.6, marginBottom: '32px', maxWidth: '750px' }}>
        Configure your campaign parameters to simulate live impressions, engagement multipliers, and brand conversion indices powered by {c.name}'s verified performance benchmarks.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '40px', alignItems: 'start' }}>
        
        {/* Left Column: Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Platform Selector */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
              1. Select Campaign Channel
            </div>
            <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '16px', border: '1px solid #e2e8f0', gap: '4px' }}>
              {[
                { id: 'mixed', label: 'Mixed Channels' },
                { id: 'instagram', label: 'Instagram' },
                { id: 'youtube', label: 'YouTube' }
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  style={{
                    flex: 1,
                    padding: '10px 8px',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    background: platform === p.id ? '#fff' : 'transparent',
                    color: platform === p.id ? '#0f172a' : '#64748b',
                    boxShadow: platform === p.id ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Range Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                2. Set Campaign Budget
              </span>
              <span style={{ fontSize: '24px', fontWeight: 950, color: '#FF9431' }}>
                {formatCurrency(budget)}
              </span>
            </div>
            
            <div style={{ position: 'relative', width: '100%', padding: '10px 0' }}>
              <input 
                type="range"
                min={minBudget}
                max={maxBudget}
                step={step}
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: '#FF9431',
                  height: '6px',
                  borderRadius: '100px',
                  cursor: 'pointer',
                  background: 'linear-gradient(90deg, #FF9431 0%, #EA580C 100%)'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>
                <span>Min: {formatCurrency(minBudget)}</span>
                <span>Max: {formatCurrency(maxBudget)}</span>
              </div>
            </div>
          </div>

          {/* Dynamic Deliverables Box */}
          <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', border: '1.5px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 4px 16px rgba(0,0,0,0.01)' }}>
            <div style={{ fontSize: '12px', fontWeight: 950, color: '#0f172a', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.5px' }}>
              {deliverables.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {deliverables.items.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'start', gap: '8px', fontSize: '13px', color: '#475569', fontWeight: 600, lineHeight: 1.4 }}>
                  <span style={{ color: '#FF9431', fontWeight: 900 }}>•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Projected ROI Outcomes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '-8px' }}>
            3. Projected ROI & Performance Outcomes
          </div>

          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            
            {/* Reach impressions card */}
            <div style={{ padding: '20px', background: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.01)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', marginBottom: '8px' }}>
                <Users size={16} />
                <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Est. Reach
                </span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 950, color: '#0f172a' }}>
                {reach.toLocaleString()}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 550, marginTop: '4px' }}>
                Target Views
              </div>
            </div>

            {/* Engagement Card */}
            <div style={{ padding: '20px', background: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.01)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', marginBottom: '8px' }}>
                <Percent size={16} />
                <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Engagements
                </span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 950, color: '#0f172a' }}>
                {engagements.toLocaleString()}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 550, marginTop: '4px' }}>
                Likes/Comments/Saves
              </div>
            </div>

            {/* Conversions Card */}
            <div style={{ padding: '20px', background: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.01)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', marginBottom: '8px' }}>
                <Target size={16} />
                <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Conversions
                </span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 950, color: '#0f172a' }}>
                {conversions.toLocaleString()}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 550, marginTop: '4px' }}>
                Link clicks/Actions
              </div>
            </div>

            {/* Media Value Card */}
            <div style={{ padding: '20px', background: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.01)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', marginBottom: '8px' }}>
                <TrendingUp size={16} />
                <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Media Value
                </span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 950, color: '#FF9431' }}>
                {formatCurrency(mediaValue)}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 550, marginTop: '4px' }}>
                {roiMult}x ROI Equivalent
              </div>
            </div>

          </div>

          {/* Action CTA Button */}
          <button
            onClick={handleDraftProposal}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '100px',
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(15,23,42,0.15)',
              transition: 'transform 0.2s',
              marginTop: '8px'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Draft Campaign Proposal <ArrowRight size={16} />
          </button>

        </div>

      </div>

    </Card>
  );
};

CampaignCalculator.propTypes = {
  c: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  mob: PropTypes.bool,
  setActiveTab: PropTypes.func.isRequired
};

export const PackagesTab = ({ c, mob, onSelect, setActiveTab, currency, setCurrency }) => {
  const { st } = useApp();
  const navigate = useNavigate();
  const isDummy = c.id === 'fallback';
  if (!c.packages && (!c.services || c.services.length === 0) && !isDummy) return <TabEmptyState title="Packages" icon={Zap} mob={mob} setActiveTab={setActiveTab} tabId="packages" />;
  
  const packages = c.packages || (c.services && c.services.length > 0 ? c.services.map((s, idx) => ({
    l: s.t,
    v: s.rate ? `₹${Number(s.rate).toLocaleString('en-IN')}` : 'Custom',
    pop: idx === 1,
    items: s.d ? s.d.split(',').map(item => item.trim()) : []
  })) : [
    { l: 'Starter Boost', v: '₹12,500', pop: false, items: ['1 Cinematic Reel', '2 Sequential Stories', 'Link in Bio (24hrs)', 'Standard Captioning'] },
    { l: 'Growth Engine', v: '₹35,000', pop: true, items: ['3 Premium Reels', '5 High-Impact Stories', 'Managed Briefing', 'Analytics Report', 'Scripting Included'] },
    { l: 'Brand Partner', v: 'Custom', pop: false, items: ['Exclusive Partnership', '6 Reels per Month', 'Product Integration', 'Usage Rights (6mo)', 'Event Attendance'] }
  ]);

  // Convert package values dynamically
  const convertedPackages = packages.map(p => ({
    ...p,
    v: convertValue(p.v, currency)
  }));

  const hasUser = !!st?.user;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      
      {/* Currency Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
         <div style={{ fontSize: '13px', fontWeight: 650, color: '#64748b' }}>
           * Rates are shown in {currency === 'INR' ? 'Indian Rupees (INR)' : 'US Dollars (USD)'} {currency === 'USD' && '(1 USD ≈ ₹83)'}
         </div>
         <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '100px', border: '1px solid #e2e8f0', marginLeft: 'auto' }}>
            <button 
              onClick={() => setCurrency('INR')} 
              style={{
                padding: '6px 14px', borderRadius: '100px', border: 'none', fontSize: '11px', fontWeight: 800, cursor: 'pointer',
                background: currency === 'INR' ? '#fff' : 'transparent',
                color: currency === 'INR' ? '#0f172a' : '#64748b',
                boxShadow: currency === 'INR' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '4px'
              }}
            >
              🇮🇳 INR (₹)
            </button>
            <button 
              onClick={() => setCurrency('USD')} 
              style={{
                padding: '6px 14px', borderRadius: '100px', border: 'none', fontSize: '11px', fontWeight: 800, cursor: 'pointer',
                background: currency === 'USD' ? '#fff' : 'transparent',
                color: currency === 'USD' ? '#0f172a' : '#64748b',
                boxShadow: currency === 'USD' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '4px'
              }}
            >
              🇺🇸 USD ($)
            </button>
         </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{ 
          display: mob ? 'flex' : 'grid', 
          gridTemplateColumns: mob ? 'none' : 'repeat(3, 1fr)', 
          gap: '24px', 
          overflowX: mob ? 'auto' : 'visible', 
          scrollbarWidth: 'none', 
          paddingBottom: '20px',
          filter: hasUser ? 'none' : 'blur(6px) grayscale(20%)',
          pointerEvents: hasUser ? 'auto' : 'none'
        }}>
           {convertedPackages.map((p) => (
             <PackageCard key={p.l} onSelect={onSelect} p={p} mob={mob} />
           ))}
        </div>
        {!hasUser && (
          <GatedOverlay 
            title="Collaboration Rates Gated" 
            description="Register as a verified Brand to unlock custom pricing sheets, specific campaign deliverables, and direct secure escrow bookings." 
            onCtaClick={() => navigate('/login')}
          />
        )}
      </div>
      <CampaignCalculator c={c} currency={currency} mob={mob} setActiveTab={setActiveTab} />
      <CollabFAQ mob={mob} />
      <div style={{ marginTop: 'auto', width: '100%' }}>
         <TrustBadge />
         <TabNavigator activeTab="packages" setActiveTab={setActiveTab} mob={mob} />
      </div>
    </motion.div>
  );
};
PackagesTab.propTypes = { 
  c: PropTypes.object.isRequired, 
  mob: PropTypes.bool, 
  onSelect: PropTypes.func.isRequired, 
  setActiveTab: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  setCurrency: PropTypes.func.isRequired
};
