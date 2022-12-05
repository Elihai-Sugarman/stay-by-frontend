<template>
    <section class="stay-header">
        <Carousel class="labels-container" :settings="settings" :breakpoints="breakpoints">
            <Slide v-for="label in labels" :key="label">
                <stay-label :label="label" @filter="filter" :clickedLabel="clickedLabel" />
            </Slide>

            <template #addons>
                <Navigation />
            </template>
        </Carousel>

        <!-- <div class="labels-container">
            <stay-label v-for="label in labels" :label="label" @filter="filter" />
        </div> -->

        <!-- <div class="flex justify-center align-center h-100">
            <stay-filter />
        </div> -->
    </section>
</template>

<script>
import stayFilter from './stay-filter.vue'
import stayLabel from './stay-label.vue'

import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
// import 'vue3-carousel/carousel.css'
import 'vue3-carousel/dist/carousel.css'


    export default {
        components:{
            stayLabel,
            stayFilter,
            Carousel,
            Slide,
            Navigation,
        },
        mounted() {
            console.log(this.$route.query)
            this.clickedLabel = this.$route.query.label
        },
        // mounted(){
        //     this.settings = {
        //             itemsToShow: 3,
        //             itemsToScroll: 3,
        //             snapAlign: 'center',
        //         }
        // },
        data(){
            return {
                clickedLabel: this.$route.query.label,
            //     settings: {
            //     itemsToShow: 11.5,
            //     itemsToScroll: 1,
                // snapAlign: 'start',
                // wrapAround: true,
            //     mouseDrag: false,
            //     touchDrag: false,
            //     modelValue: 0,
            // },

            // breakpoints: {
            //     1600: {
            //         itemsToShow: 13.5,
            //     },

            // },

                // carousel settings
                settings: {
                    itemsToShow: 3,
                    itemsToScroll: 3,
                    snapAlign: 'center',
                    wrapAround: true,
                },
                // breakpoints are mobile first
                // any settings not specified will fallback to the carousel settings
                breakpoints: {
                    // 400px and up
                    400: {
                        itemsToShow: 4,
                        itemsToScroll: 4,
                        snapAlign: 'center',
                    },
                    // 500px and up
                    500: {
                        itemsToShow: 5,
                        itemsToScroll: 5,
                        snapAlign: 'center',
                    },
                    // 600px and up
                    600: {
                        itemsToShow: 7,
                        itemsToScroll: 7,
                        snapAlign: 'center',
                    },
                    // 700px and up
                    700: {
                        itemsToShow: 8,
                        itemsToScroll: 8,
                        snapAlign: 'center',
                    },
                    // 800px and up
                    800: {
                        itemsToShow: 10,
                        itemsToScroll: 10,
                        snapAlign: 'center',
                    },
                    // 900px and up
                    900: {
                        itemsToShow: 11,
                        itemsToScroll: 11,
                        snapAlign: 'center',
                    },
                    // 1000 and up
                    1000: {
                        itemsToShow: 12,
                        itemsToScroll: 12,
                        snapAlign: 'start',
                    },
                    // 1100 and up
                    1100: {
                        itemsToShow: 13,
                        itemsToScroll: 13,
                        snapAlign: 'start',
                    },
                },
            }
        },
        computed: {
            labels(){
                return this.$store.getters.labels
            },
        },
        methods: {
            filter(label){
                this.clickedLabel = label
                this.$emit('filter', label)
            },
        },
    }
</script>