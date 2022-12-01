<template>
  <el-form class="search-form" :model="form">
    <div class="container">
      <div class="form-control">
        <div>Where</div>
        <!-- <input type="text" v-model="form.where" placeholder="Search destinations"> -->
        <!-- <el-input v-model="form.where" placeholder="Where" size="large" /> -->
        <el-autocomplete
          v-model="form.where"
          :fetch-suggestions="searchLocations"
          placeholder="Search destinations"
          @select="handleSelect"
          clearable
          style="width: 260px"
        />
      </div>

      <span class="splitter"></span>

      <div class="dates-container">
        <div class="form-control" @click="openDatePicker">
          <div>Check in</div>
          <span>Add dates</span>
        </div>
  
        <span class="splitter"></span>
  
        <div class="form-control" @click="openDatePicker">
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

      <div class="form-control">
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
      this.$refs.datePicker?.handleOpen()
    }
  },
  computed: {
    AllLocations() {
      return this.$store.getters.locations
    }
  }
}
</script>