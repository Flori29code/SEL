import React from 'react';
import { 
  FaAws, 
  FaDocker,
  FaGitAlt,
  FaCloud,
  FaPython
} from 'react-icons/fa';
import { 
  SiTerraform, 
  SiKubernetes, 
  SiPrometheus, 
  SiGrafana,
  SiJenkins,
  SiAnsible
} from 'react-icons/si';
import { LEARNING_TOPICS } from '../../domain/constants/bootcamp';

const LearningSection: React.FC = () => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    FaJenkins: SiJenkins,
    SiTerraform: SiTerraform,
    FaDocker: FaDocker,
    SiKubernetes: SiKubernetes,
    FaAws: FaAws,
    SiMicrosoftazure: FaCloud,
    SiPrometheus: SiPrometheus,
    SiGrafana: SiGrafana,
    FaGitAlt: FaGitAlt,
    SiAnsible: SiAnsible,
    FaPython: FaPython
  };

  const additionalTopics = [
    {
      icon: "FaGitAlt",
      title: "Git & GitHub",
      description: "Control de versiones"
    },
    {
      icon: "SiAnsible",
      title: "Ansible",
      description: "Automatización de configuración"
    }
  ];

  const allTopics = [...LEARNING_TOPICS, ...additionalTopics];

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || FaGitAlt;
    return <IconComponent className="text-4xl text-secondary group-hover:text-accent transition-colors duration-300" />;
  };

  return (
    <section id="learning" className="section-padding bg-lightBg">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-darkText mb-6">
            ¿Qué aprenderás?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Domina las herramientas y tecnologías más demandadas en el ecosistema DevOps
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {allTopics.map((topic, index) => (
            <div
              key={topic.title}
              className="group bg-white rounded-xl p-6 card-shadow hover:scale-105 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  {getIcon(topic.icon)}
                </div>
                <h3 className="font-bold text-darkText mb-2 group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {topic.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-2xl p-8 card-shadow">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">18</span>
              </div>
              <h3 className="font-bold text-darkText mb-2">Semanas de formación</h3>
              <p className="text-gray-600">Programa intensivo y completo</p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-secondary">10+</span>
              </div>
              <h3 className="font-bold text-darkText mb-2">Tecnologías</h3>
              <p className="text-gray-600">Herramientas del ecosistema DevOps</p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">100%</span>
              </div>
              <h3 className="font-bold text-darkText mb-2">Práctico</h3>
              <p className="text-gray-600">Proyectos reales y hands-on</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningSection; 