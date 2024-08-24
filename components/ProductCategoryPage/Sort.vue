<script setup lang="ts">

// ** Props & Emits
const emits = defineEmits(['categoryView'])

// ** Data
const isList = ref<boolean>(false)
const search = inject('search') as IProductCategoryFilter

// ** useHooks
const route = useRoute()

// ** Computed
const sort = computed(() => sortOption.find(_v => areValuesEqual(_v.id, search.sort as number)))
const paginate = computed(() => paginationOption.find(_v => areValuesEqual(_v, search.pageSize as number)))

// ** Watch
watch(isList, val => emits('categoryView', val))
</script>

<template>
    <div class="mb-4 bg-gray-50 rounded-md flex gap-4 items-center justify-between py-2 px-5">
        <div class="flex items-center gap-2">
            <UButton
                icon="i-heroicons-squares-2x2"
                size="sm"
                color="primary"
                square
                :variant="isList ? 'outline' : 'solid'"
                @click="isList = false"
            />

            <UButton
                icon="i-heroicons-list-bullet"
                size="sm"
                color="primary"
                square
                :variant="isList ? 'solid' : 'outline'"
                @click="isList = true"
            />
        </div>

        <div class="flex gap-4 items-center">
            <div class="flex gap-2 items-center capitalize">
                <p class="hidden sm:block">
                    Sắp xếp
                </p>

                <USelectMenu
                    v-model="search.sort"
                    :options="sortOption"
                    value-attribute="id"
                    class="w-40"
                    @update:model-value="navigateTo({
                        path: route.path,
                        query: {
                            ...search,
                            sort: search.sort
                        }
                    })"
                >
                    <template #label>
                        {{ sort?.label }}
                    </template>
                </USelectMenu>
            </div>

            <div class="flex gap-2 items-center capitalize">
                <p class="hidden sm:block">
                    Hiển Thị
                </p>

                <USelectMenu
                    v-model="search.pageSize"
                    :options="paginationOption"
                    class="w-20"
                    @update:model-value="navigateTo({
                        path: route.path,
                        query: {
                            ...search,
                            page: PAGE.CURRENT,
                            pageSize: search.pageSize
                        }
                    })"
                >
                    <template #label>
                        {{ paginate }}
                    </template>
                </USelectMenu>
            </div>
        </div>
    </div>
</template>
