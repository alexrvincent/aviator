import React from 'react';
import HelloWorld from 'Components/HelloWorld';

const HelloRoute: React.FC = (props) => {
  return (
    <div className="helloroute">
      <HelloWorld text={'Hello Boilerplate!'} onHelloWorldClick={() => console.log('Hello Click!')} />
      {props.children}
    </div>
  );
};

export default HelloRoute;
