// ** Third Party Imports
import { useQuery } from '@tanstack/vue-query'

// ** Types Imports
import type { IProductDetail } from '~/types/product.type'

// ** State
const path = ref<string>(ROUTE.PRODUCT)

const queryKey = {
    retrieve: `${path.value}-retrieve`
}

const pathKey = {
    id: `${path.value}/$id`
}

export const useProductRetrieve = async () => {
    // ** useHooks
    const { params, path: routePath } = useRoute()

    const { data, suspense } = useQuery<IProductDetail>({
        queryKey: [queryKey.retrieve, params.slug],
        queryFn: () => useFetcher(pathQueryKey(pathKey.id, params.slug))
    })

    await suspense()

    return {
        path: routePath,
        params,
        data: computed(() => data.value as IProductDetail)
    }
}
