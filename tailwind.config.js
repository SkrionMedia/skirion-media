/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0052FF', // Metallic Electric Blue
          secondary: '#7000FF', // Vibrant Purple
          accent: '#00F0FF',
          dark: '#000000',
          light: '#FFFFFF',
          surface: '#020617',
          card: '#0f172a',
          border: 'rgba(255, 255, 255, 0.05)',
          'border-light': 'rgba(0, 0, 0, 0.05)',
        },
        blue: {
          500: '#0052FF',
          600: '#0041CC',
        }
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.02em',
        widest: '0.2em',
      }
    },
  },
  plugins: [],
}
