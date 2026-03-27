/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fortune-gold': '#D4AF37',
        'fortune-red': '#A52A2A',
        'fortune-cream': '#FDF5E6',
        'ci-pink': '#FF007A',
        'ci-yellow': '#FFEA00',
        'ci-blue': '#0070FF',
        'ci-purple': '#9D00FF',
        'ci-green': '#00C853',
        'ci-dark': '#0A0A0B',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px) rotate(-1deg)' },
          '75%': { transform: 'translateX(10px) rotate(1deg)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        shake: 'shake 0.5s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out forwards',
      }
    },
  },
  plugins: [],
}
