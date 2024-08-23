<script setup lang="ts">

// ** Props & Emits
interface Props {
    productCategories: IProductCategory[]
}

defineProps<Props>()
</script>

<template>
    <ul
        v-if="productCategories.length"
        class="mt-4 flex flex-col gap-4"
    >
        <li
            v-for="productCategory in productCategories"
            :key="productCategory.id"
        >
            <NuxtLink
                :to="navigateCategory(productCategory.slug)"
                class="flex gap-1 items-center text-base line-clamp-1 text-gray-500 font-medium capitalize hover:text-primary"
            >
                <UIcon name="i-heroicons-arrow-small-right" />
                <span class="flex-1">{{ productCategory.name }}</span>
            </NuxtLink>

            <LazyProductCategoryPageNested
                v-if="productCategory.children.length"
                :product-categories="productCategory.children"
            />
        </li>
    </ul>
</template>
