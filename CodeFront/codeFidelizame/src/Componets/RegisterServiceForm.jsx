import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerService } from '../Redux/Actions/actions';

const RegisterServiceForm = () => {
  const [serviceData, setServiceData] = useState({
    clientId: '',
    serviceName: '',
    price: '',
    serviceDate: '',
  });

  const dispatch = useDispatch();
 
  const userInfo = useSelector((state) => state.userInfo); // Asegúrate de acceder a la propiedad correcta
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)
  
  const handleChange = (e) => {
    setServiceData({
      ...serviceData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerService(serviceData));
  };

  // Asegúrate de que el usuario esté autenticado antes de mostrar el formulario
  if (!userInfo?.id) { // Cambia aquí para verificar la existencia de userInfo
    return <p>Debes iniciar sesión para registrar un servicio.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="clientId"
        value={serviceData.clientId}
        onChange={handleChange}
        placeholder="ID del Cliente"
      />
      <input
        type="text"
        name="serviceName"
        value={serviceData.serviceName}
        onChange={handleChange}
        placeholder="Nombre del Servicio"
      />
      <input
        type="number"
        name="price"
        value={serviceData.price}
        onChange={handleChange}
        placeholder="Precio"
      />
      <input
        type="date"
        name="serviceDate"
        value={serviceData.serviceDate}
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Cargando...' : 'Registrar Servicio'}
      </button>
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default RegisterServiceForm;
