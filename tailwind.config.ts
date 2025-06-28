// tailwind.config.ts (for Tailwind CSS v4)
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // Keep if you want explicit content scanning
  // No theme configuration here for V4
  plugins: [], // Keep if you have plugins, otherwise remove
} satisfies Config
