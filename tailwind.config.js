/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"VT323"', '"Courier New"', 'monospace'],
        sans: ['"MS Sans Serif"', '"Share Tech Mono"', 'Inter', 'sans-serif'],
        serif: ['"Times New Roman"', 'Georgia', 'serif'],
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      colors: {
        web10: {
          cyan: '#00ffff',
          yellow: '#ffff00',
          blue: '#3366ff',
          red: '#ff0033',
          bg: '#050510',
          ieBg: '#c0c0c0',
          panel: '#101025',
          text: '#00ffff',
        }
      }
    },
  },
  plugins: [],
}
