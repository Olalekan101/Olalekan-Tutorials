/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding:{
        '1/3' : '33.3333%',
        '2/3' : '66.66667'
      },
      textColor:{
      },
      backgroundColor:{
      },
      colors:{
        "lightColor": '#F6F1F1',
        "darkColor": '#16213E',
        "darkColor2": '#1F305E',
        "darktwo": '#006ba6'
        
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}
