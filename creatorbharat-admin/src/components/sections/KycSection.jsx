import React from 'react';
import { ExternalLink } from 'lucide-react';
import { T, fmtNum, Badge, SectionHeader, EmptyState, ActionBtn, Table, Td } from '../ui/Primitives';

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5173' : 'https://creatorbharat.com');

const KycSection = ({
  verifications,
  setSelectedCreator,
  setDrawerOpen,
}) => {
  return (
    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
      <SectionHeader title="KYC Verification Queue" badge={verifications.length} sub="Approve or reject creator identity documents" />
      {verifications.length === 0 ? <EmptyState icon="✅" msg="No pending verifications. All creators have been reviewed!" /> : (
        <Table cols={['Creator', 'Handle', 'Category', 'Followers', 'Aadhaar / PAN', { label: 'Actions', align: 'right' }]}>
          {verifications.map(cr => (
            <tr key={cr.id} style={{ borderBottom: `1px solid ${T.border}` }}>
              <Td bold>{cr.name}</Td>
              <Td><span style={{ color: T.orange, fontWeight: 700 }}>@{cr.handle}</span></Td>
              <Td>{(cr.niche || []).slice(0, 2).map((n, i) => <Badge key={i} color={T.blue}>{n}</Badge>)}</Td>
              <Td>{fmtNum(cr.followers)}</Td>
              <Td>
                <Badge color={cr.aadhaarUrl ? T.green : T.red}>Aadhaar</Badge>{' '}
                <Badge color={cr.panUrl ? T.green : T.red}>PAN</Badge>
              </Td>
              <Td right>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <a href={`${FRONTEND_URL}/creator/${cr.id}`} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 12px', background: T.blueLight, color: T.blue, border: 'none', borderRadius: 8, fontSize: 11, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    <ExternalLink size={11} /> Visit
                  </a>
                  <ActionBtn onClick={() => { setSelectedCreator(cr); setDrawerOpen(true); }}><span style={{ fontSize: 13 }}>&#128065;</span> Review KYC</ActionBtn>
                </div>
              </Td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
};

export default KycSection;
