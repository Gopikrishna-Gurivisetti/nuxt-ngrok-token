export default defineNuxtConfig({
  modules: ["../src/module"],
  ngrok: {
    token: process.env.NGROK_TOKEN,
  },
  devtools: { enabled: true },
});
