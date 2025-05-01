/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // include this too
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A", // deep blue
        secondary: "#F59E0B", // golden orange
        accent: "#10B981", // emerald
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      screens: {
        xs: "480px",
        "3xl": "1600px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Orbitron", "sans-serif"],
      },
    },
  },
  plugins: [],
};
