<script setup lang="ts">

// ** useHooks
const { handleSubmit } = useForm<IAuthForgotPasswordForm>({
    validationSchema: authForgotPasswordSchema
})

const { isPending, mutateAsync } = useAuthForgotPassword()

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync(values))
</script>

<template>
    <main>
        <BaseBreadcrumbs title="Quên mật khẩu" />

        <UContainer>
            <section class="mt-10">
                <h1 class="text-center uppercase font-bold md:text-3xl sm:text-2xl text-xl">
                    Quên mật khẩu
                </h1>

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
                                        :loading="isPending"
                                    >
                                        XÁC NHẬN
                                    </UButton>
                                </div>
                            </div>
                        </UForm>
                    </div>
                </div>
            </section>
        </UContainer>
    </main>
</template>
