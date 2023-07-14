/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        concert: ["Concert One", "cursive"],
        knewave: ["Knewave", "cursive"],
      },
    },
  },
  plugins: [require("daisyui")],
};
