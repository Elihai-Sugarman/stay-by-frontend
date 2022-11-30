<template>
  <section class="user-nav" @click="$emit('click')">
    <template v-if="open">
      <section class="user-menu" v-outside-click="() => this.$emit('outside-click')">
        <ul>
          <li>Log in</li>
          <li>Sign up</li>
          <hr>
          <li>Airbnb your home</li>
          <li>Host an experience</li>
          <li>Help</li>
        </ul>
        <hr>
        <ul>
          <li>Logout</li>
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
  components: { icon }
}
</script>