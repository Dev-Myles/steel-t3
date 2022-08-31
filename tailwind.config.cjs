/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: ['first'],
      boxShadow: {
        DEFAULT: '0 0 5px silver',
      },
      fontFamily: {
        Poppins: ['Poppins-Medium'],
        Hind: ['HindSiliguri-Regular'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};
