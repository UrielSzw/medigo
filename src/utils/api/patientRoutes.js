import api from '.';

const rutaCliente = 'clientes';

const apiPatientUpdate = async patient => {
  try {
    const responde = await api.post(`${rutaCliente}/actualizar-datos`, patient);
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

export {apiPatientUpdate, apiPatientRegister};
