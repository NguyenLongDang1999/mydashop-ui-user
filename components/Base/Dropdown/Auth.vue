<script setup lang="ts">

// ** Types Imports
import type { DropdownItem } from '#ui/types'

// ** useHooks
const isLoggedIn = useAuth()
const { pathKey } = useAuthState()
const { fullPath } = useRoute()
const { data: user } = useAuthProfile()

// ** Watch
const accessToken = useCookie('accessToken')

// ** Watch
watch(accessToken, () => isLoggedIn.value = !!accessToken.value, {
    immediate: true
})

// ** Data
const authLogined: DropdownItem[][]  = [
    [{
        label: 'Account',
        slot: 'account',
        disabled: true
    }], [{
        label: 'Thông tin tài khoản',
        icon: 'i-heroicons-home',
        to: '/thong-tin-tai-khoan'
    }, {
        label: 'Đổi mật khẩu',
        icon: 'i-heroicons-lock-closed',
        to: '/thong-tin-tai-khoan/doi-mat-khau'
    }], [{
        label: 'Sản phẩm yêu thích',
        icon: 'i-heroicons-heart',
        to: '/thong-tin-tai-khoan/san-pham-yeu-thich'
    }, {
        label: 'Quản lý tài khoản',
        icon: 'i-heroicons-user',
        to: '/thong-tin-tai-khoan/quan-ly-tai-khoan'
    }], [{
        label: 'Đăng Xuất',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        click: async () => {
            useFetchData(pathKey.signOut)
                .then(() => {
                    isLoggedIn.value = false

                    nextTick(() => navigateTo(ROUTER.AUTH_LOGIN))
                    useNotification('Đăng xuất thành công')
                })
                .catch(() => useNotificationError())
        }
    }]
]

const authNoLogin: DropdownItem[][] = [
    [{
        label: 'Đăng nhập',
        icon: 'i-heroicons-arrow-right-on-rectangle',
        to: '/dang-nhap?to=' + fullPath
    },
    {
        label: 'Đăng ký',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        to: '/dang-ky?to=' + fullPath
    }]
]
</script>

<template>
    <UDropdown
        v-if="isLoggedIn"
        :items="authLogined"
        :ui="{ item: { disabled: 'cursor-text select-text', base: 'capitalize' } }"
        :popper="{ placement: 'bottom-start' }"
    >
        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />

        <template #account>
            <div class="text-left w-full">
                <p class="font-medium text-gray-900 dark:text-white">
                    {{ user?.name }}
                </p>
            </div>
        </template>

        <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>

            <UIcon
                :name="item.icon"
                class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
        </template>
    </UDropdown>

    <UDropdown
        v-else
        :items="authNoLogin"
        :ui="{ item: { disabled: 'cursor-text select-text', base: 'capitalize' } }"
        :popper="{ placement: 'bottom-start' }"
    >
        <UTooltip text="Đăng Nhập">
            <UButton
                icon="i-heroicons-user"
                size="sm"
                square
                variant="link"
                color="gray"
            />
        </UTooltip>

        <template #account="{ item }">
            <div class="text-left w-full">
                <p class="font-medium text-gray-900 dark:text-white">
                    {{ item.label }}
                </p>
            </div>
        </template>

        <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>

            <UIcon
                :name="item.icon"
                class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
        </template>
    </UDropdown>
</template>
