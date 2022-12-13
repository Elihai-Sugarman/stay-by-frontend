<template>
  <ul class="stay-list" v-if="(user && likedStays.length)">
    <stay-preview
    v-for="stay in likedStays"
    :key="stay._id"
    :stay="stay"
    />
  </ul>
  <!-- <div class="empty-wishlist" v-else>
    <h3>Nothing to see here...</h3>
    <h1>Go make some wishes!</h1>
  </div>  -->
</template>

<script>
import stayPreview from '../../cmps/stay/stay-preview.vue'
import { stayService } from '../../services/stay.service'

export default {
  components: { stayPreview },
  data() {
    return {
      likedStays: []
    }
  },
  created() {
    this.loadStays()
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser
    }
  },
  watch: {
    user() {
      this.loadStays()
    }
  },
  methods: {
    async loadStays() {
      this.likedStays = await stayService.getLikedStays()
    }
  }
}
</script>