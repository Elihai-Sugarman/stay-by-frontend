<template>
  <section class="search-bar">
    <h1 @click="$emit('click')">SEARCH BAR</h1>

  </section>
</template>

<script>
export default {
  props: {
    open: Boolean
  },
  // emits: ['']
}
</script>