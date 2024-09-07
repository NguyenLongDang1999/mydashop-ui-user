// ** State
const path = ref<string>(ROUTE.SYSTEM_SETTINGS)

const pathKey = {
    metadata: `${path.value}/metadata`
}

export const useMetadata = async () => {
    // ** useHooks
    const { data } = await useFetchData<IMetadata>(pathKey.metadata)

    return {
        data: computed(() => data.value as IMetadata)
    }
}
