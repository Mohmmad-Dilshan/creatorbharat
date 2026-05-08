import React from 'react';
import PropTypes from 'prop-types';
import { ArrowRight, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react';
import { Logo } from '../../components/ui';

export default function AuthRedirectScreen({ title, sub, mode = 'creator' }) {
  const isBrand = mode === 'brand';
  const accent = isBrand ? '#10B981' : '#FF9431';

  return (
    <div className="auth-redirect-screen">
      <div className="auth-redirect-shell">
        <section className="auth-redirect-card">
          <div className="auth-brand-row">
            <Logo sm />
            <span>{isBrand ? 'Brand Console' : 'Creator Workspace'}</span>
          </div>

          <div className="auth-loader-orbit" style={{ '--accent': accent }}>
            <div className="auth-loader-core">
              {isBrand ? <ShieldCheck size={28} /> : <Sparkles size={28} />}
            </div>
          </div>

          <div className="auth-copy">
            <p className="auth-kicker">
              <LockKeyhole size={14} /> Secure handoff
            </p>
            <h1>{title}</h1>
            <p>{sub}</p>
          </div>

          <div className="auth-status-row">
            <span>Preparing workspace</span>
            <ArrowRight size={16} />
          </div>
        </section>
      </div>

      <style>{`
        .auth-redirect-screen {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 24px;
          color: #fff;
          background:
            radial-gradient(circle at 18% 18%, rgba(255,148,49,0.18), transparent 30%),
            radial-gradient(circle at 84% 22%, rgba(19,136,8,0.14), transparent 28%),
            linear-gradient(135deg, #050607 0%, #0f172a 52%, #050607 100%);
          overflow: hidden;
          position: relative;
        }

        .auth-redirect-screen::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
          opacity: 0.34;
        }

        .auth-redirect-shell {
          width: min(100%, 520px);
          position: relative;
          z-index: 1;
        }

        .auth-redirect-card {
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 28px;
          padding: 28px;
          background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.055));
          box-shadow: 0 30px 90px rgba(0,0,0,0.32);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        .auth-brand-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 38px;
        }

        .auth-brand-row span {
          min-height: 32px;
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 0 12px;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.68);
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .auth-loader-orbit {
          width: 104px;
          height: 104px;
          border-radius: 999px;
          margin: 0 auto 30px;
          display: grid;
          place-items: center;
          background: conic-gradient(from 0deg, transparent, var(--accent), #fff, #128807, transparent);
          animation: auth-spin 1.4s linear infinite;
          padding: 3px;
        }

        .auth-loader-core {
          width: 100%;
          height: 100%;
          border-radius: inherit;
          display: grid;
          place-items: center;
          background: #0b1220;
          color: var(--accent);
        }

        .auth-copy {
          text-align: center;
        }

        .auth-kicker {
          width: fit-content;
          margin: 0 auto 12px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: rgba(255,255,255,0.62);
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .auth-copy h1 {
          margin: 0;
          color: #fff;
          font-family: 'Outfit', 'Inter', sans-serif;
          font-size: clamp(30px, 8vw, 46px);
          line-height: 1;
          font-weight: 950;
          letter-spacing: 0;
        }

        .auth-copy p:last-child {
          max-width: 380px;
          margin: 14px auto 0;
          color: rgba(255,255,255,0.64);
          font-size: 14px;
          line-height: 1.65;
          font-weight: 650;
        }

        .auth-status-row {
          min-height: 46px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-top: 28px;
          border-radius: 16px;
          padding: 0 16px;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.76);
          font-size: 13px;
          font-weight: 900;
        }

        @keyframes auth-spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 520px) {
          .auth-redirect-screen {
            padding: 14px;
            align-items: end;
          }

          .auth-redirect-card {
            border-radius: 24px;
            padding: 22px;
          }

          .auth-brand-row {
            margin-bottom: 30px;
          }
        }
      `}</style>
    </div>
  );
}

AuthRedirectScreen.propTypes = {
  title: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['creator', 'brand']),
};
