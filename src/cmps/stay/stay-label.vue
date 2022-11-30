<template>
    <section class="stay-label">
        <p @click="filter">{{ label }}</p>
    </section>
</template>

<script>
export default {
    props:{
        label: String,
    },
    computed:{
        filter(){
            console.log(this.label)
        }
    }
}
</script>