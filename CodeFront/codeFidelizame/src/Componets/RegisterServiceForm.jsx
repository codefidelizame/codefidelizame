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
  const [pdfDownloaded, setPdfDownloaded] = useState(false); // Estado para controlar si el PDF fue descargado

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
    if (serviceData.phone.length < 10) {
      // No hacer nada si el número de teléfono tiene menos de 10 dígitos
      return;
    }

    if (clients.length > 0) {
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

    if (!pdfDownloaded) {
      toast.error('Debes descargar el PDF antes de registrar el servicio.');
      return;
    }

    if (!serviceData.clientId) {
      toast.error('El cliente no existe. Por favor, verifica el número de teléfono.');
      return;
    }

    await dispatch(registerService(serviceData));
    await dispatch(fetchClients());

    const client = clients.find((c) => c.id === serviceData.clientId);
    if (client) {
      const updatedTotalServices = client.totalServices + 1;
      setServiceData((prevData) => ({
        ...prevData,
        totalServices: updatedTotalServices,
      }));
    }

    toast.success('Servicio registrado exitosamente');

    setServiceData({
      clientId: '',
      phone: '',
      totalServices: 0,
      serviceName: '',
      price: '',
      serviceDate: new Date().toISOString().split('T')[0],
      bonificado: false,
      bonificacion: '',
    });

    setPdfDownloaded(false); // Reinicia el estado para la próxima vez
  };

  const handleLogout = () => {
    navigate('/');
  };

  if (!userInfo) {
    return <p>Debes iniciar sesión para registrar un servicio.</p>;
  }

   return (
    <div className="flex flex-col min-h-screen bg-gray-400 ">
      <div className="flex justify-between items-center bg-white shadow-md p-4"> {/* Añadido p-4 para padding en el nav */}
        <nav className="flex justify-start items-center bg-transparent"> {/* Simplificado, w-full no es necesario aquí */}
          <Link to="/" className="text-white text-xl font-bold cursor-pointer flex items-center">
            <img src={Logo} alt="Logo" className="h-12 w-12 md:h-14 md:w-14 mr-2 rounded-full" /> {/* Tamaño de logo responsivo */}
          </Link>
        </nav>
        <div className="flex items-center space-x-4"> {/* Contenedor para Panel y Logout */}
          <Link to="/panel" className="text-gray-200 font-nunito bg-blue-500 py-2 px-3 md:px-4 rounded-lg text-sm md:text-base"> {/* Padding y tamaño de texto responsivo */}
            PANEL
          </Link>
          <button onClick={handleLogout} className="text-gray-700 hover:text-red-500">
            <FaSignOutAlt className="h-5 w-5 md:h-6 md:w-6" /> {/* Tamaño de icono responsivo */}
          </button>
        </div>
      </div>

      {/* Contenedor principal del formulario y la tarjeta */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center flex-grow p-4 md:p-6 lg:p-10 space-y-8 lg:space-y-0 lg:space-x-10">
        {/* Formulario */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-4 lg:mt-0"> {/* w-full max-w-md para responsividad */}
          <h2 className="text-2xl font-bold mb-4 font-nunito text-center md:text-left">Registro de Compra</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            {/* ... campos del formulario sin cambios ... */}
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
                className="border border-gray-300 rounded-lg p-2 w-full bg-gray-100" // Añadido bg-gray-100 para indicar disabled
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
                  className="mr-2 h-5 w-5" // Tamaño del checkbox
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
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2" // Añadido p-2
                  placeholder="Describe la bonificación que se otorga"
                  value={serviceData.bonificacion}
                  onChange={(e) => setServiceData({ ...serviceData, bonificacion: e.target.value })}
                />
              </div>
            )}
            <button
              type="submit"
              className={`w-full py-2.5 bg-blue-500 text-white rounded-lg font-nunito hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} // Ajustado py
              disabled={loading || !pdfDownloaded} // Deshabilitar si el PDF no se ha descargado
            >
              {loading ? 'Cargando...' : 'Registrar Compra'}
            </button>
             {!pdfDownloaded && (
              <p className="text-red-500 text-xs mt-2 text-center">Descarga la tarjeta antes de registrar.</p>
            )}
          </form>
        </div>

        {/* InfoCard */}
        <div className="flex justify-center w-full lg:w-auto"> {/* w-full en móvil, auto en lg */}
          <InfoCard
            phone={serviceData.phone}
            totalServices={serviceData.totalServices}
            bonificado={serviceData.bonificado}
            bonificacion={serviceData.bonificacion}
            onPdfDownloaded={() => setPdfDownloaded(true)}
          />
        </div>
      </div>
    </div>
  );
};
export default RegisterServiceForm;
