import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';

describe('<NavBar />', () => {
  it('should render the Component normally', () => {
    // Wrap it
    render(
      <MemoryRouter>
        <NavBar></NavBar>
      </MemoryRouter>,
    );
    expect(screen.getByText('Sign Up')).toBeInTheDocument;
  });
});
