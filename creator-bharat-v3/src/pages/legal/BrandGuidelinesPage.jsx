import React from 'react';
import LegalDocumentLayout from '@/components/legal/LegalDocumentLayout';
import { BRAND_GUIDELINES } from '@/data/legalData';

export default function BrandGuidelinesPage() {
  return <LegalDocumentLayout doc={BRAND_GUIDELINES} />;
}
