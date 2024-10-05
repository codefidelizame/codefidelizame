import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/Actions/actions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selecciona solo lo que necesitas
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const userInfo = useSelector((state) => state.userInfo); // Asegúrate de que esto esté correctamente referenciado

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials)); // Dispatch de la acción de login
  };

  useEffect(() => {
    console.log('Estado de userInfo:', userInfo);
    const token = localStorage.getItem('token'); // Verificamos el token en localStorage
  
    if (userInfo && token) { // Comprobamos que userInfo y el token existan
      console.log('Usuario autenticado:', userInfo);
      navigate('/panel'); // Redirige a la página deseada
    }
  }, [userInfo, navigate]);
  
  
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-nunito text-gray-700 mb-2">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2">Contraseña</label>
            <input
              type={showPassword ? 'text' : 'password'} // Mostrar u ocultar la contraseña
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
              placeholder="Ingresa tu contraseña"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>

          <button
            type="submit"
            className={`w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

