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
      longitud: '',
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
    fechaSeleccion: -1,
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
      console.log('dasdasasd', state.requestData);
    },
    setDoctorActivity: (state, action) => {
      state.doctorActivity = action.payload;
    },
    resetRequestData: (state, action) => {
      state.requestData = initialState.requestData;
    },
    changeFechaSeleccion: (state, action) => {
      state.requestData.fechaSeleccion = action.payload;
    },
    decrementFechaSeleccion: state => {
      state.requestData.fechaSeleccion -= 1;
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
  resetRequestData,
  changeFechaSeleccion,
  decrementFechaSeleccion,
  clearAllDoctor,
} = doctorSlice.actions;

export default doctorSlice.reducer;
