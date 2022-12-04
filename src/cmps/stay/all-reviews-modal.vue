<template>
  <Transition
    name="custom-classes"
    enter-active-class="animate__fadeInUpBig"
    leave-active-class="animate__fadeOutDownBig"
  >
    <div v-if="isOpen" class="all-reviews-modal" @click.self="onCloseModal">
      <div class="modal-content">
        <span @click="onCloseModal" class="close">&times;</span>
        <h1 class="flex subheading">
          <ratingReview :reviews="reviews" />
        </h1>
        <div class="reviews-container">
          <review-cmp :reviews="reviews" />
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>
import ratingReview from './rating-review-cmp.vue'
import reviewCmp from './review-cmp.vue'

export default {
  name: 'all-reviews-modal',
  props: {
    reviews: Array,
    isOpen: Boolean,
  },
  emits: ['closeModal'],
  data() {
    return {}
  },
  methods: {
    onCloseModal() {
      this.$emit('closeModal')
    },
  },
  components: {
    ratingReview,
    reviewCmp,
  },
}
</script>
