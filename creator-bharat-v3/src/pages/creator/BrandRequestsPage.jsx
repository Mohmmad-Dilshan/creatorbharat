import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Inbox, MessageSquare, CheckCircle2, XCircle, FileText, ExternalLink } from 'lucide-react';
import { Btn, Card, Bdg } from '@/components/common/Primitives';
import { CreatorPageHeader } from './CreatorShellPage';
import { useApp } from '@/core/context';

export default function BrandRequestsPage() {
  const navigate = useNavigate();
  const { st } = useApp();
  const [requests, setRequests] = useState([]);
  const [selectedBrief, setSelectedBrief] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('cb_brand_requests');
    if (saved) {
      setRequests(JSON.parse(saved));
    } else {
      const defaultRequests = [
        { id: 1, brand: 'Nykaa', title: 'Beauty launch invite', budget: '₹25,000', status: 'new', brief: 'Showcase 3 new lipstick shades in a 60-sec Reel. Deliver within 7 days of agreement.' },
        { id: 2, brand: 'Samsung', title: 'Tech review shortlist', budget: '₹40,000', status: 'shortlisted', brief: 'Detailed review of Galaxy M series. Minimum 5 minutes, YouTube + 3 Instagram stories.' }
      ];
      setRequests(defaultRequests);
      localStorage.setItem('cb_brand_requests', JSON.stringify(defaultRequests));
    }
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = requests.map(r => r.id === id ? { ...r, status: newStatus } : r);
    setRequests(updated);
    localStorage.setItem('cb_brand_requests', JSON.stringify(updated));
  };

  return (
    <div className="dashboard-page-container">
      <CreatorPageHeader badge="BRAND REQUESTS" title="Inbound Brand Invites" subtitle="Brands that want to collaborate with you will appear here." icon={Inbox} />
      
      <div style={{ display: 'grid', gap: 18 }}>
        {requests.length === 0 && (
          <div style={{ padding: '60px 40px', textAlign: 'center', background: '#f8fafc', borderRadius: 24, color: '#64748b', fontWeight: 600 }}>
            <Inbox size={40} style={{ marginBottom: 16, opacity: 0.3 }} />
            <p style={{ fontSize: 16, fontWeight: 800, color: '#475569' }}>No brand requests yet</p>
            <p style={{ fontSize: 14, fontWeight: 500 }}>Complete your profile and get verified to start receiving brand invites.</p>
          </div>
        )}

        {requests.map(req => (
          <Card key={req.id} style={{ padding: 24, opacity: req.status === 'declined' ? 0.6 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <Bdg color={req.status === 'accepted' ? 'green' : req.status === 'declined' ? 'red' : req.status === 'shortlisted' ? 'purple' : 'saffron'} sm>
                    {req.status.toUpperCase()}
                  </Bdg>
                </div>
                <h3 style={{ margin: '0 0 6px', fontWeight: 950, color: '#0f172a', fontSize: 18 }}>{req.title}</h3>
                <p style={{ margin: '0 0 8px 0', color: '#64748b', fontWeight: 700 }}>{req.brand} · {req.budget}</p>
                {req.brief && (
                  <p style={{ margin: 0, fontSize: 13, color: '#94a3b8', lineHeight: 1.5, maxWidth: 400 }}>
                    {req.brief.slice(0, 80)}{req.brief.length > 80 ? '...' : ''}
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <Btn
                  sm
                  onClick={() => setSelectedBrief(req)}
                  style={{ borderRadius: 12 }}
                >
                  <FileText size={14} /> View Brief
                </Btn>

                {req.status !== 'accepted' && req.status !== 'declined' && (
                  <>
                    <Btn
                      sm
                      onClick={() => updateStatus(req.id, 'declined')}
                      style={{ background: '#fef2f2', color: '#ef4444', borderRadius: 12, border: '1px solid #fca5a5' }}
                    >
                      <XCircle size={14} /> Decline
                    </Btn>
                    <Btn
                      sm
                      onClick={() => updateStatus(req.id, 'accepted')}
                      style={{ background: '#0f172a', color: '#fff', borderRadius: 12 }}
                    >
                      <CheckCircle2 size={14} /> Accept
                    </Btn>
                  </>
                )}

                {req.status === 'accepted' && (
                  <Btn
                    sm
                    onClick={() => navigate('/creator/messages')}
                    style={{ background: '#ecfdf5', color: '#10b981', borderRadius: 12, border: '1px solid #6ee7b7' }}
                  >
                    <MessageSquare size={14} /> Chat with Brand
                  </Btn>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Brief Modal */}
      {selectedBrief && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={() => setSelectedBrief(null)}
        >
          <div
            style={{ background: '#fff', borderRadius: 32, padding: 40, maxWidth: 520, width: '100%', boxShadow: '0 40px 80px rgba(0,0,0,0.2)' }}
            onClick={e => e.stopPropagation()}
          >
            <h3 style={{ fontSize: 20, fontWeight: 950, color: '#0f172a', marginBottom: 8 }}>{selectedBrief.title}</h3>
            <p style={{ fontSize: 14, color: '#64748b', fontWeight: 700, marginBottom: 20 }}>{selectedBrief.brand} · {selectedBrief.budget}</p>
            <div style={{ padding: 20, background: '#f8fafc', borderRadius: 18, border: '1px solid #f1f5f9', marginBottom: 24 }}>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, fontWeight: 500, margin: 0 }}>{selectedBrief.brief}</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {selectedBrief.status !== 'accepted' && selectedBrief.status !== 'declined' && (
                <Btn full lg onClick={() => { updateStatus(selectedBrief.id, 'accepted'); setSelectedBrief(null); }} style={{ background: '#0f172a', color: '#fff', borderRadius: 100 }}>
                  Accept This Deal
                </Btn>
              )}
              <Btn full onClick={() => setSelectedBrief(null)} style={{ background: '#f8fafc', color: '#64748b', borderRadius: 100 }}>
                Close
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
