<template>
  <section class="amenity flex">
    <!-- {{ camelizedAmenity }} -->
    <icon-cmp :iconType="camelizedAmenity" />
    <span>{{ amenity }}</span>
  </section>
</template>

<script>
import _camelCase from 'lodash/camelCase'

export default {
  props: { amenity: String },
  computed: {
    camelizedAmenity() {
      return _camelCase(this.amenity)
    }
  }
}
</script>
