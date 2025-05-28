import React, { useEffect, useState } from 'react';
import { FaRocket, FaUsers, FaGraduationCap, FaAward, FaGlobe, FaLightbulb, FaHeart, FaStar } from 'react-icons/fa';
import { useScrollTo } from '../../application/hooks/useScrollTo';

const AboutSection: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const { scrollToSection } = useScrollTo();

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  const stats = [
    { icon: FaUsers, value: "500+", label: "Estudiantes formados", color: "text-blue-500" },
    { icon: FaGraduationCap, value: "95%", label: "Tasa de empleabilidad", color: "text-green-500" },
    { icon: FaAward, value: "8+", label: "Años de experiencia", color: "text-purple-500" },
    { icon: FaGlobe, value: "15+", label: "Países alcanzados", color: "text-orange-500" }
  ];

  const values = [
    {
      icon: FaRocket,
      title: "Innovación",
      description: "Utilizamos las tecnologías más actuales y metodologías de vanguardia",
      color: "bg-blue-500"
    },
    {
      icon: FaUsers,
      title: "Comunidad",
      description: "Creamos una red de profesionales que se apoyan mutuamente",
      color: "bg-green-500"
    },
    {
      icon: FaLightbulb,
      title: "Excelencia",
      description: "Nos comprometemos con la calidad en cada aspecto de la formación",
      color: "bg-purple-500"
    },
    {
      icon: FaHeart,
      title: "Pasión",
      description: "Amamos lo que hacemos y eso se refleja en nuestros resultados",
      color: "bg-red-500"
    }
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Partículas de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-bounce-slow">
            <FaStar className="mr-2" />
            Sobre Software Engineering Latam
            <FaStar className="ml-2" />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-darkText mb-6">
            Transformamos Carreras en
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Tecnología</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Somos una empresa especializada en formación tecnológica de alta calidad, 
            enfocada en preparar a los profesionales del futuro con las habilidades más demandadas del mercado.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Contenido principal */}
          <div className="animate-slide-up">
            <h3 className="text-2xl md:text-3xl font-bold text-darkText mb-6">
              Nuestra Misión
            </h3>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Democratizar el acceso a la educación tecnológica de calidad en América Latina, 
              proporcionando formación práctica y actualizada que permita a nuestros estudiantes 
              destacar en el competitivo mercado laboral tecnológico.
            </p>

            <h3 className="text-2xl md:text-3xl font-bold text-darkText mb-6">
              Nuestra Visión
            </h3>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Ser la plataforma educativa líder en América Latina para la formación de 
              profesionales en DevOps, Cloud Computing y tecnologías emergentes, 
              reconocida por la excelencia de nuestros programas y el éxito de nuestros graduados.
            </p>

            {/* Certificaciones y reconocimientos */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h4 className="font-bold text-darkText mb-4 flex items-center">
                <FaAward className="text-accent mr-2" />
                Certificaciones y Alianzas
              </h4>
              <div className="flex flex-wrap gap-3">
                {['AWS Training Partner', 'Microsoft Learning Partner', 'Google Cloud Partner', 'Kubernetes Certified'].map((cert, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="animate-slide-up">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 ${stat.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className={`text-2xl ${stat.color}`} />
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-darkText text-center mb-12">
            Nuestros Valores
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <value.icon className="text-2xl text-white" />
                </div>
                <h4 className="text-xl font-bold text-darkText mb-3">{value.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Listo para transformar tu carrera?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Únete a nuestra comunidad de profesionales exitosos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('learning')}
              className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Ver Nuestros Cursos
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Contactar Ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 