<template>
    <section class="stay-header">
        <!-- <div class="labels-container"> -->
            <Carousel class="labels-container" :settings="settings" :breakpoints="breakpoints">
                <Slide v-for="label in labels" :key="slide">
                    <stay-label :label="label" @filter="filter" />
                </Slide>

                 <template #addons>
                    <Navigation />
                </template>
            </Carousel>
            <!-- <stay-label v-for="label in labels" :label="label" @filter="filter" /> -->
        <!-- </div> -->
        <div class="flex justify-center align-center h-100">
            <stay-filter />
        </div>
    </section>
</template>

<script>
import stayFilter from './stay-filter.vue'
import stayLabel from './stay-label.vue'

import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
// import 'vue3-carousel/carousel.css'

    export default {
        components:{
            stayLabel,
            stayFilter,
            Carousel,
            Slide,
            Navigation,
        },
        data: () => ({
            // carousel settings
            settings: {
            itemsToShow: 3,
            itemsToScroll: 1,
            snapAlign: 'center',
        },
        // breakpoints are mobile first
        // any settings not specified will fallback to the carousel settings
        breakpoints: {
            // 700px and up
            700: {
            itemsToShow: 4,
            itemsToScroll: 4,
            snapAlign: 'center',
            },
            // 1024 and up
            1024: {
                itemsToShow: 5,
                itemsToScroll: 5,
                snapAlign: 'start',
                },
            },
        }),
        computed: {
            labels(){
                return this.$store.getters.labels
            },
        },
        methods: {
            filter(label){
                this.$emit('filter', label)
            },
        }
    }
</script>