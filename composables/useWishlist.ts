// ** Third Party Imports
import { useMutation, useQueryClient } from '@tanstack/vue-query'

// ** State
const path = ref<string>(ROUTE.WISHLIST)

const queryKey = {
    dataList: `${path.value}-data-list`,
    dataTable: `${path.value}-data-table`
}

const pathKey = {
    index: path.value,
    create: path.value,
    delete: `${path.value}/$id`
}

export const useWishlistCreate = () => {
    // ** useHooks
    const queryClient = useQueryClient()
    const { queryKey: queryKeyProduct } = useProduct()
    const { queryKey: queryKeyProductCategory } = useProductCategory()

    return useMutation({
        mutationFn: (body: IWishlistForm) => useFetcher(pathKey.create, {
            method: 'POST',
            body
        }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [queryKey.dataList] })
            queryClient.invalidateQueries({ queryKey: [queryKey.dataTable] })
            queryClient.invalidateQueries({ queryKey: [queryKeyProduct.retrieve] })
            queryClient.invalidateQueries({ queryKey: [queryKeyProductCategory.retrieve] })
            queryClient.invalidateQueries({ queryKey: [queryKeyProductCategory.dataListShop] })

            useNotification(MESSAGE.WISHLISTS_CREATE)
        },
        onError: () => useNotificationError()
    })
}

export const useWishlistDelete = () => {
    // ** useHooks
    const queryClient = useQueryClient()
    const { queryKey: queryKeyHome } = useHome()
    const { queryKey: queryKeyProduct } = useProduct()
    const { queryKey: queryKeyProductCategory } = useProductCategory()

    return useMutation({
        mutationFn: (body: IWishlistForm) => useFetcher(pathQueryKey(pathKey.delete, body.product_id), {
            method: 'DELETE'
        }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [queryKey.dataList] })
            queryClient.refetchQueries({ queryKey: [queryKeyHome.data] })
            queryClient.invalidateQueries({ queryKey: [queryKey.dataTable] })
            queryClient.invalidateQueries({ queryKey: [queryKeyProduct.retrieve] })
            queryClient.invalidateQueries({ queryKey: [queryKeyProductCategory.retrieve] })
            queryClient.invalidateQueries({ queryKey: [queryKeyProductCategory.dataListShop] })

            useNotification(MESSAGE.WISHLISTS_DELETE)
        },
        onError: () => useNotificationError()
    })
}
