import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClients, deleteClient, editClient, fetchClientServices } from '../Redux/Actions/actions';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
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
 
  const [selectedClientId, setSelectedClientId] = useState(null); // Para el cliente seleccionado
  const [editClientId, setEditClientId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    totalServices: '',
  });

  const [updated, setUpdated] = useState(false);

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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-2">
      <nav className="w-full flex justify-between items-center py-4 px-8 bg-gray-200 text-gray-700">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="h-14 w-14 mr-2 rounded-full" />
        </Link>

        {/* Botón de Panel */}
        <Link
          to="/panel"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          PANEL
        </Link>

        {/* Botón de Logout */}
        <button onClick={handleLogout} className="text-gray-700 hover:text-red-500">
          <FaSignOutAlt className="h-6 w-6" />
        </button>
      </nav>

      <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Teléfono</th>
            <th className="py-3 px-6 text-left">Total de Servicios</th>
            <th className="py-3 px-6 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {clients.map((client) => (
            <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-100">
              {editClientId === client.id ? (
                <>
                  <td className="py-3 px-6">
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditFormChange}
                      className="border p-1 rounded"
                    />
                  </td>
                  <td className="py-3 px-6">
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditFormChange}
                      className="border p-1 rounded"
                    />
                  </td>
                  <td className="py-3 px-6">
                    <input
                      type="text"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleEditFormChange}
                      className="border p-1 rounded"
                    />
                  </td>
                  <td className="py-3 px-6">
                    <input
                      type="number"
                      name="totalServices"
                      value={editFormData.totalServices}
                      onChange={handleEditFormChange}
                      className="border p-1 rounded"
                    />
                  </td>
                  <td className="py-3 px-6 flex space-x-2">
                    <button onClick={handleSaveClick} className="text-green-600">Guardar</button>
                    <button onClick={handleCancelClick} className="text-red-600">Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-3 px-6">{client.name}</td>
                  <td className="py-3 px-6">{client.email}</td>
                  <td className="py-3 px-6">{client.phone}</td>
                  <td className="py-3 px-6">{client.totalServices}</td>
                  <td className="py-3 px-6 flex space-x-2">
                    <button onClick={() => handleEditClick(client)}>
                      <AiOutlineEdit className="w-5 h-5 text-blue-600" />
                    </button>
                    <button onClick={() => handleDelete(client.id)}>
                      <AiFillDelete className="w-5 h-5 text-red-600" />
                    </button>
                    <button onClick={() => handleClientSelect(client.id)} className="text-gray-600">Seleccionar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Detalles del cliente seleccionado */}
      {selectedClientId && (
  <div className="mt-8">
    <h2 className="text-xl font-bold">Compras del Cliente Seleccionado</h2>

    {/* Verificar que clientServices esté definido y sea un array */}
    {Array.isArray(clientServices) && clientServices.length === 0 ? (
      <p className="text-red-500">Este cliente no tiene servicios asociados</p>
    ) : Array.isArray(clientServices) ? (
      <table className="min-w-full bg-white border border-gray-200 mt-4">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Servicio</th>
            <th className="py-3 px-6 text-left">Precio</th>
            <th className="py-3 px-6 text-left">Bonificado</th>
            <th className="py-3 px-6 text-left">Bonificación</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {clientServices.map((service) => (
            <tr key={service.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6">{service.serviceName}</td>
              <td className="py-3 px-6">{service.price}</td>
              <td className="py-3 px-6">{service.bonificado ? 'Sí' : 'No'}</td>
              <td className="py-3 px-6">{service.bonificacion ? service.bonificacion : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="text-red-500">Este cliente no tiene Compras realizadas.</p>
    )}
  </div>
)}

    </div>
  );
};

export default ClientsList;

