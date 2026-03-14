/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#B8860B',
          light: '#C9A86C',
          dark: '#8B7355',
        },
        anthracite: {
          DEFAULT: '#1A1A1A',
          dark: '#0A0A0A',
          light: '#2A2A2A',
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(184, 134, 11, 0.3)',
      }
    },
  },
  plugins: [],
}
