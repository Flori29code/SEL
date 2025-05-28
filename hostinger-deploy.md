# 🚀 Migración de Vercel a Hostinger - BootCamp DevOps

## 📋 Checklist de Migración

### **1. Preparación del Proyecto**

#### Verificar configuración actual:
- ✅ Proyecto React + TypeScript + Vite
- ✅ Configuración de Vercel existente
- ✅ Variables de entorno configuradas
- ✅ Dominio personalizado en Vercel

#### Archivos importantes para la migración:
```
sel_web/
├── dist/                    # Build de producción (se genera)
├── public/                  # Archivos estáticos
├── src/                     # Código fuente
├── package.json            # Dependencias y scripts
├── vite.config.ts          # Configuración de Vite
├── vercel.json             # Configuración de Vercel (para referencia)
└── .env                    # Variables de entorno
```

### **2. Configuración para Hostinger**

#### A. Crear archivo de configuración para Hostinger
Crear `.htaccess` en la carpeta `public/`:

```apache
# Configuración para SPA (Single Page Application)
RewriteEngine On
RewriteBase /

# Handle Angular and React Router
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Configuración de cache
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
</IfModule>

# Compresión GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Seguridad
<IfModule mod_headers.c>
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

#### B. Actualizar vite.config.ts para producción
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Asegúrate de que sea '/' para el dominio principal
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Desactivar sourcemaps en producción
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['react-icons']
        }
      }
    }
  },
  server: {
    port: 3000
  }
})
```

### **3. Variables de Entorno**

#### Crear archivo `.env.production`:
```env
# Variables de producción para Hostinger
VITE_SPREADSHEET_ID=1epjKFzVHwhSUqeY624U2hEwZRWrMC0J_3R8eQ1krF7w
VITE_CSV_PUBLIC_URL=https://docs.google.com/spreadsheets/d/e/2PACX-1vRLzGPIHSmRXPx9Fhxck1j3pgmjY4kOkiMEWaMZsoRn4G1S0kUs2jyGVY9MxhY58i66zPOXbSCsPbRr/pub?output=csv
```

### **4. Scripts de Build Optimizados**

#### Actualizar package.json:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "build:hostinger": "npm run build && npm run copy-htaccess",
    "copy-htaccess": "cp public/.htaccess dist/",
    "preview": "vite preview",
    "lint": "eslint .",
    "clean": "rm -rf dist"
  }
}
```

### **5. Proceso de Migración**

#### Paso 1: Preparar el build
```bash
# 1. Limpiar build anterior
npm run clean

# 2. Instalar dependencias
npm install

# 3. Crear build optimizado
npm run build:hostinger
```

#### Paso 2: Verificar el build
```bash
# Verificar que se generó correctamente
ls -la dist/

# Debería contener:
# - index.html
# - assets/ (CSS, JS, imágenes)
# - .htaccess
```

#### Paso 3: Subir a Hostinger

**Opción A: Panel de Control de Hostinger**
1. Acceder al panel de Hostinger
2. Ir a "Administrador de archivos"
3. Navegar a `public_html/`
4. Subir todo el contenido de la carpeta `dist/`

**Opción B: FTP/SFTP**
```bash
# Usando rsync (si tienes acceso SSH)
rsync -avz --delete dist/ usuario@tudominio.com:public_html/

# Usando FTP (configurar cliente FTP)
# Host: ftp.tudominio.com
# Usuario: tu_usuario_ftp
# Contraseña: tu_contraseña_ftp
# Directorio: public_html/
```

### **6. Configuración del Dominio**

#### En Hostinger:
1. **Panel de Control** → **Dominios**
2. **Gestión de DNS** → Configurar registros A/CNAME
3. **SSL/TLS** → Activar certificado SSL gratuito

#### Configuración DNS típica:
```
Tipo    Nombre    Valor                    TTL
A       @         IP_DEL_SERVIDOR         3600
A       www       IP_DEL_SERVIDOR         3600
CNAME   www       tudominio.com           3600
```

### **7. Optimizaciones Post-Migración**

#### A. Verificar rendimiento
- ✅ Tiempo de carga < 3 segundos
- ✅ Lighthouse Score > 90
- ✅ Todas las rutas funcionan correctamente
- ✅ Formularios de contacto operativos

#### B. Configurar monitoreo
- ✅ Google Analytics
- ✅ Google Search Console
- ✅ Uptime monitoring

#### C. Backup automático
- ✅ Configurar backups diarios en Hostinger
- ✅ Mantener copia del código en GitHub

### **8. Troubleshooting Común**

#### Problema: Rutas no funcionan (404)
**Solución:** Verificar que `.htaccess` esté en la raíz del dominio

#### Problema: Assets no cargan
**Solución:** Verificar rutas relativas en `vite.config.ts`

#### Problema: Variables de entorno no funcionan
**Solución:** Verificar que tengan prefijo `VITE_`

#### Problema: Certificado SSL no funciona
**Solución:** Esperar 24-48 horas para propagación DNS

### **9. Checklist Final**

- [ ] Build generado correctamente
- [ ] .htaccess configurado
- [ ] Archivos subidos a public_html/
- [ ] DNS configurado
- [ ] SSL activado
- [ ] Todas las páginas cargan
- [ ] Formularios funcionan
- [ ] WhatsApp links operativos
- [ ] Google Analytics configurado
- [ ] Backup configurado

### **10. Comandos Útiles**

```bash
# Build para producción
npm run build

# Verificar build localmente
npm run preview

# Limpiar cache de npm
npm cache clean --force

# Verificar dependencias
npm audit

# Actualizar dependencias
npm update
```

### **11. Contactos de Soporte**

- **Hostinger Support:** Panel de control → Chat en vivo
- **DNS Propagation Check:** https://dnschecker.org/
- **SSL Check:** https://www.ssllabs.com/ssltest/

---

## 🎯 **Resultado Esperado**

Después de la migración, tu sitio estará disponible en:
- `https://tudominio.com`
- `https://www.tudominio.com`

Con todas las funcionalidades operativas:
- ✅ Navegación SPA
- ✅ Formularios de contacto
- ✅ Enlaces de WhatsApp
- ✅ Optimización SEO
- ✅ Certificado SSL
- ✅ Cache optimizado 