import React from 'react';
import { screen } from '@testing-library/react';
import HelloFeatureItem from './HelloFeatureItem';
import { render } from 'test/renderWithQuery';

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

  it('should render the text on the div field passed as the text prop', () => {
    const props = {
      text: 'Write a Hello Unit Test',
      onHelloFeatureClick: () => {
        console.log('I was clicked!');
      },
    };

    render(<HelloFeatureItem {...props} />);

    expect(screen.getByText(props.text)).toBeInTheDocument;
    expect(screen.getByText(props.text).tagName).toBe('DIV');
  });
});
