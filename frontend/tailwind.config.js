/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "main-layout": "auto 1fr auto",
      },
      gridTemplateRows: {
        "main-layout": "auto 1fr auto",
      }
    },
  },
  plugins: [],
}

