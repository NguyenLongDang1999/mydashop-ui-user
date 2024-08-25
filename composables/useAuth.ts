// ** Third Party Imports
import { useMutation } from '@tanstack/vue-query'

// ** Router Imports
import type { RouteLocationRaw } from 'vue-router'

// ** State
const path = ref<string>(ROUTE.AUTH)

const queryKey = {
    signOut: `${path.value}-sign-out`
}

const pathKey = {
    signIn: `${path.value}/sign-in`,
    signUp: `${path.value}/sign-up`,
    signOut: `${path.value}/sign-out`,
    forgotPassword: `${path.value}/forgot-password`
}

export const useAuthLogin = () => useMutation<IAuthLoginForm, Error, IAuthLoginForm>({
    mutationFn: body => useFetcher(pathKey.signIn, {
        method: 'POST',
        body
    }),
    onSuccess: () => {
        const { query } = useRoute()

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

        nextTick(() => navigateTo(query.to as RouteLocationRaw))
        useNotification('Đăng nhập thành công!')
    },
    onError: () => useNotificationError()
})

export const useAuthLogout = () => {
    // return useQuery({
    //     queryKey: [queryKey.signOut],
    //     queryFn: () => useAuthFetcher(pathKey.signOut),
    //     enabled: false
    // })
}

export const useAuthForgotPassword = () => useMutation<IAuthForgotPasswordForm, Error, IAuthForgotPasswordForm>({
    mutationFn: body => useFetcher(pathKey.forgotPassword, {
        method: 'POST',
        body
    }),
    onSuccess: () => useNotification('Thành Công!'),
    onError: () => useNotificationError()
})
