/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fc',
          400: '#36abf7',
          500: '#0c8ee9',
          600: '#0270c6',
          700: '#0359a0',
          800: '#0A4D8C', // Primary Deep Blue
          900: '#0a3c6e',
          950: '#062649',
        },
        aqua: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14B8A6', // Primary Aqua / Teal
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        quality: {
          safe: '#10B981',       // Green
          'safe-light': '#D1FAE5',
          caution: '#F59E0B',    // Amber
          'caution-light': '#FEF3C7',
          unsafe: '#EF4444',     // Red
          'unsafe-light': '#FEE2E2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'ripple': 'ripple 3s ease-in-out infinite',
        'wave': 'wave 6s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        ripple: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.08)', opacity: '0.4' },
        },
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
