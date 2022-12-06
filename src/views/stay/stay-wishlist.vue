<template>
  <ul class="stay-list" v-if="(user && likedStays)">
    <stay-preview
    v-for="stay in likedStays"
    :key="stay._id"
    :stay="stay"
    />
  </ul>
  <div class="empty-wishlist" v-else>
    <h3>Nothing to see here...</h3>
    <h1>Go make some wishes!</h1>
  </div> 
</template>

<script>
import stayPreview from '../../cmps/stay/stay-preview.vue'

export default {
  components: { stayPreview },
  created() {
    // in case of user refresh page in wishlist page
    if (!this.stays.length) this.loadStays()
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser
    },
    stays() {
      return this.$store.getters.stays
    },
    likedStays() {
      return this.stays.filter(stay => this.user.likedStays.includes(stay._id))
    }
  },
  methods: {
    loadStays() {
      this.$store.dispatch({ type: 'loadStays' })
      this.$store.dispatch({ type: 'loadAllStays' })
    }
  }
}
</script>