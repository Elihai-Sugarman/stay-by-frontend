<template>
  <div v-if="reviews" class="all-reviews-modal" :class="{open: isOpen}">
    <div class="modal-content">
      <span @click="(isOpen=false)" class="close">&times;</span>
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
    return {
        isOpen: false
    }
  },
  computed: {
    isOpenToggle () {
        this.isOpen = !this.isOpen
    }
  },
  components: {
    ratingReview,
    reviewCmp,
  },
}
</script>
