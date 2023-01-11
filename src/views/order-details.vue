<template>
  <section v-if="stay" class="order-details">
    <div class="page-title flex">
      <icon-cmp @click="$router.back()" iconType="leftArrow" class="btn" />
      <div v-if="!isBooked">
        <h2 class="fs32">Request to book</h2>
      </div>
      <div v-else class="success-title flex">
        <icon-cmp iconType="greenCheck" />
        <h2 class="fs32">Reservation success!</h2>
      </div>
    </div>

    <div class="order-content flex justify-between">
      <div class="details-section flex column justify-between">
        <div>
          <div class="rare-find flex justify-between">
            <div>
              <h4>This is a rare find</h4>
              <h5>{{stay.host.fullname}}'s place is usually booked.</h5>
            </div>
            <div>
              <icon-cmp iconType="rareDiamond" />
            </div>
  
          </div>
          <div class="trip-details">
            <h3>Your trip</h3>
            <div class="flex justify-between">
              <h4>Dates</h4>
              <h5>
                {{ getFormattedDate(checkInDate) }} -
                {{ getFormattedDate(checkOutDate) }}
              </h5>
            </div>
            <div class="flex justify-between">
              <h4>Guests</h4>
              <h5>{{ getFormattedGuests() }}</h5>
            </div>
          </div>
        </div>

        <divider />

        <!-- <div class="host">
          <h3>Your host</h3>
          <img :src="stay.host.imgUrl" />
          <h4>{{ stay.host.fullname }}</h4>
        </div> -->

        <div v-if="!isBooked">
          <branded-btn v-if="loggedinUser" @click="addOrder()">Confirm</branded-btn>
          <div v-else>
            <h3 class="login-msg">Please login to book</h3>
            <login-signup :isLoginPage="true" :redirectOnSuccess="false" />
          </div>
        </div>
        <div v-else>
          <icon-cmp />
            <h3 class="success-msg">We look forward to hosting you!</h3> 
          <branded-btn v-if="loggedinUser" @click="goToTrips()">Review Trips</branded-btn>
          <div class="success-txt flex">
            <icon-cmp iconType="greenCheck" />
            <h4 class="fs24">Reservation success!</h4>
          </div>
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
                  ${{
                    new Intl.NumberFormat().format(stay.price * totalNights)
                  }}
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
                <span>${{ formattedPrice(totalPrice) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'
import ratingReview from '../cmps/stay/rating-review-cmp.vue'
import loginSignup from '../views/login-signup.vue'
import { getActionAddOrder } from '../store/order.store'
import { stayService } from '../services/stay.service'

export default {
  data() {
    return {
      checkInDate: '',
      checkOutDate: '',
      guests: null,
      serviceFee: 0,
      stay: null,
      isBooked: false,
    }
  },
  created() {
    this.loadStay()
    this.checkInDate = +this.$route.query.checkInDate
    this.checkOutDate = +this.$route.query.checkOutDate

    const adults = +this.$route.query.adults
    const children = +this.$route.query.children || 0
    const infants = +this.$route.query.infants || 0
    const pets = +this.$route.query.pets || 0
    this.guests = { adults, children, infants, pets }

    this.serviceFee = +this.$route.query.serviceFee
  },
  methods: {
    async loadStay() {
      const stayId = this.$route.params.id
      this.stay = await stayService.getById(stayId)
    },
    getFormattedDate(date) {
      return moment(date).format('MMM' + ' ' + 'DD')
    },
    getFormattedGuests() {
      const { adults, children, infants, pets } = this.guests
      const adultsAndChildren = children ? adults + children : adults
      const guestsStr = adultsAndChildren < 2 ? ' guest' : ' guests'
      const infntStr =
        infants > 0 ? (infants < 2 ? ', 1 infant' : `, ${infants} infants`) : ''
      const petStr = pets > 0 ? (pets < 2 ? ', 1 pet' : `, ${pets} pets`) : ''
      return adultsAndChildren + guestsStr + infntStr + petStr
    },
    async addOrder() {
      const order = {
        host: {
          _id: this.stay.host._id,
          fullname: this.stay.host.fullname,
        },
        totalPrice: +this.totalPrice,
        startDate: +this.checkInDate,
        endDate: +this.checkOutDate,
        guests: this.guests,
        stay: {
          _id: this.stay._id,
          name: this.stay.name,
          price: this.stay.price,
          imgUrl: this.stay.imgUrls[0],
        },
        status: 'pending', // pending, approved or rejected
      }

      try {
        await this.$store.dispatch(getActionAddOrder(order))
        this.isBooked = true
      } catch (error) {}
    },
    goToTrips() {
      this.$router.push('/trip')
    },
    formattedPrice(price) {
      return new Intl.NumberFormat().format(price)
    },
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
      return (
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
