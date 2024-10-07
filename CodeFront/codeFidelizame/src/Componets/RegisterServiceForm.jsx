import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerService, fetchClients } from '../Redux/Actions/actions';
import { toast } from 'react-toastify'; // Asegúrate de importar toast
import Logo from '../assets/code.png';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const RegisterServiceForm = () => {
  const [serviceData, setServiceData] = useState({
    clientId: '',
    email: '',
    serviceName: '',
    price: '',
    serviceDate: '',
  });

  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);
  const userInfo = useSelector((state) => state.userInfo);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const handleChange = (e) => {
    setServiceData({
      ...serviceData,
      [e.target.name]: e.target.value,
    });
  };

  // Función debounce
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Verificar existencia del cliente
  const checkClientExistence = () => {
    if (serviceData.email && clients.length > 0) {
      const client = clients.find((c) => c.email === serviceData.email);
      if (client) {
        setServiceData((prevData) => ({
          ...prevData,
          clientId: client.id,
        }));
      } else {
        toast.error('No existe cliente.'); // Mostrar alerta si no existe
        setServiceData((prevData) => ({
          ...prevData,
          clientId: '',
        }));
      }
    }
  };

  // Usar useEffect con debounce
  useEffect(() => {
    const debouncedCheck = debounce(checkClientExistence, 300); // 300 ms de espera
    debouncedCheck();
  }, [serviceData.email, clients]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerService(serviceData));
  };

  const handleLogout = () => {
    navigate('/landing');
  };

  if (!userInfo) {
    return <p>Debes iniciar sesión para registrar un servicio.</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-400">
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <nav className="w-full flex justify-start items-center py-4 px-8 bg-transparent">
          <Link to="/landing" className="text-white text-xl font-bold cursor-pointer flex items-center">
            <img src={Logo} alt="Logo" className="h-14 w-14 mr-2 rounded-full" />
          </Link>
        </nav>
        <Link to="/panel" className="text-gray-200 font-nunito bg-blue-500 py-2 px-4 rounded-lg mr-8">
          PANEL
        </Link>
        <button onClick={handleLogout} className="text-gray-700 hover:text-red-500">
          <FaSignOutAlt className="h-6 w-6" />
        </button>
      </div>

      <div className="flex items-center justify-center flex-grow">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 font-nunito">Registro de Servicio</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={serviceData.email}
                onChange={handleChange}
                placeholder="Email del Cliente"
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="clientId"
                value={serviceData.clientId}
                placeholder="ID del Cliente (auto-llenado)"
                className="border border-gray-300 rounded-lg p-2 w-full"
                disabled
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
