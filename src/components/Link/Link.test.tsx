import React from 'react';
import { render, screen } from '@testing-library/react';
import Link from './Link';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Link', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render children', () => {
    render(<Link to="/home">{'Hello'}</Link>, { wrapper: BrowserRouter });
    expect(screen.getByText('Hello')).toBeInTheDocument;
  });
});
