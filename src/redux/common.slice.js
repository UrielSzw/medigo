import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  showSpinner: false,
  genericModal: {
    show: false,
    title: '',
    message: '',
  },
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showSpinner: (state, action) => {
      state.showSpinner = action.payload;
    },
  },
});

export const {showSpinner} = commonSlice.actions;

export default commonSlice.reducer;
