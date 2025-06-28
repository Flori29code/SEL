import React from 'react';
import { FaHome, FaInfoCircle, FaDownload } from 'react-icons/fa';

interface NuppiLayoutProps {
  children: React.ReactNode;
}

const NuppiLayout: React.FC<NuppiLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-nuppi-azulOscuro shadow-lg sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/assets/images/nuppi/logo_nuppi.png" 
                alt="Nuppi Logo" 
                className="w-10 h-10 mr-3 object-contain"
              />
              <span className="text-2xl font-bold text-white">Nuppi</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#inicio"
                className="text-white hover:text-nuppi-amarilloCrema transition-colors duration-300 flex items-center"
              >
                <FaHome className="mr-2" />
                Inicio
              </a>
              <a
                href="#info"
                className="text-white hover:text-nuppi-amarilloCrema transition-colors duration-300 flex items-center"
              >
                <FaInfoCircle className="mr-2" />
                Información
              </a>
              <a
                href="#descarga"
                className="text-white hover:text-nuppi-amarilloCrema transition-colors duration-300 flex items-center"
              >
                <FaDownload className="mr-2" />
                Descarga
              </a>
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-nuppi-grisOscuro text-white py-8">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo y descripción */}
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="/assets/images/nuppi/logo_nuppi.png" 
                  alt="Nuppi Logo" 
                  className="w-8 h-8 mr-3 object-contain"
                />
                <span className="text-xl font-bold">Nuppi</span>
              </div>
              <p className="text-gray-300 text-sm">
                Tu aplicación móvil favorita. Fácil, rápida y gratuita.
              </p>
            </div>

            {/* Enlaces rápidos */}
            <div>
              <h4 className="font-bold mb-4 text-nuppi-verde">Enlaces rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#inicio" className="text-gray-300 hover:text-nuppi-amarilloCrema transition-colors">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#registro" className="text-gray-300 hover:text-nuppi-amarilloCrema transition-colors">
                    Registro
                  </a>
                </li>
                <li>
                  <a href="#descarga" className="text-gray-300 hover:text-nuppi-amarilloCrema transition-colors">
                    Descarga
                  </a>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="font-bold mb-4 text-nuppi-verde">Contacto</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>📧 contacto@nuppi.com</p>
                <p>📱 +1 (555) 123-4567</p>
                <p>🌐 www.nuppi.com</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Nuppi. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NuppiLayout; 