<template>
  <ul class="stay-list">
    <stay-preview v-for="stayId in user.likedStays" :stay="getStay(stayId)"/>
  </ul>
</template>

<script>
import stayPreview from '../../cmps/stay/stay-preview.vue'
export default {
  components:{
    stayPreview
  },
  data(){
    return {
      user: this.$store.getters.loggedinUser
    }
  },
  methods:{
    getStay(stayId){
      const stays = this.$store.getters.stays
      const idx = stays.findIndex(stay=>stay._id===stayId)
      return stays[idx]
    }
  }
}
</script>