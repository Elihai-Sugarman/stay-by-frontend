<template>
    <section class="stay-header">
        <div class="labels-container">
            <stay-label v-for="label in labels" :label="label" @filter="filter" />
        </div>
        <div class="flex justify-center align-center h-100">
            <stay-filter />
        </div>
    </section>
</template>

<script>
import stayFilter from './stay-filter.vue'

import stayLabel from './stay-label.vue';
    export default {
        components:{
            stayLabel,
            stayFilter
        },
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