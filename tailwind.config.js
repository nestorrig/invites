/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-100": "#FFD700",
        "primary-200": "#ddb900",
        "primary-300": "#917800",
        "accent-100": "#800080",
        "accent-200": "#ffa6ff",
        "txt-100": "#FFFFFF",
        "txt-200": "#e0e0e0",
        100: "#1E1E1E",
        200: "#161616",
        300: "#2c2c2c",
      },
    },
  },
  plugins: [],
};
