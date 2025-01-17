/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        coral: {
          50: "#FFF5F2",
          100: "#FFF1EE",
          400: "#FF7F6E",
          500: "#FF6B54",
          600: "#FF5436",
          700: "#FF3D18",
          800: "#FF2400",
          900: "#E61F00",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
