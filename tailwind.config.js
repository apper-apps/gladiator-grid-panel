/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B4513', // Saddle Brown
        secondary: '#DAA520', // Goldenrod
        accent: '#DC143C', // Crimson
        surface: {
          50: '#2F1F1A',   // Dark brown
          100: '#3A241D',
          200: '#452920',
          300: '#502E23',
          400: '#5B3326',
          500: '#663829',
          600: '#713D2C',
          700: '#7C422F',
          800: '#874732',
          900: '#924C35'
        },
        background: '#1A0F0A', // Near-black brown
        success: '#228B22',
        warning: '#FF8C00',
        error: '#8B0000',
        info: '#4682B4'
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Crimson Pro', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Cinzel', 'serif']
      },
      boxShadow: {
        'stone': '0 8px 16px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(218, 165, 32, 0.1)',
        'carved': 'inset 0 4px 8px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(218, 165, 32, 0.2)',
        'raised': '0 4px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 4px rgba(0, 0, 0, 0.2)'
      },
      backgroundImage: {
        'stone-texture': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"60\" viewBox=\"0 0 60 60\"%3E%3Cg fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/svg%3E')"
      }
    },
  },
  plugins: [],
}