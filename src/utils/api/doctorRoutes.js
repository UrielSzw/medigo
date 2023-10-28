import api from '.';

const rutaDoctores = 'medicos';

const rutaDoctoresConsultas = 'medicos/consultas';

const apiDoctorsRegister = async doctor => {
  try {
    const responde = await api.post(`${rutaDoctores}/registro`, doctor);
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiDoctorsUpdate = async doctor => {
  try {
    const responde = await api.post(`${rutaDoctores}/actualizar-datos`, doctor);
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiAcceptRequest = async consultaId => {
  try {
    const responde = await api.post(
      `${rutaDoctores}/aceptar-consulta`,
      consultaId,
    );
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiEndAppointment = async consultaId => {
  try {
    const responde = await api.post(
      `${rutaDoctores}/finalizar-consulta`,
      consultaId,
    );
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiReviewPatient = async formData => {
  try {
    const responde = await api.post(
      `${rutaDoctores}/valorar-consulta`,
      formData,
    );
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiGetDoctorActivity = async () => {
  try {
    const responde = await api.get(`${rutaDoctores}/valorar-consulta`);
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {apiDoctorsRegister};
