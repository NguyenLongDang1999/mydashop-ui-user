export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const $customFetch = $fetch.create({
        baseURL: config.public.apiBase as string,
        credentials: 'include',
        keepalive: true,
        onRequest({ options }) {
            const access_token = useCookie(AUTH.ACCESS_TOKEN).value

            if (access_token) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${access_token}`
                }
            }
        }
    })

    return {
        provide: {
            customFetch: $customFetch
        }
    }
})
