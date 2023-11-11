import api from '.';

const rutaCliente = 'clientes';

const rutaClienteColsutas = 'clientes/consultas';

const apiPatientUpdate = async patient => {
  try {
    console.log('apiPatientUpdate');
    const responde = await api.put(`${rutaCliente}/actualizar-datos`, patient);
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiPatientRegister = async patient => {
  try {
    console.log('apiPatientRegister');
    const responde = await api.post(`${rutaCliente}/registro`, patient);
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiDeleteFamilyMember = async famMember => {
  try {
    console.log('apiDeleteFamilyMember');
    const responde = await api.put(
      `${rutaCliente}/eliminar-miembro`,
      famMember,
    );
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiAddFamilyMember = async famMember => {
  try {
    console.log('apiAddFamilyMember');
    const responde = await api.post(
      `${rutaCliente}/agregar-miembro`,
      famMember,
    );
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiUpdateFamilyMember = async famMember => {
  try {
    console.log('apiUpdateFamilyMember');
    const responde = await api.put(
      `${rutaCliente}/modificar-miembro`,
      famMember,
    );
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiListOfDoctors = async formData => {
  try {
    console.log('apiListOfDoctors');
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

const apiRequestDoctor = async nroMatricula => {
  try {
    console.log('apiRequestDoctor');
    const responde = await api.post(
      `${rutaClienteColsutas}/seleccionar-medico`,
      nroMatricula,
    );
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiLastRequestState = async () => {
  try {
    console.log('apiLastRequestState');
    const responde = await api.get(
      `${rutaClienteColsutas}/solicitar-estado-ultima-consulta`,
    );
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiCancelDoctor = async () => {
  console.log('apiCancelDoctor');
  try {
    console.log('apiCancelDoctor');
    const responde = await api.put(`${rutaClienteColsutas}/cancelar-consulta`);
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiCancelBeforeStart = async () => {
  try {
    console.log('apiCancelBeforeStart');
    const responde = await api.put(
      `${rutaClienteColsutas}/cancelar-consulta-sin-empezar`,
    );
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiRemoveRequest = async () => {
  try {
    console.log('apiRemoveRequest');
    const responde = await api.put(`${rutaClienteColsutas}/remover-consulta`);
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiReviewDoctor = async formData => {
  try {
    console.log('apiReviewDoctor');
    const responde = await api.put(
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
    console.log('apiGetPatientActivity');
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
  apiDeleteFamilyMember,
  apiAddFamilyMember,
  apiUpdateFamilyMember,
  apiListOfDoctors,
  apiRequestDoctor,
  apiGetPatientActivity,
  apiLastRequestState,
  apiCancelDoctor,
  apiCancelBeforeStart,
  apiReviewDoctor,
  apiRemoveRequest,
};
