import React from 'react';
import { useApp } from '../../context';
import { Modal } from '../Primitives';
import { AuthContent } from '../auth/AuthContent';

export default function AuthModal() {
  const { st, dsp } = useApp();
  
  const onClose = () => dsp({ t: 'UI', v: { authModal: false, authView: 'gateway' } });
  const view = st.ui.authView || 'gateway';
  const modalWidth = view === 'register' || view === 'brand-register' ? 1060 : 980;

  if (!st.ui.authModal) return null;

  return (
    <Modal
      open
      onClose={onClose}
      hideHeader
      width={modalWidth}
      contentStyle={{ maxHeight: '90vh' }}
    >
      <AuthContent initialView={view} onClose={onClose} />
    </Modal>
  );
}
