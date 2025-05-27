import React from 'react';
import { FaCalendarAlt, FaClock, FaRocket, FaAws, FaDocker, FaCloud } from 'react-icons/fa';
import { SiKubernetes } from 'react-icons/si';
import { BOOTCAMP_INFO } from '../../domain/constants/bootcamp';
import { generateWhatsAppUrl } from '../../infrastructure/config/whatsapp';
import { formatPrice, formatDiscount } from '../../application/helpers/formatters';

const HeroSection: React.FC = () => {
  const handleCTAClick = () => {
    window.open(generateWhatsAppUrl(), '_blank');
  };

  const discount = formatDiscount(BOOTCAMP_INFO.pricing.latam.original, BOOTCAMP_INFO.pricing.latam.discounted);

  return (
    <section id="hero" className="relative min-h-screen flex items-center gradient-bg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-white/20 rounded-full"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white animate-fade-in">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <FaRocket className="text-accent mr-2" />
              <span className="text-sm font-medium">¡Nuevo Bootcamp 2025!</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {BOOTCAMP_INFO.name}
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Domina las tecnologías más demandadas del mercado y conviértete en un 
              <span className="text-accent font-semibold"> DevOps Engineer</span> certificado
            </p>

            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                <FaCalendarAlt className="text-accent text-xl mr-3" />
                <div>
                  <p className="text-sm text-white/80">Inicio</p>
                  <p className="font-semibold">{BOOTCAMP_INFO.startDate}, {BOOTCAMP_INFO.schedule}</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                <FaClock className="text-accent text-xl mr-3" />
                <div>
                  <p className="text-sm text-white/80">Horario Perú/Colombia</p>
                  <p className="font-semibold">{BOOTCAMP_INFO.modality.schedules.peru}</p>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">Precio especial de lanzamiento</p>
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-accent">
                      {formatPrice(BOOTCAMP_INFO.pricing.latam.discounted, BOOTCAMP_INFO.pricing.latam.currency)}
                    </span>
                    <span className="text-lg text-white/60 line-through">
                      {formatPrice(BOOTCAMP_INFO.pricing.latam.original, BOOTCAMP_INFO.pricing.latam.currency)}
                    </span>
                    <span className="bg-danger text-white text-sm font-bold px-2 py-1 rounded">
                      -{discount}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleCTAClick}
              className="btn-primary text-lg px-8 py-4 w-full sm:w-auto animate-bounce-slow"
            >
              ¡Reserva tu cupo ahora!
            </button>

            <p className="text-white/70 text-sm mt-4">
              🔥 <strong>Vacantes limitadas</strong> - Solo 20 estudiantes por cohorte
            </p>
          </div>

          {/* Visual Element */}
          <div className="hidden lg:block animate-slide-up">
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'AWS', icon: FaAws, color: 'text-orange-300', bg: 'bg-orange-500/20' },
                    { name: 'Azure', icon: FaCloud, color: 'text-blue-300', bg: 'bg-blue-500/20' },
                    { name: 'Docker', icon: FaDocker, color: 'text-cyan-300', bg: 'bg-cyan-500/20' },
                    { name: 'Kubernetes', icon: SiKubernetes, color: 'text-indigo-300', bg: 'bg-indigo-500/20' }
                  ].map((tech, index) => {
                    const IconComponent = tech.icon;
                    return (
                                              <div 
                          key={tech.name}
                          className="bg-white/15 backdrop-blur-sm rounded-lg p-4 text-center transform hover:scale-105 transition-all duration-300 animate-fade-in border border-white/20 hover:border-white/40"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className={`w-12 h-12 ${tech.bg} rounded-lg mx-auto mb-2 flex items-center justify-center shadow-lg`}>
                            <IconComponent className={`text-2xl ${tech.color} drop-shadow-lg`} />
                          </div>
                          <p className="text-white font-medium text-sm">{tech.name}</p>
                        </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 