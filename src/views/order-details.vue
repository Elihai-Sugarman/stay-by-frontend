<template>
  <section v-if="stay" class="order-details">
    
    <div class="page-title flex">
      <icon-cmp @click="$router.back()" iconType="leftArrow" class="btn" />
      <h2 class="fs32">Request to book</h2>
    </div>
    
    <div class="order-content flex justify-between">
      <div class="details-section">
  
        <div class="trip-details">
          <h3>Your trip</h3>
          <div class="flex justify-between">
            <h3>Dates</h3>
            <h4>
              {{ getFormattedDate(checkInDate) }} -
              {{ getFormattedDate(checkOutDate) }}
            </h4>
          </div>
          <div class="flex justify-between">
            <h3>Guests</h3>
            <h4>{{ getFormattedGuests() }}</h4>
          </div>
        </div>
  
        <div class="host">
          <h3>Your host</h3>
          <img :src="stay.host.imgUrl" />
          <h4>{{ stay.host.fullname }}</h4>
        </div>
  
        <branded-btn v-if="loggedinUser">Request to book</branded-btn>
        <div v-else>
          <h2>Please login to book</h2>
          <login-signup :isLoginPage="true" :redirectOnSuccess="false"/>
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
        <divider/>
        <div class="price-details">
          <h3>Price details</h3>
          <div class="cost-breakdown flex column">
            <div class="cost-details flex column">
              <div class="base-cost flex justify-between">
                <span class="link">
                  ${{ new Intl.NumberFormat().format(basePrice) }} x
                  {{ totalNights }} nights
                </span>
                <span>
                  ${{ new Intl.NumberFormat().format(basePrice * totalNights) }}
                </span>
              </div>
              <div class="service-fee flex justify-between">
                <span class="link">Service fee</span>
                <span>
                  ${{ new Intl.NumberFormat().format(serviceFee * totalNights) }}
                </span>
              </div>
            </div>
  
            <div class="total-wrapper">
              <divider />
  
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

export default {
  data() {
    return {
      checkInDate: '',
      checkOutDate: '',
      guests: [],
      basePrice: 0,
      serviceFee: 0,
      stay: null,
      // user: null
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
    const adultCount = this.$route.query.Adults || 1
    const childrenCount = this.$route.query.Children
    const infantCount = this.$route.query.Infants
    const petCount = this.$route.query.Pets
    this.guests.push({ type: 'Adults', capacity: adultCount })
    if (childrenCount)
      this.guests.push({ type: 'Children', capacity: childrenCount })
    if (infantCount)
      this.guests.push({ type: 'Infants', capacity: infantCount })
    if (petCount) this.guests.push({ type: 'Pets', capacity: petCount })
    this.basePrice = +this.$route.query.basePrice
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
      return this.guests
        .map(({ type, capacity }) => `${capacity} ${type}`)
        .join(', ')
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
      return new Intl.NumberFormat().format(
        this.basePrice * this.totalNights + this.serviceFee * this.totalNights
      )
    },
  },
  components: {
    ratingReview,
    loginSignup
  },
}
</script>
