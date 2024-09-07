import type { UseFetchOptions } from 'nuxt/app'

export default function <T>(
    url: string | (() => string),
    options: UseFetchOptions<T> = {}
) {
    return useFetch(url, {
        ...options,
        $fetch: useNuxtApp().$customFetch
    })
}
