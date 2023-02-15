import React from 'react';
import HelloFeatureItem from 'Features/HelloFeature/HelloFeatureItem';

const HelloRoute: React.FC = (props) => {
  return (
    <div className="helloroute">
      <HelloFeatureItem text={'Hello Boilerplate!'} onHelloFeatureClick={() => console.log('Hello Click!')} />
      {props.children}
    </div>
  );
};

export default HelloRoute;
