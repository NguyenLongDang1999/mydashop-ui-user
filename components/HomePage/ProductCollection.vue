<script setup lang="ts">

// ** Props & Emits
interface Props {
    productCollection: IProductCollection[]
}

defineProps<Props>()
</script>

<template>
    <template
        v-for="collection in productCollection"
        :key="collection.id"
    >
        <section class="grid grid-cols-12 mt-10">
            <div class="col-span-12">
                <div class="flex items-center justify-between">
                    <h2 class="uppercase font-bold md:text-3xl sm:text-2xl text-xl">
                        {{ collection.title }}
                    </h2>
                </div>

                <div class="mt-5">
                    <Swiper
                        :space-between="10"
                        :slides-per-view="1"
                        :breakpoints="{
                            1200: {
                                slidesPerView: 5,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            460: {
                                slidesPerView: 2,
                            },
                            360: {
                                slidesPerView: 1,
                            },
                        }"
                        class="!overflow-visible"
                    >
                        <SwiperSlide
                            v-for="product in collection.product"
                            :key="product.id"
                        >
                            <BaseProductCard :product="product" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    </template>
</template>
