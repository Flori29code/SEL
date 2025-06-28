import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaBuilding, FaBriefcase } from 'react-icons/fa';
import { nuppiSheetsService } from '../../../infrastructure/services/nuppiSheetsService';

interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  ciudad: string;
  pais: string;
  empresa: string;
  cargo: string;
}

interface NuppiFormProps {
  onSuccess: (userData: FormData) => void;
}

const NuppiForm: React.FC<NuppiFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    ciudad: '',
    pais: '',
    empresa: '',
    cargo: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Campos requeridos
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^[+]?[\d\s-()]{8,}$/.test(formData.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = 'El teléfono no es válido';
    }

    if (!formData.ciudad.trim()) {
      newErrors.ciudad = 'La ciudad es requerida';
    }

    if (!formData.pais.trim()) {
      newErrors.pais = 'El país es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Verificar si el email ya existe (opcional)
      const emailExists = await nuppiSheetsService.checkEmailExists(formData.email);
      
      if (emailExists) {
        setErrors({ email: 'Este email ya está registrado' });
        setSubmitMessage('❌ Email ya registrado anteriormente');
        setIsSubmitting(false);
        return;
      }

      // Guardar datos en Google Sheets
      const result = await nuppiSheetsService.saveUserData(formData);

      if (result.success) {
        setSubmitMessage('✅ ' + result.message);
        // Llamar callback de éxito
        setTimeout(() => {
          onSuccess(formData);
        }, 1000);
      } else {
        setSubmitMessage('❌ ' + result.message);
        console.error('Error del servicio:', result.error);
      }

    } catch (error) {
      console.error('Error en submit:', error);
      setSubmitMessage('❌ Error inesperado. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-nuppi-blancoGris">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 p-3 bg-white rounded-full shadow-lg">
          <img 
            src="/assets/images/nuppi/logo_nuppi.png" 
            alt="Nuppi Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-3xl font-bold text-nuppi-azulOscuro mb-2">
          Únete a Nuppi
        </h2>
        <p className="text-gray-600">
          Completa el formulario para acceder a la descarga de la aplicación
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Fila 1: Nombre y Apellido */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaUser className="inline mr-2 text-nuppi-verde" />
              Nombre *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-nuppi-verde focus:border-transparent transition-all duration-300 ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaUser className="inline mr-2 text-nuppi-verde" />
              Apellido *
            </label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Tu apellido"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-nuppi-verde focus:border-transparent transition-all duration-300 ${errors.apellido ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.apellido && <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>}
          </div>
        </div>

        {/* Fila 2: Email y Teléfono */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaEnvelope className="inline mr-2 text-nuppi-verde" />
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-nuppi-verde focus:border-transparent transition-all duration-300 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaPhone className="inline mr-2 text-nuppi-verde" />
              Teléfono *
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="+51 123 456 789"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-nuppi-verde focus:border-transparent transition-all duration-300 ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
          </div>
        </div>

        {/* Fila 3: Ciudad y País */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaMapMarkerAlt className="inline mr-2 text-nuppi-verde" />
              Ciudad *
            </label>
            <input
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              placeholder="Tu ciudad"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-nuppi-verde focus:border-transparent transition-all duration-300 ${errors.ciudad ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.ciudad && <p className="text-red-500 text-sm mt-1">{errors.ciudad}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaGlobe className="inline mr-2 text-nuppi-verde" />
              País *
            </label>
            <select
              name="pais"
              value={formData.pais}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-nuppi-verde focus:border-transparent transition-all duration-300 ${errors.pais ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Selecciona tu país</option>
              <option value="Peru">Perú</option>
              <option value="Colombia">Colombia</option>
              <option value="Mexico">México</option>
              <option value="Argentina">Argentina</option>
              <option value="Chile">Chile</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Venezuela">Venezuela</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Panama">Panamá</option>
              <option value="Honduras">Honduras</option>
              <option value="Nicaragua">Nicaragua</option>
              <option value="El Salvador">El Salvador</option>
              <option value="Otro">Otro</option>
            </select>
            {errors.pais && <p className="text-red-500 text-sm mt-1">{errors.pais}</p>}
          </div>
        </div>

        {/* Fila 4: Empresa y Cargo (Opcionales) */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaBuilding className="inline mr-2 text-nuppi-verde" />
              Empresa <span className="text-gray-400">(opcional)</span>
            </label>
            <input
              type="text"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              placeholder="Nombre de tu empresa"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nuppi-verde focus:border-transparent transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaBriefcase className="inline mr-2 text-nuppi-verde" />
              Cargo <span className="text-gray-400">(opcional)</span>
            </label>
            <input
              type="text"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              placeholder="Tu cargo o posición"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nuppi-verde focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        {/* Mensaje de envío */}
        {submitMessage && (
          <div className={`p-4 rounded-lg text-center font-medium ${submitMessage.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {submitMessage}
          </div>
        )}

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 ${isSubmitting 
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
            : 'bg-gradient-to-r from-nuppi-verde to-nuppi-turquesaClaro text-white hover:from-nuppi-verde/90 hover:to-nuppi-turquesaClaro/90 shadow-lg hover:shadow-xl'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Registrando...
            </div>
          ) : (
            '🚀 Registrarme y Descargar App'
          )}
        </button>

        {/* Nota de privacidad */}
        <p className="text-xs text-gray-500 text-center">
          Al registrarte, aceptas que tus datos sean utilizados únicamente para proporcionarte acceso a la aplicación Nuppi. 
          No compartimos tu información con terceros.
        </p>
      </form>
    </div>
  );
};

export default NuppiForm; 