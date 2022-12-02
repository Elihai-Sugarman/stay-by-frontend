<template>
    <div class="container home">
      <stay-list v-if="searchedStays.length" :stays="searchedStays" />
    </div>
  </template>
  
  <script>
  import stayList from '../../cmps/stay/stay-list.vue'
  
  export default {
    components: {
      stayList,
    },
    computed: {
      loggedInUser() {
        return this.$store.getters.loggedinUser
      },
      searchedStays() {
        return this.$store.getters.searchedStays
      },
    },
    created() {
      this.$store.dispatch({ type: 'loadStays' })
      this.$store.dispatch({ type: 'loadAllStays' })

      this.filterByAddress()
    },
    methods: {
      filterByAddress() {
        const address = {
          city: this.$route.query.city,
          country: this.$route.query.country
        }

        setTimeout(() => {
          this.$store.commit({ type: 'setFilterBy', filterBy: { address }})

        }, 1000)
        // this.$store.dispatch('loadStays')
      }
    },
  }
  </script>
  