<script setup lang="ts">

// ** Data
const { isFetching, dataTable, dataAggregations } = inject('product') as ICrudTableOptions<IProduct>
const search = inject('search') as IProductCategoryFilter
</script>

<template>
    <div class="grid gap-4 grid-cols-12">
        <template v-if="!isFetching">
            <BaseProductCard
                v-for="product in dataTable"
                :key="product.id"
                :product="product"
                class="xl:col-span-3 lg:col-span-4 md:col-span-4 col-span-6"
            />

            <div class="mt-10 flex justify-center col-span-12">
                <ProductCategoryPagePagination :product-aggregations="dataAggregations" />
            </div>
        </template>

        <template v-else>
            <div
                v-for="product in search.pageSize"
                :key="product"
                class="xl:col-span-3 lg:col-span-4 md:col-span-4 col-span-6"
            >
                <USkeleton class="h-48 w-full" />

                <div class="space-y-2 mt-2">
                    <USkeleton
                        v-for="item in 4"
                        :key="item"
                        class="h-3 w-full"
                    />
                </div>
            </div>
        </template>
    </div>
</template>
