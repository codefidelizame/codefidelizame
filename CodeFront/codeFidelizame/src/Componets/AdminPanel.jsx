import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import Logo from '../assets/code.png';
import { logout } from '../Redux/Actions/actions';
import DefaultAvatar from '../assets/codess.png'


const AdminPanel = () => {
  const userInfo = useSelector((state) => state.userInfo);
  console.log(userInfo)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (!userInfo) {
      navigate('/login'); // 
    }
  }, [userInfo, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-400 flex flex-col items-center">
      <div className="relative w-full flex justify-between items-center mr-6 ml-6">
        <nav className="w-full flex justify-start items-center py-4 px-8 bg-transparent">
          <Link to="/" className="text-white text-xl font-bold cursor-pointer flex items-center">
            <img src={Logo} alt="Logo" className="h-14 w-14 mr-2 rounded-full" />
          </Link>
        </nav>
        <button onClick={handleLogout} className="text-gray-700 hover:text-red-500">
          <FaSignOutAlt className="h-6 w-6 md:mr-2" />
        </button>
      </div>

      <div className="bg-gray-200 w-full max-w-4xl p-8 rounded-lg shadow-lg mt-6">
        <div className="flex items-center mb-6">
          <img
            src={userInfo?.images?.[0] || DefaultAvatar}
            alt="User Avatar"
            className="h-16 w-16 rounded-full mr-4"
          />
          <h1 className="text-3xl font-bold font-nunito text-gray-700">
            {userInfo?.name || 'Administrador'}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {userInfo?.role === 'admin' && (
            <>
              <Link to="/register" className="bg-blue-500 text-white px-4 py-8 rounded-lg hover:bg-blue-600 flex items-center justify-center text-center">
                Registrar Nuevo Comercio
              </Link>
              <Link to="/comercios" className="bg-blue-500 text-white px-4 py-8 rounded-lg hover:bg-blue-600 flex items-center justify-center text-center">
                Listar Comercios
              </Link>
            </>
          )}

          {userInfo?.role === 'comercio' && userInfo?.active === true && (
            <>
              <Link to="/registrarCliente" className="bg-blue-500 text-white px-4 py-8 rounded-lg hover:bg-green-600 flex items-center justify-center text-center">
                Registrar nuevo cliente
              </Link>
              <Link to="/newService" className="bg-blue-500 text-white px-4 py-8 rounded-lg hover:bg-yellow-600 flex items-center justify-center text-center">
                Cargar Compra
              </Link>
              <Link to="/clientes" className="bg-blue-500 text-white px-4 py-8 rounded-lg hover:bg-yellow-600 flex items-center justify-center text-center">
                Listar Clientes
              </Link>
            </>
          )}
        </div>

        <p className="text-gray-700 text-center">
          ¡Gestiona los recursos desde el panel!
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;

