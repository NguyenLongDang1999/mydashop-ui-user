<script setup lang="ts">

// ** Router Imports
import type { RouteLocationRaw } from 'vue-router'

// ** useHooks
const { pathKey } = useAuthState()

const { handleSubmit, isSubmitting } = useForm<IAuthLoginForm>({
    validationSchema: authLoginSchema
})

// ** Methods
const onSubmit = handleSubmit(values =>
    useFetchData(pathKey.signIn, {
        method: 'POST',
        body: values
    })
        .then(async () => {
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
                <div class="text-center">
                    <h1 class="uppercase font-bold md:text-3xl sm:text-2xl text-xl">
                        Đăng nhập
                    </h1>

                    <p class="text-gray-500 mb-6 text-base mt-3 capitalize">
                        Chào mừng bạn quay lại! Đăng nhập để tiếp tục mua sắm và theo dõi đơn hàng của bạn một cách dễ dàng.
                    </p>
                </div>

                <div class="mt-5 grid gap-4 grid-cols-12">
                    <div class="xl:col-start-5 xl:col-span-4 lg:col-start-5 lg:col-span-4 md:col-start-4 md:col-span-6 col-span-12">
                        <UForm
                            :state="authLoginSchema"
                            @submit="onSubmit"
                        >
                            <div class="grid gap-4 grid-cols-12">
                                <div class="col-span-12">
                                    <FormInput
                                        model-value="longdang0412@gmail.com"
                                        :label="authLabel.email"
                                        name="email"
                                    />
                                </div>

                                <div class="col-span-12">
                                    <FormInput
                                        model-value="dang04121999"
                                        :label="authLabel.password"
                                        name="password"
                                        type="password"
                                    />
                                </div>

                                <div class="col-span-12">
                                    <div class="text-right">
                                        <NuxtLink
                                            to="/quen-mat-khau"
                                            class="hover:text-primary"
                                        >
                                            Quên Mật Khẩu?
                                        </NuxtLink>
                                    </div>
                                </div>

                                <div class="col-span-12">
                                    <UButton
                                        type="submit"
                                        size="lg"
                                        block
                                        :loading="isSubmitting"
                                    >
                                        ĐĂNG NHẬP
                                    </UButton>
                                </div>
                            </div>

                            <div
                                v-once
                                class="mt-5 text-base text-center text-gray-500"
                            >
                                <span>Hoặc, Đăng nhập với</span>

                                <div class="my-3 flex gap-2 justify-center">
                                    <BaseIconFacebook />
                                    <BaseIconGoogle />
                                </div>

                                <span>Nếu chưa có tài khoản?</span>

                                <div class="mt-5">
                                    <UButton
                                        size="lg"
                                        variant="outline"
                                        to="/dang-ky"
                                        block
                                    >
                                        TẠO TÀI KHOẢN
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
