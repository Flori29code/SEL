import React from 'react';
import { FaVideo, FaClock, FaGlobe, FaUsers, FaCalendarAlt, FaLaptop } from 'react-icons/fa';
import { BOOTCAMP_INFO } from '../../domain/constants/bootcamp';

const ModalitySection: React.FC = () => {
  const { modality } = BOOTCAMP_INFO;

  const features = [
    {
      icon: FaVideo,
      title: "Clases en vivo",
      description: "Interacción directa con el instructor y compañeros"
    },
    {
      icon: FaLaptop,
      title: "Hands-on Learning",
      description: "Práctica inmediata de cada concepto aprendido"
    },
    {
      icon: FaUsers,
      title: "Grupos reducidos",
      description: "Máximo 20 estudiantes para atención personalizada"
    },
    {
      icon: FaGlobe,
      title: "Acceso global",
      description: "Desde cualquier lugar con conexión a internet"
    }
  ];

  const scheduleInfo = [
    {
      country: "Perú, Colombia, Ecuador",
      time: modality.schedules.peru,
      timezone: "UTC-5"
    },
    {
      country: "México",
      time: modality.schedules.mexico,
      timezone: "UTC-6"
    }
  ];

  return (
    <section id="modality" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-darkText mb-6">
            Modalidad y Horarios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprende desde casa con la flexibilidad que necesitas
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Modality Info */}
          <div className="animate-slide-up">
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white mb-8">
              <div className="flex items-center mb-6">
                <FaVideo className="text-4xl text-accent mr-4" />
                <div>
                  <h3 className="text-2xl font-bold">{modality.type}</h3>
                  <p className="text-white/80">Modalidad 100% online</p>
                </div>
              </div>
              
              <p className="text-lg leading-relaxed mb-6">
                Nuestras clases son completamente en vivo, lo que te permite interactuar 
                directamente con el instructor, hacer preguntas en tiempo real y colaborar 
                con tus compañeros de clase.
              </p>

              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-bold mb-3">¿Qué incluye cada sesión?</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                    Teoría explicada de forma práctica
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                    Laboratorios hands-on en tiempo real
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                    Resolución de dudas en vivo
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                    Grabaciones disponibles 24/7
                  </li>
                </ul>
              </div>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-lightBg rounded-lg p-4 flex items-start animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <feature.icon className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-darkText mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="animate-fade-in">
            <div className="bg-lightBg rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <FaCalendarAlt className="text-3xl text-primary mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-darkText">Horarios por País</h3>
                  <p className="text-gray-600">Todos los sábados</p>
                </div>
              </div>

              <div className="space-y-6">
                {scheduleInfo.map((schedule, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 card-shadow animate-slide-up"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-darkText">{schedule.country}</h4>
                      <span className="text-sm text-gray-500">{schedule.timezone}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <FaClock className="text-accent mr-3" />
                      <span className="text-xl font-bold text-primary">{schedule.time}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-2">
                      3 horas de formación intensiva cada sábado
                    </p>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-8 bg-white rounded-xl p-6 border-l-4 border-accent">
                <h4 className="font-bold text-darkText mb-3">Información importante:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span>Las clases se graban y están disponibles por 6 meses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span>Soporte técnico disponible durante las clases</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span>Acceso a laboratorios cloud gratuitos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span>Certificado de participación al finalizar</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="mt-16 bg-gradient-to-r from-lightBg to-white rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-darkText mb-6 text-center">
            Requisitos Técnicos
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLaptop className="text-2xl text-primary" />
              </div>
              <h4 className="font-bold text-darkText mb-2">Computadora</h4>
              <p className="text-gray-600 text-sm">
                Windows, Mac o Linux con mínimo 8GB RAM
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGlobe className="text-2xl text-secondary" />
              </div>
              <h4 className="font-bold text-darkText mb-2">Internet</h4>
              <p className="text-gray-600 text-sm">
                Conexión estable de al menos 10 Mbps
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-2xl text-accent" />
              </div>
              <h4 className="font-bold text-darkText mb-2">Actitud</h4>
              <p className="text-gray-600 text-sm">
                Ganas de aprender y practicar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModalitySection; 