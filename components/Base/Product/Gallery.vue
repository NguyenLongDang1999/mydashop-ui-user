<script setup lang="ts">

// ** Props & Emits
interface Props {
    product: IFlashDealProduct
}

const props = defineProps<Props>()

// ** Data
const thumbsSwiper = ref()

// ** Computed
const productImages = computed(() => [props.product, ...props.product.productImages])
</script>

<template>
    <Swiper
        :space-between="10"
        :thumbs="{ swiper: thumbsSwiper }"
        :modules="[SwiperFreeMode, SwiperThumbs]"
    >
        <SwiperSlide
            v-for="data in productImages"
            :key="data.image_uri"
        >
            <NuxtImg
                :alt="product.name"
                :src="data.image_uri"
                class="rounded-md w-full"
            />

            <div
                v-if="product.flashDeal"
                class="absolute bg-red-600 text-white px-2 py-1 text-xs rounded-br-md rounded-tl-md left-0 top-0 truncate max-w-40"
            >
                {{ product.flashDeal.title }}
            </div>
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
        <SwiperSlide
            v-for="data in productImages"
            :key="data.image_uri"
            class="[&.swiper-slide-thumb-active]:opacity-100 opacity-40"
        >
            <NuxtImg
                :alt="product.name"
                :src="data.image_uri"
                class="rounded-md w-full"
            />
        </SwiperSlide>
    </Swiper>
</template>
