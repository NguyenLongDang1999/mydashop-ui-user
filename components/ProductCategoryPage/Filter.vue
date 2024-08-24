<script setup lang="ts">

// ** Props & Emits
interface Props {
    categoryList?: IProductCategory[]
    categoryBrand?: IProductBrand[]
    categoryAttribute?: IProductAttribute[]
    closeFilter?: () => void
}

const props = defineProps<Props>()

// ** useHooks
const route = useRoute()

const { scrollToTop } = useAnchorScroll({
    toTop: {
        scrollOptions: {
            behavior: 'smooth',
            offsetTop: 0
        }
    }
})

// ** Data
const search = inject('search') as IProductCategoryFilter
const searchTemp = inject('searchTemp') as IProductCategoryFilter
const categoryList: IProductCategory[] = props.categoryList ? _cloneDeep(props.categoryList) : []

let items = categoryList.map(_categoryItem => ({
    ..._categoryItem,
    to: navigateCategory(_categoryItem.slug),
    defaultOpen: areValuesEqual(route.path, navigateCategory(_categoryItem.slug))
})) || []

// ** Methods
const updateDefaultOpen = (_categoryList: IProductCategory[]): boolean => {
    for (const category of _categoryList) {
        if (areValuesEqual(route.path, navigateCategory(category.slug))) {
            category.defaultOpen = true

            return true
        }

        if (category.children && updateDefaultOpen(category.children)) {
            category.defaultOpen = true

            return true
        }
    }

    return false
}

const handleFilter = () => {
    _assign(search, searchTemp)

    navigateTo({
        path: route.path,
        query: { ...search }
    })

    if (props.closeFilter) {
        props.closeFilter()
    }

    scrollToTop()
}

updateDefaultOpen(items)
</script>

<template>
    <div class="flex flex-col">
        <h3 class="my-1.5 font-semibold text-lg capitalize flex items-center gap-2">
            <UIcon
                name="i-heroicons-squares-2x2"
                class="w-5 h-5"
            />
            Tất cả danh mục
        </h3>

        <nav class="space-y-3">
            <UAccordion
                :items="items"
                :ui="{
                    item: { base: 'mb-3' }
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
                            base: 'flex items-center gap-1.5 group mb-2 w-full focus-visible:outline-primary border-transparent',
                        }"
                        :class="item.defaultOpen ? '!text-primary' : ''"
                        class="hover:no-underline"
                    >
                        <template #leading>
                            <NuxtImg
                                :src="item.image_uri"
                                :alt="item.name"
                                class="rounded-full w-6 h-6 object-cover"
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
                                name="i-heroicons-chevron-right-20-solid"
                                class="w-5 h-5 ms-auto transform transition-transform duration-200"
                                :class="[open && 'rotate-90']"
                            />
                        </template>
                    </UButton>
                </template>

                <template #item="{ item }">
                    <ProductCategoryPageFilterNested :categories="item" />
                </template>
            </UAccordion>
        </nav>
    </div>

    <div class="flex items-center align-center text-center w-full flex-row my-4">
        <div class="flex border-gray-200 dark:border-gray-800 w-full border-t border-dashed" />
    </div>

    <ProductCategoryPageFilterAdvance
        :category-brand="categoryBrand"
        :category-attribute="categoryAttribute"
    />

    <UButton
        size="sm"
        block
        label="Xác Nhận"
        @click="handleFilter"
    />
</template>
