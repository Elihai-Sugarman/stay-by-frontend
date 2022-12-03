<template>
  <div class="reviews-list">
    <li v-if="reviews" v-for="review in reviewsToShow">
      <div class="title flex">
        <img :src="review.by.imgUrl" />
        <div class="flex column">
          <span>
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
  <div v-if="reviewsCount > 6" class="show-all-btn font-md btn">
    Show all {{ reviewsCount }} reviews
  </div>
</template>

<script>
import * as moment from 'moment'

export default {
  name: 'review-cmp',
  props: {
    reviews: Array,
  },
  methods: {
    getFormattedReviewDate(dateString) {
      return moment(dateString).format('MMM' + ' ' + 'YYYY')
    },
  },
  computed: {
    reviewsToShow() {
      return this.reviews.length > 5 ? this.reviews.slice(0, 6) : this.reviews
    },
    reviewsCount() {
      return this.reviews.length
    },
  },
}
</script>
<style></style>
