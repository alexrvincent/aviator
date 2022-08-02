import React from 'react';
import { render, screen } from '@testing-library/react';
import HelloWorld from './HelloWorld';

describe('<HelloWorld />', () => {
  it('should render the Component normally', () => {
    const props = {
      text: 'Does it render?',
      onHelloWorldClick: () => {
        console.log('I was clicked?');
      },
    };
    render(<HelloWorld {...props} />);
    expect(screen.getByText(props.text)).toBeInTheDocument;
  });

  it('should render the text on the paragraph field passed as the text prop', () => {
    const props = {
      text: 'Write a Hello Unit Test',
      onHelloWorldClick: () => {
        console.log('I was clicked!');
      },
    };

    render(<HelloWorld {...props} />);

    expect(screen.getByText(props.text)).toBeInTheDocument;
    expect(screen.getByText(props.text).tagName).toBe('P');
  });
});
