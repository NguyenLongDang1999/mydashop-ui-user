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
        pathKey
    }
}

export const useCartList = () => {
    // ** useHooks
    const { data } = useFetchData(pathKey.dataList, {
        key: queryKey.dataList
    })

    // ** Computed
    const dataList = computed(() => data.value as ICart)
    const cartLength = computed(() => dataList.value?.cartItem && dataList.value?.cartItem.length)
    const cartQuantity = computed(() => cartLength.value ? dataList.value?.cartItem.length : 0)
    const cartTotal = computed(() => cartLength.value && dataList.value?.cartItem.reduce((acc, item) => acc + (formatSellingPrice(item.product, item.quantity, false) as number), 0))

    return {
        dataList: computed(() => data.value as ICart),
        cartLength,
        cartQuantity,
        cartTotal
    }
}

