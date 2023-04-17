/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{tsx,ts}'],
  theme: {
    extend: {
      colors: {
        glass: {
          DEFAULT: 'rgba(17, 25, 40, 0.75)',
          1: 'rgba(255, 255, 255, 0.125)',
        },
        error: {
          DEFAULT: '#e42d2dcc',
        },
      },
    },
  },
  plugins: [],
}
