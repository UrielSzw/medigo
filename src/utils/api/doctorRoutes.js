import api from '.';

const rutaDoctores = 'medicos';

const apiDoctorsRegister = async doctor => {
  try {
    const responde = await api.post(`${rutaDoctores}/registro`, doctor);
    return responde.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {apiDoctorsRegister};
