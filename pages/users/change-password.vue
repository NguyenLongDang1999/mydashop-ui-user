<script setup lang="ts">

// ** useHooks
const { pathKey } = useAuthState()

const { handleSubmit, isSubmitting } = useForm<IAuthChangePasswordForm>({
    validationSchema: authChangePasswordSchema
})

// ** Methods
const onSubmit = handleSubmit(values =>
    useFetchData(pathKey.changePassword, {
        method: 'POST',
        body: values
    })
        .then(() => useNotification())
        .catch(() => useNotificationError())
)
</script>

<template>
    <main>
        <BaseBreadcrumbs title="Đổi mật khẩu">
            <BaseBreadcrumbsItem
                :to="ROUTER.USERS_OVERVIEW"
                title="Thông tin tài khoản"
            />
        </BaseBreadcrumbs>

        <UContainer>
            <section class="mt-10">
                <div class="grid gap-4 grid-cols-12">
                    <div class="col-span-3">
                        <UserPageProfile />
                    </div>

                    <div class="col-span-9">
                        <h2 class="capitalize text-2xl font-bold mb-7 text-primary">
                            Đổi mật khẩu
                        </h2>

                        <UCard>
                            <template #header>
                                <h3 class="text-xl font-bold capitalize">
                                    Đổi mật khẩu
                                </h3>
                            </template>

                            <UForm
                                :state="authChangePasswordSchema"
                                @submit="onSubmit"
                            >
                                <div class="grid gap-4 grid-cols-12">
                                    <div class="col-span-12">
                                        <FormInput
                                            :label="authLabel.old_password"
                                            name="old_password"
                                            type="password"
                                        />
                                    </div>

                                    <div class="col-span-6">
                                        <FormInput
                                            :label="authLabel.password"
                                            name="password"
                                            type="password"
                                        />
                                    </div>

                                    <div class="col-span-6">
                                        <FormInput
                                            :label="authLabel.confirm_password"
                                            name="confirm_password"
                                            type="password"
                                        />
                                    </div>

                                    <div class="col-span-12">
                                        <UButton
                                            type="submit"
                                            size="md"
                                            :loading="isSubmitting"
                                        >
                                            Xác Nhận
                                        </UButton>
                                    </div>
                                </div>
                            </UForm>
                        </UCard>
                    </div>
                </div>
            </section>
        </UContainer>
    </main>
</template>
