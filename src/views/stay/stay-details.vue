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
              {{ stay.type }} hosted by {{ stay.host.fullname }}
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
              <stayAmenity :amenity="amenity"/>
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
                <div class="date-picker">
                  <!-- <el-date-picker
                      class="form-date-picker"
                      ref="datePicker"
                      v-model="form.checkDates"
                      type="daterange"
                      start-placeholder="Check in"
                      end-placeholder="Check out"
                      size="large"
                    /> -->
                  <div class="date-input">
                    <label>CHECK-IN</label>
                    <input value="12/01/2023" />
                  </div>
                  <div class="date-input">
                    <label>CHECKOUT</label>
                    <input value="15/01/2023" />
                  </div>
                </div>

                <div class="guest-input">
                  <label>GUESTS</label>
                  <input value="2" />
                  <svg viewBox="0 0 320 512" width="100" title="angle-down">
                    <path
                      d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
                    />
                  </svg>
                </div>
              </div>

              <branded-btn>{{ callToActionBtnTxt }}</branded-btn>
            </div>

            <span class="reservation-txt flex column justify-between"
              >You won't be charged yet</span
            >

            <div class="reservation-summary">
              <div class="cost-breakdown flex column">
                <div class="cost-details flex column">
                  <div class="base-cost flex justify-between">
                    <span class="link"
                      >${{ stay.price }} x {{ totalNights }} nights</span
                    >
                    <span>${{ stay.price * totalNights }}</span>
                  </div>
                  <div class="service-fee flex justify-between">
                    <span class="link">Service fee</span>
                    <span>${{ serviceFee * totalNights }}</span>
                  </div>
                </div>

                <div class="total-wrapper">
                  <divider />

                  <div class="cost-total flex justify-between font-md">
                    <span>Total</span>
                    <span
                      >${{
                        stay.price * totalNights + serviceFee * totalNights
                      }}</span
                    >
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
          <review-cmp @onOpenAllReviewsModal="openAllReviewsModal" :reviews="stay.reviews" :limit="6" />
        </div>
      </div>

      <divider/>

      <div class="map">
        <h4 class="subheading">Where you'll be</h4>
        <div class="address-txt">{{ stay.address.street }}</div>
        <div class="map-container">
          <stay-map :location="stay.address.location"/>
        </div>
      </div>
    </div>

    <div class="all-reviews">
      <!-- <all-reviews-modal :reviews="stay.reviews"/> -->

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
import _random from 'lodash/random'

export default {
  name: 'stay-details',
  data() {
    return {
      stay: null,
      checkInDate: null,
      checkOutDate: null,
      form: {
        checkDates: [],
        guests: []
      },
      amenities: ['airbnbLogo', 'star', 'search', 'filter', 'heart', 'avatar', 'rightArrow', 'bwBadge', 'bars', 'key', 'greatComm', 'locMarker', 'heating', 'bathEssentials', 'kitchen', 'cookingBasics', 'bedLinens', 'hotWaterKettle', 'dishesAndSilverware', 'washer', 'dryer', 'dishwasher', 'selfCheckIn', 'cleaningBeforeCheckout', 'tv', 'firstAidKit', 'gym', 'iron', 'microwave', 'bodySoap', 'hairDryer', 'coffeeMaker', 'travelCrib', 'hotWater', 'beachfront', 'beachView', 'essentials', 'bathroomEssentials', 'lockbox', 'airConditioning', 'smokingAllowed', 'wifi', 'hangers', 'doorman', 'longTermStaysAllowed', 'stove', 'bathtub', 'extraPillowsAndBlankets', 'freeParkingOnPremises', 'paidParkingOnPremises', 'paidParkingOffPremises', 'bbqGrill', 'elevator', 'oven', 'fireExtinguisher', 'pool', 'petsAllowed', 'hotTub', 'refrigerator', 'privateEntrance', 'patioOrBalcony', 'minus', 'plus']
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
      return [...this.stay.imgUrls, ...this.stay.imgUrls.slice(0, 2)]
    },
    serviceFee() {
      return _random(15, 40)
    },
    totalNights() {
      //this is temp while we don't get the dates from the user
      return _random(2, 10)
    },
    callToActionBtnTxt() {
      return !this.checkInDate || !this.checkOutDate
        ? 'Check availabilty'
        : 'Reserve'
    },
    filteredAmenities(){
      return this.stay.amenities.slice(0).filter(amenity=>this.amenities.includes(amenity.charAt(0).toLowerCase()+amenity.slice(1)))
    }
  },
  methods: {
    async getStayById(stayId) {
      this.stay = await this.$store.dispatch({
        type: 'getStayById',
        stayId,
      })
    },
    openAllReviewsModal(){
      console.log('open reviews modal');

    },

    // getFormattedReviewDate(dateString) {
    //   return moment(dateString).format('MMM' + ' ' + 'YYYY')
    // },
  },
  components: {
    stayAmenity,
    reviewCmp,
    ratingReview,
    stayMap,
    allReviewsModal
  },
}
</script>
