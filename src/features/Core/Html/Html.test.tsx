import React from 'react';
import { render, screen } from '@testing-library/react';
import Html from 'Features/Core/Html';

describe('<Html />', () => {
  it('should render the Component normally', () => {
    const props = { children: ['Html'] };
    render(<Html {...props} />);
    expect(screen.getByText('Html')).toBeInTheDocument;
  });
});
