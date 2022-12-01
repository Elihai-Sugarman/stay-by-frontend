<template>
  <section class="search-bar" @click="$emit('click')">
    <div v-if="!open" class="search-preview-container">
      <div class="search-preview" v-if="isInHomePage">
        <template v-if="true">
          <button type="button" @click.stop="$emit('anyWhere')">Anywhere</button>
          <span class="splitter"></span>
          <button type="button" @click.stop="$emit('anyWeek')">Any week</button>
          <span class="splitter"></span>
          <button type="button" class="guests-btn" @click.stop="$emit('addGuests')">Add guests</button>
          <button type="button" class="search-btn" @click="$emit('click')"><icon icon-type="search" /></button>
        </template>
      </div>
      <div class="search-preview" v-else>
        <input type="text" placeholder="Start your search">
        <button type="button"><icon icon-type="search" /></button>
      </div>
    </div>
    <form v-else @submit.prevent="" class="search-form">
      <label>
        Where?
        <input type="text">
      </label>
      <label>
        Where?
        <input type="date">
      </label>
      <label>
        Where?
        <input type="date">
      </label>
      <label>
        Where?
        <select>
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
        </select>
      </label>

      <button type="button"><icon icon-type="search" /></button>
    </form>
  </section>
</template>

<script>
import icon from './icon-cmp.vue'

export default {
  props: { open: Boolean },
  emits: ['click', 'anyWhere', 'anyWeek', 'addGuests'],
  components: { icon },
  data() {
    return {}
  },
  computed: {
    isInHomePage() {
      return !this.$route.params.id
    }
  }
}
</script>