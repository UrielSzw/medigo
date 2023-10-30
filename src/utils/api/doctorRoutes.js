import api from '.';

const rutaDoctores = 'medicos';

const rutaDoctoresConsultas = 'medicos/consultas';

const apiDoctorsRegister = async doctor => {
  try {
    const response = await api.post(`${rutaDoctores}/registro`, doctor);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiDoctorsUpdate = async doctor => {
  try {
    const response = await api.put(`${rutaDoctores}/actualizar-datos`, doctor);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiDoctorsUpdateState = async () => {
  try {
    const response = await api.put(`${rutaDoctores}/actualizar-estado`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiRequireRequest = async () => {
  try {
    const response = await api.get(
      `${rutaDoctoresConsultas}/solicitar-consulta`,
    );
    return {result: {nombre: 'pepe'}};
    // return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiAcceptRequest = async () => {
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
  try {
    const response = await api.post(
      `${rutaDoctoresConsultas}/solicitar-estado-ultima-consulta`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiEndAppointment = async () => {
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
  try {
    const response = await api.post(
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
  try {
    const response = await api.get(`${rutaDoctoresConsultas}/valorar-consulta`);
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
};
