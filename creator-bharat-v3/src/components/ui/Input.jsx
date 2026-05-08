import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { T } from '../../theme';

export function Input({ label, value, onChange, type = 'text', placeholder, options, rows, helper, required, error, sm, readOnly, id: providedId, icon: Icon, ...props }) {
  const [foc, setFoc] = useState(false);
  const idRef = useRef(providedId || `fld-${Math.random().toString(36).slice(2, 11)}`);
  const id = idRef.current;
  
  let borderColor = T.bd;
  if (error) borderColor = '#EF4444';
  else if (foc) borderColor = '#FF9431';

  const shadowColor = error ? 'rgba(239,68,68,0.15)' : 'rgba(255,148,49,0.15)';
  
  const getPadding = () => {
    if (Icon) return sm ? '10px 14px 10px 42px' : '14px 18px 14px 48px';
    return sm ? '10px 14px' : '14px 18px';
  };

  const s = {
    width: '100%', padding: getPadding(),
    border: `1.5px solid ${borderColor}`,
    borderRadius: 12, fontSize: sm ? 13 : 15, color: T.n8,
    background: readOnly ? T.bg3 : '#fff', transition: 'all .2s cubic-bezier(0.4,0,0.2,1)',
    boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none',
    boxShadow: foc ? `0 0 0 4px ${shadowColor}` : 'none'
  };

  const renderInput = () => {
    if (options) {
      return (
        <div style={{ position: 'relative' }}>
          <select id={id} value={value} onChange={onChange} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)} style={{ ...s, appearance: 'none' }} required={required} {...props}>
            <option value="" disabled>{placeholder || 'Select an option'}</option>
            {options.map(o => {
              const val = typeof o === 'string' ? o : o.v;
              const lbl = typeof o === 'string' ? o : o.l;
              return <option key={val} value={val}>{lbl}</option>;
            })}
          </select>
          <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: T.t3, fontSize: 10 }}>▼</div>
        </div>
      );
    }
    if (rows) {
      return <textarea id={id} value={value} onChange={onChange} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)} style={{ ...s, height: 'auto', resize: 'vertical' }} placeholder={placeholder} rows={rows} required={required} {...props} />;
    }
    return <input id={id} type={type} value={value} onChange={onChange} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)} style={s} placeholder={placeholder} required={required} {...props} />;
  };

  return (
    <div style={{ marginBottom: 18 }}>
      {label && (
        <label 
          htmlFor={id} 
          style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700, color: T.n8, marginBottom: 8, cursor: 'pointer' }}
        >
          {label}{required && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {Icon && <Icon size={sm ? 16 : 18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: foc ? '#FF9431' : '#94a3b8', transition: 'all .2s', zIndex: 2 }} />}
        {renderInput()}
      </div>
      {error && <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, color: '#EF4444', fontSize: 12, fontWeight: 600 }}><span>⚠️</span> {error}</div>}
      {helper && !error && <div style={{ fontSize: 12, color: T.t3, marginTop: 6 }}>{helper}</div>}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  helper: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  sm: PropTypes.bool,
  readOnly: PropTypes.bool,
  id: PropTypes.string,
  icon: PropTypes.elementType
};

export default Input;
