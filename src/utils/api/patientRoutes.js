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

export {apiPatientUpdate};
