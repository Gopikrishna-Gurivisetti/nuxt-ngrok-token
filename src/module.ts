import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import ngrok from 'ngrok'

// Module options TypeScript interface definition
export interface ModuleOptions {
  token: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt3-ngrok',
    configKey: 'ngrok'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    token:''
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
    let url: string;
    nuxt.hook('listen', async () =>{
      await ngrok.authtoken(options.token);
      url = await ngrok.connect(3000)
      console.log(`Public Ngrok url:::: ${url}`)
    })
    nuxt.hook('close', async () =>{
      await ngrok.disconnect(url);
    })
  }
})
