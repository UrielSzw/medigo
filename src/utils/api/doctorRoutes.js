import api from '.';

const rutaDoctores = 'medicos';

const rutaDoctoresConsultas = 'medicos/consultas';

const apiDoctorsRegister = async doctor => {
  console.log('apiDoctorsRegister');
  try {
    const response = await api.post(`${rutaDoctores}/registro`, doctor);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiDoctorsUpdate = async doctor => {
  console.log('apiDoctorsUpdate');
  try {
    const response = await api.put(`${rutaDoctores}/actualizar-datos`, doctor);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiDoctorsUpdateState = async () => {
  console.log('apiDoctorsUpdateState');
  try {
    const response = await api.put(`${rutaDoctores}/actualizar-estado`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiRequireRequest = async () => {
  console.log('apiRequireRequest');
  try {
    const response = await api.get(
      `${rutaDoctoresConsultas}/solicitar-consulta`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiAcceptRequest = async () => {
  console.log('apiAcceptRequest');
  try {
    const response = await api.post(
      `${rutaDoctoresConsultas}/aceptar-consulta`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiDeclineRequest = async () => {
  console.log('apiDeclineRequest');
  try {
    const response = await api.put(
      `${rutaDoctoresConsultas}/rechazar-consulta`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiCancelRequest = async () => {
  console.log('apiCancelRequest');
  try {
    const response = await api.put(
      `${rutaDoctoresConsultas}/cancelar-consulta`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiLastRequestState = async () => {
  console.log('apiLastRequestState');
  try {
    const response = await api.get(
      `${rutaDoctoresConsultas}/solicitar-estado-ultima-consulta`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiEndAppointment = async () => {
  console.log('apiEndAppointment');
  try {
    const response = await api.put(
      `${rutaDoctoresConsultas}/finalizar-consulta`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiReviewPatient = async formData => {
  console.log('apiReviewPatient');
  try {
    const response = await api.put(
      `${rutaDoctoresConsultas}/valorar-consulta`,
      formData,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiGetDoctorActivity = async () => {
  console.log('apiGetDoctorActivity');
  try {
    const response = await api.get(
      `${rutaDoctoresConsultas}/historialConsultas`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiUpdateNotes = async note => {
  console.log('apiUpdateNotes');
  try {
    const response = await api.put(
      `${rutaDoctoresConsultas}/observacion-consulta`,
      note,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  apiDoctorsRegister,
  apiAcceptRequest,
  apiEndAppointment,
  apiReviewPatient,
  apiGetDoctorActivity,
  apiDoctorsUpdateState,
  apiRequireRequest,
  apiDeclineRequest,
  apiCancelRequest,
  apiLastRequestState,
  apiDoctorsUpdate,
  apiUpdateNotes,
};
