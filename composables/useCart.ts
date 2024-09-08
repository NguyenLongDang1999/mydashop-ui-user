// ** State
const path = ref<string>(ROUTE.CART)

const queryKey = {
    dataList: `${path.value}-data-list`
}

const pathKey = {
    index: path.value,
    id: `${path.value}/$id`,
    dataList: `${path.value}/data-list`
}

export default function () {
    return {
        pathKey,
        queryKey
    }
}

export const useCartList = () => {
    // ** useHooks
    const { data, status } = useFetchData(pathKey.dataList, {
        key: queryKey.dataList,
        server: false
    })

    // ** Computed
    const isFetching = computed(() => areValuesEqual(status.value, 'pending'))
    const dataList = computed(() => data.value as ICart)
    const cartLength = computed(() => dataList.value?.cartItem && dataList.value?.cartItem.length)
    const cartQuantity = computed(() => cartLength.value ? dataList.value?.cartItem.length : 0)
    const cartTotal = computed(() => cartLength.value && dataList.value?.cartItem.reduce((acc, item) => acc + (formatSellingPrice(item.product, item.quantity, false) as number), 0))

    return {
        isFetching,
        dataList,
        cartLength,
        cartQuantity,
        cartTotal
    }
}

