<template>
    <div class="flex justify-between mobile-footer main-header full">
    <nav class="main-nav">
      <router-link to="/" @click="resetFilters">
        <div class="brand">
          <icon icon-type="airbnbLogo" />
          <span class="brand-txt">stayby</span>
        </div>
      </router-link>
      <user-nav
        :open="isUserNavOpen"
        @click="isUserNavOpen = !isUserNavOpen"
        @outside-click="isUserNavOpen = false"
      />
    </nav>
  </div>
</template>
<script>
import userNav from './user-nav.vue'
import icon from './icon-cmp.vue'
export default {
  components: {
    userNav,
    icon,
  },
  data() {
    return {
      isUserNavOpen: false,
    }
  },
  created() {
  },
  methods: {
    resetFilters() {
      this.$store.commit({ type: 'setFilterBy', filterBy: null })
      this.$store.dispatch({ type: 'loadStays' })
    },
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser
    },
  },
}
</script>
<style>
    .mobile-footer {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        top: unset;
        box-shadow: rgb(0 0 0 / 16%) 0 0 6px;
    }
    .mobile-footer .user-menu {
            /* top: -250px; */
            top: unset;
            bottom: 50px;
    }
    .mobile-footer .main-nav {
            width: 100%;
            justify-content: space-between;
    }
    @media screen and (min-width: 800px) {
         .mobile-footer {
            display: none;
         }
        }
</style>