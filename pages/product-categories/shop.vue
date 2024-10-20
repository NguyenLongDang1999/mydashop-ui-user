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

useProductCategoryFilter(search)

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
                    description="Khám phá những sản phẩm tinh tế, được tuyển chọn kỹ lưỡng để mang đến trải nghiệm mua sắm tuyệt vời và giá trị vượt trội cho bạn."
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
