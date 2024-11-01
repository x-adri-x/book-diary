import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      boxShadow: {
        '3xl': '37px 20px 0px 2px rgba(0, 128, 0)',
        'custom-pink': '50px -30px 0px 2px rgba(199, 54, 148)',
      },
      height: {
        '100dvh': '100dvh',
        '50dvh': '50dvh',
      },
      minWidth: {
        'screen-sm': '640px',
      },
      transitionProperty: {
        'max-height': 'max-height',
      },
      maxHeight: {
        '0': '0',
        '30rem': '30rem', // Adjust this value as needed for the form content
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.bottom-shadow': {
          'box-shadow': '-1px 5px 5px -2px rgb(100, 116, 139)',
        },
        '.radial-gradiant': {
          'border-color': 'rgb(255, 255, 255)',
        },
      })
    }),
  ],
}
export default config
