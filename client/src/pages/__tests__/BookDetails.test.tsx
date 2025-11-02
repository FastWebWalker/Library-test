import { render, screen } from '@testing-library/react';
import BookDetails from '../BookDetails';
import React from 'react';

// Mock react-router's useParams to return a fixed id
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useParams: () => ({ id: '42' }),
    Link: (props: any) => <a {...props} />, // minimal stub for Link used in Button
  } as typeof actual;
});

// Mock BooksApi.get to return a fake book
vi.mock('../../api', () => ({
  BooksApi: {
    get: vi.fn(async () => ({
      id: '42',
      title: 'Test Driven Development',
      author: 'Kent Beck',
      imageUrl: null,
      description: 'A classic on evolving design with tests.',
      createdAt: new Date().toISOString(),
    })),
  },
}));

describe('BookDetails', () => {
  it('loads and displays book details', async () => {
    render(<BookDetails />);

    // Wait for the title to appear after mock fetch resolves
    expect(
      await screen.findByRole('heading', { name: /test driven development/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/author:\s*kent beck/i)).toBeInTheDocument();
    expect(
      screen.getByText(/a classic on evolving design with tests\./i)
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });
});

