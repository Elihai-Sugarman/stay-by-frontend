<template>
  <section class="user-nav" @click="$emit('click')">
    <template v-if="open">
      <section class="user-menu" v-outside-click="() => this.$emit('outside-click')">
        <ul v-if="user">
          <router-link to="/dashboard">
            <li>Dashboard</li>
          </router-link>
          <router-link to="/dashboard/order">
            <li>My orders</li>
          </router-link>
          <router-link to="/dashboard/listings">
            <li>My listings</li>
          </router-link>
          <router-link to="/wishlist">
            <li>My Wishlist</li>
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
      <icon iconType="bars" />
      <icon iconType="avatar" class="profile-icon" v-if="!user" />
      <img :src="user.imgUrl" alt="user pic" class="profile-icon" v-else />
    </button>
  </section>
</template>

<script>
import icon from '../cmps/icon-cmp.vue'

export default {
  props: { open: Boolean },
  emits: ['click'],
  components: { icon },
  computed: {
    user() {
      return this.$store.getters.loggedinUser
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/stay')
      // We need to refresh the page (in order to reset the hearts in each preview)
    }
  }
}
</script>