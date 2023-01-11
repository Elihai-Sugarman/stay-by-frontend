<template>
  <div v-if="reviews" class="rating-review flex">
    <span class="avg-rating flex font-md">
      <icon-cmp iconType="star" />
      {{ avgRating }}
    </span>
    <span>•</span>
    <span @click="onGoToReviews()" class="rev-count link font-md"> {{ countReviews }} reviews</span>
  </div>
</template>
<script>

export default {
  name: 'rating-review',
  props: { reviews: Array },
  computed: {
    avgRating() {
      return +(
        this.reviews.reduce((acc, currRev) => acc + currRev.rate, 0) /
        this.countReviews
      ).toFixed(2)
    },
    countReviews() {
      return this.reviews.length
    },
  },
  methods: {
    onGoToReviews(){
      this.$emit('goToReviews')
    }
  }
}
</script>
