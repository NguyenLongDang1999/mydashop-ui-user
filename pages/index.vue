<script setup lang="ts">

// ** useHooks
const {
    slider,
    productFlashDeals,
    productCategories,
    productCollection
} = await useHomeData()
</script>

<template>
    <main>
        <UContainer>
            <HomePageCarousel :slider="slider" />

            <HomePageProductFlashDeals
                v-if="productFlashDeals?.flashDealProducts?.length"
                :product-flash-deals="productFlashDeals"
            />

            <HomePageProductCategory
                v-if="productCategories?.length"
                :product-categories="productCategories"
            />

            <HomePageProductCollection
                v-if="productCollection?.length"
                :product-collection="productCollection"
            />
        </UContainer>
    </main>
</template>
