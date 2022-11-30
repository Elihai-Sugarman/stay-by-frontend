<template>
  <div class="search-backdrop" v-if="isSearchOpen"></div>
  <header
    v-outside-click="() => (isSearchOpen = false)"
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
        @click="(isSearchOpen = true)" />

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