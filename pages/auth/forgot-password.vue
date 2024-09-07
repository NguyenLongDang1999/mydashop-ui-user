<script setup lang="ts">

// ** useHooks
const { pathKey } = useAuthState()

const { handleSubmit, isSubmitting } = useForm<IAuthForgotPasswordForm>({
    validationSchema: authForgotPasswordSchema
})

// ** Methods
const onSubmit = handleSubmit(values =>
    useFetchData(pathKey.forgotPassword, {
        method: 'POST',
        body: values
    })
        .then(() => useNotification())
        .catch(() => useNotificationError())
)
</script>

<template>
    <main>
        <BaseBreadcrumbs title="Quên mật khẩu" />

        <UContainer>
            <section class="mt-10">
                <div class="text-center">
                    <h1 class="uppercase font-bold md:text-3xl sm:text-2xl text-xl">
                        Quên mật khẩu
                    </h1>

                    <p class="text-gray-500 mb-6 text-base mt-3 capitalize">
                        Đừng lo, chúng tôi sẽ giúp bạn lấy lại mật khẩu nhanh chóng. Hãy nhập email để nhận hướng dẫn khôi phục.
                    </p>
                </div>

                <div class="mt-5 grid gap-4 grid-cols-12">
                    <div class="xl:col-start-5 xl:col-span-4 lg:col-start-4 lg:col-span-6 md:col-start-3 md:col-span-8 col-span-12">
                        <UForm
                            :state="authForgotPasswordSchema"
                            @submit="onSubmit"
                        >
                            <div class="grid gap-4 grid-cols-12">
                                <div class="col-span-12">
                                    <FormInput
                                        :label="authLabel.email"
                                        name="email"
                                    />
                                </div>

                                <div class="col-span-12">
                                    <UButton
                                        type="submit"
                                        size="lg"
                                        block
                                        :loading="isSubmitting"
                                    >
                                        XÁC NHẬN
                                    </UButton>
                                </div>

                                <div class="col-span-12">
                                    <p class="mt-6 text-center text-gray-600">
                                        Nhớ mật khẩu? <NuxtLink
                                            :href="ROUTER.AUTH_LOGIN"
                                            class="text-blue-500 hover:underline capitalize"
                                        >
                                            Đăng nhập
                                        </NuxtLink>
                                    </p>
                                </div>
                            </div>
                        </UForm>
                    </div>
                </div>
            </section>
        </UContainer>
    </main>
</template>
