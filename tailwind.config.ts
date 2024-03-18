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
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'loginback-gradient':
          'linear-gradient(111.26deg, #2262C6 2.4%, #184995 96.05%)',
        'sidebarback-gradient':
          'linear-gradient(111.26deg, #2262C6 2.4%, #184995 96.05%)',
      },
    },
  },
  plugins: [],
}
export default config
