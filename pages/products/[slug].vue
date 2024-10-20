<script setup lang="ts">

// ** Types Imports
import type { TabItem } from '#ui/types'

// ** useHooks
const { data, path } = await useProductRetrieve()

if (!data.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found'
    })
}

// ** Data
const productDescription: TabItem[] = [{
    slot: 'product-description',
    label: 'Chi Tiết Sản Phẩm'
}, {
    slot: 'product-comment',
    label: 'Đánh Giá'
}]

// ** Meta SEO
useSEO({
    ...data.value
}, path)
</script>

<template>
    <main>
        <BaseBreadcrumbs
            v-once
            :title="data.name"
            :breadcrumb="data.breadcrumb"
        />

        <UContainer>
            <section class="mt-10">
                <div class="grid gap-4 grid-cols-12">
                    <div
                        v-once
                        class="lg:col-span-5 sm:col-span-8 col-span-12"
                    >
                        <BaseProductGallery :product="data" />
                    </div>

                    <div class="lg:col-span-7 col-span-12">
                        <h1 class="capitalize font-semibold text-xl">
                            {{ data.name }}
                        </h1>

                        <BaseProductStarRatings
                            v-once
                            class="mt-2"
                            :model-value="Number(data.total_rating)"
                            :star-size="14"
                            disable-click
                        />

                        <BaseProductInformation
                            :product="data"
                            class="mt-3"
                        />

                        <p
                            v-if="data.short_description"
                            class="tracking-wide my-2"
                        >
                            {{ data.short_description }}
                        </p>

                        <ClientOnly>
                            <BaseProductAddToCart :product="data" />
                        </ClientOnly>

                        <div
                            v-once
                            class="mt-2 flex items-center gap-2"
                        >
                            <span class="capitalize font-semibold">Chia sẻ:</span>

                            <div class="flex flex-row gap-2">
                                <SocialShare
                                    v-for="network in ['facebook', 'twitter', 'telegram']"
                                    :key="network"
                                    :network="network"
                                    :label="false"
                                    styled
                                    class="p-1 rounded-full text-white text-xs"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="col-span-12">
                        <UTabs
                            :items="productDescription"
                            class="mt-10"
                        >
                            <template #product-description>
                                <template v-if="data.technical_specifications?.length">
                                    <h3 class="text-lg capitalize mb-1 font-bold">
                                        Thông số kỹ thuật
                                    </h3>

                                    <ul class="border-gray-200 dark:border-gray-700 border rounded-md mb-4">
                                        <li
                                            v-for="specification in data.technical_specifications"
                                            :key="specification.title"
                                            class="flex border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                                        >
                                            <span class="flex-1 capitalize font-semibold border-r border-gray-200 dark:border-gray-700 px-3 py-2">{{ specification.title }}</span>
                                            <span class="flex-1 px-3 py-2">{{ specification.content }}</span>
                                        </li>
                                    </ul>
                                </template>

                                <template v-if="data.description">
                                    <h3 class="text-lg capitalize mb-1 font-bold">
                                        Mô tả chi tiết
                                    </h3>

                                    <div
                                        class="font-[Quicksand] text-left"
                                        v-html="data.description"
                                    />
                                </template>
                            </template>

                            <template #product-comment>
                                <!--
                                  <LazyProductPageComment
                                  :product-id="data.id"
                                  :total-rating="data.total_rating"
                                  />
                                -->
                            </template>
                        </UTabs>
                    </div>
                </div>
            </section>
        </UContainer>
    </main>
</template>
