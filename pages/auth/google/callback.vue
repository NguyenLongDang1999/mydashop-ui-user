<script setup lang="ts">

definePageMeta({
    layout: false
})

// ** useHooks
const route = useRoute()

// ** Data
const isLoading = ref<boolean>(true)
const message = ref<string>('Đang xử lý đăng nhập với Google...')

if (route.query.code) {
    const { pathKey } = useAuthState()

    try {
        await useFetchData<{ message: string }>(pathKey.loginGoogleCallback, {
            params: route.query,
            server: false,
            lazy: true
        })

        message.value = 'Đăng nhập thành công! Đang chuyển hướng...'

        const isLoggedIn = useAuth()

        isLoggedIn.value = true

        setTimeout(() => {
            navigateTo('/', { replace: true })
        }, 6000)
    } catch (error) {
        message.value = 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.'
        isLoading.value = false
    }
} else {
    message.value = 'Không tìm thấy mã code. Vui lòng thử lại.'
    isLoading.value = false
}
</script>

<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="p-6 max-w-md bg-white rounded-lg shadow-md">
            <div class="flex items-center justify-center">
                <svg
                    v-if="isLoading"
                    class="animate-spin h-8 w-8 text-blue-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    />
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>

                <h2 class="text-lg font-semibold text-gray-700">
                    {{ message }}
                </h2>
            </div>
        </div>
    </div>
</template>
