<template>
  <div class="reviews-list">
    <li v-if="reviews" v-for="review in reviewsToShow">
      <div class="title flex">
        <img :src="review.by.imgUrl" />
        <div class="flex column">
          <span class="name font-md">
            {{ review.by.fullname }}
          </span>
          <span class="subtitle fs14">
            {{ getFormattedReviewDate(review.at) }}
          </span>
        </div>
      </div>
      <div class="txt">
        {{ review.txt }}
      </div>
    </li>
  </div>
  <div v-if="(reviewsCount > limit)" 
      @click="onOpenAllReviewsModal" 
      class="show-all-btn font-md btn">
    Show all {{ reviewsCount }} reviews
  </div>
</template>

<script>
import * as moment from 'moment'

export default {
  name: 'review-cmp',
  emits: ['onOpenAllReviewsModal'],
  props: {
    reviews: Array,
    limit: Number
  },
  methods: {
    getFormattedReviewDate(dateString) {
      return moment(dateString).format('MMM' + ' ' + 'YYYY')
    },
    onOpenAllReviewsModal(){
      this.$emit('onOpenAllReviewsModal')
    }
  },
  computed: {
    reviewsToShow() {
      return this.reviews.length > this.limit - 1 ? this.reviews.slice(0, this.limit) : this.reviews
    },
    reviewsCount() {
      return this.reviews.length
    },
  },
}
</script>
<style></style>
