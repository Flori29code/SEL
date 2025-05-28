import React from 'react';
import { FaWhatsapp, FaLinkedin, FaInstagram, FaYoutube, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { generateWhatsAppUrl } from '../../infrastructure/config/whatsapp';
import { useScrollTo } from '../../application/hooks/useScrollTo';
import Logo from './Logo';

const Footer: React.FC = () => {
  const { scrollToSection } = useScrollTo();

  const handleWhatsAppClick = () => {
    window.open(generateWhatsAppUrl(), '_blank');
  };

  const navigationLinks = [
    { label: 'Inicio', id: 'hero' },
    { label: 'Qué aprenderás', id: 'learning' },
    { label: 'Plan de estudios', id: 'curriculum' },
    { label: 'Instructor', id: 'instructor' },
    { label: 'Modalidad', id: 'modality' },
    { label: 'Precios', id: 'pricing' }
  ];

  const socialLinks = [
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      url: generateWhatsAppUrl(),
      color: 'hover:text-green-500'
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/jose-liza/',
      color: 'hover:text-blue-600'
    },
    {
      icon: FaInstagram,
      label: 'Instagram',
      url: 'https://instagram.com/bootcampdevops',
      color: 'hover:text-pink-500'
    },
    {
      icon: FaYoutube,
      label: 'YouTube',
      url: 'https://youtube.com/@bootcampdevops',
      color: 'hover:text-red-500'
    }
  ];

  const contactInfo = [
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      value: '+51 900 707 304',
      action: handleWhatsAppClick
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'info@bootcampdevops.com',
      action: () => window.open('mailto:info@bootcampdevops.com')
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Ubicación',
      value: 'Lima, Perú',
      action: undefined
    }
  ];

  return (
    <footer className="bg-darkText text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo 
                variant="light"
                size="lg"
                showText={true}
              />
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Formamos a los próximos DevOps Engineers con las tecnologías más demandadas 
              del mercado. Aprende AWS, Azure, Docker, Kubernetes y más.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold mb-6">Navegación</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-300 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contacto</h3>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <li key={index} className="flex items-start">
                  <contact.icon className="text-accent mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">{contact.label}</p>
                    {contact.action ? (
                      <button
                        onClick={contact.action}
                        className="text-white hover:text-accent transition-colors"
                      >
                        {contact.value}
                      </button>
                    ) : (
                      <span className="text-white">{contact.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-lg font-bold mb-6">¿Listo para empezar?</h3>
            <p className="text-gray-300 mb-6">
              Únete a nuestra próxima cohorte y transforma tu carrera profesional.
            </p>
            
            <button
              onClick={handleWhatsAppClick}
              className="btn-primary w-full flex items-center justify-center mb-4"
            >
              <FaWhatsapp className="mr-2" />
              Contactar ahora
            </button>

            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-accent font-bold text-sm mb-1">Próximo inicio:</p>
              <p className="text-white font-bold">10 de mayo, 2025</p>
              <p className="text-gray-400 text-sm">Sábados 7:00 PM - 10:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>&copy; 2025 BootCamp DevOps. Todos los derechos reservados.</p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <button className="hover:text-accent transition-colors">
                Términos y Condiciones
              </button>
              <button className="hover:text-accent transition-colors">
                Política de Privacidad
              </button>
              <button className="hover:text-accent transition-colors">
                Política de Reembolso
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button
        onClick={() => scrollToSection('hero')}
        className="fixed bottom-20 right-6 w-12 h-12 bg-accent hover:bg-accent/90 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-40"
        aria-label="Volver arriba"
      >
        <span className="text-lg">↑</span>
      </button>
    </footer>
  );
};

export default Footer; 