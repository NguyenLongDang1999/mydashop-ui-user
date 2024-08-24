<script setup lang="ts">

// ** Props & Emits
interface Props {
    categoryList?: IProductCategory[]
    categoryBrand?: IProductBrand[]
    categoryAttribute?: IProductAttribute[]
}

defineProps<Props>()

// ** Data
const { dataTable } = inject('product') as ICrudTableOptions<IProduct>

// ** Data
const isList = ref<boolean>(false)
const isOpen = ref<boolean>(false)
</script>

<template>
    <div class="lg:w-[calc(100%-288px)] w-full">
        <div class="mb-3 lg:hidden block">
            <UButton
                icon="i-heroicons-bars-3-center-left"
                label="Bộ Lọc Tìm Kiếm"
                size="md"
                variant="soft"
                @click="isOpen = true"
            />

            <USlideover
                v-model="isOpen"
                side="left"
            >
                <UCard
                    class="flex flex-col flex-1 overflow-y-auto"
                    :ui="{ body: { base: 'flex-1 overflow-y-auto scroll-py-10' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
                >
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white capitalize">
                                Bộ lọc tìm kiếm
                            </h3>

                            <UButton
                                color="gray"
                                variant="ghost"
                                icon="i-heroicons-x-mark-20-solid"
                                class="-my-1"
                                @click="isOpen = false"
                            />
                        </div>
                    </template>

                    <div class="overflow-x-hidden">
                        <ProductCategoryPageFilter
                            :category-list="categoryList"
                            :category-brand="categoryBrand"
                            :category-attribute="categoryAttribute"
                            :close-filter="() => isOpen = false"
                        />
                    </div>
                </UCard>
            </USlideover>
        </div>

        <ProductCategoryPageSort @category-view="val => isList = val" />

        <template v-if="dataTable.length">
            <ProductCategoryPageList v-if="isList" />
            <ProductCategoryPageGrid v-else />
        </template>

        <ProductCategoryPageEmpty v-else />
    </div>
</template>
