import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  doctorData: {
    active: false,
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
    notes: '',
  },
  requestData: {
    accepted: false,
    requested: false,
    motivo: '',
    sintomas: '',
    precio: '',
    tiempoLlegada: '',
    estado: '',
    especialidad: '',
    valoracionMedico: '',
    valoracionCliente: '',
    comentarioDelCliente: '',
    comentarioDelMedico: '',
    direccion: '',
    observacion: '',
    createdAt: '',
    updateAt: '',
    latitudCliente: '',
    longitudCliente: '',
    fechaSeleccion: '',
    nombre: '',
    apellido: '',
    sexo: '',
    fechaNacimiento: '',
  },
};

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setDoctorData: (state, action) => {
      state.doctorData = {...state.doctorData, ...action.payload};
    },
    setRequestData: (state, action) => {
      state.requestData = {...state.requestData, ...action.payload};
    },
    setDoctorActivity: (state, action) => {
      state.doctorActivity = action.payload;
    },
    clearAllDoctor: (state, action) => {
      return initialState;
    },
  },
});

export const {
  setDoctorData,
  setDoctorActivity,
  setRequestData,
  clearAllDoctor,
} = doctorSlice.actions;

export default doctorSlice.reducer;
