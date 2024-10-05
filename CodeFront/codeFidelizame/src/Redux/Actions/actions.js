// authActions.js
import axios from 'axios';
import { BASE_URL } from "../../Config";
import {jwtDecode} from 'jwt-decode';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_SERVICE_REQUEST,
  REGISTER_SERVICE_SUCCESS,
  REGISTER_SERVICE_FAILURE,
  FETCH_CLIENT_SERVICES_REQUEST,
  FETCH_CLIENT_SERVICES_SUCCESS,
  FETCH_CLIENT_SERVICES_FAILURE,
  FETCH_ALL_SERVICES_REQUEST,
  FETCH_ALL_SERVICES_SUCCESS,
  FETCH_ALL_SERVICES_FAILURE,
} from './actions-type';

// Acción para registrar un nuevo usuario/admin
export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data, // Podría contener el admin creado
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response.data.message || 'Error en el registro',
    });
  }
};
export const login = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
    const { user, token } = response.data; // Desestructuración de la respuesta

    // Verifica la información recibida
    console.log('Respuesta del servidor:', response.data); // Log de toda la respuesta
    console.log('Usuario:', user); // Log solo del usuario
    console.log('Token:', token); // Log solo del token
// Guardar el token y la información del usuario en el localStorage
localStorage.setItem('token', token);
localStorage.setItem('userInfo', JSON.stringify(user)); // Convertimos a JSON para localStorage

    // Dispatch de la acción de éxito
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user, token },
    });

    
    // Verifica lo que se guarda en localStorage
    console.log('Token guardado en localStorage:', token);
    console.log('userInfo guardado en localStorage:', JSON.stringify(user)); // Log de userInfo guardado
  } catch (error) {
    console.error('Error al iniciar sesión:', error); // Log del error
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || 'Error en el inicio de sesión',
    });
  }
};

// Acción para cerrar sesión (logout)
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};

// Registrar un nuevo servicio
export const registerService = (serviceData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_SERVICE_REQUEST });

    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar los headers para incluir el token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Agregar el token en los headers
      },
    };

    const response = await axios.post(`${BASE_URL}/services`, serviceData, config);

    dispatch({ type: REGISTER_SERVICE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: REGISTER_SERVICE_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};


// Obtener servicios por cliente
export const fetchClientServices = (clientId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CLIENT_SERVICES_REQUEST });

    const response = await axios.get(`${BASE_URL}/services/client/${clientId}`);

    dispatch({ type: FETCH_CLIENT_SERVICES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: FETCH_CLIENT_SERVICES_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Obtener todos los servicios
export const fetchAllServices = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_SERVICES_REQUEST });

    const response = await axios.get(`${BASE_URL}/services`);

    dispatch({ type: FETCH_ALL_SERVICES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_SERVICES_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};