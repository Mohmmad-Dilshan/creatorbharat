import React from 'react';
import {
  ExternalLink, Wallet, Trophy, UserCheck, UserX, Trash2, RefreshCw
} from 'lucide-react';
import {
  T, fmtINR, fmtNum, fmtDate, fmtCompleteness, Badge, SectionHeader, SearchBar, EmptyState, ActionBtn, DangerBtn, Table, Td
} from '../ui/Primitives';

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5173' : 'https://creatorbharat.com');

const STATUS_COLOR = {
  ACTIVE: T.green, PENDING: T.yellow, REJECTED: T.red, COMPLETED: T.blue,
  ACCEPTED: T.green, SHORTLISTED: T.purple, PAID: T.green, RELEASED: T.blue,
  REFUNDED: T.orange, ESCROW: T.yellow, CAMPAIGN_ESCROW: T.yellow,
  published: T.green, draft: T.muted
};

export default function CreatorsSection({
  activeTab,
  creators,
  filteredCreators,
  creatorSearch,
  setCreatorSearch,
  clearCreatorForm,
  setCreateCreatorModalOpen,
  setEditingCreator,
  setEditCreName,
  setEditCreHandle,
  setEditCreBio,
  setEditCreCity,
  setEditCreState,
  setEditCreFollowers,
  setEditCreEngagementRate,
  setEditCreRateMin,
  setEditCreRateMax,
  setEditCrePhoto,
  setEditCreCoverImage,
  setEditCreNiche,
  setEditCrePlatform,
  setEditCreStatus,
  setEditCreIsVerified,
  setEditCreIsPro,
  setEditCreAadhaarUrl,
  setEditCrePanUrl,
  setEditCreatorModalOpen,
  handleFetchWallet,
  setScoreModal,
  setScoreInput,
  setScoreReason,
  handleToggleSuspension,
  handleDeleteCreator,
  selectedWalletCreator,
  setSelectedWalletCreator,
  walletTxns,
  setWalletTxns,
  walletLoading,
  setAchCreatorId,
  setAchType,
  setAchTitle,
  setAchDescription,
  setGrantAchModalOpen,
  reviews,
  handleDeleteReview,
  leaderboard,
  fetchData,
  leaderSearch,
  setLeaderSearch,
  filteredLeaderboard
}) {
  const [filterMode, setFilterMode] = React.useState('ALL');

  const processedCreators = React.useMemo(() => {
    return (filteredCreators || [])
      .filter(Boolean)
      .filter(cr => {
        const cmp = fmtCompleteness(cr);
        if (filterMode === 'DRAFT') return cmp < 85 && !cr.isVerified;
        if (filterMode === 'READY') return cmp >= 85 && !cr.isVerified;
        if (filterMode === 'VERIFIED') return !!cr.isVerified;
        return true;
      });
  }, [filteredCreators, filterMode]);

  return (
    <>
      {/* ══ ALL CREATORS ═══════════════════════════════════════════════ */}
      {activeTab === 'creators' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
          <SectionHeader 
            title="All Creators" 
            badge={(creators || []).length} 
            sub="Manage creator profiles, suspensions and data" 
            action={<button onClick={() => { clearCreatorForm(); setCreateCreatorModalOpen(true); }} style={{ padding: '8px 18px', background: T.orange, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>+ New Creator</button>}
          />

          {/* Dynamic Profile Completeness Filter Tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {[
              { id: 'ALL', label: 'All Users', count: (filteredCreators || []).filter(Boolean).length },
              { id: 'DRAFT', label: 'Draft / Incomplete (<85%)', count: (filteredCreators || []).filter(Boolean).filter(c => fmtCompleteness(c) < 85 && !c.isVerified).length },
              { id: 'READY', label: 'Ready / Review (>=85%)', count: (filteredCreators || []).filter(Boolean).filter(c => fmtCompleteness(c) >= 85 && !c.isVerified).length },
              { id: 'VERIFIED', label: 'Verified & Live', count: (filteredCreators || []).filter(Boolean).filter(c => c.isVerified).length },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterMode(tab.id)}
                style={{
                  padding: '8px 16px',
                  background: filterMode === tab.id ? T.orangeLight : 'transparent',
                  color: filterMode === tab.id ? T.orange : T.muted,
                  border: `1.5px solid ${filterMode === tab.id ? T.orange : T.border}`,
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.18s'
                }}
              >
                {tab.label}
                <span style={{ 
                  background: filterMode === tab.id ? T.orange : '#E2E8F0', 
                  color: filterMode === tab.id ? '#fff' : T.slate,
                  padding: '2px 6px',
                  borderRadius: 6,
                  fontSize: 10,
                  fontWeight: 900
                }}>{tab.count}</span>
              </button>
            ))}
          </div>

          <SearchBar value={creatorSearch} onChange={setCreatorSearch} placeholder="Search by name, handle, or city..." />
          <Table cols={['Creator', 'Handle', 'Location', 'Completeness', 'Followers', 'Verified', 'Status', { label: 'Actions', align: 'right' }]}>
            {processedCreators.map(cr => {
              const compPct = fmtCompleteness(cr);
              return (
                <tr key={cr.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <Td bold>{cr.name}</Td>
                  <Td><span style={{ color: T.orange, fontWeight: 700 }}>@{cr.handle}</span></Td>
                  <Td muted>{cr.city || '—'}, {cr.state || '—'}</Td>
                  <Td>
                    <span style={{ 
                      fontWeight: 850, 
                      color: compPct >= 85 ? T.green : compPct >= 50 ? T.yellow : T.red,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4
                    }}>
                      {compPct}%
                    </span>
                  </Td>
                  <Td bold>{fmtNum(cr.followers)}</Td>
                  <Td><Badge color={cr.isVerified ? T.green : T.muted}>{cr.isVerified ? '✓ Verified' : 'Unverified'}</Badge></Td>
                  <Td><Badge color={cr.user?.isSuspended ? T.red : T.green}>{cr.user?.isSuspended ? 'Suspended' : 'Active'}</Badge></Td>
                  <Td right>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    <a href={`${FRONTEND_URL}/creator/${cr.id}`} target="_blank" rel="noopener noreferrer" style={{ padding: '5px 10px', background: T.blueLight, color: T.blue, borderRadius: 7, fontSize: 11, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <ExternalLink size={10} /> Profile
                    </a>
                    <ActionBtn small onClick={() => {
                      setEditingCreator(cr);
                      setEditCreName(cr.name || '');
                      setEditCreHandle(cr.handle || '');
                      setEditCreBio(cr.bio || '');
                      setEditCreCity(cr.city || '');
                      setEditCreState(cr.state || '');
                      setEditCreFollowers(cr.followers || 0);
                      setEditCreEngagementRate(cr.engagementRate || 0);
                      setEditCreRateMin(cr.rateMin || 0);
                      setEditCreRateMax(cr.rateMax || 0);
                      setEditCrePhoto(cr.photo || '');
                      setEditCreCoverImage(cr.coverImage || '');
                      setEditCreNiche((cr.niche || []).join(', '));
                      setEditCrePlatform((cr.platform || []).join(', '));
                      setEditCreStatus(cr.status || 'DRAFT');
                      setEditCreIsVerified(cr.isVerified || false);
                      setEditCreIsPro(cr.isPro || false);
                      setEditCreAadhaarUrl(cr.aadhaarUrl || '');
                      setEditCrePanUrl(cr.panUrl || '');
                      setEditCreatorModalOpen(true);
                    }} style={{ background: T.orangeLight, color: T.orange }}>✏️ Edit</ActionBtn>
                    <ActionBtn small onClick={() => handleFetchWallet(cr)}><Wallet size={11} /> Wallet</ActionBtn>
                    <ActionBtn small onClick={() => { setScoreModal({ creator: cr }); setScoreInput(cr.score || 0); }}><Trophy size={11} /> Score</ActionBtn>
                    <DangerBtn small onClick={() => handleToggleSuspension(cr.user?.id)}>
                      {cr.user?.isSuspended ? <UserCheck size={11} /> : <UserX size={11} />}
                      {cr.user?.isSuspended ? 'Unban' : 'Suspend'}
                    </DangerBtn>
                    <DangerBtn small onClick={() => handleDeleteCreator(cr.id)}>
                      <Trash2 size={11} /> Delete
                    </DangerBtn>
                  </div>
                </Td>
              </tr>
            )})}
          </Table>
          {processedCreators.length === 0 && <EmptyState icon="👤" msg="No creators match your search" />}
        </div>
      )}

      {/* ══ CREATOR WALLETS ════════════════════════════════════════════ */}
      {activeTab === 'creator-wallets' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {!selectedWalletCreator ? (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader title="Creator Wallets" sub="Click on a creator to view their transaction history" />
              <SearchBar value={creatorSearch} onChange={setCreatorSearch} placeholder="Search creator..." />
              <Table cols={['Creator', 'Handle', 'Niche', 'Followers', 'Verified', { label: 'View Wallet', align: 'right' }]}>
                {filteredCreators.map(cr => (
                  <tr key={cr.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <Td bold>{cr.name}</Td>
                    <Td><span style={{ color: T.orange, fontWeight: 700 }}>@{cr.handle}</span></Td>
                    <Td>{(cr.niche || []).slice(0, 2).map((n, i) => <Badge key={i} color={T.purple} size="sm">{n}</Badge>)}</Td>
                    <Td bold>{fmtNum(cr.followers)}</Td>
                    <Td><Badge color={cr.isVerified ? T.green : T.muted}>{cr.isVerified ? '✓' : '—'}</Badge></Td>
                    <Td right><ActionBtn onClick={() => handleFetchWallet(cr)}><Wallet size={12} /> View Wallet</ActionBtn></Td>
                  </tr>
                ))}
              </Table>
            </div>
          ) : (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader
                title={`Wallet: ${selectedWalletCreator.name}`}
                sub={`@${selectedWalletCreator.handle} · All payment transactions`}
                action={<ActionBtn onClick={() => { setSelectedWalletCreator(null); setWalletTxns([]); }}>← Back to All Creators</ActionBtn>}
              />
              {walletLoading ? <EmptyState icon="⏳" msg="Loading transactions..." /> : walletTxns.length === 0 ? (
                <EmptyState icon="💰" msg="No transactions found for this creator" />
              ) : (
                <Table cols={['Campaign', 'Brand', 'Amount', 'Type', 'Status', 'Date']}>
                  {walletTxns.map(tx => (
                    <tr key={tx.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                      <Td bold>{tx.campaign?.title || '—'}</Td>
                      <Td>{tx.brand?.companyName || '—'}</Td>
                      <Td bold><span style={{ color: T.green }}>{fmtINR(tx.amount)}</span></Td>
                      <Td><Badge color={T.blue}>{tx.type}</Badge></Td>
                      <Td><Badge color={STATUS_COLOR[tx.status] || T.muted}>{tx.status}</Badge></Td>
                      <Td muted>{fmtDate(tx.createdAt)}</Td>
                    </tr>
                  ))}
                </Table>
              )}
            </div>
          )}
        </div>
      )}

      {/* ══ CREATOR SCORE ══════════════════════════════════════════════ */}
      {activeTab === 'creator-score' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
          <SectionHeader title="Creator Score Manager" sub="View and manually adjust creator platform scores" />
          <SearchBar value={creatorSearch} onChange={setCreatorSearch} placeholder="Search creator..." />
          <Table cols={['Creator', 'Handle', 'Score', 'Followers', 'Verified', { label: 'Adjust Score', align: 'right' }]}>
            {filteredCreators.map(cr => (
              <tr key={cr.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                <Td bold>{cr.name}</Td>
                <Td><span style={{ color: T.orange, fontWeight: 700 }}>@{cr.handle}</span></Td>
                <Td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, color: T.navy, fontSize: 14 }}>
                    <Trophy size={14} style={{ color: T.yellow }} />
                    {cr.score || 0}
                  </span>
                </Td>
                <Td>{fmtNum(cr.followers)}</Td>
                <Td><Badge color={cr.isVerified ? T.green : T.muted}>{cr.isVerified ? '✓' : '—'}</Badge></Td>
                <Td right>
                  <ActionBtn onClick={() => { setScoreModal({ creator: cr }); setScoreInput(String(cr.score || 0)); setScoreReason(''); }}>
                    <Trophy size={12} /> Adjust Score
                  </ActionBtn>
                </Td>
              </tr>
            ))}
          </Table>
        </div>
      )}

      {/* ══ CREATOR ACHIEVEMENTS ═══════════════════════════════════════ */}
      {activeTab === 'creator-achievements' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
          <SectionHeader 
            title="Achievements & Milestones" 
            sub="Track creator milestone progress based on follower counts and brand deals" 
            action={<button onClick={() => { setAchCreatorId(''); setAchType('VERIFICATION'); setAchTitle(''); setAchDescription(''); setGrantAchModalOpen(true); }} style={{ padding: '8px 18px', background: T.orange, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>+ Grant Achievement</button>}
          />
          <div style={{ marginBottom: 20, padding: 16, background: T.orangeLight, borderRadius: 12, border: `1px solid ${T.orangeBorder}` }}>
            <p style={{ margin: 0, fontSize: 13, color: T.orange, fontWeight: 700 }}>ℹ️ Achievements are automatically unlocked when creators hit follower + deal milestones. Verified creators get physical swag shipped to them.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { emoji: '🎥', title: 'Rising Star', followerTarget: 1000, color: T.blue },
              { emoji: '⚡', title: 'Creator Pro', followerTarget: 10000, color: T.purple },
              { emoji: '🏆', title: 'Bharat Elite', followerTarget: 100000, color: T.orange },
              { emoji: '👑', title: 'Legend', followerTarget: 1000000, color: T.yellow },
            ].map((m, i) => {
              const earned = creators.filter(c => c.followers >= m.followerTarget && c.isVerified);
              return (
                <div key={i} style={{ padding: 20, background: T.bg, borderRadius: 16, border: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{m.emoji}</div>
                  <h4 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 800, color: T.navy }}>{m.title}</h4>
                  <p style={{ margin: '0 0 12px', fontSize: 12, color: T.muted, fontWeight: 500 }}>{fmtNum(m.followerTarget)}+ followers required</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Badge color={m.color}>{earned.length} creators earned</Badge>
                    <span style={{ fontSize: 11, color: T.muted }}>of {creators.length} total</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 24 }}>
            <h4 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 800, color: T.navy }}>Top Creators by Followers</h4>
            <Table cols={['Creator', 'Followers', 'Verified', 'Score', 'Milestone']}>
              {[...creators].sort((a, b) => (b.followers || 0) - (a.followers || 0)).slice(0, 15).map(cr => {
                const milestone = cr.followers >= 1000000 ? { emoji: '👑', label: 'Legend', color: T.yellow } :
                  cr.followers >= 100000 ? { emoji: '🏆', label: 'Bharat Elite', color: T.orange } :
                    cr.followers >= 10000 ? { emoji: '⚡', label: 'Creator Pro', color: T.purple } :
                      cr.followers >= 1000 ? { emoji: '🎥', label: 'Rising Star', color: T.blue } :
                        { emoji: '🌱', label: 'Budding', color: T.muted };
                return (
                  <tr key={cr.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <Td bold>{cr.name} <span style={{ color: T.orange, fontWeight: 700 }}>@{cr.handle}</span></Td>
                    <Td bold>{fmtNum(cr.followers)}</Td>
                    <Td><Badge color={cr.isVerified ? T.green : T.muted}>{cr.isVerified ? '✓' : '—'}</Badge></Td>
                    <Td bold>{cr.score || 0}</Td>
                    <Td><Badge color={milestone.color}>{milestone.emoji} {milestone.label}</Badge></Td>
                  </tr>
                );
              })}
            </Table>
          </div>
        </div>
      )}

      {/* ══ CREATOR REVIEWS ════════════════════════════════════════════ */}
      {activeTab === 'creator-reviews' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
          <SectionHeader title="Creator Reviews" badge={reviews.length} sub="Brand reviews submitted for creators — moderate spam" />
          {reviews.length === 0 ? <EmptyState icon="⭐" msg="No reviews yet" /> : (
            <Table cols={['Creator', 'Brand', 'Rating', 'Review', 'Date', { label: 'Action', align: 'right' }]}>
              {reviews.map(rv => (
                <tr key={rv.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <Td bold>{rv.creator?.name || '—'}</Td>
                  <Td>{rv.brand?.companyName || '—'}</Td>
                  <Td><span style={{ color: T.yellow, fontWeight: 800 }}>{'★'.repeat(Math.min(rv.r || 0, 5))}</span> {rv.r}/5</Td>
                  <Td><span style={{ maxWidth: 200, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{rv.t || '—'}</span></Td>
                  <Td muted>{fmtDate(rv.createdAt)}</Td>
                  <Td right><DangerBtn small onClick={() => handleDeleteReview(rv.id)}><Trash2 size={11} /> Delete</DangerBtn></Td>
                </tr>
              ))}
            </Table>
          )}
        </div>
      )}

      {/* ══ LEADERBOARD ════════════════════════════════════════════════ */}
      {activeTab === 'leaderboard' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
          <SectionHeader title="Leaderboard Management" badge={leaderboard.length} sub="Top 100 verified creators ranked by score and followers" action={<ActionBtn onClick={fetchData}><RefreshCw size={13} /> Refresh</ActionBtn>} />
          <SearchBar value={leaderSearch} onChange={setLeaderSearch} placeholder="Search creator..." />
          <Table cols={['Rank', 'Creator', 'Handle', 'Score', 'Followers', 'Brand Deals', 'Location', { label: 'Actions', align: 'right' }]}>
            {filteredLeaderboard.map((cr, i) => (
              <tr key={cr.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                <Td bold>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </span>
                </Td>
                <Td bold>{cr.name}</Td>
                <Td><span style={{ color: T.orange, fontWeight: 700 }}>@{cr.handle}</span></Td>
                <Td bold><span style={{ color: T.yellow }}>{cr.score || 0}</span></Td>
                <Td>{fmtNum(cr.followers)}</Td>
                <Td>{cr._count?.applications || 0}</Td>
                <Td muted>{cr.city || '—'}</Td>
                <Td right>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    <a href={`${FRONTEND_URL}/creator/${cr.id}`} target="_blank" rel="noopener noreferrer" style={{ padding: '5px 10px', background: T.blueLight, color: T.blue, borderRadius: 7, fontSize: 11, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <ExternalLink size={10} /> Visit
                    </a>
                    <ActionBtn small onClick={() => { setScoreModal({ creator: cr }); setScoreInput(String(cr.score || 0)); }}>
                      <Trophy size={11} /> Score
                    </ActionBtn>
                  </div>
                </Td>
              </tr>
            ))}
          </Table>
          {filteredLeaderboard.length === 0 && <EmptyState icon="🏆" msg="No verified creators in leaderboard yet" />}
        </div>
      )}
    </>
  );
}
