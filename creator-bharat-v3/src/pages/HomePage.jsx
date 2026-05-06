import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { useFeaturedCreators } from '../hooks/useFeaturedCreators';
import { useStateCreatorCounts } from '../hooks/useStateCreatorCounts';

// Home section components
import Hero from '../components/home/Hero';
import FeaturedCreators from '../components/home/FeaturedCreators';
import ImpactStats from '../components/home/ImpactStats';
import IndiaMap3D from '../components/IndiaMap3D/IndiaMap3D';
import CommunityPulse from '../components/home/CommunityPulse';
import PlatformShowcase from '../components/home/PlatformShowcase';
import Manifesto from '../components/home/Manifesto';
import Testimonials from '../components/home/Testimonials';
import Faq from '../components/home/Faq';
import Cta from '../components/home/Cta';

export default function HomePage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);

  // All data fetching via hooks — zero raw API calls in this file
  const { creators, loading } = useFeaturedCreators(10);
  const { stateCounts } = useStateCreatorCounts();

  useEffect(() => {
    const onResize = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const go = (p, sel) => {
    dsp({ t: 'GO', p, sel });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Section list — add/remove/reorder here only
  const sections = [
    { id: 'hero',      comp: <Hero mob={mob} st={st} dsp={dsp} go={go} /> },
    { id: 'creators',  comp: <FeaturedCreators mob={mob} creators={creators} go={go} loading={loading} /> },
    { id: 'impact',    comp: <ImpactStats mob={mob} /> },
    { id: 'map',       comp: <IndiaMap3D mob={mob} stateCounts={stateCounts} /> },
    { id: 'roadmap',   comp: <CommunityPulse mob={mob} /> },
    // Desktop-only sections
    ...(!mob ? [
      { id: 'showcase',  comp: <PlatformShowcase mob={mob} /> },
      { id: 'manifesto', comp: <Manifesto mob={mob} /> },
    ] : []),
    { id: 'blueprint', comp: <Testimonials mob={mob} /> },
    { id: 'faq',       comp: <Faq mob={mob} /> },
    { id: 'cta',       comp: <Cta mob={mob} go={go} /> },
  ];

  return (
    <div style={{ background: '#fff', overflowX: 'hidden' }}>
      {sections.map(s => (
        <div key={s.id} id={s.id}>
          {s.comp}
        </div>
      ))}
    </div>
  );
}
