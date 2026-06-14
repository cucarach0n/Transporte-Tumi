/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'premium-black': '#0D0D0D',
        'corp-red': '#D61F26',
        'modern-gold': '#D4A62A',
        'neutral-white': '#F5F5F5',
        'dark-gray': '#2B2B2B',
        'light-gray': '#D9D9D9',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
