<template>
  <section v-if="checkInDate" class="order-details">
    <h2>Request to book</h2>
    
    <h3>Dates</h3>
    <h4>checkInDate {{checkInDate}}</h4>
    <h4>checkOutDate {{checkOutDate}}</h4>

    <h3>Guests</h3>
    <h4>guests {{guests}}</h4>

    <h3>The host</h3>
    <h4>host id {{hostId}}</h4>


    <h3>Your booking</h3>
    <h4>stay {{stay}}</h4>

    <h3>Price details</h3>
    <h4>basePrice {{basePrice}}</h4>
    <h4>serviceFee {{serviceFee}}</h4>
</section>
</template>

<script>
import { utilService } from '../services/util.service'

export default {
  data() {
    return {
      hostId: '',
      checkInDate: '',
      checkOutDate: '',
      guests: [],
      basePrice: 0,
      serviceFee: 0,
      stay: {},
    }
  },
  created() {
    let stayId = this.$route.params.id
    // this.getStayById(stayId)
    // this.$store.dispatch({ type: 'loadAllStays' })

    this.checkInDate = +this.$route.query.checkInDate
    this.checkOutDate = +this.$route.query.checkOutDate

    const adultCount = this.$route.query.Adults
    const childCount = this.$route.query.Children
    const infantCount = this.$route.query.Infants
    const petCount = this.$route.query.Pets

    if (adultCount) this.guests = [{ type: 'Adults', capacity: adultCount }]
    if (childCount) this.guests.push({ type: 'Children', capacity: childCount })
    if (infantCount)
      this.guests.push({ type: 'Infants', capacity: infantCount })
    if (petCount) this.guests.push({ type: 'Pets', capacity: petCount })

    this.basePrice = +this.$route.query.basePrice
    this.serviceFee = +this.$route.query.serviceFee
    this.stay._id = this.$route.params.id
    this.stay.name = this.$route.query.stayName
    this.hostId = this.$route.query.hostId
  },
  methods: {
    // async getStayById(stayId) {
    //   this.stay = await this.$store.dispatch({
    //     type: 'getStayById',
    //     stayId,
    //   })
    // },
    deepCopy(data){
      return utilService.deepCopy(data)
    }
  },
  computed: {
  },
}
</script>
