import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Eye, User } from 'lucide-react';
import { useApp } from '@/core/context';
import { LS } from '@/utils/helpers';
import { Btn, Card, Bdg } from '@/components/common/Primitives';
import { CreatorPageHeader } from './CreatorShellPage';

const getCreator = (st) => {
  const all = LS.get('cb_creators', []);
  return st.user?.creatorProfile || all.find(c => c.email === st.user?.email) || st.user || {};
};

export default function PublicPreviewPage() {
  const { st } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const creator = getCreator(st);
  const handle = creator.handle || creator.slug || creator.id || 'fallback';

  React.useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  return (
    <div className="dashboard-page-container">
      <CreatorPageHeader
        badge="PUBLIC PROFILE PREVIEW"
        title="Preview What Brands Will See"
        subtitle="Your builder controls the same Identity, Story, Gallery, Pro Work, Local Hub, Packages, and Connect sections."
        icon={Eye}
      />

      <Card style={{ padding: 28 }}>
        <div style={{ display: 'flex', gap: 20, alignItems: mob ? 'flex-start' : 'center', flexDirection: mob ? 'column' : 'row' }}>
          <img
            src={creator.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name || st.user?.email || 'Creator')}&background=FF9431&color=fff`}
            alt=""
            style={{ width: 76, height: 76, borderRadius: 24, objectFit: 'cover', background: '#f1f5f9', flexShrink: 0 }}
          />
          <div style={{ flex: 1 }}>
            <Bdg color="saffron">CreatorBharat Public Card</Bdg>
            <h2 style={{ margin: '10px 0 6px', fontSize: mob ? 22 : 28, fontWeight: 950, color: '#0f172a' }}>{creator.name || 'Creator Profile'}</h2>
            <p style={{ margin: 0, color: '#64748b', fontWeight: 650, fontSize: 15, lineHeight: 1.6 }}>{creator.bio || 'Complete your public story from Profile Builder.'}</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', width: mob ? '100%' : 'auto' }}>
            <Btn full={mob} onClick={() => navigate('/creator/profile')} style={{ borderRadius: 14 }}>
              <User size={16} /> Edit Builder
            </Btn>
            <Btn full={mob} onClick={() => navigate(`/creator/${handle}`)} style={{ background: '#0f172a', color: '#fff', borderRadius: 14 }}>
              Open Full Preview <ExternalLink size={16} />
            </Btn>
          </div>
        </div>
      </Card>
    </div>
  );
}
