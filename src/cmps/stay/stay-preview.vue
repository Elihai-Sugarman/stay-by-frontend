<template>
    <li>
      <p>{{ stay.address.city }}, {{ stay.address.country }}</p>
      <p>Added {{ timeAgo }}</p>
      <p>{{ availableDates }}</p>
      <p><span class="bold">${{ stay.price }}</span> night</p>
        <!-- <p>
          {{stay.name}}
        </p>
        <p>
          ${{stay.price?.toLocaleString()}}
        </p>
        <button @click="removeStay(stay._id)">x</button>
        <button @click="updateStay(stay)">Update</button>
        <hr />
        <button @click="addStayMsg(stay._id)">Add stay msg</button>
        <button @click="printStayToConsole(stay)">Print msgs to console</button> -->
      </li>
</template>

<script>
import {showErrorMsg, showSuccessMsg} from '../../services/event-bus.service'
import { getActionRemoveStay, getActionUpdateStay, getActionAddStayMsg } from '../../store/stay.store'
import { utilService } from '../../services/util.service'
import * as moment from 'moment'

export default {
  props:{
    stay: Object,
  },
  created() {
    
  },
  computed:{
    timeAgo(){
      return moment(this.stay.createdAt).fromNow()
    },
    availableDates(){
      return new Date.getMonth(utilService.getRandomIntInclusive(0,11))
    },
  },
  methods: {
    async removeStay(stayId) {
      try {
        await this.$store.dispatch(getActionRemoveStay(stayId))
        showSuccessMsg('Stay removed')

      } catch(err) {
        console.log(err)
        showErrorMsg('Cannot remove stay')
      }
    },
    async updateStay(stay) {
      try {
        stay = {...stay}
        stay.price = +prompt('New price?', stay.price)
        await this.$store.dispatch(getActionUpdateStay(stay))
        showSuccessMsg('Stay updated')

      } catch(err) {
        console.log(err)
        showErrorMsg('Cannot update stay')
      }
    },
    async addStayMsg(stayId) {
      try {
        await this.$store.dispatch(getActionAddStayMsg(stayId))
        showSuccessMsg('Stay msg added')
      } catch(err) {
        console.log(err)
        showErrorMsg('Cannot add stay msg')
      }
    },
    printStayToConsole(stay) {
      console.log('Stay msgs:', stay.msgs)
    }
  }
}
</script>