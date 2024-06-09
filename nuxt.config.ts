// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/app.scss"],
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "storeToRefs"],
      },
    ],
    "nuxt-icons",
  ],
  imports: {
    dirs: ["stores"],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/_breakpoints.scss" as *;',
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      api_url: process.env.API_URL,
      api_token: process.env.API_TOKEN,
    },
  },
});
