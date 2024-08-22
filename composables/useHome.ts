// ** Third Party Imports
import { useQuery } from '@tanstack/vue-query'

// ** Interfaces
interface IHomeData {
    slider: IHomeSlider[]
    product_categories_popular: IProductCategory[]
    product_flash_deals: any[]
    product_collection: any[]
}

// ** State
const path = ref<string>(ROUTE.HOME)

const queryKey = {
    data: `${path.value}-data`
}

const pathKey = {
    data: `${path.value}/data`
}

export const useHomeData = async () => {
    // ** useHooks
    const { data, suspense } = useQuery<IHomeData>({
        queryKey: [queryKey.data],
        queryFn: () => useFetcher(pathKey.data)
    })

    await suspense()

    // ** Computed
    const slider = computed(() => data.value?.slider || [])
    const productFlashDeals = computed(() => data.value?.product_flash_deals || [])
    const productCategories = computed(() => data.value?.product_categories_popular || [])
    const productCollection = computed(() => data.value?.product_collection || [])

    return {
        slider,
        productFlashDeals,
        productCategories,
        productCollection
    }
}
