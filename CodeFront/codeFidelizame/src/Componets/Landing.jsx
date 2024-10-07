import React from 'react';
import { FaSignInAlt } from 'react-icons/fa'; // Importamos el ícono
import { Link } from 'react-router-dom'; // Importamos Link para la navegación
import Logo from '../assets/code.png';
import Gif from '../assets/Gif6.png';

const Landing = () => {
  return (
    <div className="relative h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 sm:p-6">
        {/* Contenedor del logo y el ícono */}
        <div className="flex justify-between w-full">
          {/* Logo a la izquierda */}
          <div className="text-white text-xl font-bold cursor-pointer">
            <img src={Logo} alt="Logo" className="h-16 sm:h-24 rounded-full" />
          </div>
          
          {/* Ingresar Icon a la derecha */}
          <Link to="/login" className="text-white text-2xl sm:text-3xl cursor-pointer">
            <FaSignInAlt />
          </Link>
        </div>
      </div>

      {/* Contenido Central */}
      <div className="flex flex-col md:flex-row items-center justify-center sm:justify-between h-full px-4 sm:px-8 py-4 sm:py-8">
        {/* Texto a la Izquierda */}
        <div className="text-left w-full md:w-1/2 sm:mt-16 mt-32 md:mt-0">
          <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
            ¡Bienvenidos a Code Fidelizame!
          </h1>
          <p className="text-white text-base sm:text-lg md:text-xl mb-6">
            Descubre nuestros productos y servicios increíbles.
          </p>
          {/* Botón de WhatsApp */}
          <a
            href="https://wa.me/573502142082?text=Hola,%20me%20gustaría%20más%20información."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
          >
            Contáctanos
          </a>
        </div>

        {/* Imagen a la Derecha */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={Gif}
            alt="Imagen"
            className="w-full max-w-xs sm:max-w-md object-cover rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;



