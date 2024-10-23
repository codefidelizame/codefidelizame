// src/reducers/authReducer.js
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
  DELETE_CLIENT_SUCCESS,
  EDIT_CLIENT_SUCCESS,
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
 
} from "../Actions/actions-type";

const initialState = {
  loading: false,
  userInfo: null,
  token: null,
  loggedIn: false,
  error: null,
  service: null,
  services: [],
  clientServices: [],
  client: null,
  clients: [],
  comercios: [],
  subscriptions: [],
  success: false,
  
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload.user, 
        token: action.payload.token, 
        loggedIn: true,
        error: null,
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        userInfo: null,
        loggedIn: false,
      };
    case REGISTER_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SERVICE_SUCCESS:
      // Aquí se asume que `response.data` incluye el cliente actualizado
      const updatedClients = state.clients.map((client) =>
        client.id === action.payload.clientId // Cambia esto si tu payload es diferente
          ? { ...client, totalServices: client.totalServices + 1 } // Aumenta totalServices en 1
          : client
      );

      return { ...state, clients: updatedClients, loading: false };
    case REGISTER_SERVICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Obtener servicios por cliente
    case FETCH_CLIENT_SERVICES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CLIENT_SERVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        clientServices: action.payload.services,
      };
    case FETCH_CLIENT_SERVICES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Obtener todos los servicios
    case FETCH_ALL_SERVICES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_SERVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        services: action.payload,
      };
    case FETCH_ALL_SERVICES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REGISTER_CLIENT_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
      case REGISTER_CLIENT_REQUEST:
        return {
          ...state,
          loading: true,
          success: false,
          error: null,
        };
      case REGISTER_CLIENT_SUCCESS:
        return {
          ...state,
          loading: false,
          client: action.payload,
          success: true,
          error: null,
        };
      case REGISTER_CLIENT_FAILURE:
        return {
          ...state,
          loading: false,
          success: false,
          error: action.payload,
        };
      case RESET_REGISTER_CLIENT:
        return {
          ...state,
          success: false,  
          client: null,    
        };
    case FETCH_CLIENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        clients: action.payload, // Almacenar los clientes recibidos
      };
    case FETCH_CLIENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload, // Guardar el mensaje de error
      };
    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: state.clients.filter((client) => client.id !== action.payload),
      };
    case EDIT_CLIENT_SUCCESS:
      return {
        ...state,
        clients: state.clients.map((client) =>
          client.id === action.payload.id ? action.payload : client
        ),
      };
    case FETCH_COMERCIOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMERCIOS_SUCCESS:
      return {
        ...state,
        loading: false,
        comercios: action.payload, // Almacenar los COMERCIOSes recibidos
      };
    case FETCH_COMERCIOS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload, // Guardar el mensaje de error
      };
    case DELETE_COMERCIO_REQUEST:
    case UPDATE_COMERCIO_REQUEST:
      return { ...state, loading: true };

    case DELETE_COMERCIO_SUCCESS:
      return {
        ...state,
        loading: false,
        comercios: state.comercios.filter(
          (comercio) => comercio.id !== action.payload
        ), // Remover comercio eliminado
      };

    case UPDATE_COMERCIO_SUCCESS:
      return {
        ...state,
        loading: false,
        comercios: state.comercios.map(
          (comercio) =>
            comercio.id === action.payload.id ? action.payload : comercio // Actualizar comercio
        ),
      };

    case DELETE_COMERCIO_FAILURE:
    case UPDATE_COMERCIO_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.payload], // Agrega la nueva suscripción
      };
      
      

    default:
      return state;
  }
};
export default rootReducer;
