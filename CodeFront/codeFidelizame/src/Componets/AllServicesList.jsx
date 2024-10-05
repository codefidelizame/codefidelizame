// AllServicesList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllServices } from '../Redux/Actions/actions';

const AllServicesList = () => {
  const dispatch = useDispatch();
  const { loading, services, error } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchAllServices());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <p>Cargando servicios...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {services.map((service) => (
            <li key={service.id}>{service.serviceName} - ${service.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllServicesList;
