/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': 'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset',
        'custom-hover': 'rgba(0, 0, 0, 0.35) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.35) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset'
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-out forwards',
      },
      transitionDelay: {
        '200': '200ms',
        '400': '400ms',
        '600': '600ms',
      }
    },
  },
  plugins: [],
  corePlugins: {
    // ...
  },
  variants: {
    extend: {
      // ...
    },
  },
  extend: {
    '.no-scrollbar': {
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    }
  }
}