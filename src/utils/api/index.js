import axios from 'axios';

const baseURL = 'https://medigo.server.losko.com.ar/';
// const baseURL = 'http://192.168.0.139:3000/';

const api = axios.create({
  baseURL,
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const addTokenUsuarioCookie = tokenUsuario => {
  api.interceptors.request.use(
    config => (config.headers.Cookie = `tokenUsuario=${tokenUsuario}`),
  );
};

export default api;
