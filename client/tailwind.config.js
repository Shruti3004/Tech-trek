module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#7F70FF',
        secondary: '#fdfe37',
        active: "#a39c99",
        golden: '#d9a462',
        bg: {
          primary: '#7F70FF',
          secondary: '#231f2c',
        },
        'btn-primary': '#1d1a25',
      },
      screens: {
        '3xl': '1600px',
      },

    },
  },
  plugins: [],
}