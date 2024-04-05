import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        blue: {
          700: '#0C1027',
          900: '#090C1D',
        },
        alert: {
          green: '#B1E873',
        },
        flowkit: {
          red: '#FC5555',
        },
        neutral: {
          100: '#F0F0F0',
          300: '#DDEAFE',
          500: '#BCCCEB',
          700: '#393A41',
          900: '#385472',
        },
        pink: {
          900: '#CB015C',
        },
      },
    },
  },
  plugins: [],
}
export default config
