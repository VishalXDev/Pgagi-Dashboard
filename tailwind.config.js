/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
        secondary: '#F59E0B',
        accent: '#10B981',
      },
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      screens: {
        'xs': '480px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [],
}
