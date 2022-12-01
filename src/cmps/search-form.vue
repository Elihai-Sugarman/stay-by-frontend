<template>
  <form @submit.prevent="" class="search-form">
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

    <button type="button">
      <icon icon-type="search" />
    </button>
  </form>
</template>

<script>
import icon from './icon-cmp.vue'

export default {
  components: {
    icon
  }
}
</script>