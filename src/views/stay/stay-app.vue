<template>
  <div class="container home">
    <stay-header @filter="filter" />
    <stay-list v-if="stays.length" :stays="stays" />
    <!-- <hr /> -->
    <!-- <stay-edit /> -->
  </div>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
// import { getActionRemoveStay, getActionUpdateStay, getActionAddStayMsg } from '../../store/test.store'

import stayEdit from './stay-edit.vue'
import stayList from '../../cmps/stay/stay-list.vue'
import stayHeader from '../../cmps/stay/stay-header.vue'

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
      // return this.$store.state.stays
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
    printStayToConsole(stay) {
      console.log('Stay msgs:', stay.msgs)
    },
    filter(label){
      const filterBy = { label }
      this.$store.commit({type: 'setFilterBy', filterBy: JSON.parse(JSON.stringify(filterBy))})
      this.$store.dispatch('loadStays')
    }
  }


}
</script>
