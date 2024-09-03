<script setup lang="ts">

// ** useHooks
const { data: user } = useAuthProfile()

// ** Data
const navUserInfo = computed(() => ([
    {
        href: ROUTER.USERS_OVERVIEW,
        icon: 'i-heroicons-squares-2x2',
        label: 'Thông tin chung'
    },
    {
        href: ROUTER.USERS_ORDER_HISTORY,
        icon: 'i-heroicons-shopping-bag',
        label: 'Lịch sử đơn hàng'
    },
    {
        href: ROUTER.USERS_CHANGE_PASSWORD,
        icon: 'i-heroicons-key',
        label: 'Đổi mật khẩu'
    }
]))
</script>

<template>
    <div class="py-6 lg:rounded-2xl lg:shadow-lg bg-white">
        <div class="flex flex-col items-center justify-center mb-5">
            <NuxtLink
                aria-current="page"
                href="/account/overview#"
                class="active router-link-exact-active w-20 h-20 mb-3 rounded-full border border-primary"
            >
                <NuxtImg
                    :src="user?.image_uri"
                    :alt="user?.name"
                    :title="user?.name"
                    class="w-full h-full object-cover rounded-full border-2 border-white"
                />
            </NuxtLink>

            <h3 class="capitalize text-lg font-semibold text-center mb-0.5">
                {{ user?.name }}
            </h3>

            <p class="text-center text-text">
                {{ user?.phone }}
            </p>
        </div>

        <nav class="flex flex-col">
            <NuxtLink
                v-for="nav in navUserInfo"
                :key="nav.href"
                :href="nav.href"
                class="profile-link font-medium flex items-center gap-4 capitalize py-3 px-4 group hover:text-primary transition-all duration-500"
                active-class="text-primary"
            >
                <UIcon
                    :name="nav.icon"
                    size="20"
                    class="group-hover:text-primary transition-all duration-500"
                />
                <span class="font-semibold">{{ nav.label }}</span>
            </NuxtLink>
        </nav>
    </div>
</template>
