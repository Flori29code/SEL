// Configuración de variables de entorno
export const ENV = {
  // Google Sheets
  SPREADSHEET_ID: import.meta.env.VITE_SPREADSHEET_ID || '1epjKFzVHwhSUqeY624U2hEwZRWrMC0J_3R8eQ1krF7w',
  CSV_PUBLIC_URL: import.meta.env.VITE_CSV_PUBLIC_URL || 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRLzGPIHSmRXPx9Fhxck1j3pgmjY4kOkiMEWaMZsoRn4G1S0kUs2jyGVY9MxhY58i66zPOXbSCsPbRr/pub?output=csv',
  
  // Configuración del proyecto
  PROJECT_NAME: 'BootCamp DevOps con AWS y Azure',
  INSTRUCTOR: 'Jose Liza',
  
  // URLs de contacto
  WHATSAPP_NUMBER: '51900707304',
  EMAIL_CONTACT: 'lcrisostomo.ingenieria@gmail.com',
  
  // Configuración de desarrollo
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD
} as const; 