<template>
    <section class="stay-header flex row">
        <stay-label v-for="label in labels" :label="label" @filter="filter" />
    </section>
</template>

<script>
import stayLabel from './stay-label.vue';
    export default {
        components:{
            stayLabel,
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