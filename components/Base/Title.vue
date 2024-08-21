<script setup lang="ts">

// ** Props & Emits
interface Props {
    icon?: boolean
    title: string
}

defineProps<Props>()
</script>

<template>
    <div class="flex gap-3 items-center">
        <UIcon
            v-if="icon"
            name="i-heroicons-bolt"
            class="md:text-3xl sm:text-2xl text-xl text-red-500"
        />

        <h2 class="md:text-3xl sm:text-2xl text-xl font-bold uppercase">
            {{ title }}
        </h2>

        <UIcon
            v-if="icon"
            name="i-heroicons-bolt"
            class="md:text-3xl sm:text-2xl text-xl text-red-500"
        />
    </div>
</template>
