import React from 'react';
import { FaAward, FaGraduationCap, FaLinkedin, FaCode } from 'react-icons/fa';
import { BOOTCAMP_INFO } from '../../domain/constants/bootcamp';

const InstructorSection: React.FC = () => {
  const { instructor } = BOOTCAMP_INFO;

  const achievements = [
    {
      icon: FaAward,
      title: "8+ años de experiencia",
      description: "En DevOps y Cloud Computing"
    },
    {
      icon: FaGraduationCap,
      title: "Certificaciones múltiples",
      description: "AWS, Azure, Kubernetes"
    },
    {
      icon: FaCode,
      title: "Proyectos enterprise",
      description: "Implementaciones a gran escala"
    }
  ];

  return (
    <section id="instructor" className="section-padding bg-lightBg">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-darkText mb-6">
            Tu Instructor
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprende de un experto con experiencia real en el campo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Instructor Info */}
          <div className="animate-slide-up">
            <div className="bg-white rounded-2xl p-8 card-shadow">
              {/* Profile Header */}
              <div className="flex items-center mb-6">
                <div className="w-24 h-24 mr-6 flex-shrink-0">
                  <img 
                    src="/assets/images/instructor/docente.jpeg" 
                    alt={`${instructor.name} - Senior DevOps Engineer`}
                    className="w-full h-full object-cover rounded-full shadow-lg border-4 border-white hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback si la imagen no carga
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  
                  {/* Fallback - Avatar con iniciales (oculto por defecto) */}
                  <div 
                    className="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg border-4 border-white"
                    style={{ display: 'none' }}
                  >
                    <span className="text-white font-bold text-2xl">
                      {instructor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-darkText">{instructor.name}</h3>
                  <p className="text-secondary font-semibold">Senior DevOps Engineer</p>
                  <div className="flex items-center mt-2">
                    <FaLinkedin className="text-blue-600 mr-2" />
                    <a 
                      href={instructor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition-colors duration-200"
                    >
                      Ver perfil en LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <h4 className="font-bold text-darkText mb-3">Experiencia Profesional</h4>
                <p className="text-gray-600 leading-relaxed">
                  {instructor.experience}
                </p>
              </div>

              {/* Certifications */}
              <div className="mb-6">
                <h4 className="font-bold text-darkText mb-3">Certificaciones</h4>
                <div className="flex flex-wrap gap-2">
                  {instructor.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {cert} Certified
                    </span>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="bg-lightBg rounded-lg p-4 border-l-4 border-accent">
                <p className="text-darkText italic">
                  "Mi objetivo es que cada estudiante no solo aprenda las herramientas, 
                  sino que entienda cómo aplicarlas en escenarios reales de producción."
                </p>
                <p className="text-right text-sm text-gray-600 mt-2">- {instructor.name}</p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-6 animate-fade-in">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 card-shadow flex items-start animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <achievement.icon className="text-accent text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-darkText mb-2">{achievement.title}</h4>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
              <h4 className="font-bold mb-3">¿Por qué elegir este bootcamp?</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Metodología práctica basada en proyectos reales
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Mentorías personalizadas durante todo el programa
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Acceso a comunidad exclusiva de DevOps Engineers
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Certificado de finalización reconocido en la industria
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <p className="text-gray-600">Estudiantes formados</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary mb-2">95%</div>
            <p className="text-gray-600">Tasa de satisfacción</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">8+</div>
            <p className="text-gray-600">Años de experiencia</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <p className="text-gray-600">Proyectos implementados</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorSection; 