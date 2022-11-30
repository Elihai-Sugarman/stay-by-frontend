<template>
  <div class="search-backdrop" v-if="isSearchOpen"></div>
  <header class="main-header full" v-outside-click="() => (isSearchOpen = false)" :style="headerHeight">
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
  computed: {
    user() {
      return this.$store.getters.loggedinUser
    },
    headerHeight() {
      return { height: this.isSearchOpen ? 'max-content' : '80px' }
    }
  }
}
</script>