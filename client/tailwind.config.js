/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2563eb',       // Primary vibrant blue
          sky: '#38bdf8',        // Accent sky blue
          darkBg: '#0f172a',     // Dark slate backdrop
          lightBg: '#f8fafc',    // Soft interior card background
        }
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glow': '0 10px 25px -5px rgba(37, 99, 235, 0.3)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}