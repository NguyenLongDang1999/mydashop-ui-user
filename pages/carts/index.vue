<script setup lang="ts">

// ** useHooks
const { queryKey } = useCart()
const { data } = useNuxtData<ICart>(queryKey.dataList)

// ** Computed
const dataList = computed(() => data.value as ICart)
const isFetching = computed(() => !dataList.value)
const cartLength = computed(() => dataList.value?.cartItem && dataList.value?.cartItem.length)
const cartTotal = computed(() => cartLength.value && dataList.value?.cartItem.reduce((acc, item) => acc + (item.product.selling_price * item.quantity), 0))
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
                    <div
                        v-if="cartLength"
                        class="col-span-12"
                    >
                        <CartPageList
                            :data-list="dataList"
                            :cart-total="cartTotal"
                        />
                    </div>

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
            </section>
        </UContainer>
    </main>
</template>
