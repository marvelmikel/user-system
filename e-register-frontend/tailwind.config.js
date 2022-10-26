module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  prefix: "tw-",
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        'dark-yellow': '#D7A300',
        'dark-green': '#076476',
        'light-green': '#50C18D',
        'lighter-green':'#CCEEDE',
        'bright-green': '#16B41C',

      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
