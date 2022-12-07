<template>
  <section v-if="stay" class="order-details">

    <div v-if="!isBooked" class="page-title flex">
      <icon-cmp @click="$router.back()" iconType="leftArrow" class="btn" />
      <h2 class="fs32">Request to book</h2>
    </div>
    <div v-else class="page-title">
      <h2 class="fs32">Reservation success!</h2>
    </div>

    <div class="order-content flex justify-between">
      <div class="details-section">
        <div class="trip-details">
          <h3>Your trip</h3>
          <div class="flex justify-between">
            <h4>Dates</h4>
            <h4>
              {{ getFormattedDate(checkInDate) }} -
              {{ getFormattedDate(checkOutDate) }}
            </h4>
          </div>
          <div class="flex justify-between">
            <h4>Guests</h4>
            <h4>{{ getFormattedGuests() }}</h4>
          </div>
        </div>

        <divider />

        <!-- <div class="host">
          <h3>Your host</h3>
          <img :src="stay.host.imgUrl" />
          <h4>{{ stay.host.fullname }}</h4>
        </div> -->

        <div v-if="!isBooked">
          <branded-btn v-if="loggedinUser" @click="addOrder()">Request to book</branded-btn>
          <div v-else>
            <h3 class="login-msg">Please login to book</h3>
            <login-signup
            :isLoginPage="true"
            :redirectOnSuccess="false"
            />
          </div>
        </div>
        <div v-else>
          <branded-btn v-if="loggedinUser" @click="goToHomepage()">Look for more places to stay</branded-btn>
        </div>
        
      </div>

      <div class="summary-card-section">
        <div class="stay-details flex">
          <img :src="stay.imgUrls[0]" alt="listing image" />
          <div class="stay-desc flex column justify-between">
            <div>
              <h4 class="subtitle fs12">{{ stay.roomType }}</h4>
              <h4 class="font-thin fs14">{{ stay.name }}</h4>
            </div>
            <ratingReview :reviews="stay.reviews" />
          </div>
        </div>
        <divider />
        <div class="price-details">
          <h3>Price details</h3>
          <div class="cost-breakdown flex column">
            <div class="cost-details flex column">
              <div class="base-cost flex justify-between">
                <span class="link">
                  ${{ new Intl.NumberFormat().format(stay.price) }} x
                  {{ totalNights }} nights
                </span>
                <span>
                  ${{ new Intl.NumberFormat().format(stay.price * totalNights) }}
                </span>
              </div>
              <div class="service-fee flex justify-between">
                <span class="link">Service fee</span>
                <span>
                  ${{
                    new Intl.NumberFormat().format(serviceFee * totalNights)
                  }}
                </span>
              </div>
            </div>
            <divider />
            <div class="total-wrapper">
              <div class="cost-total flex justify-between font-md">
                <span>Total</span>
                <span>${{ totalPrice }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as moment from 'moment'
import ratingReview from '../cmps/stay/rating-review-cmp.vue'
import loginSignup from '../views/login-signup.vue'
import { getActionAddOrder } from '../store/order.store'
import { utilService } from '../services/util.service'

export default {
  data() {
    return {
      checkInDate: '',
      checkOutDate: '',
      guests: null,
      serviceFee: 0,
      stay: null,
      isBooked: false
    }
  },
  created() {
    let stayId = this.$route.params.id
    this.getStayById(stayId)
    // const hostId = this.$route.query.hostId
    // this.getHostById(hostId)
    // this.$store.dispatch({ type: 'loadAllStays' })
    this.checkInDate = +this.$route.query.checkInDate
    this.checkOutDate = +this.$route.query.checkOutDate
    
    const adults = +this.$route.query.adults
    const children = +this.$route.query.children || 0
    const infants = +this.$route.query.infants || 0
    const pets = +this.$route.query.pets || 0
    this.guests = {adults, children, infants, pets}

    this.serviceFee = +this.$route.query.serviceFee
  },
  methods: {
    async getStayById(stayId) {
      this.stay = await this.$store.dispatch({
        type: 'getStayById',
        stayId,
      })
    },
    getFormattedDate(date) {
      return moment(date).format('MMM' + ' ' + 'DD')
    },
    getFormattedGuests() {
  
      const {adults, children, infants, pets} = this.guests

      const adultsAndChildren = (children) ? adults + children : adults

      const guestsStr = (adultsAndChildren < 2) ? ' guest' : ' guests'

      const infntStr = (infants > 0) ? ((infants<2) ? ', 1 infant' : `, ${infants} infants`) : ''

      const petStr = (pets > 0) ? ((pets<2) ? ', 1 pet' : `, ${pets} pets`) : ''

      return adultsAndChildren + guestsStr + infntStr + petStr
  
    },
    async addOrder() {
      
      let guestsOrder = utilService.deepCopy(this.guests)

      let order = {
        hostId: this.hostId,
        createdAt: Date.now(),
        host: {
          _id: this.stay.host._id,
          fullname: this.stay.host.fullname,
        },
        totalPrice: +this.totalPrice,
        startDate: +this.checkInDate,
        endDate: +this.checkOutDate,
        guests: guestsOrder,
        stay: {
          _id: this.stay._id,
          name: this.stay.name,
          price: this.stay.price,
        },
        msgs: [],
        status: 'pending', // pending, approved
      }

      try {
        await this.$store.dispatch(getActionAddOrder(order))
        this.isBooked = true
      } catch (error) {
        console.log('Cannot make reservation', error);
      }
    },
    goToHomepage() {
      this.$router.push('/stay')
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
    totalNights() {
      let diff = this.checkOutDate - this.checkInDate
      return Math.floor(diff / 1000 / 60 / 60 / 24)
    },
    totalPrice() {
      return new Intl.NumberFormat().format(
        this.stay.price * this.totalNights + this.serviceFee * this.totalNights
      )
    },
  },
  components: {
    ratingReview,
    loginSignup,
  },
}
</script>
