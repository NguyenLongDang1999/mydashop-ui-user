<script setup lang="ts">

// ** useHooks
const {
    slider,
    productCategories
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

            <HomePageProductCollection />
            <!--
              <HomePageFlashDeals
              v-if="flashDeals?.product_flash_deals.length"
              :flash-deals="flashDeals"
              />

              <HomePageCollection
              v-if="productCollection?.length"
              :product-collection="productCollection"
              />
            -->
        </UContainer>
    </main>
</template>
