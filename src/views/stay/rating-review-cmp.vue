<template>
  <div v-if="stay" class="rating-review flex">
    <span class="avg-rating flex font-md">
      <icon-cmp iconType="star" />
      {{ avgRating }}
    </span>
    <span>•</span>
    <span class="rev-count link font-md"> {{ countReviews }} reviews</span>
  </div>
</template>
<script>
import iconCmp from '../../cmps/icon-cmp.vue'

export default {
  name: 'rating-review',
  props: {
    stay: Object,
  },
  data() {
    return {
      
    }
  },
  computed: {
    avgRating() {
      return +(
        this.stay.reviews.reduce((acc, currRev) => acc + currRev.rate, 0) /
        this.countReviews
      ).toFixed(2)
    },
    countReviews() {
      return this.stay.reviews.length
    },
  },
  components: {
    iconCmp,
  },
}
</script>
