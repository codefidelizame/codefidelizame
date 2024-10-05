import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerClient } from '../Redux/Actions/actions';

const RegisterClientForm = () => {
  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)
  const userInfo = useSelector((state) => state.userInfo);
  console.log('userInfo:', userInfo);
  const token = useSelector((state)=> state.token)
  console.log('Token:', token);
  const handleChange = (e) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInfo && !token) {
      alert('Debes iniciar sesión para registrar un cliente.'); // O redirige a la página de inicio de sesión
      return;
    }
    dispatch(registerClient(clientData)); // Llama a la acción para registrar el cliente
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={clientData.name}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        type="email"
        name="email"
        value={clientData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="tel"
        name="phone"
        value={clientData.phone}
        onChange={handleChange}
        placeholder="Teléfono"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Cargando...' : 'Registrar Cliente'}
      </button>
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default RegisterClientForm;
