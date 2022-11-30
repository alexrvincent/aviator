import React from 'react';
import Routes from 'Routes/index';
import NavBar from 'Components/NavBar';
import classNames from 'util/classNames';

const App: React.FC = () => {
  // Root level class name. Use sparingly.
  const cls = classNames({
    app: true,
  });

  return (
    <div className={cls}>
      <NavBar />
      {/* Add top level app integrations here (Redux, Router, Internationalization), etc. For adding Contexts, see AppProvider.tsx */}
      <Routes />
    </div>
  );
};

export default App;
