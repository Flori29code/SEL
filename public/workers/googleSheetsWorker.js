// Web Worker para manejar Google Sheets API
let isInitialized = false;
let sheetsData = [];

// Configuración
const SPREADSHEET_ID = '1epjKFzVHwhSUqeY624U2hEwZRWrMC0J_3R8eQ1krF7w';
const CSV_PUBLIC_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRLzGPIHSmRXPx9Fhxck1j3pgmjY4kOkiMEWaMZsoRn4G1S0kUs2jyGVY9MxhY58i66zPOXbSCsPbRr/pub?output=csv';

// Inicializar Google Sheets
async function initializeGoogleSheets() {
  try {
    console.log('Worker: Inicializando conexión con Google Sheets...');
    await loadSheetsData();
    isInitialized = true;
    console.log('Worker: Google Sheets inicializado correctamente');
    return { success: true };
  } catch (error) {
    console.error('Worker: Error inicializando Google Sheets:', error);
    isInitialized = false;
    return { success: false, error: error.message };
  }
}

// Cargar datos del Google Sheet
async function loadSheetsData() {
  try {
    console.log('Worker: Cargando datos desde Google Sheets...');
    
    const urls = [
      CSV_PUBLIC_URL,
      `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=0`
    ];
    
    for (let i = 0; i < urls.length; i++) {
      const csvUrl = urls[i];
      console.log(`Worker: Intentando URL ${i + 1}...`);
      
      try {
        const response = await fetch(csvUrl, {
          method: 'GET',
          headers: {
            'Accept': 'text/csv, text/plain, */*',
            'Cache-Control': 'no-cache'
          },
          mode: 'cors'
        });
        
        if (response.ok) {
          const csvText = await response.text();
          
          if (csvText && csvText.length > 100 && !csvText.includes('<!DOCTYPE')) {
            const rows = parseCSV(csvText);
            
            if (rows.length >= 2) {
              sheetsData = rows;
              console.log(`Worker: ${sheetsData.length - 1} certificados cargados exitosamente`);
              return { success: true, data: sheetsData };
            }
          }
        }
      } catch (error) {
        console.warn(`Worker: Error con URL ${i + 1}:`, error.message);
      }
    }
    
    throw new Error('No se pudo cargar datos desde Google Sheets');
    
  } catch (error) {
    console.error('Worker: Error cargando datos:', error);
    throw error;
  }
}

// Parsear CSV
function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const result = [];
  
  for (let line of lines) {
    line = line.trim();
    if (line) {
      const row = [];
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

// Convertir fila a certificado
function rowToCertificate(row, index) {
  try {
    if (!row || row.length < 3) return null;

    const [id, code, studentName, studentEmail, courseName, completionDate, issueDate, instructor, status, skills] = row;

    if (!code || !studentName) return null;

    return {
      id: id || String(index + 1),
      code: code.trim(),
      studentName: studentName.trim(),
      studentEmail: studentEmail?.trim() || '',
      courseName: courseName?.trim() || 'BootCamp DevOps con AWS y Azure',
      completionDate: completionDate || '2025-05-10',
      issueDate: issueDate || '2025-05-27',
      instructor: instructor || 'Jose Liza',
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
    console.error('Worker: Error procesando fila:', error);
    return null;
  }
}

// Verificar certificado
function verifyCertificate(code) {
  try {
    const normalizedCode = code.trim().toUpperCase();
    
    if (!normalizedCode) {
      return {
        isValid: false,
        error: 'Por favor ingresa un código de certificado'
      };
    }

    if (sheetsData.length === 0) {
      return {
        isValid: false,
        error: 'No se han cargado los datos de certificados. Inténtalo de nuevo.'
      };
    }

    const certificates = sheetsData
      .slice(1)
      .map((row, index) => rowToCertificate(row, index))
      .filter(cert => cert !== null);

    const certificate = certificates.find(
      cert => cert.code.toUpperCase() === normalizedCode && cert.status === 'active'
    );

    if (!certificate) {
      return {
        isValid: false,
        error: 'Código de certificado no encontrado o inválido'
      };
    }

    return {
      isValid: true,
      certificate
    };
  } catch (error) {
    console.error('Worker: Error verificando certificado:', error);
    return {
      isValid: false,
      error: 'Error al verificar el certificado. Inténtalo de nuevo.'
    };
  }
}

// Manejar mensajes del hilo principal
self.onmessage = async function(e) {
  const { type, payload, requestId } = e.data;

  switch (type) {
    case 'INIT':
      const initResult = await initializeGoogleSheets();
      self.postMessage({ type: 'INIT_RESULT', payload: initResult, requestId });
      break;

    case 'VERIFY_CERTIFICATE':
      if (!isInitialized) {
        self.postMessage({ 
          type: 'VERIFY_RESULT', 
          payload: { 
            isValid: false, 
            error: 'Servicio no inicializado. Inténtalo de nuevo en unos segundos.' 
          },
          requestId 
        });
        return;
      }
      
      const verifyResult = verifyCertificate(payload.code);
      self.postMessage({ type: 'VERIFY_RESULT', payload: verifyResult, requestId });
      break;

    case 'GET_ALL_CERTIFICATES':
      if (!isInitialized) {
        self.postMessage({ 
          type: 'GET_ALL_RESULT', 
          payload: { success: false, error: 'Servicio no inicializado' },
          requestId 
        });
        return;
      }
      
      const certificates = sheetsData
        .slice(1)
        .map((row, index) => rowToCertificate(row, index))
        .filter(cert => cert !== null);
      
      self.postMessage({ 
        type: 'GET_ALL_RESULT', 
        payload: { success: true, certificates },
        requestId 
      });
      break;

    case 'RELOAD_DATA':
      if (isInitialized) {
        try {
          await loadSheetsData();
          self.postMessage({ 
            type: 'RELOAD_RESULT', 
            payload: { success: true, count: sheetsData.length - 1 },
            requestId 
          });
        } catch (error) {
          self.postMessage({ 
            type: 'RELOAD_RESULT', 
            payload: { success: false, error: error.message },
            requestId 
          });
        }
      } else {
        self.postMessage({ 
          type: 'RELOAD_RESULT', 
          payload: { success: false, error: 'Servicio no inicializado' },
          requestId 
        });
      }
      break;

    default:
      console.warn('Worker: Tipo de mensaje desconocido:', type);
  }
}; 