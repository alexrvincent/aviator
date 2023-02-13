import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from 'Components/Button';

describe('<Button />', () => {
  it('should render the Component normally', () => {
    const props = { children: ['Button'] };
    render(<Button {...props} />);
    expect(screen.getByText('Button')).toBeInTheDocument;
  });
});
