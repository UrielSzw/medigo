import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import {UserProvider} from './src/context/UserProvider';
import {Routes} from './src/routes/routes';

function App() {
  return (
    <UserProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </UserProvider>
  );
}

export default App;
