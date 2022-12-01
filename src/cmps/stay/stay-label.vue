<template>
    <section @click="filter" class="stay-label">
        <img class="label-img" :src="labelUrl"/>
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
            if (this.label === 'omg') return 'OMG!'
            else if (this.label === 'bed-breakfast') return 'Bed & breakfasts'
            let currLabel = this.label.charAt(0).toUpperCase() + this.label.slice(1)
            return currLabel.split('-').join(' ')
        },
        labelUrl(){
            return `https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/${this.label}.png`
        }
    },
    methods: {
        filter(){
            // this.$router.push(`stay/${this.label}`)
            this.$emit('filter', this.label)
        },
    }
}
</script>