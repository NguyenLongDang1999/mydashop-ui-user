export const getPathImageFile = (name?: string) => {
    const config = useRuntimeConfig()

    if (name) {
        return name.includes('https://') ?
            name :
            config.public.previewCdn + name
    }

    return IMAGE.DEFAULT
}

export const getValueBySlug = (slug: string, dataList: ISystemSettings[]) => (dataList?.find(({ key: dataSlug }) => areValuesEqual(dataSlug, slug))?.value) ?? ''

export const pathQueryKey = (pathKey: string, id: string | string[]) => pathKey.replace('$id', id as string)

export const areValuesEqual = (firstValue: number | string, secondValue: number | string) => String(firstValue) === String(secondValue)
