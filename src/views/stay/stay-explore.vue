<template>
    <div class="stays-count">
      <h4>Found {{ totalStays }} homes for you!</h4>
    </div>
    <div class="container home">
      <stay-list :stays="stays" />
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
      totalStays() {
        return this.$store.getters.totalStays
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
        const location = {
          city: this.queryParams.city,
          country: this.queryParams.country
        }

        this.$store.commit({ type: 'setFilterBy', filterBy: location })
        this.$store.dispatch({ type: 'loadStays' })
      }
    },
  }
  </script>
  