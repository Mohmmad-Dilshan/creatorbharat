import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import { useApp } from './context.jsx';

vi.mock('./context.jsx', () => ({
  useApp: vi.fn()
}));

describe('ProtectedRoute Component Route Guard Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects to /login if user is not authenticated', () => {
    useApp.mockReturnValue({
      st: { user: null, role: null }
    });

    render(
      <MemoryRouter initialEntries={['/creator/dashboard']}>
        <Routes>
          <Route 
            path="/creator/dashboard" 
            element={
              <ProtectedRoute>
                <div data-testid="dashboard-content">Dashboard Content</div>
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<div data-testid="login-content">Login Page Redirected</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Verify it redirecting and dashboard-content is NOT shown
    expect(screen.queryByTestId('dashboard-content')).not.toBeInTheDocument();
    expect(screen.getByTestId('login-content')).toBeInTheDocument();
  });

  it('renders children if user is authenticated and has matching role', () => {
    useApp.mockReturnValue({
      st: { user: { id: 'user-1' }, role: 'creator' }
    });

    render(
      <MemoryRouter initialEntries={['/creator/dashboard']}>
        <Routes>
          <Route 
            path="/creator/dashboard" 
            element={
              <ProtectedRoute allowedRole="creator">
                <div data-testid="dashboard-content">Dashboard Content</div>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('dashboard-content')).toBeInTheDocument();
  });

  it('redirects brand user to brand dashboard if accessing creator pages', () => {
    useApp.mockReturnValue({
      st: { user: { id: 'brand-user-id' }, role: 'brand' }
    });

    render(
      <MemoryRouter initialEntries={['/creator/dashboard']}>
        <Routes>
          <Route 
            path="/creator/dashboard" 
            element={
              <ProtectedRoute allowedRole="creator">
                <div data-testid="dashboard-content">Dashboard Content</div>
              </ProtectedRoute>
            } 
          />
          <Route path="/brand-dashboard" element={<div data-testid="brand-dashboard-content">Brand Dashboard redirected</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('dashboard-content')).not.toBeInTheDocument();
    expect(screen.getByTestId('brand-dashboard-content')).toBeInTheDocument();
  });
});
