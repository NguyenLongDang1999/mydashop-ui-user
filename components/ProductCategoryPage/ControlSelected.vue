<script setup lang="ts">

// ** Props & Emits
interface Props {
    dataAggregations: number
    categoryBrand?: IProductBrand[]
    categoryAttribute?: IProductAttribute[]
}

const props = defineProps<Props>()

// ** Data
const search = inject('search') as IProductCategoryFilter
const searchTemp = inject('searchTemp') as IProductCategoryFilter

// ** Computed
const mergedButtons = computed(() => [
    {
        condition: !_eq(search.sort?.toString(), _first(sortOption)?.id),
        label: `Sắp Xếp: ${_find(sortOption, ['id', search.sort])?.label}`,
        onClick: () => handleCloseFilter(search.sort as string, 'sort')
    },
    {
        condition: !_eq(_toNumber(search.pageSize), PAGE.SIZE),
        label: `Hiển Thị: ${search.pageSize}`,
        onClick: () => handleCloseFilter(search.pageSize, 'pageSize')
    },
    ...search.productBrands?.map(_item => ({
        condition: true,
        label: `Thương Hiệu: ${_find(props.categoryBrand, ['id', _item])?.name}`,
        onClick: () => handleCloseFilter(_item, 'productBrands')
    })) || [],
    ...search.productAttributes?.map(_item => {
        const productAttribute = _find(props.categoryAttribute, _attribute => _some(_attribute.product_attribute_values, ['id', _item]))
        const value = _find(productAttribute?.product_attribute_values, _value => _eq(_value.id, _item))?.value

        return {
            condition: true,
            label: `${productAttribute?.name}: ${value}`,
            onClick: () => handleCloseFilter(_item, 'productAttributes')
        }
    }) || [],
    ...search.productRating?.map(_item => ({
        condition: true,
        label: `Đánh Giá: ${_find(ratingOption, ['id', _toNumber(_item)])?.label}`,
        onClick: () => handleCloseFilter(_item, 'productRating')
    })) || []
])

const filteredButtons = computed(() =>
    mergedButtons.value.filter(button => button.condition)
)

const showClearAll = computed(() => _some(mergedButtons.value, ['condition', true]))

// ** Methods
const handleCloseFilter = (value_id: string, key: keyof IProductCategoryFilter) => {
    if (_eq(key, 'productBrands') || _eq(key, 'productAttributes') || _eq(key, 'productRating')) {
        search[key] = _filter(search[key], _value => !_eq(_value.toString(), value_id.toString()))
        searchTemp[key] = _filter(searchTemp[key], _value => !_eq(_value.toString(), value_id.toString()))
    }

    if (_eq(key, 'pageSize')) {
        search[key] = PAGE.SIZE
        searchTemp[key] = PAGE.SIZE
    }

    if (_eq(key, 'sort')) {
        search[key] = _first(sortOption)?.id
        searchTemp[key] = _first(sortOption)?.id
    }
}

const handleCloseAll = () => {
    const defaultState = {
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE,
        sort: sortOption[0].id,
        productRating: [],
        productBrands: [],
        productAttributes: []
    }

    _assign(search, defaultState)
    _assign(searchTemp, defaultState)
}
</script>

<template>
    <div class="mb-3 flex gap-2 items-center flex-wrap">
        <strong>{{ dataAggregations }} Sản Phẩm</strong>

        <UButton
            v-for="(button, index) in filteredButtons"
            :key="index"
            :label="button.label"
            color="gray"
            size="sm"
            @click="button.onClick"
        >
            <template #trailing>
                <UIcon
                    name="i-heroicons-x-mark-20-solid"
                    class="w-5 h-5"
                />
            </template>
        </UButton>

        <UButton
            v-if="showClearAll"
            color="red"
            variant="link"
            size="sm"
            @click="handleCloseAll"
        >
            <span class="underline">Xoá Hết</span>
        </UButton>
    </div>
</template>
