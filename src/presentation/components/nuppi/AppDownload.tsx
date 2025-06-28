import React from 'react';
import { FaDownload, FaCheckCircle, FaAndroid, FaApple, FaStar, FaUserCheck } from 'react-icons/fa';

interface AppDownloadProps {
  userInfo: any;
}

const AppDownload: React.FC<AppDownloadProps> = ({ userInfo }) => {
  const handleDownloadAPK = () => {
    // Descargar APK real desde la ubicación correcta
    const link = document.createElement('a');
    link.href = '/assets/images/nuppi/nuppi.apk'; // Ruta actualizada donde está el APK
    link.download = 'Nuppi-App.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadIOS = () => {
    // Redireccionar a App Store (cuando esté disponible)
    window.open('https://apps.apple.com/app/nuppi', '_blank');
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-nuppi-blancoGris">
      {/* Confirmación de registro */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-nuppi-verde rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <FaCheckCircle className="text-white text-3xl" />
        </div>
        <h2 className="text-3xl font-bold text-nuppi-azulOscuro mb-2">
          ¡Registro Completado!
        </h2>
        <p className="text-gray-600 mb-4">
          Gracias <span className="font-semibold text-nuppi-verde">{userInfo?.nombre}</span>, 
          tu registro se ha completado exitosamente
        </p>
        <div className="bg-nuppi-turquesaMarino rounded-lg p-4 inline-block">
          <p className="text-nuppi-azulOscuro font-medium">
            ✅ Datos guardados correctamente
          </p>
        </div>
      </div>

      {/* Información de la app */}
      <div className="bg-gradient-to-r from-nuppi-azulOscuro to-nuppi-verde rounded-xl p-6 text-white mb-8">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mr-4 p-2">
            <img 
              src="/assets/images/nuppi/logo_nuppi.png" 
              alt="Nuppi Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Nuppi App</h3>
            <div className="flex items-center">
              <div className="flex text-nuppi-amarilloCrema">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <span className="ml-2 text-sm">4.8 (1,234 reseñas)</span>
            </div>
          </div>
        </div>
        <p className="text-white/90 mb-4">
          La aplicación móvil que estabas esperando. Fácil de usar, rápida y con todas las funcionalidades que necesitas.
        </p>
        <div className="flex items-center text-sm">
          <FaUserCheck className="mr-2" />
          <span>Más de 10,000 usuarios registrados</span>
        </div>
      </div>

      {/* Botones de descarga */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-nuppi-azulOscuro text-center mb-6">
          Descarga la aplicación
        </h3>

        {/* Android APK */}
        <button
          onClick={handleDownloadAPK}
          className="w-full bg-gradient-to-r from-nuppi-verde to-nuppi-turquesaClaro hover:from-nuppi-verde/90 hover:to-nuppi-turquesaClaro/90 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center group"
        >
          <FaAndroid className="text-2xl mr-3 group-hover:animate-bounce" />
          <div className="text-left">
            <div className="text-lg">Descargar para Android</div>
            <div className="text-sm opacity-90">Archivo APK directo (55MB)</div>
          </div>
          <FaDownload className="ml-auto text-xl group-hover:animate-pulse" />
        </button>

        {/* iOS (próximamente o disponible) */}
        <button
          onClick={handleDownloadIOS}
          className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center group"
        >
          <FaApple className="text-2xl mr-3 group-hover:animate-bounce" />
          <div className="text-left">
            <div className="text-lg">Descargar para iOS</div>
            <div className="text-sm opacity-90">Próximamente en App Store</div>
          </div>
          <FaDownload className="ml-auto text-xl group-hover:animate-pulse" />
        </button>
      </div>

      {/* Información adicional */}
      <div className="mt-8 p-6 bg-nuppi-turquesaMarino rounded-lg">
        <h4 className="font-bold text-nuppi-azulOscuro mb-3">Información importante:</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="text-nuppi-verde mr-2">•</span>
            El archivo APK es seguro y está firmado digitalmente
          </li>
          <li className="flex items-start">
            <span className="text-nuppi-verde mr-2">•</span>
            Asegúrate de permitir la instalación de aplicaciones de fuentes desconocidas
          </li>
          <li className="flex items-start">
            <span className="text-nuppi-verde mr-2">•</span>
            Si tienes problemas con la instalación, contacta a soporte
          </li>
          <li className="flex items-start">
            <span className="text-nuppi-verde mr-2">•</span>
            La aplicación es completamente gratuita y sin publicidad
          </li>
        </ul>
      </div>

      {/* Botón para volver al inicio */}
      <div className="text-center mt-8">
        <button
          onClick={() => window.location.reload()}
          className="text-nuppi-azulOscuro hover:text-nuppi-verde font-medium transition-colors duration-300"
        >
          ← Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default AppDownload; 