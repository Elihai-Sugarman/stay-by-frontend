<template>
  <el-form class="search-form" :model="form">
    <div class="container">
      <div class="form-control">
        <label>Where</label>
        <input type="text" v-model="form.where" placeholder="Search destinations">
        <!-- <el-input v-model="form.where" placeholder="Where" size="large" /> -->
        <!-- <el-autocomplete
          v-model="form.where"
          :fetch-suggestions="searchLocations"
          placeholder="Where"
          @select="handleSelect"
          clearable
        /> -->
        </div>

      <span class="splitter"></span>

      <div class="form-control">
        <label>Check in</label>
        <span>Add dates</span>
      </div>

      <span class="splitter"></span>

      <div class="form-control" @click="openDatePicker">
        <label>Check out</label>
        <span>Add dates</span>
      </div>

      <span class="splitter"></span>

      <div class="form-control" @click="openDatePicker">
        <label>Who</label>
        <span>Add guests</span>
      </div>

      <el-date-picker
          style="display: none"
          ref="datePicker"
          v-model="form.checkDates"
          type="daterange"
          start-placeholder="Check in"
          end-placeholder="Check out"
          size="large"
        />
  
      <button type="button" @click="handleSearch">
        <icon icon-type="search" />
      </button>
    </div>
  </el-form>
</template>

<script>
import icon from './icon-cmp.vue'

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
      }
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
    openDatePicker() {
      this.$refs.datePicker?.click()
    }
  },
  computed: {
    AllLocations() {
      return this.$store.getters.locations
    }
  }
}
</script>