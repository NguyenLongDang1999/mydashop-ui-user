<script setup lang="ts">

// ** Props & Emits
interface Props {
    product: IProduct
}

const props = defineProps<Props>()

// ** useHooks
const isLoggedIn = useAuth()
const { mutateAsync: mutateAsyncWishlistCreate } = useWishlistCreate()
const { mutateAsync: mutateAsyncWishlistDelete } = useWishlistDelete()

const handleWishlist = () => {
    if (isLoggedIn.value) {
        if (!props.product.isWishlist) {
            return mutateAsyncWishlistCreate({
                product_id: props.product.id
            })
        } else {
            return mutateAsyncWishlistDelete({
                product_id: props.product.id
            })
        }
    } else {
        return navigateTo(ROUTER.AUTH_LOGIN)
    }
}
</script>

<template>
    <UCard
        v-once
        class="text-left"
        :ui="{
            strategy: 'override',
            shadow: '',
            base: 'relative overflow-hidden',
            body: { padding: 'p-3' }
        }"
    >
        <div class="h-0 pb-[100%]">
            <NuxtLink :to="navigateProduct(product.slug)">
                <NuxtImg
                    :src="product.image_uri"
                    :alt="product.name"
                    :title="product.name"
                    loading="lazy"
                    width="600"
                    height="600"
                    class="w-full rounded-md"
                />
            </NuxtLink>

            <div
                v-if="product.flashDeal"
                class="absolute bg-red-600 text-white px-2 py-1 text-xs rounded-br-md left-0 top-0 truncate max-w-40"
            >
                {{ product.flashDeal.title }}
            </div>
        </div>

        <div class="mt-3 flex gap-1 flex-col">
            <BaseProductStarRatings
                v-once
                class="mt-2"
                :model-value="Number(product.total_rating)"
                :star-size="14"
                disable-click
            />

            <NuxtLink
                :to="navigateCategory(product.productCategory.slug)"
                class="inline-block mt-1 capitalize"
            >
                <h6 class="font-medium line-clamp-1 text-gray-400 text-xs hover:text-primary">
                    {{ product.productCategory.name }}
                </h6>
            </NuxtLink>

            <NuxtLink
                :to="navigateProduct(product.slug)"
                class="block h-12 capitalize"
            >
                <h4 class="text-sm font-semibold line-clamp-2 hover:text-primary">
                    {{ product.name }}
                </h4>
            </NuxtLink>

            <div class="flex items-center">
                <BaseProductPrice
                    :price="Number(product.price)"
                    :selling-price="formatSellingPrice(product).toString()"
                />
            </div>

            <ClientOnly>
                <div class="flex flex-row mt-2">
                    <div class="basis-1/3">
                        <UButton
                            size="sm"
                            :color="product.isWishlist ? 'red' : 'white'"
                            :icon="product.isWishlist ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
                            variant="ghost"
                            @click="handleWishlist"
                        />
                    </div>

                    <div class="basis-2/3">
                        <UButton
                            size="sm"
                            variant="outline"
                            block
                            label="Thêm Giỏ Hàng"
                        />
                    </div>
                </div>
            </ClientOnly>
        </div>
    </UCard>
</template>
