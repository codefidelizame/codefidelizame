import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, logout } from '../Redux/Actions/actions';
import Logo from '../assets/code.png'; // Importa tu logo
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { openCloudinaryWidget } from '../cloudinaryConfig';

const Register = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'comercio', // Puedes hacer esto dinámico si tienes más roles
    images: [], // Aquí se almacenará la URL de la imagen subida
    instagram: '',
    facebook: '',
    tiktok: '',
    whatsapp: '',
  });

  const handleImageUpload = () => {
    openCloudinaryWidget((uploadedImageUrl) => {
      // Agregar la URL de la imagen al array de imágenes
      setUserData((prevData) => ({
        ...prevData,
        images: [...prevData.images, uploadedImageUrl], // Agrega la URL al array
      }));
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos a enviar:', userData); // Verifica el objeto de datos
    dispatch(register(userData));
  };

  const handleLogout = () => {
    dispatch(logout()); // Llama a la acción de logout
    navigate('/'); // Redirige a la página de inicio después de cerrar sesión
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-400">
      {/* Navbar que ocupa todo el ancho de la pantalla */}
      <div className="flex justify-between items-center  bg-white shadow-md">
        <nav className="w-full flex justify-start items-center py-4 px-8 bg-transparent">
          <Link to="/" className="text-white text-xl font-bold cursor-pointer flex items-center">
            <img src={Logo} alt="Logo" className="h-14 w-14 mr-2 rounded-full" />
          </Link>
        </nav>
        <Link to="/panel" className="text-gray-200 font-nunito  bg-blue-500 py-2 px-4 rounded-lg mr-8">
          PANEL
        </Link>

        {/* Botón de Logout */}
        <button onClick={handleLogout} className="text-gray-700 hover:text-red-500">
          <FaSignOutAlt className="h-6 w-6" />
        </button>
      </div>

      {/* Contenedor del formulario de registro */}
      <div className="flex items-center justify-center flex-grow md: mt-2 mb-2">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 font-nunito">Registro de Nuevo Comercio</h2>
          {error && <div className="text-red-500 mb-4 ">{error}</div>}
          <form onSubmit={handleSubmit}>
            {/* Campos para Nombre, Email y Contraseña */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-nunito">Nombre</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-nunito">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-nunito">Contraseña</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>

            {/* Campo de Rol */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-nunito">Rol</label>
              <select
                name="role"
                value={userData.role}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              >
                <option value="comercio">Comercio</option>
              </select>
            </div>

            {/* Botón para subir imágenes */}
            <button 
              type="button" 
              onClick={handleImageUpload} 
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition mb-4"
            >
              Subir Imagen
            </button>

            {/* Red Social: Instagram */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-nunito">Instagram</label>
              <input
                type="text"
                name="instagram"
                value={userData.instagram}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            {/* Red Social: Facebook */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-nunito">Facebook</label>
              <input
                type="text"
                name="facebook"
                value={userData.facebook}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            {/* Red Social: TikTok */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-nunito">TikTok</label>
              <input
                type="text"
                name="tiktok"
                value={userData.tiktok}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            {/* Red Social: WhatsApp */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-nunito">WhatsApp</label>
              <input
                type="text"
                name="whatsapp"
                value={userData.whatsapp}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            {/* Botón de registro */}
            <button
              type="submit"
              className={`w-full py-2 bg-blue-500 text-white rounded-lg font-nunito hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

