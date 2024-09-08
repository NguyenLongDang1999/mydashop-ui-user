export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const $customFetch = $fetch.create({
        baseURL: config.public.apiBase as string,
        credentials: 'include',
        keepalive: true,
        retry: 1,
        retryStatusCodes: [HTTP_CODE.UNAUTHORIZED],
        onRequest({ options }) {
            const access_token = useCookie(AUTH.ACCESS_TOKEN).value

            if (access_token) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${access_token}`
                }
            }
        },
        async onResponseError({ response }) {
            if (!response.ok && areValuesEqual(response.status, HTTP_CODE.UNAUTHORIZED)) {
                await useFetch('/auth/refresh', {
                    baseURL: config.public.apiBase as string,
                    server: false,
                    credentials: 'include'
                }).catch(() => clearAuthCookies())
            }
        }
    })

    const clearAuthCookies = () => {
        const accessToken = useCookie(AUTH.ACCESS_TOKEN)
        const refreshToken = useCookie(AUTH.REFRESH_TOKEN)

        accessToken.value = null
        refreshToken.value = null

        navigateTo(ROUTER.AUTH_LOGIN)
    }

    return {
        provide: {
            customFetch: $customFetch
        }
    }
})

