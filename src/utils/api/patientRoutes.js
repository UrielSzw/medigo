import api from '.';

const rutaCliente = 'clientes';

const rutaClienteColsutas = 'clientes/consultas';

const apiPatientUpdate = async patient => {
  try {
    const responde = await api.put(`${rutaCliente}/actualizar-datos`, patient);
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiPatientRegister = async patient => {
  try {
    const responde = await api.post(`${rutaCliente}/registro`, patient);
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiListOfDoctors = async formData => {
  try {
    const responde = await api.post(
      `${rutaClienteColsutas}/solicitar-consulta`,
      formData,
    );
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiRequestDoctor = async medicoId => {
  try {
    const responde = await api.post(
      `${rutaClienteColsutas}/seleccionar-medico`,
      medicoId,
    );
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiCancelDoctor = async () => {
  try {
    const responde = await api.post(
      `${rutaClienteColsutas}/seleccionar-medico`,
    );
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiReviewDoctor = async formData => {
  try {
    const responde = await api.post(
      `${rutaClienteColsutas}/valorar-consulta`,
      formData,
    );
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiGetPatientActivity = async () => {
  try {
    const responde = await api.get(`${rutaClienteColsutas}/historialConsultas`);
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  apiPatientUpdate,
  apiPatientRegister,
  apiListOfDoctors,
  apiRequestDoctor,
  apiGetPatientActivity,
};
