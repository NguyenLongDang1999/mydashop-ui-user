<script setup lang="ts">

// ** Props & Emits
interface Props {
    dataList: ICart
    cartTotal: number
}

const props = defineProps<Props>()

// ** useHooks
const { handleSubmit } = useForm({
    validationSchema: cartCouponSchema,
    initialValues: {
        coupon_code: props.dataList.coupon_code
    }
})

// ** Methods
// const onSubmit = handleSubmit(values => mutateAsync({
//     coupon_code: values.coupon_code
// }))

const onSubmit = () => handleSubmit(values => values)
</script>

<template>
    <UCard
        :ui="{
            header: { padding: 'py-4' }
        }"
    >
        <template #header>
            <h6 class="capitalize font-semibold">
                Tổng tiền
            </h6>
        </template>

        <UForm
            :state="{}"
            @submit="onSubmit"
        >
            <div class="flex items-start gap-2">
                <FormInput
                    :label="couponLabel.coupon_code"
                    name="coupon_code"
                    :disabled="!!dataList.coupon_code"
                />

                <UButton
                    v-if="!dataList.coupon_code"
                    type="submit"
                    variant="solid"
                    size="md"
                    class="mt-6"
                >
                    Gửi
                </UButton>

                <UButton
                    v-else
                    variant="solid"
                    size="md"
                    class="mt-6"
                >
                    Xóa
                </UButton>
            </div>
        </UForm>

        <div class="flex flex-col gap-4 mt-5">
            <ul class="flex flex-col gap-2">
                <UDivider />

                <li class="flex items-center justify-between">
                    <span class="capitalize font-semibold">Số tiền:</span>
                    <span class="text-base font-semibold">{{ formatCurrency(cartTotal) }}</span>
                </li>

                <li class="flex items-center justify-between">
                    <span class="capitalize font-semibold">Giảm giá:</span>
                    <!-- <span class="text-base font-semibold">{{ formatCouponDiscount(dataList.discount) }}</span> -->
                </li>

                <UDivider />

                <li class="flex items-center justify-between text-primary">
                    <span class="capitalize font-semibold">Tổng tiền:</span>
                    <!-- <span class="text-base font-semibold">{{ calculateCartDiscount(cartTotal, Number(dataList.discount)) }}</span> -->
                </li>
            </ul>
        </div>
    </UCard>

    <div class="mt-5">
        <UButton
            color="red"
            variant="soft"
            size="md"
            block
            :to="ROUTER.CHECKOUT"
        >
            Thanh Toán
        </UButton>
    </div>
</template>
