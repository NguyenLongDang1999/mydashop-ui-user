<script setup lang="ts">

// ** Types Imports
import type { BreadcrumbLink } from '#ui/types'

// ** Props & Emits
interface Props {
    title: string
    breadcrumb?: IProductCategoryBreadcrumb[]
}

const props = withDefaults(defineProps<Props>(), {
    breadcrumb: () => []
})

// ** Computed
const lastItem = computed(() => {
    return props.breadcrumb.length > 0 ? props.breadcrumb[props.breadcrumb.length - 1] : null
})

const breadcrumbs = computed<BreadcrumbLink[]>(() => {
    const defaultBreadcrumbs: BreadcrumbLink[] = [
        {
            label: 'Trang chủ',
            icon: 'i-heroicons-home',
            to: ROUTER.HOME
        },
        ...props.breadcrumb.map(({ slug, name }) => ({
            to: navigateCategory(slug),
            label: name
        }))
    ]

    if (lastItem.value?.name !== props.title) {
        defaultBreadcrumbs.push({
            label: props.title
        })
    }

    return defaultBreadcrumbs
})
</script>

<template>
    <section
        v-once
        class="bg-gray-100 py-3"
    >
        <UContainer>
            <UBreadcrumb :links="breadcrumbs" />
        </UContainer>
    </section>
</template>
