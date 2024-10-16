import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComercios,
  deleteComercio,
  updateComercio,
} from "../Redux/Actions/actions";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash, FiSave } from "react-icons/fi";
import Logo from "../assets/code.png";
import { FaSignOutAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ComerciosList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editingComercio, setEditingComercio] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const comercios = useSelector((state) => state.comercios);
  const userInfo = useSelector((state) => state.userInfo);
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("es-ES"); // dd/mm/aaaa
  };
  useEffect(() => {
    if (userInfo) {
      dispatch(fetchComercios());
    }
  }, [dispatch, userInfo]);

  if (!Array.isArray(comercios)) {
    console.error("Comercios no es un array:", comercios);
    return <div className="font-nunito">No hay comercios disponibles.</div>;
  }

  // const handleDelete = (id) => {
  //   if (window.confirm('¿Estás seguro de que quieres eliminar este comercio?')) {
  //     dispatch(deleteComercio(id))
  //       .then(() => {
  //         toast.success('Comercio eliminado con éxito');
  //         dispatch(fetchComercios()); // Refrescar la lista
  //       })
  //       .catch(() => toast.error('Error al eliminar el comercio'));
  //   }
  // };

  const handleEdit = (comercio) => {
    setEditingComercio(comercio.id);
    setUpdatedData({ ...comercio });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (id) => {

    console.log("Datos enviados a updateComercio:", { id, updatedData });
    const updatedDataWithISO = {
      ...updatedData,
      initDate: new Date(updatedData.initDate).toISOString(),
      endDate: new Date(updatedData.endDate).toISOString(),
    };
    dispatch(updateComercio(id, updatedDataWithISO))
    
      .then(() => {
        toast.success("Comercio actualizado con éxito");
        setEditingComercio(null);
        dispatch(fetchComercios());
      })
      .catch(() => toast.error("Error al actualizar el comercio"));
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-400">
      <nav className="w-full flex justify-between items-center  bg-white shadow-md">
        <Link to="/" className="text-black text-xl font-bold flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="h-14 w-14 mr-2 rounded-full md: ml-2"
          />
        </Link>
        <Link
          to="/panel"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          PANEL
        </Link>
        <button
          onClick={handleLogout}
          className="text-gray-700 hover:text-red-500"
        >
          <FaSignOutAlt className="h-6 w-6 md: mr-2" />
        </button>
      </nav>

      <div className="flex items-center justify-center flex-grow md: p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-7xl">
          {" "}
          {/* Modificado el tamaño */}
          <h2 className="text-2xl font-bold font-nunito mb-4">Comercios</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <div className="overflow-x-auto">
              {" "}
              {/* Añadido el contenedor para overflow */}
              <table className="min-w-full bg-white border border-gray-300 w-full">
                {" "}
                {/* Modificado para hacer la tabla más flexible */}
                <thead>
                  <tr className="bg-gray-200 text-gray-600 font-nunito uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left font-nunito">Nombre</th>
                    <th className="py-3 px-6 text-left font-nunito">Email</th>
                    <th className="py-3 px-6 text-left font-nunito">Rol</th>
                    <th className="py-3 px-6 text-left font-nunito">
                      Teléfono
                    </th>
                    <th className="py-3 px-6 text-left font-nunito">Tiktok</th>
                    <th className="py-3 px-6 text-left font-nunito">
                      Facebook
                    </th>
                    <th className="py-3 px-6 text-left font-nunito">
                      Instagram
                    </th>
                    <th className="py-3 px-6 text-left font-nunito">Inicio</th>
                    <th className="py-3 px-6 text-left font-nunito">Fin</th>
                    <th className="py-3 px-6 text-left font-nunito">Activar</th>
                    <th className="py-3 px-6 text-center font-nunito">
                      Editar
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {comercios.map((comercio) => (
                    <tr
                      key={comercio.id}
                      className="border-b border-gray-200 font-nunito hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap font-nunito">
                        {editingComercio === comercio.id ? (
                          <input
                            type="text"
                            name="name"
                            value={updatedData.name || ""}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded px-2 py-1 w-full" // Ancho máximo
                          />
                        ) : (
                          <span className="font-medium font-nunito">
                            {comercio.name}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {editingComercio === comercio.id ? (
                          <input
                            type="email"
                            name="email"
                            value={updatedData.email || ""}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded px-2 py-1 w-full" // Ancho máximo
                          />
                        ) : (
                          <span className="font-nunito">{comercio.email}</span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {editingComercio === comercio.id ? (
                          <input
                            type="text"
                            name="role"
                            value={updatedData.role || ""}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded px-2 py-1 w-full" // Ancho máximo
                          />
                        ) : (
                          <span className="font-nunito">{comercio.role}</span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {editingComercio === comercio.id ? (
                          <input
                            type="text"
                            name="whatsapp"
                            value={updatedData.whatsapp || ""}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded px-2 py-1 w-full" // Ancho máximo
                          />
                        ) : (
                          <span className="font-nunito">
                            {comercio.whatsapp}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {editingComercio === comercio.id ? (
                          <input
                            type="tiktok"
                            name="tiktok"
                            value={updatedData.tiktok || ""}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded px-2 py-1 w-full" // Ancho máximo
                          />
                        ) : (
                          <span className="font-nunito">{comercio.tiktok}</span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {editingComercio === comercio.id ? (
                          <input
                            type="facebook"
                            name="facebook"
                            value={updatedData.facebook || ""}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded px-2 py-1 w-full" // Ancho máximo
                          />
                        ) : (
                          <span className="font-nunito">
                            {comercio.facebook}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {editingComercio === comercio.id ? (
                          <input
                            type="instagram"
                            name="instagram"
                            value={updatedData.instagram || ""}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded px-2 py-1 w-full" // Ancho máximo
                          />
                        ) : (
                          <span className="font-nunito">
                            {comercio.instagram}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {editingComercio === comercio.id ? (
                          <input
                            type="date"
                            name="initDate"
                            value={updatedData.initDate || ""}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded px-2 py-1 w-full"
                          />
                        ) : (
                          <span className="font-nunito">
                            {comercio.initDate
                              ? formatDate(comercio.initDate)
                              : "N/A"}
                          </span>
                        )}
                      </td>

                      {/* Fecha de finalización */}
                      <td className="py-3 px-6 text-left">
                        {editingComercio === comercio.id ? (
                          <input
                            type="date"
                            name="endDate"
                            value={updatedData.endDate || ""}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded px-2 py-1 w-full"
                          />
                        ) : (
                          <span className="font-nunito">
                            {comercio.endDate
                              ? formatDate(comercio.endDate)
                              : "N/A"}
                          </span>
                        )}
                      </td>

                      {/* Checkbox para activar o desactivar */}
                      <td className="py-3 px-6 text-left">
                        {editingComercio === comercio.id ? (
                          <input
                            type="checkbox"
                            name="active"
                            checked={updatedData.active || false}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <span className="font-nunito">
                            {comercio.active ? "Activo" : "Inactivo"}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        {editingComercio === comercio.id ? (
                          <button
                            onClick={() => handleSave(comercio.id)}
                            className="bg-green-500 text-white rounded px-2 py-1 font-nunito"
                          >
                            <FiSave />
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(comercio)}
                              className="text-blue-500 hover:text-blue-700 mr-2"
                            >
                              <FiEdit />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ComerciosList;
