/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBG: '#171b27',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

