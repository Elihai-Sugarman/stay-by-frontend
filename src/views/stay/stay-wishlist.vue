<template>
  <ul class="stay-list" v-if="user">
    <stay-preview v-for="stayId in user.likedStays" :key="stayId" :stay="getStay(stayId)"/>
  </ul>
</template>

<script>
import stayPreview from '../../cmps/stay/stay-preview.vue'
export default {
  components:{
    stayPreview
  },
  created() {
    if (!this.stays.length) this.loadStays()
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser
    },
    stays() {
      return this.$store.getters.stays
    },
  },
  methods:{
    getStay(stayId){
      const stays = this.$store.getters.stays
      const idx = stays.findIndex(stay=>stay._id===stayId)
      return stays[idx]
    },
    loadStays() {
        this.$store.dispatch({ type: 'loadStays' })
        this.$store.dispatch({ type: 'loadAllStays' })
      }
  }
}
</script>