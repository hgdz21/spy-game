/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,ts,tsx,jsx}',
    './src/app/**/*.{html,ts}',
    './src/styles/**/*.css',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#d41212',
          dark: '#ac0e0e',
          light: '#e55a5a',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        secondary: '#48bb78',
        danger: {
          DEFAULT: '#d41212',
          dark: '#ac0e0e',
        },
        spy: '#d41212',
        player: '#48bb78',
      },
      backgroundColor: {
        dark: {
          primary: '#1a202c',
          secondary: '#2d3748',
          card: '#2d3748',
        },
        light: {
          primary: '#f5f7fa',
          secondary: '#ffffff',
          card: '#ffffff',
        },
      },
      textColor: {
        dark: {
          primary: '#f7fafc',
          secondary: '#e2e8f0',
          muted: '#a0aec0',
        },
        light: {
          primary: '#1a202c',
          secondary: '#4a5568',
          muted: '#718096',
        },
      },
      borderColor: {
        dark: '#4a5568',
        light: '#e2e8f0',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
      },
      boxShadow: {
        sm: '0 4px 6px rgba(0, 0, 0, 0.3)',
        lg: '0 10px 25px rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        sans: [
          'Poppins',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
      },
      animations: {
        fadeIn: 'fadeIn 0.3s ease',
        reveal: 'revealAnimation 0.5s ease',
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        revealAnimation: {
          from: {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
    },
  },
  plugins: [],
};
