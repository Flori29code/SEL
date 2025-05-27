/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#004e89',
        secondary: '#007acc',
        accent: '#f5a623',
        darkText: '#1a1a1a',
        lightBg: '#f7fafc',
        danger: '#d9534f',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 