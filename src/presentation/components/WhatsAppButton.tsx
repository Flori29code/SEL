import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { generateWhatsAppUrl } from '../../infrastructure/config/whatsapp';

const WhatsAppButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar el botón después de hacer scroll hacia abajo
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Mostrar tooltip después de 3 segundos
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    // Ocultar tooltip después de 8 segundos
    const hideTooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(tooltipTimer);
      clearTimeout(hideTooltipTimer);
    };
  }, []);

  const handleWhatsAppClick = () => {
    const message = `Hola, estoy interesado en el BootCamp DevOps con AWS y Azure. ¿Podrían darme más información?`;
    window.open(generateWhatsAppUrl(message), '_blank');
    setShowTooltip(false);
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-16 right-0 mb-2 animate-slide-up">
          <div className="bg-white rounded-lg shadow-xl p-4 max-w-xs relative">
            <button
              onClick={handleCloseTooltip}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={12} />
            </button>
            
            <div className="pr-4">
              <p className="text-sm font-semibold text-darkText mb-1">
                ¡Hola! 👋
              </p>
              <p className="text-xs text-gray-600 mb-3">
                ¿Tienes preguntas sobre el BootCamp DevOps? Estoy aquí para ayudarte.
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="text-xs bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors"
              >
                Escribir por WhatsApp
              </button>
            </div>
            
            {/* Arrow */}
            <div className="absolute bottom-0 right-4 transform translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 animate-bounce-slow"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp className="text-2xl" />
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
      </button>

      {/* Notification Badge */}
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
        1
      </div>
    </div>
  );
};

export default WhatsAppButton; 