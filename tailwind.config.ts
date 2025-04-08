import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        link: {
          DEFAULT: '#16a34a', // Green-600
          hover: '#166534', // Green-800
          muted: '#86efac', // Green-300
        },
      },
    },
  },
  plugins: [],
} satisfies Config
