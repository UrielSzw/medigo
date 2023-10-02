import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: {
    email: '',
    password: '',
    type: '',
    address: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = {...state.userData, ...action.payload};
      console.log(state.userData);
    },
  },
});

export const {setUserData} = userSlice.actions;

export default userSlice.reducer;
