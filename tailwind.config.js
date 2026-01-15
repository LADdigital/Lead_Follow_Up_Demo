/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      width: {
        '7/10': '70%',
        '3/10': '30%',
      },
      colors: {
        dark: {
          primary: '#0A0A0A',
          secondary: '#1A1A1A',
          tertiary: '#2D2D2D',
          elevated: '#3A3A3A',
          hover: '#4A4A4A',
        },
      },
      borderRadius: {
        'mobile-sm': '8px',    // Small elements like badges
        'mobile': '12px',       // Standard cards and panels
        'mobile-lg': '16px',    // Large cards and modals
        'mobile-xl': '20px',    // Hero sections
        'mobile-pill': '24px',  // Pill-shaped buttons
        'modern': '10px',
        'modern-lg': '12px',
      },
      boxShadow: {
        'modern-sm': '0 2px 8px rgba(0, 0, 0, 0.15)',
        'modern-md': '0 4px 12px rgba(0, 0, 0, 0.2)',
        'modern-lg': '0 8px 24px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
