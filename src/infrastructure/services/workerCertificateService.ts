import type { Certificate, CertificateVerification } from '../../domain/types/certificate';

class WorkerCertificateService {
  private worker: Worker | null = null;
  private isInitialized = false;
  private requestId = 0;
  private pendingRequests = new Map<number, { resolve: Function; reject: Function }>();

  constructor() {
    this.initializeWorker();
  }

  private initializeWorker() {
    try {
      this.worker = new Worker('/workers/googleSheetsWorker.js');
      
      this.worker.onmessage = (e) => {
        const { type, payload, requestId } = e.data;
        const request = this.pendingRequests.get(requestId);
        
        if (request) {
          this.pendingRequests.delete(requestId);
          
          switch (type) {
            case 'INIT_RESULT':
              this.isInitialized = payload.success;
              request.resolve(payload);
              break;
            case 'VERIFY_RESULT':
            case 'GET_ALL_RESULT':
            case 'RELOAD_RESULT':
              request.resolve(payload);
              break;
            default:
              request.reject(new Error(`Tipo de respuesta desconocido: ${type}`));
          }
        }
      };

      this.worker.onerror = (error) => {
        console.error('Error en Web Worker:', error);
        this.isInitialized = false;
      };

      this.initialize();
    } catch (error) {
      console.error('Error inicializando Web Worker:', error);
    }
  }

  private async sendMessage(type: string, payload?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.worker) {
        reject(new Error('Web Worker no disponible'));
        return;
      }

      const requestId = ++this.requestId;
      this.pendingRequests.set(requestId, { resolve, reject });

      setTimeout(() => {
        if (this.pendingRequests.has(requestId)) {
          this.pendingRequests.delete(requestId);
          reject(new Error('Timeout: La operación tardó demasiado'));
        }
      }, 10000);

      this.worker.postMessage({ type, payload, requestId });
    });
  }

  private async initialize(): Promise<void> {
    try {
      await this.sendMessage('INIT');
    } catch (error) {
      console.error('Error inicializando servicio:', error);
    }
  }

  async verifyCertificate(code: string): Promise<CertificateVerification> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const result = await this.sendMessage('VERIFY_CERTIFICATE', { code });
      return result;
    } catch (error) {
      console.error('Error verificando certificado:', error);
      return {
        isValid: false,
        error: 'Error al verificar el certificado. Inténtalo de nuevo.'
      };
    }
  }

  async getAllCertificates(): Promise<Certificate[]> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const result = await this.sendMessage('GET_ALL_CERTIFICATES');
      return result.success ? result.certificates : [];
    } catch (error) {
      console.error('Error obteniendo certificados:', error);
      return [];
    }
  }

  async reloadData(): Promise<boolean> {
    try {
      const result = await this.sendMessage('RELOAD_DATA');
      return result.success;
    } catch (error) {
      console.error('Error recargando datos:', error);
      return false;
    }
  }

  destroy() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.pendingRequests.clear();
    this.isInitialized = false;
  }
}

export const workerCertificateService = new WorkerCertificateService(); 