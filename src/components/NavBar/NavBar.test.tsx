import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from 'Components/NavBar';

describe('<NavBar />', () => {
  it('should render the Component normally', () => {
    const props = { children: ['NavBar'] };
    render(<NavBar {...props} />);
    expect(screen.getByText('NavBar')).toBeInTheDocument;
  });
});
