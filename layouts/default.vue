<script setup lang="ts">

// ** useHooks
const { scrollToTop } = useAnchorScroll({
    toTop: {
        scrollOptions: {
            behavior: 'smooth',
            offsetTop: 0
        }
    }
})

// ** Data
const showButton = ref<boolean>(false)

// ** Methods
const handleScroll = () => showButton.value = window.scrollY > 500

onBeforeMount(() => window.addEventListener('scroll', handleScroll))
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
    <LayoutTheHeader />

    <div>
        <slot />
    </div>

    <LazyUContainer>
        <LazyLayoutTheService />
    </LazyUContainer>

    <UButton
        v-if="showButton"
        size="xl"
        icon="i-heroicons-arrow-up"
        class="rounded-full fixed bottom-2 right-2 z-10"
        @click="scrollToTop"
    />

    <LazyLayoutTheFooter />
</template>
