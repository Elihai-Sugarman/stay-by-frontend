<template>
  <section class="amenity flex">
    <!-- {{camelizedAmenity}} -->
    <icon-cmp :iconType="camelizedAmenity" />
    <span>{{amenity}}</span>
  </section>
</template>

<script>
import iconCmp from '../icon-cmp.vue'
import _camelCase from 'lodash/camelCase'

export default {
  props: {
    amenity: String,
  },
  data() {
    return {}
  },
  computed: {
    camelizedAmenity() {
        return _camelCase(this.amenity)
    },
  },
  components: {
    iconCmp
  }
}
</script>
