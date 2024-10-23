// components/ResetPassword.js
import React, { useState } from 'react';
import { BASE_URL } from "../Config";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const { token } = useParams(); // Obtiene el token de la URL
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }


    try {
      const response = await axios.post(`${BASE_URL}/auth/reset-password`, {
        token,
        newPassword,
      });
      
      toast.success(response.data.message);
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al restablecer la contraseña');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Restablecer Contraseña
        </h2>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              Nueva Contraseña:
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Ingresa tu nueva contraseña"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Nueva Contraseña:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirma tu nueva contraseña"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-500 transition-colors duration-300"
          >
            Restablecer Contraseña
          </button>
        </form>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;

