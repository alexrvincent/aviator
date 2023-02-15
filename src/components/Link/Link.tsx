import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface LinkProps {
  to: string;
}
// @ts-ignore
const Link: FC<LinkProps> = ({ children, to, linkProps }) => {
  const navigate = useNavigate();

  // @ts-ignore
  const cb = (e) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} className="link" onClick={cb} {...linkProps}>
      {children}
    </a>
  );
};

export default Link;
