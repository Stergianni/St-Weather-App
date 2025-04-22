/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6001",     // Deep Orange
        secondary: "#BEBEBE",   // Soft Gray
        accent: "#121212",      // Black
        background: "#E4E4E4",  // Light Gray
        highlight: "#FF7020",   // Lighter Orange
      },
    },
  },
  plugins: [],
};
