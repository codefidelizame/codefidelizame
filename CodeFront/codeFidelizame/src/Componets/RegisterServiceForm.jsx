import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerService, fetchClients } from '../Redux/Actions/actions';
import { toast } from 'react-toastify'; // Asegúrate de importar toast
import Logo from '../assets/code.png';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import InfoCard from './InfoCard';

const RegisterServiceForm = () => {
  const [serviceData, setServiceData] = useState({
    clientId: '',
    phone: '',
    totalServices: 0,
    serviceName: '',
    price: '',
    serviceDate: new Date().toISOString().split('T')[0],
    bonificado: false, 
    bonificacion: ''
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
    if (serviceData.phone && clients.length > 0) {
      const client = clients.find((c) => c.phone === serviceData.phone);
      if (client) {
        setServiceData((prevData) => ({
          ...prevData,
          clientId: client.id,
          totalServices: client.totalServices,
        }));
      } else {
        toast.error('No existe cliente.'); // Mostrar alerta si no existe
        setServiceData((prevData) => ({
          ...prevData,
          clientId: '',
          totalServices: 0,
        }));
      }
    }
  };

  // Usar useEffect con debounce
  useEffect(() => {
    const debouncedCheck = debounce(checkClientExistence, 300); // 300 ms de espera
    debouncedCheck();
  }, [serviceData.phone, clients]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Registrar el servicio y esperar a que la acción se complete
    await dispatch(registerService(serviceData));
  
    // Volver a solicitar la lista actualizada de clientes después de registrar el servicio
    await dispatch(fetchClients());
  
    const client = clients.find((c) => c.id === serviceData.clientId);
    if (client) {
      const updatedTotalServices = client.totalServices + 1; // Incrementar el total de servicios
      setServiceData((prevData) => ({
        ...prevData,
        totalServices: updatedTotalServices,
      }));
    }
  
    toast.success('Servicio registrado exitosamente');
  };
  

  const handleLogout = () => {
    navigate('/');
  };

  if (!userInfo) {
    return <p>Debes iniciar sesión para registrar un servicio.</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-400">
      <div className="flex justify-between items-center bg-white shadow-md">
        <nav className="w-full flex justify-start items-center py-4 px-8 bg-transparent">
          <Link to="/" className="text-white text-xl font-bold cursor-pointer flex items-center">
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

      <div className="flex items-start justify-center flex-grow p-10 space-x-10 flex-wrap">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 font-nunito">Registro de Compra</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="phone"
                value={serviceData.phone}
                onChange={handleChange}
                placeholder="phone del Cliente"
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
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="bonificado"
                  checked={serviceData.bonificado}
                  onChange={(e) => setServiceData({ ...serviceData, bonificado: e.target.checked })}
                  className="mr-2"
                />
                Bonificado
              </label>
            </div>
            {serviceData.bonificado && (
              <div className="mb-4">
                <label htmlFor="bonificacion" className="block text-sm font-medium text-gray-700">
                  Tipo de Bonificación
                </label>
                <textarea
                  id="bonificacion"
                  name="bonificacion"
                  rows="3"
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe la bonificación que se otorga"
                  value={serviceData.bonificacion}
                  onChange={(e) => setServiceData({ ...serviceData, bonificacion: e.target.value })}
                />
              </div>
            )}
            <button
              type="submit"
              className={`w-full py-2 bg-blue-500 text-white rounded-lg font-nunito hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Registrar Compra'}
            </button>
          </form>
        </div>

        <div className="flex justify-center ">
          <InfoCard phone={serviceData.phone} totalServices={serviceData.totalServices} bonificado={serviceData.bonificado} 
            bonificacion={serviceData.bonificacion}  />
        </div>
      </div>
    </div>
  );
};

export default RegisterServiceForm;
