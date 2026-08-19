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
        sans: ['"Share Tech Mono"', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      colors: {
        crt: {
          green: '#00ff66',
          amber: '#ffb000',
          phosphor: '#33ff33',
          dark: '#050c05',
          bg: '#0a0d0a',
          screen: '#0f140f',
          glass: 'rgba(18, 26, 18, 0.95)',
          bezel: '#1a1d1a',
          casing: '#262926',
        }
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'hum': 'hum 3s ease-in-out infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        flicker: {
          '0%, 100%': { opacity: 0.98 },
          '50%': { opacity: 0.93 },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0, 255, 102, 0.4)' },
          '50%': { boxShadow: '0 0 25px rgba(0, 255, 102, 0.7)' },
        }
      }
    },
  },
  plugins: [],
}
