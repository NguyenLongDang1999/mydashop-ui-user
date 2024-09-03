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
        imageSrc: category.image_uri || IMAGE.DEFAULT
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
                <div
                    v-for="category in productCategory"
                    :key="category.id"
                    class="lg:col-span-3 md:col-span-4 sm:col-span-4 col-span-6 relative"
                >
                    <NuxtLink :to="category.link">
                        <div class="flex flex-col relative overflow-hidden h-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-md rounded-lg cursor-pointer transition-transform-background motion-reduce:transition-none data-[pressed=true]:scale-[0.97] tap-highlight-transparent">
                            <div class="relative flex w-full flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left subpixel-antialiased overflow-visible p-0">
                                <div
                                    class="relative shadow-black/5 shadow-md rounded-lg"
                                    style="max-width: 100%;"
                                >
                                    <NuxtImg
                                        :src="category.imageSrc"
                                        :alt="category.name"
                                        :title="category.name"
                                        width="100"
                                        height="100"
                                        class="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-md transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-lg w-full object-cover h-[140px]"
                                    />
                                </div>
                            </div>

                            <div class="p-3 h-auto capitalize flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large text-small justify-center">
                                <b>{{ category.name }}</b>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
