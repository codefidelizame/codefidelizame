import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; // Importa el ícono de logout
import Logo from '../assets/code.png'; // Importa tu logo
import { logout } from '../Redux/Actions/actions'; // Asegúrate de que esta sea la ruta correcta a tu acción

const AdminPanel = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch(); // Hook para despachar acciones
  const navigate = useNavigate();

  // Verificar si el usuario está autenticado
  useEffect(() => {
    if (!userInfo) {
      navigate('/'); // Redirige a la página de login si no está autenticado
    }
  }, [userInfo, navigate]);

  const handleLogout = () => {
    dispatch(logout()); // Llama a la acción de logout
    navigate('/landing'); // Redirige a la página de inicio después de cerrar sesión
  };

  return (
    <div className="min-h-screen bg-gray-400 flex flex-col items-center">
      
      {/* Navbar que ocupa todo el ancho de la pantalla */}
      <div className="relative w-full flex justify-between items-center p-4 mr-6 ml-6">
      <nav className="w-full flex justify-start items-center py-4 px-8 bg-transparent">
        <Link to="/landing" className="text-white text-xl font-bold cursor-pointer flex items-center">
          <img src={Logo} alt="Logo" className="h-14 w-14 mr-2 rounded-full" />
          
        </Link>
      </nav>
        <button onClick={handleLogout} className="text-gray-700 hover:text-red-500">
          <FaSignOutAlt className="h-6 w-6" />
        </button>
      </div>

      <div className="bg-gray-200 w-full max-w-4xl p-8 rounded-lg shadow-lg mt-6">
        <h1 className="text-3xl font-bold font-nunito text-gray-700 text-center mb-6">Panel de Administración</h1>
        
        {/* Contenedor de botones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Link to="/register" className="bg-blue-500 text-white px-4 py-8 rounded-lg hover:bg-blue-600 flex items-center justify-center text-center">
            Registrar Nuevo Comercio
          </Link>
          <Link to="/registrarCliente" className="bg-blue-500 text-white px-4 py-8 rounded-lg hover:bg-green-600 flex items-center justify-center text-center">
            Registrar nuevo cliente
          </Link>
          <Link to="/newService" className="bg-blue-500 text-white px-4 py-8 rounded-lg hover:bg-yellow-600 flex items-center justify-center text-center">
            Cargar Servicio
          </Link>
          <Link to="/viewServices" className="bg-blue-500 text-white px-4 py-8 rounded-lg hover:bg-blue-600 flex items-center justify-center text-center">
            Ver Servicios
          </Link>
          <Link to="/manageUsers" className="bg-blue-500 text-white px-4 py-8 rounded-lg hover:bg-green-600 flex items-center justify-center text-center">
            Gestionar Usuarios
          </Link>
          <Link to="/reports" className="bg-blue-500 text-white px-4 py-8 rounded-lg hover:bg-yellow-600 flex items-center justify-center text-center">
            Generar Reportes
          </Link>
        </div>

        <p className="text-gray-700 text-center">
          Bienvenido, {userInfo?.name || 'Administrador'}. ¡Gestiona los recursos desde el panel!
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
