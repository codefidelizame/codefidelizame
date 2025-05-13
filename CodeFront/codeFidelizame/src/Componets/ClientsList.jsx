import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClients, deleteClient, editClient, fetchClientServices } from '../Redux/Actions/actions';
import { AiOutlineEdit, AiFillDelete,AiOutlineEye } from 'react-icons/ai';
import Logo from '../assets/code.png'; 
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; 

const ClientsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);
  const clients = useSelector((state) => state.clients);
  const userInfo = useSelector((state) => state.userInfo);
  const clientServices = useSelector((state) => state.clientServices); // Asegúrate de tener este selector en tu estado
  const clientServicesFromStore = useSelector((state) => state.clientServices); // Asegúrate de tener este selector en tu estado
   const [selectedClientIdForTable, setSelectedClientIdForTable] = useState(null);

  const [selectedClientId, setSelectedClientId] = useState(null); // Para el cliente seleccionado
  const [editClientId, setEditClientId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    totalServices: '',
  });

  const [updated, setUpdated] = useState(false);
 // Estados para el modal de servicios
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [servicesForModal, setServicesForModal] = useState([]);
  const [clientForModal, setClientForModal] = useState(null);
  const [loadingModalServices, setLoadingModalServices] = useState(false);
  
  useEffect(() => {
    if (userInfo) {
      dispatch(fetchClients());
    }
  }, [dispatch, userInfo, updated]);

  useEffect(() => {
    if (selectedClientId) {
      dispatch(fetchClientServices(selectedClientId));
    }
  }, [selectedClientId, dispatch]);
   // Para la tabla inferior (si se mantiene)
  useEffect(() => {
    if (selectedClientIdForTable) {
      dispatch(fetchClientServices(selectedClientIdForTable));
    }
  }, [selectedClientIdForTable, dispatch]);


  const handleDelete = (clientId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      dispatch(deleteClient(clientId));
    }
  };

  const handleEditClick = (client) => {
    setEditClientId(client.id);
    setEditFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      totalServices: client.totalServices,
    });
  };

  const handleCancelClick = () => {
    setEditClientId(null);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveClick = () => {
    dispatch(editClient(editClientId, editFormData))
      .then(() => {
        setEditClientId(null);
        setUpdated(!updated);
      })
      .catch((error) => {
        console.error("Error actualizando cliente:", error);
      });
  };

  const handleLogout = () => {
    navigate('/'); 
  };

  const handleClientSelect = (clientId) => {
    setSelectedClientId(clientId);
  };

   const handleClientSelectForTable = (clientId) => {
    setSelectedClientIdForTable(clientId);
  };

  const handleOpenServicesModal = (client) => {
    setClientForModal(client);
    setShowServicesModal(true);
    setLoadingModalServices(true);
    dispatch(fetchClientServices(client.id))
      .then(services => {
        setServicesForModal(services || []);
        setLoadingModalServices(false);
      })
      .catch(err => {
        console.error("Error fetching services for modal:", err);
        setServicesForModal([]);
        setLoadingModalServices(false);
        // Aquí podrías mostrar un toast o mensaje de error
      });
  };

   const downloadCSV = (services, clientName) => {
    if (!services || services.length === 0) {
      alert("No hay servicios para descargar.");
      return;
    }

    // Usar punto y coma como delimitador para mejor compatibilidad con Excel en algunas regiones
    const delimiter = ";"; 
    const headers = ["Nombre del Servicio", "Precio", "Fecha", "Bonificado", "Descripción Bonificación"];
    
    const rows = services.map(service => [
      `"${String(service.serviceName || "").replace(/"/g, '""')}"`, // Asegurar que es string y escapar comillas
      String(service.price || ""), // Asegurar que es string
      new Date(service.createdAt).toLocaleDateString(),
      service.bonificado ? "Sí" : "No",
      `"${String(service.bonificacion || "-").replace(/"/g, '""')}"` // Asegurar que es string y escapar comillas
    ]);

    // Añadir BOM para UTF-8 para mejorar la compatibilidad con caracteres especiales en Excel
    let csvContent = "\uFEFF"; 
    csvContent += headers.join(delimiter) + "\n";
    csvContent += rows.map(e => e.join(delimiter)).join("\n");

    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `servicios_${clientName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

 return (
    <div className="container mx-auto p-2 sm:p-4">
      <nav className="w-full flex justify-between items-center py-3 px-4 sm:px-8 bg-gray-200 text-gray-700 mb-6">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 w-10 sm:h-14 sm:w-14 mr-2 rounded-full" />
        </Link>
        <Link
          to="/panel"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 sm:px-4 rounded text-sm sm:text-base"
        >
          PANEL
        </Link>
        <button onClick={handleLogout} className="text-gray-700 hover:text-red-500">
          <FaSignOutAlt className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </nav>

     <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">Lista de Clientes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-xs sm:text-sm leading-normal">
              <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Nombre</th>
              <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Email</th>
              <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Teléfono</th>
              <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Servicios</th>
              <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-xs sm:text-sm font-light">
            {clients.map((client) => (
              <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-100">
                {editClientId === client.id ? (
                  <>
                    <td className="py-2 px-3 sm:py-3 sm:px-6">
                      <input type="text" name="name" value={editFormData.name} onChange={handleEditFormChange} className="border p-1 rounded w-full"/>
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-6">
                      <input type="email" name="email" value={editFormData.email} onChange={handleEditFormChange} className="border p-1 rounded w-full"/>
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-6">
                      <input type="text" name="phone" value={editFormData.phone} onChange={handleEditFormChange} className="border p-1 rounded w-full"/>
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-6">
                      <input type="number" name="totalServices" value={editFormData.totalServices} onChange={handleEditFormChange} className="border p-1 rounded w-full"/>
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-6 flex items-center space-x-1 sm:space-x-2">
                      <button onClick={handleSaveClick} className="text-green-600 hover:text-green-800">Guardar</button>
                      <button onClick={handleCancelClick} className="text-red-600 hover:text-red-800">Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-3 sm:py-3 sm:px-6">{client.name}</td>
                    <td className="py-2 px-3 sm:py-3 sm:px-6">{client.email}</td>
                    <td className="py-2 px-3 sm:py-3 sm:px-6">{client.phone}</td>
                    <td className="py-2 px-3 sm:py-3 sm:px-6">{client.totalServices}</td>
                    <td className="py-2 px-3 sm:py-3 sm:px-6 flex items-center space-x-1 sm:space-x-2">
                      <button onClick={() => handleOpenServicesModal(client)} title="Ver Servicios">
                        <AiOutlineEye className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 hover:text-purple-800" />
                      </button>
                      <button onClick={() => handleEditClick(client)} title="Editar Cliente">
                        <AiOutlineEdit className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 hover:text-blue-800" />
                      </button>
                      <button onClick={() => handleDelete(client.id)} title="Eliminar Cliente">
                        <AiFillDelete className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 hover:text-red-800" />
                      </button>
                      {/* El botón "Ver Compras Abajo" ha sido eliminado */}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para mostrar servicios del cliente */}
      {showServicesModal && clientForModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-60 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4">
          <div className="relative bg-white p-5 border w-full max-w-2xl shadow-lg rounded-md">
            <button 
              onClick={() => setShowServicesModal(false)} 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold"
            >
              &times;
            </button>
            <div className="mt-3">
              <h3 className="text-lg sm:text-xl leading-6 font-medium text-gray-900 text-center mb-4">
                Servicios de {clientForModal.name}
              </h3>
              {loadingModalServices ? (
                <p className="text-center">Cargando servicios...</p>
              ) : servicesForModal.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border text-xs sm:text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-3 border-b text-left">Servicio</th>
                        <th className="py-2 px-3 border-b text-left">Precio</th>
                        <th className="py-2 px-3 border-b text-left">Fecha</th>
                        <th className="py-2 px-3 border-b text-left">Bonificado</th>
                        <th className="py-2 px-3 border-b text-left">Bonificación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicesForModal.map((service) => (
                        <tr key={service.id} className="hover:bg-gray-50">
                          <td className="py-2 px-3 border-b">{service.serviceName}</td>
                          <td className="py-2 px-3 border-b">{service.price}</td>
                          <td className="py-2 px-3 border-b">{new Date(service.createdAt).toLocaleDateString()}</td>
                          <td className="py-2 px-3 border-b">{service.bonificado ? 'Sí' : 'No'}</td>
                          <td className="py-2 px-3 border-b">{service.bonificacion || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-gray-600 mt-4">No hay servicios registrados para este cliente.</p>
              )}
            </div>
            <div className="flex justify-end items-center px-4 py-3 mt-4 space-x-3">
              <button
                onClick={() => downloadCSV(servicesForModal, clientForModal.name)}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-green-500 text-white text-xs sm:text-base font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50"
                disabled={loadingModalServices || servicesForModal.length === 0}
              >
                Descargar CSV
              </button>
              <button
                onClick={() => setShowServicesModal(false)}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-300 text-gray-700 text-xs sm:text-base font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* La sección de la tabla inferior ha sido eliminada */}
    </div>
  );
};

export default ClientsList;

