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
        background: '#0a0a0c',
        text: '#8d8d8d',
        panel: '#0c0d0d',
        main: 'rgb(16 185 129)',
        second: 'rgb(99 102 241)',
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
