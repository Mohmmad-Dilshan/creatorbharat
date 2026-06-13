import React from 'react';
import LegalDocumentLayout from '@/components/legal/LegalDocumentLayout';
import { COOKIE_POLICY } from '@/data/legalData';

export default function CookiePolicyPage() {
  return <LegalDocumentLayout doc={COOKIE_POLICY} />;
}
