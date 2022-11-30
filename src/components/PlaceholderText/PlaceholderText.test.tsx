import React from 'react';
import { render, screen } from '@testing-library/react';
import PlaceholderText from 'Components/PlaceholderText';

describe('<PlaceholderText />', () => {
  it('should render the Component normally', () => {
    const props = { children: ['PlaceholderText'] };
    render(<PlaceholderText {...props} />);
    expect(screen.getByText('PlaceholderText')).toBeInTheDocument;
  });
});
