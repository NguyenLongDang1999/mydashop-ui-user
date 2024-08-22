<script setup lang="ts">

// ** Props & Emits
interface Props {
    product: any
}

defineProps<Props>()
</script>

<template>
    <ul class="flex flex-col gap-1 mt-2">
        <li class="font-semibold">
            <span class="capitalize">Mã sản phẩm:</span>
            <span class="pl-2 text-primary">{{ product.sku }}</span>
        </li>

        <li
            v-if="product.productBrand"
            class="font-semibold"
        >
            <span class="capitalize">Thương hiệu:</span>

            <NuxtLink
                to="/"
                class="pl-2 capitalize text-primary"
            >
                {{ product.productBrand.name }}
            </NuxtLink>
        </li>

        <li
            v-if="product.productCategory"
            class="font-semibold"
        >
            <span class="capitalize">Danh mục:</span>

            <NuxtLink
                :to="navigateCategory(product.productCategory.slug)"
                class="pl-2 capitalize text-primary"
            >
                {{ product.productCategory.name }}
            </NuxtLink>
        </li>
    </ul>
</template>
