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
          <span class="subtitle">{{ getCheckIn }}</span>
        </div>
        
        <span class="splitter"></span>

        <div
          class="form-control"
          :class="getActiveClass('checkOut')"
          @click="openDatePicker('checkOut')">
          <div class="title">Check out</div>
          <span class="subtitle">{{ getCheckout }}</span>
        </div>

        <el-date-picker
          class="form-date-picker"
          ref="datePicker"
          v-model="form.checkDates"
          type="daterange"
          start-placeholder="Check in"
          end-placeholder="Check out"
          size="large"
        />
      </div>


      <span class="splitter"></span>

      <div
        class="form-control submit"
        :class="getActiveClass('who')"
        @click="setActive('who')">
        <div>
          <div class="title">Who</div>
          <span class="subtitle">Add guests</span>
        </div>

        <branded-btn @click="handleSearch">
          <icon-cmp icon-type="search" />
          <span v-if="getActiveClass('who').active">Search</span>
        </branded-btn>

        <guest-modal class="search-guest-modal"
          :open="isGuestsOpen"
          :options="guestsOptions"
          @increment="type => handleGuestSelect(type, true)"
          @decrement="type => handleGuestSelect(type, false)"
        />
      </div>

    </div>
  </el-form>
</template>

<script>
import * as moment from 'moment'
import guestModal from './guest-modal.vue'

const initialActive = {
  where: false,
  checkIn: false,
  checkOut: false,
  who: false
}

export default {
  components: { guestModal },
  emits: ['close'],
  data() {
    return {
      form: {
        where: '',
        checkDates: [],
        guests: []
      },
      activeInput: { ...initialActive },
      isGuestsOpen: false,
      guestsOptions: {
        Adults: {
          subtitle: 'Ages 13 or above',
          capacity: 0,
          maxCapacity: 16
        },
        Children: {
          subtitle: 'Ages 2–12',
          capacity: 0,
          maxCapacity: 15
        },
        Infants: {
          subtitle: 'Under 2',
          capacity: 0,
          maxCapacity: 5
        },
        Pets: {
          subtitle: 'Bringing a service animal?',
          capacity: 0,
          maxCapacity: 5
        }
      }
    }
  },
  methods: {
    handleSearch() {
      if (!this.form.where && !this.form.checkDates.length) return this.$emit('close')

      const query = {
        ...this.$route.query,
        where: this.form.where,
        checkIn: this.form.checkDates[0]?.getTime(),
        checkOut: this.form.checkDates[1]?.getTime(),
        guests: this.form.guests
      }

      this.$refs.datePicker?.handleClose()
      this.$emit('search', query)
    },
    handleGuestSelect(type, isIncrement) {
      const guestOption = this.guestsOptions[type]

      if (isIncrement) guestOption.capacity++
      else guestOption.capacity--
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
      this.setActive(type)
      this.$refs.datePicker?.handleOpen()
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
    getCheckIn() {
      return this.form.checkDates[0]
        ? moment(this.form.checkDates[0]).format('MMM DD')
        : 'Add dates'
    },
    getCheckout() {
      return this.form.checkDates[1]
        ? moment(this.form.checkDates[1]).format('MMM DD')
        : 'Add dates'
    }
  }
}
</script>