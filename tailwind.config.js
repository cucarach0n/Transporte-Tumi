/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'premium-black': '#0B0B0B',
        'corp-red': '#D6101E',
        'modern-gold': '#D4AF37',
        'neutral-white': '#FFFFFF',
        'dark-gray': '#1F1F1F',
        'light-gray': '#E0E0E0'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
