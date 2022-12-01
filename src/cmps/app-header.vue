<template>
  <div class="search-backdrop" v-if="isSearchOpen" @click="() => (isSearchOpen = false)"></div>
  <header
    class="main-header full"
    :class="searchOpenClass">
    <nav class="main-nav">
      <router-link to="/">
        <div class="brand">
          <font-awesome-icon icon="fa-brands fa-airbnb" />
          <span class="brand-txt">stayby</span>
        </div>
      </router-link>

      <search-bar
        :open="isSearchOpen"
        @click="openSearch"
        @anyWhere="anyWhere"
        @anyWeek="anyWeek"
        @addGuests="addGuests" />

      <user-nav
        :open="isUserNavOpen"
        @click="(isUserNavOpen = !isUserNavOpen)"
        @outside-click="(isUserNavOpen = false)" />
    </nav>
  </header>
</template>
<script>
import searchBar from './search-bar.vue'
import userNav from './user-nav.vue'

export default {
  components:{
    searchBar,
    userNav
  },
  data() {
    return {
      isUserNavOpen: false,
      isSearchOpen: false
    }
  },
  created() {
    document.addEventListener('scroll', () => this.isSearchOpen = false)
  },
  methods: {
    openSearch() {
      this.isSearchOpen = true
    },
    anyWhere() {
      this.openSearch()
      console.log('anyWhere')
    },
    anyWeek() {
      this.openSearch()
      console.log('anyWeek')
    },
    addGuests() {
      this.openSearch()
      console.log('addGuests')
    }
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser
    },
    searchOpenClass() {
      return { open: this.isSearchOpen }
    }
  }
}
</script>