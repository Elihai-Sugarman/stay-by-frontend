<template>
  <section v-if="stay" class="stay-details">
    <h1 class="name-title">{{ stay.name }}</h1>
    <div class="name-subtitle flex">
      <div class="review flex">
        <span class="avg-rating flex">
          <icon-cmp iconType="star" />
          {{ avgRating }}
        </span>
        <span>•</span>
        <span class="rev-count"> {{ countReviews }} reviews</span>
      </div>

      <span class="superhost" v-if="stay.host.isSuperhost">
        <icon-cmp iconType="bwBadge" />
        Superhost
      </span>

      <span>•</span>
      <span class="address">
        {{ stay.address.street }}
      </span>
    </div>
    <div class="images-container">
      <!-- <li v-for="img in imgsToDisplay"> -->
      <img :src="img" v-for="img in imgsToDisplay" />
      <!-- </li> -->
    </div>

    <div class="mid-section flex">
      <div class="more-details">
        <div class="heading">
          <h2 class="title">
            {{ stay.type }} hosted by {{ stay.host.fullname }}
          </h2>
          <div class="subtitle">{{ stay.capacity }} guests</div>
          <img :src="stay.host.imgUrl" />
        </div>

        <div class="special-perks">
          <div v-if="stay.host.isSuperhost">
            <icon-cmp iconType="bwBadge" />
            <h4>{{ stay.host.fullname }} is a Superhost</h4>
            <span
              >Superhosts are experienced, highly rated hosts who are committed
              to providing great stays for guests.</span
            >
          </div>

          <div>
            <icon-cmp iconType="key" />
            <h4>Great check-in experience</h4>
            <span
              >100% of recent guests gave the check-in process a 5-star
              rating.</span
            >
          </div>

          <div>
            <icon-cmp iconType="locMarker" />
            <h4>Great location</h4>
            <span>90% of recent guests gave the location a 5-star rating.</span>
          </div>

          <div>
            <icon-cmp iconType="greatComm" />
            <h4>Great communication</h4>
            <span
              >100% of recent guests rated {{ stay.host.fullname }} 5-star in
              communication.</span
            >
          </div>

          <div>
            {{ stay.summary }}
          </div>

          <div class="amenities">
            <h4>What this place offers</h4>
            <div>
              <li v-for="amenity in stay.amenities">
                <stayAmenity :amenity="amenity" />
              </li>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="reservation-container">
          
        </div>
      </div>
    </div>

    <div class="reviews-and-map">
      <div class="reviews">
        <h1 class="flex">
          <icon-cmp iconType="star" />
          {{ avgRating }}
          • {{ countReviews }} reviews
        </h1>
        <div class="reviews-container">
          <li v-for="review in stay.reviews">
            <img :src="review.by.imgUrl" />
            {{ review.by.fullname }}
            {{ getFormattedReviewDate(review.at) }}
            {{ review.txt }}
          </li>
        </div>
      </div>

      <div class="map">
        <h4>Where you'll be</h4>
        <span>{{ stay.address.street }}</span>
      </div>
    </div>

    <details>
      <summary>Full JSON</summary>
      <pre>{{ stay }}</pre>
    </details>
  </section>
</template>

<script>
// import {userService} from '../services/user.service'
import iconCmp from '../../cmps/icon-cmp.vue'
import stayAmenity from '../../cmps/stay/stay-amenity.vue'
import * as moment from 'moment'

export default {
  data() {
    return {
      stay: null,
    }
  },
  async created() {
    // const user = await userService.getById(id)
    let stayId = this.$route.params.id
    this.getStayById(stayId)
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
      return [...this.stay.imgUrls, ...this.stay.imgUrls.slice(0, 2)]
    },
  },
  methods: {
    async getStayById(stayId) {
      this.stay = await this.$store.dispatch({
        type: 'getStayById',
        stayId,
      })
    },
    getFormattedReviewDate(dateString) {
      return moment(dateString).format('MMM' + ' ' + 'YYYY')
    },
  },
  components: {
    iconCmp,
    stayAmenity,
  },
}
</script>
