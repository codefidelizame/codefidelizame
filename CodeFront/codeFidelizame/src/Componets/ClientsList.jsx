import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClients, deleteClient, editClient} from '../Redux/Actions/actions';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';

const ClientsList = () => {
  const dispatch = useDispatch();

  // Acceder al estado de los clientes y la información del usuario
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);
  const clients = useSelector((state) => state.clients);
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    console.log('Componente ClientsList montado.');

    if (userInfo) {
      console.log('Token encontrado, despachando fetchClients...');
      dispatch(fetchClients());
    }
  }, [dispatch, userInfo]);

  const handleDelete = (clientId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      dispatch(deleteClient(clientId));
    }
  };

  const handleEdit = (clientId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      dispatch(editClient(clientId));
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
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
              <td className="py-3 px-6">{client.name}</td>
              <td className="py-3 px-6">{client.email}</td>
              <td className="py-3 px-6">{client.phone}</td>
              <td className="py-3 px-6">{client.totalServices}</td>
              <td className="py-3 px-6 flex space-x-2">
                <button onClick={() => handleEdit(client.id)}>
                  <AiOutlineEdit className="w-5 h-5 text-blue-600" />
                </button>
                <button onClick={() => handleDelete(client.id)}>
                  <AiFillDelete className="w-5 h-5 text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsList;
