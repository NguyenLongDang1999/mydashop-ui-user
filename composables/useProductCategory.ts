// ** Third Party Imports
import { useQuery } from '@tanstack/vue-query'

// ** State
const path = ref<string>(ROUTE.PRODUCT_CATEGORY)

const queryKey = {
    dataListNested: `${path.value}-data-list-nested`
}

const pathKey = {
    id: `${path.value}/$id`,
    dataListNested: `${path.value}/data-list-nested`
}

export const useProductCategoryDataListNested = async () => {
    // ** useHooks
    const { data, suspense } = useQuery<IProductCategory[]>({
        queryKey: [queryKey.dataListNested],
        queryFn: () => useFetcher(pathKey.dataListNested)
    })

    await suspense()

    // ** Computed
    return {
        dataList: computed(() => data.value as IProductCategory[])
    }
}
