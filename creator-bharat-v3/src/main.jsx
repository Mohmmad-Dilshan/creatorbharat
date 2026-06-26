import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import * as Sentry from '@sentry/react'
import App from './App.jsx'
import './index.css'
import { AppProvider } from '@/core/context'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import { HelmetProvider } from 'react-helmet-async'
import '@/config/i18n.js'

// ─── Sentry Error Tracking ────────────────────────────────────────────────────
// Set VITE_SENTRY_DSN in .env to activate. Silent/no-op when DSN is not provided.
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN || '',
  environment: import.meta.env.MODE,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({ maskAllText: false, blockAllMedia: false }),
  ],
  tracesSampleRate: import.meta.env.PROD ? 0.2 : 0,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: import.meta.env.PROD ? 1.0 : 0,
  enabled: !!import.meta.env.VITE_SENTRY_DSN,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <AppProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </AppProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
