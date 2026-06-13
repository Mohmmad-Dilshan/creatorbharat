import React from 'react';
import LegalDocumentLayout from '@/components/legal/LegalDocumentLayout';
import { TERMS_OF_SERVICE } from '@/data/legalData';

export default function TermsPage() {
  return <LegalDocumentLayout doc={TERMS_OF_SERVICE} />;
}
