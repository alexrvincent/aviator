import React from 'react';
import { render, screen } from '@testing-library/react';
import AnotherRoute from 'Routes/AnotherRoute';
import { BrowserRouter } from 'react-router-dom';

describe('<AnotherRoute />', () => {
  it('should render the Route normally', () => {
    const props = { children: ['AnotherRoute'] };
    render(<AnotherRoute {...props} />, { wrapper: BrowserRouter });
    expect(screen.getByText('AnotherRoute')).toBeInTheDocument;
  });
});
