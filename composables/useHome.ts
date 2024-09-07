// ** Interfaces
interface IHomeData {
    slider: IHomeSlider[]
    product_collection: IProductCollection[]
    product_flash_deals: IProductFlashDeals
    product_categories_popular: IProductCategory[]
}

// ** State
const path = ref<string>(ROUTE.HOME)

const queryKey = {
    data: `${path.value}-data`
}

const pathKey = {
    data: `${path.value}/data`
}

export default function () {
    return {
        queryKey
    }
}

export const useHomeData = async () => {
    // ** useHooks
    const { data } = await useFetchData<IHomeData>(pathKey.data, {
        key: queryKey.data
    })

    // ** Computed
    const slider = computed(() => data.value?.slider || [])
    const productFlashDeals = computed(() => data.value?.product_flash_deals as IProductFlashDeals)
    const productCategories = computed(() => data.value?.product_categories_popular || [])
    const productCollection = computed(() => data.value?.product_collection || [])

    return {
        slider,
        productFlashDeals,
        productCategories,
        productCollection
    }
}
