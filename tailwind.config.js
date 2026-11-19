/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Taken from the logo: deep book blue (#184691) and ring sky blue (#1EA7E1)
        brand: {
          50: '#EEF4FC',
          100: '#DCE8F8',
          200: '#B9D1F1',
          300: '#8AB2E6',
          400: '#4F87D4',
          500: '#2A66BE',
          600: '#1D53A6',
          700: '#184691',
          800: '#143A78',
          900: '#0F2C5C',
          950: '#0A1E40',
        },
        accent: {
          DEFAULT: '#1EA7E1',
          light: '#E6F6FD',
        },
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.35s ease-out',
      },
    },
  },
  plugins: [],
};
