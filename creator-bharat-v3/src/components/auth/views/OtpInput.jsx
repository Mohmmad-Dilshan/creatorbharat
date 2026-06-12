import React, { useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Shared 6-digit OTP input component.
 *
 * Props:
 *   value    {string}   – controlled value (digits only, max 6 chars)
 *   onChange {function} – called with the new string value (digits only)
 *   disabled {boolean}  – disables the input
 *   error    {string}   – error message displayed below the input
 *
 * Validates: Requirements 3.4, 7.5
 */
const OtpInput = ({ value, onChange, disabled, error }) => {
  const inputRef = useRef(null);

  // Block non-digit keys before they produce a character
  const handleKeyDown = (e) => {
    const allowed = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight',
      'Tab', 'Enter', 'Home', 'End',
    ];
    if (allowed.includes(e.key)) return;
    if (e.ctrlKey || e.metaKey) return; // allow copy/paste shortcuts
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Strip any non-digit characters that slipped through (e.g. paste)
  const handleChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 6);
    onChange(digits);
  };

  const hasError = Boolean(error);

  const inputStyle = {
    width: '100%',
    height: 52,
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: '0.35em',
    textAlign: 'center',
    fontFamily: "'Outfit', monospace, sans-serif",
    border: `2px solid ${hasError ? '#EF4444' : '#E2E8F0'}`,
    borderRadius: 12,
    outline: 'none',
    background: disabled ? '#F8FAFC' : '#fff',
    color: disabled ? '#94A3B8' : '#111827',
    cursor: disabled ? 'not-allowed' : 'text',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    boxSizing: 'border-box',
    padding: '0 16px',
  };

  const errorStyle = {
    marginTop: 6,
    fontSize: 12,
    fontWeight: 700,
    color: '#EF4444',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label
        style={{
          fontSize: 13,
          fontWeight: 750,
          color: '#374151',
          marginBottom: 6,
          display: 'block',
        }}
      >
        Enter OTP
      </label>

      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="••••••"
        aria-label="One-time password"
        aria-invalid={hasError}
        aria-describedby={hasError ? 'otp-error' : undefined}
        style={inputStyle}
        onFocus={(e) => {
          if (!disabled) {
            e.target.style.borderColor = hasError ? '#EF4444' : '#111827';
            e.target.style.boxShadow = hasError
              ? '0 0 0 3px rgba(239,68,68,0.12)'
              : '0 0 0 3px rgba(17,24,39,0.08)';
          }
        }}
        onBlur={(e) => {
          e.target.style.borderColor = hasError ? '#EF4444' : '#E2E8F0';
          e.target.style.boxShadow = 'none';
        }}
      />

      {hasError && (
        <span id="otp-error" style={errorStyle} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

OtpInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
};

OtpInput.defaultProps = {
  disabled: false,
  error: '',
};

export default OtpInput;
