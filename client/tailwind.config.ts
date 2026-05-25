import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'win-bg': '#008080',
        'win-gray': '#c0c0c0',
        'win-blue': '#000080',
        'border-light': '#ffffff',
        'border-dark': '#808080',
        'border-darker': '#404040',
      },
      fontFamily: {
        win: ['"MS Sans Serif"', '"Pixelated MS Sans Serif"', 'Arial', 'sans-serif'],
        monospace: ['"Courier New"', 'monospace'],
        vt: ['VT323', 'monospace']
      }
    },
  },
  plugins: [],
} satisfies Config
