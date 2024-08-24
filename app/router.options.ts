import type { RouterConfig } from '@nuxt/schema'

export default {
    // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
    routes: _routes => [
        ..._routes,
        {
            name: 'product-categories',
            path: '/tat-ca-danh-muc',
            component: () => import('~/pages/product-categories/index.vue').then(r => r.default || r)
        },
        {
            name: 'product-categories-shop',
            path: '/cua-hang',
            component: () => import('~/pages/product-categories/shop.vue').then(r => r.default || r)
        },
        {
            name: 'product-categories-retrieve',
            path: '/c/:slug',
            component: () => import('~/pages/product-categories/[slug].vue').then(r => r.default || r)
        },
        {
            name: 'product-retrieve',
            path: '/p/:slug',
            component: () => import('~/pages/products/[slug].vue').then(r => r.default || r)
        }
    ]
} satisfies RouterConfig
