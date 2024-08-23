<script setup lang="ts">

// ** Props & Emits
interface Props {
    title: string
    categoryId: string
    pageCategory?: boolean
}

const props = defineProps<Props>()

// ** useHooks
const { dataList: categoryList } = await useProductCategoryDataListNested()

// ** Data
const breadcrumb = ref<IProductCategoryBreadcrumb[]>([])

// ** Methods
const findParentCategories = (categories: IProductCategory[], targetId: string) => {
    for (const category of categories) {
        if (areValuesEqual(category.id, targetId)) {
            if (props.pageCategory) {
                breadcrumb.value.push({
                    id: category.id,
                    slug: category.slug,
                    name: category.name
                })
            } else {
                breadcrumb.value.unshift({
                    id: category.id,
                    slug: category.slug,
                    name: category.name
                })
            }

            if (category.parent_id !== null) {
                findParentCategories(categoryList.value, category.parent_id)
            }

            return breadcrumb.value
        } else if (category.children) {
            findParentCategories(category.children, targetId)
        }
    }

    return breadcrumb.value
}

const parentCategories = props.pageCategory ?
    findParentCategories(categoryList.value, props.categoryId)?.reverse() :
    findParentCategories(categoryList.value, props.categoryId)
</script>

<template>
    <BaseBreadcrumbs
        v-if="pageCategory"
        v-once
        :title="title"
    >
        <template
            v-for="category in parentCategories"
            :key="category.id"
        >
            <BaseBreadcrumbsItem
                v-if="categoryId !== category.id"
                :to="navigateCategory(category.slug)"
                :title="category.name"
            />
        </template>
    </BaseBreadcrumbs>

    <BaseBreadcrumbs
        v-else
        v-once
        :title="title"
    >
        <template
            v-for="category in parentCategories"
            :key="category.id"
        >
            <BaseBreadcrumbsItem
                :to="navigateCategory(category.slug)"
                :title="category.name"
            />
        </template>
    </BaseBreadcrumbs>
</template>
