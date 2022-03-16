import React from 'react';
import HelloWorld from '../components/HelloWorld/HelloWorld';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <HelloWorld text={'Hello Boilerplate!'} onHelloWorldClick={() => console.log('Hello Click!')} />
    </div>
  );
};

export default App;
