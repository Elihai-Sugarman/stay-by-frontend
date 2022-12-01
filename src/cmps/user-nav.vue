<template>
  <section class="user-nav" @click="$emit('click')">
    <template v-if="open">
      <section class="user-menu" v-outside-click="() => this.$emit('outside-click')">
        <ul v-if="user">
          <li>Logout</li>
        </ul>
        <ul v-else>
          <li>Log in</li>
          <li>Sign up</li>
          <divider />
          <li>Airbnb your home</li>
        </ul>
      </section>
    </template>

    <button>
      <icon iconType="bars" />
      <icon iconType="avatar" class="profile-icon" />
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
  }
}
</script>