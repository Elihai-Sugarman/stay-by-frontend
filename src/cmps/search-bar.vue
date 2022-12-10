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

        <div class="search-preview stay-details-search" v-else
          @click="$emit('click')">
          <div>Start your search</div>
          <button type="button" class="search-btn">
            <icon icon-type="search" />
          </button>
        </div>

      </div>
    </Transition>

    <Transition name="fade-in">
      <KeepAlive>
        <search-form v-if="open" @searched="handleSearch" @close="$emit('close')" />
      </KeepAlive>
    </Transition>
  </section>
</template>

<script>
import { Transition } from 'vue'
import moment from 'moment'
import { eventBus } from '../services/event-bus.service'

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
      },
      resetSearchListener: null
    }
  },
  created() {
    eventBus.on('resetSearch', this.resetSearch)
  },
  unmounted() {
    this.resetSearchListener && this.resetSearchListener()
  },
  methods: {
    resetSearch() {
      this.search = {
        where: '',
        checkIn: '',
        checkOut: '',
        guests: ''
      }
    },
    handleSearch(form) {
      this.search = {
        where: form.where,
        checkIn: form?.checkIn ? moment(form.checkIn).format('MMM DD, YYYY') : null,
        checkOut: form?.checkIn ? moment(form.checkOut).format('MMM DD, YYYY') : null,
        guests: form.guests
      }

      const [city, country] = form.where.split(', ')
      let filterBy = { ...form }

      if (city) filterBy.city = city
      if (country) filterBy.country = country

      this.$store.commit({ type: 'setFilterBy', filterBy })

      // just for the query params, build a query object to pass
      filterBy.guests.forEach(({ type, capacity }) => {
        filterBy[type] = capacity
      })
      delete filterBy.guests

      this.$router.push({ path: '/explore', query: filterBy })
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
      if (!this.search.guests.length) return 'Add guests'

      const guestKeys = ['Adults', 'Children']
      const totalGuests = this.search.guests
        .reduce((prev, { type, capacity }) => {
        if (guestKeys.includes(type)) prev += capacity
        return prev
      }, 0)

      const guestObj = { type: 'guests', capacity: totalGuests }
      if (totalGuests === 1) guestObj.type = 'guest'

      const filteredGuests = this.search.guests
          .filter(({ type }) => !guestKeys.includes(type))
      if (totalGuests > 0) filteredGuests.unshift(guestObj)

      const formattedLabel = filteredGuests
          .map(({ type, capacity }) => `${capacity} ${type}`)
          .join(', ')

      return formattedLabel
    }
  }
}
</script>