import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AnotherRoute from 'Routes/AnotherRoute';
import { BrowserRouter } from 'react-router-dom';

describe('<AnotherRoute />', () => {
  it('should render the Route normally', async () => {
    const props = { children: ['AnotherRoute'] };
    render(<AnotherRoute {...props} />, { wrapper: BrowserRouter });
    await waitFor(() => {
      expect(screen.getByText('To Home Page')).toBeInTheDocument;
    });
  });
});
