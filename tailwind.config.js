/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      blue: "#758ECD",
      green: "#91C7B1",
      yellow: "#F2C078",
      red: "#EF6F6C",
      neutral: "#54494B",
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
