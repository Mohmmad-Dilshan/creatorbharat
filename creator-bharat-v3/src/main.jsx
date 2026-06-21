import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AppProvider } from '@/core/context'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import { HelmetProvider } from 'react-helmet-async'
import '@/config/i18n.js'

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
