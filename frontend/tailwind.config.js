export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Dark-charcoal background scale (brief's art direction)
        charcoal: {
          950: '#07080b',
          900: '#0b0d12',
          800: '#12141b',
          700: '#1b1e28',
          600: '#282c3a'
        },
        // Brand gradient sampled from the real Scalora logo mark
        brand: {
          blue: '#2f6bff',
          violet: '#7c3aed',
          purple: '#a855f7'
        },
        ink: '#101828',
        mist: '#eef4ff'
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #2f6bff 0%, #7c3aed 55%, #a855f7 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(47,107,255,0.16) 0%, rgba(168,85,247,0.16) 100%)'
      },
      boxShadow: {
        glow: '0 24px 80px rgba(124, 58, 237, 0.16)',
        card: '0 1px 0 rgba(255,255,255,0.06) inset, 0 20px 50px rgba(0,0,0,0.35)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      keyframes: {
        floatIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        heroFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' }
        }
      },
      animation: {
        floatIn: 'floatIn 700ms ease-out both',
        heroFloat: 'heroFloat 7s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
