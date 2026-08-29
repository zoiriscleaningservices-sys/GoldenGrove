/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F28C28',
          orangeDark: '#D97706',
          green: '#1F3D36',
          gold: '#F5C16C',
          dark: '#1F2933',
          light: '#F8FAFC',
          sand: '#FCFBFA',
        }
      },
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
