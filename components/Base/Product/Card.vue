<template>
    <UCard
        v-once
        class="group text-left"
        :ui="{
            strategy: 'override',
            shadow: '',
            base: 'overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary',
            body: { padding: 'p-3' }
        }"
    >
        <div class="relative h-0 pb-[100%]">
            <NuxtLink to="/">
                <!-- <NuxtImg
                    :src="product.image_uri"
                    :alt="product.name"
                    :title="product.name"
                    loading="lazy"
                    width="600"
                    height="600"
                    class="w-full rounded-md"
                /> -->
            </NuxtLink>

            <div class="absolute right-0 top-0 h-16 w-16">
                <div class="absolute transform rotate-45 bg-red-600 text-center text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
                    20% off
                </div>
            </div>
        </div>

        <div class="mt-3 flex gap-1 flex-col">
            <!-- <BaseStarRatings
                :model-value="Number(product.total_rating)"
                :star-size="14"
                disable-click
            /> -->

            <NuxtLink
                to="/"
                class="inline-block mt-1 capitalize"
            >
                <h6 class="font-medium line-clamp-1 text-gray-400 text-xs hover:text-primary">
                    Thời trang nữ
                </h6>
            </NuxtLink>

            <NuxtLink
                to="/"
                class="block h-12 capitalize"
            >
                <h4 class="text-sm font-semibold line-clamp-2 hover:text-primary">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                </h4>
            </NuxtLink>

            <div class="flex items-center">
                <BaseProductPrice
                    :price="200000"
                    selling-price="250000"
                />
            </div>

            <ClientOnly>
                <div class="flex flex-row mt-2">
                    <div class="basis-1/3">
                        <UButton
                            size="sm"
                            color="white"
                            icon="i-heroicons-heart"
                            variant="ghost"
                        />
                    </div>

                    <div class="basis-2/3">
                        <UButton
                            size="sm"
                            variant="outline"
                            block
                            label="Mua Ngay"
                        />
                    </div>
                </div>
            </ClientOnly>
        </div>
    </UCard>
</template>
