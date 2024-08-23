<script setup lang="ts">

// ** Props & Emits
interface Props {
    slider: IHomeSlider[]
}

defineProps<Props>()

// ** Data
const creativeEffect = {
    prev: {
        shadow: false,
        translate: ['-20%', 0, -1]
    },
    next: {
        translate: ['100%', 0, 0]
    }
}
</script>

<template>
    <section v-once>
        <Swiper
            :modules="[SwiperAutoplay, SwiperEffectCube]"
            :slides-per-view="1"
            :autoplay="{
                delay: 8000,
                disableOnInteraction: true,
            }"
            :creative-effect="creativeEffect"
            loop
            effect="creative"
        >
            <SwiperSlide
                v-for="(item, index) in slider"
                :key="index"
            >
                <NuxtLink :to="item.image_link">
                    <NuxtImg
                        :src="item.image_uri"
                        :alt="item.image_link"
                        :title="item.image_link"
                        width="1900"
                        height="500"
                        class="w-full object-cover h-[500px]"
                    />
                </NuxtLink>
            </SwiperSlide>
        </Swiper>
    </section>
</template>
