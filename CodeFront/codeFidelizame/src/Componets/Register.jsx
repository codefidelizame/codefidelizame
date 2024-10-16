import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, logout } from '../Redux/Actions/actions';
import Logo from '../assets/code.png'; 
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
    role: 'comercio', 
    images: [], 
    instagram: '',
    facebook: '',
    tiktok: '',
    whatsapp: '',
    initDate: '',
    endDate: '',
    active: true
    
  });

  const handleImageUpload = () => {
    openCloudinaryWidget((uploadedImageUrl) => {
      setUserData((prevData) => ({
        ...prevData,
        images: [...prevData.images, uploadedImageUrl],
      }));
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validar si las fechas están presentes antes de convertir
    const formattedInitDate = userData.initDate ? new Date(userData.initDate).toISOString() : null;
    const formattedEndDate = userData.endDate ? new Date(userData.endDate).toISOString() : null;
  
    // Crear el objeto con las fechas formateadas solo si son válidas
    const dataToSend = {
      ...userData,
      initDate: formattedInitDate,
      endDate: formattedEndDate,
    };
  
    console.log('Datos a enviar:', dataToSend);
    dispatch(register(dataToSend));
  
    // Redirigir después de crear comercio
    window.alert('Comercio creado con éxito');
    navigate('/panel');
  };

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/'); 
  };

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

      <div className="flex items-center justify-center flex-grow md:mt-2 mb-2">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/5 lg:w-2/5">
          <h2 className="text-2xl font-bold mb-4 font-nunito">Registro de Nuevo Comercio</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
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
            <div>
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
            <div>
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
            <div>
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
            <div className="col-span-2">
              <button 
                type="button" 
                onClick={handleImageUpload} 
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition mb-4"
              >
                Subir Imagen
              </button>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-nunito">Instagram</label>
              <input
                type="text"
                name="instagram"
                value={userData.instagram}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-nunito">Facebook</label>
              <input
                type="text"
                name="facebook"
                value={userData.facebook}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-nunito">TikTok</label>
              <input
                type="text"
                name="tiktok"
                value={userData.tiktok}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-nunito">WhatsApp</label>
              <input
                type="text"
                name="whatsapp"
                value={userData.whatsapp}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-nunito">Inicio Suscripción</label>
              <input
                type="date"
                name="initDate"
                value={userData.initDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-nunito">Fin Suscripción</label>
              <input
                type="date"
                name="endDate"
                value={userData.endDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                className={`w-full py-2 bg-blue-500 text-white rounded-lg font-nunito hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Registrando...' : 'Registrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
