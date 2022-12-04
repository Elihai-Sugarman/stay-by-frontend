<template>
  <div v-if="reviews" class="all-reviews-modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <h1 class="flex subheading">
        <ratingReview :reviews="reviews" />
      </h1>
      <div class="reviews-container">
        <review-cmp :reviews="reviews" />
      </div>
    </div>
  </div>
</template>
<script>
import ratingReview from './rating-review-cmp.vue'
import reviewCmp from './review-cmp.vue'

export default {
  name: 'all-reviews-modal',
  props: {
    reviews: Array,
  },
  data() {
    return {}
  },
  components: {
    ratingReview,
    reviewCmp,
  },
}
</script>
