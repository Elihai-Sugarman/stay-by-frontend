<template>
  <router-link class="li" :to="`/stay/${stay._id}`" target="_blank">
    <article class="stay-preview">
      <div class="stay-img-container">
        <img class="stay-img" :src="stay.imgUrls[0]"/>
        <icon-cmp iconType="heart" class="stay-like" @click.prevent="likeStay"/>
      </div>
      <div class="preview-info">
          <div class="preview-address">{{ stay.address.city }}, {{ stay.address.country }}</div>
          <span v-if="stay.reviews.length" class="preview-data-info flex">
            <span class="preview-rate-icon">
              <icon-cmp iconType="star"/>
            </span>
            <span class="preview-rate">
              {{ rateInfo }}
            </span>
          </span>
        <div class="preview-time-ago">Added {{ timeAgo }}</div>
        <div class="preview-dates">{{ availableDates }}</div>
        <div class="preview-price"><span class="bold">${{ stay.price }}</span> night</div>
    </div>
    </article>
    </router-link>
</template>

<script>
import {showErrorMsg, showSuccessMsg} from '../../services/event-bus.service'
import { getActionRemoveStay, getActionUpdateStay, getActionAddStayMsg } from '../../store/stay.store'
import { utilService } from '../../services/util.service'
import * as moment from 'moment'
import iconCmp from '../icon-cmp.vue'

export default {
  props:{
    stay: Object,
  },
  components:{
    iconCmp
  },
  created() {
    
  },
  computed:{
    timeAgo(){
      return moment(this.stay.createdAt).fromNow()
    },
    availableDates(){
      const month = utilService.getRandomMonth()
      const length = utilService.getRandomIntInclusive(3,7)
      const startDate = utilService.getRandomIntInclusive(1,30-length)
      return month + ' ' + startDate + '-' + (startDate+length)
    },
    imgURL(){
      return this.stay.imgUrls[0]
    },
    rateInfo() {
      if (!this.stay.reviews.length) return 'New'
      return (
        this.stay.reviews.reduce((acc, currRev) => acc + currRev.rate, 0) /
        this.stay.reviews.length
      ).toFixed(2) + ' (' + this.stay.reviews.length + ')'
    },
  },
  methods: {
    likeStay(){
      console.log('it works!')
    },
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