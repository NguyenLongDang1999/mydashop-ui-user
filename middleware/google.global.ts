export default defineNuxtRouteMiddleware(async to => {
    // if (import.meta.client && areValuesEqual(to.path, '/auth/google/callback') && to.query.code) {
    //     const { pathKey } = useAuthState()

    //     try {
    //         const { data } = await useFetchData<{ message: string }>(pathKey.loginGoogleCallback, {
    //             params: to.query,
    //             server: false,
    //             lazy: true
    //         })

    //         const isLoggedIn = useAuth()

    //         isLoggedIn.value = true

    //         if (data.value?.message) {
    //             useNotification('Đăng nhập thành công!')

    //             return navigateTo('/', { replace: true })
    //         }
    //     } catch (error) {
    //         useNotificationError()
    //     }

    //     return abortNavigation()
    // }
})
