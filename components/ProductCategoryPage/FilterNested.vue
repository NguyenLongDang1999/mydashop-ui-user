<script setup lang="ts">

// ** Props & Emits
interface Props {
    categories: IProductCategory
}

const props = defineProps<Props>()

// ** useHooks
const route = useRoute()

// ** Data
const items = ref(props.categories.children.map(_categoryItem => ({
    ..._categoryItem,
    to: navigateCategory(_categoryItem.slug),
    defaultOpen: areValuesEqual(route.path, navigateCategory(_categoryItem.slug))
})))

// ** Methods
const updateDefaultOpen = (_categoryList: IProductCategory[]) => {
    for (const category of _categoryList) {
        if (areValuesEqual(route.path, navigateCategory(category.slug))) {
            category.defaultOpen = true

            return true
        }

        if (category.children && category.children.length > 0) {
            if (updateDefaultOpen(category.children)) {
                category.defaultOpen = true

                return true
            }
        } else {
            continue
        }
    }

    return false
}

updateDefaultOpen(items.value)
</script>

<template>
    <UAccordion
        :items="items"
        :ui="{
            item: { base: 'mb-0 pl-4 border-l border-gray-200 dark:border-gray-800 ml-2' }
        }"
        multiple
    >
        <template #default="{ item, open }">
            <UButton
                color="gray"
                variant="link"
                :padded="false"
                :ui="{
                    strategy: 'override',
                    base: 'flex items-center group w-full focus-visible:outline-primary border-l border-gray-200 dark:border-gray-800 ml-2 py-1',
                    font: 'font-semibold'
                }"
                :class="item.defaultOpen ? '!text-primary' : ''"
                class="hover:no-underline rounded-none"
            >
                <template #leading>
                    <NuxtImg
                        :src="item.image_uri"
                        :alt="item.name"
                        class="rounded-full w-6 h-6 object-cover ml-4 "
                    />
                </template>

                <NuxtLink
                    :to="item.to"
                    class="truncate"
                >
                    <span class="text-sm/6 font-semibold capitalize">{{ item.name }}</span>
                </NuxtLink>

                <template #trailing>
                    <UIcon
                        v-if="item.children.length"
                        name="i-heroicons-chevron-right-20-solid"
                        class="w-5 h-5 ms-auto transform transition-transform duration-200 mr-2"
                        :class="[open && 'rotate-90']"
                    />
                </template>
            </UButton>
        </template>

        <template #item="{ item }">
            <ProductCategoryPageFilterNested :categories="item" />
        </template>
    </UAccordion>
</template>
