/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/components/**/*.{js,jsx,ts,tsx}",
    "./app/screens/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#47AB2F",
          "100": "#54717A",
          "200": "#57575D"
        }
      }
    },
  },
  plugins: [],
}

