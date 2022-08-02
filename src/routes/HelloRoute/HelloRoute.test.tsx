import React from 'react';
import { render, screen } from '@testing-library/react';
import HelloRoute from 'Routes/HelloRoute';

describe('<HelloRoute />', () => {
  it('should render the Route normally', () => {
    const props = {
      children: ['Hello Route'],
    };

    render(<HelloRoute {...props} />);

    expect(screen.getByText('Hello Route')).toBeInTheDocument;
  });
});
