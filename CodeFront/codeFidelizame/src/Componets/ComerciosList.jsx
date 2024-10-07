import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComercios } from '../Redux/Actions/actions'; // Asegúrate de tener la acción adecuada
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash } from 'react-icons/fi'; // Íconos para editar y eliminar
import Logo from '../assets/code.png';
import { FaSignOutAlt } from 'react-icons/fa'; 

const ComerciosList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const comercios = useSelector((state) => state.comercios);
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchComercios());
    }
  }, [dispatch, userInfo]);

  if (!Array.isArray(comercios)) {
    console.error('Comercios no es un array:', comercios);
    return <div className='font-nunito'>No hay comercios disponibles.</div>;
  }

  const handleEdit = (id) => {
    console.log(`Editar comercio con id: ${id}`);
    
  };

  const handleDelete = (id) => {
    console.log(`Eliminar comercio con id: ${id}`);
   
  };
  const handleLogout = () => {
    navigate('/'); 
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-400">
      <nav className="w-full flex justify-between items-center p-4 bg-white shadow-md">
        <Link to="/" className="text-black text-xl font-bold flex items-center">
          <img src={Logo} alt="Logo" className="h-14 w-14 mr-2 rounded-full" />
        </Link>
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

      <div className="flex items-center justify-center flex-grow">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-bold font-nunito mb-4">Comercios </h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-600 font-nunito uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left font-nunito">Nombre</th>
                  <th className="py-3 px-6 text-left font-nunito">Email</th>
                  <th className="py-3 px-6 text-left font-nunito">Rol</th>
                  <th className="py-3 px-6 text-center font-nunito">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {comercios.map((comercio) => (
                  <tr key={comercio.id} className="border-b border-gray-200 font-nunito hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-nunito">
                      <div className="flex items-center">
                        <span className="font-medium font-nunito">{comercio.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <span className='font-nunito'>{comercio.email}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span className='font-nunito'>{comercio.role}</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <button
                          className="w-4 mr-2 transform font-nunito hover:text-yellow-500 hover:scale-110"
                          onClick={() => handleEdit(comercio.id)}
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          className="w-4 mr-2 transform font-nunito hover:text-red-500 hover:scale-110"
                          onClick={() => handleDelete(comercio.id)}
                        >
                          <FiTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComerciosList;

