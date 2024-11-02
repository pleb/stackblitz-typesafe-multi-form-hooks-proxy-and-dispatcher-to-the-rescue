import type { Config } from 'tailwindcss'

module.exports = {
  content: [
    './styles/app.css',
    './app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}',
  ],
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
} satisfies Config
