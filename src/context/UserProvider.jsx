/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useState, useEffect} from 'react';
import {parse} from 'cookie';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [tokenUsuario, setTokenUsuario] = useState('');

  //actualiza el token de usuario segun respuesta del servidor
  const _setTokenUsuarioRes = async () => {
    api.interceptors.response.use(
      response => {
        // Agregar el campo cookies al objeto response
        console.log('interceptors');
        const cookies = response.headers['set-cookie'];
        console.log('cookies', cookies);
        if (cookies) {
          const parsedCookies = parse(cookies[0]);
          const {tokenUsuario} = parsedCookies;
          console.log('tokenUsuario', tokenUsuario);
          if (tokenUsuario && tokenUsuario !== '') {
            response.tokenUsuario = tokenUsuario;
            setTokenUsuario(tokenUsuario);
          }
        }
        return response;
      },
      error => {
        console.error('error interceptor', error);
        if (error.response && error.response.status === 401) {
          // Si la respuesta tiene un status 401, el token es inválido o ha expirado
          // elimina el token
          setTokenUsuario('');
        }
        return Promise.reject(error);
      },
    );
  };

  // hace que se agregue el interceptor a las respuestas del servidor
  useEffect(() => {
    _setTokenUsuarioRes();
  }, []);

  //setea la cookie tokenUsuario al header de las peticiones al servidor
  const _setearRequest = config => {
    config.headers.Cookie = `tokenUsuario=${tokenUsuario}`;
    return config;
  };

  // hace que el header con la cookie se agregue a cada peticion al servidor
  const _addTokenUsuarioCookieReq = () =>
    api.interceptors.request.use(config => _setearRequest(config));
  // actualiza la cookie para las peticiones al servidor cada vez que esta cambia
  useEffect(() => {
    //primero limpia las cookies que existian
    api.interceptors.request.handlers.length = [];
    // setea la nueva cookie
    _addTokenUsuarioCookieReq();
  }, [tokenUsuario]);

  useEffect(() => {
    const loadTokenFromStorage = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('tokenUsuario');
        console.log('storedToken', storedToken);
        if (storedToken) {
          setTokenUsuario(storedToken);
        }
      } catch (error) {
        console.error('Error loading token from AsyncStorage:', error);
      }
    };

    loadTokenFromStorage();
    _setTokenUsuarioRes();
  }, []);

  useEffect(() => {
    async function saveTokenToStorage() {
      try {
        await AsyncStorage.setItem('tokenUsuario', tokenUsuario);
      } catch (error) {
        console.error('Error saving token to AsyncStorage:', error);
      }
    }

    saveTokenToStorage();
    _addTokenUsuarioCookieReq();
  }, [tokenUsuario]);
  return (
    <UserContext.Provider value={{tokenUsuario, setTokenUsuario}}>
      {children}
    </UserContext.Provider>
  );
};
