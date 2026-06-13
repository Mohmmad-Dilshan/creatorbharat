import React from 'react';
import LegalDocumentLayout from '@/components/legal/LegalDocumentLayout';
import { CREATOR_GUIDELINES } from '@/data/legalData';

export default function CreatorGuidelinesPage() {
  return <LegalDocumentLayout doc={CREATOR_GUIDELINES} />;
}
