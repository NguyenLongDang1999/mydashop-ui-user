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
        '@sidebase/nuxt-auth',
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
        '/p': { swr: true },
        '/p/**': { swr: 3600 }
    },
    auth: {
        baseURL: `${process.env.NUXT_PUBLIC_API_BASE}/`,
        sessionRefresh: {
            enableOnWindowFocus: false,
            enablePeriodically: false
        },
        provider: {
            type: 'local',
            endpoints: {
                getSession: {
                    path: 'auth/session'
                },
                signIn: {
                    method: 'post',
                    path: 'auth/sign-in'
                },
                signUp: {
                    method: 'post',
                    path: 'auth/sign-up'
                },
                signOut: {
                    method: 'get',
                    path: 'auth/sign-out'
                }
            },
            token: {
                signInResponseTokenPointer: '/token/accessToken',
                maxAgeInSeconds: 20,
                cookieName: 'accessToken',
                secureCookieAttribute: process.env.NODE_ENV === 'production',
                httpOnlyCookieAttribute: process.env.NODE_ENV === 'production'
            },
            refresh: {
                isEnabled: true,
                endpoint: {
                    method: 'post',
                    path: 'auth/refresh'
                },
                refreshOnlyToken: false,
                token: {
                    signInResponseRefreshTokenPointer: '/token/refreshToken',
                    cookieName: 'refreshToken',
                    maxAgeInSeconds: 7 * 24 * 60 * 60,
                    secureCookieAttribute: process.env.NODE_ENV === 'production',
                    httpOnlyCookieAttribute: process.env.NODE_ENV === 'production'
                }
            }
        },
        globalAppMiddleware: {
            isEnabled: false
        }
    }
})
