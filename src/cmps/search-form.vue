<template>
  <el-form class="search-form" :model="form" v-if="open">
    <div class="container" :class="activeBgColor" v-outside-click="setActive" @mouseleave="this.hoverInput = null">
      <div
        class="form-control"
        :class="getActiveClass('where')"
        @click="() => {
          setActive('where')
          this.hideRegion = false
        }"
        @mouseenter="this.hoverInput = 'where'">
        <div class="title">Where</div>
        <el-input
          v-model="form.where"
          placeholder="Search destinations"
          style="width: 260px"
          ref="whereInput"
          @input="fetchSuggestedLocations"
        />
        <locations-modal
          :open="getActiveClass('where').active"
          :loading="isLocationLoading"
          :locations="locations"
          :hideRegion="hideRegion"
          @change="handleLocationSelect"
          @close="setActive"
        />
      </div>

      <span class="splitter" :class="getActiveSplitterClass('where', 'checkIn')"></span>

      <div
        class="form-control"
        :class="getActiveClass('checkIn')"
        @click="setActive('checkIn')"
        @mouseenter="this.hoverInput = 'checkIn'">
        <div class="title">Check in</div>
        <span class="subtitle">{{ checkInLabel }}</span>
      </div>
      
      <span class="splitter" :class="getActiveSplitterClass('checkIn', 'checkOut')"></span>

      <div
        class="form-control"
        :class="getActiveClass('checkOut')"
        @click="setActive('checkOut')"
        @mouseenter="this.hoverInput = 'checkOut'">
        <div class="title">Check out</div>
        <span class="subtitle">{{ checkoutLabel }}</span>
      </div>

      <span class="splitter" :class="getActiveSplitterClass('checkOut', 'who')"></span>

      <div
        class="form-control submit"
        :class="getActiveClass('who')"
        @click="setActive('who')"
        @mouseenter="this.hoverInput = 'who'">
        <div>
          <div class="title">Who</div>
          <span class="subtitle">{{ guestsLabel }}</span>
        </div>

        <branded-btn @click.stop="handleSearch">
          <icon-cmp icon-type="search" />
          <span v-if="getActiveClass('who').active">Search</span>
        </branded-btn>

        <guest-modal
          class="search-guest-modal"
          :open="getActiveClass('who').active"
          @change="handleGuestsChange"
          @close="setActive"
        />
      </div>

      <dates-modal
        :open="(getActiveClass('checkIn').active || getActiveClass('checkOut').active)"
        @change="handleDatesChange"
      />
    </div>
  </el-form>
</template>

<script>
import moment from 'moment'
import { debounce } from 'lodash'

import guestModal from './guest-modal.vue'
import datesModal from './dates-modal.vue'
import locationsModal from './locations-modal.vue'

import { stayService } from '../services/stay.service'
import { eventBus } from '../services/event-bus.service'

const initialActive = {
  where: false,
  checkIn: false,
  checkOut: false,
  who: false
}

const initialForm = {
  where: '',
  checkIn: null,
  checkOut: null,
  checkDates: [],
  guests: []
}

export default {
  props: { open: Boolean },
  components: {
    guestModal,
    datesModal,
    locationsModal
  },
  emits: ['close', 'searched'],
  data() {
    return {
      form: { ...initialForm },
      activeInput: { ...initialActive },
      hoverInput: null,
      locations: [],
      hideRegion: false,
      resetSearchListener: null,
      searchFocusListener: null,
      isLocationLoading: false,
      fetchSuggestedLocations: () => {}
    }
  },
  created() {
    this.resetSearchListener = eventBus.on('resetSearch', () => this.form = { ...initialForm })
    this.searchFocusListener = eventBus.on('setSearchFocus', type => this.setActive(type))
    this.fetchSuggestedLocations = debounce(this.doFetchLocations, 500)
  },
  unmounted() {
    this.resetSearchListener && this.resetSearchListener()
    this.searchFocusListener && this.searchFocusListener()
  },
  methods: {
    handleSearch() {
      if ( !this.form.where
        && !this.form.checkIn
        && !this.form.checkOut) return this.$emit('close')

      const form = {
        where: this.form.where,
        checkIn: this.form.checkIn,
        checkOut: this.form.checkOut,
        guests: this.form.guests
      }

      this.$emit('searched', form)
    },
    handleGuestsChange(guests) {
      this.form.guests = guests
      this.$store.commit({ type: 'setFilterBy', filterBy: { guests }})
    },
    handleDatesChange(dates) {
      this.form.checkIn = dates.checkIn
      this.form.checkOut = dates.checkOut
      this.$store.commit({ type: 'setFilterBy', filterBy: {
        checkIn: dates.checkIn,
        checkOut: dates.checkOut
      }})
    },
    async doFetchLocations(queryString = '') {
      this.hideRegion = true
      this.isLocationLoading = true
      const locations = await stayService.getLocations(queryString)
      this.locations = locations
      this.isLocationLoading = false
    },
    handleLocationSelect(location) {
      this.form.where = location
    },
    setActive(type) {
      if (type === 'where' && !this.activeInput[type]) {
        this.$refs.whereInput?.focus()
      }

      // if (this.activeInput[type] && (type === 'checkIn' || type === 'checkOut')) return

      this.activeInput = { ...initialActive }
      if (type) this.activeInput[type] = !this.activeInput[type]
    },
    getActiveClass(type) {
      return { active: this.activeInput[type] }
    },
    getActiveSplitterClass(s1, s2) {
      return {
        active: this.activeInput[s1] || this.activeInput[s2] || [s1, s2].includes(this.hoverInput)
      }
    }
  },
  computed: {
    activeBgColor() {
      const isAnyActive = Object.keys(this.activeInput)
        .some(key => this.activeInput[key] === true)
      return {
        active: isAnyActive
      }
    },
    checkInLabel() {
      return this.form.checkIn
        ? moment(this.form.checkIn).format('MMM DD')
        : 'Add dates'
    },
    checkoutLabel() {
      return this.form.checkOut
        ? moment(this.form.checkOut).format('MMM DD')
        : 'Add dates'
    },
    guestsLabel() {
      if (!this.form.guests.length) return 'Add guests'

      const guestKeys = ['Adults', 'Children']
      const totalGuests = this.form.guests
        .reduce((prev, { type, capacity }) => {
        if (guestKeys.includes(type)) prev += capacity
        return prev
      }, 0)

      const guestObj = { type: 'guests', capacity: totalGuests }
      if (totalGuests === 1) guestObj.type = 'guest'

      const filteredGuests = this.form.guests
          .filter(({ type }) => !guestKeys.includes(type))
      if (totalGuests > 0) filteredGuests.unshift(guestObj)

      const formattedLabel = filteredGuests
          .map(({ type, capacity }) => {
            if (capacity === 1) {
              if (type === 'Infants') type = 'Infant'
              else if (type === 'Pets') type = 'Pet'
            }
            return `${capacity} ${type.toLowerCase()}`
          })
          .join(', ')

      return formattedLabel
    }
  }
}
</script>