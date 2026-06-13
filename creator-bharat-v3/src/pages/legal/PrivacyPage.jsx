import React from 'react';
import LegalDocumentLayout from '@/components/legal/LegalDocumentLayout';
import { PRIVACY_POLICY } from '@/data/legalData';

export default function PrivacyPage() {
  return <LegalDocumentLayout doc={PRIVACY_POLICY} />;
}
