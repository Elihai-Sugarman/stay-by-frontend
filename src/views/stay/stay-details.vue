<template>
  <section v-if="stay" class="stay-details">
    <h1 class="name-title">{{ stay.name }}</h1>
    <div class="name-subtitle flex">
      <ratingReview :reviews="stay.reviews" />

      <span v-if="stay.host.isSuperhost">•</span>
      <span class="superhost flex" v-if="stay.host.isSuperhost">
        Superhost
      </span>

      <span>•</span>
      <span class="address link font-md">
        {{ stay.address.street }}
      </span>
    </div>
    <div class="images-container">
      <img :src="img" v-for="img in imgsToDisplay" />
    </div>

    <div class="mid-section">
      <div class="more-details">
        <div class="heading flex justify-between">
          <div class="txt">
            <h2 class="title subheading">
              {{ stay.roomType }} hosted by {{ stay.host.fullname }}
            </h2>
            <div class="capacity-subtitle">{{ stay.capacity }} guests</div>
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
                <ratingReview :reviews="stay.reviews" />
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
                      :value="getFormattedDate(checkInDate)"
                      :class="{ subtitle: !isDatesChosen }"
                    />
                  </div>
                  <div class="date-input">
                    <label>CHECKOUT</label>
                    <input
                      :value="getFormattedDate(checkOutDate)"
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
                  <input :value="getFormattedGuests()" class="font-thin" />
                  <svg viewBox="0 0 320 512" width="100" title="angle-down">
                    <path
                      d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
                    />
                  </svg>
                </div>
              </div>

              <branded-btn>{{ callToActionBtnTxt }}</branded-btn>
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
                          new Intl.NumberFormat().format(
                            stay.price * totalNights
                          )
                        }}
                      </span>
                    </div>
                    <div class="service-fee flex justify-between">
                      <span class="link">Service fee</span>
                      <span>
                        ${{
                          new Intl.NumberFormat().format(
                            serviceFee * totalNights
                          )
                        }}
                      </span>
                    </div>
                  </div>

                  <div class="total-wrapper">
                    <divider />

                    <div class="cost-total flex justify-between font-md">
                      <span>Total</span>
                      <span
                        >${{
                          new Intl.NumberFormat().format(
                            stay.price * totalNights + serviceFee * totalNights
                          )
                        }}
                      </span>
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

      <div class="map">
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
import * as moment from 'moment'
import _random from 'lodash/random'
import _camelCase from 'lodash/camelCase'

export default {
  name: 'stay-details',
  data() {
    return {
      stay: null,
      checkInDate: '',
      checkOutDate: '',
      // checkDates: [],
      guests: [],
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
    let stayId = this.$route.params.id
    this.getStayById(stayId)
    this.$store.dispatch({ type: 'loadAllStays' })
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
    serviceFee() {
      return _random(15, 40)
    },
    isDatesChosen() {
      return this.checkInDate || this.checkOutDate
    },
    // totalNights() {
    //   //this is temp while we don't get the dates from the user
    //   return _random(2, 10)
    // },
    callToActionBtnTxt() {
      return !this.checkInDate || !this.checkOutDate
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
      if (!this.checkOutDate || !this.checkInDate) return 0
      let checkin = new Date(this.checkInDate)
      let checkout = new Date(this.checkOutDate)
      let diff = checkout.getTime() - checkin.getTime()
      return Math.floor(diff / 1000 / 60 / 60 / 24)
    },
  },
  methods: {
    async getStayById(stayId) {
      this.stay = await this.$store.dispatch({
        type: 'getStayById',
        stayId,
      })
    },
    openAllReviewsModal() {
      console.log('open reviews modal')
      this.isReviewsModalOpen = true
    },
    handleDatesChange(dates) {
      this.checkInDate = dates.checkIn
      this.checkOutDate = dates.checkOut
      // console.log('checkin', this.getFormattedDate(this.checkInDate), 'checkout', this.checkOutDate.getTime());
    },
    handleGuestsChange(guests) {
      this.guests = guests
      console.log('guests', this.guests)
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
      // if (!this.guests || this.guests.length === 0)
      if (!this.guests.length) return '1 Adult'

      let adultObject = this.guests.find(guest => guest.type === 'Adults')
      console.log('adult count', adultObject.capacity);
      let adultCount = adultObject.capacity

      // let guestCount = this.guests[0].capacity + this.guests[0].capacity
      // let guestsTxt = ``

      return this.guests
        .map(({ type, capacity }) => `${capacity} ${type}`)
        .join(', ')
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
