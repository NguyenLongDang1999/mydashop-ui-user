<script setup lang="ts">

// ** useHooks
const { dataList } = await useProductCategoryDataListNested()
</script>

<template>
    <main>
        <BaseBreadcrumbs
            v-once
            title="Danh mục"
        />

        <UContainer>
            <section
                v-once
                class="mt-10"
            >
                <div
                    v-for="productCategory in dataList"
                    :key="productCategory.id"
                    class="mb-7"
                >
                    <NuxtLink
                        :to="navigateCategory(productCategory.slug)"
                        class="hover:text-primary mb-6 pb-3 flex gap-2 items-center border-b-2 border-gray-200 relative after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-20 after:border-b-2 after:border-primary"
                    >
                        <NuxtImg
                            :src="productCategory.image_uri"
                            :alt="productCategory.name"
                            :title="productCategory.name"
                            width="50"
                            height="50"
                            class="min-w-12 h-12 rounded-full object-cover"
                        />

                        <h3 class="text-lg font-semibold capitalize">
                            {{ productCategory.name }}
                        </h3>
                    </NuxtLink>

                    <ul class="grid gap-8 grid-cols-12">
                        <li
                            v-for="subProductCategory in productCategory.children"
                            :key="subProductCategory.id"
                            class="col-span-6 md:col-span-4"
                        >
                            <NuxtLink
                                :to="navigateCategory(subProductCategory.slug)"
                                class="text-base line-clamp-1 text-gray-500 font-medium capitalize hover:text-primary"
                            >
                                {{ subProductCategory.name }}
                            </NuxtLink>

                            <LazyProductCategoryPageNested
                                :product-categories="subProductCategory.children"
                                class="ml-3"
                            />
                        </li>
                    </ul>
                </div>
            </section>
        </UContainer>
    </main>
</template>
