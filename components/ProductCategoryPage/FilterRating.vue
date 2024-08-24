<script setup lang="ts">

// ** Types Imports
import type { AccordionItem } from '#ui/types'

// ** Data
const searchTemp = inject('searchTemp') as IProductCategoryFilter
const items: AccordionItem[] = [{ label: 'Đánh giá' }]
</script>

<template>
    <nav class="space-y-3">
        <UAccordion
            :items="items"
            :ui="{
                item: { base: 'mb-0 pl-4 border-l border-gray-200 dark:border-gray-800 ml-2' }
            }"
            multiple
            default-open
        >
            <template #default="{ item, open }">
                <UButton
                    color="gray"
                    variant="link"
                    :padded="false"
                    :ui="{
                        strategy: 'override',
                        base: 'flex items-center gap-1.5 group mb-2 w-full focus-visible:outline-primary border-transparent',
                    }"
                    :class="item.defaultOpen ? '!text-primary' : ''"
                    class="hover:no-underline"
                >
                    <NuxtLink :to="item.to">
                        <span class="text-sm/6 font-semibold truncate capitalize">{{ item.label }}</span>
                    </NuxtLink>

                    <template #trailing>
                        <UIcon
                            name="i-heroicons-chevron-right-20-solid"
                            class="w-5 h-5 ms-auto transform transition-transform duration-200"
                            :class="[open && 'rotate-90']"
                        />
                    </template>
                </UButton>
            </template>

            <template #item>
                <ul class="flex flex-col gap-2 mb-4">
                    <li
                        v-for="rating in ratingOption"
                        :key="rating.id"
                        class="capitalize"
                    >
                        <UCheckbox
                            v-model="searchTemp.productRating"
                            :name="rating.label"
                            :value="rating.id"
                            :label="rating.label"
                        />
                    </li>
                </ul>
            </template>
        </UAccordion>
    </nav>
</template>
