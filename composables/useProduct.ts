// ** State
const path = ref<string>(ROUTE.PRODUCT)

const queryKey = {
    retrieve: `${path.value}-retrieve`
}

const pathKey = {
    id: `${path.value}/$id`
}

export default function () {
    return {
        queryKey
    }
}

export const useProductRetrieve = async () => {
    // ** useHooks
    const { params, path: routePath } = useRoute()
    const { data } = await useFetchData<IProductRetrieve>(pathQueryKey(pathKey.id, params.slug))

    return {
        path: routePath,
        params,
        data: computed(() => data.value as IProductRetrieve)
    }
}
