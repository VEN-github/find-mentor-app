/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primaryBg: "#f2f7f5",
      secondaryBg: "#faae2b",
      accentBg: "#ffa8ba",
      primaryFg: "#00473e",
      secondaryFg: "#475d5b",
      accentFg: "#fa5246",
      white: "#fff",
      red: "#CD1E1E",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
