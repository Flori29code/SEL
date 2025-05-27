import type { Certificate } from '../../domain/types/certificate';
import { ENV } from '../config/environment';

class GoogleSheetsService {
  private isInitialized = false;

  async initialize(): Promise<boolean> {
    try {
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Error inicializando Google Sheets:', error);
      this.isInitialized = false;
      return false;
    }
  }

  async getCertificates(): Promise<Certificate[]> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const response = await fetch(ENV.CSV_PUBLIC_URL, {
        method: 'GET',
        headers: {
          'Accept': 'text/csv, text/plain, */*',
          'Cache-Control': 'no-cache'
        },
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const csvText = await response.text();
      
      if (!csvText || csvText.length < 100) {
        throw new Error('Datos CSV vacíos o inválidos');
      }

      const rows = this.parseCSV(csvText);
      
      if (rows.length < 2) {
        throw new Error('No se encontraron datos válidos');
      }

      const certificates = rows
        .slice(1)
        .map((row, index) => this.rowToCertificate(row, index))
        .filter(cert => cert !== null) as Certificate[];

      return certificates;
    } catch (error) {
      console.error('Error obteniendo certificados:', error);
      return [];
    }
  }

  private parseCSV(csvText: string): string[][] {
    const lines = csvText.split('\n');
    const result: string[][] = [];
    
    for (let line of lines) {
      line = line.trim();
      if (line) {
        const row: string[] = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            row.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        
        row.push(current.trim());
        const cleanRow = row.map(cell => cell.replace(/^"|"$/g, ''));
        result.push(cleanRow);
      }
    }
    
    return result;
  }

  private rowToCertificate(row: string[], index: number): Certificate | null {
    try {
      if (!row || row.length < 3) return null;

      const [id, code, studentName, studentEmail, courseName, completionDate, issueDate, instructor, status, skills] = row;

      if (!code || !studentName) return null;

      return {
        id: id || String(index + 1),
        code: code.trim(),
        studentName: studentName.trim(),
        studentEmail: studentEmail?.trim() || '',
        courseName: courseName?.trim() || ENV.PROJECT_NAME,
        completionDate: completionDate || new Date().toISOString().split('T')[0],
        issueDate: issueDate || new Date().toISOString().split('T')[0],
        instructor: instructor || ENV.INSTRUCTOR,
        status: (status?.toLowerCase() === 'active' || !status) ? 'active' : 'active',
        skills: skills ? skills.split(',').map(s => s.trim()) : [
          'AWS Cloud Services',
          'Azure Cloud Platform',
          'Docker & Containerization',
          'Kubernetes Orchestration',
          'CI/CD Pipelines',
          'Infrastructure as Code (Terraform)',
          'Configuration Management (Ansible)',
          'Monitoring & Observability'
        ]
      };
    } catch (error) {
      console.error('Error procesando fila:', error);
      return null;
    }
  }

  async verifyCertificate(code: string): Promise<Certificate | null> {
    const certificates = await this.getCertificates();
    const normalizedCode = code.trim().toUpperCase();
    
    return certificates.find(
      cert => cert.code.toUpperCase() === normalizedCode && cert.status === 'active'
    ) || null;
  }
}

export const googleSheetsService = new GoogleSheetsService(); 