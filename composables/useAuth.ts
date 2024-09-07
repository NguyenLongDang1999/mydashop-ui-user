// ** State
const path = ref<string>(ROUTE.AUTH)

const pathKey = {
    signIn: `${path.value}/sign-in`,
    signUp: `${path.value}/sign-up`,
    signOut: `${path.value}/sign-out`,
    profile: `${path.value}/profile`,
    changePassword: `${path.value}/change-password`,
    forgotPassword: `${path.value}/forgot-password`,
    resetPassword: `${path.value}/reset-password`
}

export const useAuthState = () => {
    return {
        pathKey
    }
}

export const useAuth = () => useState<boolean>('isLoggedIn', () => false)

export const useAuthProfile = () => {
    // ** useHooks
    const isLoggedIn = useAuth()

    const { data, execute } = useFetchData(pathKey.profile, {
        lazy: true,
        server: false,
        immediate: false
    })

    // ** Computed
    const profile = computed(() => data.value as IAuthProfile)

    // ** Watch
    watch(isLoggedIn, loggedIn => {
        if (loggedIn) {
            execute()
        }
    }, { immediate: true })

    return {
        data: profile
    }
}
