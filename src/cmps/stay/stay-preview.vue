<template>
  <router-link class="li" :to="stayDetailsLink" :target="blankOrNot">
    <article class="stay-preview">
      <div class="stay-img-container">
        <div class="block text-center" m="t-4">
          <el-carousel trigger="click" :autoplay="false" :loop="false">
            <el-carousel-item v-for="img in stay.imgUrls" :key="img">
              <img class="stay-img" :src="img" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <icon-cmp iconType="heart" class="stay-like" @click.prevent="likeStay" :class="stayLikeClass" />
      </div>
      <div class="preview-info">
        <div class="preview-address">{{ stay.roomType }} in {{ stay.address.city }}</div>
        <span v-if="stay.reviews.length" class="preview-data-info flex">
          <span class="preview-rate-icon">
            <icon-cmp iconType="star" />
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
import { utilService } from '../../services/util.service'

export default {
  props: { stay: Object },
  mounted() {
    const arrows = document.querySelectorAll('.el-carousel__arrow')
    arrows.forEach(arrow => {
      arrow.addEventListener("click", (event) => {
        event.preventDefault()
      })
    })
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser
    },
    stayLikeClass() {
      return {
        liked: this.user?.likedStays.includes(this.stay._id)
      }
    },
    blankOrNot() {
      return window.innerWidth < 800 ? '' : '_blank'
    },
    availableDates() {
      const month = utilService.getRandomMonth()
      const length = utilService.getRandomIntInclusive(3, 7)
      const startDate = utilService.getRandomIntInclusive(1, 30 - length)
      return month + ' ' + startDate + '-' + (startDate + length)
    },
    rateInfo() {
      if (!this.stay.reviews.length) return 'New'
      return (
        this.stay.reviews.reduce((acc, currRev) => acc + currRev.rate, 0) /
        this.stay.reviews.length
      ).toFixed(2) + ' (' + this.stay.reviews.length + ')'
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
    }
  },
  methods: {
    likeStay() {
      if (!this.user) return
      const currUser = utilService.deepCopy(this.user)
      const isLiked = !this.stayLikeClass.liked

      const stayIdx = currUser.likedStays.findIndex(id => id === this.stay._id)
      if (stayIdx === -1 && isLiked) currUser.likedStays.unshift(this.stay._id)
      else currUser.likedStays.splice(stayIdx, 1)

      this.$store.dispatch({ type: 'updateUser', user: currUser })
    }
  }
}
</script>