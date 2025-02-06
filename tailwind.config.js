/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/components/**/*.{js,jsx,ts,tsx}",
    "./app/screens/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#47AB2F",
          "100": "#54717A",
          "200": "#57575D"
        },
        secondary: {
          "100": "#EA7474",
          "200": "#4A90E2",
          "300": "#444444",
          "400": "#121212",
          "500": "#333333",
          "600": "#F5F5F5",
          "700": "#CCCCCC"
        },
        gold: {
          "100": "#FFD700"
        }
      }
    },
  },
  plugins: [],
}

