import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { T } from '../../theme';

export function Modal({ open, onClose, title, children, width = 500, hideHeader, contentStyle }) {
  const ref = useRef(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    const handleCancel = (e) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  if (!open) return null;

  return (
    <dialog
      ref={ref}
      style={{
        padding: 0,
        border: 'none',
        borderRadius: 28,
        background: 'transparent',
        maxWidth: '100vw',
        maxHeight: '100vh',
        overflow: 'visible',
        outline: 'none'
      }}
      className="modal-native"
    >
      <div 
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, backdropFilter: 'blur(10px)', overflow: 'hidden' }}
      >
        <button 
          aria-label="Close modal"
          onClick={onClose}
          style={{ position: 'absolute', inset: 0, background: 'transparent', border: 'none', cursor: 'default' }}
        />
        <div 
          className="si" 
          aria-labelledby="modal-title"
          style={{ background: '#fff', borderRadius: 28, width: '100%', maxWidth: width, maxHeight: '90vh', overflowY: 'auto', boxShadow: T.sh4, border: '1px solid rgba(255,255,255,0.2)', position: 'relative', zIndex: 1, ...contentStyle }}
        >
          {!hideHeader && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px', borderBottom: `1px solid ${T.bd}`, position: 'sticky', top: 0, background: '#fff', zIndex: 100, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h3 id="modal-title" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 900, color: T.n8 }}>{title}</h3>
              <button onClick={onClose} style={{ background: T.bg2, border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontSize: 20, color: T.t2, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s', marginRight: 4 }}>×</button>
            </div>
          )}
          <div style={{ padding: hideHeader ? 0 : '32px 32px 48px' }}>{children}</div>
        </div>
      </div>
    </dialog>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hideHeader: PropTypes.bool,
  contentStyle: PropTypes.object
};

export default Modal;
