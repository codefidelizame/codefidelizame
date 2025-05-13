import React, { useState, useRef, useEffect } from 'react';
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
    const cardRef = useRef(null);
    const [selectedFondo, setSelectedFondo] = useState(fondo1);

    useEffect(() => {
        // console.log("InfoCard Props:", { phone, totalServices, bonificado, bonificacion, userInfo });
    }, [phone, totalServices, bonificado, bonificacion, userInfo]);

    const handleDownloadImage = async () => {
        const element = cardRef.current;
        if (!element) {
            console.error("Elemento de la tarjeta no encontrado.");
            return;
        }
        if (!phone || !userInfo || !userInfo.name) {
            console.error("Datos incompletos para generar la tarjeta.", { phone, userInfo });
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 300));
        const options = {
            html2canvas: {
                scale: 2.5,
                useCORS: true,
                logging: true,
                width: element.offsetWidth,
                height: element.offsetHeight,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight,
                scrollX: 0,
                scrollY: 0,
            },
        };
        try {
            const dataUrl = await html2pdf().from(element).set(options).outputImg('dataurlstring');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'info-card-vertical.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            if (onPdfDownloaded) {
                onPdfDownloaded();
            }
        } catch (error) {
            console.error('Error al generar la imagen:', error);
        }
    };

    const getSocialUsername = (url, platform) => {
        if (!url) return '';
        try {
            const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
            let pathParts = urlObj.pathname.split('/').filter(part => part !== '');
            if (platform === 'tiktok' && pathParts.length > 0 && pathParts[0].startsWith('@')) {
                return pathParts[0];
            }
            if (pathParts.length > 0) {
                return pathParts[pathParts.length - 1];
            }
            return urlObj.hostname;
        } catch (e) {
            return String(url).replace(/^https?:\/\//, '').replace(/^www\./, '');
        }
    };

    return (
        <div className="p-4 flex flex-col items-center  w-full">
            {/* Contenedor principal para la tarjeta y los selectores de fondo */}
            <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-4 w-full max-w-lg md:max-w-none justify-center">
                {/* Tarjeta de información */}
                <div 
                    ref={cardRef} 
                     className="bg-white rounded-lg shadow-xl flex flex-col items-center justify-between p-6 sm:p-8 md:p-12 overflow-hidden w-full max-w-[375px]" // Padding responsivo y max-width
                    style={{ 
                        backgroundImage: `url(${selectedFondo})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center',
                        width: '375px',
                        height: '750px', 
                        boxSizing: 'border-box',
                    }}
                >
                    {/* Sección Superior (Logo y Nombre) */}
                    <div className="flex flex-col items-center text-center pt-5">
                        <img 
                            src={userInfo?.images && userInfo.images.length > 0 ? userInfo.images[0] : defaulImage} 
                            alt="User Profile" 
                            className="h-28 w-28 rounded-full mb-3 object-cover shadow-md"
                        />
                        <h2 className="text-2xl font-bold font-nunito uppercase tracking-wide">{userInfo?.name || "Nombre de Usuario"}</h2>
                    </div>

                    {/* Sección Media (Información del Cliente) */}
                    <div className="text-center my-4">
                        <p className="text-lg font-nunito mb-1">Teléfono: {phone || "N/A"}</p>
                        <p className="text-lg font-nunito">Total de Servicios: {totalServices === undefined ? "N/A" : totalServices}</p>
                        {bonificado && bonificacion && (
                            <div className="mt-3 p-2 bg-green-100 bg-opacity-75 rounded-md">
                                <strong className='font-nunito text-green-800 text-md'>Bonificación:</strong>
                                <p className="text-green-700 text-sm">{bonificacion}</p>
                            </div>
                        )}
                    </div>

                    {/* Sección Inferior (Redes Sociales) */}
                    <div className="w-full flex flex-col items-center"> 
                        <p className="text-lg font-nunito text-gray-800 mb-6">Síguenos en nuestras redes</p>
                        <div className="w-full max-w-xs px-2 flex flex-col space-y-2">
                            {userInfo?.facebook && (
                                <a href={userInfo.facebook.startsWith('http') ? userInfo.facebook : `https://${userInfo.facebook}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 py-2 px-1 rounded hover:bg-gray-100 transition-colors min-h-[40px]">
                                    <FaFacebook className="h-6 w-6 text-blue-600 flex-shrink-0" />
                                    <p className="text-xs leading-normal font-nunito text-gray-700" title={getSocialUsername(userInfo.facebook, 'facebook')}>{getSocialUsername(userInfo.facebook, 'facebook')}</p>
                                </a>
                            )}
                            {userInfo?.instagram && (
                                <a href={userInfo.instagram.startsWith('http') ? userInfo.instagram : `https://${userInfo.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 py-2 px-1 rounded hover:bg-gray-100 transition-colors min-h-[40px]">
                                    <FaInstagram className="h-6 w-6 text-pink-600 flex-shrink-0" />
                                    <p className="text-xs leading-normal font-nunito text-gray-700" title={getSocialUsername(userInfo.instagram, 'instagram')}>{getSocialUsername(userInfo.instagram, 'instagram')}</p>
                                </a>
                            )}
                            {userInfo?.tiktok && (
                                <a href={userInfo.tiktok.startsWith('http') ? userInfo.tiktok : `https://${userInfo.tiktok}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 py-2 px-1 rounded hover:bg-gray-100 transition-colors min-h-[40px]">
                                    <FaTiktok className="h-6 w-6 text-black flex-shrink-0" />
                                    <p className="text-xs leading-normal font-nunito text-gray-700" title={getSocialUsername(userInfo.tiktok, 'tiktok')}>{getSocialUsername(userInfo.tiktok, 'tiktok')}</p>
                                </a>
                            )}
                            {userInfo?.whatsapp && (
                                <a href={`https://wa.me/${String(userInfo.whatsapp).replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 py-2 px-1 rounded hover:bg-gray-100 transition-colors min-h-[40px]">
                                    <FaWhatsapp className="h-6 w-6 text-green-500 flex-shrink-0" />
                                    <p className="text-xs leading-normal font-nunito text-gray-700" title={String(userInfo.whatsapp)}>{String(userInfo.whatsapp)}</p>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Espaciador */}
                    <div className="h-10 w-full"></div>
                </div>

               <div className="flex flex-row space-x-2 mt-4 md:flex-col md:space-y-2 md:space-x-0 md:mt-0 overflow-x-auto md:overflow-x-visible py-2 md:py-0">
                    {[fondo, fondo1, fondo2, fondo3, fondo4].map((f, index) => (
                        <img 
                            key={index}
                            src={f} 
                            alt={`Fondo ${index}`} 
                            className={`w-12 h-12 sm:w-16 sm:h-16 cursor-pointer rounded flex-shrink-0 ${selectedFondo === f ? 'border-4 border-blue-500' : 'border-2 border-gray-300'}`} // Tamaño responsivo y flex-shrink-0
                            onClick={() => setSelectedFondo(f)} 
                        />
                    ))}
                </div>
                   
            </div>

         <div className="flex justify-center mt-6 md:mt-8">
                <button
                    onClick={handleDownloadImage}
                    className="bg-blue-500 text-white py-2.5 px-5 sm:py-3 sm:px-6 rounded-lg hover:bg-blue-600 font-nunito text-base sm:text-lg shadow-md" // Padding y texto responsivo
                    disabled={!phone || !userInfo}
                >
                    Descargar Tarjeta
                </button>
            </div>
        
        </div>
    );
};

export default InfoCard;