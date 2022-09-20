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
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/axios", "~/plugins/helpers"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/moment",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/toast"],

  // register all
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
