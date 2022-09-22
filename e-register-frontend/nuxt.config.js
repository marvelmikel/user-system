export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "e-register-frontend",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css",
      },
    ],
    script: [
      {
        hid: "stripe",
        href: "https://unpkg.com/boxicons@2.1.2/dist/boxicons.js",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/css/font.css", "~/css/layout.css", "~/css/color.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/axios", "~/plugins/helpers", "~/plugins/data"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "cookie-universal-nuxt", "@nuxtjs/toast"],
  axios: {
    baseURL:
      process.env.NODE_ENV === "production"
        ? process.env.PRODUCTION_BASE_URL
        : process.env.DEVELOPMENT_BASE_URL, // Used as fallback if no runtime config is provided
  },
  toast: {
    position: "bottom-right",
    duration: 2000,
    singleton: true,
  },
  env: {
    PRODUCTION_BASE_URL: process.env.PRODUCTION_BASE_URL,
    DEVELOPMENT_BASE_URL: process.env.DEVELOPMENT_BASE_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
