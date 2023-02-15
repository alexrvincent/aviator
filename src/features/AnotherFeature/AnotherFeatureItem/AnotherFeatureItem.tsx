import React from 'react';
import Link from 'Components/Link';

const AnotherFeatureItem: React.FC = (props) => {
  return (
    <div className="anotherfeatureitem">
      <Link to="/">{'To Home Page'}</Link>
      {props.children}
    </div>
  );
};

export default AnotherFeatureItem;
