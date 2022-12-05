<template>
  <el-form class="search-form" :model="form">
    <div class="container" v-outside-click="setActive">
      <div class="form-control" :class="getActiveClass('where')" @click="setActive('where')">
        <div class="title">Where</div>
        <el-autocomplete
          v-model="form.where"
          :fetch-suggestions="getSearchLocations"
          placeholder="Search destinations"
          style="width: 260px"
          clearable
          ref="whereInput"
        />
      </div>

      <span class="splitter"></span>

      <div class="dates-container">
        <div
          class="form-control"
          :class="getActiveClass('checkIn')"
          @click="openDatePicker('checkIn')">
          <div class="title">Check in</div>
          <span class="subtitle">{{ checkInLabel }}</span>
        </div>
        
        <span class="splitter"></span>

        <div
          class="form-control"
          :class="getActiveClass('checkOut')"
          @click="openDatePicker('checkOut')">
          <div class="title">Check out</div>
          <span class="subtitle">{{ checkoutLabel }}</span>
        </div>
      </div>


      <span class="splitter"></span>

      <div
        class="form-control submit"
        :class="getActiveClass('who')"
        @click="setActive('who')">
        <div>
          <div class="title">Who</div>
          <span class="subtitle">{{ guestsLabel }}</span>
        </div>

        <branded-btn @click="handleSearch">
          <icon-cmp icon-type="search" />
          <span v-if="getActiveClass('who').active">Search</span>
        </branded-btn>

        <guest-modal
          class="search-guest-modal"
          :open="isGuestsOpen"
          @change="handleGuestsChange"
          @close="(isGuestsOpen = false)"
        />
      </div>

      <dates-modal
        :open="isDatesOpen"
        @change="handleDatesChange"
        @close="(isDatesOpen = false)"
      />
    </div>
  </el-form>
</template>

<script>
import * as moment from 'moment'
import guestModal from './guest-modal.vue'
import datesModal from './dates-modal.vue'

const initialActive = {
  where: false,
  checkIn: false,
  checkOut: false,
  who: false
}

export default {
  components: {
    guestModal,
    datesModal
  },
  emits: ['close', 'searched'],
  data() {
    return {
      form: {
        where: '',
        checkIn: null,
        checkOut: null,
        checkDates: [],
        guests: []
      },
      activeInput: { ...initialActive },
      isGuestsOpen: false,
      isDatesOpen: false
    }
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

      this.isDatesOpen = false
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
    getSearchLocations(queryString, cb) {
      const regex = new RegExp(queryString, 'i')
      const filteredLocs = this.AllLocations
        .filter(({ city, country }) => {
          return regex.test(country) || regex.test(city)
        })
        // add value prop for the element-plus autocomplete
        .map(address => {
          const formattedValue = `${address.city}, ${address.country}`
          return {
            ...address,
            value: formattedValue
          }
        })

      cb(filteredLocs)
    },
    openDatePicker(type) {
      this.isDatesOpen = true
      this.setActive(type)
    },
    setActive(type) {
      if (type === 'where' && !this.activeInput[type]) {
        this.$refs.whereInput?.focus()
      }

      if (type === 'who') {
        this.isGuestsOpen = !this.activeInput[type]
      }

      this.activeInput = {
        ...initialActive,
        [type]: !this.activeInput[type]
      }
    },
    getActiveClass(type) {
      return { active: this.activeInput[type] }
    }
  },
  computed: {
    AllLocations() {
      return this.$store.getters.locations
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
      const formattedLabel = this.form.guests
          .map(({ type, capacity }) => `${capacity} ${type}`)
          .join(', ')
      return formattedLabel
    }
  }
}
</script>