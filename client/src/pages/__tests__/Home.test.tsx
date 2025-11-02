import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';

describe('Home landing page', () => {
  function renderHome() {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  }

  it('renders the hero heading and subheading', () => {
    renderHome();
    expect(
      screen.getByRole('heading', { name: /discover, track and love your books/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/browse your collection, manage reading lists/i)
    ).toBeInTheDocument();
  });

  it('shows primary call-to-action buttons', () => {
    renderHome();
    expect(screen.getByRole('button', { name: /browse library/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument();
  });
});

