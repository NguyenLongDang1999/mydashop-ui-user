<template>
    <header class="bg-white border-b -mb-px sticky top-0 z-50 border-gray-200 dark:border-gray-800">
        <UContainer>
            <div class="flex items-center justify-between gap-3 h-16">
                <div
                    v-once
                    class="lg:flex-1 flex items-center gap-1.5"
                >
                    <LayoutTheLogo />
                </div>

                <nav v-once>
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
                    <BaseDropdownAuth />
                </div>
            </div>
        </UContainer>
    </header>
</template>
