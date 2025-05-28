#!/bin/bash

# 🚀 Script de Despliegue para Hostinger - BootCamp DevOps
# Autor: Asistente IA
# Fecha: $(date)

echo "🚀 Iniciando despliegue a Hostinger..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar mensajes
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "No se encontró package.json. Asegúrate de estar en el directorio raíz del proyecto."
    exit 1
fi

print_status "Verificando dependencias..."

# Verificar que Node.js está instalado
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado. Por favor instala Node.js primero."
    exit 1
fi

# Verificar que npm está instalado
if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado. Por favor instala npm primero."
    exit 1
fi

print_success "Node.js y npm están disponibles"

# Limpiar build anterior
print_status "Limpiando build anterior..."
if [ -d "dist" ]; then
    rm -rf dist
    print_success "Directorio dist eliminado"
fi

# Instalar dependencias
print_status "Instalando dependencias..."
npm install
if [ $? -ne 0 ]; then
    print_error "Error al instalar dependencias"
    exit 1
fi
print_success "Dependencias instaladas correctamente"

# Ejecutar linting
print_status "Ejecutando linting..."
npm run lint
if [ $? -ne 0 ]; then
    print_warning "Hay warnings en el linting, pero continuamos..."
fi

# Crear build de producción
print_status "Creando build de producción..."
npm run build:hostinger
if [ $? -ne 0 ]; then
    print_error "Error al crear el build"
    exit 1
fi
print_success "Build creado exitosamente"

# Verificar que el build se creó correctamente
if [ ! -d "dist" ]; then
    print_error "El directorio dist no se creó"
    exit 1
fi

if [ ! -f "dist/index.html" ]; then
    print_error "El archivo index.html no se encontró en dist/"
    exit 1
fi

if [ ! -f "dist/.htaccess" ]; then
    print_error "El archivo .htaccess no se copió a dist/"
    exit 1
fi

print_success "Verificación del build completada"

# Mostrar información del build
print_status "Información del build:"
echo "📁 Directorio: $(pwd)/dist"
echo "📄 Archivos principales:"
ls -la dist/ | grep -E "\.(html|js|css)$" | head -10

# Mostrar tamaño del build
BUILD_SIZE=$(du -sh dist/ | cut -f1)
print_status "Tamaño total del build: $BUILD_SIZE"

# Instrucciones para subir a Hostinger
echo ""
echo "🎯 SIGUIENTE PASO: Subir archivos a Hostinger"
echo "================================================"
echo ""
echo "Opción 1 - Panel de Control de Hostinger:"
echo "1. Accede al panel de Hostinger"
echo "2. Ve a 'Administrador de archivos'"
echo "3. Navega a public_html/"
echo "4. Sube TODO el contenido de la carpeta dist/"
echo ""
echo "Opción 2 - FTP/SFTP:"
echo "1. Conecta tu cliente FTP a tu servidor"
echo "2. Navega a public_html/"
echo "3. Sube TODO el contenido de la carpeta dist/"
echo ""
echo "Opción 3 - Comando rsync (si tienes SSH):"
echo "rsync -avz --delete dist/ usuario@tudominio.com:public_html/"
echo ""

# Verificaciones post-despliegue
echo "✅ CHECKLIST POST-DESPLIEGUE:"
echo "================================"
echo "[ ] Archivos subidos a public_html/"
echo "[ ] DNS configurado correctamente"
echo "[ ] SSL activado en Hostinger"
echo "[ ] Sitio carga correctamente"
echo "[ ] Todas las rutas funcionan"
echo "[ ] Formularios de contacto operativos"
echo "[ ] Enlaces de WhatsApp funcionan"
echo ""

print_success "¡Despliegue preparado exitosamente!"
print_status "El contenido de la carpeta 'dist/' está listo para subir a Hostinger"

# Opcional: Abrir el directorio dist en el explorador de archivos
if command -v open &> /dev/null; then
    # macOS
    open dist/
elif command -v xdg-open &> /dev/null; then
    # Linux
    xdg-open dist/
elif command -v explorer &> /dev/null; then
    # Windows
    explorer dist/
fi

echo ""
print_status "Script completado. ¡Buena suerte con tu migración! 🚀" 