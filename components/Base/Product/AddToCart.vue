<script setup lang="ts">

// ** Props & Emits
interface Props {
    product: any
}

const props = defineProps<Props>()

// const emits = defineEmits(['result'])

// ** Data
const result = ref()
const selectedAttributes = ref<{ [key: string]: string }>({})

// ** Set default values for selectedAttributes on mount
onMounted(() => {
    props.product.productAttributes.forEach(attribute => {
        if (attribute.product_attribute_values.length > 0) {
            selectedAttributes.value[attribute.id] = attribute.product_attribute_values[0].id
        }
    })
})

// ** Methods
const handleProductAttributeValues = (productAttributeId: string, productAttributeValueId: string) => {
    selectedAttributes.value = {
        ...selectedAttributes.value,
        [productAttributeId]: productAttributeValueId
    }
}

const isSelected = (productAttributeId: string, productAttributeValueId: string) =>
    areValuesEqual(selectedAttributes.value[productAttributeId], productAttributeValueId)

function findPriceAndSpecialPrice(
    attributesMap
) {
    for (const variant of props.product.productVariants) {
        let isMatch = true

        for (const [attributeId, attributeValueId] of Object.entries(attributesMap)) {
            const matchingAttribute = variant.productVariantAttributeValues.find(
                attrValue =>
                    attrValue.productAttributeValues.productAttribute.id === attributeId &&
                    attrValue.productAttributeValues.id === attributeValueId
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
}

watchEffect(() => findPriceAndSpecialPrice(selectedAttributes.value))
</script>

<template>
    <div class="my-1">
        <div class="flex flex-col gap-3 mb-3">
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
    </div>
</template>
