// src/components/GenerateForm.test.tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import GenerateForm from './GenerateForm';

describe('GenerateForm', () => {
  it('doit afficher le champ topic', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <GenerateForm />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/topic/i)).toBeInTheDocument();
  });
});