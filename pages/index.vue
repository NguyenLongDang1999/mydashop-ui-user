<script setup lang="ts">

// ** useHooks
const {
    slider,
    productCategories,
    productCollection
} = await useHomeData()
</script>

<template>
    <main>
        <HomePageCarousel :slider="slider" />

        <UContainer>
            <HomePageProductCategory
                v-if="productCategories?.length"
                :product-categories="productCategories"
            />

            <HomePageProductCollection
                v-if="productCollection?.length"
                :product-collection="productCollection"
            />

            <!--
              <HomePageFlashDeals
              v-if="flashDeals?.product_flash_deals.length"
              :flash-deals="flashDeals"
              />
            -->
        </UContainer>
    </main>
</template>
