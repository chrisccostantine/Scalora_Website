export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#101828',
        mist: '#eef4ff',
        coral: '#ff6f61',
        teal: '#0e9384',
        gold: '#fdb022'
      },
      boxShadow: {
        glow: '0 24px 80px rgba(16, 24, 40, 0.14)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      keyframes: {
        floatIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        floatIn: 'floatIn 700ms ease-out both'
      }
    }
  },
  plugins: []
};
