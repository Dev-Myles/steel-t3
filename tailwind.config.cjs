/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: ['first'],
      boxShadow: {
        DEFAULT: '0 0 5px #141414',
      },
      colors: {
        background: '#101010',
        text: '#8d8d8d',
        panel: '#0c0d0d',
        main: '#37af87',
        second: 'rgb(120, 122, 253)',
      },
      fontFamily: {
        Poppins: ['Poppins-Medium'],
        Hind: ['HindSiliguri-Regular'],
        HindThin: ['HindSiliguri-Light'],
        PTMono: ['PTMono-Regular'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};
