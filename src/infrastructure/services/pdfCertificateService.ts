import jsPDF from 'jspdf';
import type { Certificate } from '../../domain/types/certificate';

export class PDFCertificateService {
  // Generar certificado PDF usando imagen base
  async generateCertificatePDF(certificate: Certificate): Promise<void> {
    try {
      // Crear un canvas temporal para dibujar el certificado
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('No se pudo crear el contexto del canvas');
      }

      // Configurar el tamaño del canvas (A4 landscape)
      canvas.width = 1200;
      canvas.height = 850;

      // Cargar la imagen base del certificado
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = '/assets/images/certificates/certificado.jpg';
      });

      // Dibujar la imagen base
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Configurar el texto del nombre del estudiante
      ctx.fillStyle = '#1e3a8a'; // Azul oscuro para mejor contraste
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Nombre del estudiante (posición ajustada para tu plantilla)
      ctx.font = 'bold 52px Arial, sans-serif';
      ctx.fillText(certificate.studentName, canvas.width / 2, canvas.height * 0.42);

      // Curso (posición ajustada)
      ctx.font = 'bold 36px Arial, sans-serif';
      ctx.fillStyle = '#1e40af'; // Azul más oscuro
      ctx.fillText(certificate.courseName, canvas.width / 2, canvas.height * 0.55);

      // Fecha de finalización (posición inferior)
      ctx.font = '22px Arial, sans-serif';
      ctx.fillStyle = '#374151'; // Gris oscuro
      const completionDate = new Date(certificate.completionDate).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      ctx.fillText(`${completionDate}`, canvas.width * 0.82, canvas.height * 0.82);

      // Código de verificación (esquina inferior derecha)
      ctx.font = '16px monospace';
      ctx.fillStyle = '#6b7280'; // Gris
      ctx.textAlign = 'right';
      ctx.fillText(`${certificate.code}`, canvas.width * 0.95, canvas.height * 0.95);

      // Convertir canvas a imagen
      const imageData = canvas.toDataURL('image/jpeg', 0.95);

      // Crear PDF
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Agregar la imagen al PDF
      pdf.addImage(imageData, 'JPEG', 0, 0, 297, 210);

      // Descargar el PDF
      const fileName = `Certificado_${certificate.studentName.replace(/\s+/g, '_')}_${certificate.code}.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('Error generando certificado PDF:', error);
      throw new Error('Error al generar el certificado PDF');
    }
  }

  // Generar vista previa del certificado
  async previewCertificate(certificate: Certificate): Promise<string> {
    try {
      // Crear un canvas temporal para la vista previa
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('No se pudo crear el contexto del canvas');
      }

      // Configurar el tamaño del canvas
      canvas.width = 1200;
      canvas.height = 850;

      // Cargar la imagen base del certificado
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = '/assets/images/certificates/certificado.jpg';
      });

      // Dibujar la imagen base
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Configurar el texto del nombre del estudiante
      ctx.fillStyle = '#1e3a8a'; // Azul oscuro para mejor contraste
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Nombre del estudiante (posición ajustada para tu plantilla)
      ctx.font = 'bold 52px Arial, sans-serif';
      ctx.fillText(certificate.studentName, canvas.width / 2, canvas.height * 0.42);

      // Curso (posición ajustada)
      ctx.font = 'bold 36px Arial, sans-serif';
      ctx.fillStyle = '#1e40af'; // Azul más oscuro
      ctx.fillText(certificate.courseName, canvas.width / 2, canvas.height * 0.55);

      // Fecha de finalización (posición inferior)
      ctx.font = '22px Arial, sans-serif';
      ctx.fillStyle = '#374151'; // Gris oscuro
      const completionDate = new Date(certificate.completionDate).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      ctx.fillText(`${completionDate}`, canvas.width * 0.82, canvas.height * 0.82);

      // Código de verificación (esquina inferior derecha)
      ctx.font = '16px monospace';
      ctx.fillStyle = '#6b7280'; // Gris
      ctx.textAlign = 'right';
      ctx.fillText(`${certificate.code}`, canvas.width * 0.95, canvas.height * 0.95);

      // Retornar la imagen como data URL
      return canvas.toDataURL('image/jpeg', 0.95);

    } catch (error) {
      console.error('Error generando vista previa:', error);
      throw new Error('Error al generar la vista previa del certificado');
    }
  }
}

export const pdfCertificateService = new PDFCertificateService(); 