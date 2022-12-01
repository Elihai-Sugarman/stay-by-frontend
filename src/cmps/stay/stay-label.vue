<template>
    <section @click="filter" class="stay-label">
        <p>{{ designedLabel }}</p>
    </section>
</template>

<script>
export default {
    props:{
        label: String,
    },
    computed:{
        designedLabel(){
            let currLabel = this.label.charAt(0).toUpperCase() + this.label.slice(1)
            if (currLabel === 'Omg') currLabel = 'OMG!'
            return currLabel
        },
    },
    methods: {
        filter(){
            // this.$router.push(`stay/${this.label}`)
            this.$emit('filter', this.label)
        },
    }
}
</script>