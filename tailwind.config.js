/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#333333', // Override default black to deep anthracite for premium contrast
        brand: {
          gold: '#B19E31', // STIMÉO Gold - Unified signature color
          yellow: '#D9C43D', // Background Yellow
          'stimeo-gold': '#B19E31', // STIMÉO Gold - Unified technical & human identity
          neutral: '#a6a6a6',
          anthracite: '#333333', // Deep Anthracite Gray for premium readability
          'anthracite-dark': '#2D2D2D', // Darker anthracite for H1/H2 hierarchy
          'gray-soft-dark': '#444444', // Soft dark gray for H3/card titles
          lightgray: '#f5f5f5',
          mediumgray: '#e0e0e0',
        },
      },
      fontFamily: {
        'eastman': ['Eastman Grotesque', 'sans-serif'],
      },
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '44px' }],
        '5xl': ['48px', { lineHeight: '52px' }],
        '6xl': ['60px', { lineHeight: '68px' }],
        'display': ['80px', { lineHeight: '88px' }], // Added for extra large titles
      },
      borderRadius: {
        'none': '0px',
        'sm': '2px',
        'base': '4px',
        'md': '6px',
        'lg': '8px',
        '3xl': '24px',
        '4xl': '40px', // For background blocks
        'pill': '50px', // For buttons
      },
      spacing: {
        'xs': '8px',
        'sm': '12px',
        'base': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '48px',
        '2xl': '64px',
        '3xl': '80px',
      },
    },
  },
  plugins: [],
}
