<template>
  <section class="user-nav" @click="$emit('click')">
    <template v-if="open">
      <section class="user-menu" v-outside-click="() => this.$emit('outside-click')">
        <ul v-if="user">
          <router-link to="/wishlist">
            <li>Wishlist</li>
          </router-link>
          <router-link to="/trip">
            <li>Trips</li>
          </router-link>
          <divider />
          <router-link to="/dashboard">
            <li>Dashboard</li>
          </router-link>
          <!-- <router-link to="/dashboard/order">
            <li>My resevations</li>
          </router-link> -->
          <router-link to="/dashboard/listings">
            <li>Listings</li>
          </router-link>
          <divider />
          <li @click="logout">Logout</li>
        </ul>
        <ul v-else>
          <router-link to="/login">
            <li>Log in</li>
          </router-link>
          <router-link to="/signup">
            <li>Sign up</li>
          </router-link>
        </ul>
      </section>
    </template>

    <button>
      <icon-cmp iconType="bars" />
      <icon-cmp iconType="avatar" class="profile-icon" v-if="!user" />
      <img :src="user.imgUrl" alt="user pic" class="profile-icon" v-else />
    </button>
  </section>
</template>

<script>
export default {
  props: { open: Boolean },
  emits: ['click'],
  computed: {
    user() {
      return this.$store.getters.loggedinUser
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch({ type: 'logout' })
      this.$router.push('/')
    }
  }
}
</script>