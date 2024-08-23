import type { RouterConfig } from '@nuxt/schema'

export default {
    // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
    routes: () => [
        {
            name: 'product-categories',
            path: '/tat-ca-danh-muc',
            component: () => import('~/pages/product-categories/index.vue').then(r => r.default || r)
        }
    ]
} satisfies RouterConfig
