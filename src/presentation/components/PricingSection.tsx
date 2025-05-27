import React from 'react';
import { FaCheck, FaCreditCard, FaWhatsapp, FaClock, FaGift } from 'react-icons/fa';
import { BOOTCAMP_INFO, PAYMENT_METHODS, PAYMENT_INFO } from '../../domain/constants/bootcamp';
import { generateWhatsAppUrl } from '../../infrastructure/config/whatsapp';
import { formatPrice } from '../../application/helpers/formatters';

const PricingSection: React.FC = () => {
  const { pricing } = BOOTCAMP_INFO;

  const handleWhatsAppClick = () => {
    const message = `Hola, quiero inscribirme al ${BOOTCAMP_INFO.name}. ¿Podrían darme más información sobre el proceso de pago?`;
    window.open(generateWhatsAppUrl(message), '_blank');
  };

  const benefits = [
    "Acceso completo a todas las clases en vivo",
    "Grabaciones disponibles por 6 meses",
    "Laboratorios prácticos en AWS y Azure",
    "Mentorías personalizadas con el instructor",
    "Certificado de finalización",
    "Acceso a comunidad exclusiva de DevOps",
    "Material de estudio descargable",
    "Soporte técnico durante todo el programa"
  ];

  return (
    <section id="pricing" className="section-padding bg-lightBg">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-darkText mb-6">
            Inversión en tu Futuro
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Precio especial de lanzamiento por tiempo limitado
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Pricing Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 card-shadow relative overflow-hidden animate-slide-up">
            {/* Discount Badge */}
            <div className="absolute top-0 right-0 bg-danger text-white px-6 py-2 rounded-bl-2xl">
              <span className="font-bold">-50% OFF</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Pricing Info */}
              <div>
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <FaGift className="text-accent text-2xl mr-3" />
                    <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-bold">
                      OFERTA ESPECIAL
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-darkText mb-4">
                    {BOOTCAMP_INFO.name}
                  </h3>
                  
                  {/* Precios para Perú */}
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">🇵🇪 Perú</h4>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-accent">
                        {formatPrice(pricing.peru.discounted, pricing.peru.currency)}
                      </span>
                      <span className="text-xl text-gray-400 line-through ml-3">
                        {formatPrice(pricing.peru.original, pricing.peru.currency)}
                      </span>
                    </div>
                  </div>

                  {/* Precios para LATAM */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">🌎 LATAM (USD)</h4>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-accent">
                        {formatPrice(pricing.latam.discounted, pricing.latam.currency)}
                      </span>
                      <span className="text-xl text-gray-400 line-through ml-3">
                        {formatPrice(pricing.latam.original, pricing.latam.currency)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 mb-6">
                    <div className="flex items-center text-primary">
                      <FaClock className="mr-2" />
                      <span className="font-semibold">Oferta válida hasta el 5 de mayo</span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <h4 className="font-bold text-darkText mb-4">Lo que incluye:</h4>
                  <div className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <FaCheck className="text-white text-xs" />
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleWhatsAppClick}
                  className="btn-primary w-full text-lg py-4 flex items-center justify-center animate-pulse"
                >
                  <FaWhatsapp className="mr-3 text-xl" />
                  ¡Inscríbete Ahora por WhatsApp!
                </button>

                <p className="text-center text-gray-600 text-sm mt-4">
                  🔥 <strong>Solo quedan 8 cupos disponibles</strong>
                </p>
              </div>

              {/* Payment Methods */}
              <div className="animate-fade-in">
                <div className="bg-lightBg rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <FaCreditCard className="text-2xl text-primary mr-3" />
                    <h4 className="text-xl font-bold text-darkText">Métodos de Pago</h4>
                  </div>

                  {/* Información de pago para Perú */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <h5 className="font-bold text-green-800 mb-2">🇵🇪 Pago Nacional (Perú)</h5>
                    <div className="text-sm text-green-700 space-y-1">
                      <p><strong>Yape/Plin:</strong> {PAYMENT_INFO.peru.yape_plin.phone}</p>
                      <p><strong>BCP:</strong> {PAYMENT_INFO.peru.bcp.account}</p>
                      <p><strong>Interbank:</strong> {PAYMENT_INFO.peru.interbank.account}</p>
                      <p><strong>Titular:</strong> {PAYMENT_INFO.peru.yape_plin.name}</p>
                    </div>
                  </div>

                  {/* Información de pago para LATAM */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h5 className="font-bold text-blue-800 mb-2">🌎 Pago Internacional (LATAM)</h5>
                    <p className="text-sm text-blue-700 mb-1">
                      <strong>Email:</strong> {PAYMENT_INFO.latam.email}
                    </p>
                    <p className="text-sm text-blue-700">
                      <strong>Titular:</strong> {PAYMENT_INFO.latam.name}
                    </p>
                  </div>

                  <p className="text-gray-600 mb-6">
                    También acepta métodos de pago locales
                  </p>

                  {/* Payment Methods Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                    {PAYMENT_METHODS.map((method, index) => (
                      <div
                        key={method.name}
                        className="bg-white rounded-lg p-4 flex flex-col items-center justify-center card-shadow hover:scale-105 transition-transform animate-slide-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="w-12 h-12 flex items-center justify-center mb-2">
                          <img 
                            src={method.logo} 
                            alt={method.name}
                            className="w-full h-full object-contain rounded-lg"
                            onError={(e) => {
                              // Fallback si la imagen no carga
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<span class="text-xs font-bold text-gray-600">${method.name.slice(0, 3).toUpperCase()}</span>`;
                                parent.className = "w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-2";
                              }
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{method.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Payment Options */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border-l-4 border-accent">
                      <h5 className="font-bold text-darkText mb-2">💳 Pago único</h5>
                      <p className="text-sm text-gray-600">
                        Paga el curso completo y ahorra hasta {formatPrice(pricing.latam.original - pricing.latam.discounted, pricing.latam.currency)}
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border-l-4 border-secondary">
                      <h5 className="font-bold text-darkText mb-2">📅 Pago en cuotas</h5>
                      <p className="text-sm text-gray-600">
                        Consulta opciones de financiamiento disponibles
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guarantee */}
          <div className="mt-12 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">Garantía de Satisfacción</h3>
            <p className="text-lg mb-6">
              Si no estás satisfecho con el contenido del curso en las primeras 2 semanas, 
              te devolvemos el 100% de tu dinero.
            </p>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <div className="text-left">
                <p className="font-bold">Garantía de 14 días</p>
                <p className="text-white/80">Sin preguntas, sin complicaciones</p>
              </div>
            </div>
          </div>

          {/* Urgency */}
          <div className="mt-8 bg-danger/10 border border-danger/20 rounded-xl p-6 text-center animate-bounce-slow">
            <h4 className="text-xl font-bold text-danger mb-2">⏰ ¡Últimos días de oferta!</h4>
            <p className="text-gray-700">
              Los precios volverán a su valor original después del 5 de mayo. 
              <strong> No pierdas esta oportunidad única.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 