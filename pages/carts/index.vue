<script setup lang="ts">

// ** useHooks
const { queryKey } = useCart()
const { data } = useNuxtData<ICart>(queryKey.dataList)

// ** Computed
const dataList = computed(() => data.value as ICart)
const isFetching = computed(() => !dataList.value)
const cartLength = computed(() => dataList.value?.cartItem && dataList.value?.cartItem.length)
const cartQuantity = computed(() => cartLength.value ? dataList.value?.cartItem.length : 0)
const cartTotal = computed(() => cartLength.value && dataList.value?.cartItem.reduce((acc, item) => acc + (formatSellingPrice(item.product, item.quantity, false) as number), 0))
</script>

<template>
    <main>
        <BaseBreadcrumbs
            v-once
            title="Giỏ hàng"
        />

        <UContainer>
            <section class="mt-10">
                <BaseProductCategoryTitle
                    v-if="cartLength"
                    icon="i-heroicons-shopping-bag"
                    title="Giỏ hàng"
                    description="Kiểm tra các sản phẩm trong giỏ hàng của bạn và tiến hành thanh toán khi sẵn sàng. Bạn có thể thay đổi số lượng hoặc xóa sản phẩm bất kỳ lúc nào."
                />

                <div
                    v-if="!isFetching"
                    class="grid gap-4 grid-cols-12 mt-10"
                >
                    <template v-if="cartLength">
                        <div class="lg:col-span-9 col-span-12">
                            <CartPageList :data-list="dataList" />
                        </div>

                        <div class="lg:col-span-3 sm:col-span-6 col-span-12">
                            <CartPageCoupon
                                :data-list="dataList"
                                :cart-total="cartTotal"
                            />
                        </div>
                    </template>

                    <div
                        v-else
                        class="col-span-12"
                    >
                        <div class="flex flex-col items-center mt-10">
                            <UIcon
                                name="i-heroicons-face-frown"
                                class="text-9xl"
                            />

                            <p class="my-4 capitalize font-semibold">
                                Giỏ hàng của bạn hiện đang trống. Hãy khám phá các sản phẩm mới và thêm vào giỏ ngay!
                            </p>

                            <UButton
                                label="Button"
                                color="primary"
                                icon="i-heroicons-arrow-left-20-solid"
                                :to="ROUTER.SHOP"
                            >
                                Mua Sắm
                            </UButton>
                        </div>
                    </div>
                </div>

                <template v-else>
                    <div class="mt-10">
                        <div class="space-y-2 mt-2">
                            <USkeleton
                                v-for="item in 12"
                                :key="item"
                                class="h-3 w-full"
                            />
                        </div>
                    </div>
                </template>
            </section>
        </UContainer>
    </main>
</template>
