import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerClient, logout } from '../Redux/Actions/actions';
import Logo from '../assets/code.png'; 
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterClientForm = () => {
  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const success = useSelector((state) => state.success); // Asegúrate de tener este estado en tu reducer
  const userInfo = useSelector((state) => state.userInfo);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInfo && !token) {
      alert('Debes iniciar sesión para registrar un cliente.');
      return;
    }
    dispatch(registerClient(clientData));
  };

  // Mostrar toast si el cliente se registra con éxito y redirigir a "/panel"
  useEffect(() => {
    if (success) {
      toast.success('Cliente registrado exitosamente');
      navigate('/panel'); // Redirige a la página del panel
    } else if (error) {
      toast.error(error); // Muestra el error si lo hay
    }
  }, [success, error, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-400">
      {/* Navbar que ocupa todo el ancho de la pantalla */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <nav className="w-full flex justify-start items-center py-4 px-8 bg-transparent">
          <Link to="/" className="text-white text-xl font-bold cursor-pointer flex items-center">
            <img src={Logo} alt="Logo" className="h-14 w-14 mr-2 rounded-full" />
          </Link>
        </nav>
        <Link to="/panel" className="text-gray-200 font-nunito bg-blue-500 py-2 px-4 mr-8 rounded-lg">
          PANEL
        </Link>

        {/* Botón de Logout */}
        <button onClick={handleLogout} className="text-gray-700 hover:text-red-500">
          <FaSignOutAlt className="h-6 w-6" />
        </button>
      </div>

      {/* Contenedor del formulario de registro del cliente */}
      <div className="flex items-center justify-center flex-grow">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 font-nunito">Registro de Cliente</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-nunito">Nombre</label>
              <input
                type="text"
                name="name"
                value={clientData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-nunito">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={clientData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-nunito">Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={clientData.phone}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 bg-blue-500 text-white rounded-lg font-nunito hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Registrar Cliente'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterClientForm;
