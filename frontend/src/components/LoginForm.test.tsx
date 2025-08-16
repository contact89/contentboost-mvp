// src/components/LoginForm.test.tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('doit afficher le bouton de connexion', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /connexion/i })).toBeInTheDocument();
  });
});