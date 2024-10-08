import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import html2canvas from 'html2canvas'; // Para capturar la tarjeta como imagen
import fondo from '../assets/bono.png';

const InfoCard = ({ phone, totalServices, bonificado, bonificacion }) => {
  const userInfo = useSelector((state) => state.userInfo);
  console.log(userInfo)
  const cardRef = useRef(null); // Ref para el componente de la tarjeta
  console.log("Props recibidas en InfoCard:", {
    phone,
    totalServices,
    bonificado,
    bonificacion,
    userInfo
  });
  const handleWhatsAppShare = () => {
    // Captura la tarjeta como imagen
    html2canvas(cardRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        // Crear el FormData para subir a Cloudinary
        const formData = new FormData();
        formData.append('file', blob); // La imagen en formato Blob
        formData.append('upload_preset', 'codeFidelizate'); // El upload preset de Cloudinary

        // Subir la imagen a Cloudinary
        fetch(`https://api.cloudinary.com/v1_1/dxcdz1l2b/image/upload`, {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.secure_url) {
              const imageUrl = data.secure_url; // URL de la imagen subida
              
              console.log("Imagen subida a Cloudinary:", imageUrl); // Verificar URL en consola

              // Crear un enlace de WhatsApp con la URL de la imagen
              const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Comprobante de compra: ${imageUrl}`)}`;
              window.open(whatsappUrl, '_blank'); // Abrir en una nueva pestaña
            } else {
              console.error('Error: No se recibió la URL segura de Cloudinary');
            }
          })
          .catch((error) => {
            console.error('Error subiendo la imagen a Cloudinary:', error);
          });
      });
    });
  };

  return (
    <div className="rounded-lg shadow-lg p-2 w-96 relative bg-white">
      {/* Ref para capturar el contenido de la tarjeta */}
      <div ref={cardRef} className="relative">
        {/* Imagen de fondo */}
        <img
          src={fondo} // Imagen de fondo
          alt="Background"
          className="absolute inset-0 w-full h-auto object-cover opacity-80 rounded-lg"
        />

        {/* Información del comercio y cliente */}
        <div className="relative z-10 flex flex-col items-start text-left p-4">
          <div className="flex items-center mb-4">
            <img
              src={userInfo.images} // Imagen de usuario
              alt="User Profile"
              className="h-16 w-16 rounded-full border-2 border-slate-400"
            />
            <h2 className="text-xl text-white font-nunito font-semibold ml-4 uppercase">{userInfo.name}</h2>
          </div>

          <p className="text-gray-700 font-nunito text-sm mt-2 font-semibold rounded-md p-1">Cliente Tel: {phone}</p>
          <p className="text-gray-700 font-nunito text-sm mt-2 font-semibold rounded-md p-1">Bono N°: {totalServices}</p>
          {bonificado && (
  <div>
    <p className="text-green-500">¡Servicio bonificado!</p>
    <p>Descripción de la bonificación: {bonificacion}</p>
  </div>
)}

   {/* Redes sociales organizadas en dos columnas */}
<div className="flex flex-wrap justify-between mt-6 text-sm space-x-2">
  <div className="flex flex-col">
    <a href={userInfo.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center mb-1">
      <FaFacebook className="h-4 w-4 text-blue-600 mr-2" />
      <p className="text-gray-700 text-sm">{userInfo.facebook}</p>
    </a>
    <a href={userInfo.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center">
      <FaInstagram className="h-4 w-4 text-pink-600 mr-2" />
      <p className="text-gray-700 text-sm">{userInfo.instagram}</p>
    </a>
  </div>

  <div className="flex flex-col">
    <a href={userInfo.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center mb-1">
      <FaTiktok className="h-4 w-4 text-black mr-2" />
      <p className="text-gray-700 text-sm">{userInfo.tiktok}</p>
    </a>
    <a href={userInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center">
      <FaWhatsapp className="h-4 w-4 text-green-600 mr-2" />
      <p className="text-gray-700 text-sm">{userInfo.whatsapp}</p>
    </a>
  </div>
</div>


        </div>
      </div>

      {/* Botón para compartir en WhatsApp */}
      <button
        onClick={handleWhatsAppShare}
        className="mt-14 bg-green-500 text-white py-2 px-4 rounded-lg"
      >
        Enviar por WhatsApp
      </button>
    </div>
  );
};

export default InfoCard;

