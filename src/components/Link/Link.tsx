import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface LinkProps {
  to: string;
}

const Link: FC<LinkProps> = ({ children, to }) => {
  const navigate = useNavigate();

  const cb = () => {
    navigate(to);
  };

  return (
    <a className="link" onClick={cb}>
      {children}
    </a>
  );
};

export default Link;
