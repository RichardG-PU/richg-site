/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/views/**/*.html.erb",
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "header-black": "#1e1e1e",
        title: "#c8c8c8",
        background: "#1a1a1a",
      },
    },
  },
  plugins: [],
};
