/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6001",
        secondary: "#BEBEBE",
        accent: "#0E0E0E",
        background: "#E4E4E4",
        highlight: "#FF7020",
      },
    },
  },
  plugins: [],
};
