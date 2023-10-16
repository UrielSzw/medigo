import React from 'react';
import {Provider} from 'react-redux';
import {Routes} from './src/routes/routes';
import {store} from './src/redux/store';
import {UserProvider} from './src/context/UserProvider';

function App() {
  return (
    <UserProvider>
      <Provider store={store}>
        <Routes />
      </Provider>
    </UserProvider>
  );
}

export default App;
