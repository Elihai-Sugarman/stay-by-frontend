<template>
  <router-link class="li" :to="stayDetailsLink" :target="blankOrNot">
    <article class="stay-preview">
      <div class="stay-img-container">
        <div class="block text-center" m="t-4">
          <el-carousel trigger="click" :autoplay="false" :loop="false">
            <el-carousel-item v-for="img in stay.imgUrls" :key="img">
                <img class="stay-img" :src="img"/>
            </el-carousel-item>
          </el-carousel>
        </div>
        <icon-cmp iconType="heart" class="stay-like" @click.prevent="likeStay" :class="{liked: liked}"/>
      </div>
      <div class="preview-info">
        <div class="preview-address">{{ stay.roomType }} in {{ stay.address.city }}</div>
        <span v-if="stay.reviews.length" class="preview-data-info flex">
          <span class="preview-rate-icon">
            <icon-cmp iconType="star"/>
          </span>
          <span class="preview-rate">
            {{ rateInfo }}
          </span>
        </span>
        <div class="preview-name">{{ stay.name }}</div>
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
  mounted(){
    const arrows = document.querySelectorAll('.el-carousel__arrow')
    arrows.forEach(arrow => {
      arrow.addEventListener("click",(event)=>{
        event.preventDefault()
      })
    })
    if (!this.$store.getters.loggedinUser){
      this.liked = false
      return
    }
    const currUser = utilService.deepCopy(this.$store.getters.loggedinUser)
    if (!currUser){
      this.liked = false
      return
    }
    currUser.likedStays.includes(this.stay._id)
    this.liked = currUser.likedStays.includes(this.stay._id)
  },
  data(){
    return {
      liked: false
    }
  },
  computed:{
    blankOrNot() {
      return window.innerWidth < 800 ? '' : '_blank'
    },
    filterBy() {
      return this.$store.getters.filterBy
    },
    stayDetailsLink() {
      const guests = this.filterBy?.guests?.reduce((prev, curr) => {
        return {
          ...prev,
          [curr.type.toLowerCase()]: curr.capacity
        }
      }, {})

      const params = { ...guests }

      if (this.filterBy?.checkIn)
        params.checkIn = this.filterBy.checkIn.getTime()

      if (this.filterBy?.checkOut)
        params.checkOut = this.filterBy.checkOut.getTime()
      
      let queryString = Object.keys(params)
        .map(key => key + '=' + params[key])
        .join('&');

      if (queryString) queryString = '?' + queryString
      return `/stay/${this.stay._id}${queryString}`
    },
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
      if (!this.$store.getters.loggedinUser) return
      const currUser = utilService.deepCopy(this.$store.getters.loggedinUser)
      if (!currUser) return
      this.liked = !this.liked
      const stayIdx = currUser.likedStays.findIndex(id=>id===this.stay._id)
      if (stayIdx === -1) currUser.likedStays.push(this.stay._id)
      else currUser.likedStays.splice(stayIdx,1)
      this.$store.dispatch({type: 'updateUser', user: utilService.deepCopy(currUser)})
        .then(() => {
          // remove stay on wishlist
          if (!this.liked) this.$emit('disliked', this.stay._id)
        })
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