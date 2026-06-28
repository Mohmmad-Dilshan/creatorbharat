import React from 'react';
import {
  ExternalLink, Eye, UserCheck, UserX, Trash2, ChevronUp, ChevronDown, Building2, Target, Layers, DollarSign
} from 'lucide-react';
import {
  T, fmtINR, fmtNum, fmtDate, Badge, StatCard, SectionHeader, SearchBar, EmptyState, ActionBtn, DangerBtn, Table, Td
} from '../ui/Primitives';

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5173' : 'https://creatorbharat.com');

const STATUS_COLOR = {
  ACTIVE: T.green, PENDING: T.yellow, REJECTED: T.red, COMPLETED: T.blue,
  ACCEPTED: T.green, SHORTLISTED: T.purple, PAID: T.green, RELEASED: T.blue,
  REFUNDED: T.orange, ESCROW: T.yellow, CAMPAIGN_ESCROW: T.yellow,
  published: T.green, draft: T.muted
};

export default function BrandsSection({
  activeTab,
  brands,
  clearBrandForm,
  setCreateBrandModalOpen,
  brandSearch,
  setBrandSearch,
  filteredBrands,
  setEditingBrand,
  setEditBrandName,
  setEditBrandIndustry,
  setEditBrandWebsite,
  setEditBrandModalOpen,
  setSelectedBrand,
  setBrandDrawerOpen,
  handleToggleSuspension,
  handleDeleteBrand,
  campaigns,
  clearCampaignForm,
  setCreateCampaignModalOpen,
  campaignSearch,
  setCampaignSearch,
  filteredCampaigns,
  expandedCampaignId,
  handleToggleExpand,
  setEditingCampaign,
  setEditCampTitle,
  setEditCampDesc,
  setEditCampBudget,
  setEditCampPlatform,
  setEditCampNiche,
  setEditCampStatus,
  setEditCampaignModalOpen,
  handleDeleteCampaign,
  appsLoading,
  campaignApplications,
  handleUpdateAppStatus,
  allApplications,
  appSearch,
  setAppSearch,
  filteredApps,
  brandAnalytics,
  brandAnalyticSearch,
  setBrandAnalyticSearch,
  filteredBrandAnalytics,
  setActiveTab,
  payments,
  paymentSearch,
  setPaymentSearch,
  filteredPayments,
  handlePaymentOverride
}) {
  return (
    <>
      {/* ══ ALL BRANDS ═════════════════════════════════════════════════ */}
      {activeTab === 'brands' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
          <SectionHeader 
            title="All Brands" 
            badge={brands.length} 
            sub="Manage brand accounts, view campaigns and suspend violators" 
            action={<button onClick={() => { clearBrandForm(); setCreateBrandModalOpen(true); }} style={{ padding: '8px 18px', background: T.orange, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>+ New Brand</button>}
          />
          <SearchBar value={brandSearch} onChange={setBrandSearch} placeholder="Search brand name or industry..." />
          <Table cols={['Brand', 'Industry', 'Email', 'Campaigns', 'Status', { label: 'Actions', align: 'right' }]}>
            {filteredBrands.map(br => (
              <tr key={br.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                <Td bold>{br.companyName}</Td>
                <Td>{br.industry || '—'}</Td>
                <Td muted>{br.user?.email || '—'}</Td>
                <Td bold>{br._count?.campaigns || 0}</Td>
                <Td><Badge color={br.user?.isSuspended ? T.red : T.green}>{br.user?.isSuspended ? 'Suspended' : 'Active'}</Badge></Td>
                <Td right>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    <a href={`${FRONTEND_URL}/brand/dashboard`} target="_blank" rel="noopener noreferrer" style={{ padding: '5px 10px', background: T.blueLight, color: T.blue, borderRadius: 7, fontSize: 11, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <ExternalLink size={10} /> Dashboard
                    </a>
                    <ActionBtn small onClick={() => {
                      setEditingBrand(br);
                      setEditBrandName(br.companyName || '');
                      setEditBrandIndustry(br.industry || '');
                      setEditBrandWebsite(br.website || '');
                      setEditBrandModalOpen(true);
                    }} style={{ background: T.orangeLight, color: T.orange }}>✏️ Edit</ActionBtn>
                    <ActionBtn small onClick={() => { setSelectedBrand(br); setBrandDrawerOpen(true); }}><Eye size={11} /> View</ActionBtn>
                    <DangerBtn small onClick={() => handleToggleSuspension(br.user?.id, false)}>
                      {br.user?.isSuspended ? <UserCheck size={11} /> : <UserX size={11} />}
                      {br.user?.isSuspended ? 'Unban' : 'Suspend'}
                    </DangerBtn>
                    <DangerBtn small onClick={() => handleDeleteBrand(br.id)}>
                      <Trash2 size={11} /> Delete
                    </DangerBtn>
                  </div>
                </Td>
              </tr>
            ))}
          </Table>
          {filteredBrands.length === 0 && <EmptyState icon="🏢" msg="No brands match your search" />}
        </div>
      )}

      {/* ══ CAMPAIGNS ══════════════════════════════════════════════════ */}
      {activeTab === 'campaigns' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
          <SectionHeader 
            title="Campaign Manager" 
            badge={campaigns.length} 
            sub="Oversee all brand campaigns, inspect applications" 
            action={<button onClick={() => { clearCampaignForm(); setCreateCampaignModalOpen(true); }} style={{ padding: '8px 18px', background: T.orange, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>+ New Campaign</button>}
          />
          <SearchBar value={campaignSearch} onChange={setCampaignSearch} placeholder="Search campaign or brand..." />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filteredCampaigns.map(c => (
              <div key={c.id} style={{ border: `1px solid ${T.border}`, borderRadius: 14, overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', cursor: 'pointer', background: expandedCampaignId === c.id ? T.orangeLight : T.card }} onClick={() => handleToggleExpand(c.id)}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center', flex: 1 }}>
                    <div>
                      <div style={{ fontWeight: 800, color: T.navy, fontSize: 14 }}>{c.title}</div>
                      <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>by {c.brand?.companyName || '—'} · {fmtDate(c.createdAt)}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <Badge color={STATUS_COLOR[c.status] || T.muted}>{c.status || 'ACTIVE'}</Badge>
                    {c.budget && <Badge color={T.green}>₹{fmtNum(c.budget)}</Badge>}
                    <span style={{ fontSize: 11, color: T.orange, fontWeight: 700 }}>Applications ↕</span>
                    {expandedCampaignId === c.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    <ActionBtn small onClick={(e) => {
                      e.stopPropagation();
                      setEditingCampaign(c);
                      setEditCampTitle(c.title || '');
                      setEditCampDesc(c.description || '');
                      setEditCampBudget(c.budget || 0);
                      setEditCampPlatform((c.platform || []).join(', '));
                      setEditCampNiche((c.niche || []).join(', '));
                      setEditCampStatus(c.status || 'ACTIVE');
                      setEditCampaignModalOpen(true);
                    }} style={{ background: T.orangeLight, color: T.orange, padding: '4px 8px', borderRadius: 7 }}>✏️ Edit</ActionBtn>
                    <DangerBtn small onClick={(e) => { e.stopPropagation(); handleDeleteCampaign(c.id); }}><Trash2 size={11} /></DangerBtn>
                  </div>
                </div>
                {expandedCampaignId === c.id && (
                  <div style={{ borderTop: `1px solid ${T.border}`, padding: '16px 20px', background: T.bg }}>
                    {appsLoading ? <EmptyState icon="⏳" msg="Loading applications..." /> :
                      campaignApplications.length === 0 ? <EmptyState icon="📭" msg="No applications yet for this campaign" /> : (
                        <Table cols={['Creator', 'Pitch', 'Rating', 'Status', { label: 'Override Status', align: 'right' }]}>
                          {campaignApplications.map(app => (
                            <tr key={app.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                              <Td bold>{app.creator?.name || '—'} <span style={{ color: T.orange }}>@{app.creator?.handle}</span></Td>
                              <Td><span style={{ maxWidth: 200, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.pitch || '—'}</span></Td>
                              <Td>{app.rating ? `${app.rating}/5 ★` : '—'}</Td>
                              <Td><Badge color={STATUS_COLOR[app.status] || T.muted}>{app.status}</Badge></Td>
                              <Td right>
                                <div style={{ display: 'flex', gap: 5 }}>
                                  {['ACCEPTED', 'REJECTED', 'SHORTLISTED', 'PENDING'].filter(s => s !== app.status).map(s => (
                                    <ActionBtn key={s} small onClick={() => handleUpdateAppStatus(app.id, s)} color={STATUS_COLOR[s] || T.muted}>{s}</ActionBtn>
                                  ))}
                                </div>
                              </Td>
                            </tr>
                          ))}
                        </Table>
                      )}
                  </div>
                )}
              </div>
            ))}
          </div>
          {filteredCampaigns.length === 0 && <EmptyState icon="🎯" msg="No campaigns found" />}
        </div>
      )}

      {/* ══ ALL APPLICATIONS ═══════════════════════════════════════════ */}
      {activeTab === 'applications' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
          <SectionHeader title="All Campaign Applications" badge={allApplications.length} sub="Platform-wide view of all creator pitches" />
          <SearchBar value={appSearch} onChange={setAppSearch} placeholder="Search by creator, campaign, or status..." />
          <Table cols={['Creator', 'Campaign', 'Brand', 'Status', 'Rating', 'Date', { label: 'Override', align: 'right' }]}>
            {filteredApps.map(app => (
              <tr key={app.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                <Td bold>{app.creator?.name || '—'} <span style={{ color: T.orange, fontSize: 11 }}>@{app.creator?.handle}</span></Td>
                <Td bold>{app.campaign?.title || '—'}</Td>
                <Td muted>{app.campaign?.brand?.companyName || '—'}</Td>
                <Td><Badge color={STATUS_COLOR[app.status] || T.muted}>{app.status}</Badge></Td>
                <Td>{app.rating ? `${app.rating}★` : '—'}</Td>
                <Td muted>{fmtDate(app.createdAt)}</Td>
                <Td right>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {['ACCEPTED', 'REJECTED', 'PENDING'].filter(s => s !== app.status).map(s => (
                      <ActionBtn key={s} small onClick={() => handleUpdateAppStatus(app.id, s)} color={STATUS_COLOR[s] || T.muted}>{s}</ActionBtn>
                    ))}
                  </div>
                </Td>
              </tr>
            ))}
          </Table>
          {filteredApps.length === 0 && <EmptyState icon="📋" msg="No applications match your search" />}
        </div>
      )}

      {/* ══ BRAND ANALYTICS ════════════════════════════════════════════ */}
      {activeTab === 'brand-analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            <StatCard label="Total Brands" value={brands.length} icon={Building2} color={T.blue} />
            <StatCard label="Total Campaigns" value={campaigns.length} icon={Target} color={T.purple} />
            <StatCard label="Total Applications" value={allApplications.length} icon={Layers} color={T.orange} />
            <StatCard label="Total Escrow" value={fmtINR(payments.reduce((s, p) => s + (p.type === 'CAMPAIGN_ESCROW' ? p.amount : 0), 0))} icon={DollarSign} color={T.green} />
          </div>
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
            <SectionHeader title="Brand Performance Breakdown" sub="Campaign counts, applications received, and budget spent per brand" />
            <SearchBar value={brandAnalyticSearch} onChange={setBrandAnalyticSearch} placeholder="Search brand..." />
            <Table cols={['Brand', 'Industry', 'Total Campaigns', 'Applications', 'Budget Spent', 'Status', { label: 'Actions', align: 'right' }]}>
              {filteredBrandAnalytics.map(b => (
                <tr key={b.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <Td bold>{b.companyName}</Td>
                  <Td muted>{b.industry || '—'}</Td>
                  <Td bold>{b.totalCampaigns}</Td>
                  <Td>{b.totalApplications}</Td>
                  <Td bold><span style={{ color: T.green }}>{fmtINR(b.totalBudgetSpent)}</span></Td>
                  <Td><Badge color={b.isSuspended ? T.red : T.green}>{b.isSuspended ? 'Suspended' : 'Active'}</Badge></Td>
                  <Td right>
                    <ActionBtn small onClick={() => { setActiveTab('campaigns'); setCampaignSearch(b.companyName); }}><Target size={11} /> Campaigns</ActionBtn>
                  </Td>
                </tr>
              ))}
            </Table>
          </div>
        </div>
      )}

      {/* ══ PAYMENTS & ESCROW ══════════════════════════════════════════ */}
      {activeTab === 'escrows' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
          <SectionHeader title="Payments & Escrow" badge={payments.length} sub="Override campaign escrow releases and refunds" />
          <SearchBar value={paymentSearch} onChange={setPaymentSearch} placeholder="Search by type, ID, or status..." />
          <Table cols={['Order ID', 'Brand', 'Amount', 'Type', 'Status', 'Date', { label: 'Override', align: 'right' }]}>
            {filteredPayments.map(p => (
              <tr key={p.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                <Td muted><code style={{ fontSize: 11 }}>{p.razorpayOrderId?.slice(0, 18) || p.id?.slice(0, 12)}…</code></Td>
                <Td bold>{p.brand?.companyName || '—'}</Td>
                <Td bold><span style={{ color: T.green }}>{fmtINR(p.amount)}</span></Td>
                <Td><Badge color={T.blue}>{p.type}</Badge></Td>
                <Td><Badge color={STATUS_COLOR[p.status] || T.muted}>{p.status}</Badge></Td>
                <Td muted>{fmtDate(p.createdAt)}</Td>
                <Td right>
                  {p.type === 'CAMPAIGN_ESCROW' && p.status === 'PAID' && (
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <ActionBtn small onClick={() => handlePaymentOverride(p.id, 'RELEASE')} color={T.green}>Release</ActionBtn>
                      <ActionBtn small onClick={() => handlePaymentOverride(p.id, 'REFUND')} color={T.yellow}>Refund</ActionBtn>
                    </div>
                  )}
                </Td>
              </tr>
            ))}
          </Table>
          {filteredPayments.length === 0 && <EmptyState icon="💳" msg="No payments match your search" />}
        </div>
      )}
    </>
  );
}
