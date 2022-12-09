<template>
  <div class="search-backdrop" v-if="isSearchOpen" @click="closeSearch"></div>
  <header class="main-header full divider" :class="searchOpenClass">
    <nav class="main-nav">
      <router-link to="/" @click="resetFilters">
        <div class="brand">
          <icon-cmp icon-type="airbnbLogo" />
          <span class="brand-txt">stayby</span>
        </div>
      </router-link>

      <search-bar
        :open="isSearchOpen"
        @close="closeSearch"
        @click="openSearch"
        @anyWhere="anyWhere"
        @anyWeek="anyWeek"
        @addGuests="addGuests"
      />

      <div class="nav-txt flex">
        <span class="txt btn" @click="goToHost">Become a host</span>
        <user-nav
          :open="isUserNavOpen"
          @click="isUserNavOpen = !isUserNavOpen"
          @outside-click="isUserNavOpen = false"
        />
      </div>

    </nav>
  </header>
</template>
<script>
import { eventBus } from '../services/event-bus.service'
import { userService } from '../services/user.service'
import searchBar from './search-bar.vue'
import userNav from './user-nav.vue'

export default {
  components: {
    searchBar,
    userNav
  },
  data() {
    return {
      isUserNavOpen: false,
      isSearchOpen: false,
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
      eventBus.emit('setSearchFocus', 'where')
    },
    anyWeek() {
      this.openSearch()
      eventBus.emit('setSearchFocus', 'checkIn')
    },
    addGuests() {
      this.openSearch()
      eventBus.emit('setSearchFocus', 'who')
    },
    resetFilters() {
      this.$store.commit({ type: 'setFilterBy', filterBy: null })
      this.$store.dispatch({ type: 'loadStays' })
      eventBus.emit('resetSearch')
    },
    goToHost() {
      if (!this.user) this.$router.push('/login')
      else this.$router.push('/dashboard/stay/edit')
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
      return (
        this.$route.name === 'stay-details' ||
        this.$route.name === 'order-details'
      )
    },
    stayDetailsClass() {
      return { smaller: this.isInStayDetails }
    },
  },
}
</script>
