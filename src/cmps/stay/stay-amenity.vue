<template>
  <section>
    {{camelizedAmenity}}
    <icon-cmp :iconType="camelizedAmenity" />
    <span>{{amenity}}</span>
  </section>
</template>

<script>
import iconCmp from '../icon-cmp.vue'

export default {
  props: {
    amenity: String,
  },
  data() {
    return {}
  },
  computed: {
    camelizedAmenity() {
      return this.amenity
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
          return index === 0 ? word.toLowerCase() : word.toUpperCase()
        })
        .replace(/\s+/g, '')
    },
  },
  components: {
    iconCmp
  }
}
</script>
