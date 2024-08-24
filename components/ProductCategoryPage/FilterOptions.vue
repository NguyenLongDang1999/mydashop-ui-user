<script setup lang="ts">

// ** Props & Emits
interface Props {
    categoryAttribute?: IProductAttribute[]
}

const props = defineProps<Props>()

// ** Data
const showAll = ref<boolean[]>([])
const searchTemp = inject('searchTemp') as IProductCategoryFilter
const attributeList: string[] = []

if (props.categoryAttribute && props.categoryAttribute?.length) {
    props.categoryAttribute.map(_v => attributeList.push(_v.name))
}

const getChildrenList = (index: number): unknown[] => {
    if (props.categoryAttribute && props.categoryAttribute.length) {
        return props.categoryAttribute[index].product_attribute_values.flatMap(_c => ({
            ..._c,
            name: _c.value
        }))
    }

    return []
}

const items = attributeList.map((_v, index) => ({
    label: _v,
    children: getChildrenList(index)
}))
</script>

<template>
    <nav class="space-y-3">
        <UAccordion
            :items="items"
            :ui="{
                item: { base: 'mb-0 pl-4 border-l border-gray-200 dark:border-gray-800 ml-2' }
            }"
            multiple
            default-open
        >
            <template #default="{ item, open }">
                <UButton
                    color="gray"
                    variant="link"
                    :padded="false"
                    :ui="{
                        strategy: 'override',
                        base: 'flex items-center gap-1.5 group mb-2 w-full focus-visible:outline-primary border-transparent',
                    }"
                    :class="item.defaultOpen ? '!text-primary' : ''"
                    class="hover:no-underline"
                >
                    <NuxtLink :to="item.to">
                        <span class="text-sm/6 font-semibold truncate capitalize">{{ item.label }}</span>
                    </NuxtLink>

                    <template #trailing>
                        <UIcon
                            name="i-heroicons-chevron-right-20-solid"
                            class="w-5 h-5 ms-auto transform transition-transform duration-200"
                            :class="[open && 'rotate-90']"
                        />
                    </template>
                </UButton>
            </template>

            <template #item="{ item }">
                <ul class="flex flex-col gap-2 mb-4">
                    <li
                        v-for="attribute in item.children.slice(0, showAll[item.label] ? undefined : 5)"
                        :key="attribute.id"
                        class="capitalize"
                    >
                        <UCheckbox
                            v-model="searchTemp.productAttributes"
                            :name="attribute.name"
                            :value="attribute.id"
                            :label="attribute.name"
                        />
                    </li>

                    <li
                        v-if="item.children.length > 5"
                        class="flex gap-3 items-center justify-center cursor-pointer hover:text-primary"
                        @click="showAll[item.label] = !showAll[item.label]"
                    >
                        {{ showAll[item.label] ? 'Rút Gọn' : 'Xem Tất Cả' }}
                        <UIcon :name="showAll[item.label] ? 'i-heroicons-chevron-double-up' : 'i-heroicons-chevron-double-down'" />
                    </li>
                </ul>
            </template>
        </UAccordion>
    </nav>
</template>
