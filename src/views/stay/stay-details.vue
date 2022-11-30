<template>
    <section v-if="stay">
      <h1>Stay Details - {{ stay.name }}</h1>
      <!-- <h3>{{ user.username }} score: {{ user.score }}</h3>
      <img style="max-width: 200px;" :src="user.imgUrl" />
      <ul>
        <li v-for="review in user.givenReviews" :key="review._id">
          {{ review.txt }}
          <router-link :to="`/user/${review.aboutUser._id}`">
            About {{ review.aboutUser.fullname }}
          </router-link>
        </li>
      </ul> -->
  
      <details>
        <summary>Full JSON</summary>
        <pre>{{ stay }}</pre>
      </details>
    </section>
  </template>
  
  <script>
  // import {userService} from '../services/user.service'
  
  export default {
    data() {
      return {
        stay: null
      }
    },
    async created() {
      // const user = await userService.getById(id)
      let stayId = this.$route.params.id
      this.getStayById(stayId)
    },
    // watch: {
    //   stayId: {
    //     handler() {
    //       if(this.stayId){
    //           this.$store.dispatch({ type: "loadAndWatchUser", userId: this.userId })
    //       }
    //     },
    //     immediate: true,
    //   },
    // },
    computed: {
      // stay() {
      //   return this.$store.getters.watchedUser
      // },
     
    },
    methods: {
      async getStayById(stayId){
        this.stay = await this.$store.dispatch({
          type: 'getStayById',
          stayId
        })
      }
    },

  }
  </script>