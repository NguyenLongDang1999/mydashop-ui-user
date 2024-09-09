<script setup lang="ts">

// ** Props & Emits
interface Props {
    price: number
    sellingPrice: number
}

defineProps<Props>()
</script>

<template>
    <span
        class="font-semibold text-base text-primary"
        v-bind="$attrs"
        :class="!areValuesEqual(sellingPrice, price) ? 'pr-3' : ''"
    >{{ formatCurrency(sellingPrice) }}</span>

    <span
        v-if="!areValuesEqual(sellingPrice, price)"
        class="font-normal text-sm text-gray-300 line-through"
    >{{ formatCurrency(price) }}</span>
</template>
