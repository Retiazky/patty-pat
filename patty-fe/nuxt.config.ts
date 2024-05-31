// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/eslint",
    "@nuxtjs/color-mode",
    "nuxt-icon",
    "nuxt-tradingview",
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "s",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
  tradingview: {
    prefix: "tv",
  },
});
