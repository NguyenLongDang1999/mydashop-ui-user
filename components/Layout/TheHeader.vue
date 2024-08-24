<script setup lang="ts">

// ** Types Imports
import type { DropdownItem } from '#ui/types'

// ** useHooks
const { fullPath } = useRoute()

// ** Data
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
    <header class="bg-white border-b -mb-px sticky top-0 z-50 border-gray-200 dark:border-gray-800">
        <UContainer>
            <div class="flex items-center justify-between gap-3 h-16">
                <div class="lg:flex-1 flex items-center gap-1.5">
                    <LayoutTheLogo />
                </div>

                <nav>
                    <ul class="gap-x-8 hidden lg:flex">
                        <li
                            v-for="nav in navigation"
                            :key="nav.to"
                            class="relative"
                        >
                            <NuxtLink
                                class="text-sm/6 font-semibold capitalize flex items-center gap-1 transition-colors hover:text-primary"
                                :to="nav.to"
                                active-class="text-primary"
                            >
                                {{ nav.label }}
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>

                <div class="flex items-center justify-end lg:flex-1 gap-1">
                    <UDropdown
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
                </div>
            </div>
        </UContainer>
    </header>
</template>
