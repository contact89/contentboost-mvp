import { render, screen } from '@testing-library/react';
import ContentDisplay from './ContentDisplay';

describe('ContentDisplay', () => {
  it('doit afficher le contenu passé en props', () => {
    render(<ContentDisplay content="Test de contenu" />);
    expect(screen.getByText(/Test de contenu/i)).toBeInTheDocument();
  });
});