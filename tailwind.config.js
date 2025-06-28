/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de colores real de Softtek
        softtek: {
          darkBlue: '#1a237e',    // Azul oscuro principal
          purple: '#6a1b9a',      // Púrpura del gradiente
          magenta: '#e91e63',     // Magenta del gradiente
          cyan: '#00bcd4',        // Cian/turquesa de acentos
          lightCyan: '#26c6da',   // Cian claro
        },
        // Paleta de colores Nuppi
        nuppi: {
          // Colores Primarios
          verde: '#00B652',       // Verde principal
          turquesaClaro: '#A8FFCE', // Turquesa claro
          azulOscuro: '#00274B',  // Azul oscuro
          blancoGris: '#D1D1D6',  // Blanco gris
          // Colores Secundarios
          grisOscuro: '#2D2D2D',  // Gris oscuro
          turquesaMarino: '#D8FFE7', // Turquesa marino
          rojoMelon: '#FF8B8B',   // Rojo melón
          amarilloCrema: '#FFF8BE', // Amarillo crema
        },
        // Colores del tema actualizados con paleta real Softtek
        primary: '#1a237e',       // Azul oscuro Softtek como color primario
        secondary: '#6a1b9a',     // Púrpura Softtek como color secundario
        accent: '#00bcd4',        // Cian Softtek como acento
        danger: '#EF4444',        // Rojo para alertas
        success: '#10B981',       // Verde para éxito
        warning: '#F59E0B',       // Amarillo para advertencias
        info: '#1a237e',          // Azul Softtek para información
        
        // Colores de texto y fondo
        darkText: '#1F2937',
        lightText: '#6B7280',
        lightBg: '#F9FAFB',
        
        // Grises
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 