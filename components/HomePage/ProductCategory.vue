<script setup lang="ts">

// ** Props & Emits
interface Props {
    productCategories: IProductCategory[]
}

const props = defineProps<Props>()

// ** Computed
const productCategory = computed(() =>
    props.productCategories.map((category: IProductCategory) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        link: navigateCategory(category.slug),
        imageSrc: category.image_uri
    })) || []
)
</script>

<template>
    <section
        v-once
        class="grid grid-cols-12 mt-10"
    >
        <div class="col-span-12">
            <div class="flex items-center justify-between">
                <h2 class="uppercase font-bold md:text-3xl sm:text-2xl text-xl">
                    Danh mục hàng đầu
                </h2>

                <UButton
                    label="Button"
                    color="gray"
                    trailing-icon="i-heroicons-arrow-right-20-solid"
                    to="/tat-ca-danh-muc"
                >
                    Xem Tất Cả
                </UButton>
            </div>

            <div class="grid grid-cols-12 gap-4 mt-5">
                <UCard
                    v-for="category in productCategory"
                    :key="category.id"
                    class="lg:col-span-4 sm:col-span-6 col-span-12 relative"
                >
                    <div class="flex gap-4">
                        <NuxtLink :to="category.link">
                            <NuxtImg
                                :src="category.imageSrc"
                                :alt="category.name"
                                :title="category.name"
                                width="100"
                                height="100"
                                class="min-w-[100px] h-[100px] rounded-md object-cover"
                            />
                        </NuxtLink>

                        <div class="flex flex-col gap-4 mb-4">
                            <NuxtLink
                                :to="category.link"
                                :title="category.name"
                                class="transition-colors hover:text-primary line-clamp-1"
                            >
                                <h6 class="capitalize font-medium">
                                    {{ category.name }}
                                </h6>
                            </NuxtLink>

                            <p class="line-clamp-3">
                                {{ category.description }}
                            </p>
                        </div>
                    </div>

                    <NuxtLink
                        :to="category.link"
                        class="absolute bg-primary text-white px-2 py-1 text-xs rounded-tl-md right-0 bottom-0"
                    >
                        Xem Tất Cả
                    </NuxtLink>
                </UCard>
            </div>
        </div>
    </section>
</template>
