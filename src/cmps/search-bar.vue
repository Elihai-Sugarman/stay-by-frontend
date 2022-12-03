<template>
  <section class="search-bar" @click.self="$emit('click')">
    <Transition name="slide-down">
      <div v-if="!open" class="search-preview-container">

        <div class="search-preview" v-if="!isInStayDetails">
          <button type="button" @click="$emit('anyWhere')">{{ anywhere }}</button>
          <span class="splitter"></span>
          <button type="button" @click="$emit('anyWeek')">{{ anyweek }}</button>
          <span class="splitter"></span>
          <button type="button" class="guests-btn" @click="$emit('addGuests')">{{ anyguests }}</button>
          <button type="button" class="search-btn" @click="$emit('click')">
            <icon icon-type="search" />
          </button>
        </div>

        <div class="search-preview stay-details-search" v-else>
          <div>Start your search</div>
          <button type="button" class="search-btn" @click="$emit('click')">
            <icon icon-type="search" />
          </button>
        </div>

      </div>
    </Transition>

    <Transition name="fade-in">
      <KeepAlive>
        <search-form v-if="open" @search="handleSearch" />
      </KeepAlive>
    </Transition>
  </section>
</template>

<script>
import { Transition } from 'vue'
import * as moment from 'moment'

import icon from './icon-cmp.vue'
import searchForm from './search-form.vue'

export default {
  props: { open: Boolean },
  emits: ['click', 'anyWhere', 'anyWeek', 'addGuests', 'close'],
  components: {
    icon,
    searchForm
  },
  data() {
    return {
      search: {
        where: '',
        checkIn: '',
        checkOut: '',
        guests: ''
      }
    }
  },
  methods: {
    handleSearch(query) {
      this.search = {
        where: query.city + ',' + query.country,
        checkIn: query?.checkIn ? moment(new Date(query.checkIn)).format('MMM, YYYY') : null,
        checkOut: query?.checkIn ? moment(new Date(query.checkOut)).format('MMM, YYYY') : null,
        guests: query.guests
      }
      this.$router.push({ path: '/explore', query })
      this.$emit('close')
    }
  },
  computed: {
    isInStayDetails() {
      return this.$route.name === 'stay-details'
    },
    anywhere() {
      return this.search.where || 'Anywhere'
    },
    anyweek() {
      const formattedDate = `${this.search.checkIn} - ${this.search.checkOut}`
      return this.search.checkIn && this.search.checkOut && formattedDate || 'Anyweek'
    },
    anyguests() {
      // return this.search.guests || 'Add guests'
      return 'Add guests'
    }
  }
}
</script>