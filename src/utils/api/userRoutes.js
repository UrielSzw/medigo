import api from '.';

const rutaUsuarios = 'usuarios';

const apiUsuariosLogin = async usuario => {
  try {
    const {username, password} = usuario;
    const response = await api.post(`${rutaUsuarios}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const apiEspecialidades = async () => {
  try {
    const response = await api.get('especialidades');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {apiUsuariosLogin, apiEspecialidades};
