import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';
import fondo from '../assets/fondo.png';
import fondo1 from '../assets/fondo1.png';
import fondo2 from '../assets/fondo2.png';
import fondo3 from '../assets/fondo3.png';
import fondo4 from '../assets/fondo4.png';
import defaulImage from '../assets/code.png';

const InfoCard = ({ phone, totalServices, bonificado, bonificacion, onPdfDownloaded }) => {
    const userInfo = useSelector((state) => state.userInfo);
    const cardRef = useRef(null); // Ref para el componente de la tarjeta
    const [selectedFondo, setSelectedFondo] = useState(fondo1);

    const handleDownloadPDF = () => {
        const element = cardRef.current; // Capturamos el contenido del componente

        const options = {
            filename: 'info-card.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3 },  
            jsPDF: {
                unit: 'mm',
                format: [150, 200],  
                orientation: 'portrait',
            },
            margin: [20, 20, 20, 20] 
        };
        // Generamos el PDF
        html2pdf()
            .from(element)
            .set(options)
            .save()
            .then(() => {
                setSelectedFondo(fondo1);
                if (onPdfDownloaded) {
                    onPdfDownloaded(); // Notifica al componente padre que el PDF fue descargado
                }
            });
    };

    return (
        <div className="p-4">
            {/* Opciones de imágenes de fondo */}
            <div className="flex justify-center mb-4 space-x-2">
                <img
                    src={fondo}
                    alt="Fondo"
                    className={`w-16 h-16 cursor-pointer ${selectedFondo === fondo ? 'border-4 border-blue-500' : ''}`}
                    onClick={() => setSelectedFondo(fondo)}
                />
                <img
                    src={fondo1}
                    alt="Fondo 1"
                    className={`w-16 h-16 cursor-pointer ${selectedFondo === fondo1 ? 'border-4 border-blue-500' : ''}`}
                    onClick={() => setSelectedFondo(fondo1)}
                />
                <img
                    src={fondo2}
                    alt="Fondo 2"
                    className={`w-16 h-16 cursor-pointer ${selectedFondo === fondo2 ? 'border-4 border-blue-500' : ''}`}
                    onClick={() => setSelectedFondo(fondo2)}
                />
                <img
                    src={fondo3}
                    alt="Fondo 3"
                    className={`w-16 h-16 cursor-pointer ${selectedFondo === fondo3 ? 'border-4 border-blue-500' : ''}`}
                    onClick={() => setSelectedFondo(fondo3)}
                />
                <img
                    src={fondo4}
                    alt="Fondo 4"
                    className={`w-16 h-16 cursor-pointer ${selectedFondo === fondo4 ? 'border-4 border-blue-500' : ''}`}
                    onClick={() => setSelectedFondo(fondo4)}
                />
            </div>

            {/* Tarjeta de información */}
            <div ref={cardRef} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto" style={{ backgroundImage: `url(${selectedFondo})`, backgroundSize: 'cover' }}>
                {/* Logo y Nombre en una línea */}
                <div className="flex items-center justify-center mb-4">
                    <img  src={userInfo.images[0] || defaulImage} alt="User Profile" className="h-24 w-24 rounded-full mr-4" />
                    <h2 className="text-3xl font-bold font-nunito uppercase text-center">{userInfo?.name}</h2>
                </div>

                {/* Información del cliente */}
                <div className="text-center">
                    <p className="text-lg font-nunito">Teléfono: {phone}</p>
                    <p className="text-lg font-nunito">Total de Servicios: {totalServices}</p>
                    {bonificado && (
                        <div className="mt-2 font-nunito uppercase font-bold ">
                            <strong className='font-nunito'>Bonificación:</strong> {bonificacion}
                        </div>
                    )}
                </div>

                <div className="flex justify-start w-full text-sm mt-4 gap-2">
    <div className="flex flex-col ">
        <a href={userInfo.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center " style={{ display: 'flex', alignItems: 'center' }}>
            <FaFacebook className="h-4 w-4 text-blue-600 mr-2" />
            <p className='font-nunito mb-4'>{userInfo.facebook}</p>
        </a>
        <a href={userInfo.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
            <FaInstagram className="h-4 w-4 text-pink-600 mr-2" />
            <p className='font-nunito mb-4' >{userInfo.instagram}</p>
        </a>
    </div>
    <div className="flex flex-col">
        <a href={userInfo.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center " style={{ display: 'flex', alignItems: 'center' }}>
            <FaTiktok className="h-4 w-4 text-black mr-2" />
            <p className='font-nunito mb-4' >{userInfo.tiktok}</p>
        </a>
        <a href={`https://wa.me/${userInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
            <FaWhatsapp className="h-4 w-4 text-green-600 mr-2" />
            <p className='font-nunito mb-4' >{userInfo.whatsapp}</p>
        </a>
    </div>
</div>


                {/* Botón para descargar el PDF */}
               
            </div>
            <div className="flex justify-center mt-8">
                    <button
                        onClick={handleDownloadPDF}
                        className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 font-nunito"
                    >
                        Descargar PDF
                    </button>
                </div>
        </div>
    );
};

export default InfoCard;

