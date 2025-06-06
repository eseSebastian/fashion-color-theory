import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          '50': '#FAFAFA',
          '100': '#F5F5F5',
          '200': '#E5E5E5',
          '900': '#171717'
        }
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'sans-serif'],
        'display': ['Inter', 'sans-serif']
      },
      spacing: {
        '1': '0.25rem',   // 4px
        '2': '0.5rem',    // 8px
        '4': '1rem',      // 16px
        '8': '2rem',      // 32px
        '16': '4rem'      // 64px
      },
      maxWidth: {
        'site': '1200px'
      },
      height: {
        'header': '64px'
      }
    },
  },
  plugins: [],
}

export default config
