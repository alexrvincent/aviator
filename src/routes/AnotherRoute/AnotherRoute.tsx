// @ts-nocheck
import React from 'react';
import { Link } from 'Core/index';

const AnotherRoute: React.FC = (props) => {
  return (
    <div className="anotherroute">
      <Link to="/">{'To Home Page'}</Link>
      {props.children}
    </div>
  );
};

export default AnotherRoute;
