<script setup lang="ts">

// ** useHooks
const { handleSubmit } = useForm<IAuthResetPasswordForm>({
    validationSchema: authResetPasswordSchema
})

const { isPending, mutateAsync } = useAuthResetPassword()

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync(values))
</script>

<template>
    <main>
        <BaseBreadcrumbs title="Đặt lại mật khẩu" />

        <UContainer>
            <section class="mt-10">
                <div class="text-center">
                    <h1 class="uppercase font-bold md:text-3xl sm:text-2xl text-xl">
                        Đặt lại mật khẩu
                    </h1>

                    <p class="text-gray-500 mb-6 text-base mt-3 capitalize">
                        Nhập mật khẩu mới của bạn bên dưới để bảo vệ tài khoản. Hãy chắc chắn rằng mật khẩu đủ mạnh và dễ nhớ.
                    </p>
                </div>

                <div class="mt-5 grid gap-4 grid-cols-12">
                    <div class="xl:col-start-5 xl:col-span-4 lg:col-start-4 lg:col-span-6 md:col-start-3 md:col-span-8 col-span-12">
                        <UForm
                            :state="authResetPasswordSchema"
                            @submit="onSubmit"
                        >
                            <div class="grid gap-4 grid-cols-12">
                                <div class="col-span-12">
                                    <FormInput
                                        :label="authLabel.password"
                                        name="password"
                                        type="password"
                                    />
                                </div>

                                <div class="col-span-12">
                                    <FormInput
                                        :label="authLabel.confirm_password"
                                        name="confirm_password"
                                        type="password"
                                    />
                                </div>

                                <div class="col-span-12">
                                    <UButton
                                        type="submit"
                                        size="lg"
                                        block
                                        :loading="isPending"
                                    >
                                        ĐẶT LẠI MẬT KHẨU
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
