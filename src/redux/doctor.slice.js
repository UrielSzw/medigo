import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  doctorData: {
    email: '',
    password: '',
    type: '',
    address: '',
    location: {
      latitude: '',
      longitude: '',
    },
  },
};

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setDoctorData: (state, action) => {
      state.doctorData = {...state.doctorData, ...action.payload};
      console.log(state.doctorData);
    },
  },
});

export const {setDoctorData} = doctorSlice.actions;

export default doctorSlice.reducer;
