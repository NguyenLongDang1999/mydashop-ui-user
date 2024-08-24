<script setup lang="ts">

// ** useHooks
const { dataList: categoryList } = await useProductCategoryDataListNested()

const {
    isFetching,
    dataTable,
    dataAggregations,
    search,
    searchTemp
} = await useProductCategoryListShop()

provide('product', {
    isFetching,
    dataTable,
    dataAggregations
})

provide('search', search)
provide('searchTemp', searchTemp)
</script>

<template>
    <main>
        <BaseBreadcrumbs
            v-once
            title="Cửa hàng"
        />

        <UContainer>
            <section
                v-once
                class="mt-20"
            >
                <BaseProductCategoryTitle
                    icon="i-heroicons-building-storefront"
                    title="Cửa Hàng"
                    description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nisi sed rerum pariatur quasi quisquam omnis unde nemo deleniti tenetur neque quod architecto amet sunt, modi a dolores voluptate repellat."
                />
            </section>

            <section class="mt-20">
                <div class="flex">
                    <section class="w-64 mr-7 lg:flex gap-4 flex-col hidden">
                        <div class="overflow-y-auto lg:max-h-[calc(100vh-64px)] lg:sticky lg:top-16 lg:px-4 lg:-mx-4">
                            <ProductCategoryPageFilter :category-list="categoryList" />
                        </div>
                    </section>

                    <ProductCategoryPageProduct :category-list="categoryList" />
                </div>
            </section>
        </UContainer>
    </main>
</template>
