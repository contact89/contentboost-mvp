// src/contexts/AuthContext.test.tsx
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as api from '../services/api';
import { AuthProvider, useAuth } from './AuthContext';

const mockToken = 'mock-token';
const mockUser = { username: 'testuser', email: 'test@example.com' };

vi.mock('../services/api', () => ({
  loginUser: vi.fn(),
  getMe: vi.fn(),
}));

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('login stocke le token et récupère l’utilisateur', async () => {
    (api.loginUser as any).mockResolvedValue({ access_token: mockToken });
    (api.getMe as any).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.login('testuser', 'password');
    });

    expect(localStorage.getItem('token')).toBe(mockToken);
    expect(result.current.token).toBe(mockToken);
    expect(result.current.user).toEqual(mockUser);
  });

  it('logout supprime le token et vide l’utilisateur', () => {
    localStorage.setItem('token', mockToken);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.logout();
    });

    expect(localStorage.getItem('token')).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.user).toBeNull();
  });

  it('useEffect récupère l’utilisateur si token présent', async () => {
    localStorage.setItem('token', mockToken);
    (api.getMe as any).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser);
    });
  });

  it('useEffect logout si getMe échoue', async () => {
    localStorage.setItem('token', mockToken);
    (api.getMe as any).mockRejectedValue(new Error('Failed'));

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await waitFor(() => {
      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
    });
  });
});