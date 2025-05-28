# 🚀 Script de Despliegue para Hostinger - BootCamp DevOps (Windows PowerShell)
# Autor: Asistente IA
# Fecha: $(Get-Date)

Write-Host "🚀 Iniciando despliegue a Hostinger..." -ForegroundColor Blue

# Función para mostrar mensajes con colores
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "package.json")) {
    Write-Error "No se encontró package.json. Asegúrate de estar en el directorio raíz del proyecto."
    exit 1
}

Write-Status "Verificando dependencias..."

# Verificar que Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Success "Node.js está disponible: $nodeVersion"
} catch {
    Write-Error "Node.js no está instalado. Por favor instala Node.js primero."
    exit 1
}

# Verificar que npm está instalado
try {
    $npmVersion = npm --version
    Write-Success "npm está disponible: $npmVersion"
} catch {
    Write-Error "npm no está instalado. Por favor instala npm primero."
    exit 1
}

# Limpiar build anterior
Write-Status "Limpiando build anterior..."
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Success "Directorio dist eliminado"
}

# Instalar dependencias
Write-Status "Instalando dependencias..."
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Error "Error al instalar dependencias"
    exit 1
}
Write-Success "Dependencias instaladas correctamente"

# Ejecutar linting
Write-Status "Ejecutando linting..."
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Warning "Hay warnings en el linting, pero continuamos..."
}

# Crear build de producción
Write-Status "Creando build de producción..."
npm run build:hostinger
if ($LASTEXITCODE -ne 0) {
    Write-Error "Error al crear el build"
    exit 1
}
Write-Success "Build creado exitosamente"

# Verificar que el build se creó correctamente
if (-not (Test-Path "dist")) {
    Write-Error "El directorio dist no se creó"
    exit 1
}

if (-not (Test-Path "dist/index.html")) {
    Write-Error "El archivo index.html no se encontró en dist/"
    exit 1
}

if (-not (Test-Path "dist/.htaccess")) {
    Write-Error "El archivo .htaccess no se copió a dist/"
    exit 1
}

Write-Success "Verificación del build completada"

# Mostrar información del build
Write-Status "Información del build:"
Write-Host "📁 Directorio: $(Get-Location)\dist"
Write-Host "📄 Archivos principales:"
Get-ChildItem "dist" -File | Where-Object { $_.Extension -match '\.(html|js|css)$' } | Select-Object Name, Length | Format-Table

# Mostrar tamaño del build
$buildSize = (Get-ChildItem "dist" -Recurse | Measure-Object -Property Length -Sum).Sum
$buildSizeMB = [math]::Round($buildSize / 1MB, 2)
Write-Status "Tamaño total del build: $buildSizeMB MB"

# Instrucciones para subir a Hostinger
Write-Host ""
Write-Host "🎯 SIGUIENTE PASO: Subir archivos a Hostinger" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "Opción 1 - Panel de Control de Hostinger:"
Write-Host "1. Accede al panel de Hostinger"
Write-Host "2. Ve a 'Administrador de archivos'"
Write-Host "3. Navega a public_html/"
Write-Host "4. Sube TODO el contenido de la carpeta dist/"
Write-Host ""
Write-Host "Opción 2 - FTP/SFTP:"
Write-Host "1. Conecta tu cliente FTP a tu servidor"
Write-Host "2. Navega a public_html/"
Write-Host "3. Sube TODO el contenido de la carpeta dist/"
Write-Host ""
Write-Host "Opción 3 - WinSCP o FileZilla:"
Write-Host "1. Configura la conexión SFTP/FTP"
Write-Host "2. Conecta al servidor de Hostinger"
Write-Host "3. Navega a public_html/"
Write-Host "4. Arrastra y suelta el contenido de dist/"
Write-Host ""

# Verificaciones post-despliegue
Write-Host "✅ CHECKLIST POST-DESPLIEGUE:" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host "[ ] Archivos subidos a public_html/"
Write-Host "[ ] DNS configurado correctamente"
Write-Host "[ ] SSL activado en Hostinger"
Write-Host "[ ] Sitio carga correctamente"
Write-Host "[ ] Todas las rutas funcionan"
Write-Host "[ ] Formularios de contacto operativos"
Write-Host "[ ] Enlaces de WhatsApp funcionan"
Write-Host ""

Write-Success "¡Despliegue preparado exitosamente!"
Write-Status "El contenido de la carpeta 'dist/' está listo para subir a Hostinger"

# Abrir el directorio dist en el explorador de Windows
Start-Process explorer.exe -ArgumentList "dist"

Write-Host ""
Write-Status "Script completado. ¡Buena suerte con tu migración! 🚀"

# Pausa para que el usuario pueda leer los mensajes
Write-Host ""
Write-Host "Presiona cualquier tecla para continuar..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 