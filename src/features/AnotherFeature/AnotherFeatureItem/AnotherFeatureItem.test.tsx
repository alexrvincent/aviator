import React from 'react';
import { render, screen } from '@testing-library/react';
import AnotherFeatureItem from './AnotherFeatureItem';
import { BrowserRouter } from 'react-router-dom';

describe('<AnotherFeatureItem />', () => {
  it('should render the Component normally', () => {
    const props = { children: ['AnotherFeatureItem'] };
    render(<AnotherFeatureItem {...props} />, { wrapper: BrowserRouter });
    expect(screen.getByText('AnotherFeatureItem')).toBeInTheDocument;
  });
});
