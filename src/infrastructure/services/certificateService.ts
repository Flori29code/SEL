import type { Certificate, CertificateVerification } from '../../domain/types/certificate';

class CertificateService {
  async verifyCertificate(code: string): Promise<CertificateVerification> {
    try {
      const normalizedCode = code.trim().toUpperCase();
      
      if (!normalizedCode) {
        return {
          isValid: false,
          error: 'Por favor ingresa un código de certificado'
        };
      }

      return {
        isValid: false,
        error: 'Servicio no disponible. Usa el sistema principal de verificación.'
      };
    } catch (error) {
      console.error('Error verificando certificado:', error);
      return {
        isValid: false,
        error: 'Error al verificar el certificado. Inténtalo de nuevo.'
      };
    }
  }

  generateCertificateCode(): string {
    const year = new Date().getFullYear();
    const sequence = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    return `BC-${year}-${sequence}-${random}`;
  }

  async getAllCertificates(): Promise<Certificate[]> {
    return [];
  }
}

export const certificateService = new CertificateService(); 