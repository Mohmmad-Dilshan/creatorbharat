import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { apiCall } from '../theme';

// Modular Home Components
import Hero from '../components/home/Hero';
import CommunityPulse from '../components/home/CommunityPulse';
import PlatformShowcase from '../components/home/PlatformShowcase';
import Verification from '../components/home/Verification';
import FeaturedCreators from '../components/home/FeaturedCreators';
import Testimonials from '../components/home/Testimonials';
import Faq from '../components/home/Faq';
import Cta from '../components/home/Cta';

export default function HomePage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  useEffect(() => {
    setLoading(true);
    apiCall('/creators?limit=10').then(d => {
      const list = Array.isArray(d) ? d : (d.creators || []);
      setCreators(list);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const go = (p, sel) => { 
    dsp({ t: 'GO', p, sel }); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  return (
    <div style={{ background: '#fff' }}>
      <Hero mob={mob} st={st} dsp={dsp} go={go} />
      <FeaturedCreators mob={mob} creators={creators} go={go} loading={loading} />
      <CommunityPulse mob={mob} />
      <PlatformShowcase mob={mob} />
      <Testimonials mob={mob} />
      <Faq mob={mob} />
      <Cta mob={mob} go={go} />
    </div>
  );
}
