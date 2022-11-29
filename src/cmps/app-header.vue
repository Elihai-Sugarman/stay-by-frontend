<template>
  <header>
    <nav>
      <router-link to="/">
        <span role="img" aria-label="logo">🙏</span>
      </router-link>
      <router-link to="/stay">Stays</router-link>
      <router-link to="/login">Login / Signup</router-link>
    </nav>
    <section class="loggedin-user" v-if="loggedInUser">
      <router-link :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.fullname }}
      </router-link>
      <span>{{ loggedInUser.score.toLocaleString() }}</span>
      <img :src="loggedInUser.imgUrl" />
    </section>
    <stay-filter/>
  </header>
</template>
<script>
import stayFilter from './stay/stay-filter.vue'
export default {
  components:{
    stayFilter
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  }
}
</script>