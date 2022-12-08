<template>
  <div class="container home">
    <stay-header @filter="filter" />
    <stay-list v-if="stays.length" :stays="stays" />
  </div>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'

import stayEdit from './stay-edit.vue'
import stayList from '../../cmps/stay/stay-list.vue'
import stayHeader from '../../cmps/stay/stay-header.vue'
import { utilService } from '../../services/util.service'

export default {
  components: {
    stayHeader,
    stayList,
    stayEdit,
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    stays() {
      return this.$store.getters.stays
    },
    queryParams(){
      return this.$route.query
    }
  },
  watch: {
    queryParams(query){
      if (query.label) {
        const filterBy = { label: query.label }
        this.$store.commit({ type: 'setFilterBy', filterBy })
        this.$store.dispatch({ type: 'loadStays' })
      }
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadStays' })
  },
  methods: {
    async removeStay(stayId) {
      try {
        await this.$store.dispatch(getActionRemoveStay(stayId))
        showSuccessMsg('Stay removed')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot remove stay')
      }
    },
    async updateStay(stay) {
      try {
        stay = { ...stay }
        stay.price = +prompt('New price?', stay.price)
        await this.$store.dispatch(getActionUpdateStay(stay))
        showSuccessMsg('Stay updated')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update stay')
      }
    },
    async addStayMsg(stayId) {
      try {
        await this.$store.dispatch(getActionAddStayMsg(stayId))
        showSuccessMsg('Stay msg added')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add stay msg')
      }
    },
    filter(label){
      const filterBy = { label }
      this.$router.push({ path: '/stay', query: filterBy })
    }
  }


}
</script>
