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
  userState: {
    appointmentState: false,
    listOfDoctorsState: false,
  },
  doctorDetails: {
    apellido: '',
    comentarios: [],
    especialidad: '',
    latitud: '',
    longitud: '',
    nombre: '',
    nroMatricula: '',
    precio: '',
    resenas: 0,
    tiempo: 0,
    valoracion: 0,
  },
  requestDetails: {
    sintomas: '',
    motivo: '',
    especialidad: '',
    latitud: '',
    longitud: '',
    nombre: '',
    apellido: '',
    direccion: '',
  },
  avoidDoctors: {
    license: [],
  },
  listOfDoctorsData: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = {...state.userData, ...action.payload};
    },
    setUserState: (state, action) => {
      state.userState = {...state.userState, ...action.payload};
    },
    setUserActivity: (state, action) => {
      state.userActivity = action.payload;
    },
    setDoctorDetails: (state, action) => {
      state.doctorDetails = action.payload;
    },
    setRequestDetails: (state, action) => {
      state.requestDetails = action.payload;
    },
    setListOfDoctorsData: (state, action) => {
      state.listOfDoctorsData = action.payload;
    },
    addDoctorLicense: (state, action) => {
      state.requestDetails = [...state.requestDetails, action.payload];
    },
    removeDoctorDetails: (state, action) => {
      state.doctorDetails = initialState.doctorDetails;
    },
    removeRequestDetails: (state, action) => {
      state.requestDetails = initialState.requestDetails;
    },
  },
});

export const {
  setUserData,
  setUserActivity,
  setUserState,
  setDoctorDetails,
  setRequestDetails,
  setListOfDoctorsData,
  addDoctorLicense,
  removeDoctorDetails,
  removeRequestDetails,
} = userSlice.actions;

export default userSlice.reducer;
