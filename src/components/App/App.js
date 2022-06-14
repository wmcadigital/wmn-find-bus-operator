import React, { useEffect } from 'react';
import ContextProvider from 'globalState/ContextProvider';
import FindBusRoute from '../FindBusRoute/FindBusRoute';

function App() {
  useEffect(() => {
    document.getElementById('year').innerHTML = new Date().getFullYear();
  }, []);

  return (
    <React.StrictMode>
      <ContextProvider>
        <FindBusRoute />
      </ContextProvider>
    </React.StrictMode>
  );
}

export default App;
