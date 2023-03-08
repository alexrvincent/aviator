import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'test/renderWithQuery';
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
