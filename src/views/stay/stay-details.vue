<template>
  <section v-if="stay">
    <h1 class="name-title">{{ stay.name }}</h1>
    <div class="name-subtitle">
      <span class="avg-rating">
        <!-- <font-awesome-icon icon="fa-solid fa-star" /> -->
        <icon-cmp iconType="star" />
        {{ avgRating }}
      </span>
      <span class="rev-count">{{ countReviews }} reviews</span>
      <span class="superhost" v-if="stay.host.isSuperhost">
        <icon-cmp iconType="bwBadge" />
        Superhost
      </span>
      <span class="address">
        {{ stay.address.street }}, {{ stay.address.country }}
      </span>
    </div>
    <div class="images-container">
      <li v-for="img in imgsToDisplay">
        <img :src="img" />
      </li>
    </div>

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
            >Superhosts are experienced, highly rated hosts who are committed to
            providing great stays for guests.</span
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
              <stayAmenity :amenity="amenity"/>
            </li>
          </div>

          <div v-if="stay.amenities.includes('Heating')">
            <icon-cmp iconType="thermometer" />
            <span>Heating</span>
          </div>
          <div v-if="stay.amenities.includes('Bathroom essentials')">
            <icon-cmp iconType="bathEssentials" />
            <span>Bathroom essentials</span>
          </div>
          <div v-if="stay.amenities.includes('Cooking basics')">
            <icon-cmp iconType="kitchen" />
            <span>Cooking basics</span>
          </div>
          <div v-if="stay.amenities.includes('Bed linens')">
            <icon-cmp iconType="linens" />
            <span>Bed linens</span>
          </div>
          <div v-if="stay.amenities.includes('Hot water kettle')">
            <icon-cmp iconType="kettle" />
            <span>Hot water kettle</span>
          </div>
          <div v-if="stay.amenities.includes('Dishes and silverware')">
            <icon-cmp iconType="dishes" />
            <span>Dishes and silverware</span>
          </div>
          <div v-if="stay.amenities.includes('Washer')">
            <icon-cmp iconType="washer" />
            <span>Washer</span>
          </div>
          <div v-if="stay.amenities.includes('Dishwasher')">
            <icon-cmp iconType="dishwasher" />
            <span>Dishwasher</span>
          </div>
        </div>
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
  },
  components: {
    iconCmp,
    stayAmenity
  },
}
</script>
