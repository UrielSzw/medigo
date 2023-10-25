import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: {
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: '',
    username: '',
    password: '',
    telefono: '',
    sexo: '',
    direccion: '',
    location: {
      latitude: '',
      longitude: '',
    },
    grupoFamiliar: [],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = {...state.userData, ...action.payload};
    },
  },
});

export const {setUserData} = userSlice.actions;

export default userSlice.reducer;
