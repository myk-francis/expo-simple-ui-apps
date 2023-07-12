/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        corn: {
          50: "#fef9e8",
          100: "#fef0c3",
          200: "#fee28a",
          300: "#fdd147",
          400: "#fac215",
          500: "#eab308",
          600: "#ca9a04",
          700: "#a17c07",
          800: "#85680e",
          900: "#715a12",
          950: "#423306",
        },
      },
    },
  },
  plugins: [],
};
