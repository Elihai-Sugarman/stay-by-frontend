<template>
  <el-form class="search-form" :model="form">
    <div class="container">
      <label>
        <!-- <el-input v-model="form.where" placeholder="Where" size="large" /> -->
        <el-autocomplete
          v-model="form.where"
          :fetch-suggestions="searchLocations"
          placeholder="Where"
          @select="handleSelect"
          clearable
        />
      </label>

      <span class="splitter"></span>
  
      <div>
        <el-date-picker
            v-model="form.checkDates"
            type="daterange"
            start-placeholder="Check in"
            end-placeholder="Check out"
            size="large"
          />
      </div>

      <span class="splitter"></span>
  
      <label>
        Who
        <select>
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
        </select>
      </label>
  
      <div>
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
      console.log('this.form', this.form)
    },
    searchLocations(queryString, cb) {
      const regex = new RegExp(queryString, 'i')
      const filteredLocs = this.AllLocations.filter(locString => regex.test(locString))

      cb(filteredLocs.map(locStr => ({ value: locStr })))
    },
    handleSelect(item) {
      this.form.where = item
    }
  },
  computed: {
    AllLocations() {
      return this.$store.getters.locations
    }
  }
}
</script>