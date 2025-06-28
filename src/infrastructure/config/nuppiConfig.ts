// import { ENV } from './environment'; // No se usa actualmente

// Configuración específica para Nuppi
export const NUPPI_CONFIG = {
  // Configuración de Google Forms (para envío de datos)
  GOOGLE_FORMS: {
    // URL del Google Form de Nuppi
    FORM_URL: 'https://docs.google.com/forms/d/e/1FAIpQLSeYzSBnTn-roqhGkZZZz2LopSG-ts4oWHlE-5u7zZ_7J3v4LQ/formResponse',
    
    // Entry IDs REALES extraídos del formulario funcional
    ENTRY_IDS: {
      NOMBRE: 'entry.98071905',
      APELLIDO: 'entry.795991792', 
      EMAIL: 'entry.2036544412',
      TELEFONO: 'entry.642358799',
      CIUDAD: 'entry.1559223027',
      PAIS: 'entry.1162782197',
      EMPRESA: 'entry.261773568',
      CARGO: 'entry.1136133427'
    }
  },

  // Configuración de Google Sheets (para lectura de datos)
  GOOGLE_SHEETS: {
    // ID real del Google Sheet de Nuppi proporcionado por el usuario
    SHEET_ID: '1lXPSI5o3PcL4qcNM1GD-0VnAh_OdKW69I0YSymnh4V0', 
    
    RANGE: 'Hoja1!A:K'           // Rango de celdas (A-K para las 11 columnas)
  },
  
  // Estructura confirmada de columnas en tu Google Sheet:
  EXCEL_COLUMNS: {
    A: 'ID',              // NUPPI-YYYYMMDD-XXXXX (generado automáticamente)
    B: 'Fecha_Registro',  // Fecha y hora completa
    C: 'Nombre',          // Nombre del usuario
    D: 'Apellido',        // Apellido del usuario
    E: 'Email',           // Email (validado)
    F: 'Telefono',        // Teléfono
    G: 'Ciudad',          // Ciudad
    H: 'Pais',            // País
    I: 'Empresa',         // Empresa (opcional)
    J: 'Cargo',           // Cargo (opcional)
    K: 'IP_Address'       // IP del usuario (automática)
  }
};

// Headers confirmados en tu Google Sheet
export const NUPPI_SHEET_HEADERS = [
  'ID',
  'Fecha_Registro', 
  'Nombre',
  'Apellido',
  'Email',
  'Telefono',
  'Ciudad',
  'Pais',
  'Empresa',
  'Cargo',
  'IP_Address'
]; 