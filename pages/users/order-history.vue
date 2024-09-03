<template>
    <main>
        <BaseBreadcrumbs title="Lịch sử đơn hàng">
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
                            Lịch sử đơn hàng
                        </h2>
                    </div>
                </div>
            </section>
        </UContainer>
    </main>
</template>
