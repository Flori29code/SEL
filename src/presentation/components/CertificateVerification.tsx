import React, { useState } from 'react';
import { FaSearch, FaCertificate, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaUser, FaGraduationCap, FaSpinner, FaDownload, FaEye } from 'react-icons/fa';
import { workerCertificateService } from '../../infrastructure/services/workerCertificateService';
import { pdfCertificateService } from '../../infrastructure/services/pdfCertificateService';
import type { Certificate } from '../../domain/types/certificate';

const CertificateVerification: React.FC = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setCertificate(null);
    setHasSearched(true);

    try {
      const result = await workerCertificateService.verifyCertificate(code);
      
      if (result.isValid && result.certificate) {
        setCertificate(result.certificate);
      } else {
        setError(result.error || 'Certificado no encontrado');
      }
    } catch (err) {
      setError('Error al verificar el certificado. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownloadPDF = async () => {
    if (!certificate) return;
    
    setIsGeneratingPDF(true);
    try {
      await pdfCertificateService.generateCertificatePDF(certificate);
    } catch (error) {
      console.error('Error generando PDF:', error);
      alert('Error al generar el certificado PDF. Inténtalo de nuevo.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePreviewCertificate = async () => {
    if (!certificate) return;
    
    setIsGeneratingPDF(true);
    try {
      const imageData = await pdfCertificateService.previewCertificate(certificate);
      setPreviewImage(imageData);
      setShowPreview(true);
    } catch (error) {
      console.error('Error generando preview:', error);
      alert('Error al generar la vista previa. Inténtalo de nuevo.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <section id="certificate-verification" className="section-padding bg-lightBg">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-darkText mb-6">
            Verificación de Certificados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Verifica la autenticidad de los certificados emitidos por nuestro BootCamp DevOps
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Formulario de búsqueda */}
          <div className="bg-white rounded-2xl p-8 card-shadow mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center text-darkText font-semibold mb-3">
                  <FaCertificate className="mr-2 text-primary flex-shrink-0" />
                  <span>Código de Certificado</span>
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Ej: BC-2024-001-ABC123"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-lg"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !code.trim()}
                    className="bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <FaSpinner className="animate-spin mr-2" />
                    ) : (
                      <FaSearch className="mr-2" />
                    )}
                    {isLoading ? 'Verificando...' : 'Verificar'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Resultados */}
          {hasSearched && (
            <div className="animate-slide-up">
              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                  <FaTimesCircle className="text-red-500 text-4xl mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-red-700 mb-2">Certificado No Encontrado</h3>
                  <p className="text-red-600">{error}</p>
                  <div className="mt-6 p-4 bg-red-100 rounded-lg">
                    <p className="text-sm text-red-700">
                      <strong>Consejos:</strong>
                    </p>
                    <ul className="text-sm text-red-600 mt-2 space-y-1">
                      <li>• Verifica que el código esté escrito correctamente</li>
                      <li>• Asegúrate de incluir todos los guiones y caracteres</li>
                      <li>• El código es sensible a mayúsculas y minúsculas</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Certificado válido */}
              {certificate && (
                <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8">
                  <div className="text-center mb-8">
                    <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-700 mb-2">¡Certificado Válido!</h3>
                    <p className="text-green-600">Este certificado es auténtico y está verificado</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 card-shadow">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Información del estudiante */}
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <FaUser className="text-primary mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-darkText">Estudiante</p>
                            <p className="text-gray-600">{certificate.studentName}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FaGraduationCap className="text-primary mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-darkText">Curso</p>
                            <p className="text-gray-600">{certificate.courseName}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FaUser className="text-primary mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-darkText">Instructor</p>
                            <p className="text-gray-600">{certificate.instructor}</p>
                          </div>
                        </div>
                      </div>

                      {/* Fechas */}
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <FaCalendarAlt className="text-primary mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-darkText">Fecha de Finalización</p>
                            <p className="text-gray-600">{formatDate(certificate.completionDate)}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FaCalendarAlt className="text-primary mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-darkText">Fecha de Emisión</p>
                            <p className="text-gray-600">{formatDate(certificate.issueDate)}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FaCertificate className="text-primary mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-darkText">Código</p>
                            <p className="text-gray-600 font-mono">{certificate.code}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Habilidades adquiridas */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-bold text-darkText mb-4">Habilidades Certificadas</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {certificate.skills.map((skill, index) => (
                          <div key={index} className="flex items-center">
                            <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0 text-sm" />
                            <span className="text-gray-700 text-sm">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="font-bold text-darkText mb-4">Descargar Certificado</h4>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={handlePreviewCertificate}
                          disabled={isGeneratingPDF}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isGeneratingPDF ? (
                            <FaSpinner className="animate-spin mr-2" />
                          ) : (
                            <FaEye className="mr-2" />
                          )}
                          {isGeneratingPDF ? 'Generando...' : 'Vista Previa'}
                        </button>
                        
                        <button
                          onClick={handleDownloadPDF}
                          disabled={isGeneratingPDF}
                          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isGeneratingPDF ? (
                            <FaSpinner className="animate-spin mr-2" />
                          ) : (
                            <FaDownload className="mr-2" />
                          )}
                          {isGeneratingPDF ? 'Generando...' : 'Descargar PDF'}
                        </button>
                      </div>
                      <p className="text-center text-gray-600 text-sm mt-3">
                        El certificado se generará con tu nombre y datos personalizados
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Información adicional */}
          <div className="mt-12 bg-white rounded-2xl p-8 card-shadow">
            <h3 className="text-xl font-bold text-darkText mb-4">¿Cómo funciona la verificación?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Ingresa el Código</h4>
                <p className="text-gray-600 text-sm">Introduce el código único que aparece en tu certificado</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Verificación Automática</h4>
                <p className="text-gray-600 text-sm">Nuestro sistema verifica la autenticidad del certificado</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Resultado Inmediato</h4>
                <p className="text-gray-600 text-sm">Obtén la confirmación y detalles del certificado al instante</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de vista previa */}
        {showPreview && previewImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-6xl max-h-[90vh] overflow-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-darkText">Vista Previa del Certificado</h3>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="text-center">
                  <img 
                    src={previewImage} 
                    alt="Vista previa del certificado"
                    className="max-w-full h-auto border border-gray-200 rounded-lg shadow-lg"
                  />
                  
                  <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleDownloadPDF}
                      disabled={isGeneratingPDF}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                    >
                      {isGeneratingPDF ? (
                        <FaSpinner className="animate-spin mr-2" />
                      ) : (
                        <FaDownload className="mr-2" />
                      )}
                      {isGeneratingPDF ? 'Generando PDF...' : 'Descargar PDF'}
                    </button>
                    
                    <button
                      onClick={() => setShowPreview(false)}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificateVerification; 