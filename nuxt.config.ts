// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-07-24',
    devtools: { enabled: true },
    modules: [
        '@nuxt/ui',
        '@nuxtjs/google-fonts',
        '@vee-validate/nuxt',
        '@vueuse/nuxt',
        '@nuxt/image',
        'nuxt-swiper',
        'nuxt-lodash',
        'nuxt-anchorscroll',
        '@stefanobartoletti/nuxt-social-share'
    ],
    image: {
        provider: 'bunny',
        bunny: {
            baseURL: 'https://nuxivy.b-cdn.net'
        }
    },
    googleFonts: {
        prefetch: true,
        preconnect: true,
        families: {
            'Quicksand': [400, 500, 600, 700]
        }
    },
    lodash: {
        prefix: '_',
        prefixSkip: ['string'],
        upperAfterPrefix: false
    },
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE
        }
    },
    imports: {
        dirs: ['validations']
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    routeRules: {
        '/': { prerender: true },
        '/thanh-toan': { ssr: false },
        '/thong-tin-tai-khoan': { ssr: false }
    }
})
