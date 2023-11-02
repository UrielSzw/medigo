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
    ciudad: '',
    codigoPostal: '',
    location: {
      latitude: '',
      longitude: '',
    },
    grupoFamiliar: [],
  },
  userActivity: {
    apellido: '',
    apellidoMedico: '',
    fechaAtencion: '',
    direccion: '',
    especialidad: '',
    nombre: '',
    nombreMedico: '',
    precio: '',
    valoracionMedico: 0,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = {...state.userData, ...action.payload};
    },
    setUserActivity: (state, action) => {
      state.userActivity = action.payload;
    },
  },
});

export const {setUserData, setUserActivity} = userSlice.actions;

export default userSlice.reducer;
