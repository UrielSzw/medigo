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
    piso: '',
    departamento: '',
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
  waitingCount: '0',
  waitingModal: false,
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
    setFamilyMemberSelected: (state, action) => {
      state.familyMemberSelected = action.payload;
    },
    setDisabledCancelDateTime: (state, action) => {
      state.disabledCancelDateTime = action.payload;
    },
    setWaitingCount: (state, action) => {
      state.waitingCount = action.payload;
    },
    setWaitingModal: (state, action) => {
      state.waitingModal = action.payload;
    },
    updateFamilyMember: (state, action) => {
      const {
        nombreViejo,
        apellidoViejo,
        nombreNuevo,
        apellidoNuevo,
        sexoNuevo,
        fechaNacimientoNuevo,
        fechaNacimientoViejo,
      } = action.payload;

      const newFamilyGroup = state.userData.grupoFamiliar.map(fam => {
        if (
          fam.nombre === nombreViejo &&
          fam.apellido === apellidoViejo &&
          fam.fechaNacimiento === fechaNacimientoViejo
        ) {
          state.familyMemberSelected = {
            sexo: sexoNuevo,
            nombre: nombreNuevo,
            apellido: apellidoNuevo,
            fechaNacimiento: fechaNacimientoNuevo,
          };

          return {
            sexo: sexoNuevo,
            nombre: nombreNuevo,
            apellido: apellidoNuevo,
            fechaNacimiento: fechaNacimientoNuevo,
          };
        } else {
          return fam;
        }
      });

      state.userData.grupoFamiliar = newFamilyGroup;
    },
    addDoctorLicense: (state, action) => {
      state.avoidDoctors.license.push(action.payload);
    },
    removeDoctorDetails: (state, action) => {
      state.doctorDetails = initialState.doctorDetails;
    },
    removeRequestDetails: (state, action) => {
      state.requestDetails = initialState.requestDetails;
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
  setWaitingCount,
  setWaitingModal,
  updateFamilyMember,
  addDoctorLicense,
  removeDoctorDetails,
  removeRequestDetails,
  toggleUserModal,
  clearAllUser,
} = userSlice.actions;

export default userSlice.reducer;
