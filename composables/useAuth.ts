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
    signUp: `${path.value}/sign-up`,
    signOut: `${path.value}/sign-out`,
    profile: `${path.value}/profile`,
    forgotPassword: `${path.value}/forgot-password`
}

export const useAuthTest = () => useState<boolean>('isLoggedIn', () => false)

export const useAuthRegister = () => useMutation<IAuthRegisterForm, Error, IAuthRegisterForm>({
    mutationFn: body => useFetcher(pathKey.signUp, {
        method: 'POST',
        body
    }),
    onSuccess: () => {
        const { query } = useRoute()
        const isLoggedIn = useAuthTest()

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
    const { data: isLoggedIn } = useAuth()

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
