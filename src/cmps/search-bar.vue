<template>
  <section class="search-bar" @click="$emit('click')">
    <div v-if="!open" class="search-preview-container">
      <div class="search-preview" v-if="isInHomePage">
        <button type="button"><icon icon-type="search" /></button>
        <button type="button"><icon icon-type="search" /></button>
        <button type="button"><icon icon-type="search" /></button>
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
  // emits: ['']
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