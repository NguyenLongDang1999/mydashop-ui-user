<script setup lang="ts">

// ** Props & Emits
interface Props {
    dataList: ICart
    cartTotal: number
}

const props = defineProps<Props>()

// ** useHooks
const { pathKey, queryKey } = useCart()

// ** Data
const quantity = ref<{
    [key: string]: number
}>({})

const cartColumns = [{
    key: 'name',
    label: 'Thông tin sản phẩm',
    class: 'capitalize'
}, {
    key: 'price',
    label: 'Giá cả',
    class: 'capitalize'
}, {
    key: 'quantity',
    label: 'Số lượng',
    class: 'capitalize'
}, {
    key: 'total',
    label: 'Tổng tiền',
    class: 'capitalize'
}]

// ** Set Data
props.dataList.cartItem.forEach(_ci => {
    quantity.value[_ci.id] = _ci.quantity
})

// ** Methods
const handleProductQuantity = async (row: ICartItem, val: number) => {
    quantity.value[row.id] = val
}

const handleDeleteCart = (force = false, id: string) => {
    useFetchData(pathQueryKey(pathKey.id, id), {
        method: 'DELETE',
        query: {
            force: force || undefined
        }
    })
        .then(() => {
            refreshNuxtData(queryKey.dataList)
            useNotification(MESSAGE.CART_DELETE)
        })
        .catch(() => useNotificationError())
}

onBeforeRouteLeave(() => {
    const updatedData: ICartQuantityForm[] = []

    props.dataList.cartItem.forEach(_ci => {
        updatedData.push({
            cart_item_id: _ci.id,
            quantity: quantity.value[_ci.id]
        })
    })

    useFetchData(pathKey.index, {
        method: 'PATCH',
        body: {
            updatedData
        }
    })
        .then(() => refreshNuxtData(queryKey.dataList))
        .catch(() => useNotificationError())
})
</script>

<template>
    <div class="flex flex-col border border-gray-200 dark:border-gray-700 relative not-prose rounded-md bg-white dark:bg-gray-900 overflow-x-auto">
        <UTable
            class="w-full"
            :rows="dataList.cartItem"
            :columns="cartColumns"
        >
            <template #name-data="{ row }: { row: ICartItem }">
                <div class="flex items-center gap-2">
                    <div class="relative">
                        <NuxtImg
                            :src="row.product.image_uri"
                            :alt="row.product.name"
                            :width="60"
                            :height="60"
                            class="rounded-lg min-w-[60px] min-h-[60px] object-cover"
                        />

                        <UButton
                            class="absolute -top-2 -left-2"
                            icon="i-heroicons-x-mark-20-solid"
                            size="2xs"
                            :ui="{ rounded: 'rounded-full' }"
                            @click="handleDeleteCart(false, row.id)"
                        />
                    </div>

                    <div class="flex flex-col w-80 whitespace-normal">
                        <NuxtLink
                            :to="navigateProduct(row.product.slug)"
                            class="hover:text-primary"
                        >
                            <h4 class="font-semibold">
                                {{ row.product.name }}
                            </h4>
                        </NuxtLink>

                        <span
                            v-if="row.cartItemProductAttribute"
                            class="text-xs text-gray-400 mt-1"
                        >{{ row.cartItemProductAttribute }}</span>
                    </div>
                </div>
            </template>

            <template #price-data="{ row }: { row: ICartItem }">
                <span class="font-semibold sm:text-lg text-primary text-base">
                    {{ formatCurrency(row.product.selling_price) }}
                </span>
            </template>

            <template #quantity-data="{ row }: { row: ICartItem }">
                <BaseProductQuantity
                    :model-value="row.quantity"
                    @update:model-value="val => handleProductQuantity(row, val)"
                />
            </template>

            <template #total-data="{ row }: { row: ICartItem }">
                <span class="font-semibold sm:text-lg text-primary text-base">
                    {{ formatCurrency(row.product.selling_price * quantity[row.id]) }}
                </span>
            </template>
        </UTable>

        <div class="flex justify-end items-center px-3 py-3.5 border-t border-gray-200 dark:border-gray-700 gap-2">
            <span class="uppercase font-semibold text-base">Tổng tiền:</span>
            <span class="font-semibold text-lg text-primary mr-10">
                {{ formatCurrency(Number(cartTotal)) }}
            </span>
        </div>
    </div>

    <div class="mt-4 flex justify-between">
        <UButton
            label="Button"
            color="gray"
            icon="i-heroicons-building-storefront"
            :to="ROUTER.SHOP"
            variant="ghost"
        >
            Tiếp Tục Mua Sắm
        </UButton>

        <div class="flex gap-1">
            <UButton
                label="Button"
                color="red"
                icon="i-heroicons-x-mark"
                @click="handleDeleteCart(true, dataList.id)"
            >
                Xóa Giỏ Hàng
            </UButton>

            <UButton
                size="md"
                :to="ROUTER.CHECKOUT"
            >
                Thanh Toán
            </UButton>
        </div>
    </div>
</template>
