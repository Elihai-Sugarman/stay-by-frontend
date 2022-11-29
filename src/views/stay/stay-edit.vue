<template>
    <div>
        <form @submit.prevent="addStay">
      <h2>Add stay</h2>
      <input type="text" v-model="stayToAdd.name" />
      <button>Save</button>
    </form>
    </div>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { stayService } from '../../services/stay.service.local'
// import { getActionUpdateStay } from '../store/stay.store'

export default {
  data() {
    return {
      stayToAdd: stayService.getEmptyStay()
    }
  },
  methods: {
    async addStay() {
      try {
        await this.$store.dispatch({type: 'addStay', stay: this.stayToAdd})
        showSuccessMsg('Stay added')
        this.stayToAdd = stayService.getEmptyStay()
      } catch(err) {
        console.log(err)
        showErrorMsg('Cannot add stay')
      }
    },
    // async updateStay(stay) {
    //   try {
    //     stay = {...stay}
    //     stay.price = +prompt('New price?', stay.price)
    //     await this.$store.dispatch(getActionUpdateStay(stay))
    //     showSuccessMsg('Stay updated')

    //   } catch(err) {
    //     console.log(err)
    //     showErrorMsg('Cannot update stay')
    //   }
    // },
  }
}
</script>
