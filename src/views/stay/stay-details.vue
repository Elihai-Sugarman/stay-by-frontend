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

      <span class="superhost flex" v-if="stay.host.isSuperhost">
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
        <div class="heading flex justify-between">
          <div class="txt">
            <h2 class="title">
              {{ stay.type }} hosted by {{ stay.host.fullname }}
            </h2>
            <div class="capacity-subtitle">{{ stay.capacity }} guests</div>
          </div>
          <img :src="stay.host.imgUrl" />
        </div>

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

        <div class="summary">
          {{ stay.summary }}
        </div>

        <div class="amenities">
          <h4>What this place offers</h4>
          <div class="amenities-container">
            <li v-for="amenity in stay.amenities">
              <stayAmenity :amenity="amenity" />
            </li>
          </div>
        </div>
      </div>

      <div class="reservation flex">
        <div class="reservation-container">
          <div class="reservation-form-header">
            <p>
              <span class="cost">${{ stay.price }}</span> / night
            </p>
            <p>
              {{ avgRating }}
              <span class="reviews">({{ countReviews }} reviews)</span>
            </p>
          </div>

          <div class="reservation-data">
            <div class="date-picker">
              <div class="date-input">
                <label>CHECK IN</label>
                <input value="Tue Sep 07 2021" />
              </div>
              <div class="date-input">
                <label>CHECK OUT</label>
                <input value="Tue Sep 07 2021" />
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

          <div class="btn-container">
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="content">
              <button class="action-btn">
                <span>Reserve</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="reviews-and-map">
      <div class="reviews">
        <h1 class="flex">
          <div class="review flex">
            <span class="avg-rating flex">
              <icon-cmp iconType="star" />
              {{ avgRating }}
            </span>
            <span>•</span>
            <span class="rev-count"> {{ countReviews }} reviews</span>
          </div>
        </h1>
        <div class="reviews-container">
          <li v-for="review in stay.reviews">
            <div class="title flex">
              <img :src="review.by.imgUrl" />
              <div class="flex column">
                <span>
                  {{ review.by.fullname }}
                </span>
                <span class="subtitle fs14">
                  {{ getFormattedReviewDate(review.at) }}
                </span>
              </div>
            </div>
            <div class="txt">
              {{ review.txt }}
            </div>
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
