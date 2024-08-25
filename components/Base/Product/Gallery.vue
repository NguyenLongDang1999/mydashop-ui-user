<script setup lang="ts">

// ** Props & Emits
interface Props {
    product: IFlashDealProduct
}

defineProps<Props>()

// ** Data
const thumbsSwiper = ref()
</script>

<template>
    <Swiper
        :space-between="10"
        :thumbs="{ swiper: thumbsSwiper }"
        :modules="[SwiperFreeMode, SwiperThumbs]"
    >
        <SwiperSlide>
            <NuxtImg
                :alt="product.name"
                :src="product.image_uri"
                class="rounded-md w-full"
            />

            <div
                v-if="product.flashDeal"
                class="absolute bg-red-600 text-white px-2 py-1 text-xs rounded-br-md rounded-tl-md left-0 top-0 truncate max-w-40"
            >
                {{ product.flashDeal.title }}
            </div>
        </SwiperSlide>

        <SwiperSlide
            v-for="data in product.productImages"
            :key="data.image_uri"
        >
            <NuxtImg
                :alt="product.name"
                :src="data.image_uri"
                class="rounded-md w-full"
            />
        </SwiperSlide>
    </Swiper>

    <Swiper
        :space-between="10"
        :slides-per-view="4"
        :modules="[SwiperFreeMode, SwiperThumbs]"
        free-mode
        watch-slides-progress
        class="mt-3"
        @swiper="swiper => thumbsSwiper = swiper"
    >
        <SwiperSlide>
            <NuxtImg
                :alt="product.name"
                :src="product.image_uri"
                class="rounded-md w-full"
            />
        </SwiperSlide>

        <SwiperSlide
            v-for="data in product.productImages"
            :key="data.image_uri"
        >
            <NuxtImg
                :alt="product.name"
                :src="data.image_uri"
                class="rounded-md w-full"
            />
        </SwiperSlide>
    </Swiper>
</template>
