/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#14B8A6',
        accent: '#F97316',
        'neutral-900': '#1F2937',
        'neutral-700': '#4B5563',
        'neutral-500': '#9CA3AF',
        'neutral-100': '#F3F4F6',
      }
    },
  },
  plugins: [],
}
