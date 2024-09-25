// ** State
const path = ref<string>(ROUTE.WISHLIST)

const queryKey = {
    dataTable: `${path.value}-data-table`
}

const pathKey = {
    index: path.value,
    create: path.value,
    delete: `${path.value}/$id`
}

export default function () {
    return {
        pathKey
    }
}

export const useWishlistDataList = () => {
    // ** useHooks
    const { data, status } = useFetchData<IWishlistDataList>(pathKey.index, {
        key: queryKey.dataTable
    })

    // ** Computed
    const isFetching = computed(() => areValuesEqual(status.value, 'pending'))

    return {
        isFetching,
        dataTable: computed(() => data.value || [])
    }
}
