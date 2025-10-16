import React from 'react';
import ContextProvider from 'globalState/ContextProvider';
import FindBusRoute from '../FindBusRoute/FindBusRoute';

function App() {
  return (
    <React.StrictMode>
      <ContextProvider>
        <FindBusRoute />
      </ContextProvider>
    </React.StrictMode>
  );
}

export default App;
