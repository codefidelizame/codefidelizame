// // ClientServicesList.jsx
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchClientServices } from '../Redux/Actions/actions';

// const ClientServicesList = ({ clientId }) => {
//   const dispatch = useDispatch();
//   const  clientServices = useSelector((state) => state.service);
//   const  loading  = useSelector((state) => state.loading);
//   const  error  = useSelector((state) => state.error);
//   useEffect(() => {
//     if (clientId) {
//       dispatch(fetchClientServices(clientId));
//     }
//   }, [dispatch, clientId]);

//   return (
//     <div>
//       {loading ? (
//         <p>Cargando servicios...</p>
//       ) : error ? (
//         <p>Error: {error}</p>
//       ) : clientServices.length > 0 ? (
//         <ul>
//           {clientServices.map((service) => (
//             <li key={service.id}>
//               {service.serviceName} - ${service.price}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No se encontraron servicios para este cliente.</p>
//       )}
//     </div>
//   );
// };

// export default ClientServicesList;
