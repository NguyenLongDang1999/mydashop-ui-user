<script setup lang="ts">

// ** useHooks
const { pathKey } = useAuthState()

// ** Methods
const handleLogin = () =>
    useFetchData(pathKey.loginGoogle)
        .then(data => {
            navigateTo(data.data.value as string, {
                open: {
                    target: '_parent'
                }
            })
        })
        .catch(() => useNotificationError())
</script>

<template>
    <BaseIconGoogle @click="handleLogin" />
</template>
