import React, { useState } from 'react';
import { FaCheck, FaClock } from 'react-icons/fa';
import { CURRICULUM } from '../../domain/constants/bootcamp';

const CurriculumSection: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>(CURRICULUM.modules[0].id);

  const activeModuleData = CURRICULUM.modules.find(module => module.id === activeModule);

  return (
    <section id="curriculum" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-darkText mb-6">
            Plan de Estudios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Programa estructurado en módulos especializados para una formación completa
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Module Tabs */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {CURRICULUM.modules.map((module, index) => (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                    activeModule === module.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-lightBg text-darkText hover:bg-primary/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                          activeModule === module.id
                            ? 'bg-white text-primary'
                            : 'bg-primary text-white'
                        }`}>
                          {index + 1}
                        </span>
                        <h3 className="font-bold">{module.title}</h3>
                      </div>
                      <div className="flex items-center ml-11">
                        <FaClock className="text-sm mr-2 opacity-70" />
                        <span className="text-sm opacity-70">{module.duration}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Module Content */}
          <div className="lg:col-span-2">
            {activeModuleData && (
              <div className="bg-lightBg rounded-2xl p-8 animate-fade-in">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">
                      {CURRICULUM.modules.findIndex(m => m.id === activeModule) + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-darkText">{activeModuleData.title}</h3>
                    <p className="text-gray-600 flex items-center">
                      <FaClock className="mr-2" />
                      {activeModuleData.duration}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-darkText mb-4">
                    Temas que cubriremos:
                  </h4>
                  {activeModuleData.topics.map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-start bg-white p-4 rounded-lg shadow-sm animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <FaCheck className="text-white text-xs" />
                      </div>
                      <p className="text-darkText">{topic}</p>
                    </div>
                  ))}
                </div>

                {/* Progress Indicator */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Progreso del programa</span>
                    <span>
                      {CURRICULUM.modules.findIndex(m => m.id === activeModule) + 1} de {CURRICULUM.modules.length} módulos
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${((CURRICULUM.modules.findIndex(m => m.id === activeModule) + 1) / CURRICULUM.modules.length) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <div className="text-center bg-lightBg rounded-xl p-6">
            <div className="text-3xl font-bold text-primary mb-2">5</div>
            <p className="text-gray-600">Módulos especializados</p>
          </div>
          <div className="text-center bg-lightBg rounded-xl p-6">
            <div className="text-3xl font-bold text-secondary mb-2">18</div>
            <p className="text-gray-600">Semanas de duración</p>
          </div>
          <div className="text-center bg-lightBg rounded-xl p-6">
            <div className="text-3xl font-bold text-accent mb-2">24</div>
            <p className="text-gray-600">Horas de formación</p>
          </div>
          <div className="text-center bg-lightBg rounded-xl p-6">
            <div className="text-3xl font-bold text-primary mb-2">10+</div>
            <p className="text-gray-600">Proyectos prácticos</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection; 