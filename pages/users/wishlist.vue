<script setup lang="ts">

// ** useHooks
const { dataTable } = useWishlistDataList()
</script>

<template>
    <main>
        <BaseBreadcrumbs title="Sản phẩm yêu thích">
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
                            Sản phẩm yêu thích
                        </h2>

                        <div class="grid grid-cols-12 gap-4">
                            <BaseProductCard
                                v-for="product in dataTable"
                                :key="product.id"
                                :product="product.product"
                                class="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-6"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </UContainer>
    </main>
</template>
