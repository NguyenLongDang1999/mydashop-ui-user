// ** Third Party Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

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

export const useCartList = () => {
    // ** useHooks
    const { data } = useQuery<ICart>({
        queryKey: [queryKey.dataList],
        queryFn: () => useFetcher(pathKey.dataList)
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

export const useCartAdd = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: ICartForm) => useFetcher(pathKey.index, {
            method: 'POST',
            body
        }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [queryKey.dataList] })
            useNotification(MESSAGE.CART_CREATE)
        },
        onError: () => useNotificationError()
    })
}

export const useCartUpdate = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: ICartQuantityForm[]) => useFetcher(pathKey.index, {
            method: 'PATCH',
            body: {
                updatedData: body
            }
        }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [queryKey.dataList] })
        },
        onError: () => useNotificationError()
    })
}

export const useCartDelete = (purge = false) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: string) => useFetcher(pathQueryKey(pathKey.id, body), {
            method: 'DELETE',
            params: {
                force: purge || undefined
            }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey.dataList] })
            useNotification(MESSAGE.CART_DELETE)
        },
        onError: () => useNotificationError()
    })
}
