import React from 'react';
import { render, screen } from '@testing-library/react';
import HelloFeatureItem from './HelloFeatureItem';

describe('<HelloFeatureItem />', () => {
  it('should render the Component normally', () => {
    const props = {
      text: 'Does it render?',
      onHelloFeatureClick: () => {
        console.log('I was clicked?');
      },
    };
    render(<HelloFeatureItem {...props} />);
    expect(screen.getByText(props.text)).toBeInTheDocument;
  });

  it('should render the text on the paragraph field passed as the text prop', () => {
    const props = {
      text: 'Write a Hello Unit Test',
      onHelloFeatureClick: () => {
        console.log('I was clicked!');
      },
    };

    render(<HelloFeatureItem {...props} />);

    expect(screen.getByText(props.text)).toBeInTheDocument;
    expect(screen.getByText(props.text).tagName).toBe('P');
  });
});
