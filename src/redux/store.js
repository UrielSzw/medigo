import {configureStore} from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import userReducer from './user.slice';
import doctorReducer from './doctor.slice';
import commonReducer from './common.slice';

// Combinar tus reductores
const rootReducer = combineReducers({
  userReducer,
  doctorReducer,
  commonReducer,
});

// Configuración de persistencia
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Crear el reductor persistente
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Crear la tienda de Redux
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Crear el persistente
export const persistor = persistStore(store);
