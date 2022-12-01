<template>
  <el-form class="search-form" :model="form">
    <div class="container" v-outside-click="setActive">
      <div class="form-control" :class="getActiveClass('where')" @click="setActive('where')">
        <div>Where</div>
        <el-autocomplete
          v-model="form.where"
          :fetch-suggestions="searchLocations"
          placeholder="Search destinations"
          @select="handleSelect"
          style="width: 260px"
          clearable
        />
      </div>

      <span class="splitter"></span>

      <div class="dates-container">
        <div
          class="form-control"
          :class="getActiveClass('checkIn')"
          @click="openDatePicker('checkIn')">
          <div>Check in</div>
          <span>Add dates</span>
        </div>

        <span class="splitter"></span>

        <div
          class="form-control"
          :class="getActiveClass('checkOut')"
          @click="openDatePicker('checkOut')">
          <div>Check out</div>
          <span>Add dates</span>
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
        class="form-control"
        :class="getActiveClass('who')"
        @click="setActive('who')">
        <div>Who</div>
        <span>Add guests</span>

        <button type="button" @click="handleSearch">
          <icon icon-type="search" />
        </button>
      </div>

    </div>
  </el-form>
</template>

<script>
import icon from './icon-cmp.vue'
const initialActive = {
  where: false,
  checkIn: false,
  checkOut: false,
  who: false
}

export default {
  components: {
    icon
  },
  data() {
    return {
      form: {
        where: '',
        checkDates: [],
        guests: []
      },
      activeInput: { ...initialActive }
    }
  },
  methods: {
    handleSearch() {
      const query = {
        q: this.form.where,
        checkIn: this.form.checkDates[0].getTime(),
        checkOut: this.form.checkDates[1].getTime(),
        guests: this.form.guests
      }

      this.$router.push({ path: '/explore', query })
    },
    searchLocations(queryString, cb) {
      const regex = new RegExp(queryString, 'i')
      const filteredLocs = this.AllLocations.filter(locString => regex.test(locString))

      cb(filteredLocs.map(locStr => ({ value: locStr })))
    },
    handleSelect(item) {
      this.form.where = item
    },
    openDatePicker(type) {
      this.setActive(type)
      this.$refs.datePicker?.handleOpen()
    },
    setActive(type) {
      this.activeInput = {
        ...initialActive,
        [type]: true
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
  }
}
</script>