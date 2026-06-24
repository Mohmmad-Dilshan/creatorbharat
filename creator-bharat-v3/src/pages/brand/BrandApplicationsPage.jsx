import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../core/context';
import { LS, fmt } from '../../utils/helpers';
import { apiCall } from '../../utils/api';
import { Card, Bdg, Btn, Empty } from '../../components/common/Primitives';
import AuthGatekeeper from '../../components/auth/AuthGatekeeper';
import { 
  Users, CheckCircle2, XCircle, Clock, Star, 
  ExternalLink, MessageSquare, Filter, Search,
  Briefcase, TrendingUp
} from 'lucide-react';

const StatusBadge = ({ status }) => {
  const map = {
    applied: { color: 'blue', label: 'APPLIED' },
    shortlisted: { color: 'purple', label: 'SHORTLISTED' },
    selected: { color: 'green', label: 'SELECTED' },
    rejected: { color: 'red', label: 'REJECTED' }
  };
  const s = map[status] || map.applied;
  return <Bdg sm color={s.color}>{s.label}</Bdg>;
};

StatusBadge.propTypes = { status: PropTypes.string };

const ApplicantCard = ({ app, onShortlist, onSelect, onReject, onViewProfile, mob, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <Card style={{ padding: mob ? 20 : 28, marginBottom: 16 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: mob ? 'flex-start' : 'center', flexDirection: mob ? 'column' : 'row' }}>
        {/* Avatar */}
        <div style={{ width: 56, height: 56, borderRadius: 18, background: '#FF943112', display: 'grid', placeItems: 'center', color: '#FF9431', fontWeight: 950, fontSize: 20, flexShrink: 0 }}>
          {(app.applicantName || app.applicantEmail || 'C')[0].toUpperCase()}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
            <h4 style={{ fontSize: 17, fontWeight: 900, color: '#0f172a', margin: 0 }}>
              {app.applicantName || app.applicantEmail?.split('@')[0] || 'Creator'}
            </h4>
            <StatusBadge status={app.status} />
          </div>
          <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600, margin: '0 0 8px' }}>
            Campaign: <strong>{app.campaignTitle || 'Campaign'}</strong> · Applied {fmt.date(app.date)}
          </p>
          {app.pitch && (
            <div style={{ padding: 14, background: '#f8fafc', borderRadius: 14, border: '1px solid #f1f5f9', marginTop: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>PITCH</div>
              <p style={{ fontSize: 14, color: '#475569', fontWeight: 500, lineHeight: 1.5, margin: 0 }}>"{app.pitch}"</p>
            </div>
          )}
          {app.rate && (
            <div style={{ marginTop: 10, fontSize: 14, fontWeight: 800, color: '#0f172a' }}>
              Proposed Rate: <span style={{ color: '#FF9431' }}>{fmt.inr(app.rate)}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flexShrink: 0 }}>
          {app.status === 'applied' && (
            <>
              <Btn sm onClick={() => onShortlist(app)} style={{ background: '#7C3AED12', color: '#7C3AED', borderRadius: 12, border: '1px solid #7C3AED30' }}>
                <Star size={14} /> Shortlist
              </Btn>
              <Btn sm onClick={() => onReject(app)} style={{ background: '#EF444412', color: '#EF4444', borderRadius: 12, border: '1px solid #EF444430' }}>
                <XCircle size={14} /> Reject
              </Btn>
            </>
          )}
          {app.status === 'shortlisted' && (
            <Btn sm onClick={() => onSelect(app)} style={{ background: '#10B98112', color: '#10B981', borderRadius: 12, border: '1px solid #10B98130' }}>
              <CheckCircle2 size={14} /> Select
            </Btn>
          )}
          <Btn sm onClick={() => onViewProfile(app)} style={{ borderRadius: 12 }}>
            <ExternalLink size={14} />
          </Btn>
        </div>
      </div>
    </Card>
  </motion.div>
);

ApplicantCard.propTypes = {
  app: PropTypes.object.isRequired,
  onShortlist: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onViewProfile: PropTypes.func.isRequired,
  mob: PropTypes.bool,
  delay: PropTypes.number
};

export default function BrandApplicationsPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const statusMapDbToFe = {
    PENDING: 'applied',
    ACCEPTED: 'selected',
    REJECTED: 'rejected',
    SHORTLISTED: 'shortlisted'
  };

  const statusMapFeToDb = {
    applied: 'PENDING',
    selected: 'ACCEPTED',
    rejected: 'REJECTED',
    shortlisted: 'SHORTLISTED'
  };

  useEffect(() => {
    let active = true;
    async function loadApplications() {
      if (!st.user) return;
      try {
        const data = await apiCall('/applications/me');
        if (!active) return;
        const mapped = data.map(app => ({
          id: app.id,
          campaignId: app.campaignId,
          campaignTitle: app.campaign?.title || 'Campaign',
          applicantName: app.creator?.name || 'Creator',
          applicantEmail: app.creator?.user?.email || 'creator@example.com',
          pitch: app.pitch,
          rate: app.creator?.rateMin || 0,
          status: statusMapDbToFe[app.status] || 'applied',
          date: app.createdAt.split('T')[0],
          creatorHandle: app.creator?.handle
        }));
        
        if (mapped.length === 0) {
          const myCampaigns = LS.get('cb_campaigns', []).filter(c => c.brandEmail === st.user.email);
          const myCampaignIds = myCampaigns.map(c => c.id);
          const allApplications = LS.get('cb_applications', []);
          const fallback = allApplications
            .filter(app => myCampaignIds.includes(app.campaignId))
            .map(app => ({
              ...app,
              status: app.status || 'applied'
            }));
          setApplications(fallback);
        } else {
          setApplications(mapped);
        }
      } catch (err) {
        console.error('Failed to load applications:', err);
        if (active) {
          const myCampaigns = LS.get('cb_campaigns', []).filter(c => c.brandEmail === st.user?.email);
          const myCampaignIds = myCampaigns.map(c => c.id);
          const allApplications = LS.get('cb_applications', []);
          setApplications(allApplications.filter(app => myCampaignIds.includes(app.campaignId)));
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    loadApplications();
    return () => { active = false; };
  }, [st.user]);

  if (!st.user || st.role !== 'brand') {
    return <AuthGatekeeper mob={mob} role="brand" />;
  }

  const brandApplications = applications;

  const filtered = useMemo(() => {
    let list = brandApplications;
    if (filter !== 'all') list = list.filter(a => a.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(a => 
        (a.applicantName || '').toLowerCase().includes(q) ||
        (a.applicantEmail || '').toLowerCase().includes(q) ||
        (a.campaignTitle || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [brandApplications, filter, search]);

  const updateStatus = async (app, newStatus) => {
    try {
      const apiStatus = statusMapFeToDb[newStatus] || 'PENDING';
      await apiCall(`/applications/${app.id}`, {
        method: 'PUT',
        body: { status: apiStatus }
      });
      setApplications(prev => prev.map(a => a.id === app.id ? { ...a, status: newStatus } : a));
      dsp({ t: 'TOAST', d: { type: 'success', msg: `Creator ${newStatus} for ${app.campaignTitle}` } });
    } catch (err) {
      console.error('Failed to update status:', err);
      dsp({ t: 'TOAST', d: { type: 'error', msg: err.message || 'Failed to update application status.' } });
    }
  };

  const counts = {
    all: brandApplications.length,
    applied: brandApplications.filter(a => a.status === 'applied').length,
    shortlisted: brandApplications.filter(a => a.status === 'shortlisted').length,
    selected: brandApplications.filter(a => a.status === 'selected').length,
  };

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="db-page-header">
        <div className="badge-saffron" style={{ color: '#10B981' }}>
          <Users size={14} /> TALENT PIPELINE
        </div>
        <h1 className="page-title">Campaign Applications</h1>
        <p className="db-sub-text">Review, shortlist, and select creators who applied to your campaigns.</p>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Total', value: counts.all, icon: Briefcase, color: '#3B82F6' },
          { label: 'New', value: counts.applied, icon: Clock, color: '#FF9431' },
          { label: 'Shortlisted', value: counts.shortlisted, icon: Star, color: '#7C3AED' },
          { label: 'Selected', value: counts.selected, icon: CheckCircle2, color: '#10B981' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card style={{ padding: 20, textAlign: 'center' }}>
              <s.icon size={20} color={s.color} style={{ marginBottom: 8 }} />
              <div style={{ fontSize: 28, fontWeight: 950, color: '#0f172a' }}>{s.value}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>{s.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', background: '#f1f5f9', padding: 4, borderRadius: 14, gap: 4 }}>
          {['all', 'applied', 'shortlisted', 'selected'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{ padding: '10px 18px', borderRadius: 10, border: 'none', background: filter === f ? '#fff' : 'transparent', color: filter === f ? '#0f172a' : '#64748b', fontSize: 13, fontWeight: 800, cursor: 'pointer', boxShadow: filter === f ? '0 2px 8px rgba(0,0,0,0.05)' : 'none' }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} {counts[f] > 0 ? `(${counts[f]})` : ''}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', background: '#f8fafc', borderRadius: 14, padding: '10px 16px', border: '1px solid #f1f5f9' }}>
          <Search size={16} color="#94a3b8" style={{ marginRight: 10 }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search applicants..." style={{ border: 'none', background: 'none', outline: 'none', fontSize: 14, fontWeight: 600, color: '#0f172a', width: '100%' }} />
        </div>
      </div>

      {/* Applications List */}
      {filtered.length === 0 ? (
        <div style={{ padding: '80px 0' }}>
          <Empty
            icon="📋"
            title={brandApplications.length === 0 ? 'No Applications Yet' : 'No matches'}
            sub={brandApplications.length === 0 ? 'Creators will appear here once they apply to your campaigns. Launch a campaign to get started!' : 'Try a different filter or search term.'}
            ctaLabel={brandApplications.length === 0 ? 'Launch Campaign' : undefined}
            onCta={brandApplications.length === 0 ? () => navigate('/campaign-builder') : undefined}
          />
        </div>
      ) : (
        filtered.map((app, i) => (
          <ApplicantCard
            key={app.id}
            app={app}
            mob={mob}
            delay={i * 0.04}
            onShortlist={(a) => updateStatus(a, 'shortlisted')}
            onSelect={(a) => updateStatus(a, 'selected')}
            onReject={(a) => updateStatus(a, 'rejected')}
            onViewProfile={(a) => navigate(`/creator/${a.applicantEmail?.split('@')[0] || 'elite'}`)}
          />
        ))
      )}
    </div>
  );
}
