<template>
    <div class="container home">
      <stay-list v-if="stays.length" :stays="stays" />
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
      stays() {
        return this.$store.getters.stays
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

        this.$store.commit({ type: 'setFilterBy', filterBy: { address }})
        this.$store.dispatch({ type: 'loadStays' })
      }
    },
  }
  </script>
  