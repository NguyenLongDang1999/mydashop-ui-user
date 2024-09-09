<script setup lang="ts">

// ** useHooks
const config = useRuntimeConfig()
const { data } = await useMetadata()

// ** Methods
const valueSystem = (key: string) => getValueBySlug(key, data.value?.system)

// ** Computed
const dataSystem = computed(() => {
    return {
        system_website_name: valueSystem('system_website_name') || 'Mydashop',
        system_website_motto: valueSystem('system_website_motto') || 'Mua và bán',
        system_website_favicon: valueSystem('system_website_favicon'),
        system_meta_title: valueSystem('system_meta_title'),
        system_meta_description: valueSystem('system_meta_description')
    }
})

// ** Meta SEO
useHead({
    htmlAttrs: {
        lang: 'vi',
        class: 'nuxt-ui-scrollbars'
    },
    bodyAttrs: {
        class: 'font-[Quicksand] bg-white text-sm overflow-x-hidden font-medium'
    },
    link: [
        {
            rel: 'canonical',
            href: config.public.domainUrl as string
        },
        {
            rel: 'icon'

            // href: getPathImageFile(dataWebsiteFavicon.value)
        }
    ],
    title: dataSystem.value.system_meta_title,
    titleTemplate: titleChunk =>
        titleChunk ? `${titleChunk} · ${dataSystem.value.system_website_motto}` : dataSystem.value.system_website_name
})

useServerSeoMeta({
    title: dataSystem.value.system_website_name,
    robots: {
        index: true,
        follow: true
    },
    description: dataSystem.value.system_meta_description,
    ogType: 'website',
    ogUrl: config.public.domainUrl as string,
    ogTitle: dataSystem.value.system_meta_title,
    ogDescription: dataSystem.value.system_meta_description,
    twitterTitle: dataSystem.value.system_meta_title,
    twitterDescription: dataSystem.value.system_meta_description,
    twitterCard: 'summary'
})
</script>

<template>
    <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
    </NuxtLayout>

    <UNotifications
        :ui="{
            strategy: 'override',
        }"
    />
</template>

<style>
.nuxt-ui-scrollbars ::-webkit-scrollbar {
    background-color: transparent;
    height: .6em;
    width: .7em;
}

.nuxt-ui-scrollbars ::-webkit-scrollbar-track {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--color-gray-100)/1);
    background-color: rgb(var(--color-gray-100)/var(--tw-bg-opacity))
}

.nuxt-ui-scrollbars ::-webkit-scrollbar-thumb {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--color-gray-300)/1);
    background-color: rgb(var(--color-gray-300)/var(--tw-bg-opacity));
    border-radius: .6em
}

.nuxt-ui-scrollbars ::-webkit-scrollbar-thumb:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--color-gray-400)/1);
    background-color: rgb(var(--color-gray-400)/var(--tw-bg-opacity))
}

.page-enter-active,
.page-leave-active {
    transition: all .2s
}

.page-leave-to,
.page-enter-from {
    filter: blur(.2rem);
    opacity: 0;
    transform: translateY(1rem)
}
</style>
