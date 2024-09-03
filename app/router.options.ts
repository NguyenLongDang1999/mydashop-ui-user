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
        },
        {
            name: 'auth-login',
            path: '/dang-nhap',
            component: () => import('~/pages/auth/login.vue').then(r => r.default || r)
        },
        {
            name: 'auth-register',
            path: '/dang-ky',
            component: () => import('~/pages/auth/register.vue').then(r => r.default || r)
        },
        {
            name: 'auth-forgot-password',
            path: '/quen-mat-khau',
            component: () => import('~/pages/auth/forgot-password.vue').then(r => r.default || r)
        },
        {
            name: 'users-overview',
            path: '/thong-tin-tai-khoan',
            component: () => import('~/pages/users/overview.vue').then(r => r.default || r)
        },
        {
            name: 'users-order-history',
            path: '/thong-tin-tai-khoan/lich-su-don-hang',
            component: () => import('~/pages/users/order-history.vue').then(r => r.default || r)
        },
        {
            name: 'users-change-password',
            path: '/thong-tin-tai-khoan/doi-mat-khau',
            component: () => import('~/pages/users/change-password.vue').then(r => r.default || r)
        }
    ]
} satisfies RouterConfig
