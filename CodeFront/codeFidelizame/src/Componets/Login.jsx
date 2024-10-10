import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/Actions/actions';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LoginImage from '../assets/Fide4.png'; // Asegúrate de que la imagen esté en esta ruta
import Logo from '../assets/code.png';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const userInfo = useSelector((state) => state.userInfo);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (userInfo && token) {
      navigate('/panel');
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      {/* Navbar con el logo */}
      <nav className="w-full flex justify-start items-center py-4 px-8 bg-transparent">
        <Link to="/" className="text-white text-xl font-bold cursor-pointer flex items-center">
          <img src={Logo} alt="Logo" className="h-14 w-14 mr-2 rounded-full" />
          
        </Link>
      </nav>

      <div className="flex items-center justify-center flex-grow md: m-8">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row items-center justify-between">
          {/* Imagen que se mostrará solo en pantallas medianas o más grandes */}
          <div className="hidden md:block w-1/2 ">
            <img src={LoginImage} alt="Login" className="object-cover h-full w-full rounded-md p-4" />
          </div>

          {/* Formulario de inicio de sesión */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-center font-nunito">Iniciar Sesión</h2>

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
                <label className="block text-gray-700 mb-2 font-nunito">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-2 w-full pr-10"
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
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
      </div>
    </div>
  );
};

export default Login;
