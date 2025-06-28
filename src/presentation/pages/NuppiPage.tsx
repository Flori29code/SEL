import React, { useState } from 'react';
import NuppiLayout from '../layout/NuppiLayout';
import NuppiForm from '../components/nuppi/NuppiForm';
import AppDownload from '../components/nuppi/AppDownload';

const NuppiPage: React.FC = () => {
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const handleFormSuccess = (formData: any) => {
    setUserData(formData);
    setIsFormComplete(true);
  };

  return (
    <NuppiLayout>
      <div className="min-h-screen bg-gradient-to-br from-nuppi-azulOscuro via-nuppi-turquesaMarino to-nuppi-verde relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-nuppi-amarilloCrema/20 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-nuppi-turquesaClaro/30 rounded-full animate-float-delay"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-nuppi-verde/40 rounded-full animate-float"></div>
          <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-nuppi-amarilloCrema/20 rounded-full animate-float-delay"></div>
        </div>

        <div className="container-custom py-16 relative z-10">
          <div className="max-w-2xl mx-auto">
            {!isFormComplete ? (
              <>
                {/* Hero Section */}
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                    Bienvenido a{' '}
                    <span className="text-nuppi-amarilloCrema">Nuppi</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                    La aplicación móvil que transformará tu experiencia digital
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
                    <span className="bg-white/20 text-white px-4 py-2 rounded-full">
                      ✨ Interfaz intuitiva
                    </span>
                    <span className="bg-white/20 text-white px-4 py-2 rounded-full">
                      🚀 Descarga gratuita
                    </span>
                    <span className="bg-white/20 text-white px-4 py-2 rounded-full">
                      🔒 100% segura
                    </span>
                  </div>
                </div>

                {/* Form */}
                <div id="registro">
                  <NuppiForm onSuccess={handleFormSuccess} />
                </div>
              </>
            ) : (
              <>
                {/* Success Section */}
                <div id="descarga">
                  <AppDownload userInfo={userData} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </NuppiLayout>
  );
};

export default NuppiPage; 