/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6ff',
          300: '#a5b8ff',
          400: '#8599ff',
          500: '#667eea',
          600: '#5568d3',
          700: '#4453b8',
          800: '#353f94',
          900: '#2a3270',
          950: '#1a1f4d',
        },
        secondary: {
          50: '#fef5ff',
          100: '#fde8ff',
          200: '#fbd1ff',
          300: '#f9adff',
          400: '#f57dff',
          500: '#e74cdb',
          600: '#d033bc',
          700: '#b0229a',
          800: '#8c1b7a',
          900: '#6b1659',
          950: '#4a0f3d',
        },
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        neural: {
          pink: '#ff6b9d',
          purple: '#c44dff',
          blue: '#4facfe',
          cyan: '#00f2fe',
          violet: '#7b68ee',
          magenta: '#ff1493',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-accent': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        'gradient-neural': 'linear-gradient(135deg, #ff6b9d 0%, #c44dff 50%, #4facfe 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, hsla(280, 100%, 70%, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(200, 100%, 70%, 0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(330, 100%, 70%, 0.3) 0px, transparent 50%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-lg': '0 12px 48px 0 rgba(31, 38, 135, 0.2)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        'glass-dark-lg': '0 12px 48px 0 rgba(0, 0, 0, 0.4)',
        'glow': '0 0 20px rgba(102, 126, 234, 0.4)',
        'glow-lg': '0 0 40px rgba(102, 126, 234, 0.6)',
        'glow-xl': '0 0 60px rgba(102, 126, 234, 0.7)',
        'neural': '0 8px 32px rgba(255, 107, 157, 0.25), 0 0 40px rgba(196, 77, 255, 0.15)',
        'depth-sm': '0 2px 8px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.08)',
        'depth': '0 4px 16px rgba(0, 0, 0, 0.08), 0 8px 32px rgba(0, 0, 0, 0.12)',
        'depth-lg': '0 8px 32px rgba(0, 0, 0, 0.12), 0 16px 64px rgba(0, 0, 0, 0.16)',
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '48px',
        '4xl': '56px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'morphing': 'morphing 8s ease-in-out infinite',
        'depth-shift': 'depth-shift 4s ease-in-out infinite',
        'neural-flow': 'neural-flow 10s ease infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        shimmer: {
          '0%': {
            'background-position': '-1000px 0',
          },
          '100%': {
            'background-position': '1000px 0',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 20px rgba(102, 126, 234, 0.4)',
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 40px rgba(102, 126, 234, 0.8)',
          },
        },
        morphing: {
          '0%, 100%': {
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          },
          '50%': {
            borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
          },
        },
        'depth-shift': {
          '0%, 100%': {
            transform: 'translateZ(0px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          },
          '50%': {
            transform: 'translateZ(20px)',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.16)',
          },
        },
        'neural-flow': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'slide-up': {
          '0%': {
            transform: 'translateY(20px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'slide-down': {
          '0%': {
            transform: 'translateY(-20px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
