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
  } from '../Actions/actions-type'



  const initialState = {
    loading: false,
    userInfo: null, // Inicialmente null, se llenará con LOGIN_SUCCESS
    token: null,    // Inicialmente null, se llenará con LOGIN_SUCCESS
    loggedIn: false,
    error: null,
    service: null,
    services: [],
    clientServices: [],
    client: null,
  };
  
  
  const rootReducer =  (state = initialState, action) => {
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
          userInfo: action.payload,  // Admin registrado
          error: null,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          userInfo: action.payload.user, // Asegúrate de que este campo exista en la respuesta
          token: action.payload.token,  // Guardar el token
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
          return {
            ...state,
            loading: false,
            service: action.payload,
          };
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
            clientServices: action.payload,
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
              error: null,
            };
          case REGISTER_CLIENT_SUCCESS:
            return {
              ...state,
              loading: false,
              client: action.payload,
              error: null,
            };
          case REGISTER_CLIENT_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
    
      default:
        return state;
    }
  };
  export default rootReducer;