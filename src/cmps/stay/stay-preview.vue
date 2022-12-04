<template>
  <router-link class="li" :to="`/stay/${stay._id}`" target="_blank">
    <article class="stay-preview">
      <div class="stay-img-container">
        <div class="block text-center" m="t-4">
          <el-carousel trigger="click" :autoplay="false" :loop="false">
            <el-carousel-item v-for="img in stay.imgUrls" :key="img">
                <img class="stay-img" :src="img"/>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- <img class="stay-img" :src="stay.imgUrls[0]"/> -->
        <icon-cmp iconType="heart" class="stay-like" @click.prevent="likeStay" :class="{liked: liked}"/>
      </div>
      <div class="preview-info">
        <div class="preview-address">{{ stay.type }} in {{ stay.address.city }}</div>
        <!-- <div class="preview-address">{{ stay.address.city }}, {{ stay.address.country }}</div> -->
        <span v-if="stay.reviews.length" class="preview-data-info flex">
          <span class="preview-rate-icon">
            <icon-cmp iconType="star"/>
          </span>
          <span class="preview-rate">
            {{ rateInfo }}
          </span>
        </span>
        <div class="preview-time-ago">{{ stay.name }}</div>
        <!-- <div class="preview-time-ago">Added {{ timeAgo }}</div> -->
        <div class="preview-dates">{{ availableDates }}</div>
        <div class="preview-price"><span class="bold">${{ stay.price }}</span> / night</div>
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
  },
  data(){
    return {
      liked: false
    }
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
      this.liked = !this.liked
    },
    moveCarousel(){
      console.log('It works!')
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

<!-- <button type="button" class="el-carousel__arrow el-carousel__arrow--right carousel-arrow-right-enter-from carousel-arrow-right-enter-active" style=""><i class="el-icon"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"></path></svg></i></button> -->