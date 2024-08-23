<script setup lang="ts">

// ** Props & Emits
interface Props {
    productFlashDeals: IProductFlashDeals
}

defineProps<Props>()
</script>

<template>
    <section
        v-if="productFlashDeals.flashDealProducts"
        v-once
        class="mt-10 relative"
    >
        <div class="flex items-center justify-between">
            <BaseTitle
                icon
                :title="productFlashDeals.title"
            />

            <div class="absolute top-1 right-0 flex gap-1">
                <UButton
                    icon="i-heroicons-arrow-left"
                    size="sm"
                    square
                    variant="solid"
                    class="swiper-btn-prev [&.swiper-button-disabled]:op-30"
                />

                <UButton
                    icon="i-heroicons-arrow-right"
                    size="sm"
                    square
                    variant="solid"
                    class="swiper-btn-next [&.swiper-button-disabled]:op-30"
                />
            </div>
        </div>

        <div class="mt-5">
            <Swiper
                observer
                observe-parents
                :modules="[SwiperNavigation]"
                :space-between="10"
                :navigation="{
                    nextEl: '.swiper-btn-next',
                    prevEl: '.swiper-btn-prev',
                }"
                :allow-touch-move="false"
                :slides-per-view="1.2"
                class="!overflow-visible"
            >
                <SwiperSlide
                    v-for="product in productFlashDeals.flashDealProducts"
                    :key="product.id"
                >
                    <UCard
                        :ui="{
                            strategy: 'override',
                            shadow: '',
                            base: 'overflow-hidden',
                        }"
                    >
                        <div class="grid grid-cols-12 gap-4">
                            <div class="lg:col-span-6 col-span-12">
                                <BaseProductGallery :product="product" />
                            </div>

                            <div class="lg:col-span-6 col-span-12 text-left">
                                <NuxtLink
                                    :to="navigateProduct(product.slug)"
                                    class="line-clamp-2"
                                >
                                    <h3 class="capitalize font-semibold text-lg transition-colors hover:text-primary">
                                        {{ product.name }}
                                    </h3>
                                </NuxtLink>

                                <BaseProductStarRatings
                                    v-model="product.total_rating"
                                    class="mt-1 mb-2"
                                    disable-click
                                    :star-size="14"
                                />

                                <BaseProductInformation :product="product" />

                                <p
                                    v-if="product.short_description"
                                    class="tracking-wide my-2"
                                >
                                    {{ product.short_description }}
                                </p>

                                <ClientOnly>
                                    <BaseProductAddToCart :product="product" />
                                </ClientOnly>
                            </div>
                        </div>
                    </UCard>
                </SwiperSlide>
            </Swiper>
        </div>
    </section>
</template>
