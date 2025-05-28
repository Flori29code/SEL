/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de colores de Softtek
        softtek: {
          green: '#376C39', // PMS 376 - Verde principal de Softtek
          blue: '#295F8A',  // PMS 295 - Azul principal de Softtek
          gray: '#6B7280',  // Cool Gray 11C - Gris corporativo
        },
        // Colores del tema actual actualizados con paleta Softtek
        primary: '#295F8A',    // Azul Softtek como color primario
        secondary: '#376C39',  // Verde Softtek como color secundario
        accent: '#FF6B35',     // Mantener el naranja como acento
        danger: '#EF4444',     // Rojo para alertas
        success: '#376C39',    // Verde Softtek para éxito
        warning: '#F59E0B',    // Amarillo para advertencias
        info: '#295F8A',       // Azul Softtek para información
        
        // Colores de texto y fondo
        darkText: '#1F2937',
        lightText: '#6B7280',
        lightBg: '#F9FAFB',
        
        // Grises usando la paleta Softtek
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',  // Cool Gray 11C de Softtek
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