// ** Third Party Imports
import { useQuery } from '@tanstack/vue-query'

// ** State
const path = ref<string>(ROUTE.SYSTEM_SETTINGS)

const queryKey = {
    metadata: `${path.value}-metadata`
}

const pathKey = {
    metadata: `${path.value}/metadata`
}

export const useMetadata = async () => {
    // ** useHooks
    const { data, suspense } = useQuery<IMetadata>({
        queryKey: [queryKey.metadata],
        queryFn: () => useFetcher(pathKey.metadata)
    })

    await suspense()

    return {
        data: computed(() => data.value as IMetadata)
    }
}
