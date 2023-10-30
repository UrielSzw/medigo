import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  doctorData: {
    nombre: '',
    apellido: '',
    direccion: '',
    dni: '',
    especialidad: '',
    fechaNacimiento: '',
    nroMatricula: '',
    precio: '',
    radioAccion: '',
    sexo: '',
    telefono: '',
    username: '',
    location: {
      latitude: '',
      longitude: '',
    },
  },
  doctorActivity: {
    date: '',
    price: '',
    review: '',
    name: '',
    lastName: '',
    address: '',
  },
};

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setDoctorData: (state, action) => {
      state.doctorData = {...state.doctorData, ...action.payload};
    },
    setDoctorActivity: (state, action) => {
      state.doctorActivity = action.payload;
    },
  },
});

export const {setDoctorData, setDoctorActivity} = doctorSlice.actions;

export default doctorSlice.reducer;
