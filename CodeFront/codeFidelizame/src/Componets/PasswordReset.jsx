// components/PasswordReset.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendPasswordResetEmail } from '../Redux/Actions/actions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Por favor, ingresa tu correo electrónico.');
      return;
    }

    dispatch(sendPasswordResetEmail(email))
      .then(() => {
        toast.success('Correo de restablecimiento enviado con éxito.');
      })
      .catch((error) => {
        toast.error('Hubo un error al enviar el correo. Inténtalo de nuevo.');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Restablecer Contraseña
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700">
            Correo Electrónico:
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Ingresa tu correo electrónico"
            />
          </label>
          <button
            type="submit"
            className="mt-6 w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-500 transition-colors duration-300"
          >
            Enviar Correo de Restablecimiento
          </button>
        </form>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default PasswordReset;


