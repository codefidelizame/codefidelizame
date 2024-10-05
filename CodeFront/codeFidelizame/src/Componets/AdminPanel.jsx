import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Para enlazar a diferentes páginas y redirigir

const AdminPanel = () => {
  const userInfo = useSelector((state) => state.userInfo); // Asegúrate de acceder a la propiedad correcta
  const navigate = useNavigate();

  // Verificar si el usuario está autenticado
  useEffect(() => {
    if (!userInfo) {
      // Si no está autenticado, redirige a la página de login
      navigate('/');
    }
  }, [userInfo, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Panel de Administración</h1>
        <div className="flex flex-col md:flex-row justify-around mb-6">
          <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 md:mb-0 hover:bg-blue-600">
            Registrar Nuevo Comercio
          </Link>
          <Link to="/registrarCliente" className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 md:mb-0 hover:bg-green-600">
            Registrar nuevo cliente
          </Link>
          <Link to="/newService" className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
            Cargar Servicio
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

