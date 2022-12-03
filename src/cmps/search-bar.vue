<template>
  <section class="search-bar" @click="$emit('click')">
    <Transition name="slide-down">
      <div v-if="!open" class="search-preview-container">
  
        <div class="search-preview" v-if="!isInStayDetails">
          <button type="button" @click.stop="$emit('anyWhere')">Anywhere</button>
          <span class="splitter"></span>
          <button type="button" @click.stop="$emit('anyWeek')">Any week</button>
          <span class="splitter"></span>
          <button type="button" class="guests-btn" @click.stop="$emit('addGuests')">Add guests</button>
          <button type="button" class="search-btn" @click="$emit('click')"><icon icon-type="search" /></button>
        </div>
  
        <div class="search-preview stay-details-search" v-else>
          <div>Start your search</div>
          <button type="button" class="search-btn" @click="$emit('click')"><icon icon-type="search" /></button>
        </div>
  
      </div>
    </Transition>

    <Transition name="fade-in">
      <search-form v-if="open" />
    </Transition>
  </section>
</template>

<script>
import { Transition } from 'vue'
import icon from './icon-cmp.vue'
import searchForm from './search-form.vue'

export default {
  props: { open: Boolean },
  emits: ['click', 'anyWhere', 'anyWeek', 'addGuests'],
  components: {
    icon,
    searchForm
},
  data() {
    return {}
  },
  computed: {
    isInStayDetails() {
      return this.$route.name === 'stay-details'
    }
  }
}
</script>