import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../../core/context.jsx';
import Navbar from './Navbar.jsx';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../config/i18n.js';

describe('Navbar Layout Component Tests', () => {
  const renderNavbar = () => {
    return render(
      <I18nextProvider i18n={i18n}>
        <AppProvider>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </AppProvider>
      </I18nextProvider>
    );
  };

  it('renders Navbar with logo and basic links', () => {
    renderNavbar();
    // Verify logo name exists
    const appLogo = screen.getAllByText(/CreatorBharat/i);
    expect(appLogo.length).toBeGreaterThan(0);
  });

  it('renders language switcher badge and toggles language selection', async () => {
    // Mock Google Translate combo element
    const select = document.createElement('select');
    select.className = 'goog-te-combo';
    document.body.appendChild(select);

    renderNavbar();
    
    // Find the language trigger button (currently displaying 'EN')
    const langBtn = screen.getByText('EN');
    expect(langBtn).toBeInTheDocument();

    // Click language switcher to open dropdown list
    fireEvent.click(langBtn);

    // Verify option for Hindi exists in dropdown
    const hindiOption = screen.getByText(/हिन्दी/i);
    expect(hindiOption).toBeInTheDocument();

    // Set cookie to simulate Google Translate's behavior
    document.cookie = 'googtrans=/en/hi';

    // Click Hindi option to switch languages
    fireEvent.click(hindiOption);

    // Verify language trigger text changed to 'HI'
    expect(screen.getByText('HI')).toBeInTheDocument();

    // Clean up
    document.body.removeChild(select);
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  });
});
