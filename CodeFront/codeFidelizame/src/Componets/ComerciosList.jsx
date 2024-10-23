import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComercios,
  updateComercio,
  updateSubscription,
  createSubscription,
} from "../Redux/Actions/actions";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash, FiSave, FiPlus } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from '../assets/code.png';

const ComerciosList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editingComercio, setEditingComercio] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [newSubscription, setNewSubscription] = useState({ startDate: "", endDate: "", active: false }); // Estado para nueva suscripción
  const comercios = useSelector((state) => state.comercios);
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchComercios());
    }
  }, [dispatch, userInfo]);

  const handleEdit = (comercio) => {
    setEditingComercio(comercio.id);
    setUpdatedData({
      ...comercio,
      Subscriptions: comercio.Subscriptions.map((sub) => ({
        ...sub,
        startDate: sub.startDate ? new Date(sub.startDate).toISOString().split("T")[0] : "",
        endDate: sub.endDate ? new Date(sub.endDate).toISOString().split("T")[0] : "",
      })),
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubscriptionChange = (index, field, value) => {
    const updatedSubscriptions = [...updatedData.Subscriptions];
    updatedSubscriptions[index] = { ...updatedSubscriptions[index], [field]: value };

    setUpdatedData((prevData) => ({
      ...prevData,
      Subscriptions: updatedSubscriptions,
    }));
  };

  const handleNewSubscriptionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewSubscription((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (comercioId) => {
    const updatedDataWithISO = {
      ...updatedData,
      startDate: updatedData.startDate ? new Date(updatedData.startDate).toISOString() : null,
      endDate: updatedData.endDate ? new Date(updatedData.endDate).toISOString() : null,
    };

    console.log("Comercio ID:", comercioId);
    console.log("Datos de comercio a enviar:", updatedDataWithISO);

    dispatch(updateComercio(comercioId, updatedDataWithISO))
      .then(() => {
        toast.success("Comercio actualizado con éxito");
        setEditingComercio(null);
        dispatch(fetchComercios());
      })
      .catch(() => toast.error("Error al actualizar el comercio"));

    updatedData.Subscriptions.forEach((subscription) => {
      const subscriptionId = subscription.id;
      console.log("Comercio ID:", comercioId);
      console.log("Subscription ID:", subscriptionId);
      console.log("Datos de suscripción a enviar:", subscription);

      dispatch(updateSubscription(comercioId, subscriptionId, {
        active: subscription.active,
        startDate: subscription.startDate,
        endDate: subscription.endDate,
      }))
        .then(() => {
          toast.success("Suscripción actualizada con éxito");
        })
        .catch(() => toast.error("Error al actualizar la suscripción"));
    });
  };

  const handleCreateSubscription = (comercioId) => {
    const subscriptionData = {
      ...newSubscription,
      startDate: newSubscription.startDate ? new Date(newSubscription.startDate).toISOString() : null,
      endDate: newSubscription.endDate ? new Date(newSubscription.endDate).toISOString() : null,
      comercioId, // Asegúrate de que estás pasando el ID del comercio
    };

    console.log("Datos de nueva suscripción a enviar:", subscriptionData);

    dispatch(createSubscription(subscriptionData))
      .then(() => {
        toast.success("Suscripción creada con éxito");
        setNewSubscription({ startDate: "", endDate: "", active: false }); // Resetear el estado después de crear
        dispatch(fetchComercios()); // Actualizar la lista de comercios
      })
      .catch(() => toast.error("Error al crear la suscripción"));
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-2">
      <nav className="w-full flex justify-between items-center py-4 px-8 bg-gray-200 text-gray-700">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="h-14 w-14 mr-2 rounded-full" />
        </Link>

        {/* Botón de Panel */}
        <Link
          to="/panel"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          PANEL
        </Link>

        {/* Botón de Logout */}
        <button onClick={handleLogout} className="text-gray-700 hover:text-red-500">
          <FaSignOutAlt className="h-6 w-6" />
        </button>
      </nav>
      <ToastContainer />




      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th  className="py-3 px-6 text-left">Nombre</th>
            <th  className="py-3 px-6 text-left">Email</th>
            <th  className="py-3 px-6 text-left">Teléfono</th>
            <th  className="py-3 px-6 text-left">Redes Sociales</th>
            <th  className="py-3 px-6 text-left">Suscripciones</th>
            <th  className="py-3 px-6 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 font-nunito font-semibold text-sm ">
          {comercios.map((comercio) => (
            <tr key={comercio.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6">
                {editingComercio === comercio.id ? (
                  <input
                    type="text"
                    name="name"
                    value={updatedData.name}
                    onChange={handleInputChange}
                    className="border p-1 rounded"
                  />
                ) : (
                  comercio.name
                )}
              </td>
              <td className="py-3 px-6">
                {editingComercio === comercio.id ? (
                  <input
                    type="text"
                    name="email"
                    value={updatedData.email}
                    onChange={handleInputChange}
                    className="border p-1 rounded"
                  />
                ) : (
                  comercio.email
                )}
              </td>
              <td className="py-3 px-6">
                {editingComercio === comercio.id ? (
                  <input
                    type="text"
                    name="whatsapp"
                    value={updatedData.whatsapp}
                    onChange={handleInputChange}
                    className="border p-1 rounded"
                  />
                ) : (
                  comercio.whatsapp
                )}
              </td>
              <td className="py-3 px-6">
                {editingComercio === comercio.id ? (
                  <>
                    <input
                      type="text"
                      name="instagram"
                      value={updatedData.instagram}
                      onChange={handleInputChange}
                      placeholder="Instagram"
                      className="border p-1 rounded"
                    />
                    <input
                      type="text"
                      name="facebook"
                      value={updatedData.facebook}
                      onChange={handleInputChange}
                      placeholder="Facebook"
                      className="py-3 px-6 rounded"
                    />
                    <input
                      type="text"
                      name="tiktok"
                      value={updatedData.tiktok}
                      onChange={handleInputChange}
                      placeholder="TikTok"
                      className="py-3 px-6 rounded "
                    />
                  </>
                ) : (
                  <>
                    <p>Instagram: {comercio.instagram}</p>
                    <p>Facebook: {comercio.facebook}</p>
                    <p>TikTok: {comercio.tiktok}</p>
                  </>
                )}
              </td>
              <td className="px-4 py-2 border">
                {editingComercio === comercio.id ? (
                  <>
                    {updatedData.Subscriptions.map((sub, index) => (
                      <div key={index}>
                        <input
                          type="date"
                          value={sub.startDate}
                          onChange={(e) => handleSubscriptionChange(index, "startDate", e.target.value)}
                          className="border p-1 mb-1"
                        />
                        <input
                          type="date"
                          value={sub.endDate}
                          onChange={(e) => handleSubscriptionChange(index, "endDate", e.target.value)}
                          className="border p-1 mb-1"
                        />
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={sub.active}
                            onChange={(e) => handleSubscriptionChange(index, "active", e.target.checked)}
                            className="mr-2"
                          />
                          {sub.active ? "Activa" : "Inactiva"}
                        </label>
                      </div>
                    ))}
                    {/* Formulario para agregar nueva suscripción */}
                    <h3 className="mt-4 text-lg font-semibold">Agregar Nueva Suscripción</h3>
                    <input
                      type="date"
                      name="startDate"
                      value={newSubscription.startDate}
                      onChange={handleNewSubscriptionChange}
                      className="border p-1 mb-1"
                    />
                    <input
                      type="date"
                      name="endDate"
                      value={newSubscription.endDate}
                      onChange={handleNewSubscriptionChange}
                      className="border p-1 mb-1"
                    />
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="active"
                        checked={newSubscription.active}
                        onChange={handleNewSubscriptionChange}
                        className="mr-2"
                      />
                      Activa
                    </label>
                    <button
                      onClick={() => handleCreateSubscription(comercio.id)} // Pasa el ID del comercio al crear la suscripción
                      className="bg-blue-500 text-white rounded-lg font-nunito hover:bg-blue-600 px-4 py-1 mt-2"
                    >
                      <FiPlus /> Agregar
                    </button>
                  </>
                ) : (
                  comercio.Subscriptions.map((sub, index) => (
                    <div key={index}>
                      <p>Inicio: {new Date(sub.startDate).toLocaleDateString()}</p>
                      <p>Fin: {new Date(sub.endDate).toLocaleDateString()}</p>
                      <p>{sub.active ? "Activa" : "Inactiva"}</p>
                    </div>
                  ))
                )}
              </td>
              <td className="px-4 py-2 border">
                {editingComercio === comercio.id ? (
                  <button onClick={() => handleSave(comercio.id)} className="bg-blue-500 text-white px-4 py-1">
                    <FiSave /> Guardar
                  </button>
                ) : (
                  <button onClick={() => handleEdit(comercio)} className=" bg-blue-500 text-white rounded-lg font-nunito hover:bg-blue-600 px-4 py-1">
                    <FiEdit /> 
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComerciosList;

