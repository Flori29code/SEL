import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaWhatsapp, FaPaperPlane } from 'react-icons/fa';
import { generateWhatsAppUrl } from '../../infrastructure/config/whatsapp';
import { BOOTCAMP_INFO } from '../../domain/constants/bootcamp';

interface FormData {
  name: string;
  email: string;
  phone: string;
  experience: string;
  country: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    experience: '',
    country: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Crear mensaje para WhatsApp
    const message = `
🎓 *Solicitud de Inscripción - ${BOOTCAMP_INFO.name}*

👤 *Datos Personales:*
• Nombre: ${formData.name}
• Email: ${formData.email}
• Teléfono: ${formData.phone}
• País: ${formData.country}

💼 *Experiencia:*
${formData.experience}

💬 *Mensaje:*
${formData.message}

¡Hola! Estoy interesado(a) en inscribirme al BootCamp DevOps. ¿Podrían proporcionarme más información sobre el proceso de inscripción y pago?
    `.trim();

    // Abrir WhatsApp con el mensaje
    window.open(generateWhatsAppUrl(message), '_blank');

    // Simular envío
    setTimeout(() => {
      setIsSubmitting(false);
      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: '',
        country: '',
        message: ''
      });
    }, 1000);
  };

  const countries = [
    'Perú', 'México', 'Colombia', 'Ecuador', 'Argentina', 'Chile', 
    'Bolivia', 'Venezuela', 'Uruguay', 'Paraguay', 'Costa Rica', 
    'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua', 'Panamá', 'Otro'
  ];

  const experienceLevels = [
    'Sin experiencia en DevOps',
    'Principiante (menos de 1 año)',
    'Intermedio (1-3 años)',
    'Avanzado (3+ años)',
    'Experto (5+ años)'
  ];

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-darkText mb-6">
            ¡Inscríbete Ahora!
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Completa el formulario y nos pondremos en contacto contigo para finalizar tu inscripción
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Información del curso */}
            <div className="animate-slide-up">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">¿Por qué elegir nuestro BootCamp?</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Instructor Experto</h4>
                      <p className="text-white/90 text-sm">Jose Liza con 10+ años de experiencia</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Clases en Vivo</h4>
                      <p className="text-white/90 text-sm">Interacción directa y resolución de dudas</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Proyectos Reales</h4>
                      <p className="text-white/90 text-sm">Experiencia práctica con AWS y Azure</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Certificación</h4>
                      <p className="text-white/90 text-sm">Certificado de finalización reconocido</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-white/10 rounded-lg">
                  <h4 className="font-bold mb-2">📅 Próximo inicio:</h4>
                  <p className="text-lg">{BOOTCAMP_INFO.startDate} - {BOOTCAMP_INFO.schedule}</p>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <form onSubmit={handleSubmit} className="bg-lightBg rounded-2xl p-8 card-shadow">
                <div className="space-y-6">
                  {/* Nombre */}
                  <div>
                    <label className="flex items-center text-darkText font-semibold mb-2">
                      <FaUser className="mr-2 text-primary flex-shrink-0" />
                      <span>Nombre Completo *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center text-darkText font-semibold mb-2">
                      <FaEnvelope className="mr-2 text-primary flex-shrink-0" />
                      <span>Email *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="flex items-center text-darkText font-semibold mb-2">
                      <FaPhone className="mr-2 text-primary flex-shrink-0" />
                      <span>Teléfono *</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="+51 999 999 999"
                    />
                  </div>

                  {/* País */}
                  <div>
                    <label className="flex items-center text-darkText font-semibold mb-2">
                      <span className="mr-2 text-primary flex-shrink-0">🌎</span>
                      <span>País *</span>
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">Selecciona tu país</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  {/* Experiencia */}
                  <div>
                    <label className="flex items-center text-darkText font-semibold mb-2">
                      <FaGraduationCap className="mr-2 text-primary flex-shrink-0" />
                      <span>Nivel de Experiencia *</span>
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">Selecciona tu nivel</option>
                      {experienceLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label className="flex items-center text-darkText font-semibold mb-2">
                      <span className="mr-2 text-primary flex-shrink-0">💬</span>
                      <span>Mensaje (Opcional)</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                      placeholder="Cuéntanos sobre tus objetivos o preguntas específicas..."
                    />
                  </div>
                </div>

                {/* Botón de envío */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 px-6 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                  >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <FaWhatsapp className="mr-3 text-xl" />
                      Enviar por WhatsApp
                      <FaPaperPlane className="ml-3" />
                    </>
                    )}
                  </button>

                  <p className="text-center text-gray-600 text-sm mt-4">
                    Al enviar este formulario, serás redirigido a WhatsApp para completar tu inscripción
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 