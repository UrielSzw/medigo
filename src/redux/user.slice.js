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
  familyMemberSelected: {
    sexo: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
  },
  userModals: {
    filter: false,
    familyMembers: false,
    specialty: false,
    review: false,
    doctorDetails: false,
    address: false,
    request: false,
    waitingTime: false,
  },
  disabledCancelDateTime: '0',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = {...state.userData, ...action.payload};
      console.log('state.userData', state.disabledCancelDateTime);
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
    setFamilyMemberSelected: (state, action) => {
      state.familyMemberSelected = action.payload;
    },
    setDisabledCancelDateTime: (state, action) => {
      state.disabledCancelDateTime = action.payload;
    },
    addDoctorLicense: (state, action) => {
      state.avoidDoctors.license.push(action.payload);
      console.log('nroMatricula', state.avoidDoctors.license);
    },
    removeDoctorDetails: (state, action) => {
      state.doctorDetails = initialState.doctorDetails;
    },
    removeRequestDetails: (state, action) => {
      state.requestDetails = initialState.requestDetails;
      console.log('removeRequestDetails', state.requestDetails);
    },
    toggleUserModal: (state, action) => {
      const modalName = action.payload;
      if (state.userModals.hasOwnProperty(modalName)) {
        state.userModals[modalName] = !state.userModals[modalName];
      }
    },
    clearAllUser: (state, action) => {
      return initialState;
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
  setFamilyMemberSelected,
  setDisabledCancelDateTime,
  addDoctorLicense,
  removeDoctorDetails,
  removeRequestDetails,
  toggleUserModal,
  clearAllUser,
} = userSlice.actions;

export default userSlice.reducer;
