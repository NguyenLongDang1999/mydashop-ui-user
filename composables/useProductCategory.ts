// ** Third Party Imports
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
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

export const useProductCategoryRetrieve = async () => {
    // ** useHooks
    const { query, params, path: routePath } = useRoute()

    // ** Data
    const search = reactive<IProductCategoryFilter>(initialSearch(query))
    const searchTemp = reactive<IProductCategoryFilter>(initialSearch(query))

    const { data, isFetching, suspense } = useQuery<IProductCategoryRetrieve>({
        queryKey: [queryKey.retrieve, params.slug, search],
        queryFn: () => useFetcher(pathQueryKey(pathKey.id, params.slug), { params: search }),
        placeholderData: keepPreviousData
    })

    await suspense()

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

    const { data, isFetching, suspense } = useQuery<IProductCategoryListShop>({
        queryKey: [queryKey.dataListShop, search],
        queryFn: () => useFetcher(pathKey.dataListShop, { params: search }),
        placeholderData: keepPreviousData
    })

    await suspense()

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
