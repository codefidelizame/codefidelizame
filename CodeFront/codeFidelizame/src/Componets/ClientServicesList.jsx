// ClientServicesList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientServices } from '../Redux/Actions/actions';;

const ClientServicesList = ({ clientId }) => {
  const dispatch = useDispatch();
  const { loading, clientServices, error } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchClientServices(clientId));
  }, [dispatch, clientId]);

  return (
    <div>
      {loading ? (
        <p>Cargando servicios...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {clientServices.map((service) => (
            <li key={service.id}>{service.serviceName} - ${service.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientServicesList;
