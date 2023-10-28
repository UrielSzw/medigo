import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user.slice';
import doctorReducer from './doctor.slice';
import commonReducer from './common.slice';

export const store = configureStore({
  reducer: {
    userReducer,
    doctorReducer,
    commonReducer,
  },
});
