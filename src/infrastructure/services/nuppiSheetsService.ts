import { NUPPI_CONFIG } from '../config/nuppiConfig';

interface NuppiUserData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  ciudad: string;
  pais: string;
  empresa?: string;
  cargo?: string;
}

interface NuppiSheetsResponse {
  success: boolean;
  message: string;
  error?: string;
}

export class NuppiSheetsService {
  private readonly SHEET_ID = NUPPI_CONFIG.GOOGLE_SHEETS.SHEET_ID;
  
  // URL del Google Form creado por el usuario
  private readonly FORM_ID = '1FAIpQLSeYzSBnTn-roqhGkZZZz2LopSG-ts4oWHlE-5u7zZ_7J3v4LQ';
  private readonly FORM_URL = `https://docs.google.com/forms/d/e/${this.FORM_ID}/formResponse`;
  
  // URL CSV para leer datos (mismo enfoque que certificados)
  private readonly CSV_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vT9-rM849ePOqq84r-c6XDKsp4vxRSEw0a8APSNVOHaHVj8FJiks-8zTAlCVrQ64nflLBPishJrGQQG/pub?output=csv`;

  /**
   * Guarda los datos del usuario usando Google Forms (sin autenticación)
   * @param userData Datos del formulario de registro
   * @returns Respuesta del servicio con éxito/error
   */
  async saveUserData(userData: NuppiUserData): Promise<NuppiSheetsResponse> {
    try {
      // Verificar duplicados de email antes de agregar
      const emailExists = await this.checkEmailExists(userData.email);
      if (emailExists) {
        return {
          success: false,
          message: 'Este email ya está registrado en Nuppi',
          error: 'EMAIL_DUPLICADO'
        };
      }

      // Crear FormData para enviar al Google Form
      const formData = new FormData();
      
      // Mapear campos a entries REALES del Google Form (funcionan correctamente)
      formData.append('entry.98071905', userData.nombre);       // Nombre
      formData.append('entry.795991792', userData.apellido);    // Apellido  
      formData.append('entry.2036544412', userData.email);      // Email
      formData.append('entry.642358799', userData.telefono);    // Teléfono
      formData.append('entry.1559223027', userData.ciudad);     // Ciudad
      formData.append('entry.1162782197', userData.pais);       // País
      formData.append('entry.261773568', userData.empresa || ''); // Empresa
      formData.append('entry.1136133427', userData.cargo || '');  // Cargo

      // Enviar datos al Google Form
      const response = await fetch(this.FORM_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Importante para Google Forms
      });

      // Google Forms siempre devuelve opaque response en no-cors
      // Asumimos éxito si no hay error
      console.log(`✅ Usuario enviado a Google Form: ${userData.email}`);
      
      return {
        success: true,
        message: 'Usuario registrado exitosamente en Nuppi'
      };

    } catch (error) {
      console.error('❌ Error enviando datos a Google Form:', error);
      return {
        success: false,
        message: 'Error al registrar usuario',
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  /**
   * Verifica si un email ya está registrado leyendo el CSV público
   * (Mismo enfoque que el servicio de certificados)
   * @param email Email a verificar
   * @returns true si el email ya existe, false si no
   */
  async checkEmailExists(email: string): Promise<boolean> {
    try {
      console.log(`🔍 Verificando email: ${email}`);
      
      // Leer datos del Google Sheet CSV (mismo enfoque que certificados)
      const response = await fetch(this.CSV_URL, {
        method: 'GET',
        headers: {
          'Accept': 'text/csv, text/plain, */*',
          'Cache-Control': 'no-cache'
        },
        mode: 'cors'
      });
      
      if (!response.ok) {
        console.warn('⚠️ Error verificando email, permitiendo registro');
        return false;
      }
      
      const csvText = await response.text();
      const rows = this.parseCSV(csvText);
      
      if (rows.length <= 1) {
        console.log('📧 Google Sheet vacío, email disponible');
        return false; // Solo headers o vacío
      }
      
      // Buscar en la columna Email (índice 3: Marca temporal[0], Nombre[1], Apellido[2], Email[3])
      const emailExists = rows.slice(1).some(row => 
        row[3] && row[3].toLowerCase().trim() === email.toLowerCase().trim()
      );
      
      console.log(`📧 Email ${email} ${emailExists ? 'YA EXISTE' : 'está disponible'}`);
      return emailExists;

    } catch (error) {
      console.error('⚠️ Error verificando email duplicado:', error);
      return false; // En caso de error, permitir continuar
    }
  }

  /**
   * Parsea texto CSV en array de arrays (mismo método que certificados)
   * @param csvText Texto CSV
   * @returns Array de filas
   */
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

  /**
   * Genera un ID único para el usuario con formato NUPPI-YYYYMMDD-XXXXX
   * @returns ID único generado
   */
  generateUserId(): string {
    const date = new Date();
    const dateStr = date.getFullYear().toString() + 
                   (date.getMonth() + 1).toString().padStart(2, '0') + 
                   date.getDate().toString().padStart(2, '0');
    
    const randomNum = Math.floor(Math.random() * 99999).toString().padStart(5, '0');
    
    return `NUPPI-${dateStr}-${randomNum}`;
  }

  /**
   * Obtiene la IP pública del usuario
   * @returns IP address o 'N/A' si hay error
   */
  async getUserIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip || 'N/A';
    } catch (error) {
      console.error('⚠️ Error obteniendo IP:', error);
      return 'N/A';
    }
  }
}

export const nuppiSheetsService = new NuppiSheetsService(); 