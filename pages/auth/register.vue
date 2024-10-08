<script setup lang="ts">

// ** Router Imports
import type { RouteLocationRaw } from 'vue-router'

// ** useHooks
const { pathKey } = useAuthState()

const { handleSubmit, isSubmitting } = useForm<IAuthRegisterForm>({
    validationSchema: authRegisterSchema
})

// ** Methods
const onSubmit = handleSubmit(values =>
    useFetchData(pathKey.signUp, {
        method: 'POST',
        body: values
    })
        .then(() => {
            const { query } = useRoute()
            const isLoggedIn = useAuth()

            isLoggedIn.value = true

            nextTick(() => navigateTo(query.to as RouteLocationRaw))
            useNotification('Đăng nhập thành công!')
        })
        .catch(() => useNotificationError())
)
</script>

<template>
    <main>
        <BaseBreadcrumbs title="Đăng Nhập" />

        <UContainer>
            <section class="mt-10">
                <h1 class="text-center uppercase font-bold md:text-3xl sm:text-2xl text-xl">
                    Đăng ký
                </h1>

                <div class="mt-5 grid gap-4 grid-cols-12">
                    <div class="xl:col-start-5 xl:col-span-4 lg:col-start-4 lg:col-span-6 md:col-start-3 md:col-span-8 col-span-12">
                        <UForm
                            :state="authRegisterSchema"
                            @submit="onSubmit"
                        >
                            <div class="grid gap-4 grid-cols-12">
                                <div class="col-span-6">
                                    <FormInput
                                        :label="authLabel.name"
                                        name="name"
                                    />
                                </div>

                                <div class="col-span-6">
                                    <FormInput
                                        :label="authLabel.phone"
                                        name="phone"
                                    />
                                </div>

                                <div class="col-span-12">
                                    <FormInput
                                        :label="authLabel.email"
                                        name="email"
                                    />
                                </div>

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
                                        :loading="isSubmitting"
                                    >
                                        ĐĂNG KÝ
                                    </UButton>
                                </div>
                            </div>
                        </UForm>

                        <div
                            v-once
                            class="mt-5 text-base text-center text-gray-500"
                        >
                            <span>Hoặc, Đăng nhập với</span>

                            <div class="my-3 flex gap-2 justify-center">
                                <BaseIconFacebook />
                                <BaseIconGoogle />
                            </div>

                            <span>Bạn đã có tài khoản?</span>

                            <div class="mt-5">
                                <UButton
                                    size="lg"
                                    variant="outline"
                                    to="/dang-nhap"
                                    block
                                >
                                    TỚI ĐĂNG NHẬP
                                </UButton>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </UContainer>
    </main>
</template>
