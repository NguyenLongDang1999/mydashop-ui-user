<script setup lang="ts">

// ** useHooks
const router = useRouter()
const { queryKey } = useCart()
const { data } = useNuxtData<ICart>(queryKey.dataList)
const { data: user } = useAuthProfile()

const { handleSubmit } = useForm<IOrderForm>({
    validationSchema: orderFormSchema
})

// ** Computed
const dataList = computed(() => data.value as ICart)
const cartLength = computed(() => dataList.value?.cartItem && dataList.value?.cartItem.length)
const cartTotal = computed(() => cartLength.value && dataList.value?.cartItem.reduce((acc, item) => acc + (item.product.selling_price * item.quantity), 0))

// ** Watch
watch(cartLength, newLength => {
    if (!newLength) {
        router.replace('/')
    }
})

// ** Methods
const onSubmit = handleSubmit(values => console.log(values))
</script>

<template>
    <main>
        <BaseBreadcrumbs
            v-once
            title="Thanh toán"
        />

        <UContainer>
            <section class="mt-10">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-8">
                        <UCard>
                            <template #header>
                                <div class="flex justify-between items-center">
                                    <h2 class="capitalize font-semibold text-lg text-gray-900 dark:text-white leading-tight my-0">
                                        Thông tin đặt hàng
                                    </h2>
                                </div>
                            </template>

                            <UForm
                                :state="orderFormSchema"
                                @submit="onSubmit"
                            >
                                <div class="grid grid-cols-12 gap-4">
                                    <div class="col-span-12">
                                        <FormInput
                                            :model-value="user?.name"
                                            :label="orderLabel.name"
                                            name="name"
                                        />
                                    </div>

                                    <div class="col-span-6">
                                        <FormInput
                                            :model-value="user?.email"
                                            :label="orderLabel.email"
                                            name="email"
                                        />
                                    </div>

                                    <div class="col-span-6">
                                        <FormInput
                                            :model-value="user?.phone"
                                            :label="orderLabel.phone"
                                            name="phone"
                                        />
                                    </div>

                                    <div class="col-span-12">
                                        <FormTextarea
                                            :label="orderLabel.address"
                                            name="address"
                                        />
                                    </div>

                                    <div class="col-span-12">
                                        <FormTextarea
                                            :label="orderLabel.note"
                                            name="note"
                                        />
                                    </div>

                                    <div class="col-span-12">
                                        <UButton
                                            type="submit"
                                            size="lg"
                                            block
                                        >
                                            Hoàn Tất Thanh Toán
                                        </UButton>
                                    </div>
                                </div>
                            </UForm>
                        </UCard>
                    </div>

                    <div class="col-span-4">
                        <UCard>
                            <template #header>
                                <div class="flex justify-between items-center">
                                    <h2 class="capitalize font-semibold text-lg text-gray-900 dark:text-white leading-tight my-0">
                                        Tóm tắt đơn hàng
                                    </h2>
                                </div>
                            </template>

                            <ul
                                v-if="cartLength"
                                class="flex flex-col gap-4"
                            >
                                <li
                                    v-for="cart in dataList.cartItem"
                                    :key="cart.id"
                                    class="flex gap-4"
                                >
                                    <div class="relative">
                                        <NuxtImg
                                            :src="cart.product.image_uri"
                                            :alt="cart.product.name"
                                            :title="cart.product.name"
                                            loading="lazy"
                                            width="100"
                                            height="100"
                                            class="rounded-md"
                                        />
                                    </div>

                                    <div class="flex-1 flex flex-col gap-1">
                                        <h6 class="font-medium line-clamp-1 text-gray-400 text-xs capitalize">
                                            {{ cart.product.productCategory.name }}
                                        </h6>

                                        <h4 class="line-clamp-2 font-semibold text-sm">
                                            {{ cart.product.name }}
                                        </h4>

                                        <div>
                                            <div
                                                v-if="cart.cartItemProductAttribute"
                                                class="text-xs text-gray-400"
                                            >
                                                {{ cart.cartItemProductAttribute }}
                                            </div>


                                            <span class="font-semibold sm:text-lg text-primary text-base">{{ cart.quantity }} x {{ formatCurrency(cart.product.selling_price) }}</span>
                                            <span class="font-normal sm:text-base text-sm text-gray-300 line-through pl-3">{{ formatCurrency(Number(cart.product.price)) }}</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                            <template #footer>
                                <div class="flex justify-between">
                                    <span class="uppercase font-semibold text-lg">Tổng tiền:</span>
                                    <span class="text-lg">{{ formatCurrency(Number(cartTotal)) }}</span>
                                </div>
                            </template>
                        </UCard>
                    </div>
                </div>
            </section>
        </UContainer>
    </main>
</template>
