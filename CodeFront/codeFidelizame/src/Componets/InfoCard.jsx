import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import html2canvas from 'html2canvas'; // Para capturar la tarjeta como imagen
import fondo from '../assets/fondo.png';
import fondo1 from '../assets/fondo1.png';
import fondo2 from '../assets/fondo2.png';
import fondo3 from '../assets/fondo3.png';
import fondo4 from '../assets/fondo4.png';
import defaulImage from '../assets/code.png'


const InfoCard = ({ phone, totalServices, bonificado, bonificacion }) => {
    const userInfo = useSelector((state) => state.userInfo);
    const cardRef = useRef(null); // Ref para el componente de la tarjeta
    const [selectedFondo, setSelectedFondo] = useState(fondo1);

    const fetchImageAsBlob = async (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous"; // Asegúrate de que se pueda acceder a la imagen
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/png');
            };
            img.onerror = (error) => {
                reject(error);
            };
            img.src = url; // Aquí asegúrate de que la URL es correcta
        });
    };


    const handleWhatsAppShare = async () => {
        try {
            const userImageBlob = await fetchImageAsBlob(userInfo.images[0]); // Cambia al índice correcto
            const userImageUrl = URL.createObjectURL(userImageBlob);
            const imgElement = cardRef.current.querySelector('img[alt="User Profile"]');
            imgElement.src = userImageUrl;

            // Espera un momento para que la imagen se cargue correctamente en el DOM
            await new Promise((resolve) => setTimeout(resolve, 100));

            const canvas = await html2canvas(cardRef.current);
            canvas.toBlob(async (blob) => {
                if (blob) {
                    const formData = new FormData();
                    formData.append('file', blob, 'card-image.png');
                    formData.append('upload_preset', 'codeFidelizate');

                    const response = await fetch(`https://api.cloudinary.com/v1_1/dxcdz1l2b/image/upload`, {
                        method: 'POST',
                        body: formData,
                    });

                    const data = await response.json();
                    if (data.secure_url) {
                        const imageUrl = data.secure_url;
                        console.log("Imagen subida a Cloudinary:", imageUrl);

                        // Crear un enlace de WhatsApp con la URL de la imagen
                        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Comprobante de compra: ${imageUrl}`)}`;
                        window.open(whatsappUrl, '_blank'); // Abrir en una nueva pestaña
                    } else {
                        console.error('Error: No se recibió la URL segura de Cloudinary');
                    }
                } else {
                    console.error('Error: No se pudo generar el blob.');
                }
            }, 'image/png');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div className="flex justify-center mb-4">
                {/* Opciones de imágenes de fondo */}
                <div className="flex space-x-2 md: p-4 md: justify-center">
                <img
                        src={fondo}
                        alt="Fondo "
                        className={`w-12 h-12 cursor-pointer ${selectedFondo === fondo ? 'border-4 border-blue-500' : ''}`}
                        onClick={() => setSelectedFondo(fondo)}
                    />
                    <img
                        src={fondo1}
                        alt="Fondo 1"
                        className={`w-12 h-12 cursor-pointer ${selectedFondo === fondo1 ? 'border-4 border-blue-500' : ''}`}
                        onClick={() => setSelectedFondo(fondo1)}
                    />
                    <img
                        src={fondo2}
                        alt="Fondo 2"
                        className={`w-12 h-12 cursor-pointer ${selectedFondo === fondo2 ? 'border-4 border-blue-500' : ''}`}
                        onClick={() => setSelectedFondo(fondo2)}
                    />
                    <img
                        src={fondo3}
                        alt="Fondo 3"
                        className={`w-12 h-12 cursor-pointer ${selectedFondo === fondo3 ? 'border-4 border-blue-500' : ''}`}
                        onClick={() => setSelectedFondo(fondo3)}
                    />
                     <img
                        src={fondo4}
                        alt="Fondo 4"
                        className={`w-12 h-12 cursor-pointer ${selectedFondo === fondo4 ? 'border-4 border-blue-500' : ''}`}
                        onClick={() => setSelectedFondo(fondo4)}
                    />
                </div>
            </div>

            <div className="rounded-lg shadow-lg p-2 w-96 relative bg-white overflow-hidden md: mr-4 ">
                <div ref={cardRef} className="relative">
                    {/* Imagen de fondo seleccionada */}
                    <img
                        src={selectedFondo}
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover opacity-80 rounded-lg"
                    />
                    {/* Información del comercio y cliente */}
                    <div className="relative z-10 flex flex-col items-start text-left p-4 h-full">
                        <div className="flex items-center mb-2">
                            <img
                                src={userInfo.images[0] || defaulImage}
                                alt="User Profile"
                                className="h-16 w-16 rounded-full border-1 border-slate-700 "
                            />
                            <h2 className="text-xl text-slate-700 font-nunito font-semibold ml-4 uppercase">{userInfo.name}</h2>
                        </div>
                        <div className='flex-grow '>
                            <p className="text-gray-700 font-nunito text-sm font-semibold rounded-md p-1">Cliente: {phone}</p>
                            <p className="text-gray-700 font-nunito text-sm font-semibold rounded-md p-1">Bono N°: {totalServices}</p>
                        </div>
                        {bonificado && (
                            <div className="mb-0">
                                <p className="text-teal-700 font-nunito uppercase font-semibold">¡Servicio bonificado!</p>
                                <p className="text-teal-700 font-semibold text-center font-nunito uppercase p-2">{bonificacion}</p>
                            </div>
                        )}
                        <div className="flex flex-wrap justify-between text-sm space-x-2">
                            <div className="flex flex-col">
                                <a href={userInfo.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center mb-1">
                                    <FaFacebook className="h-4 w-4 text-blue-600 mr-2" />
                                    <p className="text-gray-700 font-semibold font-nunito text-sm">{userInfo.facebook}</p>
                                </a>
                                <a href={userInfo.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                    <FaInstagram className="h-4 w-4 text-pink-600 mr-2" />
                                    <p className="text-gray-700 font-semibold font-nunito text-sm">{userInfo.instagram}</p>
                                </a>
                            </div>

                            <div className="flex flex-col">
                                <a href={userInfo.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center mb-1">
                                    <FaTiktok className="h-4 w-4 text-black mr-2" />
                                    <p className="text-gray-700 font-semibold font-nunito text-sm">{userInfo.tiktok}</p>
                                </a>
                                <a href={userInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                    <FaWhatsapp className="h-4 w-4 text-green-600 mr-2" />
                                    <p className="text-gray-700 font-semibold font-nunito text-sm">{userInfo.whatsapp}</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleWhatsAppShare}
                    className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg"
                >
                    Enviar por WhatsApp
                </button>
            </div>
        </div>
    );
};
export default InfoCard;
