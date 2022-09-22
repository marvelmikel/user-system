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
    extend: {
      colors: {
        "dark-yellow": "#D7A300",
        "dark-green": "#076476",
        "light-green": "#50C18D",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
