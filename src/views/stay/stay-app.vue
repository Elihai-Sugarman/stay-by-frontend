<template>
  <div class="container home">
    <stay-header @filter="filter" />
    <stay-list :stays="stays" />
  </div>
</template>

<script>
import stayList from '../../cmps/stay/stay-list.vue'
import stayHeader from '../../cmps/stay/stay-header.vue'

export default {
  components: {
    stayHeader,
    stayList
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
  watch: {
    queryParams(query) {
      if (query.label) {
        const filterBy = { label: query.label }
        this.$store.commit({ type: 'setFilterBy', filterBy })
        this.$store.dispatch({ type: 'loadStays' })
      }
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadStays' })
  },
  methods: {
    filter(label) {
      const filterBy = { label }
      this.$router.push({ path: '/stay', query: filterBy })
    }
  }
}
</script>
