import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ufc: {
          red: '#D20A0A',
          black: '#121212',
          dark: '#1E1E1E',
          gold: '#C5A059',
          white: '#FFFFFF',
          gray: '#A1A1A1'
        }
      },
    },
  },
  plugins: [],
};
export default config;