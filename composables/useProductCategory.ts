// ** Third Party Imports
import type { LocationQuery, LocationQueryValue } from 'vue-router'

// ** State
const path = ref<string>(ROUTE.PRODUCT_CATEGORY)

const queryKey = {
    retrieve: `${path.value}-retrieve`,
    dataListShop: `${path.value}-data-list-shop`,
    dataListNested: `${path.value}-data-list-nested`
}

const pathKey = {
    id: `${path.value}/$id`,
    dataListShop: `${path.value}/data-list-shop`,
    dataListNested: `${path.value}/data-list-nested`
}

export default function () {
    return {
        queryKey
    }
}

export const useProductCategoryDataListNested = async () => {
    // ** useHooks
    const { data } = await useFetchData<IProductCategory[]>(pathKey.dataListNested)

    // ** Computed
    return {
        dataList: computed(() => data.value as IProductCategory[])
    }
}

export const useProductCategoryRetrieve = async () => {
    // ** useHooks
    const { query, params, path: routePath } = useRoute()

    // ** Data
    const search = reactive<IProductCategoryFilter>(initialSearch(query))
    const searchTemp = reactive<IProductCategoryFilter>(initialSearch(query))

    const { data, status } = await useFetchData<IProductCategoryRetrieve>(pathQueryKey(pathKey.id, params.slug), {
        params: search
    })

    // ** Computed
    const isFetching = computed(() => areValuesEqual(status.value, 'pending'))

    return {
        path: routePath,
        search,
        searchTemp,
        isFetching,
        data: computed(() => data.value as IProductCategoryRetrieve),
        dataTable: computed(() => data.value?.product || []),
        dataAggregations: computed(() => data.value?.aggregations || 0)
    }
}

export const useProductCategoryListShop = async () => {
    // ** useHooks
    const { query } = useRoute()

    // ** Data
    const search = reactive<IProductCategoryFilter>(initialSearch(query))
    const searchTemp = reactive<IProductCategoryFilter>(initialSearch(query))

    const { data, status } = await useFetchData<IProductCategoryListShop>(pathKey.dataListShop, {
        params: search,
        key: queryKey.dataListShop
    })

    // ** Computed
    const isFetching = computed(() => areValuesEqual(status.value, 'pending'))

    return {
        search,
        searchTemp,
        isFetching,
        dataTable: computed(() => data.value?.data || []),
        dataAggregations: computed(() => data.value?.aggregations || 0)
    }
}

const parseQueryArray = (value: LocationQueryValue | LocationQueryValue[]): string[] => {
    if (!value) return []

    return Array.isArray(value) ? value.map(String) : [String(value)]
}

const initialSearch = (query: LocationQuery) => ({
    sort: Number(query.sort) || sortOption[0].id,
    pageSize: Number(query.pageSize) || paginationOption[0],
    page: Number(query.page) || PAGE.CURRENT,
    productAttributes: parseQueryArray(query.productAttributes),
    productBrands: parseQueryArray(query.productBrands),
    productRating: parseQueryArray(query.productRating)
})
