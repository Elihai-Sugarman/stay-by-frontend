<template>
    <div class="stays-count">
      <h4>Found {{ stays.length }} homes for you!</h4>
    </div>
    <div class="container home">
      <stay-list v-if="stays.length" :stays="stays" />
    </div>
  </template>
  
  <script>
  import stayList from '../../cmps/stay/stay-list.vue'
  
  export default {
    name: 'stay-explore',
    components: {
      stayList,
    },
    computed: {
      loggedInUser() {
        return this.$store.getters.loggedinUser
      },
      stays() {
        return this.$store.getters.stays
      },
      queryParams() {
        return this.$route.query
      }
    },
    created() {
      this.loadStays()
    },
    watch: {
      queryParams() {
        this.loadStays()
      }
    },
    methods: {
      loadStays() {
        this.$store.dispatch({ type: 'loadStays' })
        this.$store.dispatch({ type: 'loadAllStays' })

        this.filterByAddress()
      },
      filterByAddress() {
        const address = {
          city: this.queryParams.city,
          country: this.queryParams.country
        }

        this.$store.commit({ type: 'setFilterBy', filterBy: { address }})
        this.$store.dispatch({ type: 'loadStays' })
      }
    },
  }
  </script>
  