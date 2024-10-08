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
        class="group"
        :ui="{
            strategy: 'override',
            shadow: '',
            base: 'overflow-hidden',
            body: { padding: 'p-3' }
        }"
    >
        <div class="grid gap-4 grid-cols-12">
            <div class="col-span-12 flex gap-4">
                <div class="relative">
                    <NuxtLink :to="navigateProduct(product.slug)">
                        <NuxtImg
                            :src="product.image_uri"
                            :alt="product.name"
                            :title="product.name"
                            width="600"
                            height="600"
                            class="w-44 rounded-md object-cover"
                        />
                    </NuxtLink>

                    <!--
                      <span
                      v-if="areValuesEqual(product.special_price_type, SPECIAL_PRICE.PERCENT)"
                      class="absolute top-0 left-0 bg-red-600 px-2 py-1 text-xs text-white rounded-md"
                      >-{{ product.special_price }}%</span>
                    -->
                </div>

                <div class="flex-1 flex flex-col gap-1">
                    <BaseProductStarRatings
                        v-once
                        class="mt-2"
                        :model-value="Number(product.total_rating)"
                        :star-size="14"
                        disable-click
                    />

                    <NuxtLink
                        :to="navigateCategory(product.productCategory.slug)"
                        class="inline-flex capitalize mt-1"
                    >
                        <h6 class="font-medium line-clamp-1 text-gray-400 text-xs hover:text-primary">
                            {{ product.productCategory.name }}
                        </h6>
                    </NuxtLink>

                    <NuxtLink
                        :to="navigateProduct(product.slug)"
                        class="block capitalize"
                    >
                        <h4 class="text-sm font-semibold line-clamp-1 hover:text-primary">
                            {{ product.name }}
                        </h4>
                    </NuxtLink>

                    <p
                        v-if="product.short_description"
                        class="line-clamp-2"
                    >
                        {{ product.short_description }}
                    </p>

                    <div class="flex items-center">
                        <BaseProductPrice
                            :price="product.price"
                            :selling-price="product.selling_price"
                        />
                    </div>

                    <ClientOnly>
                        <div class="flex flex-wrap gap-2">
                            <UButton
                                size="sm"
                                :color="product.isWishlist ? 'red' : 'white'"
                                :icon="product.isWishlist ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
                                variant="ghost"
                                @click="handleWishlist"
                            />

                            <UButton
                                size="sm"
                                icon="i-heroicons-shopping-bag"
                                class="capitalize"
                                :label="productTypeSingle ? 'Thêm Vào Giỏ' : 'Xem Lựa Chọn'"
                                @click="handleAddToCart"
                            />
                        </div>
                    </ClientOnly>
                </div>
            </div>
        </div>
    </UCard>
</template>
