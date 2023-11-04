import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  showSpinner: false,
  genericModal: {
    show: false,
    title: '',
    message: '',
  },
  especialidades: [],
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showSpinner: (state, action) => {
      state.showSpinner = action.payload;
    },
    showModal: (state, action) => {
      state.showSpinner = action.payload;
    },
    setEspecialidades: (state, action) => {
      state.especialidades = action.payload;
    },
  },
});

export const {showSpinner, showModal, setEspecialidades} = commonSlice.actions;

export default commonSlice.reducer;
