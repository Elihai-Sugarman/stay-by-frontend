<template>
  <div class="container home">
    <stay-header @filter="filter" />
    <!-- <div class="block text-center" m="t-4">
    <el-carousel trigger="click" height="150px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div> -->
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
    this.$store.dispatch({ type: 'loadAllStays' })
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
