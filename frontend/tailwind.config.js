/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          blue: "var(--accent-blue)",
          hover: "var(--accent-hover)",
        },
      },
    },
  },
  plugins: [],
};
