export interface Certificate {
  id: string;
  code: string; // Código único de verificación (ej: "BC-2024-001-ABC123")
  studentName: string;
  studentEmail: string;
  courseName: string;
  completionDate: string;
  issueDate: string;
  instructor: string;
  status: 'active' | 'revoked';
  skills: string[];
}

export interface CertificateVerification {
  isValid: boolean;
  certificate?: Certificate;
  error?: string;
} 