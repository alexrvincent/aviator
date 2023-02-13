import React from 'react';

type Props = {
  children?: React.ReactNode;
  text?: string;
  className?: string;
};

const Button: React.FC<Props> = (props) => {
  return <button className={`btn ${props.className}`}>{props.text || props.children}</button>;
};

export default Button;
