<template>
  <section v-if="stay" class="stay-details">

    <!-- <header class="full">
      <div>
        <span>Photos</span>
        <span>Amenities</span>
        <span>Reviews</span>
        <span>Location</span>
      </div>
    </header> -->

    <el-carousel trigger="click" :autoplay="false" :loop="false" class="full mobile-only">
      <el-carousel-item v-for="img in stay.imgUrls" :key="img">
        <img class="stay-img" :src="img"/>
      </el-carousel-item>
    </el-carousel>

    <h1 class="name-title">{{ stay.name }}</h1>

    <div class="flex justify-between">
      <div class="name-subtitle flex">
        <ratingReview @goToReviews="openAllReviewsModal" :reviews="stay.reviews" />
  
        <span v-if="stay.host.isSuperhost">•</span>
        <span class="superhost flex" v-if="stay.host.isSuperhost">
          Superhost
        </span>
  
        <span>•</span>
        <span @click="scrollToMap" class="address link font-md">
          {{ stay.address.street }}
        </span>
      </div>
      <div class="save-stay flex btn">
        <icon-cmp iconType="heart" />
        <span class="link fs14">Save</span>
      </div>

    </div>

    <div class="images-container">
      <img :src="img" v-for="img in imgsToDisplay" />
    </div>

    <div class="mid-section">
      <div class="more-details">
        <div class="heading flex justify-between">
          <div class="txt column flex justify-between">
            <h2 class="title subheading">
              {{ stay.roomType }} hosted by {{ stay.host.fullname }}
            </h2>
            <div class="flex capacity-details">
              <div class="capacity-subtitle">{{ stay.capacity }} guests</div>
              <span>•</span>
              <div class="capacity-subtitle">{{ stay.bedrooms }} bedroom<span v-if="(+stay.bedrooms>1)">s</span> </div>
              <span>•</span>
              <div class="capacity-subtitle">{{ +stay.bedrooms*2 }} beds </div>
              <span>•</span>
              <div class="capacity-subtitle">{{ stay.bathrooms }} bath<span v-if="(+stay.bathrooms>1)">s</span> </div>
            </div>
          </div>
          <img :src="stay.host.imgUrl" />
        </div>
        <divider />

        <div class="special-perks">
          <div class="superhost flex" v-if="stay.host.isSuperhost">
            <icon-cmp iconType="bwBadge" />
            <div class="txt">
              <h4>{{ stay.host.fullname }} is a Superhost</h4>
              <span class="subtitle">
                Superhosts are experienced, highly rated hosts who are committed
                to providing great stays for guests.
              </span>
            </div>
          </div>

          <div class="flex">
            <icon-cmp iconType="key" />
            <div class="txt">
              <h4>Great check-in experience</h4>
              <span class="subtitle">
                100% of recent guests gave the check-in process a 5-star rating.
              </span>
            </div>
          </div>

          <div class="flex">
            <icon-cmp iconType="locMarker" />
            <div class="txt">
              <h4>Great location</h4>
              <span class="subtitle"
                >90% of recent guests gave the location a 5-star rating.</span
              >
            </div>
          </div>

          <div class="flex">
            <icon-cmp iconType="greatComm" />
            <div class="txt">
              <h4>Great communication</h4>
              <span class="subtitle">
                100% of recent guests rated {{ stay.host.fullname }} 5-star in
                communication.
              </span>
            </div>
          </div>
        </div>

        <divider />

        <div class="summary">
          {{ stay.summary }}
        </div>

        <divider />

        <div class="amenities">
          <h4 class="subheading">What this place offers</h4>
          <div class="amenities-container">
            <li v-for="amenity in filteredAmenities">
              <stayAmenity :amenity="amenity" />
            </li>
          </div>
        </div>
      </div>

      <div class="reservation-section">
        <div class="reservation flex">
          <div class="reservation-container font-thin">
            <div>
              <div class="reservation-form-header">
                <p>
                  <span class="cost font-md">${{ stay.price }}</span> night
                </p>
                <ratingReview @goToReviews="openAllReviewsModal" :reviews="stay.reviews" />
              </div>
              <div class="reservation-data">
                <div @click="openDatePicker()" class="date-picker">
                  <dates-modal
                    :open="isDatesOpen"
                    @change="handleDatesChange"
                    @close="isDatesOpen = false"
                  />
                  <div class="date-input">
                    <label>CHECK-IN</label>
                    <input
                      :value="getFormattedDate(order.checkInDate)"
                      :class="{ subtitle: !isDatesChosen }"
                    />
                  </div>
                  <div class="date-input">
                    <label>CHECKOUT</label>
                    <input
                      :value="getFormattedDate(order.checkOutDate)"
                      :class="{ subtitle: !isDatesChosen }"
                    />
                  </div>
                </div>

                <div @click="openGuestPicker()" class="guest-input">
                  <guest-modal
                    class=""
                    :initialAdultCapacity="1"
                    :open="isGuestsOpen"
                    @change="handleGuestsChange"
                    @close="isGuestsOpen = false"
                  />
                  <label>GUESTS</label>
                  <input :value="getFormattedGuests()" class="font-thin" placeholder="1 Adult" />
                  <svg viewBox="0 0 320 512" width="100" title="angle-down">
                    <path
                      d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
                    />
                  </svg>
                </div>
              </div>

              <branded-btn @click="callToActionClicked()">{{
                callToActionBtnTxt
              }}</branded-btn>
            </div>

            <div v-if="isDatesChosen">
              <span class="reservation-txt flex column justify-between">
                You won't be charged yet
              </span>

              <div class="reservation-summary">
                <div class="cost-breakdown flex column">
                  <div class="cost-details flex column">
                    <div class="base-cost flex justify-between">
                      <span class="link">
                        ${{ new Intl.NumberFormat().format(stay.price) }} x
                        {{ totalNights }} nights
                      </span>
                      <span>
                        ${{
                          new Intl.NumberFormat().format(order.basePrice)
                        }}
                      </span>
                    </div>
                    <div class="service-fee flex justify-between">
                      <span class="link">Service fee</span>
                      <span>
                        ${{
                          new Intl.NumberFormat()
                          .format(order.serviceFee * totalNights)
                        }}
                      </span>
                    </div>
                  </div>

                  <div class="total-wrapper">
                    <divider />

                    <div class="cost-total flex justify-between font-md">
                      <span>Total</span>
                      <span>${{totalPrice}}</span>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <divider />

    <div class="reviews-and-map">
      <div class="reviews">
        <h1 class="flex subheading">
          <ratingReview :reviews="stay.reviews" />
        </h1>
        <div class="reviews-container">
          <review-cmp
            @onOpenAllReviewsModal="openAllReviewsModal"
            :reviews="stay.reviews"
            :limit="6"
          />
        </div>
      </div>

      <divider />

      <div ref="mapSection" class="map">
        <h4 class="subheading">Where you'll be</h4>
        <div class="address-txt">{{ stay.address.street }}</div>
        <div class="map-container">
          <stay-map :location="stay.address.location" />
        </div>
      </div>
    </div>

    <div class="all-reviews">
      <Transition
        name="custom-classes"
        enter-active-class="animate__fadeInUpBig"
        leave-active-class="animate__fadeOutDownBig"
      >
        <all-reviews-modal
          @close-modal="isReviewsModalOpen = false"
          :reviews="stay.reviews"
          :isOpen="isReviewsModalOpen"
        />
      </Transition>
    </div>

    <!-- <details>
      <summary>Full JSON</summary>
      <pre>{{ stay }}</pre>
    </details> -->
  </section>
</template>

<script>
// import {userService} from '../services/user.service'
import stayAmenity from '../../cmps/stay/stay-amenity.vue'
import ratingReview from '../../cmps/stay/rating-review-cmp.vue'
import reviewCmp from '../../cmps/stay/review-cmp.vue'
import stayMap from '../../cmps/stay-map.vue'
import allReviewsModal from '../../cmps/stay/all-reviews-modal.vue'
import guestModal from '../../cmps/guest-modal.vue'
import datesModal from '../../cmps/dates-modal.vue'
import moment from 'moment'
import _random from 'lodash/random'
import _camelCase from 'lodash/camelCase'
import { utilService } from '../../services/util.service'
import { stayService } from '../../services/stay.service'

export default {
  name: 'stay-details',
  data() {
    return {
      stay: null,
      order: {
        checkInDate: '',
        checkOutDate: '',
        // checkDates: [],
        guests: {adults:1},
        basePrice: 0,
        serviceFee: 0,
      },
      isDatesOpen: false,
      isGuestsOpen: false,
      isReviewsModalOpen: false,
      amenities: [
        'heating',
        'bathEssentials',
        'kitchen',
        'cookingBasics',
        'bedLinens',
        'hotWaterKettle',
        'dishesAndSilverware',
        'washer',
        'dryer',
        'dishwasher',
        'selfCheckIn',
        'cleaningBeforeCheckout',
        'tv',
        'firstAidKit',
        'gym',
        'iron',
        'microwave',
        'bodySoap',
        'hairDryer',
        'coffeeMaker',
        'travelCrib',
        'hotWater',
        'beachfront',
        'beachView',
        'essentials',
        'bathroomEssentials',
        'lockbox',
        'airConditioning',
        'smokingAllowed',
        'wifi',
        'hangers',
        'doorman',
        'longTermStaysAllowed',
        'stove',
        'bathtub',
        'extraPillowsAndBlankets',
        'freeParkingOnPremises',
        'paidParkingOnPremises',
        'paidParkingOffPremises',
        'bbqGrill',
        'elevator',
        'oven',
        'fireExtinguisher',
        'pool',
        'petsAllowed',
        'hotTub',
        'refrigerator',
        'privateEntrance',
        'patioOrBalcony',
        'minus',
        'plus',
      ],
    }
  },
  async created() {
    // const user = await userService.getById(id)
    this.loadStay()
    
    this.order.checkInDate = +this.$route.query.checkIn
    this.order.checkOutDate = +this.$route.query.checkOut

    const adults = +this.$route.query.adults
    const children = +this.$route.query.children || 0
    const infants = +this.$route.query.infants || 0
    const pets = +this.$route.query.pets || 0
    this.guests = {adults, children, infants, pets}

  },
  // watch: {
  //   stayId: {
  //     handler() {
  //       if(this.stayId){
  //           this.$store.dispatch({ type: "loadAndWatchUser", userId: this.userId })
  //       }
  //     },
  //     immediate: true,
  //   },
  // },
  computed: {
    avgRating() {
      return +(
        this.stay.reviews.reduce((acc, currRev) => acc + currRev.rate, 0) /
        this.countReviews
      ).toFixed(2)
    },
    countReviews() {
      return this.stay.reviews.length
    },
    imgsToDisplay() {
      // return this.stay.imgUrls.concat(this.stay.imgUrls.slice(0,2))

      //THIS IS TEMP FOR WHILE WE ONLY HAVE 3 IMGS FOR EACH STAY!!
      // return [...this.stay.imgUrls, ...this.stay.imgUrls.slice(0, 2)]
      return this.stay.imgUrls.slice(0, 6)
    },
    getServiceFee() {
      return _random(this.stay.price/10, this.stay.price*15/100).toFixed()
    },
    isDatesChosen() {
      return this.order.checkInDate || this.order.checkOutDate
    },
    // totalNights() {
    //   //this is temp while we don't get the dates from the user
    //   return _random(2, 10)
    // },
    callToActionBtnTxt() {
      return !this.order.checkInDate || !this.order.checkOutDate
        ? 'Check availabilty'
        : 'Reserve'
    },
    filteredAmenities() {
      return this.stay.amenities
        .slice(0)
        .filter((amenity) => this.amenities.includes(_camelCase(amenity)))
        .slice(0, 10)
    },
    totalNights() {
      if (!this.order.checkOutDate || !this.order.checkInDate) return 0
      let diff = this.order.checkOutDate - this.order.checkInDate
      return Math.floor(diff / 1000 / 60 / 60 / 24)
    },
    totalPrice() {
     return new Intl.NumberFormat()
        .format(this.stay.price * this.totalNights + this.order.serviceFee * this.totalNights)
    },
    windowWidth(){
      return window.innerWidth
    }
  },
  methods: {
    async loadStay() {
      const stayId = this.$route.params.id
      this.stay = await stayService.getById(stayId)
      this.setBasePrice()
      this.setServiceFee()
    },
    setBasePrice() {
      this.order.basePrice = (this.order.checkInDate && this.order.checkOutDate) ? this.stay.price * this.totalNights : this.stay.price
    },
    setServiceFee() {
      this.order.serviceFee = this.getServiceFee
    },
    scrollToMap(){
      const el = this.$refs.mapSection
      el.scrollIntoView({behavior: 'smooth'})
    },
    openAllReviewsModal() {
      this.isReviewsModalOpen = true
    },
    handleDatesChange(dates) {
      this.order.checkInDate = Date.parse(dates.checkIn)
      this.order.checkOutDate = Date.parse(dates.checkOut)

      this.order.basePrice = this.stay.price * this.totalNights
      this.order.serviceFee = this.getServiceFee
    },
    handleGuestsChange(guests) {
      let chosenGuests = guests.reduce((prev, curr) => {
        return {
          ...prev,
          [curr.type.toLowerCase()]: +curr.capacity
        }
      }, {})
      this.order.guests = chosenGuests
    },
    openDatePicker() {
      this.isDatesOpen = true
    },
    openGuestPicker() {
      this.isGuestsOpen = true
    },
    getFormattedDate(date) {
      if (!date) return 'Add date'
      return moment(date).format('MM' + '/' + 'DD' + '/' + 'YYYY')
    },
    getFormattedGuests() {
      const {adults, children, infants, pets} = this.order.guests
      const adultsAndChildren = (children) ? adults + children : adults
      const guestsStr = (adultsAndChildren < 2) ? ' guest' : ' guests'
      const infntStr = (infants > 0) ? ((infants<2) ? ', 1 infant' : `, ${infants} infants`) : ''
      const petStr = (pets > 0) ? ((pets<2) ? ', 1 pet' : `, ${pets} pets`) : ''
      return adultsAndChildren + guestsStr + infntStr + petStr
    },
    callToActionClicked() {
      if (!this.order.checkInDate || !this.order.checkOutDate) this.isDatesOpen = true
      else {
        const order = utilService.deepCopy(this.order)
        for (const type in order.guests) {
          order[type] = order.guests[type]
        }
        delete order.guests

        this.$router.push({name:'order-details', query: order})
      }
    },
  },
  components: {
    stayAmenity,
    reviewCmp,
    ratingReview,
    stayMap,
    allReviewsModal,
    guestModal,
    datesModal,
  },
}
</script>
