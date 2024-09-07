<script setup lang="ts">

// ** Props & Emits
interface Props {
    product: IProduct
}

const props = defineProps<Props>()

// ** useHooks
const isLoggedIn = useAuth()
const { pathKey } = useCart()
const { pathKey: pathKeyWishlist } = useWishlist()

// ** Computed
const productTypeSingle = computed(() => areValuesEqual(props.product.product_type, PRODUCT_TYPE.SINGLE))

// ** Methods
const handleWishlist = () => {
    if (isLoggedIn.value) {
        if (!props.product.isWishlist) {
            return useFetchData(pathKeyWishlist.create, {
                method: 'POST',
                body: {
                    product_id: props.product.id
                }
            })
                .then(async () => {
                    const { queryKey } = useHome()

                    await refreshNuxtData(queryKey.data)
                    useNotification(MESSAGE.WISHLISTS_CREATE)
                })
                .catch(() => useNotificationError())
        } else {
            return useFetchData(pathQueryKey(pathKeyWishlist.delete, props.product.id), {
                method: 'DELETE',
                body: {
                    product_id: props.product.id
                }
            })
                .then(async () => {
                    const { queryKey } = useHome()

                    await refreshNuxtData(queryKey.data)
                    useNotification(MESSAGE.WISHLISTS_DELETE)
                })
                .catch(() => useNotificationError())
        }
    } else {
        return navigateTo(ROUTER.AUTH_LOGIN)
    }
}

const handleAddToCart = () => {
    if (productTypeSingle.value) {
        return useFetchData(pathKey.index, {
            method: 'POST',
            body: {
                product_variant_id: props.product.product_variant_id,
                quantity: 1
            }
        })
            .then(() => useNotification(MESSAGE.CART_CREATE))
            .catch(() => useNotificationError())
    } else {
        return navigateTo(navigateProduct(props.product.slug))
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
                            :label="productTypeSingle ? 'Thêm Vào Giỏ' : 'Xem Lựa Chọn'"
                            @click="handleAddToCart"
                        />
                    </div>
                </div>
            </ClientOnly>
        </div>
    </UCard>
</template>
