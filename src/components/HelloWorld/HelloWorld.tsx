import React from 'react';
import './HelloWorld.scss';
import { classNames } from 'Core/index';

// Use an interface for public API definitions or when authoring a 3rd part api
// interface Props {
//   text: string;
// }

// Function declaration
// function HelloWorld(props: Props): React.ReactNode {
//   return <p> {'Hello World'}</p>
// }

// Use type for local props or state
type Props = {
  text: string; // The text to appear on the HelloWorld
  onHelloWorldClick: () => void; // a callback to run when the HelloWorld is clicked
};

const HelloWorld: React.FC<Props> = (props) => {
  const { text, onHelloWorldClick } = props;

  const cls = classNames({
    HelloWorld: true,
  });

  return (
    <p className={cls} onClick={onHelloWorldClick}>
      {text || 'Hello World'}
    </p>
  );
};

export default HelloWorld;
