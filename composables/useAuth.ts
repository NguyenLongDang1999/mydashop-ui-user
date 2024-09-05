// ** Third Party Imports
import { useMutation, useQuery } from '@tanstack/vue-query'

// ** Router Imports
import type { RouteLocationRaw } from 'vue-router'

// ** State
const path = ref<string>(ROUTE.AUTH)

const queryKey = {
    signOut: `${path.value}-sign-out`,
    profile: `${path.value}-profile`
}

const pathKey = {
    signIn: `${path.value}/sign-in`,
    signUp: `${path.value}/sign-up`,
    signOut: `${path.value}/sign-out`,
    profile: `${path.value}/profile`,
    changePassword: `${path.value}/change-password`,
    forgotPassword: `${path.value}/forgot-password`,
    resetPassword: `${path.value}/reset-password`
}

export const useAuth = () => useState<boolean>('isLoggedIn', () => false)

export const useAuthLogin = () => useMutation<IAuthLoginForm, Error, IAuthLoginForm>({
    mutationFn: body => useFetcher(pathKey.signIn, {
        method: 'POST',
        body
    }),
    onSuccess: () => {
        const { query } = useRoute()
        const isLoggedIn = useAuth()

        isLoggedIn.value = true

        nextTick(() => navigateTo(query.to as RouteLocationRaw))
        useNotification('Đăng nhập thành công!')
    },
    onError: () => useNotificationError()
})

export const useAuthRegister = () => useMutation<IAuthRegisterForm, Error, IAuthRegisterForm>({
    mutationFn: body => useFetcher(pathKey.signUp, {
        method: 'POST',
        body
    }),
    onSuccess: () => {
        const { query } = useRoute()
        const isLoggedIn = useAuth()

        isLoggedIn.value = true

        nextTick(() => navigateTo(query.to as RouteLocationRaw))
        useNotification('Đăng nhập thành công!')
    },
    onError: () => useNotificationError()
})

export const useAuthForgotPassword = () => useMutation<IAuthForgotPasswordForm, Error, IAuthForgotPasswordForm>({
    mutationFn: body => useFetcher(pathKey.forgotPassword, {
        method: 'POST',
        body
    }),
    onSuccess: () => useNotification('Thành Công!'),
    onError: () => useNotificationError()
})

export const useAuthProfile = () => {
    // ** useHooks
    const isLoggedIn = useAuth()

    const { data } = useQuery<IAuthProfile>({
        queryKey: [queryKey.profile],
        queryFn: () => useFetcher(pathKey.profile),
        enabled: computed(() => !!isLoggedIn.value)
    })

    // ** Computed
    const profile = computed(() => data.value as IAuthProfile)

    return {
        data: profile
    }
}

export const useAuthLogout = () => useQuery({
    queryKey: [queryKey.signOut],
    queryFn: () => useFetcher(pathKey.signOut),
    enabled: false
})

export const useAuthChangePassword = () => useMutation<IAuthChangePasswordForm, Error, IAuthChangePasswordForm>({
    mutationFn: body => useFetcher(pathKey.changePassword, {
        method: 'POST',
        body
    }),
    onSuccess: () => useNotification('Thành Công!'),
    onError: () => useNotificationError()
})

export const useAuthResetPassword = () => {
    const { query } = useRoute()

    return useMutation<IAuthResetPasswordForm, Error, IAuthResetPasswordForm>({
        mutationFn: body => useFetcher(pathKey.resetPassword, {
            method: 'POST',
            body,
            params: {
                token: query.token
            }
        }),
        onSuccess: () => {
            useNotification('Thành Công!')
            nextTick(() => navigateTo(ROUTER.AUTH_LOGIN))
        },
        onError: () => useNotificationError()
    })
}
