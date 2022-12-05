<template>
  <div class="search-backdrop" v-if="isSearchOpen" @click="closeSearch"></div>
  <header
    class="main-header full divider"
    :class="searchOpenClass">
    <nav class="main-nav">
      <router-link to="/" @click="resetFilters">
        <div class="brand">
          <icon icon-type="airbnbLogo" />
          <span class="brand-txt">stayby</span>
        </div>
      </router-link>

      <search-bar
        :open="isSearchOpen"
        @close="closeSearch"
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
import { eventBus } from '../services/event-bus.service'
import searchBar from './search-bar.vue'
import userNav from './user-nav.vue'
import icon from './icon-cmp.vue'

export default {
  components:{
    searchBar,
    userNav,
    icon
  },
  data() {
    return {
      isUserNavOpen: false,
      isSearchOpen: false
    }
  },
  created() {
    document.addEventListener('scroll', this.closeSearch)
    document.addEventListener('keydown', this.closeByEscape)
  },
  methods: {
    openSearch() {
      this.isSearchOpen = true
    },
    closeSearch() {
      this.isSearchOpen = false
    },
    closeByEscape(event) {
      if (event.key.toUpperCase() === 'ESCAPE' && this.isSearchOpen) {
        this.closeSearch()
      }
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
    },
    resetFilters() {
      this.$store.commit({ type: 'setFilterBy', filterBy: null })
      this.$store.dispatch({ type: 'loadStays' })
      eventBus.emit('resetSearch')
    }
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser
    },
    searchOpenClass() {
      return { open: this.isSearchOpen, ...this.stayDetailsClass }
    },
    isInStayDetails() {
      return this.$route.name === 'stay-details'
    },
    stayDetailsClass() {
      return { stay: this.isInStayDetails }
    }
  }
}
</script>