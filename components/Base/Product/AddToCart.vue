<script setup lang="ts">

// ** Props & Emits
interface Props {
    product: IFlashDealProduct
}

const props = defineProps<Props>()

// ** Data
const result = ref<IProductVariant>()
const quantity = ref<number>(1)
const selectedAttributes = ref<{ [key: string]: string }>({})

onMounted(() => {
    props.product.productAttributes.forEach(attribute => {
        if (attribute.product_attribute_values.length > 0) {
            selectedAttributes.value[attribute.id] = attribute.product_attribute_values[0].id
        }
    })
})

// ** useHooks
const isLoggedIn = useAuth()
const { mutateAsync } = useCartAdd()
const { mutateAsync: mutateAsyncWishlistCreate } = useWishlistCreate()
const { mutateAsync: mutateAsyncWishlistDelete } = useWishlistDelete()

// ** Watch
watchEffect(() => {
    for (const variant of props.product.productVariants) {
        let isMatch = true

        for (const [attributeId, attributeValueId] of Object.entries(selectedAttributes.value)) {
            const matchingAttribute = variant.productVariantAttributeValues.find(
                attrValue =>
                    areValuesEqual(attrValue.productAttributeValues.productAttribute.id, attributeId) &&
                    areValuesEqual(attrValue.productAttributeValues.id, attributeValueId)
            )

            if (!matchingAttribute) {
                isMatch = false
                break
            }
        }

        if (isMatch) {
            result.value = variant
        }
    }

    return null
})

// ** Methods
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

const handleAddToCart = () => mutateAsync({
    product_variant_id: result.value?.id as string,
    quantity: quantity.value
})

const handleProductAttributeValues = (productAttributeId: string, productAttributeValueId: string) => {
    selectedAttributes.value = {
        ...selectedAttributes.value,
        [productAttributeId]: productAttributeValueId
    }
}

const isSelected = (productAttributeId: string, productAttributeValueId: string) =>
    areValuesEqual(selectedAttributes.value[productAttributeId], productAttributeValueId)
</script>

<template>
    <div class="my-1">
        <div
            v-if="product.productAttributes.length"
            class="flex flex-col gap-3 mb-3"
        >
            <div
                v-for="product_attribute in product.productAttributes"
                :key="product_attribute.id"
            >
                <UFormGroup
                    :label="product_attribute.name"
                    :name="`attribute_value_id-${product.id}-${product_attribute.id}`"
                    :ui="{
                        label: { base: 'font-semibold' }
                    }"
                >
                    <div class="flex flex-wrap gap-2">
                        <UButtonGroup
                            v-for="product_attribute_value in product_attribute.product_attribute_values"
                            :key="product_attribute_value.id"
                            size="sm"
                            orientation="horizontal"
                        >
                            <UButton
                                :label="product_attribute_value.value"
                                :color="isSelected(product_attribute.id, product_attribute_value.id) ? 'primary' : 'white'"
                                variant="solid"
                                @click="handleProductAttributeValues(product_attribute.id, product_attribute_value.id)"
                            />
                        </UButtonGroup>
                    </div>
                </UFormGroup>
            </div>
        </div>

        <BaseProductPrice
            :price="Number(result?.price)"
            :selling-price="formatSellingPrice(result).toString()"
            class="text-lg"
        />
    </div>

    <div class="grid grid-cols-12 gap-2 mt-4">
        <div class="col-span-12">
            <div class="flex gap-2">
                <BaseProductQuantity v-model="quantity" />

                <UButton
                    :color="product.isWishlist ? 'red' : 'white'"
                    :icon="product.isWishlist ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
                    truncate
                    size="lg"
                    variant="ghost"
                    @click="handleWishlist"
                />

                <UButton
                    size="lg"
                    icon="i-heroicons-shopping-bag"
                    label="Thêm Vào Giỏ"
                    @click="handleAddToCart"
                />
            </div>
        </div>
    </div>
</template>
