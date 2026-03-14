/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7ff',
          100: '#bae7ff',
          200: '#91d5ff',
          300: '#69c0ff',
          400: '#40a9ff',
          500: '#1890ff',
          600: '#096dd9',
          700: '#0050b3',
          800: '#003a8c',
          900: '#002766',
        },
        secondary: {
          50: '#f6ffed',
          100: '#d9f7be',
          200: '#b7eb8f',
          300: '#95de64',
          400: '#73d13d',
          500: '#52c41a',
          600: '#389e0d',
          700: '#237804',
          800: '#135200',
          900: '#092b00',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scale-up': 'scale-up 0.3s ease-out',
        'ripple': 'ripple 0.6s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(24, 144, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(24, 144, 255, 0.8), 0 0 30px rgba(82, 196, 26, 0.6)' },
        },
        'scale-up': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

