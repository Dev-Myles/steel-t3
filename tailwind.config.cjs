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
        panel: '#121314',
        main: 'rgb(16 185 129)',
      },
      fontFamily: {
        Poppins: ['Poppins-Medium'],
        Hind: ['HindSiliguri-Regular'],
        PTMono: ['PTMono-Regular'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};
