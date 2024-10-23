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
  REGISTER_CLIENT_REQUEST,
  REGISTER_CLIENT_SUCCESS,
  REGISTER_CLIENT_FAILURE,
  RESET_REGISTER_CLIENT,
  FETCH_CLIENTS_REQUEST, 
  FETCH_CLIENTS_SUCCESS, 
  FETCH_CLIENTS_FAIL,
  DELETE_CLIENT_REQUEST,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAIL,
  EDIT_CLIENT_REQUEST,
  EDIT_CLIENT_SUCCESS,
  EDIT_CLIENT_FAIL,
  FETCH_COMERCIOS_REQUEST,
  FETCH_COMERCIOS_SUCCESS,
  FETCH_COMERCIOS_FAIL,
  DELETE_COMERCIO_REQUEST, 
  DELETE_COMERCIO_SUCCESS, 
  DELETE_COMERCIO_FAILURE, 
  UPDATE_COMERCIO_REQUEST, 
  UPDATE_COMERCIO_SUCCESS, 
  UPDATE_COMERCIO_FAILURE,
  UPDATE_SUBSCRIPTION_REQUEST,
  UPDATE_SUBSCRIPTION_SUCCESS,
  UPDATE_SUBSCRIPTION_FAIL,
  CREATE_SUBSCRIPTION,
  PASSWORD_RESET_EMAIL_SENT,
  PASSWORD_RESET_EMAIL_FAILED

} from './actions-type';

// Acción para registrar un nuevo Comercio
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
    // Log de las credenciales enviadas
    console.log('Credenciales enviadas:', credentials);

    const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
    const { user, token } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('userInfo', JSON.stringify(user));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user, token },
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
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


export const fetchClientServices = (clientId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CLIENT_SERVICES_REQUEST });

    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar los headers para incluir el token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Llamada a la API
    const response = await axios.get(`${BASE_URL}/services/client/${clientId}`, config);

    console.log('Response data from API:', response.data);

    // Si la respuesta está vacía (puede depender de cómo esté configurado el backend)
    if (response.status === 404 || response.data.length === 0) {
      dispatch({ type: FETCH_CLIENT_SERVICES_SUCCESS, payload: [] });
    } else {
      dispatch({ type: FETCH_CLIENT_SERVICES_SUCCESS, payload: response.data });
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Manejar 404 como un caso en el que no hay servicios en lugar de un error
      dispatch({ type: FETCH_CLIENT_SERVICES_SUCCESS, payload: [] });
    } else {
      console.log('Error fetching client services:', error.response ? error.response.data.message : error.message);

      dispatch({
        type: FETCH_CLIENT_SERVICES_FAILURE,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
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

export const registerClient = (clientData) => async (dispatch, getState) => {
  dispatch({ type: REGISTER_CLIENT_REQUEST });

  // Obtener el token del estado
  const state = getState();
  const token = state.token; // Asegúrate de que aquí estás accediendo correctamente al token

  console.log('Token en la acción:', token); // Verifica que el token esté aquí

  try {
    const response = await axios.post(`${BASE_URL}/clientes`, clientData, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluye el token en los encabezados
      },
    });
    dispatch({
      type: REGISTER_CLIENT_SUCCESS,
      payload: response.data,
    });

    // Reiniciar el estado de registro después de un tiempo
    setTimeout(() => {
      dispatch({ type: RESET_REGISTER_CLIENT });
    }, 2000); // Puedes ajustar el tiempo como lo necesites

  } catch (error) {
    console.error('Error en el registro del cliente:', error); // Verifica el error
    dispatch({
      type: REGISTER_CLIENT_FAILURE,
      payload: error.response?.data.message || 'Error en el registro del cliente',
    });
  }
};


export const fetchClients = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_CLIENTS_REQUEST });

  try {
    // Obtener el token almacenado en localStorage o desde el estado de Redux
    const token = localStorage.getItem('token') || getState().userLogin.token;

    // Configurar los encabezados de la solicitud para incluir el token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado Authorization
      },
    };

    // Realizar la solicitud GET a la API de clientes
    const response = await axios.get(`${BASE_URL}/clientes`, config);

    const { clients } = response.data;

    // Verifica si se obtuvieron clientes
    console.log('Clientes obtenidos:', clients);

    // Dispatch de la acción de éxito con los datos de los clientes
    dispatch({
      type: FETCH_CLIENTS_SUCCESS,
      payload: clients,
    });
  } catch (error) {
    // Imprimir el error para depuración
    console.error('Error al obtener clientes:', error);

    // Dispatch de la acción de fallo
    dispatch({
      type: FETCH_CLIENTS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
export const deleteClient = (id) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('token') || getState().userLogin.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${BASE_URL}/clientes/${id}`, config);

    dispatch({
      type: DELETE_CLIENT_SUCCESS,
      payload: id, // Deberías enviar el ID para eliminarlo del estado
    });
  } catch (error) {
    dispatch({
      type: DELETE_CLIENT_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
export const editClient = (clientId, clientData) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('token') || getState().userLogin.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(`${BASE_URL}/clientes/${clientId}`, clientData, config);
    const updatedClient = response.data.client; // Asegúrate de que la respuesta devuelva el cliente actualizado correctamente

    dispatch({
      type: 'EDIT_CLIENT_SUCCESS',
      payload: updatedClient, // Enviamos el cliente actualizado
    });
  } catch (error) {
    dispatch({
      type: 'EDIT_CLIENT_FAIL',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


export const fetchComercios = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_COMERCIOS_REQUEST });

  try {
    
    const response = await axios.get(`${BASE_URL}/auth/comercios` );

    // Imprimir la respuesta completa para depuración
    console.log('Response:', response);

    // Acceder directamente a los comercios desde la respuesta
    const comercios = response.data; // Accede directamente a los datos
    console.log('Comercios obtenidos:', comercios);

    // Verifica si se obtuvieron comercios
    console.log('Comercios obtenidos:', comercios);

    // Dispatch de la acción de éxito con los datos de los comercios
    dispatch({
      type: FETCH_COMERCIOS_SUCCESS,
      payload: comercios, // Asegúrate de pasar el array directamente
    });
  } catch (error) {
    // Imprimir el error para depuración
    console.error('Error al obtener comercios:', error);

    // Dispatch de la acción de fallo
    dispatch({
      type: FETCH_COMERCIOS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


export const deleteComercio = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_COMERCIO_REQUEST });

    const token = localStorage.getItem('token') || getState().userLogin.token; // Asegurarse de que el token del usuario esté presente
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${BASE_URL}/auth/comercios/${id}`, config); // Llamada a la API para eliminar

    dispatch({ type: DELETE_COMERCIO_SUCCESS, payload: id }); // Pasamos el id para poder eliminarlo en el reducer
  } catch (error) {
    dispatch({
      type: DELETE_COMERCIO_FAILURE,
      payload: error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message,
    });
  }
};

// actions/comercioActions.js
export const updateComercio = (id, updatedData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_COMERCIO_REQUEST });

    const token = localStorage.getItem('token') || getState().userLogin.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`${BASE_URL}/auth/comercios/${id}`, updatedData, config); // Llamada a la API para actualizar

    dispatch({ type: UPDATE_COMERCIO_SUCCESS, payload: data }); // Mandar los datos actualizados
  } catch (error) {
    dispatch({
      type: UPDATE_COMERCIO_FAILURE,
      payload: error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message,
    });
  }
};

export const updateSubscription = (comercioId, subscriptionId, updatedData) => async (dispatch) => {
  dispatch({ type: UPDATE_SUBSCRIPTION_REQUEST });

  try {
    const response = await axios.put(`${BASE_URL}/subscription/comercio/${comercioId}/${subscriptionId}`, updatedData);

    dispatch({
      type: UPDATE_SUBSCRIPTION_SUCCESS,
      payload: response.data.subscription, // Actualizar el estado con la suscripción modificada
    });
  } catch (error) {
    console.error('Error al actualizar la suscripción:', error);

    dispatch({
      type: UPDATE_SUBSCRIPTION_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};



export const createSubscription = (subscriptionData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}/subscription`, subscriptionData);
      dispatch({
        type: CREATE_SUBSCRIPTION,
        payload: response.data, // Puedes ajustar esto según lo que retorne tu API
      });
      return response.data; // Para usar en tu componente
    } catch (error) {
      console.error("Error creando la suscripción:", error);
      throw error; // Propaga el error si es necesario
    }
  };
};

export const sendPasswordResetEmail = (email) => async (dispatch) => {
  try {
    // Hacer la solicitud POST a la ruta correspondiente
    const response = await axios.post(`${BASE_URL}/auth/password-reset`, { email });

    // Aquí puedes manejar la respuesta, por ejemplo:
    dispatch({
      type: PASSWORD_RESET_EMAIL_SENT,
      payload: response.data, // Suponiendo que el backend devuelve algún mensaje
    });
  } catch (error) {
    // Manejo de errores
    dispatch({
      type: PASSWORD_RESET_EMAIL_FAILED,
      payload: error.response.data.message || 'Error al enviar el correo',
    });
  }
};

