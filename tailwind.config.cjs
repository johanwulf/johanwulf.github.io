/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./CNAME"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
