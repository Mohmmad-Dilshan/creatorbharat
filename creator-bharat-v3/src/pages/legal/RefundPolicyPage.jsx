import React from 'react';
import LegalDocumentLayout from '@/components/legal/LegalDocumentLayout';
import { REFUND_POLICY } from '@/data/legalData';

export default function RefundPolicyPage() {
  return <LegalDocumentLayout doc={REFUND_POLICY} />;
}
