<script setup lang="ts">

// ** useHooks
const { dataList: categoryList } = await useProductCategoryDataListNested()
const { data: metadata } = await useMetadata()

const {
    data,
    path,
    isFetching,
    dataTable,
    dataAggregations,
    search,
    searchTemp
} = await useProductCategoryRetrieve()

if (!data.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found'
    })
}

// ** Methods
const valueSystem = (key: string) => getValueBySlug(key, metadata.value?.system)

// ** Computed
const dataSystem = computed(() => {
    return {
        system_website_name: valueSystem('system_website_name') || 'Mydashop',
        system_website_motto: valueSystem('system_website_motto') || 'Mua và bán'
    }
})

// ** Meta SEO
useSEO({
    ...data.value,
    ...dataSystem.value
}, path)

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
        <BaseBreadcrumbsCategoryNested
            v-once
            :title="data.name"
            :category-id="data.id"
            page-category
        />

        <UContainer>
            <section
                v-once
                class="mt-20"
            >
                <BaseProductCategoryTitle
                    :image="data.image_uri"
                    :title="data.name"
                    :description="data.description"
                />
            </section>

            <section class="mt-20">
                <div class="flex">
                    <section class="w-64 mr-7 lg:flex gap-4 flex-col hidden">
                        <div class="overflow-y-auto lg:max-h-[calc(100vh-64px)] lg:sticky lg:top-16 lg:px-4 lg:-mx-4">
                            <ProductCategoryPageFilter
                                :category-list="categoryList"
                                :category-brand="data.productBrands"
                                :category-attribute="data.productAttributes"
                            />
                        </div>
                    </section>

                    <ProductCategoryPageProduct
                        :category-list="categoryList"
                        :category-brand="data.productBrands"
                        :category-attribute="data.productAttributes"
                    />
                </div>
            </section>
        </UContainer>
    </main>
</template>
