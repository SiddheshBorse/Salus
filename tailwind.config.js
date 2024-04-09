/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      fontFamily:{
        inter:['Inter','sans-serif']
      },
      colors:{
        "primary":"#2E90FA",
        "primary-dark":"#2E70FF",
        "secondary":"#16B364",
        "tertiary":"#334054",
        "tertiary-light":"#98A2B3",
        "highlight":"#EEE",
        "background-1":"#D5E9FE",
        "background-2":"#C5ECD8",
        "error":"#DC1515"
      }
    },
  },
  plugins: [],
}