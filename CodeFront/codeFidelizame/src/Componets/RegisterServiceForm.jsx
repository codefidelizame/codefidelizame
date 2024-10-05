import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerService } from '../Redux/Actions/actions';
import Logo from '../assets/code.png'; // Importa tu logo
import { FaSignOutAlt } from 'react-icons/fa'; // Importa el ícono de logout
import { Link, useNavigate } from 'react-router-dom';

const RegisterServiceForm = () => {
  const [serviceData, setServiceData] = useState({
    clientId: '',
    serviceName: '',
    price: '',
    serviceDate: '',
  });

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setServiceData({
      ...serviceData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerService(serviceData));
  };

  const handleLogout = () => {
    // Aquí puedes manejar la lógica de logout
    // dispatch(logout()); // Si tienes una acción de logout
    navigate('/landing'); // Redirige a la página de inicio después de cerrar sesión
  };

  // Asegúrate de que el usuario esté autenticado antes de mostrar el formulario
  if (!userInfo) {
    return <p>Debes iniciar sesión para registrar un servicio.</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-400">
      {/* Navbar que ocupa todo el ancho de la pantalla */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        {/* Logo */}
        <img src={Logo} alt="Logo" className="h-12 rounded-full" />

        {/* Botón Volver */}
        <Link to="/panel" className="text-gray-200 font-nunito bg-blue-500 py-2 px-4 rounded-lg">
          PANEL
        </Link>

        {/* Botón de Logout */}
        <button onClick={handleLogout} className="text-gray-700 hover:text-red-500">
          <FaSignOutAlt className="h-6 w-6" />
        </button>
      </div>

      {/* Contenedor del formulario de registro del servicio */}
      <div className="flex items-center justify-center flex-grow">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 font-nunito">Registro de Servicio</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="clientId"
                value={serviceData.clientId}
                onChange={handleChange}
                placeholder="ID del Cliente"
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="serviceName"
                value={serviceData.serviceName}
                onChange={handleChange}
                placeholder="Nombre del Servicio"
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                name="price"
                value={serviceData.price}
                onChange={handleChange}
                placeholder="Precio"
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="date"
                name="serviceDate"
                value={serviceData.serviceDate}
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
              {loading ? 'Cargando...' : 'Registrar Servicio'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterServiceForm;

