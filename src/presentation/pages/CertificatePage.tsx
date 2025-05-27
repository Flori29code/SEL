import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaUser, FaGraduationCap, FaSpinner, FaDownload, FaEye, FaHome, FaShare } from 'react-icons/fa';
import { workerCertificateService } from '../../infrastructure/services/workerCertificateService';
import { pdfCertificateService } from '../../infrastructure/services/pdfCertificateService';
import type { Certificate } from '../../domain/types/certificate';
import Logo from '../components/Logo';

const CertificatePage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (code) {
      verifyCertificate(code);
    }
  }, [code]);

  const verifyCertificate = async (certificateCode: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await workerCertificateService.verifyCertificate(certificateCode);
      
      if (result.isValid && result.certificate) {
        setCertificate(result.certificate);
        // Actualizar el título de la página
        document.title = `Certificado de ${result.certificate.studentName} - BootCamp DevOps`;
      } else {
        setError(result.error || 'Certificado no encontrado');
        document.title = 'Certificado no encontrado - BootCamp DevOps';
      }
    } catch (err) {
      setError('Error al verificar el certificado. Inténtalo de nuevo.');
      document.title = 'Error - BootCamp DevOps';
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

  const shareUrl = window.location.href;
  const shareText = certificate 
    ? `¡Mira mi certificado del BootCamp DevOps con AWS y Azure! 🎓`
    : 'Verificación de Certificado - BootCamp DevOps';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareText,
          url: shareUrl
        });
      } catch (error) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('¡Enlace copiado al portapapeles!');
    }).catch(() => {
      alert(`Enlace: ${shareUrl}`);
    });
  };

  return (
    <div className="min-h-screen bg-lightBg">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <Logo variant="dark" size="md" />
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary hover:text-white rounded-lg transition-all"
              >
                <FaShare />
                <span className="hidden sm:inline">Compartir</span>
              </button>
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-all"
              >
                <FaHome />
                <span className="hidden sm:inline">Inicio</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-darkText mb-4">
              Verificación de Certificado
            </h1>
            <p className="text-xl text-gray-600">
              Código: <span className="font-mono font-bold text-primary">{code}</span>
            </p>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="bg-white rounded-2xl p-12 card-shadow text-center">
              <FaSpinner className="animate-spin text-primary text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-darkText mb-2">Verificando certificado...</h3>
              <p className="text-gray-600">Por favor espera un momento</p>
            </div>
          )}

          {/* Error */}
          {error && !isLoading && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <FaTimesCircle className="text-red-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-700 mb-2">Certificado No Encontrado</h3>
              <p className="text-red-600 mb-6">{error}</p>
              <div className="mt-6 p-4 bg-red-100 rounded-lg">
                <p className="text-sm text-red-700 mb-2">
                  <strong>Consejos:</strong>
                </p>
                <ul className="text-sm text-red-600 space-y-1">
                  <li>• Verifica que el código esté escrito correctamente</li>
                  <li>• Asegúrate de incluir todos los guiones y caracteres</li>
                  <li>• El código es sensible a mayúsculas y minúsculas</li>
                </ul>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-all"
              >
                <FaHome />
                Volver al inicio
              </Link>
            </div>
          )}

          {/* Certificado válido */}
          {certificate && !isLoading && (
            <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8">
              <div className="text-center mb-8">
                <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-700 mb-2">¡Certificado Válido!</h3>
                <p className="text-green-600">Este certificado es auténtico y está verificado</p>
              </div>

              <div className="bg-white rounded-xl p-6 card-shadow mb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Información del estudiante */}
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FaUser className="text-primary mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-darkText">Estudiante</p>
                        <p className="text-gray-600 text-lg">{certificate.studentName}</p>
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
                      <FaGraduationCap className="text-primary mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-darkText">Código</p>
                        <p className="text-gray-600 font-mono">{certificate.code}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Habilidades */}
                {certificate.skills && certificate.skills.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-darkText mb-3">Habilidades Certificadas</h4>
                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Acciones */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handlePreviewCertificate}
                  disabled={isGeneratingPDF}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {isGeneratingPDF ? <FaSpinner className="animate-spin" /> : <FaEye />}
                  Vista Previa
                </button>
                
                <button
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all disabled:opacity-50"
                >
                  {isGeneratingPDF ? <FaSpinner className="animate-spin" /> : <FaDownload />}
                  Descargar PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal de vista previa */}
      {showPreview && previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold">Vista Previa del Certificado</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <img
                src={previewImage}
                alt="Vista previa del certificado"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatePage; 